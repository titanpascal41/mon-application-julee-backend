import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

// GET toutes les livraisons
router.get("/", async (_req, res) => {
  try {
    const livraisons = await prisma.livraison.findMany({
      include: { recette: true },
      orderBy: { dateCreation: "desc" },
    });
    res.json(livraisons);
  } catch (error) {
    console.error("Erreur lors de la récupération des livraisons:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

// GET une livraison par ID
router.get("/:id", async (req, res) => {
  try {
    const livraison = await prisma.livraison.findUnique({
      where: { id: parseInt(req.params.id) },
      include: { recette: true },
    });
    if (!livraison) {
      return res.status(404).json({ error: "Livraison introuvable" });
    }
    res.json(livraison);
  } catch (error) {
    console.error("Erreur lors de la récupération de la livraison:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

// POST créer une livraison
router.post("/", async (req, res) => {
  try {
    const {
      numeroVersion,
      dateLivraison,
      statut,
      environnement,
      commentaires,
      recetteId,
    } = req.body;

    const livraison = await prisma.livraison.create({
      data: {
        numeroVersion,
        dateLivraison: dateLivraison ? new Date(dateLivraison) : null,
        statut,
        environnement,
        commentaires,
        recetteId: recetteId ? parseInt(recetteId) : null,
      },
    });
    res.status(201).json(livraison);
  } catch (error) {
    console.error("Erreur lors de la création de la livraison:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

// PUT mettre à jour une livraison
router.put("/:id", async (req, res) => {
  try {
    const {
      numeroVersion,
      dateLivraison,
      statut,
      environnement,
      commentaires,
      recetteId,
    } = req.body;

    const livraison = await prisma.livraison.update({
      where: { id: parseInt(req.params.id) },
      data: {
        ...(numeroVersion && { numeroVersion }),
        ...(dateLivraison !== undefined && { 
          dateLivraison: dateLivraison ? new Date(dateLivraison) : null 
        }),
        ...(statut !== undefined && { statut }),
        ...(environnement !== undefined && { environnement }),
        ...(commentaires !== undefined && { commentaires }),
        ...(recetteId !== undefined && { 
          recetteId: recetteId ? parseInt(recetteId) : null 
        }),
        dateModification: new Date(),
      },
    });
    res.json(livraison);
  } catch (error) {
    console.error("Erreur lors de la mise à jour de la livraison:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

// DELETE supprimer une livraison
router.delete("/:id", async (req, res) => {
  try {
    await prisma.livraison.delete({
      where: { id: parseInt(req.params.id) },
    });
    res.json({ message: "Livraison supprimée avec succès" });
  } catch (error) {
    console.error("Erreur lors de la suppression de la livraison:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

export default router;
