import { PrismaClient } from '@prisma/client';
// import { PrismaClient } from '@prisma/client/edge'
import { Inventory } from '../interface';

const prisma = new PrismaClient();

// Inventory Service
export const InventoryService = {
  // Create inventory entry
  async createInventory(data): Promise<Inventory> {
    const inventory =  prisma.inventory.create({ data });
    return (inventory as unknown as Inventory)
  },

  // Get inventory entry by ID
  async getInventoryById(id: number): Promise<Inventory | null> {
    const inventory = prisma.inventory.findUnique({ where: { id } });
    return (inventory as unknown as Inventory | null);
  },

  // Get all inventory entries
  async getAllInventory(): Promise<Inventory[]> {
    const inventories = prisma.inventory.findMany();
    return (inventories as unknown as Inventory[]); 
  },

  // Update inventory entry
  async updateInventory(id: number, data: Partial<unknown>): Promise<Inventory | null> {
    const inventory = prisma.inventory.update({ where: { id }, data });
    return (inventory as unknown as Inventory | null);
  },

  // Delete inventory entry
  async deleteInventory(id: number): Promise<Inventory | null> {
    const inventory = prisma.inventory.delete({ where: { id } });
    return (inventory as unknown as Inventory | null);
  },
};
