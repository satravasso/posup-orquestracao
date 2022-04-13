import { NextFunction, Request, Response } from 'express';
import { menu, PrismaClient } from '@prisma/client';
import { HttpException } from '../../middlewares/error';

const prisma = new PrismaClient();

export async function getMenus(req: Request, res: Response<menu[]>, next: NextFunction) {
  const name = req.query.name as string;
  let allmenus;
  try {
    allmenus = await prisma.menu.findMany({
      where: {
        name: {
          contains: name,
        },
      },
    });
  } catch (error) {
    return next(new HttpException(500, error.message));
  }

  return res.status(200).json(allmenus);
}

export async function getMenuById(req: Request, res: Response, next: NextFunction) {
  const id = Number.parseInt(req.params.id);
  let menu;
  try {
    menu = await prisma.menu.findUnique({
      where: {
        id,
      },
    });
  } catch (error) {
    return next(new HttpException(500, error.message));
  }

  return res.status(200).json(menu);
}

export async function createMenu(req: Request, res: Response<menu>, next: NextFunction) {
  const menu = req.body;
  let createdMenu;
  try {
    createdMenu = await prisma.menu.create({
      data: menu,
    });
  } catch (error) {
    if (error.code === 'P2002' || error.code === 'P2003') {
      return res.status(422).json(error.message);
    } else {
      return next(new HttpException(500, error.message));
    }
  }

  return res.status(201).json(menu);
}

export async function updateMenu(req: Request, res: Response, next: NextFunction) {
  const id = Number.parseInt(req.params.id);
  const menu = req.body;

  let updated;
  try {
    updated = await prisma.menu.update({
      where: { id },
      data: menu,
    });
  } catch (error) {
    return next(new HttpException(500, error.message));
  }

  return res.status(201).json(updated);
}

export async function deleteMenu(req: Request, res: Response, next: NextFunction) {
  const id = Number.parseInt(req.params.id);

  let deleted;
  try {
    deleted = await prisma.menu.delete({
      where: { id },
    });
  } catch (error) {
    return next(new HttpException(500, error.message));
  }
  return res.status(200).json(deleted);
}
