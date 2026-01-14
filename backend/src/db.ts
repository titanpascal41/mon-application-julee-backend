import { PrismaClient } from '@prisma/client';
import { config } from "dotenv";
import { Request, Response, NextFunction } from "express";

config();

export const prisma = new PrismaClient();

export let dbReady = false;

export const connectDB = async () => {
  try {
    await prisma.$connect();
    dbReady = true;
    console.log("Connecté à la base de données avec Prisma!");
  } catch (error) {
    console.error("Connexion Prisma échouée :", error);
    dbReady = false;
  }
};

// Connexion automatique
connectDB();

export const requireDbReady = (_req: Request, res: Response, next: NextFunction) => {
  if (!dbReady) {
    return res
      .status(503)
      .json({ message: "Base de données non connectée. Vérifiez la configuration." });
  }
  next();
};
