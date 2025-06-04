// components/RecommendedActions/styled.ts
import styled from "styled-components/native";
import { Card, Text, Surface } from "react-native-paper";

const ActionsCard = styled(Card)`
  background-color: white;
  margin: 16px;
  margin-top: 8px;
`;

const CardTitle = styled(Text)`
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin-bottom: 12px;
`;

const ActionsList = styled.View`
  gap: 12px;
`;

const ActionItem = styled(Surface)`
  background-color: #f5f5f5;
  padding: 12px;
  border-radius: 8px;
`;

const ActionHeader = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 8px;
`;

const ActionTitle = styled(Text)`
  font-size: 16px;
  font-weight: bold;
  color: #333;
  margin-left: 8px;
`;

const ActionDescription = styled(Text)`
  font-size: 14px;
  color: #666;
  line-height: 20px;
`;

export const RecommendedActionsStyled = {
  ActionsCard,
  CardTitle,
  ActionsList,
  ActionItem,
  ActionHeader,
  ActionTitle,
  ActionDescription,
};
