import styled from "styled-components/native";
import { Title, Text, Modal } from "react-native-paper";
import { Dimensions, Platform } from "react-native";

const { width, height } = Dimensions.get("window");

const Container = styled.SafeAreaView`
  background-color: #f5f5f5;
  height: auto;
  padding-top: ${Platform.OS === "android" ? "50px" : "0px"};
  padding-bottom: ${Platform.OS === "android" ? "100px" : "0px"};
`;

const ModalContainer = styled(Modal)`
  background-color: #edf0fa;
  flex: 1;
  justify-content: center;
  align-items: "center";
  padding: 20px;
`;

const ModalCard = {
  width: width * 0.9,
  maxHeight: height * 0.8,
  backgroundColor: "white",
  borderRadius: 8,
};

const ModalTitle = styled(Title)`
  font-size: 20px;
  color: #333;
  margin-bottom: 16px;
  text-align: center;
`;

const ScrollView = {
  maxHeight: height * 0.5,
  marginBottom: 16,
};

const Input = {
  marginBottom: 12,
  backgroundColor: "#f5f5f5",
};

const RadioGroup = styled.View`
  margin-bottom: 16px;
`;

const RadioLabel = styled(Text)`
  font-size: 16px;
  font-weight: bold;
  color: #333;
  margin-bottom: 8px;
`;

const RadioItem = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 4px;
`;

const RadioText = styled(Text)`
  font-size: 14px;
  color: #555;
  margin-left: 8px;
`;

const ButtonContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  gap: 12px;
`;

const CancelButton = {
  flex: 1,
};

const SubmitButton = {
  flex: 1,
};

const SectionTitle = styled(Text)`
  font-size: 18px;
  font-weight: bold;
  color: #2196f3;
  margin-top: 16px;
  margin-bottom: 12px;
  border-bottom-width: 1px;
  border-bottom-color: #e0e0e0;
  padding-bottom: 4px;
`;

export const AddHospitalSectorModalStyled = {
  Container,
  ModalContainer,
  ModalCard,
  ModalTitle,
  ScrollView,
  Input,
  RadioGroup,
  RadioLabel,
  RadioItem,
  RadioText,
  ButtonContainer,
  CancelButton,
  SubmitButton,
  SectionTitle,
};
