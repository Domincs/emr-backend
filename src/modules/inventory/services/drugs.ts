import { PrismaClient } from '@prisma/client';

// Import the Prisma client
const prisma = new PrismaClient();

// Define Drug type based on Prisma model
interface Drug {
  id: number;
  name: string;
  molecule: string;
  stockLevel: number;
  tags: string[];
}

// Drug Service
export const DrugService = {
  // Create a new drug
  async createDrug(data: Omit<Drug, 'id'>): Promise<Drug> {
    const createdDrug = await prisma.drug.create({ data });
    return {
      id: createdDrug.id,
      name: createdDrug.name,
      molecule: createdDrug.molecule,
      stockLevel: createdDrug.stockLevel,
      tags: createdDrug.tags,
    };
  },

  // Get a drug by ID
  async getDrugById(id: number): Promise<Drug | null> {
    const prismaDrug = await prisma.drug.findUnique({ where: { id } });
    return prismaDrug;
  },

  // Get all drugs
  async getAllDrugs(): Promise<Drug[]> {
    const prismaDrugs = await prisma.drug.findMany();
    return prismaDrugs;
  },

  // Update a drug
  async updateDrug(id: number, data: Partial<Drug>): Promise<Drug | null> {
    const updatedDrug = await prisma.drug.update({ where: { id }, data });
    return {
      id: updatedDrug.id,
      name: updatedDrug.name,
      molecule: updatedDrug.molecule,
      stockLevel: updatedDrug.stockLevel,
      tags: updatedDrug.tags,
    };
  },

  // Delete a drug
  async deleteDrug(id: number): Promise<Drug | null> {
    const deletedDrug = await prisma.drug.delete({ where: { id } });
    return {
      id: deletedDrug.id,
      name: deletedDrug.name,
      molecule: deletedDrug.molecule,
      stockLevel: deletedDrug.stockLevel,
      tags: deletedDrug.tags,
    };
  },

  // Get drugs by tag
  async getDrugsByTag(tag: string): Promise<Drug[]> {
    const prismaDrugs = await prisma.drug.findMany({
      where: {
        tags: {
          has: tag,
        },
      },
    });
    return prismaDrugs;
  },
};

