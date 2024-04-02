export interface Drug {
  id: number;
  name : string;
  molecule: string;
  stockLevel: number;
  tags: string[];
  inventory: Inventory[]
}

// Inventory model represents the inventory of drugs
export interface Inventory {
  id: number;
  drug: Drug;
  drugId: number;
  quantity: number;
  location: string;
  expirationDate: Date;
}