import React from "react";
import { Card, Chip, Paragraph } from "react-native-paper";
import { EventsCardStyled as Styled } from "./styled";

export interface Event {
  id: string;
  type:
    | "POWER_FAILURE"
    | "EQUIPMENT_ALERT"
    | "BACKUP_ACTIVATED"
    | "SYSTEM_RESTORED";
  message: string;
  timestamp: Date;
  severity: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
}

interface EventsCardProps {
  events: Event[];
}

const EventsCard: React.FC<EventsCardProps> = ({ events }) => {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "LOW":
        return "#4CAF50";
      case "MEDIUM":
        return "#FF9800";
      case "HIGH":
        return "#F44336";
      case "CRITICAL":
        return "#9C27B0";
      default:
        return "#757575";
    }
  };

  return (
    <Card style={Styled.eventsCard}>
      <Card.Content>
        <Styled.CardTitle>Eventos Recentes</Styled.CardTitle>
        {events.length > 0 ? (
          events.map((event) => (
            <Styled.EventItem key={event.id}>
              <Styled.EventHeader>
                <Chip
                  icon="circle"
                  style={[
                    Styled.severityChip,
                    { backgroundColor: getSeverityColor(event.severity) },
                  ]}
                  textStyle={{ color: "#fff", fontSize: 10 }}
                >
                  {event.severity}
                </Chip>
                <Styled.EventTime>
                  {event.timestamp.toLocaleTimeString("pt-BR", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </Styled.EventTime>
              </Styled.EventHeader>
              <Paragraph style={Styled.eventMessage}>
                {event.message}
              </Paragraph>
            </Styled.EventItem>
          ))
        ) : (
          <Styled.NoEvents>Nenhum evento recente</Styled.NoEvents>
        )}
      </Card.Content>
    </Card>
  );
};

export default EventsCard;