import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

// GET toutes les recettes
router.get("/", async (_req, res) => {
  try {
    const recettes = await prisma.recette.findMany({
      include: { livraisons: true },
      orderBy: { dateCreation: "desc" },
    });
    res.json(recettes);
  } catch (error) {
    console.error("Erreur lors de la récupération des recettes:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

// GET une recette par ID
router.get("/:id", async (req, res) => {
  try {
    const recette = await prisma.recette.findUnique({
      where: { id: parseInt(req.params.id) },
      include: { livraisons: true },
    });
    if (!recette) {
      return res.status(404).json({ error: "Recette introuvable" });
    }
    res.json(recette);
  } catch (error) {
    console.error("Erreur lors de la récupération de la recette:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

// POST créer une recette
router.post("/", async (req, res) => {
  try {
    const {
      dateDebut,
      dateFin,
      anomaliesBloquantes,
      anomaliesMajeures,
      anomaliesMineures,
      statut,
      commentaires,
      gp,
    } = req.body;

    const recette = await prisma.recette.create({
      data: {
        dateDebut: dateDebut ? new Date(dateDebut) : null,
        dateFin: dateFin ? new Date(dateFin) : null,
        anomaliesBloquantes: anomaliesBloquantes || 0,
        anomaliesMajeures: anomaliesMajeures || 0,
        anomaliesMineures: anomaliesMineures || 0,
        statut,
        commentaires,
        gp,
      },
    });
    res.status(201).json(recette);
  } catch (error) {
    console.error("Erreur lors de la création de la recette:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

// PUT mettre à jour une recette
router.put("/:id", async (req, res) => {
  try {
    const {
      dateDebut,
      dateFin,
      anomaliesBloquantes,
      anomaliesMajeures,
      anomaliesMineures,
      statut,
      commentaires,
      gp,
    } = req.body;

    const recette = await prisma.recette.update({
      where: { id: parseInt(req.params.id) },
      data: {
        ...(dateDebut !== undefined && { 
          dateDebut: dateDebut ? new Date(dateDebut) : null 
        }),
        ...(dateFin !== undefined && { 
          dateFin: dateFin ? new Date(dateFin) : null 
        }),
        ...(anomaliesBloquantes !== undefined && { anomaliesBloquantes }),
        ...(anomaliesMajeures !== undefined && { anomaliesMajeures }),
        ...(anomaliesMineures !== undefined && { anomaliesMineures }),
        ...(statut !== undefined && { statut }),
        ...(commentaires !== undefined && { commentaires }),
        ...(gp !== undefined && { gp }),
        dateModification: new Date(),
      },
    });
    res.json(recette);
  } catch (error) {
    console.error("Erreur lors de la mise à jour de la recette:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

// DELETE supprimer une recette
router.delete("/:id", async (req, res) => {
  try {
    await prisma.recette.delete({
      where: { id: parseInt(req.params.id) },
    });
    res.json({ message: "Recette supprimée avec succès" });
  } catch (error) {
    console.error("Erreur lors de la suppression de la recette:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

export default router;
