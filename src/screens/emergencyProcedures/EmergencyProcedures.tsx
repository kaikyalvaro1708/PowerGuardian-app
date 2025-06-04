import React, { useState } from "react";
import { ScrollView } from "react-native";
import { Card, IconButton } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { EmergencyProceduresStyled as Styled } from "./styled";
import {
  EmergencyProcedure,
  EmergencyContact,
  initialProcedures,
  emergencyContacts,
} from "../../utils/emergencyData";
import {
  getCategoryColor,
  getPriorityColor,
  getAvailabilityColor,
  getCategoryName,
  getAvailabilityText,
} from "../../utils/emergencyData";

export const EmergencyProcedures: React.FC = () => {
  const [procedures, setProcedures] =
    useState<EmergencyProcedure[]>(initialProcedures);
  const [contacts] = useState<EmergencyContact[]>(emergencyContacts);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [expandedProcedure, setExpandedProcedure] = useState<string | null>(
    null
  );

  const filteredProcedures = selectedCategory
    ? procedures.filter((procedure) => procedure.category === selectedCategory)
    : procedures;

  const categories = [
    ...new Set(procedures.map((procedure) => procedure.category)),
  ];

  return (
    <Styled.Container>
      <Styled.ScrollContainer showsVerticalScrollIndicator={false}>
        <Styled.FilterCard>
          <Card.Content>
            <Styled.CardTitle>Filtrar por Categoria</Styled.CardTitle>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <Styled.FilterButtons>
                <Styled.FilterButton
                  mode={selectedCategory === null ? "contained" : "outlined"}
                  onPress={() => setSelectedCategory(null)}
                  buttonColor={
                    selectedCategory === null ? "#1978d2" : "#ffffff"
                  }
                  textColor={selectedCategory === null ? "#ffffff" : "#000000"}
                >
                  Todos
                </Styled.FilterButton>
                {categories.map((category) => {
                  const isSelected = selectedCategory === category;
                  return (
                    <Styled.FilterButton
                      key={category}
                      mode={isSelected ? "contained" : "outlined"}
                      onPress={() => setSelectedCategory(category)}
                      buttonColor={isSelected ? "#1978d2" : "#ffffff"}
                      textColor={isSelected ? "#ffffff" : "#000000"}
                    >
                      {getCategoryName(category)}
                    </Styled.FilterButton>
                  );
                })}
              </Styled.FilterButtons>
            </ScrollView>
          </Card.Content>
        </Styled.FilterCard>

        <Styled.ProceduresCard>
          <Card.Content>
            <Styled.CardTitle>Procedimentos de Emergência</Styled.CardTitle>
            {filteredProcedures.map((procedure) => (
              <Styled.ProcedureItem
                key={procedure.id}
                $isActive={procedure.isActive}
              >
                <Styled.ProcedureHeader>
                  <Styled.ProcedureInfo>
                    <Styled.ProcedureTitle>
                      {procedure.title}
                    </Styled.ProcedureTitle>
                    <Styled.ProcedureTags>
                      <Styled.CategoryChip
                        icon="circle"
                        $backgroundColor={getCategoryColor(procedure.category)}
                        textStyle={{ color: "#fff", fontSize: 12 }}
                      >
                        {getCategoryName(procedure.category)}
                      </Styled.CategoryChip>
                      <Styled.PriorityChip
                        icon="alert"
                        $backgroundColor={getPriorityColor(procedure.priority)}
                        textStyle={{ color: "#fff", fontSize: 12 }}
                      >
                        {procedure.priority}
                      </Styled.PriorityChip>
                      {procedure.isActive && (
                        <Styled.ActiveChip
                          icon="play"
                          textStyle={{ color: "#fff", fontSize: 12 }}
                        >
                          ATIVO
                        </Styled.ActiveChip>
                      )}
                    </Styled.ProcedureTags>
                  </Styled.ProcedureInfo>
                  <IconButton
                    icon={
                      expandedProcedure === procedure.id
                        ? "chevron-up"
                        : "chevron-down"
                    }
                    size={24}
                    onPress={() =>
                      setExpandedProcedure(
                        expandedProcedure === procedure.id ? null : procedure.id
                      )
                    }
                  />
                </Styled.ProcedureHeader>

                <Styled.ProcedureStats>
                  <Styled.StatItem>
                    <Ionicons name="time-outline" size={18} color="#666" />
                    <Styled.StatText>
                      {procedure.estimatedTime} min
                    </Styled.StatText>
                  </Styled.StatItem>
                  <Styled.StatItem>
                    <Ionicons name="people-outline" size={18} color="#666" />
                    <Styled.StatText>
                      {procedure.responsibleTeam}
                    </Styled.StatText>
                  </Styled.StatItem>
                </Styled.ProcedureStats>

                {expandedProcedure === procedure.id && (
                  <Styled.ExpandedContent>
                    <Styled.SectionTitle>
                      Passos do Procedimento:
                    </Styled.SectionTitle>
                    {procedure.steps.map((step, index) => (
                      <Styled.StepItem key={index}>
                        <Styled.StepNumber>
                          <Styled.StepNumberText>
                            {index + 1}
                          </Styled.StepNumberText>
                        </Styled.StepNumber>
                        <Styled.StepText>{step}</Styled.StepText>
                      </Styled.StepItem>
                    ))}

                    <Styled.SectionTitle>
                      Equipamentos Necessários:
                    </Styled.SectionTitle>
                    <Styled.EquipmentList>
                      {procedure.requiredEquipment.map((equipment, index) => (
                        <Styled.EquipmentChip
                          key={index}
                          textStyle={{ fontSize: 12, color: "white" }}
                        >
                          {equipment}
                        </Styled.EquipmentChip>
                      ))}
                    </Styled.EquipmentList>

                    <Styled.ProcedureFooter>
                      <Styled.LastReviewed>
                        Última revisão:{" "}
                        {procedure.lastReviewed.toLocaleDateString("pt-BR")}
                      </Styled.LastReviewed>
                      {procedure.isActive && (
                        <Styled.StopButton
                          mode="contained"
                          buttonColor="#F44336"
                          onPress={() => {
                            setProcedures((prev) =>
                              prev.map((p) =>
                                p.id === procedure.id
                                  ? { ...p, isActive: false }
                                  : p
                              )
                            );
                          }}
                        >
                          Finalizar
                        </Styled.StopButton>
                      )}
                    </Styled.ProcedureFooter>
                  </Styled.ExpandedContent>
                )}
              </Styled.ProcedureItem>
            ))}
          </Card.Content>
        </Styled.ProceduresCard>

        <Styled.ContactsCard>
          <Card.Content>
            <Styled.CardTitle>Contatos de Emergência</Styled.CardTitle>
            {contacts.map((contact) => (
              <Styled.ContactItem key={contact.id}>
                <Styled.ContactHeader>
                  <Styled.ContactInfo>
                    <Styled.ContactName>{contact.name}</Styled.ContactName>
                    <Styled.ContactRole>{contact.role}</Styled.ContactRole>
                  </Styled.ContactInfo>
                  <Styled.AvailabilityChip
                    icon="clock-outline"
                    $backgroundColor={getAvailabilityColor(
                      contact.availability
                    )}
                    textStyle={{ color: "#fff", fontSize: 12 }}
                  >
                    {getAvailabilityText(contact.availability)}
                  </Styled.AvailabilityChip>
                </Styled.ContactHeader>

                <Styled.ContactDetails>
                  <Styled.ContactDetail>
                    <Ionicons name="call-outline" size={16} color="#666" />
                    <Styled.ContactText>{contact.phone}</Styled.ContactText>
                  </Styled.ContactDetail>
                  {contact.extension && (
                    <Styled.ContactDetail>
                      <Ionicons name="keypad-outline" size={16} color="#666" />
                      <Styled.ContactText>
                        Ramal: {contact.extension}
                      </Styled.ContactText>
                    </Styled.ContactDetail>
                  )}
                </Styled.ContactDetails>
              </Styled.ContactItem>
            ))}
          </Card.Content>
        </Styled.ContactsCard>

        <Styled.Spacer />
      </Styled.ScrollContainer>
    </Styled.Container>
  );
};
