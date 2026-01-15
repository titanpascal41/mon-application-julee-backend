import { Router } from "express";
import { prisma } from "../db";

const router = Router();

// GET toutes les recettes
router.get("/", async (_req, res) => {
  try {
    const recettes = await prisma.recette.findMany({
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
      statutGlobal,
      commentairesGP,
    } = req.body;

    const recette = await prisma.recette.create({
      data: {
        dateDebut: new Date(dateDebut),
        dateFin: dateFin ? new Date(dateFin) : null,
        anomaliesBloquantes: anomaliesBloquantes || 0,
        anomaliesMajeures: anomaliesMajeures || 0,
        anomaliesMineures: anomaliesMineures || 0,
        statutGlobal,
        commentairesGP,
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
      statutGlobal,
      commentairesGP,
    } = req.body;

    const recette = await prisma.recette.update({
      where: { id: parseInt(req.params.id) },
      data: {
        ...(dateDebut !== undefined && { 
          dateDebut: new Date(dateDebut)
        }),
        ...(dateFin !== undefined && { 
          dateFin: dateFin ? new Date(dateFin) : null 
        }),
        ...(anomaliesBloquantes !== undefined && { anomaliesBloquantes }),
        ...(anomaliesMajeures !== undefined && { anomaliesMajeures }),
        ...(anomaliesMineures !== undefined && { anomaliesMineures }),
        ...(statutGlobal !== undefined && { statutGlobal }),
        ...(commentairesGP !== undefined && { commentairesGP }),
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
