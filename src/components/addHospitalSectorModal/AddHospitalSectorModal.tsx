import React, { useState } from "react";
import { View, ScrollView } from "react-native";
import {
  Modal,
  Portal,
  Card,
  TextInput,
  Button,
  RadioButton,
  Text,
  Chip,
  Switch,
} from "react-native-paper";
import { AddHospitalSectorModalStyled as Styled } from "./styled";
import { HospitalSector, PowerOutage } from "../../services/StorageService";

interface Props {
  visible: boolean;
  onDismiss: () => void;
  onAddSector: (sector: Omit<HospitalSector, "id" | "lastUpdate">) => void;
}

const AddHospitalSectorModal: React.FC<Props> = ({
  visible,
  onDismiss,
  onAddSector,
}) => {
  const [sectorName, setSectorName] = useState("");
  const [floor, setFloor] = useState("");
  const [status, setStatus] = useState<
    "NORMAL" | "WARNING" | "CRITICAL" | "OFFLINE"
  >("NORMAL");
  const [powerConsumption, setPowerConsumption] = useState("");
  const [criticalEquipment, setCriticalEquipment] = useState("");

  const [hospitalName, setHospitalName] = useState("");
  const [regionType, setRegionType] = useState<"BAIRRO" | "CIDADE" | "CEP">(
    "BAIRRO"
  );
  const [regionValue, setRegionValue] = useState("");
  const [affectedPopulation, setAffectedPopulation] = useState("");

  const [hasCurrentOutage, setHasCurrentOutage] = useState(false);
  const [outageStartTime, setOutageStartTime] = useState("");
  const [estimatedDuration, setEstimatedDuration] = useState("");
  const [outageSeverity, setOutageSeverity] = useState<
    "LOW" | "MEDIUM" | "HIGH" | "CRITICAL"
  >("MEDIUM");
  const [outageNotes, setOutageNotes] = useState("");

  const resetForm = () => {
    setSectorName("");
    setFloor("");
    setStatus("NORMAL");
    setPowerConsumption("");
    setCriticalEquipment("");
    setHospitalName("");
    setRegionType("BAIRRO");
    setRegionValue("");
    setAffectedPopulation("");
    setHasCurrentOutage(false);
    setOutageStartTime("");
    setEstimatedDuration("");
    setOutageSeverity("MEDIUM");
    setOutageNotes("");
  };

  const formatCEP = (value: string) => {
    const numericValue = value.replace(/\D/g, "");
    if (numericValue.length <= 8) {
      return numericValue.replace(/(\d{5})(\d{3})/, "$1-$2");
    }
    return numericValue.substring(0, 8).replace(/(\d{5})(\d{3})/, "$1-$2");
  };

  const formatTime = (value: string) => {
    const numericValue = value.replace(/\D/g, "");
    if (numericValue.length <= 4) {
      return numericValue.replace(/(\d{2})(\d{2})/, "$1:$2");
    }
    return numericValue.substring(0, 4).replace(/(\d{2})(\d{2})/, "$1:$2");
  };

  const handleRegionValueChange = (value: string) => {
    if (regionType === "CEP") {
      setRegionValue(formatCEP(value));
    } else {
      setRegionValue(value);
    }
  };

  const handleOutageStartTimeChange = (value: string) => {
    setOutageStartTime(formatTime(value));
  };

  const getFloorText = (floorNumber: number) => {
    if (floorNumber === 0) return "Térreo";
    if (floorNumber < 0) return `${Math.abs(floorNumber)}º Subsolo`;
    return `${floorNumber}º Andar`;
  };

  const getStatusInfo = (statusValue: string) => {
    const statusMap = {
      NORMAL: { label: "NORMAL", color: "#4caf50" },
      WARNING: { label: "ATENÇÃO", color: "#ff9800" },
      CRITICAL: { label: "CRÍTICO", color: "#f44336" },
      OFFLINE: { label: "OFFLINE", color: "#757575" },
    };
    return statusMap[statusValue as keyof typeof statusMap] || statusMap.NORMAL;
  };

  const getSeverityInfo = (severityValue: string) => {
    const severityMap = {
      LOW: { label: "Baixa", color: "#4caf50" },
      MEDIUM: { label: "Média", color: "#ff9800" },
      HIGH: { label: "Alta", color: "#f44336" },
      CRITICAL: { label: "Crítica", color: "#d32f2f" },
    };
    return (
      severityMap[severityValue as keyof typeof severityMap] ||
      severityMap.MEDIUM
    );
  };

  const isValidCEP = (cep: string) => {
    return cep.replace(/\D/g, "").length === 8;
  };

  const isValidTime = (time: string) => {
    if (!time) return true;
    const parts = time.split(":");
    if (parts.length !== 2) return false;
    const hours = parseInt(parts[0]);
    const minutes = parseInt(parts[1]);
    return hours >= 0 && hours <= 23 && minutes >= 0 && minutes <= 59;
  };

  const parseTimeToDate = (timeString: string): Date => {
    const today = new Date();
    const [hours, minutes] = timeString.split(":").map(Number);
    const date = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
      hours,
      minutes
    );

    if (date > today) {
      date.setDate(date.getDate() - 1);
    }

    return date;
  };

  const isFormValid = () => {
    const floorNum = parseInt(floor);
    const powerNum = parseInt(powerConsumption);
    const equipmentNum = parseInt(criticalEquipment);
    const populationNum = affectedPopulation
      ? parseInt(affectedPopulation)
      : null;

    const basicValidation =
      sectorName.trim() &&
      hospitalName.trim() &&
      regionValue.trim() &&
      !isNaN(floorNum) &&
      !isNaN(powerNum) &&
      !isNaN(equipmentNum) &&
      powerNum >= 0 &&
      powerNum <= 100 &&
      equipmentNum >= 0 &&
      (regionType !== "CEP" || isValidCEP(regionValue)) &&
      (!populationNum || populationNum > 0);

    if (hasCurrentOutage) {
      return (
        basicValidation &&
        outageStartTime.trim() &&
        isValidTime(outageStartTime) &&
        (!estimatedDuration || parseInt(estimatedDuration) > 0)
      );
    }

    return basicValidation;
  };

  const handleSubmit = () => {
    if (!isFormValid()) return;

    let currentOutage: PowerOutage | undefined;
    let powerOutages: PowerOutage[] = [];

    if (hasCurrentOutage && outageStartTime) {
      const startTime = parseTimeToDate(outageStartTime);
      const estimatedEndTime = estimatedDuration
        ? new Date(
            startTime.getTime() + parseInt(estimatedDuration) * 60 * 1000
          )
        : undefined;

      currentOutage = {
        id: Date.now().toString(),
        startTime,
        endTime: undefined,
        estimatedEndTime,
        duration: undefined,
        estimatedDuration: estimatedDuration
          ? parseInt(estimatedDuration)
          : undefined,
        isOngoing: true,
        severity: outageSeverity,
        affectedSystems: [],
        notes: outageNotes.trim() || undefined,
      };

      powerOutages = [currentOutage];
    }

    const newSector: Omit<HospitalSector, "id" | "lastUpdate"> = {
      name: sectorName.trim(),
      floor: parseInt(floor),
      status,
      powerConsumption: parseInt(powerConsumption),
      criticalEquipment: parseInt(criticalEquipment),
      powerOutages,
      currentOutage,
      region: {
        type: regionType,
        name: hospitalName.trim(),
        value: regionValue.trim(),
        description: "",
        affectedPopulation: affectedPopulation
          ? parseInt(affectedPopulation)
          : undefined,
      },
    };

    onAddSector(newSector);
    resetForm();
    onDismiss();
  };

  const handleCancel = () => {
    resetForm();
    onDismiss();
  };

  return (
    <Styled.Container>
      <Portal>
        <Styled.ModalContainer visible={visible} onDismiss={handleCancel}>
          <Card style={Styled.ModalCard}>
            <Card.Content>
              <Styled.ModalTitle>Novo Setor Hospitalar</Styled.ModalTitle>

              <ScrollView
                style={Styled.ScrollView}
                showsVerticalScrollIndicator={false}
              >
                {(sectorName || hospitalName) && (
                  <View
                    style={{
                      backgroundColor: "#f5f5f5",
                      padding: 12,
                      borderRadius: 8,
                      marginBottom: 16,
                      borderLeftWidth: 4,
                      borderLeftColor: getStatusInfo(status).color,
                    }}
                  >
                    <Text style={{ fontWeight: "bold", fontSize: 16 }}>
                      {hospitalName || "Nome do Hospital"}
                    </Text>
                    <Text style={{ fontSize: 14, color: "#666", marginTop: 2 }}>
                      {sectorName || "Nome do Setor"}
                      {floor && ` • ${getFloorText(parseInt(floor) || 0)}`}
                    </Text>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginTop: 4,
                        flexWrap: "wrap",
                        gap: 8,
                      }}
                    >
                      <Chip
                        style={{
                          backgroundColor: getStatusInfo(status).color,
                          height: 24,
                        }}
                        textStyle={{ color: "white", fontSize: 12 }}
                      >
                        {getStatusInfo(status).label}
                      </Chip>
                      {hasCurrentOutage && (
                        <Chip
                          style={{
                            backgroundColor:
                              getSeverityInfo(outageSeverity).color,
                            height: 24,
                          }}
                          textStyle={{ color: "white", fontSize: 12 }}
                        >
                          SEM ENERGIA
                        </Chip>
                      )}
                    </View>
                  </View>
                )}

                <Styled.SectionTitle>Hospital</Styled.SectionTitle>

                <TextInput
                  label="Nome do Hospital"
                  value={hospitalName}
                  onChangeText={setHospitalName}
                  style={Styled.Input}
                  mode="outlined"
                  placeholder="Ex: Hospital das Clínicas"
                  activeOutlineColor="#333"
                />

                <Styled.RadioGroup>
                  <Styled.RadioLabel>Localização:</Styled.RadioLabel>
                  <RadioButton.Group
                    onValueChange={(value) => {
                      setRegionType(value as "BAIRRO" | "CIDADE" | "CEP");
                      setRegionValue("");
                    }}
                    value={regionType}
                  >
                    <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                      <Styled.RadioItem style={{ width: "33%" }}>
                        <RadioButton value="BAIRRO" color="#007AFF" />
                        <Styled.RadioText>Bairro</Styled.RadioText>
                      </Styled.RadioItem>
                      <Styled.RadioItem style={{ width: "33%" }}>
                        <RadioButton value="CIDADE" color="#007AFF" />
                        <Styled.RadioText>Cidade</Styled.RadioText>
                      </Styled.RadioItem>
                      <Styled.RadioItem style={{ width: "33%" }}>
                        <RadioButton value="CEP" color="#007AFF" />
                        <Styled.RadioText>CEP</Styled.RadioText>
                      </Styled.RadioItem>
                    </View>
                  </RadioButton.Group>
                </Styled.RadioGroup>

                <TextInput
                  activeOutlineColor="#333"
                  label={
                    regionType === "BAIRRO"
                      ? "Bairro"
                      : regionType === "CIDADE"
                      ? "Cidade"
                      : "CEP"
                  }
                  value={regionValue}
                  onChangeText={handleRegionValueChange}
                  style={Styled.Input}
                  mode="outlined"
                  placeholder={
                    regionType === "BAIRRO"
                      ? "Ex: Vila Madalena"
                      : regionType === "CIDADE"
                      ? "Ex: São Paulo"
                      : "Ex: 01234-567"
                  }
                  keyboardType={regionType === "CEP" ? "numeric" : "default"}
                  error={
                    regionValue !== "" &&
                    regionType === "CEP" &&
                    !isValidCEP(regionValue)
                  }
                />

                <TextInput
                  activeOutlineColor="#333"
                  label="População Atendida (Opcional)"
                  value={affectedPopulation}
                  onChangeText={setAffectedPopulation}
                  style={Styled.Input}
                  mode="outlined"
                  keyboardType="numeric"
                  placeholder="Ex: 50000"
                  right={<TextInput.Icon icon="account-group" />}
                />

                <Styled.SectionTitle>Setor</Styled.SectionTitle>

                <TextInput
                  activeOutlineColor="#333"
                  label="Nome do Setor"
                  value={sectorName}
                  onChangeText={setSectorName}
                  style={Styled.Input}
                  mode="outlined"
                  placeholder="Ex: UTI Adulto, Pronto Socorro"
                />

                <View style={{ flexDirection: "row", gap: 12 }}>
                  <TextInput
                    activeOutlineColor="#333"
                    label="Andar"
                    value={floor}
                    onChangeText={setFloor}
                    style={[Styled.Input, { flex: 1 }]}
                    mode="outlined"
                    keyboardType="numeric"
                    placeholder="Ex: 3"
                  />
                  <TextInput
                    activeOutlineColor="#333"
                    label="Consumo (%)"
                    value={powerConsumption}
                    onChangeText={setPowerConsumption}
                    style={[Styled.Input, { flex: 1 }]}
                    mode="outlined"
                    keyboardType="numeric"
                    placeholder="0-100"
                    error={
                      powerConsumption !== "" &&
                      (isNaN(parseInt(powerConsumption)) ||
                        parseInt(powerConsumption) < 0 ||
                        parseInt(powerConsumption) > 100)
                    }
                  />
                </View>

                <TextInput
                  activeOutlineColor="#333"
                  label="Equipamentos Críticos"
                  value={criticalEquipment}
                  onChangeText={setCriticalEquipment}
                  style={Styled.Input}
                  mode="outlined"
                  keyboardType="numeric"
                  placeholder="Quantidade de equipamentos"
                  right={<TextInput.Icon icon="medical-bag" />}
                  error={
                    criticalEquipment !== "" &&
                    (isNaN(parseInt(criticalEquipment)) ||
                      parseInt(criticalEquipment) < 0)
                  }
                />

                <Styled.RadioGroup>
                  <Styled.RadioLabel>Status Inicial:</Styled.RadioLabel>
                  <RadioButton.Group
                    onValueChange={(value) =>
                      setStatus(
                        value as "NORMAL" | "WARNING" | "CRITICAL" | "OFFLINE"
                      )
                    }
                    value={status}
                  >
                    <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                      <Styled.RadioItem style={{ width: "50%" }}>
                        <RadioButton value="NORMAL" color="#007AFF" />
                        <Styled.RadioText>Normal</Styled.RadioText>
                      </Styled.RadioItem>
                      <Styled.RadioItem style={{ width: "50%" }}>
                        <RadioButton value="WARNING" color="#007AFF" />
                        <Styled.RadioText>Atenção</Styled.RadioText>
                      </Styled.RadioItem>
                      <Styled.RadioItem style={{ width: "50%" }}>
                        <RadioButton value="CRITICAL" color="#007AFF" />
                        <Styled.RadioText>Crítico</Styled.RadioText>
                      </Styled.RadioItem>
                      <Styled.RadioItem style={{ width: "50%" }}>
                        <RadioButton value="OFFLINE" color="#007AFF" />
                        <Styled.RadioText>Offline</Styled.RadioText>
                      </Styled.RadioItem>
                    </View>
                  </RadioButton.Group>
                </Styled.RadioGroup>

                <Styled.SectionTitle>
                  Situação Energética (Opcional)
                </Styled.SectionTitle>

                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: 16,
                    backgroundColor: "#fff3cd",
                    padding: 12,
                    borderRadius: 8,
                  }}
                >
                  <Switch
                    value={hasCurrentOutage}
                    onValueChange={setHasCurrentOutage}
                    color="#007AFF"
                  />
                  <Text
                    style={{
                      marginLeft: 12,
                      flex: 1,
                      color: "#333",
                      fontWeight: 600,
                    }}
                  >
                    Este setor está atualmente sem energia
                  </Text>
                </View>

                {hasCurrentOutage && (
                  <View
                    style={{
                      backgroundColor: "#fff3cd",
                      padding: 12,
                      borderRadius: 8,
                      marginBottom: 16,
                      borderLeftWidth: 4,
                      borderLeftColor: "#ffc107",
                    }}
                  >
                    <Text
                      style={{
                        fontWeight: "bold",
                        marginBottom: 12,
                        color: "#856404",
                      }}
                    >
                      Registro de Queda de Energia
                    </Text>

                    <TextInput
                      activeOutlineColor="#333"
                      label="Horário de Início (HH:MM)"
                      value={outageStartTime}
                      onChangeText={handleOutageStartTimeChange}
                      style={[Styled.Input, { marginBottom: 12 }]}
                      mode="outlined"
                      keyboardType="numeric"
                      placeholder="Ex: 14:30"
                      error={
                        outageStartTime !== "" && !isValidTime(outageStartTime)
                      }
                    />

                    <TextInput
                      activeOutlineColor="#333"
                      label="Duração Estimada (minutos)"
                      value={estimatedDuration}
                      onChangeText={setEstimatedDuration}
                      style={[Styled.Input, { marginBottom: 12 }]}
                      mode="outlined"
                      keyboardType="numeric"
                      placeholder="Ex: 120"
                    />

                    <Styled.RadioGroup>
                      <Styled.RadioLabel>Gravidade:</Styled.RadioLabel>
                      <RadioButton.Group
                        onValueChange={(value) =>
                          setOutageSeverity(
                            value as "LOW" | "MEDIUM" | "HIGH" | "CRITICAL"
                          )
                        }
                        value={outageSeverity}
                      >
                        <View
                          style={{ flexDirection: "row", flexWrap: "wrap" }}
                        >
                          <Styled.RadioItem style={{ width: "50%" }}>
                            <RadioButton value="LOW" color="#007AFF" />
                            <Styled.RadioText>Baixa</Styled.RadioText>
                          </Styled.RadioItem>
                          <Styled.RadioItem style={{ width: "50%" }}>
                            <RadioButton value="MEDIUM" color="#007AFF" />
                            <Styled.RadioText>Média</Styled.RadioText>
                          </Styled.RadioItem>
                          <Styled.RadioItem style={{ width: "50%" }}>
                            <RadioButton value="HIGH" color="#007AFF" />
                            <Styled.RadioText>Alta</Styled.RadioText>
                          </Styled.RadioItem>
                          <Styled.RadioItem style={{ width: "50%" }}>
                            <RadioButton value="CRITICAL" color="#007AFF" />
                            <Styled.RadioText>Crítica</Styled.RadioText>
                          </Styled.RadioItem>
                        </View>
                      </RadioButton.Group>
                    </Styled.RadioGroup>

                    <TextInput
                      activeOutlineColor="#333"
                      label="Observações (Opcional)"
                      value={outageNotes}
                      onChangeText={setOutageNotes}
                      style={Styled.Input}
                      mode="outlined"
                      multiline
                      numberOfLines={2}
                      placeholder="Ex: Afetou equipamentos da UTI, geradores acionados"
                    />
                  </View>
                )}
              </ScrollView>

              <Styled.ButtonContainer>
                <Button
                  mode="outlined"
                  onPress={handleCancel}
                  style={{
                    borderColor: "#007AFF",
                    borderWidth: 1,
                    backgroundColor: "#ffffff",
                    marginRight: 8,
                  }}
                  textColor="#007AFF"
                >
                  Cancelar
                </Button>

                <Button
                  mode="contained"
                  onPress={handleSubmit}
                  style={{
                    backgroundColor: "#007AFF",
                  }}
                  labelStyle={{ color: "#ffffff" }}
                  disabled={!isFormValid()}
                >
                  Adicionar Setor
                </Button>
              </Styled.ButtonContainer>
            </Card.Content>
          </Card>
        </Styled.ModalContainer>
      </Portal>
    </Styled.Container>
  );
};

export default AddHospitalSectorModal;
