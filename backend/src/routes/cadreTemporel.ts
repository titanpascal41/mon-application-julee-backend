import { Router } from "express";
import { prisma } from "../db";

const router = Router();

// GET tous les cadres temporels
router.get("/", async (_req, res) => {
  try {
    const cadres = await prisma.cadreTemporel.findMany({
      orderBy: { dateDebutProjet: "asc" },
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
    const { dateDebutProjet, dateFinPrevisionnelle, statutValidationDate, dateCommunicationPlanningClient } = req.body;

    const cadre = await prisma.cadreTemporel.create({
      data: {
        dateDebutProjet: new Date(dateDebutProjet),
        dateFinPrevisionnelle: new Date(dateFinPrevisionnelle),
        statutValidationDate,
        dateCommunicationPlanningClient: new Date(dateCommunicationPlanningClient),
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
    const { dateDebutProjet, dateFinPrevisionnelle, statutValidationDate, dateCommunicationPlanningClient } = req.body;

    const cadre = await prisma.cadreTemporel.update({
      where: { id: parseInt(req.params.id) },
      data: {
        ...(dateDebutProjet !== undefined && { 
          dateDebutProjet: new Date(dateDebutProjet)
        }),
        ...(dateFinPrevisionnelle !== undefined && { 
          dateFinPrevisionnelle: new Date(dateFinPrevisionnelle)
        }),
        ...(statutValidationDate !== undefined && { statutValidationDate }),
        ...(dateCommunicationPlanningClient !== undefined && { 
          dateCommunicationPlanningClient: new Date(dateCommunicationPlanningClient)
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
