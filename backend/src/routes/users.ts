import { Router } from "express";
import { prisma } from "../db";

const router = Router();

// GET all
router.get("/", async (_req, res) => {
  try {
    const users = await prisma.user.findMany({
      include: { profil: true }
    });
    return res.json(users);
  } catch (error) {
    console.error("Erreur SELECT users:", error);
    return res.status(500).json({ message: "Erreur lors de la récupération", error: error instanceof Error ? error.message : error });
  }
});

// GET by id
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await prisma.user.findUnique({
      where: { id: parseInt(id) },
      include: { profil: true }
    });
    if (!user) return res.status(404).json({ message: "Utilisateur non trouvé" });
    return res.json(user);
  } catch (error) {
    console.error("Erreur SELECT user:", error);
    return res.status(500).json({ message: "Erreur lors de la récupération", error: error instanceof Error ? error.message : error });
  }
});

// CREATE
router.post("/", async (req, res) => {
  try {
    const { prenom, nom, email, motDePasse, profilId, description } = req.body;

    if (!email) return res.status(400).json({ message: "Le champ email est requis" });
    if (!nom || !prenom) return res.status(400).json({ message: "Le nom et prénom sont requis" });
    if (!profilId) return res.status(400).json({ message: "Le profil est requis" });

    const user = await prisma.user.create({
      data: {
        prenom,
        nom,
        email,
        motDePasse,
        profilId: parseInt(profilId),
        description
      },
      include: { profil: true }
    });
    return res.status(201).json(user);
  } catch (error) {
    console.error("Erreur INSERT user:", error);
    return res.status(500).json({ message: "Erreur lors de la création", error: error instanceof Error ? error.message : error });
  }
});

// UPDATE
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { prenom, nom, email, motDePasse, profilId, description } = req.body;
    
    if (!prenom && !nom && !email && !motDePasse && !profilId && !description) {
      return res.status(400).json({ message: "Aucun champ à mettre à jour" });
    }

    const updateData: any = {};
    if (prenom !== undefined) updateData.prenom = prenom;
    if (nom !== undefined) updateData.nom = nom;
    if (email !== undefined) updateData.email = email;
    if (motDePasse !== undefined) updateData.motDePasse = motDePasse;
    if (profilId !== undefined) updateData.profilId = parseInt(profilId);
    if (description !== undefined) updateData.description = description;

    const user = await prisma.user.update({
      where: { id: parseInt(id) },
      data: updateData,
      include: { profil: true }
    });
    return res.json(user);
  } catch (error) {
    console.error("Erreur UPDATE user:", error);
    return res.status(500).json({ message: "Erreur lors de la mise à jour", error: error instanceof Error ? error.message : error });
  }
});

// DELETE
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.user.delete({
      where: { id: parseInt(id) }
    });
    return res.json({ message: "Utilisateur supprimé" });
  } catch (error) {
    console.error("Erreur DELETE user:", error);
    return res.status(500).json({ message: "Erreur lors de la suppression", error: error instanceof Error ? error.message : error });
  }
});

export default router;
