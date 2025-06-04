import styled from "styled-components/native";
import { Title, Text, Card } from "react-native-paper";

const sectorsCard = {
  marginBottom: 16,
  backgroundColor: "white",
  borderRadius: 8,
  elevation: 2,
};

const cardContent = { padding: 16 };
const addButton = { backgroundColor: "#2196f3" };
const sectorContent = { padding: 12 };
const statusChipStyle = { minWidth: 60 };
const deleteButton = { margin: 0, backgroundColor: "transparent" };

const headerContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const cardTitle = styled(Title)`
  font-size: 18px;
  font-weight: bold;
  color: #333;
`;

const emptyContainer = styled.View`
  align-items: center;
  padding: 32px 16px;
`;

const emptyText = styled(Text)`
  font-size: 16px;
  color: #666;
  text-align: center;
  margin-bottom: 8px;
`;

const emptySubtext = styled(Text)`
  font-size: 14px;
  color: #999;
  text-align: center;
`;

const sectorsList = styled.View`
  gap: 12px;
`;

const sectorCard = styled(Card)`
  background-color: #f8f9fa;
  border-radius: 8px;
  border-left-width: 4px;
  border-left-color: #2196f3;
`;

const sectorHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
`;

const sectorInfo = styled.View`
  flex: 1;
`;

const titleRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`;

const hospitalName = styled(Text)`
  font-size: 16px;
  font-weight: bold;
  color: #333;
  flex: 1;
  margin-right: 8px;
`;

const statusChip = styled(Text)`
  font-size: 10px;
  font-weight: bold;
  color: white;
  padding: 4px 8px;
  border-radius: 12px;
  text-align: center;
`;

const sectorNameRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`;

const sectorName = styled(Text)`
  font-size: 16px;
  font-weight: bold;
  color: #333;
  flex: 1;
`;

const floorText = styled(Text)`
  font-size: 14px;
  color: #666;
`;

const locationRow = styled.View`
  margin-bottom: 6px;
`;

const locationText = styled(Text)`
  font-size: 12px;
  color: #666;
`;

const descriptionText = styled(Text)`
  font-size: 11px;
  color: #888;
  font-style: italic;
`;

const metricsContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  background-color: white;
  padding: 12px;
  border-radius: 8px;
  margin: 8px 0;
`;

const metricItem = styled.View`
  align-items: center;
  flex: 1;
`;

const metricIcon = styled(Text)`
  font-size: 18px;
  margin-bottom: 4px;
`;

const metricValue = styled(Text)`
  font-size: 14px;
  font-weight: bold;
  color: #333;
  text-align: center;
`;

const lastUpdateText = styled(Text)`
  font-size: 12px;
  color: #999;
`;

export const HospitalSectorsListStyled = {
  sectorsCard,
  cardContent,
  headerContainer,
  cardTitle,
  addButton,
  emptyContainer,
  emptyText,
  emptySubtext,
  sectorsList,
  sectorCard,
  sectorContent,
  sectorHeader,
  sectorInfo,
  titleRow,
  hospitalName,
  statusChip,
  statusChipStyle,
  sectorNameRow,
  sectorName,
  floorText,
  locationRow,
  locationText,
  descriptionText,
  metricsContainer,
  metricItem,
  metricIcon,
  metricValue,
  lastUpdateText,
  deleteButton,
};
