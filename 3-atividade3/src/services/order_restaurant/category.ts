import e, { Errback, NextFunction, Request, response, Response } from 'express';
import { cateogry, Prisma, PrismaClient } from '@prisma/client';
import { ErrorCallback } from 'typescript';
import { HttpException } from '../../middlewares/error';

const prisma = new PrismaClient({
  errorFormat: 'pretty',
});

export async function getCategories(req: Request, res: Response<cateogry[]>, next: NextFunction) {
  const name = req.query.name as string;

  let allcateogrys;
  try {
    allcateogrys = await prisma.cateogry.findMany({
      where: {
        name: {
          contains: name,
        },
      },
    });
  } catch (error) {
    return next(new HttpException(500, error.message));
  }

  return res.status(200).json(allcateogrys);
}

export async function getCategoryById(req: Request, res: Response, next: NextFunction) {
  const id = Number.parseInt(req.params.id);
  let category;
  try {
    category = await prisma.cateogry.findUnique({
      where: {
        id,
      },
    });
  } catch (error) {
    return next(new HttpException(500, error.message));
  }

  return res.status(200).json(category);
}

export async function createCategory(req: Request, res: Response, next: NextFunction) {
  const category = req.body;
  let createdCategory;
  try {
    createdCategory = await prisma.cateogry.create({
      data: category,
    });
  } catch (error) {
    if (error.code === 'P2002' || error.code === 'P2003') {
      return res.status(422).json(error.message);
    } else {
      return next(new HttpException(500, error.message));
    }
  }

  return res.status(201).json(createdCategory);
}

export async function updateCategory(req: Request, res: Response<cateogry>, next: NextFunction) {
  const id = Number.parseInt(req.params.id);
  const category = req.body;

  let updated;
  try {
    updated = await prisma.cateogry.update({
      where: { id },
      data: category,
    });
  } catch (error) {
    return next(new HttpException(500, error.message));
  }

  return res.status(201).json(updated);
}

export async function deleteCategory(req: Request, res: Response, next: NextFunction) {
  const id = Number.parseInt(req.params.id);
  let deleted;
  try {
    deleted = await prisma.cateogry.delete({
      where: { id },
    });
  } catch (error) {
    return next(new HttpException(500, error.message));
  }
  return res.status(200).json(deleted);
}
