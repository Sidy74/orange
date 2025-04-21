export class Garde {
    dayOfGarde: string; // Date de garde
    pharmacies: {
      id: number;
      code: string;
      name: string;
      enable: boolean;
    }[]; // Liste des pharmacies associées
    enabled: boolean; // Statut de la garde
  
    constructor(
      dayOfGarde: string,
      pharmacies: { id: number; code: string; name: string; enable: boolean }[],
      enabled: boolean
    ) {
      this.dayOfGarde = dayOfGarde;
      this.pharmacies = pharmacies;
      this.enabled = enabled;
    }
  }