import AsyncStorage from "@react-native-async-storage/async-storage";

export interface HospitalRegion {
  type: "BAIRRO" | "CIDADE" | "CEP";
  name: string;
  value: string;
  description?: string;
  affectedPopulation?: number;
}

export interface PowerOutage {
  id: string;
  startTime: Date;
  endTime?: Date;
  estimatedEndTime?: Date;
  duration?: number;
  estimatedDuration?: number;
  isOngoing: boolean;
  severity: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
  affectedSystems?: string[];
  notes?: string;
}

export interface HospitalSector {
  id: string;
  name: string;
  floor: number;
  status: "NORMAL" | "WARNING" | "CRITICAL" | "OFFLINE";
  powerConsumption: number;
  criticalEquipment: number;
  lastUpdate: Date;
  region: HospitalRegion;
  powerOutages: PowerOutage[];
  currentOutage?: PowerOutage;
}

class StorageService {
  private static readonly SECTORS_STORAGE_KEY = "@hospital_sectors";

  /**
   * Carrega todos os setores hospitalares do AsyncStorage
   */
  static async loadHospitalSectors(): Promise<HospitalSector[]> {
    try {
      const storedSectors = await AsyncStorage.getItem(
        this.SECTORS_STORAGE_KEY
      );

      if (!storedSectors) {
        return [];
      }

      const parsedSectors = JSON.parse(storedSectors).map((sector: any) => ({
        ...sector,
        lastUpdate: new Date(sector.lastUpdate),
        region: sector.region || {
          type: "BAIRRO" as const,
          name: "Hospital não especificado",
          value: "Região não informada",
          description: "",
        },
        powerOutages: (sector.powerOutages || []).map((outage: any) => ({
          ...outage,
          startTime: new Date(outage.startTime),
          endTime: outage.endTime ? new Date(outage.endTime) : undefined,
          estimatedEndTime: outage.estimatedEndTime
            ? new Date(outage.estimatedEndTime)
            : undefined,
        })),
        currentOutage: sector.currentOutage
          ? {
              ...sector.currentOutage,
              startTime: new Date(sector.currentOutage.startTime),
              endTime: sector.currentOutage.endTime
                ? new Date(sector.currentOutage.endTime)
                : undefined,
              estimatedEndTime: sector.currentOutage.estimatedEndTime
                ? new Date(sector.currentOutage.estimatedEndTime)
                : undefined,
            }
          : undefined,
      }));

      return parsedSectors;
    } catch (error) {
      console.error("Erro ao carregar setores hospitalares:", error);
      return [];
    }
  }

  /**
   * Salva todos os setores hospitalares no AsyncStorage
   */
  static async saveHospitalSectors(sectors: HospitalSector[]): Promise<void> {
    try {
      await AsyncStorage.setItem(
        this.SECTORS_STORAGE_KEY,
        JSON.stringify(sectors)
      );
    } catch (error) {
      console.error("Erro ao salvar setores hospitalares:", error);
      throw error;
    }
  }

  /**
   * Adiciona um novo setor hospitalar
   */
  static async addHospitalSector(
    sectors: HospitalSector[],
    newSector: Omit<HospitalSector, "id" | "lastUpdate">
  ): Promise<HospitalSector[]> {
    const sector: HospitalSector = {
      ...newSector,
      id: Date.now().toString(),
      lastUpdate: new Date(),
      powerOutages: newSector.powerOutages || [],
      currentOutage: newSector.currentOutage || undefined,
    };

    const updatedSectors = [...sectors, sector];
    await this.saveHospitalSectors(updatedSectors);
    return updatedSectors;
  }

  /**
   * Remove um setor hospitalar
   */
  static async removeHospitalSector(
    sectors: HospitalSector[],
    sectorId: string
  ): Promise<HospitalSector[]> {
    const updatedSectors = sectors.filter((sector) => sector.id !== sectorId);
    await this.saveHospitalSectors(updatedSectors);
    return updatedSectors;
  }

