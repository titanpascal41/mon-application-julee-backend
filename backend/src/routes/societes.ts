import { Router } from "express";
import { prisma } from "../db";

const router = Router();

// GET toutes les sociétés
router.get("/", async (_req, res) => {
  try {
    const societes = await prisma.societe.findMany({
      orderBy: { id: "asc" }
    });
    return res.json(societes);
  } catch (error) {
    console.error("Erreur SELECT societes:", error);
    return res.status(500).json({ message: "Erreur lors de la récupération des sociétés", error: error instanceof Error ? error.message : error });
  }
});

// GET une société par id
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const societe = await prisma.societe.findUnique({
      where: { id: parseInt(id) }
    });
    if (!societe) {
      return res.status(404).json({ message: "Société non trouvée" });
    }
    return res.json(societe);
  } catch (error) {
    console.error("Erreur SELECT societe:", error);
    return res.status(500).json({ message: "Erreur lors de la récupération de la société", error: error instanceof Error ? error.message : error });
  }
});

// CREATE société
router.post("/", async (req, res) => {
  try {
    const { nom, adresse, email, telephone, responsable } = req.body;

    if (!nom || !nom.trim()) {
      return res.status(400).json({ message: "Le nom de la société est requis" });
    }

    const societe = await prisma.societe.create({
      data: {
        nom: nom.trim(),
        adresse: adresse || null,
        email: email || null,
        telephone: telephone || null,
        responsable: responsable || null
      }
    });
    return res.status(201).json(societe);
  } catch (error) {
    console.error("Erreur INSERT societe:", error);
    return res.status(500).json({ message: "Erreur lors de la création de la société", error: error instanceof Error ? error.message : error });
  }
});

// UPDATE société
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { nom, adresse, email, telephone, responsable } = req.body;

    if (!nom || !nom.trim()) {
      return res.status(400).json({ message: "Le nom de la société est requis" });
    }

    const societe = await prisma.societe.update({
      where: { id: parseInt(id) },
      data: {
        nom: nom.trim(),
        adresse: adresse || null,
        email: email || null,
        telephone: telephone || null,
        responsable: responsable || null
      }
    });
    return res.json(societe);
  } catch (error) {
    console.error("Erreur UPDATE societe:", error);
    return res.status(500).json({ message: "Erreur lors de la mise à jour de la société", error: error instanceof Error ? error.message : error });
  }
});

// DELETE société
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.societe.delete({
      where: { id: parseInt(id) }
    });
    return res.json({ message: "Société supprimée" });
  } catch (error) {
    console.error("Erreur DELETE societe:", error);
    return res.status(500).json({ message: "Erreur lors de la suppression de la société", error: error instanceof Error ? error.message : error });
  }
});

export default router;
