import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

// GET toutes les UO
router.get("/", async (_req, res) => {
  try {
    const uos = await prisma.uniteOrganisationnelle.findMany({
      include: {
        parent: true,
        enfants: true,
        societe: true,
        utilisateurs: true,
      },
      orderBy: { nom: "asc" },
    });
    res.json(uos);
  } catch (error) {
    console.error("Erreur lors de la récupération des UO:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

// GET une UO par ID
router.get("/:id", async (req, res) => {
  try {
    const uo = await prisma.uniteOrganisationnelle.findUnique({
      where: { id: parseInt(req.params.id) },
      include: {
        parent: true,
        enfants: true,
        societe: true,
        utilisateurs: true,
      },
    });
    if (!uo) {
      return res.status(404).json({ error: "UO introuvable" });
    }
    res.json(uo);
  } catch (error) {
    console.error("Erreur lors de la récupération de l'UO:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

// POST créer une UO
router.post("/", async (req, res) => {
  try {
    const { nom, description, responsable, parentId, societeId } = req.body;

    const uo = await prisma.uniteOrganisationnelle.create({
      data: {
        nom,
        description,
        responsable,
        parentId: parentId ? parseInt(parentId) : null,
        societeId: societeId ? parseInt(societeId) : null,
      },
    });
    res.status(201).json(uo);
  } catch (error) {
    console.error("Erreur lors de la création de l'UO:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

// PUT mettre à jour une UO
router.put("/:id", async (req, res) => {
  try {
    const { nom, description, responsable, parentId, societeId } = req.body;

    const uo = await prisma.uniteOrganisationnelle.update({
      where: { id: parseInt(req.params.id) },
      data: {
        ...(nom && { nom }),
        ...(description !== undefined && { description }),
        ...(responsable !== undefined && { responsable }),
        ...(parentId !== undefined && { 
          parentId: parentId ? parseInt(parentId) : null 
        }),
        ...(societeId !== undefined && { 
          societeId: societeId ? parseInt(societeId) : null 
        }),
      },
    });
    res.json(uo);
  } catch (error) {
    console.error("Erreur lors de la mise à jour de l'UO:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

// DELETE supprimer une UO
router.delete("/:id", async (req, res) => {
  try {
    await prisma.uniteOrganisationnelle.delete({
      where: { id: parseInt(req.params.id) },
    });
    res.json({ message: "UO supprimée avec succès" });
  } catch (error) {
    console.error("Erreur lors de la suppression de l'UO:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

export default router;