  /**
   * Atualiza um setor hospitalar
   */
  static async updateHospitalSector(
    sectors: HospitalSector[],
    sectorId: string,
    updates: Partial<HospitalSector>
  ): Promise<HospitalSector[]> {
    const updatedSectors = sectors.map((sector) =>
      sector.id === sectorId
        ? { ...sector, ...updates, lastUpdate: new Date() }
        : sector
    );

    await this.saveHospitalSectors(updatedSectors);
    return updatedSectors;
  }

  /**
   * Adiciona uma queda de energia a um setor
   */
  static async addPowerOutage(
    sectors: HospitalSector[],
    sectorId: string,
    outage: Omit<PowerOutage, "id">
  ): Promise<HospitalSector[]> {
    const newOutage: PowerOutage = {
      ...outage,
      id: Date.now().toString(),
    };

    const updatedSectors = sectors.map((sector) => {
      if (sector.id === sectorId) {
        const updatedOutages = [...sector.powerOutages, newOutage];
        return {
          ...sector,
          powerOutages: updatedOutages,
          currentOutage: outage.isOngoing ? newOutage : sector.currentOutage,
          lastUpdate: new Date(),
        };
      }
      return sector;
    });

    await this.saveHospitalSectors(updatedSectors);
    return updatedSectors;
  }

  /**
   * Finaliza uma queda de energia
   */
  static async endPowerOutage(
    sectors: HospitalSector[],
    sectorId: string,
    outageId: string,
    endTime: Date
  ): Promise<HospitalSector[]> {
    const updatedSectors = sectors.map((sector) => {
      if (sector.id === sectorId) {
        const updatedOutages = sector.powerOutages.map((outage) => {
          if (outage.id === outageId) {
            const duration = Math.floor(
              (endTime.getTime() - outage.startTime.getTime()) / (1000 * 60)
            );
            return {
              ...outage,
              endTime,
              duration,
              isOngoing: false,
            };
          }
          return outage;
        });

        return {
          ...sector,
          powerOutages: updatedOutages,
          currentOutage:
            sector.currentOutage?.id === outageId
              ? undefined
              : sector.currentOutage,
          lastUpdate: new Date(),
        };
      }
      return sector;
    });

    await this.saveHospitalSectors(updatedSectors);
    return updatedSectors;
  }

  /**
   * Calcula estatísticas das quedas de energia
   */
  static calculatePowerOutageStats(sectors: HospitalSector[]) {
    const allOutages = sectors.flatMap((sector) => sector.powerOutages);
    const ongoingOutages = sectors.filter((sector) => sector.currentOutage);

    return {
      totalOutages: allOutages.length,
      ongoingOutages: ongoingOutages.length,
      averageDuration:
        allOutages
          .filter((outage) => outage.duration)
          .reduce((acc, outage) => acc + (outage.duration || 0), 0) /
          allOutages.filter((outage) => outage.duration).length || 0,
      criticalOutages: allOutages.filter(
        (outage) => outage.severity === "CRITICAL"
      ).length,
    };
  }

  /**
   * Atualiza quedas de energia estimadas que já passaram do prazo
   */
  static async updateEstimatedOutages(sectors: HospitalSector[]): Promise<{
    updatedSectors: HospitalSector[];
    hasUpdates: boolean;
  }> {
    const now = new Date();
    let hasUpdates = false;

    const updatedSectors = sectors.map((sector) => {
      if (
        sector.currentOutage?.estimatedEndTime &&
        sector.currentOutage.estimatedEndTime <= now
      ) {
        hasUpdates = true;

        return {
          ...sector,
          lastUpdate: new Date(),
        };
      }
      return sector;
    });

    if (hasUpdates) {
      await this.saveHospitalSectors(updatedSectors);
    }

    return {
      updatedSectors,
      hasUpdates,
    };
  }

  /**
   * Limpa todos os dados do storage
   */
  static async clearAllData(): Promise<void> {
    try {
      await AsyncStorage.removeItem(this.SECTORS_STORAGE_KEY);
    } catch (error) {
      console.error("Erro ao limpar dados:", error);
      throw error;
    }
  }
}

export default StorageService;
