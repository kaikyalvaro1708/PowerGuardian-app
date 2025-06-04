import React, { useState, useEffect } from "react";
import { View, ScrollView } from "react-native";
import { LocationStyled as Styled } from "./styled";
import { StackNavigationProp } from "@react-navigation/stack";
import HospitalSectorsList from "../../components/hospitalSectorsList/HospitalSectorsList";
import AddHospitalSectorModal from "../../components/addHospitalSectorModal/AddHospitalSectorModal";
import StorageService, {
  HospitalSector,
  HospitalRegion,
  PowerOutage,
} from "../../services/StorageService";

type RootStackParamList = {
  Location: undefined;
};

type LocationScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Location"
>;

interface Props {
  navigation: LocationScreenNavigationProp;
}

const Location: React.FC<Props> = ({ navigation }) => {
  const [hospitalSectors, setHospitalSectors] = useState<HospitalSector[]>([]);
  const [isAddSectorModalVisible, setIsAddSectorModalVisible] = useState(false);

  useEffect(() => {
    loadHospitalSectors();
  }, []);

  const loadHospitalSectors = async () => {
    const sectors = await StorageService.loadHospitalSectors();
    setHospitalSectors(sectors);
  };

  const addHospitalSector = async (
    newSector: Omit<HospitalSector, "id" | "lastUpdate">
  ) => {
    const updatedSectors = await StorageService.addHospitalSector(
      hospitalSectors,
      newSector
    );
    setHospitalSectors(updatedSectors);
  };

  const removeHospitalSector = async (sectorId: string) => {
    const updatedSectors = await StorageService.removeHospitalSector(
      hospitalSectors,
      sectorId
    );
    setHospitalSectors(updatedSectors);
  };

  const updateHospitalSector = async (
    sectorId: string,
    updates: Partial<HospitalSector>
  ) => {
    const updatedSectors = await StorageService.updateHospitalSector(
      hospitalSectors,
      sectorId,
      updates
    );
    setHospitalSectors(updatedSectors);
  };

  const addPowerOutage = async (
    sectorId: string,
    outage: Omit<PowerOutage, "id">
  ) => {
    const updatedSectors = await StorageService.addPowerOutage(
      hospitalSectors,
      sectorId,
      outage
    );
    setHospitalSectors(updatedSectors);
  };

  const endPowerOutage = async (
    sectorId: string,
    outageId: string,
    endTime: Date
  ) => {
    const updatedSectors = await StorageService.endPowerOutage(
      hospitalSectors,
      sectorId,
      outageId,
      endTime
    );
    setHospitalSectors(updatedSectors);
  };

  const updateEstimatedOutages = async () => {
    const { updatedSectors, hasUpdates } =
      await StorageService.updateEstimatedOutages(hospitalSectors);

    if (hasUpdates) {
      setHospitalSectors(updatedSectors);
    }
  };

  useEffect(() => {
    const interval = setInterval(updateEstimatedOutages, 60000);
    return () => clearInterval(interval);
  }, [hospitalSectors]);

  return (
    <Styled.Container>
      <ScrollView
        style={Styled.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={Styled.scrollViewContent}
      >
        <HospitalSectorsList
          sectors={hospitalSectors}
          onAddSector={() => setIsAddSectorModalVisible(true)}
          onRemoveSector={removeHospitalSector}
          onUpdateSector={updateHospitalSector}
          onAddPowerOutage={addPowerOutage}
          onEndPowerOutage={endPowerOutage}
        />

        <View style={Styled.bottomSpacing} />
      </ScrollView>

      <AddHospitalSectorModal
        visible={isAddSectorModalVisible}
        onDismiss={() => setIsAddSectorModalVisible(false)}
        onAddSector={addHospitalSector}
      />
    </Styled.Container>
  );
};

export default Location;
