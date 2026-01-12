import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

// GET tous les demandes
router.get("/", async (_req, res) => {
  try {
    const demandes = await prisma.demande.findMany({
      include: {
        societe: true,
        interlocuteur: true,
      },
      orderBy: { dateEnregistrement: "desc" },
    });
    res.json(demandes);
  } catch (error) {
    console.error("Erreur lors de la récupération des demandes:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

// GET une demande par ID
router.get("/:id", async (req, res) => {
  try {
    const demande = await prisma.demande.findUnique({
      where: { id: parseInt(req.params.id) },
      include: {
        societe: true,
        interlocuteur: true,
        couts: true,
        delais: true,
      },
    });
    if (!demande) {
      return res.status(404).json({ error: "Demande introuvable" });
    }
    res.json(demande);
  } catch (error) {
    console.error("Erreur lors de la récupération de la demande:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

// POST créer une demande
router.post("/", async (req, res) => {
  try {
    const {
      dateReception,
      societeId,
      interlocuteurNom,
      interlocuteurId,
      description,
      priorite,
      statut,
    } = req.body;

    const demande = await prisma.demande.create({
      data: {
        dateReception: new Date(dateReception),
        societeId: parseInt(societeId),
        interlocuteurNom,
        interlocuteurId: interlocuteurId ? parseInt(interlocuteurId) : null,
        description,
        priorite,
        statut,
      },
    });
    res.status(201).json(demande);
  } catch (error) {
    console.error("Erreur lors de la création de la demande:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

// PUT mettre à jour une demande
router.put("/:id", async (req, res) => {
  try {
    const {
      dateReception,
      societeId,
      interlocuteurNom,
      interlocuteurId,
      description,
      priorite,
      statut,
    } = req.body;

    const demande = await prisma.demande.update({
      where: { id: parseInt(req.params.id) },
      data: {
        ...(dateReception && { dateReception: new Date(dateReception) }),
        ...(societeId && { societeId: parseInt(societeId) }),
        ...(interlocuteurNom !== undefined && { interlocuteurNom }),
        ...(interlocuteurId !== undefined && { 
          interlocuteurId: interlocuteurId ? parseInt(interlocuteurId) : null 
        }),
        ...(description !== undefined && { description }),
        ...(priorite !== undefined && { priorite }),
        ...(statut !== undefined && { statut }),
        dateModification: new Date(),
      },
    });
    res.json(demande);
  } catch (error) {
    console.error("Erreur lors de la mise à jour de la demande:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

// DELETE supprimer une demande
router.delete("/:id", async (req, res) => {
  try {
    await prisma.demande.delete({
      where: { id: parseInt(req.params.id) },
    });
    res.json({ message: "Demande supprimée avec succès" });
  } catch (error) {
    console.error("Erreur lors de la suppression de la demande:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

export default router;
