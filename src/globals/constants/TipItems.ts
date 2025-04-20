export interface TipItem {
  text: string;
  value: number;
  isActive: boolean;
}

export const TipItems: TipItem[] = [
  { text: "5%", value: 0.05, isActive: false },
  { text: "10%", value: 0.1, isActive: false },
  { text: "15%", value: 0.15, isActive: false },
  { text: "25%", value: 0.25, isActive: false },
  { text: "50%", value: 0.5, isActive: false },
];
