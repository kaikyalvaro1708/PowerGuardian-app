import styled from "styled-components/native";
import { Platform } from "react-native";

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: #f5f5f5;
  height: auto;
  padding-top: ${Platform.OS === "android" ? "50px" : "0px"};
  padding-bottom: ${Platform.OS === "android" ? "100px" : "0px"};
`;

const ScrollContainer = styled.ScrollView`
  flex: 1;
`;

const LoadingText = styled.Text`
  font-size: 16px;
  color: #666;
  text-align: center;
`;

export const AnalysisImpactStyled = {
  Container,
  ScrollContainer,
  LoadingText,
};
