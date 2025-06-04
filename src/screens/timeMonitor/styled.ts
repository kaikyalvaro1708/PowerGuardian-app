import { Platform } from "react-native";
import styled from "styled-components/native";

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: #f5f5f5;
  padding-top: ${Platform.OS === "android" ? "50px" : "0px"};
  padding-bottom: ${Platform.OS === "android" ? "100px" : "0px"};
`;

const ScrollView = styled.ScrollView`
  flex: 1;
`;

const BottomSpacer = styled.View`
  height: 80px;
`;

const SectionContainer = styled.View({
  margin: 16,
  backgroundColor: "#ffffff",
  borderRadius: 12,
  padding: 16,
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 4,
  elevation: 3,
});

const SectionTitle = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: #333333;
  margin-bottom: 16px;
  text-align: center;
`;

const EmptyState = styled.View`
  align-items: center;
  justify-content: center;
  padding: 32px 16px;
`;

const EmptyStateText = styled.Text`
  font-size: 16px;
  color: #666666;
  text-align: center;
`;

const OutageCard = styled.View`
  background-color: #f8f9fa;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 12px;
  border-left-width: 4px;
  border-left-color: #007bff;
`;

const OutageHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
`;

const SectorName = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #333333;
  flex: 1;
`;

const SeverityBadge = styled.View<{ severity: string }>`
  background-color: ${(props) => props.severity};
  border-radius: 12px;
  padding: 4px 12px;
`;

const SeverityText = styled.Text`
  color: #ffffff;
  font-size: 12px;
  font-weight: bold;
`;

const TimeInfo = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 12px;
`;

const TimeLabel = styled.Text`
  font-size: 16px;
  color: #666666;
  margin-right: 8px;
`;

const TimeValue = styled.Text<{ isOngoing: boolean }>`
  font-size: 16px;
  font-weight: bold;
  color: ${(props) => (props.isOngoing ? "#FF4444" : "#28a745")};
`;

const OutageDetails = styled.View`
  border-top-width: 1px;
  border-top-color: #e9ecef;
  padding-top: 12px;
`;

const DetailText = styled.Text`
  font-size: 14px;
  color: #666666;
  margin-bottom: 4px;
  line-height: 20px;
`;

export const TimeMonitorStyled = {
  Container,
  ScrollView,
  BottomSpacer,
  SectionContainer,
  SectionTitle,
  EmptyState,
  EmptyStateText,
  OutageCard,
  OutageHeader,
  SectorName,
  SeverityBadge,
  SeverityText,
  TimeInfo,
  TimeLabel,
  TimeValue,
  OutageDetails,
  DetailText,
};
