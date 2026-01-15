import express from "express";
import { prisma } from "../db";

const router = express.Router();

// GET toutes les phases roadmap
router.get("/", async (_req, res) => {
  try {
    const phases = await prisma.cadreTemporel.findMany({
      orderBy: { dateDebutProjet: "asc" },
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
    const phase = await prisma.cadreTemporel.findUnique({
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
    const { dateDebut, dateFin, statut, dateCommunicationPlanningClient } = req.body;

    const phase = await prisma.cadreTemporel.create({
      data: {
        dateDebutProjet: new Date(dateDebut),
        dateFinPrevisionnelle: new Date(dateFin),
        statutValidationDate: statut,
        dateCommunicationPlanningClient: new Date(dateCommunicationPlanningClient),
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
    const { dateDebut, dateFin, statut, dateCommunicationPlanningClient } = req.body;

    const phase = await prisma.cadreTemporel.update({
      where: { id: parseInt(req.params.id) },
      data: {
        ...(dateDebut !== undefined && { 
          dateDebutProjet: new Date(dateDebut)
        }),
        ...(dateFin !== undefined && { 
          dateFinPrevisionnelle: new Date(dateFin)
        }),
        ...(statut !== undefined && { statutValidationDate: statut }),
        ...(dateCommunicationPlanningClient !== undefined && { 
          dateCommunicationPlanningClient: new Date(dateCommunicationPlanningClient)
        }),
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
    await prisma.cadreTemporel.delete({
      where: { id: parseInt(req.params.id) },
    });
    res.json({ message: "Phase supprimée avec succès" });
  } catch (error) {
    console.error("Erreur lors de la suppression de la phase:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

export default router;
