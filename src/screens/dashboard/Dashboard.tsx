import React, { useState, useEffect } from "react";
import { ScrollView, View } from "react-native";
import { DashboardStyled as Styled } from "./styled";

import StatusCard, {
  HospitalStatus,
} from "../../components/statusCard/StatusCard";
import EventsCard, { Event } from "../../components/eventsCard/EventsCard";
import StorageService, {
  HospitalSector,
  PowerOutage,
} from "../../services/StorageService";

const Dashboard = () => {
  const [hospitalStatus, setHospitalStatus] = useState<HospitalStatus>({
    overall: "NORMAL",
    powerGrid: true,
    backupGenerator: false,
    batteryLevel: 100,
    affectedSectors: 0,
  });

  const [recentEvents, setRecentEvents] = useState<Event[]>([]);
  const [sectors, setSectors] = useState<HospitalSector[]>([]);
  const [isEmergencyMode, setIsEmergencyMode] = useState(false);

  useEffect(() => {
    loadDashboardData();
    const interval = setInterval(loadDashboardData, 10000);
    return () => clearInterval(interval);
  }, []);

  const loadDashboardData = async () => {
    try {
      const loadedSectors = await StorageService.loadHospitalSectors();
      setSectors(loadedSectors);

      const { updatedSectors, hasUpdates } =
        await StorageService.updateEstimatedOutages(loadedSectors);
      if (hasUpdates) {
        setSectors(updatedSectors);
      }

      const calculatedStatus = calculateHospitalStatus(updatedSectors);
      setHospitalStatus(calculatedStatus);

      const events = generateEventsFromSectors(updatedSectors);
      setRecentEvents(events);
    } catch (error) {
      console.error("Erro ao carregar dados:", error);
    }
  };

  const calculateHospitalStatus = (
    sectors: HospitalSector[]
  ): HospitalStatus => {
    if (sectors.length === 0) {
      return {
        overall: "NORMAL",
        powerGrid: true,
        backupGenerator: false,
        batteryLevel: 100,
        affectedSectors: 0,
      };
    }

    const criticalSectors = sectors.filter(
      (s) => s.status === "CRITICAL"
    ).length;
    const warningSectors = sectors.filter((s) => s.status === "WARNING").length;
    const offlineSectors = sectors.filter((s) => s.status === "OFFLINE").length;
    const sectorsWithOutages = sectors.filter(
      (s) => s.currentOutage?.isOngoing
    ).length;

    let overall: HospitalStatus["overall"] = "NORMAL";
    if (criticalSectors > 0 || offlineSectors > 0) {
      overall = "CRITICAL";
    } else if (warningSectors > 0 || sectorsWithOutages > 0) {
      overall = "WARNING";
    }

    const powerGrid = sectorsWithOutages === 0;

    const backupGenerator = sectorsWithOutages > 0;

    let batteryLevel = 100;
    if (sectorsWithOutages > 0) {
      batteryLevel = Math.max(20, 100 - sectorsWithOutages * 15);
    }

    return {
      overall,
      powerGrid,
      backupGenerator,
      batteryLevel,
      affectedSectors:
        criticalSectors + warningSectors + offlineSectors + sectorsWithOutages,
    };
  };

  const generateEventsFromSectors = (sectors: HospitalSector[]): Event[] => {
    const events: Event[] = [];
    const now = new Date();

    sectors.forEach((sector) => {
      // Eventos de quedas de energia ativas
      if (sector.currentOutage?.isOngoing) {
        const outageEvent: Event = {
          id: `outage-${sector.id}`,
          type: "POWER_FAILURE",
          message: `Queda de energia em andamento - ${sector.name} (Andar ${sector.floor})`,
          timestamp: sector.currentOutage.startTime,
          severity: sector.currentOutage.severity,
        };
        events.push(outageEvent);
      }

      if (sector.status === "CRITICAL") {
        const criticalEvent: Event = {
          id: `critical-${sector.id}`,
          type: "EQUIPMENT_ALERT",
          message: `Status crítico detectado - ${sector.name} (${sector.criticalEquipment} equipamentos críticos)`,
          timestamp: sector.lastUpdate,
          severity: "CRITICAL",
        };
        events.push(criticalEvent);
      }

      if (sector.status === "WARNING" && sector.criticalEquipment > 0) {
        const warningEvent: Event = {
          id: `warning-${sector.id}`,
          type: "EQUIPMENT_ALERT",
          message: `Alerta de equipamento - ${sector.name} (${sector.criticalEquipment} equipamentos em atenção)`,
          timestamp: sector.lastUpdate,
          severity: "MEDIUM",
        };
        events.push(warningEvent);
      }

      // Eventos de quedas de energia recentes (últimas 2 horas)
      const recentOutages = sector.powerOutages.filter((outage) => {
        if (!outage.endTime) return false;
        const timeDiff = now.getTime() - outage.endTime.getTime();
        return timeDiff <= 2 * 60 * 60 * 1000; // 2 horas
      });

      recentOutages.forEach((outage) => {
        if (outage.endTime) {
          const restoredEvent: Event = {
            id: `restored-${outage.id}`,
            type: "SYSTEM_RESTORED",
            message: `Sistema restaurado - ${sector.name} (Duração: ${outage.duration} min)`,
            timestamp: outage.endTime,
            severity: "LOW",
          };
          events.push(restoredEvent);
        }
      });
    });

    return events
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
      .slice(0, 5);
  };

  const handleEmergencyModeChange = (isActive: boolean) => {
    setIsEmergencyMode(isActive);
  };

  return (
    <Styled.Container>
      <ScrollView
        style={Styled.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={Styled.scrollContent}
      >
        <StatusCard hospitalStatus={hospitalStatus} />

        <EventsCard events={recentEvents} />

        <View style={Styled.bottomSpacing} />
      </ScrollView>
    </Styled.Container>
  );
};

export default Dashboard;
