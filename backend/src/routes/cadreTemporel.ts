import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

// GET tous les cadres temporels
router.get("/", async (_req, res) => {
  try {
    const cadres = await prisma.cadreTemporel.findMany({
      orderBy: { dateDebut: "asc" },
    });
    res.json(cadres);
  } catch (error) {
    console.error("Erreur lors de la récupération des cadres temporels:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

// GET un cadre temporel par ID
router.get("/:id", async (req, res) => {
  try {
    const cadre = await prisma.cadreTemporel.findUnique({
      where: { id: parseInt(req.params.id) },
    });
    if (!cadre) {
      return res.status(404).json({ error: "Cadre temporel introuvable" });
    }
    res.json(cadre);
  } catch (error) {
    console.error("Erreur lors de la récupération du cadre temporel:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

// POST créer un cadre temporel
router.post("/", async (req, res) => {
  try {
    const { nom, description, type, dateDebut, dateFin } = req.body;

    const cadre = await prisma.cadreTemporel.create({
      data: {
        nom,
        description,
        type,
        dateDebut: dateDebut ? new Date(dateDebut) : null,
        dateFin: dateFin ? new Date(dateFin) : null,
      },
    });
    res.status(201).json(cadre);
  } catch (error) {
    console.error("Erreur lors de la création du cadre temporel:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

// PUT mettre à jour un cadre temporel
router.put("/:id", async (req, res) => {
  try {
    const { nom, description, type, dateDebut, dateFin } = req.body;

    const cadre = await prisma.cadreTemporel.update({
      where: { id: parseInt(req.params.id) },
      data: {
        ...(nom && { nom }),
        ...(description !== undefined && { description }),
        ...(type !== undefined && { type }),
        ...(dateDebut !== undefined && { 
          dateDebut: dateDebut ? new Date(dateDebut) : null 
        }),
        ...(dateFin !== undefined && { 
          dateFin: dateFin ? new Date(dateFin) : null 
        }),
        dateModification: new Date(),
      },
    });
    res.json(cadre);
  } catch (error) {
    console.error("Erreur lors de la mise à jour du cadre temporel:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

// DELETE supprimer un cadre temporel
router.delete("/:id", async (req, res) => {
  try {
    await prisma.cadreTemporel.delete({
      where: { id: parseInt(req.params.id) },
    });
    res.json({ message: "Cadre temporel supprimé avec succès" });
  } catch (error) {
    console.error("Erreur lors de la suppression du cadre temporel:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

export default router;
