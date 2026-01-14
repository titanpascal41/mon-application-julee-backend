import { Router } from "express";
import { prisma } from "../db";

const router = Router();

// GET tous les collaborateurs
router.get("/", async (_req, res) => {
  try {
    const collaborateurs = await prisma.collaborateur.findMany({
      orderBy: { id: 'asc' }
    });
    return res.json(collaborateurs);
  } catch (error) {
    console.error("Erreur SELECT collaborateurs:", error);
    return res.status(500).json({ message: "Erreur lors de la récupération des collaborateurs", error: error instanceof Error ? error.message : error });
  }
});

// GET un collaborateur par id
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const collaborateur = await prisma.collaborateur.findUnique({
      where: { id: parseInt(id) }
    });
    if (!collaborateur) {
      return res.status(404).json({ message: "Collaborateur non trouvé" });
    }
    return res.json(collaborateur);
  } catch (error) {
    console.error("Erreur SELECT collaborateur:", error);
    return res.status(500).json({ message: "Erreur lors de la récupération du collaborateur", error: error instanceof Error ? error.message : error });
  }
});

// CREATE collaborateur
router.post("/", async (req, res) => {
  try {
    const { nom, email, poste, telephone, actif } = req.body;

    if (!nom || !nom.trim()) {
      return res.status(400).json({ message: "Le nom du collaborateur est requis" });
    }
    if (!email || !email.trim()) {
      return res.status(400).json({ message: "L'email du collaborateur est requis" });
    }

    const collaborateur = await prisma.collaborateur.create({
      data: {
        nom: nom.trim(),
        email: email.trim(),
        poste,
        telephone,
        actif: actif ?? true
      }
    });
    return res.status(201).json(collaborateur);
  } catch (error) {
    console.error("Erreur INSERT collaborateur:", error);
    return res.status(500).json({ message: "Erreur lors de la création du collaborateur", error: error instanceof Error ? error.message : error });
  }
});

// UPDATE collaborateur
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { nom, email, poste, telephone, actif } = req.body;

    if (!nom || !nom.trim()) {
      return res.status(400).json({ message: "Le nom du collaborateur est requis" });
    }
    if (!email || !email.trim()) {
      return res.status(400).json({ message: "L'email du collaborateur est requis" });
    }

    const collaborateur = await prisma.collaborateur.update({
      where: { id: parseInt(id) },
      data: {
        nom: nom.trim(),
        email: email.trim(),
        poste,
        telephone,
        actif: actif ?? true
      }
    });
    return res.json(collaborateur);
  } catch (error) {
    console.error("Erreur UPDATE collaborateur:", error);
    return res.status(500).json({ message: "Erreur lors de la mise à jour du collaborateur", error: error instanceof Error ? error.message : error });
  }
});

// DELETE collaborateur
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.collaborateur.delete({
      where: { id: parseInt(id) }
    });
    return res.json({ message: "Collaborateur supprimé" });
  } catch (error) {
    console.error("Erreur DELETE collaborateur:", error);
    return res.status(500).json({ message: "Erreur lors de la suppression du collaborateur", error: error instanceof Error ? error.message : error });
  }
});

export default router;
