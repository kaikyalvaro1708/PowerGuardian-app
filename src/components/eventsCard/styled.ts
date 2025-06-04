// components/EventsCard/styled.ts
import styled from "styled-components/native";
import { Dimensions } from "react-native";

const { width } = Dimensions.get("window");

const eventsCard = {
  backgroundColor: "#fff",
  margin: 16,
  marginTop: 8,
  marginBottom: 8,
  elevation: 3,
};

const CardTitle = styled.Text`
  font-size: ${width < 360 ? "16px" : "18px"};
  font-weight: bold;
  color: #333;
  margin-bottom: 12px;
`;

const EventItem = styled.View`
  padding: ${width < 360 ? "6px 0" : "8px 0"};
  border-bottom-width: 1px;
  border-bottom-color: #eee;
`;

const EventHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4px;
  flex-wrap: wrap;
  gap: 8px;
`;

const severityChip = {
  height: width < 360 ? 18 : 20,
  flex: 0,
};

const EventTime = styled.Text`
  font-size: ${width < 360 ? "10px" : "12px"};
  color: #666;
  text-align: right;
`;

const eventMessage = {
  fontSize: width < 360 ? 12 : 14,
  color: "#333",
  lineHeight: width < 360 ? 18 : 20,
  marginTop: 4,
};

const NoEvents = styled.Text`
  text-align: center;
  color: #666;
  font-style: italic;
  padding: 20px 0;
  font-size: ${width < 360 ? "12px" : "14px"};
`;

export const EventsCardStyled = {
  eventsCard,
  CardTitle,
  EventItem,
  EventHeader,
  severityChip,
  EventTime,
  eventMessage,
  NoEvents,
};
