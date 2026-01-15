import { Router } from "express";
import { prisma } from "../db";

const router = Router();

// GET toutes les UO
router.get("/", async (_req, res) => {
  try {
    const uos = await prisma.uniteOrganisationnelle.findMany({
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
    const { nom, type, actif, societeId, adresse, codePostal, uoParenteId } = req.body;

    if (!nom || !nom.trim()) {
      return res.status(400).json({ message: "Le nom de l'UO est requis" });
    }

    const uo = await prisma.uniteOrganisationnelle.create({
      data: {
        nom: nom.trim(),
        type: type || null,
        actif: actif ?? true,
        adresse: adresse || null,
        codePostal: codePostal || null,
        ...(societeId && { societeId: parseInt(societeId) }),
        ...(uoParenteId && { uoParenteId: parseInt(uoParenteId) })
      }
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
    const { nom, type, actif, societeId, adresse, codePostal, uoParenteId } = req.body;

    if (!nom || !nom.trim()) {
      return res.status(400).json({ message: "Le nom de l'UO est requis" });
    }

    const uo = await prisma.uniteOrganisationnelle.update({
      where: { id: parseInt(req.params.id) },
      data: {
        ...(nom && { nom: nom.trim() }),
        ...(type !== undefined && { type }),
        ...(actif !== undefined && { actif }),
        ...(adresse !== undefined && { adresse }),
        ...(codePostal !== undefined && { codePostal }),
        ...(societeId && {
          societeId: parseInt(societeId),
        }),
        ...(uoParenteId && {
          uoParenteId: parseInt(uoParenteId),
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
