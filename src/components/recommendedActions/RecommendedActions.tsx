import React from "react";
import { Card } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { RecommendedActionsStyled as Styled } from "./styled";

const RecommendedActions: React.FC = () => {
  return (
    <Styled.ActionsCard>
      <Card.Content>
        <Styled.CardTitle>Ações Recomendadas</Styled.CardTitle>

        <Styled.ActionsList>
          <Styled.ActionItem>
            <Styled.ActionHeader>
              <Ionicons name="alert-circle" size={20} color="#F44336" />
              <Styled.ActionTitle>Prioridade Alta</Styled.ActionTitle>
            </Styled.ActionHeader>
            <Styled.ActionDescription>
              Ativar protocolos de emergência para pacientes críticos
            </Styled.ActionDescription>
          </Styled.ActionItem>

          <Styled.ActionItem>
            <Styled.ActionHeader>
              <Ionicons name="medical" size={20} color="#FF9800" />
              <Styled.ActionTitle>Equipamentos</Styled.ActionTitle>
            </Styled.ActionHeader>
            <Styled.ActionDescription>
              Redistribuir equipamentos disponíveis para setores críticos
            </Styled.ActionDescription>
          </Styled.ActionItem>

          <Styled.ActionItem>
            <Styled.ActionHeader>
              <Ionicons name="people" size={20} color="#2196F3" />
              <Styled.ActionTitle>Recursos Humanos</Styled.ActionTitle>
            </Styled.ActionHeader>
            <Styled.ActionDescription>
              Mobilizar equipes adicionais para áreas afetadas
            </Styled.ActionDescription>
          </Styled.ActionItem>

          <Styled.ActionItem>
            <Styled.ActionHeader>
              <Ionicons name="call" size={20} color="#9C27B0" />
              <Styled.ActionTitle>Comunicação</Styled.ActionTitle>
            </Styled.ActionHeader>
            <Styled.ActionDescription>
              Notificar familiares e coordenar com hospitais parceiros
            </Styled.ActionDescription>
          </Styled.ActionItem>
        </Styled.ActionsList>
      </Card.Content>
    </Styled.ActionsCard>
  );
};

export default RecommendedActions;
