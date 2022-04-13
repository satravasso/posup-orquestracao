import { NextFunction, Request, Response } from 'express';
import { PrismaClient, user } from '@prisma/client';
import { HttpException } from '../middlewares/error';

const prisma = new PrismaClient();

export async function getUsers(req: Request, res: Response, next: NextFunction) {
  const login = req.query.login as string;

  let allUsers;
  try {
    allUsers = await prisma.user.findMany({
      where: {
        login: {
          contains: login,
        },
      },
    });
  } catch (error) {
    return next(new HttpException(500, error.message));
  }

  res.status(200).json(allUsers);
}

export async function getUserById(req: Request, res: Response<user[]>, next: NextFunction) {
  const id = Number.parseInt(req.params.id);

  let allUsers;

  try {
    allUsers = await prisma.user.findMany({
      where: {
        id,
      },
    });
  } catch (error) {
    return next(new HttpException(500, error.message));
  }

  res.status(200).json(allUsers);
}

export async function createUser(req: Request, res: Response<user>, next: NextFunction) {
  const user: user = req.body;

  try {
    await prisma.user.create({
      data: user,
    });
  } catch (error) {
    return next(new HttpException(500, error.message));
  }

  return res.status(200).json(user);
}

export async function updateUser(req: Request, res: Response<user>, next: NextFunction) {
  const id = Number.parseInt(req.params.id);
  const user = req.body;

  let updated;

  try {
    updated = await prisma.user.update({
      where: { id },
      data: user,
    });
  } catch (error) {
    return next(new HttpException(500, error.message));
  }

  res.status(200).json(updated);
}

export async function deteleUser(req: Request, res: Response, next: NextFunction) {
  const id = Number.parseInt(req.params.id);

  let deleted;

  try {
    deleted = await prisma.user.delete({
      where: { id },
    });
  } catch (error) {
    return next(new HttpException(500, error.message));
  }

  res.status(200).json(deleted);
}
