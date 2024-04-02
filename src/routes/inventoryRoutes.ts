// routes.ts

import Router from 'koa-router';
import { Context } from 'koa';
import { sendResponse, StatusCode } from '../common/response';
import { Inventory } from '../modules/inventory/interface';
import { InventoryService } from '../modules/inventory/services/inventory';

const router = new Router();


// Routes for inventory
router.post('/inventory', async (ctx: Context) => {
  try {
    const inventoryData = ctx.request.body as Omit<Inventory, 'id'>;
    const inventory = await InventoryService.createInventory(inventoryData);
    sendResponse(ctx, { status: StatusCode.Created, data: inventory });
  } catch (error) {
    sendResponse(ctx, { status: StatusCode.ServerError, message: (error as Error).message });
  }
});

router.get('/inventory', async (ctx: Context) => {
  try {
    const inventory = await InventoryService.getAllInventory();
    sendResponse(ctx, { status: StatusCode.Success, data: inventory });
  } catch (error) {
    sendResponse(ctx, { status: StatusCode.ServerError, message: (error as Error).message });
  }
});

router.get('/inventory/:id', async (ctx: Context) => {
  try {
    const { id } = ctx.params;
    const inventory = await InventoryService.getInventoryById(parseInt(id));
    if (!inventory) {
      sendResponse(ctx, { status: StatusCode.NotFound, message: 'Inventory item not found' });
    } else {
      sendResponse(ctx, { status: StatusCode.Success, data: inventory });
    }
  } catch (error) {
    sendResponse(ctx, { status: StatusCode.ServerError, message: (error as Error).message });
  }
});

router.put('/inventory/:id', async (ctx: Context) => {
  try {
    const { id } = ctx.params;
    const inventoryData = ctx.request.body as Partial<Inventory>;
    const updatedInventory = await InventoryService.updateInventory(parseInt(id), inventoryData);
    if (!updatedInventory) {
      sendResponse(ctx, { status: StatusCode.NotFound, message: 'Inventory item not found' });
    } else {
      sendResponse(ctx, { status: StatusCode.Success, data: updatedInventory });
    }
  } catch (error) {
    sendResponse(ctx, { status: StatusCode.ServerError, message: (error as Error).message });
  }
});

router.delete('/inventory/:id', async (ctx: Context) => {
  try {
    const { id } = ctx.params;
    const deletedInventory = await InventoryService.deleteInventory(parseInt(id));
    if (!deletedInventory) {
      sendResponse(ctx, { status: StatusCode.NotFound, message: 'Inventory item not found' });
    } else {
      sendResponse(ctx, { status: StatusCode.Success, message: 'Inventory item deleted successfully' });
    }
  } catch (error) {
    sendResponse(ctx, { status: StatusCode.ServerError, message: (error as Error).message });
  }
});

export default router;
