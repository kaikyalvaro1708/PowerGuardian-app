export interface PowerEvent {
  id: string;
  type: "OUTAGE" | "RESTORATION" | "MAINTENANCE" | "ALERT";
  description: string;
  startTime: Date;
  endTime?: Date;
  duration?: number;
  sector: string;
  status: "ACTIVE" | "RESOLVED" | "SCHEDULED";
}

export interface SystemMetrics {
  uptime: number;
  totalOutages: number;
  averageOutageDuration: number;
  mtbf: number;
  reliability: number;
}
