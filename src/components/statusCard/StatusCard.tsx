import React from "react";
import { Card, Chip } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { StatusCardStyled as Styled } from "./styled";

export interface HospitalStatus {
  overall: "NORMAL" | "WARNING" | "CRITICAL" | "EMERGENCY";
  powerGrid: boolean;
  backupGenerator: boolean;
  batteryLevel: number;
  affectedSectors: number;
}

interface StatusCardProps {
  hospitalStatus: HospitalStatus;
}

const StatusCard: React.FC<StatusCardProps> = ({ hospitalStatus }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "NORMAL":
        return "#4CAF50";
      case "WARNING":
        return "#FF9800";
      case "CRITICAL":
        return "#F44336";
      case "EMERGENCY":
        return "#9C27B0";
      default:
        return "#757575";
    }
  };

  return (
    <Card
      style={[
        Styled.statusCard,
        { borderLeftColor: getStatusColor(hospitalStatus.overall) },
      ]}
    >
      <Card.Content>
        <Styled.StatusHeader>
          <Styled.StatusTitle>Status Geral</Styled.StatusTitle>
          <Chip
            icon="circle"
            style={[
              Styled.statusChip,
              { backgroundColor: getStatusColor(hospitalStatus.overall) },
            ]}
            textStyle={{ color: "#fff" }}
          >
            {hospitalStatus.overall}
          </Chip>
        </Styled.StatusHeader>

        <Styled.StatusGrid>
          <Styled.StatusItem>
            <Ionicons
              name={hospitalStatus.powerGrid ? "flash" : "flash-off"}
              size={24}
              color={hospitalStatus.powerGrid ? "#4CAF50" : "#F44336"}
            />
            <Styled.StatusLabel>Rede Elétrica</Styled.StatusLabel>
            <Styled.StatusValue
              color={hospitalStatus.powerGrid ? "#4CAF50" : "#F44336"}
            >
              {hospitalStatus.powerGrid ? "Normal" : "Falha"}
            </Styled.StatusValue>
          </Styled.StatusItem>

          <Styled.StatusItem>
            <Ionicons
              name={
                hospitalStatus.backupGenerator
                  ? "battery-charging"
                  : "battery-dead"
              }
              size={24}
              color={hospitalStatus.backupGenerator ? "#FF9800" : "#757575"}
            />
            <Styled.StatusLabel>Gerador</Styled.StatusLabel>
            <Styled.StatusValue
              color={hospitalStatus.backupGenerator ? "#FF9800" : "#757575"}
            >
              {hospitalStatus.backupGenerator ? "Ativo" : "Standby"}
            </Styled.StatusValue>
          </Styled.StatusItem>

          <Styled.StatusItem>
            <Ionicons name="battery-half" size={24} color="#4CAF50" />
            <Styled.StatusLabel>Bateria</Styled.StatusLabel>
            <Styled.StatusValue color="#4CAF50">
              {hospitalStatus.batteryLevel}%
            </Styled.StatusValue>
          </Styled.StatusItem>

          <Styled.StatusItem>
            <Ionicons
              name="alert-circle"
              size={24}
              color={hospitalStatus.affectedSectors > 0 ? "#F44336" : "#4CAF50"}
            />
            <Styled.StatusLabel>Setores Afetados</Styled.StatusLabel>
            <Styled.StatusValue
              color={hospitalStatus.affectedSectors > 0 ? "#F44336" : "#4CAF50"}
            >
              {hospitalStatus.affectedSectors}
            </Styled.StatusValue>
          </Styled.StatusItem>
        </Styled.StatusGrid>
      </Card.Content>
    </Card>
  );
};

export default StatusCard;
