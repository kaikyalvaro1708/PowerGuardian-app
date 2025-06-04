export interface EmergencyProcedure {
  id: string;
  title: string;
  category: "POWER" | "MEDICAL" | "FIRE" | "EVACUATION" | "EQUIPMENT";
  priority: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
  estimatedTime: number;
  steps: string[];
  responsibleTeam: string;
  requiredEquipment: string[];
  lastReviewed: Date;
  isActive: boolean;
}

export interface EmergencyContact {
  id: string;
  name: string;
  role: string;
  phone: string;
  extension?: string;
  availability: "24H" | "BUSINESS_HOURS" | "ON_CALL";
}

export const initialProcedures: EmergencyProcedure[] = [
  {
    id: "1",
    title: "Falha Total de Energia",
    category: "POWER",
    priority: "CRITICAL",
    estimatedTime: 5,
    steps: [
      "Ativar gerador de emergência imediatamente",
      "Verificar funcionamento de equipamentos críticos",
      "Notificar equipe de manutenção",
      "Comunicar situação aos setores prioritários",
      "Monitorar consumo e autonomia do gerador",
    ],
    responsibleTeam: "Engenharia e Manutenção",
    requiredEquipment: ["Gerador", "Multímetro", "Rádio comunicador"],
    lastReviewed: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    isActive: true,
  },
  {
    id: "2",
    title: "Falha de Equipamento Crítico",
    category: "MEDICAL",
    priority: "HIGH",
    estimatedTime: 3,
    steps: [
      "Avaliar estado do paciente",
      "Ativar equipamento backup",
      "Notificar médico responsável",
      "Registrar ocorrência no sistema",
      "Solicitar manutenção técnica",
    ],
    responsibleTeam: "Enfermagem e Biomédica",
    requiredEquipment: ["Equipamento backup", "Kit de emergência"],
    lastReviewed: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    isActive: false,
  },
  {
    id: "3",
    title: "Incêndio nas Instalações",
    category: "FIRE",
    priority: "CRITICAL",
    estimatedTime: 10,
    steps: [
      "Acionar alarme de incêndio",
      "Contactar Corpo de Bombeiros (193)",
      "Iniciar evacuação ordenada",
      "Desligar energia elétrica da área",
      "Usar extintores se seguro",
      "Aguardar equipe especializada",
    ],
    responsibleTeam: "Segurança e Brigada",
    requiredEquipment: ["Extintores", "Mangueiras", "EPI's"],
    lastReviewed: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    isActive: false,
  },
  {
    id: "4",
    title: "Evacuação de Emergência",
    category: "EVACUATION",
    priority: "HIGH",
    estimatedTime: 15,
    steps: [
      "Ativar protocolo de evacuação",
      "Priorizar pacientes críticos",
      "Verificar rotas de fuga",
      "Coordenar com equipes médicas",
      "Estabelecer ponto de encontro",
      "Realizar contagem de pessoas",
    ],
    responsibleTeam: "Segurança e Coordenação",
    requiredEquipment: ["Macas", "Cadeiras de rodas", "Rádios"],
    lastReviewed: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    isActive: false,
  },
  {
    id: "5",
    title: "Sobrecarga no Sistema Elétrico",
    category: "POWER",
    priority: "MEDIUM",
    estimatedTime: 8,
    steps: [
      "Identificar circuito sobrecarregado",
      "Desligar equipamentos não essenciais",
      "Redistribuir carga elétrica",
      "Verificar disjuntores e fusíveis",
      "Monitorar temperatura dos cabos",
    ],
    responsibleTeam: "Manutenção Elétrica",
    requiredEquipment: ["Alicate amperímetro", "Termômetro infravermelho"],
    lastReviewed: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
    isActive: false,
  },
];

export const emergencyContacts: EmergencyContact[] = [
  {
    id: "1",
    name: "João Silva",
    role: "Coordenador de Emergência",
    phone: "(11) 99999-0001",
    extension: "1001",
    availability: "24H",
  },
  {
    id: "2",
    name: "Maria Santos",
    role: "Chefe de Manutenção",
    phone: "(11) 99999-0002",
    extension: "1002",
    availability: "BUSINESS_HOURS",
  },
  {
    id: "3",
    name: "Carlos Oliveira",
    role: "Segurança Hospitalar",
    phone: "(11) 99999-0003",
    availability: "24H",
  },
  {
    id: "4",
    name: "Ana Costa",
    role: "Supervisora de Enfermagem",
    phone: "(11) 99999-0004",
    extension: "1004",
    availability: "ON_CALL",
  },
];

export const getCategoryColor = (category: string): string => {
  switch (category) {
    case "POWER":
      return "#FF9800";
    case "MEDICAL":
      return "#2196F3";
    case "FIRE":
      return "#F44336";
    case "EVACUATION":
      return "#9C27B0";
    case "EQUIPMENT":
      return "#4CAF50";
    default:
      return "#757575";
  }
};

export const getPriorityColor = (priority: string): string => {
  switch (priority) {
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

export const getAvailabilityColor = (availability: string): string => {
  switch (availability) {
    case "24H":
      return "#4CAF50";
    case "BUSINESS_HOURS":
      return "#FF9800";
    case "ON_CALL":
      return "#2196F3";
    default:
      return "#757575";
  }
};

export const getCategoryName = (category: string): string => {
  switch (category) {
    case "POWER":
      return "Energia";
    case "MEDICAL":
      return "Médico";
    case "FIRE":
      return "Incêndio";
    case "EVACUATION":
      return "Evacuação";
    case "EQUIPMENT":
      return "Equipamentos";
    default:
      return category;
  }
};

export const getAvailabilityText = (availability: string): string => {
  switch (availability) {
    case "24H":
      return "24 Horas";
    case "BUSINESS_HOURS":
      return "Horário Comercial";
    case "ON_CALL":
      return "Sobreaviso";
    default:
      return availability;
  }
};
