// components/ImpactSummary/styled.ts (atualizado)
import styled from "styled-components/native";
import { Card, Text } from "react-native-paper";

const SummaryCard = styled(Card)`
  background-color: #fff;
  margin: 16px;
  margin-top: 8px;
  margin-bottom: 8px;
`;

const CardTitle = styled(Text)`
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin-bottom: 12px;
`;

const SummaryGrid = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const SummaryItem = styled.View`
  width: 48%;
  align-items: center;
  padding: 16px;
  background-color: #f5f5f5;
  border-radius: 8px;
  margin-bottom: 8px;
`;

const SummaryValue = styled(Text)`
  font-size: 20px;
  font-weight: bold;
  color: #333;
  margin-top: 8px;
`;

const SummaryLabel = styled(Text)`
  font-size: 12px;
  color: #666;
  margin-top: 4px;
  text-align: center;
`;

const CostBreakdown = styled.View`
  padding: 8px 0;
`;

const CostItem = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  border-bottom-width: 1px;
  border-bottom-color: #eee;
`;

const CostLabel = styled(Text)`
  font-size: 14px;
  color: #666;
  flex: 1;
`;

const CostValue = styled(Text)`
  font-size: 16px;
  font-weight: bold;
  color: #333;
`;

const SectorImpactItem = styled.View`
  padding: 12px;
  margin-bottom: 8px;
  background-color: #f9f9f9;
  border-radius: 8px;
`;

const SectorHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`;

const SectorName = styled(Text)`
  font-size: 16px;
  font-weight: bold;
  color: #333;
  flex: 1;
`;

const ImpactBadge = styled(Text)<{ color: string }>`
  background-color: ${(props) => props.color};
  color: white;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: bold;
  text-align: center;
  overflow: hidden;
`;

const SectorDetails = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  gap: 12px;
`;

const SectorDetail = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 4px;
`;

const DetailText = styled(Text)`
  font-size: 12px;
  color: #666;
`;

const PatientImpactItem = styled.View`
  padding: 12px;
  margin-bottom: 8px;
  background-color: #f9f9f9;
  border-radius: 8px;
`;

const PatientImpactHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4px;
`;

const PatientCategory = styled(Text)`
  font-size: 14px;
  font-weight: bold;
  color: #333;
  flex: 1;
`;

const PatientCount = styled(Text)<{ color: string }>`
  font-size: 18px;
  font-weight: bold;
  color: ${(props) => props.color};
`;

const PatientDescription = styled(Text)`
  font-size: 12px;
  color: #666;
  font-style: italic;
`;

const LoadingText = styled(Text)`
  font-size: 16px;
  color: #666;
  text-align: center;
`;

export const ImpactSummaryStyled = {
  SummaryCard,
  CardTitle,
  SummaryGrid,
  SummaryItem,
  SummaryValue,
  SummaryLabel,
  CostBreakdown,
  CostItem,
  CostLabel,
  CostValue,
  SectorImpactItem,
  SectorHeader,
  SectorName,
  ImpactBadge,
  SectorDetails,
  SectorDetail,
  DetailText,
  PatientImpactItem,
  PatientImpactHeader,
  PatientCategory,
  PatientCount,
  PatientDescription,
  LoadingText,
};
