// import { PrismaClient } from '@prisma/client';
import { PrismaClient } from '@prisma/client/edge'
import { Inventory } from '../interface';

const prisma = new PrismaClient();

// Inventory Service
export const InventoryService = {
  // Create inventory entry
  async createInventory(data: Omit<Inventory, 'id'>): Promise<Inventory> {
    return prisma.inventory.create({ data });
  },

  // Get inventory entry by ID
  async getInventoryById(id: number): Promise<Inventory | null> {
    return prisma.inventory.findUnique({ where: { id } });
  },

  // Get all inventory entries
  async getAllInventory(): Promise<Inventory[]> {
    return prisma.inventory.findMany();
  },

  // Update inventory entry
  async updateInventory(id: number, data: Partial<Inventory>): Promise<Inventory | null> {
    return prisma.inventory.update({ where: { id }, data });
  },

  // Delete inventory entry
  async deleteInventory(id: number): Promise<Inventory | null> {
    return prisma.inventory.delete({ where: { id } });
  },
};
