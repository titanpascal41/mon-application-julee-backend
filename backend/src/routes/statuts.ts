import { Router } from "express";
import { prisma } from "../prisma";

const router = Router();

// GET tous les statuts
router.get("/", async (_req, res) => {
  try {
    const statuts = await prisma.statut.findMany({
      orderBy: { id: 'asc' }
    });
    return res.json(statuts);
  } catch (error) {
    console.error("Erreur SELECT statuts:", error);
    return res.status(500).json({ message: "Erreur lors de la récupération des statuts", error: error instanceof Error ? error.message : error });
  }
});

// GET un statut par id
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const statut = await prisma.statut.findUnique({
      where: { id: parseInt(id) }
    });
    if (!statut) {
      return res.status(404).json({ message: "Statut non trouvé" });
    }
    return res.json(statut);
  } catch (error) {
    console.error("Erreur SELECT statut:", error);
    return res.status(500).json({ message: "Erreur lors de la récupération du statut", error: error instanceof Error ? error.message : error });
  }
});

// CREATE statut
router.post("/", async (req, res) => {
  try {
    const { nom, description, actif } = req.body;

    if (!nom || !nom.trim()) {
      return res.status(400).json({ message: "Le nom du statut est requis" });
    }

    const statut = await prisma.statut.create({
      data: {
        nom: nom.trim(),
        description,
        actif: actif ?? true
      }
    });
    return res.status(201).json(statut);
  } catch (error) {
    console.error("Erreur INSERT statut:", error);
    return res.status(500).json({ message: "Erreur lors de la création du statut", error: error instanceof Error ? error.message : error });
  }
});

// UPDATE statut
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { nom, description, actif } = req.body;

    if (!nom || !nom.trim()) {
      return res.status(400).json({ message: "Le nom du statut est requis" });
    }

    const statut = await prisma.statut.update({
      where: { id: parseInt(id) },
      data: {
        nom: nom.trim(),
        description,
        actif: actif ?? true
      }
    });
    return res.json(statut);
  } catch (error) {
    console.error("Erreur UPDATE statut:", error);
    return res.status(500).json({ message: "Erreur lors de la mise à jour du statut", error: error instanceof Error ? error.message : error });
  }
});

// DELETE statut
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.statut.delete({
      where: { id: parseInt(id) }
    });
    return res.json({ message: "Statut supprimé" });
  } catch (error) {
    console.error("Erreur DELETE statut:", error);
    return res.status(500).json({ message: "Erreur lors de la suppression du statut", error: error instanceof Error ? error.message : error });
  }
});

export default router;
