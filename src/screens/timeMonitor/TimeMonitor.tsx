import React, { useState, useEffect } from "react";
import { TimeMonitorStyled as Styled } from "./styled";
import { ClockDisplay } from "../../components/clockDisplay/ClockDisplay";
import StorageService, {
  HospitalSector,
  PowerOutage,
} from "../../services/StorageService";
import RecommendedActions from "../../components/recommendedActions/RecommendedActions";

interface PowerOutageInfo {
  sectorName: string;
  sectorId: string;
  outage: PowerOutage;
  timeDisplay: string;
  isOngoing: boolean;
}

const TimeMonitor = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [sectors, setSectors] = useState<HospitalSector[]>([]);
  const [powerOutageInfos, setPowerOutageInfos] = useState<PowerOutageInfo[]>(
    []
  );

  const calculateTimeDisplay = (
    outage: PowerOutage,
    currentTime: Date
  ): string => {
    if (outage.isOngoing) {
      const elapsedMs = currentTime.getTime() - outage.startTime.getTime();
      const elapsedMinutes = Math.floor(elapsedMs / (1000 * 60));
      const hours = Math.floor(elapsedMinutes / 60);
      const minutes = elapsedMinutes % 60;

      if (hours > 0) {
        return `${hours}h ${minutes}min (em andamento)`;
      } else {
        return `${minutes}min (em andamento)`;
      }
    } else if (outage.duration) {
      const hours = Math.floor(outage.duration / 60);
      const minutes = outage.duration % 60;

      if (hours > 0) {
        return `${hours}h ${minutes}min (finalizada)`;
      } else {
        return `${minutes}min (finalizada)`;
      }
    } else if (outage.estimatedDuration) {
      const hours = Math.floor(outage.estimatedDuration / 60);
      const minutes = outage.estimatedDuration % 60;

      if (hours > 0) {
        return `${hours}h ${minutes}min (estimado)`;
      } else {
        return `${minutes}min (estimado)`;
      }
    }

    return "Duração não informada";
  };

  const loadSectorsData = async () => {
    try {
      const loadedSectors = await StorageService.loadHospitalSectors();
      setSectors(loadedSectors);

      const outageInfos: PowerOutageInfo[] = [];

      loadedSectors.forEach((sector) => {
        if (sector.currentOutage) {
          outageInfos.push({
            sectorName: sector.name,
            sectorId: sector.id,
            outage: sector.currentOutage,
            timeDisplay: calculateTimeDisplay(
              sector.currentOutage,
              currentTime
            ),
            isOngoing: true,
          });
        }

        const recentFinishedOutages = sector.powerOutages
          .filter((outage) => !outage.isOngoing && outage.endTime)
          .sort(
            (a, b) => (b.endTime?.getTime() || 0) - (a.endTime?.getTime() || 0)
          )
          .slice(0, 3);

        recentFinishedOutages.forEach((outage) => {
          outageInfos.push({
            sectorName: sector.name,
            sectorId: sector.id,
            outage,
            timeDisplay: calculateTimeDisplay(outage, currentTime),
            isOngoing: false,
          });
        });
      });

      outageInfos.sort((a, b) => {
        if (a.isOngoing && !b.isOngoing) return -1;
        if (!a.isOngoing && b.isOngoing) return 1;

        const severityOrder = { CRITICAL: 4, HIGH: 3, MEDIUM: 2, LOW: 1 };
        return (
          severityOrder[b.outage.severity] - severityOrder[a.outage.severity]
        );
      });

      setPowerOutageInfos(outageInfos);
    } catch (error) {
      console.error("Erro ao carregar dados dos setores:", error);
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    loadSectorsData();
  }, []);

  useEffect(() => {
    if (powerOutageInfos.length > 0) {
      const updatedInfos = powerOutageInfos.map((info) => ({
        ...info,
        timeDisplay: calculateTimeDisplay(info.outage, currentTime),
      }));
      setPowerOutageInfos(updatedInfos);
    }
  }, [currentTime]);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "CRITICAL":
        return "#FF4444";
      case "HIGH":
        return "#FF8800";
      case "MEDIUM":
        return "#FFAA00";
      case "LOW":
        return "#88AA00";
      default:
        return "#666666";
    }
  };

  const getSeverityText = (severity: string) => {
    switch (severity) {
      case "CRITICAL":
        return "Crítica";
      case "HIGH":
        return "Alta";
      case "MEDIUM":
        return "Média";
      case "LOW":
        return "Baixa";
      default:
        return severity;
    }
  };

  return (
    <Styled.Container>
      <Styled.ScrollView showsVerticalScrollIndicator={false}>
        <ClockDisplay currentTime={currentTime} />

        <Styled.SectionContainer>
          <Styled.SectionTitle>Quedas de Energia</Styled.SectionTitle>

          {powerOutageInfos.length === 0 ? (
            <Styled.EmptyState>
              <Styled.EmptyStateText>
                Nenhuma queda de energia registrada
              </Styled.EmptyStateText>
            </Styled.EmptyState>
          ) : (
            powerOutageInfos.map((info, index) => (
              <Styled.OutageCard
                key={`${info.sectorId}-${info.outage.id}-${index}`}
              >
                <Styled.OutageHeader>
                  <Styled.SectorName>{info.sectorName}</Styled.SectorName>
                  <Styled.SeverityBadge
                    severity={getSeverityColor(info.outage.severity)}
                  >
                    <Styled.SeverityText>
                      {getSeverityText(info.outage.severity)}
                    </Styled.SeverityText>
                  </Styled.SeverityBadge>
                </Styled.OutageHeader>

                <Styled.TimeInfo>
                  <Styled.TimeLabel>Duração:</Styled.TimeLabel>
                  <Styled.TimeValue isOngoing={info.isOngoing}>
                    {info.timeDisplay}
                  </Styled.TimeValue>
                </Styled.TimeInfo>

                <Styled.OutageDetails>
                  <Styled.DetailText>
                    Início: {info.outage.startTime.toLocaleString("pt-BR")}
                  </Styled.DetailText>

                  {info.outage.endTime && (
                    <Styled.DetailText>
                      Fim: {info.outage.endTime.toLocaleString("pt-BR")}
                    </Styled.DetailText>
                  )}

                  {info.outage.estimatedEndTime && info.isOngoing && (
                    <Styled.DetailText>
                      Fim estimado:{" "}
                      {info.outage.estimatedEndTime.toLocaleString("pt-BR")}
                    </Styled.DetailText>
                  )}

                  {info.outage.affectedSystems &&
                    info.outage.affectedSystems.length > 0 && (
                      <Styled.DetailText>
                        Sistemas afetados:{" "}
                        {info.outage.affectedSystems.join(", ")}
                      </Styled.DetailText>
                    )}

                  {info.outage.notes && (
                    <Styled.DetailText>
                      Observações: {info.outage.notes}
                    </Styled.DetailText>
                  )}
                </Styled.OutageDetails>
              </Styled.OutageCard>
            ))
          )}
        </Styled.SectionContainer>

        <RecommendedActions />

        <Styled.BottomSpacer />
      </Styled.ScrollView>
    </Styled.Container>
  );
};

export default TimeMonitor;
