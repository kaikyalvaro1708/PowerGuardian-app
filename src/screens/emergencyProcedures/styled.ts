import styled from "styled-components/native";
import { Card, Title, Button, Chip, Text, Surface } from "react-native-paper";
import { ScrollView, Dimensions, Platform } from "react-native";

const { width } = Dimensions.get("window");

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: #f5f5f5;
  padding-top: ${Platform.OS === "android" ? "50px" : "0px"};
  padding-bottom: ${Platform.OS === "android" ? "100px" : "0px"};
`;

const ScrollContainer = styled(ScrollView)`
  flex: 1;
`;

const FilterCard = styled(Card)`
  background-color: #fff;
  margin: 16px;
  margin-bottom: 8px;
`;

const FilterButtons = styled.View`
  flex-direction: row;
  gap: 8px;
`;

const FilterButton = styled(Button)`
  margin-right: 8px;
`;

const ProceduresCard = styled(Card)`
  background-color: #fff;
  margin: 16px;
  margin-top: 8px;
  margin-bottom: 8px;
`;

const CardTitle = styled(Title)`
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin-bottom: 12px;
`;

interface ProcedureItemProps {
  $isActive: boolean;
}

const ProcedureItem = styled(Surface)<ProcedureItemProps>`
  background-color: #f9f9f9;
  padding: 16px;
  margin-bottom: 12px;
  border-radius: 8px;
  ${({ $isActive }) =>
    $isActive &&
    `
    border-left-width: 4px;
    border-left-color: #F44336;
    background-color: #FFEBEE;
  `}
`;

const ActiveProcedure = styled(Surface)`
  border-left-width: 4px;
  border-left-color: #f44336;
  background-color: #ffebee;
`;

const ProcedureHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
`;

const ProcedureInfo = styled.View`
  flex: 1;
`;

const ProcedureTitle = styled(Text)`
  font-size: 16px;
  font-weight: bold;
  color: #333;
  margin-bottom: 8px;
`;

const ProcedureTags = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  gap: 6px;
`;

interface ChipProps {
  $backgroundColor: string;
}

const CategoryChip = styled(Chip)<ChipProps>`
  height: auto;
  background-color: ${({ $backgroundColor }) => $backgroundColor};
`;

const PriorityChip = styled(Chip)<ChipProps>`
  height: auto;
  background-color: ${({ $backgroundColor }) => $backgroundColor};
`;

const ActiveChip = styled(Chip)`
  height: auto;
  background-color: #f44336;
`;

const ProcedureStats = styled.View`
  flex-direction: row;
  gap: 16px;
  margin-bottom: 8px;
`;

const StatItem = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 6px;
`;

const StatText = styled(Text)`
  font-size: 12px;
  color: #666;
`;

const ExpandedContent = styled.View`
  margin-top: 12px;
  padding-top: 12px;
  border-top-width: 1px;
  border-top-color: #e0e0e0;
`;

const SectionTitle = styled(Text)`
  font-size: 14px;
  font-weight: bold;
  color: #333;
  margin-bottom: 8px;
  margin-top: 12px;
`;

const StepItem = styled.View`
  flex-direction: row;
  align-items: flex-start;
  margin-bottom: 8px;
  padding-right: 16px;
`;

const StepNumber = styled.View`
  width: 24px;
  height: 24px;
  border-radius: 12px;
  background-color: #1976d2;
  justify-content: center;
  align-items: center;
  margin-right: 12px;
  margin-top: 2px;
`;

const StepNumberText = styled(Text)`
  color: #fff;
  font-size: 12px;
  font-weight: bold;
`;

const StepText = styled(Text)`
  flex: 1;
  font-size: 14px;
  color: #333;
  line-height: 20px;
`;

const EquipmentList = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 12px;
`;

const EquipmentChip = styled(Chip)`
  background-color: #333;
`;

const ProcedureFooter = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 12px;
`;

const LastReviewed = styled(Text)`
  font-size: 12px;
  color: #666;
  font-style: italic;
`;

const StopButton = styled(Button)`
  padding: 0 16px;
`;

const ContactsCard = styled(Card)`
  background-color: #f5f5f5;
  margin: 16px;
  margin-top: 8px;
`;

const ContactItem = styled(Surface)`
  background-color: #f9f9f9;
  padding: 16px;
  margin-bottom: 12px;
  border-radius: 8px;
`;

const ContactHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
`;

const ContactInfo = styled.View`
  flex: 1;
`;

const ContactName = styled(Text)`
  font-size: 16px;
  font-weight: bold;
  color: #333;
`;

const ContactRole = styled(Text)`
  font-size: 14px;
  color: #666;
  margin-top: 2px;
`;

const AvailabilityChip = styled(Chip)<ChipProps>`
  height: auto;
  background-color: ${({ $backgroundColor }) => $backgroundColor};
`;

const ContactDetails = styled.View`
  gap: 8px;
`;

const ContactDetail = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 8px;
`;

const ContactText = styled(Text)`
  font-size: 14px;
  color: #666;
  flex: 1;
`;

const Spacer = styled.View`
  height: 20px;
`;

export const EmergencyProceduresStyled = {
  Container,
  ScrollContainer,
  FilterCard,
  FilterButtons,
  FilterButton,
  ProceduresCard,
  CardTitle,
  ProcedureItem,
  ActiveProcedure,
  ProcedureHeader,
  ProcedureInfo,
  ProcedureTitle,
  ProcedureTags,
  CategoryChip,
  PriorityChip,
  ActiveChip,
  ProcedureStats,
  StatItem,
  StatText,
  ExpandedContent,
  SectionTitle,
  StepItem,
  StepNumber,
  StepNumberText,
  StepText,
  EquipmentList,
  EquipmentChip,
  ProcedureFooter,
  LastReviewed,
  StopButton,
  ContactsCard,
  ContactItem,
  ContactHeader,
  ContactInfo,
  ContactName,
  ContactRole,
  AvailabilityChip,
  ContactDetails,
  ContactDetail,
  ContactText,
  Spacer,
};
