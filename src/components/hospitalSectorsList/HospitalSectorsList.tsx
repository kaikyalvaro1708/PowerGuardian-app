import React, { useState } from "react";
import { View, Alert } from "react-native";
import { Card, Button, IconButton } from "react-native-paper";
import { HospitalSectorsListStyled as Styled } from "./styled";
import { HospitalSector, PowerOutage } from "../../services/StorageService";

interface Props {
  sectors: HospitalSector[];
  onAddSector: () => void;
  onRemoveSector: (sectorId: string) => void;
  onUpdateSector: (sectorId: string, updates: Partial<HospitalSector>) => void;
  onAddPowerOutage: (sectorId: string, outage: Omit<PowerOutage, "id">) => void;
  onEndPowerOutage: (sectorId: string, outageId: string, endTime: Date) => void;
}

const HospitalSectorsList: React.FC<Props> = ({
  sectors,
  onAddSector,
  onRemoveSector,
  onEndPowerOutage,
}) => {
  const handleRemoveSector = (sector: HospitalSector) => {
    Alert.alert("Remover Setor", `Deseja remover o setor "${sector.name}"?`, [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Remover",
        style: "destructive",
        onPress: () => onRemoveSector(sector.id),
      },
    ]);
  };

  const handleEndOutage = (sector: HospitalSector) => {
    if (sector.currentOutage) {
      Alert.alert(
        "Finalizar Queda de Energia",
        `Finalizar queda no setor "${sector.name}"?`,
        [
          { text: "Cancelar", style: "cancel" },
          {
            text: "Finalizar",
            onPress: () =>
              onEndPowerOutage(sector.id, sector.currentOutage!.id, new Date()),
          },
        ]
      );
    }
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      NORMAL: "#4caf50",
      WARNING: "#ff9800",
      CRITICAL: "#f44336",
      OFFLINE: "#757575",
    };
    return colors[status] || "#757575";
  };

  const getStatusLabel = (status: string) => {
    const labels: Record<string, string> = {
      NORMAL: "NORMAL",
      WARNING: "ATENÇÃO",
      CRITICAL: "CRÍTICO",
      OFFLINE: "OFFLINE",
    };
    return labels[status] || status;
  };

  const formatDate = (date: Date) => {
    return date.toLocaleString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}min` : `${mins}min`;
  };

  const getFloorText = (floor: number) => {
    if (floor === 0) return "Térreo";
    if (floor < 0) return `${Math.abs(floor)}º Subsolo`;
    return `${floor}º Andar`;
  };

  const getCurrentOutageDuration = (outage: PowerOutage) => {
    return Math.floor(
      (new Date().getTime() - outage.startTime.getTime()) / (1000 * 60)
    );
  };

  return (
    <Card style={Styled.sectorsCard}>
      <Card.Content style={Styled.cardContent}>
        <Styled.headerContainer>
          <Styled.cardTitle>Setores Hospitalares</Styled.cardTitle>
          <Button
            mode="contained"
            onPress={onAddSector}
            icon="plus"
            style={Styled.addButton}
            compact
          >
            Adicionar
          </Button>
        </Styled.headerContainer>

        {sectors.length === 0 ? (
          <Styled.emptyContainer>
            <Styled.emptyText>
              Nenhum setor hospitalar cadastrado
            </Styled.emptyText>
            <Styled.emptySubtext>
              Toque em "Adicionar" para cadastrar um novo setor
            </Styled.emptySubtext>
          </Styled.emptyContainer>
        ) : (
          <Styled.sectorsList>
            {sectors.map((sector) => (
              <Styled.sectorCard key={sector.id}>
                <Card.Content style={Styled.sectorContent}>
                  <Styled.sectorHeader>
                    <Styled.sectorInfo>
                      <Styled.titleRow>
                        <Styled.hospitalName>
                          {sector.region.name}
                        </Styled.hospitalName>
                        <Styled.statusChip
                          style={[
                            Styled.statusChipStyle,
                            { backgroundColor: getStatusColor(sector.status) },
                          ]}
                        >
                          {getStatusLabel(sector.status)}
                        </Styled.statusChip>
                      </Styled.titleRow>

                      <Styled.sectorNameRow>
                        <Styled.sectorName>{sector.name}</Styled.sectorName>
                        <Styled.floorText>
                          {getFloorText(sector.floor)}
                        </Styled.floorText>
                      </Styled.sectorNameRow>

                      <Styled.locationRow>
                        <Styled.locationText>
                          {sector.region.type}: {sector.region.value}
                        </Styled.locationText>
                      </Styled.locationRow>

                      {sector.currentOutage && (
                        <View
                          style={{
                            backgroundColor: "#ffebee",
                            padding: 8,
                            borderRadius: 4,
                            marginVertical: 4,
                          }}
                        >
                          <Styled.locationText
                            style={{ color: "#d32f2f", fontWeight: "bold" }}
                          >
                            ⚠️ SEM ENERGIA -{" "}
                            {formatDuration(
                              getCurrentOutageDuration(sector.currentOutage)
                            )}
                          </Styled.locationText>
                          <Styled.descriptionText style={{ fontSize: 12 }}>
                            Iniciado:{" "}
                            {formatDate(sector.currentOutage.startTime)}
                          </Styled.descriptionText>
                          <Button
                            mode="outlined"
                            onPress={() => handleEndOutage(sector)}
                            style={{ marginTop: 4 }}
                            textColor="#ff3f3f"
                            compact
                          >
                            Finalizar Queda
                          </Button>
                        </View>
                      )}

                      <Styled.metricsContainer>
                        <Styled.metricItem>
                          <Styled.metricIcon>⚡</Styled.metricIcon>
                          <Styled.metricValue>
                            {sector.powerConsumption}%
                          </Styled.metricValue>
                        </Styled.metricItem>
                        <Styled.metricItem>
                          <Styled.metricIcon>🧰</Styled.metricIcon>
                          <Styled.metricValue>
                            {sector.criticalEquipment}
                          </Styled.metricValue>
                        </Styled.metricItem>
                        {sector.region.affectedPopulation && (
                          <Styled.metricItem>
                            <Styled.metricIcon>👥</Styled.metricIcon>
                            <Styled.metricValue>
                              {sector.region.affectedPopulation.toLocaleString(
                                "pt-BR"
                              )}
                            </Styled.metricValue>
                          </Styled.metricItem>
                        )}
                      </Styled.metricsContainer>

                      <Styled.lastUpdateText>
                        Atualizado: {formatDate(sector.lastUpdate)}
                      </Styled.lastUpdateText>
                    </Styled.sectorInfo>

                    <IconButton
                      icon="delete"
                      size={24}
                      onPress={() => handleRemoveSector(sector)}
                      style={Styled.deleteButton}
                    />
                  </Styled.sectorHeader>
                </Card.Content>
              </Styled.sectorCard>
            ))}
          </Styled.sectorsList>
        )}
      </Card.Content>
    </Card>
  );
};

export default HospitalSectorsList;
