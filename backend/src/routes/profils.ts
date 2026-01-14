import { Router } from "express";
import { prisma } from "../db";

const router = Router();

// GET tous les profils
router.get("/", async (_req, res) => {
  try {
    const profils = await prisma.profil.findMany({
      orderBy: { id: 'asc' }
    });
    return res.json(profils);
  } catch (error) {
    console.error("Erreur SELECT profils:", error);
    return res.status(500).json({ message: "Erreur lors de la récupération des profils", error: error instanceof Error ? error.message : error });
  }
});

// GET un profil par id
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const profil = await prisma.profil.findUnique({
      where: { id: parseInt(id) }
    });
    if (!profil) {
      return res.status(404).json({ message: "Profil non trouvé" });
    }
    return res.json(profil);
  } catch (error) {
    console.error("Erreur SELECT profil:", error);
    return res.status(500).json({ message: "Erreur lors de la récupération du profil", error: error instanceof Error ? error.message : error });
  }
});

// CREATE profil
router.post("/", async (req, res) => {
  try {
    const { nom } = req.body;
    if (!nom || !nom.trim()) {
      return res.status(400).json({ message: "Le nom du profil est requis" });
    }

    const profil = await prisma.profil.create({
      data: { nom: nom.trim() }
    });
    return res.status(201).json(profil);
  } catch (error) {
    console.error("Erreur INSERT profil:", error);
    return res.status(500).json({ message: "Erreur lors de la création du profil", error: error instanceof Error ? error.message : error });
  }
});

// UPDATE profil
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { nom } = req.body;

    if (!nom || !nom.trim()) {
      return res.status(400).json({ message: "Le nom du profil est requis" });
    }

    const profil = await prisma.profil.update({
      where: { id: parseInt(id) },
      data: { nom: nom.trim() }
    });
    return res.json(profil);
  } catch (error) {
    console.error("Erreur UPDATE profil:", error);
    return res.status(500).json({ message: "Erreur lors de la mise à jour du profil", error: error instanceof Error ? error.message : error });
  }
});

// DELETE profil
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.profil.delete({
      where: { id: parseInt(id) }
    });
    return res.json({ message: "Profil supprimé" });
  } catch (error) {
    console.error("Erreur DELETE profil:", error);
    return res.status(500).json({ message: "Erreur lors de la suppression du profil", error: error instanceof Error ? error.message : error });
  }
});

export default router;
