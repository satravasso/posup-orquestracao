import { NextFunction, Request, Response } from 'express';
import { product, PrismaClient } from '@prisma/client';
import { HttpException } from '../middlewares/error';

const prisma = new PrismaClient();

export async function getAllProducts(req: Request, res: Response<product[]>, next: NextFunction) {
  const name = req.query.name as string;
  const category = req.query.category as string;

  let allProducts;
  try {
    allProducts = await prisma.product.findMany({
      where: {
        name: {
          contains: name,
        },
        category: category,
      },
    });
  } catch (error) {
    return next(new HttpException(500, error.message));
  }

  res.status(200).json(allProducts);
}
export async function createProduct(req: Request, res: Response<product>, next: NextFunction) {
  const product = req.body;

  try {
    await prisma.product.create({
      data: product,
    });
  } catch (error) {
    return next(new HttpException(500, error.message));
  }

  return res.status(200).json(product);
}

export async function updateProduct(req: Request, res: Response<product>, next: NextFunction) {
  const id = Number.parseInt(req.params.id);
  const product = req.body;

  let updated;
  try {
    updated = await prisma.product.update({
      where: { id },
      data: product,
    });
  } catch (error) {
    return next(new HttpException(500, error.message));
  }

  res.status(200).json(updated);
}

export async function deleteProduct(req: Request, res: Response, next: NextFunction) {
  const id = Number.parseInt(req.params.id);

  let deleted;
  try {
    deleted = await prisma.product.delete({
      where: { id },
    });
  } catch (error) {
    return next(new HttpException(500, error.message));
  }

  res.status(200).json(deleted);
}

export async function sellProducts(req: Request, res: Response, next: NextFunction) {
  const products = req.body;

  let updated = products.map(async (item: { id: number; quantityItem: number }) => {
    let prod_qnt;
    try {
      prod_qnt = await prisma.product.findUnique({
        where: { id: item.id },
      });
    } catch (error) {
      return next(new HttpException(500, error.message));
    }

    const qntFinal = (prod_qnt?.quantity || 0) - item.quantityItem;

    try {
      return await prisma.product.update({
        where: { id: item.id },
        data: { quantity: qntFinal },
      });
    } catch (error) {
      return next(new HttpException(500, error.message));
    }
  });

  res.status(200).json(updated);
}
