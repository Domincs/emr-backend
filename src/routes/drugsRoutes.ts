// routes.ts

import Router from 'koa-router';
import { Context } from 'koa';
import { sendResponse, StatusCode } from '../common/response';
import { DrugService } from '../modules/inventory/services/drugs';
import { Drug } from '../modules/inventory/interface';

const router = new Router();

// Routes for drugs
router.post('/drugs', async (ctx: Context) => {
  try {
    const drugData = ctx.request.body as unknown as Omit<Drug, 'id'>;
    const drug = await DrugService.createDrug(drugData);
    sendResponse(ctx, { status: StatusCode.Created, data: drug });
  } catch (error) {
    sendResponse(ctx, { status: StatusCode.ServerError, message: (error as Error).message });
  }
});

router.get('/drugs', async (ctx: Context) => {
  try {
    const { tag } = ctx.query;
    let drugs;
    if (tag) {
      drugs = await DrugService.getDrugsByTag(tag as string);
    } else {
      drugs = await DrugService.getAllDrugs();
    }
    sendResponse(ctx, { status: StatusCode.Success, data: drugs });
  } catch (error) {
    sendResponse(ctx, { status: StatusCode.ServerError, message: (error as Error).message });
  }
});

router.get('/drugs/:id', async (ctx: Context) => {
  try {
    const { id } = ctx.params;
    const drug = await DrugService.getDrugById(parseInt(id));
    if (!drug) {
      sendResponse(ctx, { status: StatusCode.NotFound, message: 'Drug not found' });
    } else {
      sendResponse(ctx, { status: StatusCode.Success, data: drug });
    }
  } catch (error) {
    sendResponse(ctx, { status: StatusCode.ServerError, message: (error as Error).message });
  }
});

export default router;
