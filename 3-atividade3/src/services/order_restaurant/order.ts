import { NextFunction, Request, Response } from 'express';
import { order, PrismaClient } from '@prisma/client';
import { HttpException } from '../../middlewares/error';

const prisma = new PrismaClient();

export async function getOrders(req: Request, res: Response<order[]>, next: NextFunction) {
  const name = req.query.name as string;
  let allorders;
  try {
    allorders = await prisma.order.findMany();
  } catch (error) {
    return next(new HttpException(500, error.message));
  }

  return res.status(200).json(allorders);
}

export async function getOrderById(req: Request, res: Response, next: NextFunction) {
  const id = Number.parseInt(req.params.id);
  let order;
  try {
    order = await prisma.order.findUnique({
      where: {
        id,
      },
    });
  } catch (error) {
    return next(new HttpException(500, error.message));
  }

  return res.status(200).json(order);
}

export async function getOpenOrders(req: Request, res: Response, next: NextFunction) {
  let order;
  try {
    order = await prisma.order.findMany({
      where: {
        date_end: null,
      },
    });
  } catch (error) {
    return next(new HttpException(500, error.message));
  }

  return res.status(200).json(order);
}

export async function getClosedOrders(req: Request, res: Response, next: NextFunction) {
  let order;
  try {
    order = await prisma.order.findMany({
      where: {
        NOT: { date_end: null },
      },
    });
  } catch (error) {
    return next(new HttpException(500, error.message));
  }

  return res.status(200).json(order);
}

export async function createOrder(req: Request, res: Response<order>, next: NextFunction) {
  const order = req.body;

  const { qtty, name, price } = order;
  if (!qtty || !name || !price) return next(new HttpException(422, 'O corpo do pedido não está completo'));

  try {
    const newOrder = { order_json: JSON.stringify({ qtty, name, price }), date_start: new Date() };
    await prisma.order.create({
      data: newOrder,
    });
  } catch (error) {
    if (error.code === 'P2002' || error.code === 'P2003') {
      return next(new HttpException(422, error.message));
    } else {
      return next(new HttpException(500, error.message));
    }
  }

  return res.status(201).json(order);
}

export async function finishOrder(req: Request, res: Response<order>, next: NextFunction) {
  const id = Number.parseInt(req.params.id);

  let updated;
  try {
    updated = await prisma.order.update({
      where: { id },
      data: { date_end: new Date() },
    });
  } catch (error) {
    if (error.code === 'P2002' || error.code === 'P2003') {
      return next(new HttpException(422, error.message));
    } else {
      return next(new HttpException(500, error.message));
    }
  }

  return res.status(201).json(updated);
}

export async function updateOrder(req: Request, res: Response, next: NextFunction) {
  const id = Number.parseInt(req.params.id);
  const order = req.body;

  let updated;
  try {
    updated = await prisma.order.update({
      where: { id },
      data: order,
    });
  } catch (error) {
    return next(new HttpException(500, error.message));
  }

  return res.status(201).json(updated);
}

export async function deleteOrder(req: Request, res: Response, next: NextFunction) {
  const id = Number.parseInt(req.params.id);

  let deleted;
  try {
    deleted = await prisma.order.delete({
      where: { id },
    });
  } catch (error) {
    return next(new HttpException(500, error.message));
  }
  return res.status(200).json(deleted);
}
