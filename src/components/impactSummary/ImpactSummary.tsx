import React from "react";
import { Card } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { ImpactSummaryStyled as Styled } from "./styled";

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

interface CostAnalysis {
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

interface ImpactSummaryProps {
  impactData: ImpactData[];
  costAnalysis: CostAnalysis;
  patientImpact: PatientImpact[];
}

const ImpactSummary: React.FC<ImpactSummaryProps> = ({
  impactData,
  costAnalysis,
  patientImpact,
}) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  const totalAffectedPatients = impactData.reduce(
    (sum, item) => sum + item.affectedPatients,
    0
  );

  const totalCriticalEquipment = impactData.reduce(
    (sum, item) => sum + item.criticalEquipment,
    0
  );

  const averageRecoveryTime =
    impactData.length > 0
      ? impactData.reduce((sum, item) => sum + item.estimatedRecoveryTime, 0) /
        impactData.length
      : 0;

  const totalOutages = impactData.reduce(
    (sum, item) => sum + item.outageCount,
    0
  );

  const currentlyOfflineSectors = impactData.filter(
    (item) => item.currentlyOffline
  ).length;

  const criticalSectors = impactData.filter(
    (item) => item.operationalImpact === "CRITICAL"
  ).length;

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "CRITICAL":
        return "#F44336";
      case "HIGH":
        return "#FF9800";
      case "MEDIUM":
        return "#FFC107";
      case "LOW":
        return "#4CAF50";
      default:
        return "#9E9E9E";
    }
  };

  return (
    <>
      <Styled.SummaryCard>
        <Card.Content>
          <Styled.CardTitle>Resumo Geral do Impacto</Styled.CardTitle>
          <Styled.SummaryGrid>
            <Styled.SummaryItem>
              <Ionicons name="people" size={24} color="#F44336" />
              <Styled.SummaryValue>{totalAffectedPatients}</Styled.SummaryValue>
              <Styled.SummaryLabel>Pacientes Afetados</Styled.SummaryLabel>
            </Styled.SummaryItem>

            <Styled.SummaryItem>
              <Ionicons name="medical" size={24} color="#FF9800" />
              <Styled.SummaryValue>
                {totalCriticalEquipment}
              </Styled.SummaryValue>
              <Styled.SummaryLabel>Equipamentos Críticos</Styled.SummaryLabel>
            </Styled.SummaryItem>

            <Styled.SummaryItem>
              <Ionicons name="cash" size={24} color="#9C27B0" />
              <Styled.SummaryValue>
                {formatCurrency(costAnalysis.total)}
              </Styled.SummaryValue>
              <Styled.SummaryLabel>Impacto Financeiro</Styled.SummaryLabel>
            </Styled.SummaryItem>

            <Styled.SummaryItem>
              <Ionicons name="time" size={24} color="#2196F3" />
              <Styled.SummaryValue>
                {Math.round(averageRecoveryTime)}min
              </Styled.SummaryValue>
              <Styled.SummaryLabel>Tempo Médio Recuperação</Styled.SummaryLabel>
            </Styled.SummaryItem>
          </Styled.SummaryGrid>
        </Card.Content>
      </Styled.SummaryCard>

      <Styled.SummaryCard>
        <Card.Content>
          <Styled.CardTitle>Indicadores Operacionais</Styled.CardTitle>
          <Styled.SummaryGrid>
            <Styled.SummaryItem>
              <Ionicons name="flash-off" size={24} color="#F44336" />
              <Styled.SummaryValue>{totalOutages}</Styled.SummaryValue>
              <Styled.SummaryLabel>Total de Quedas</Styled.SummaryLabel>
            </Styled.SummaryItem>

            <Styled.SummaryItem>
              <Ionicons name="warning" size={24} color="#FF5722" />
              <Styled.SummaryValue>
                {currentlyOfflineSectors}
              </Styled.SummaryValue>
              <Styled.SummaryLabel>Setores Offline</Styled.SummaryLabel>
            </Styled.SummaryItem>

            <Styled.SummaryItem>
              <Ionicons name="alert-circle" size={24} color="#E91E63" />
              <Styled.SummaryValue>{criticalSectors}</Styled.SummaryValue>
              <Styled.SummaryLabel>Setores Críticos</Styled.SummaryLabel>
            </Styled.SummaryItem>

            <Styled.SummaryItem>
              <Ionicons name="business" size={24} color="#3F51B5" />
              <Styled.SummaryValue>{impactData.length}</Styled.SummaryValue>
              <Styled.SummaryLabel>Setores Monitorados</Styled.SummaryLabel>
            </Styled.SummaryItem>
          </Styled.SummaryGrid>
        </Card.Content>
      </Styled.SummaryCard>

      <Styled.SummaryCard>
        <Card.Content>
          <Styled.CardTitle>Análise de Custos</Styled.CardTitle>
          <Styled.CostBreakdown>
            <Styled.CostItem>
              <Styled.CostLabel>Danos a Equipamentos</Styled.CostLabel>
              <Styled.CostValue>
                {formatCurrency(costAnalysis.equipmentDamage)}
              </Styled.CostValue>
            </Styled.CostItem>

            <Styled.CostItem>
              <Styled.CostLabel>Receita Perdida</Styled.CostLabel>
              <Styled.CostValue>
                {formatCurrency(costAnalysis.lostRevenue)}
              </Styled.CostValue>
            </Styled.CostItem>

            <Styled.CostItem>
              <Styled.CostLabel>Resposta Emergencial</Styled.CostLabel>
              <Styled.CostValue>
                {formatCurrency(costAnalysis.emergencyResponse)}
              </Styled.CostValue>
            </Styled.CostItem>

            <Styled.CostItem>
              <Styled.CostLabel>Transferência de Pacientes</Styled.CostLabel>
              <Styled.CostValue>
                {formatCurrency(costAnalysis.patientTransfer)}
              </Styled.CostValue>
            </Styled.CostItem>
          </Styled.CostBreakdown>
        </Card.Content>
      </Styled.SummaryCard>

      {impactData.length > 0 && (
        <Styled.SummaryCard>
          <Card.Content>
            <Styled.CardTitle>Impacto por Setor</Styled.CardTitle>
            {impactData.map((sector, index) => (
              <Styled.SectorImpactItem key={index}>
                <Styled.SectorHeader>
                  <Styled.SectorName>{sector.sector}</Styled.SectorName>
                  <Styled.ImpactBadge
                    color={getImpactColor(sector.operationalImpact)}
                  >
                    {sector.operationalImpact}
                  </Styled.ImpactBadge>
                </Styled.SectorHeader>

                <Styled.SectorDetails>
                  <Styled.SectorDetail>
                    <Ionicons name="people" size={16} color="#666" />
                    <Styled.DetailText>
                      {sector.affectedPatients} pacientes
                    </Styled.DetailText>
                  </Styled.SectorDetail>

                  <Styled.SectorDetail>
                    <Ionicons name="medical" size={16} color="#666" />
                    <Styled.DetailText>
                      {sector.criticalEquipment} equipamentos
                    </Styled.DetailText>
                  </Styled.SectorDetail>

                  <Styled.SectorDetail>
                    <Ionicons name="cash" size={16} color="#666" />
                    <Styled.DetailText>
                      {formatCurrency(sector.financialImpact)}
                    </Styled.DetailText>
                  </Styled.SectorDetail>

                  {sector.currentlyOffline && (
                    <Styled.SectorDetail>
                      <Ionicons name="flash-off" size={16} color="#F44336" />
                      <Styled.DetailText style={{ color: "#F44336" }}>
                        Offline
                      </Styled.DetailText>
                    </Styled.SectorDetail>
                  )}
                </Styled.SectorDetails>
              </Styled.SectorImpactItem>
            ))}
          </Card.Content>
        </Styled.SummaryCard>
      )}
      {patientImpact.length > 0 && (
        <Styled.SummaryCard>
          <Card.Content>
            <Styled.CardTitle>Impacto nos Pacientes</Styled.CardTitle>
            {patientImpact.map((impact, index) => (
              <Styled.PatientImpactItem key={index}>
                <Styled.PatientImpactHeader>
                  <Styled.PatientCategory>
                    {impact.category}
                  </Styled.PatientCategory>
                  <Styled.PatientCount color={getImpactColor(impact.riskLevel)}>
                    {impact.count}
                  </Styled.PatientCount>
                </Styled.PatientImpactHeader>
                <Styled.PatientDescription>
                  {impact.description}
                </Styled.PatientDescription>
              </Styled.PatientImpactItem>
            ))}
          </Card.Content>
        </Styled.SummaryCard>
      )}
    </>
  );
};

export default ImpactSummary;
