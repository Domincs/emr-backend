import { PrismaClient } from '@prisma/client';
import { Drug } from '../interface';

const prisma = new PrismaClient();

// Drug Service
export const DrugService = {
  // Create a new drug
  async createDrug(data: Omit<Drug, 'id'>): Promise<Drug> {
    return prisma.drug.create({ data });
  },

  // Get a drug by ID
  async getDrugById(id: number): Promise<Drug | null> {
    return prisma.drug.findUnique({ where: { id } });
  },

  // Get all drugs
  async getAllDrugs(): Promise<Drug[]> {
    return prisma.drug.findMany();
  },

  // Update a drug
  async updateDrug(id: number, data: Partial<Drug>): Promise<Drug | null> {
    return prisma.drug.update({ where: { id }, data });
  },

  // Delete a drug
  async deleteDrug(id: number): Promise<Drug | null> {
    return prisma.drug.delete({ where: { id } });
  },

  async getDrugsByTag(tag: string): Promise<Drug[]> {
    try {
      const drugs = await prisma.drug.findMany({
        where: {
          tags: {
            contains: tag,
          },
        },
      });
      return drugs;
    } catch (error) {
      throw new Error('Failed to get drugs by tag');
    }
  },
};
