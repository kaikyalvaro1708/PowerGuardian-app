import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { AnalysisImpactStyled as Styled } from "./styled";
import ImpactSummary from "../../components/impactSummary/ImpactSummary";
import StorageService, {
  HospitalSector,
  PowerOutage,
} from "../../services/StorageService";

interface ImpactData {
  sector: string;
  criticalEquipment: number;
  affectedPatients: number;
  financialImpact: number;
  operationalImpact: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
  estimatedRecoveryTime: number;
  outageCount: number;
  currentlyOffline: boolean;
}

interface CostAnalysisTypes {
  equipmentDamage: number;
  lostRevenue: number;
  emergencyResponse: number;
  patientTransfer: number;
  total: number;
}

interface PatientImpact {
  category: string;
  count: number;
  riskLevel: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
  description: string;
}

const AnalysisImpact = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<
    "current" | "last24h" | "lastWeek"
  >("current");

  const [impactData, setImpactData] = useState<ImpactData[]>([]);
  const [costAnalysis, setCostAnalysis] = useState<CostAnalysisTypes>({
    equipmentDamage: 0,
    lostRevenue: 0,
    emergencyResponse: 0,
    patientTransfer: 0,
    total: 0,
  });
  const [patientImpact, setPatientImpact] = useState<PatientImpact[]>([]);
  const [loading, setLoading] = useState(true);

  const calculateFinancialImpact = (
    outage: PowerOutage,
    criticalEquipment: number
  ): number => {
    const baseCost = criticalEquipment * 500;
    const severityMultiplier = {
      LOW: 0.5,
      MEDIUM: 1.0,
      HIGH: 2.0,
      CRITICAL: 4.0,
    };

    const duration = outage.duration || outage.estimatedDuration || 60;
    const durationMultiplier = Math.max(1, duration / 60);

    return baseCost * severityMultiplier[outage.severity] * durationMultiplier;
  };

  const estimateAffectedPatients = (sector: HospitalSector): number => {
    const sectorPatients: { [key: string]: number } = {
      uti: 20,
      "centro cirúrgico": 8,
      "pronto socorro": 30,
      radiologia: 15,
      cardiologia: 12,
      neurologia: 10,
      pediatria: 25,
      maternidade: 18,
      laboratório: 5,
      farmácia: 3,
    };

    const sectorKey = Object.keys(sectorPatients).find((key) =>
      sector.name.toLowerCase().includes(key)
    );

    return (
      sectorPatients[sectorKey || "default"] ||
      Math.floor(sector.criticalEquipment * 2)
    );
  };

  const mapStatusToOperationalImpact = (
    status: string
  ): "LOW" | "MEDIUM" | "HIGH" | "CRITICAL" => {
    switch (status) {
      case "CRITICAL":
      case "OFFLINE":
        return "CRITICAL";
      case "WARNING":
        return "HIGH";
      case "NORMAL":
        return "LOW";
      default:
        return "MEDIUM";
    }
  };

  useEffect(() => {
    const loadImpactData = async () => {
      try {
        setLoading(true);
        const sectors = await StorageService.loadHospitalSectors();

        if (sectors.length === 0) {
          setLoading(false);
          return;
        }

        const impactBySection: ImpactData[] = sectors.map((sector) => {
          const affectedPatients = estimateAffectedPatients(sector);
          const outageCount = sector.powerOutages.length;
          const currentlyOffline = !!sector.currentOutage;

          const totalFinancialImpact = sector.powerOutages.reduce(
            (total, outage) => {
              return (
                total +
                calculateFinancialImpact(outage, sector.criticalEquipment)
              );
            },
            0
          );

          let estimatedRecoveryTime = 30;
          if (sector.currentOutage) {
            const severityTime = {
              LOW: 15,
              MEDIUM: 30,
              HIGH: 60,
              CRITICAL: 120,
            };
            estimatedRecoveryTime = severityTime[sector.currentOutage.severity];
          }

          return {
            sector: sector.name,
            criticalEquipment: sector.criticalEquipment,
            affectedPatients,
            financialImpact: totalFinancialImpact,
            operationalImpact: mapStatusToOperationalImpact(sector.status),
            estimatedRecoveryTime,
            outageCount,
            currentlyOffline,
          };
        });

        setImpactData(impactBySection);

        const totalFinancialImpact = impactBySection.reduce(
          (total, impact) => total + impact.financialImpact,
          0
        );

        const calculatedCostAnalysis: CostAnalysisTypes = {
          equipmentDamage: totalFinancialImpact * 0.3,
          lostRevenue: totalFinancialImpact * 0.5, 
          emergencyResponse: totalFinancialImpact * 0.1, 
          patientTransfer: totalFinancialImpact * 0.1, 
          total: totalFinancialImpact,
        };

        setCostAnalysis(calculatedCostAnalysis);

        const criticalPatients = impactBySection
          .filter((impact) => impact.operationalImpact === "CRITICAL")
          .reduce((total, impact) => total + impact.affectedPatients, 0);

        const highRiskPatients = impactBySection
          .filter((impact) => impact.operationalImpact === "HIGH")
          .reduce((total, impact) => total + impact.affectedPatients, 0);

        const mediumRiskPatients = impactBySection
          .filter((impact) => impact.operationalImpact === "MEDIUM")
          .reduce((total, impact) => total + impact.affectedPatients, 0);

        const lowRiskPatients = impactBySection
          .filter((impact) => impact.operationalImpact === "LOW")
          .reduce((total, impact) => total + impact.affectedPatients, 0);

        const calculatedPatientImpact: PatientImpact[] = [
          {
            category: "Pacientes Críticos",
            count: criticalPatients,
            riskLevel: "CRITICAL" as const,
            description: "Setores offline ou críticos - risco imediato à vida",
          },
          {
            category: "Pacientes Alto Risco",
            count: highRiskPatients,
            riskLevel: "HIGH" as const,
            description: "Setores em alerta - procedimentos interrompidos",
          },
          {
            category: "Pacientes Risco Médio",
            count: mediumRiskPatients,
            riskLevel: "MEDIUM" as const,
            description: "Monitoramento comprometido",
          },
          {
            category: "Pacientes Estáveis",
            count: lowRiskPatients,
            riskLevel: "LOW" as const,
            description: "Impacto mínimo nas operações",
          },
        ].filter((impact) => impact.count > 0);

        setPatientImpact(calculatedPatientImpact);
      } catch (error) {
        console.error("Erro ao carregar dados de impacto:", error);
      } finally {
        setLoading(false);
      }
    };

    loadImpactData();

    const interval = setInterval(loadImpactData, 30000);
    return () => clearInterval(interval);
  }, [selectedPeriod]);

  if (loading) {
    return (
      <Styled.Container>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Styled.LoadingText>
            Carregando análise de impacto...
          </Styled.LoadingText>
        </View>
      </Styled.Container>
    );
  }

  return (
    <Styled.Container>
      <Styled.ScrollContainer showsVerticalScrollIndicator={false}>
        <ImpactSummary
          impactData={impactData}
          costAnalysis={costAnalysis}
          patientImpact={patientImpact}
        />
        <View style={{ height: 20 }} />
      </Styled.ScrollContainer>
    </Styled.Container>
  );
};

export default AnalysisImpact;
