import styled from "styled-components/native";
import { Dimensions } from "react-native";

const { width } = Dimensions.get("window");

const statusCard = {
  backgroundColor: "#fff",
  margin: 16,
  marginBottom: 8,
  borderLeftWidth: 4,
  elevation: 3,
};

const StatusHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  flex-wrap: wrap;
`;

const StatusTitle = styled.Text`
  font-size: ${width < 360 ? "18px" : "20px"};
  font-weight: bold;
  color: #333;
  flex: 1;
  min-width: 120px;
`;

const statusChip = {
  elevation: 2,
  marginLeft: 8,
};

const StatusGrid = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: ${width < 360 ? "4px" : "8px"};
`;

const StatusItem = styled.View`
  width: 100%;  
  min-width: 140px;
  align-items: center;
  padding: ${width < 360 ? "8px" : "12px"};
  background-color: #f5f5f5;
  border-radius: 8px;
  margin-bottom: 8px;
`;

const StatusLabel = styled.Text`
  font-size: ${width < 360 ? "10px" : "12px"};
  color: #666;
  margin-top: 4px;
  text-align: center;
  line-height: 16px;
`;

const StatusValue = styled.Text<{ color: string }>`
  font-size: ${width < 360 ? "12px" : "14px"};
  font-weight: bold;
  margin-top: 2px;
  color: ${(props) => props.color};
  text-align: center;
`;

export const StatusCardStyled = {
  statusCard,
  StatusHeader,
  StatusTitle,
  statusChip,
  StatusGrid,
  StatusItem,
  StatusLabel,
  StatusValue,
};
