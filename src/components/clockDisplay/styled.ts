import styled from "styled-components/native";
import { Card, Text } from "react-native-paper";
import { Dimensions } from "react-native";

const { width: screenWidth } = Dimensions.get("window");

const ClockCard = styled(Card)`
  background-color: #fff;
  margin: ${screenWidth * 0.04}px;
  margin-bottom: ${screenWidth * 0.02}px;
`;

const ClockContainer = styled.View`
  align-items: center;
  padding: ${screenWidth * 0.02}px 0;
`;

const CurrentTime = styled(Text)`
  font-size: ${Math.min(screenWidth * 0.08, 32)}px;
  font-weight: bold;
  color: #1976d2;
  font-family: monospace;
`;

const CurrentDate = styled(Text)`
  font-size: ${Math.min(screenWidth * 0.04, 16)}px;
  color: #666;
  margin-top: 4px;
  text-align: center;
  padding: 0 ${screenWidth * 0.02}px;
`;

export const ClockDisplayStyled = {
  ClockCard,
  ClockContainer,
  CurrentTime,
  CurrentDate,
};
