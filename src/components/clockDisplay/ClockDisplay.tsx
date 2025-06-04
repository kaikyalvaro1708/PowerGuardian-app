import React from "react";
import { Card } from "react-native-paper";
import { ClockDisplayStyled as Styled } from "./styled";

interface ClockDisplayProps {
  currentTime: Date;
}

export const ClockDisplay: React.FC<ClockDisplayProps> = ({ currentTime }) => {
  return (
    <Styled.ClockCard>
      <Card.Content>
        <Styled.ClockContainer>
          <Styled.CurrentTime>
            {currentTime.toLocaleTimeString("pt-BR")}
          </Styled.CurrentTime>
          <Styled.CurrentDate>
            {currentTime.toLocaleDateString("pt-BR", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </Styled.CurrentDate>
        </Styled.ClockContainer>
      </Card.Content>
    </Styled.ClockCard>
  );
};
