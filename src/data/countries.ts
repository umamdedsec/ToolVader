export interface Country {
  name: string;
  localMultiplier: number;
  clientMultiplier: number;
}

export const countries: Country[] = [
  { name: "United States", localMultiplier: 1.0, clientMultiplier: 1.0 },
  { name: "United Kingdom", localMultiplier: 0.9, clientMultiplier: 0.95 },
  { name: "Canada", localMultiplier: 0.85, clientMultiplier: 0.9 },
  { name: "Australia", localMultiplier: 0.9, clientMultiplier: 0.95 },
  { name: "Germany", localMultiplier: 0.95, clientMultiplier: 1.0 },
  { name: "Netherlands", localMultiplier: 0.95, clientMultiplier: 1.0 },
  { name: "France", localMultiplier: 0.9, clientMultiplier: 0.95 },
  { name: "Sweden", localMultiplier: 1.0, clientMultiplier: 1.05 },
  { name: "UAE", localMultiplier: 0.95, clientMultiplier: 1.1 },
  { name: "Singapore", localMultiplier: 1.0, clientMultiplier: 1.1 },
  { name: "South Africa", localMultiplier: 0.5, clientMultiplier: 0.7 },
  { name: "Brazil", localMultiplier: 0.45, clientMultiplier: 0.65 },
  { name: "India", localMultiplier: 0.35, clientMultiplier: 0.6 },
  { name: "Pakistan", localMultiplier: 0.25, clientMultiplier: 0.55 },
  { name: "Philippines", localMultiplier: 0.3, clientMultiplier: 0.55 },
  { name: "Bangladesh", localMultiplier: 0.2, clientMultiplier: 0.5 }
];
