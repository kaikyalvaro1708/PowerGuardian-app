import styled from "styled-components/native";
import { Dimensions, Platform } from "react-native";

const { width, height } = Dimensions.get("window");

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: #f5f5f5;
  padding-top: ${Platform.OS === "android" ? "50px" : "0px"};
  padding-bottom: ${Platform.OS === "android" ? "100px" : "0px"};
`;

const scrollView = {
  flex: 1,
};

const scrollContent = {
  paddingBottom: Platform.OS === "android" ? 80 : 120,
  minHeight: height - (Platform.OS === "android" ? 140 : 180),
};

const header = {
  flexDirection: "row" as const,
  justifyContent: "space-between" as const,
  alignItems: "center" as const,
  backgroundColor: "#1976d2",
  padding: width < 360 ? 12 : 16,
  elevation: 4,
  paddingTop: 40,
};

const UserInfo = styled.View`
  flex: 1;
  margin-right: 12px;
`;

const WelcomeText = styled.Text`
  color: #fff;
  font-size: ${width < 360 ? "16px" : "18px"};
  font-weight: bold;
`;

const HospitalText = styled.Text`
  color: #fff;
  font-size: ${width < 360 ? "12px" : "14px"};
  opacity: 0.9;
  margin-top: 2px;
`;

const RoleText = styled.Text`
  color: #fff;
  font-size: ${width < 360 ? "10px" : "12px"};
  opacity: 0.8;
  margin-top: 1px;
`;

const bottomSpacing = {
  height: Platform.OS === "android" ? 20 : 30,
};

export const DashboardStyled = {
  Container,
  scrollView,
  scrollContent,
  header,
  UserInfo,
  WelcomeText,
  HospitalText,
  RoleText,
  bottomSpacing,
};
