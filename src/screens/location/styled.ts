import styled from "styled-components/native";
import {  Platform } from "react-native";

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: #f5f5f5;
  padding-top: ${Platform.OS === "android" ? "50px" : "0px"};
  padding-bottom: ${Platform.OS === "android" ? "100px" : "0px"};
`;

const scrollView = {
  flex: 1,
};

const scrollViewContent = {
  paddingBottom: 80,
};

const bottomSpacing = {
  height: 20,
};

export const LocationStyled = {
  Container,
  scrollView,
  scrollViewContent,
  bottomSpacing,
};
