import { Router } from "express";
import { prisma } from "../db";

const router = Router();

// GET tous les demandes
router.get("/", async (_req, res) => {
  try {
    const demandes = await prisma.demande.findMany({
      orderBy: { dateCreation: "desc" },
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
      nomProjet,
      description,
      descriptionPerimetre,
      perimetre,
      typeProjet,
      dateReception,
      statutSoumission,
      statutId,
      isDraft,
    } = req.body;

    const demande = await prisma.demande.create({
      data: {
        nomProjet,
        description,
        descriptionPerimetre,
        perimetre,
        typeProjet,
        dateReception: new Date(dateReception),
        statutSoumission,
        statutId: statutId ? parseInt(statutId) : null,
        isDraft: isDraft ?? false,
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
      nomProjet,
      description,
      descriptionPerimetre,
      perimetre,
      typeProjet,
      dateReception,
      statutSoumission,
      statutId,
      isDraft,
    } = req.body;

    const demande = await prisma.demande.update({
      where: { id: parseInt(req.params.id) },
      data: {
        ...(nomProjet !== undefined && { nomProjet }),
        ...(description !== undefined && { description }),
        ...(descriptionPerimetre !== undefined && { descriptionPerimetre }),
        ...(perimetre !== undefined && { perimetre }),
        ...(typeProjet !== undefined && { typeProjet }),
        ...(dateReception !== undefined && { dateReception: new Date(dateReception) }),
        ...(statutSoumission !== undefined && { statutSoumission }),
        ...(statutId !== undefined && { statutId: statutId ? parseInt(statutId) : null }),
        ...(isDraft !== undefined && { isDraft }),
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
