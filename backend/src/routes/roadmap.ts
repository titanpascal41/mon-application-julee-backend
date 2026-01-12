import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

// GET toutes les phases roadmap
router.get("/", async (_req, res) => {
  try {
    const phases = await prisma.roadmapPhase.findMany({
      orderBy: { dateDebut: "asc" },
    });
    res.json(phases);
  } catch (error) {
    console.error("Erreur lors de la récupération de la roadmap:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

// GET une phase par ID
router.get("/:id", async (req, res) => {
  try {
    const phase = await prisma.roadmapPhase.findUnique({
      where: { id: parseInt(req.params.id) },
    });
    if (!phase) {
      return res.status(404).json({ error: "Phase introuvable" });
    }
    res.json(phase);
  } catch (error) {
    console.error("Erreur lors de la récupération de la phase:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

// POST créer une phase
router.post("/", async (req, res) => {
  try {
    const { nom, description, dateDebut, dateFin, statut, objectifs } = req.body;

    const phase = await prisma.roadmapPhase.create({
      data: {
        nom,
        description,
        dateDebut: dateDebut ? new Date(dateDebut) : null,
        dateFin: dateFin ? new Date(dateFin) : null,
        statut,
        objectifs: objectifs || [],
      },
    });
    res.status(201).json(phase);
  } catch (error) {
    console.error("Erreur lors de la création de la phase:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

// PUT mettre à jour une phase
router.put("/:id", async (req, res) => {
  try {
    const { nom, description, dateDebut, dateFin, statut, objectifs } = req.body;

    const phase = await prisma.roadmapPhase.update({
      where: { id: parseInt(req.params.id) },
      data: {
        ...(nom && { nom }),
        ...(description !== undefined && { description }),
        ...(dateDebut !== undefined && { 
          dateDebut: dateDebut ? new Date(dateDebut) : null 
        }),
        ...(dateFin !== undefined && { 
          dateFin: dateFin ? new Date(dateFin) : null 
        }),
        ...(statut !== undefined && { statut }),
        ...(objectifs !== undefined && { objectifs }),
        dateModification: new Date(),
      },
    });
    res.json(phase);
  } catch (error) {
    console.error("Erreur lors de la mise à jour de la phase:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

// DELETE supprimer une phase
router.delete("/:id", async (req, res) => {
  try {
    await prisma.roadmapPhase.delete({
      where: { id: parseInt(req.params.id) },
    });
    res.json({ message: "Phase supprimée avec succès" });
  } catch (error) {
    console.error("Erreur lors de la suppression de la phase:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

export default router;
