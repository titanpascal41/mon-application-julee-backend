import { Router } from "express";
import { prisma } from "../db";

const router = Router();

// GET all couts
router.get("/", async (_req, res) => {
  try {
    const couts = await prisma.cout.findMany({
      orderBy: { dateCreation: 'desc' }
    });
    return res.json(couts);
  } catch (error) {
    console.error("Erreur SELECT couts:", error);
    return res.status(500).json({ message: "Erreur lors de la récupération des coûts", error: error instanceof Error ? error.message : error });
  }
});

// GET by id
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const cout = await prisma.cout.findUnique({
      where: { id: parseInt(id) }
    });
    if (!cout) return res.status(404).json({ message: "Coût non trouvé" });
    return res.json(cout);
  } catch (error) {
    console.error("Erreur SELECT cout:", error);
    return res.status(500).json({ message: "Erreur lors de la récupération", error: error instanceof Error ? error.message : error });
  }
});

// CREATE
router.post("/", async (req, res) => {
  try {
    const { chargePrevisionnelleDEV, chargeEffectiveDEV, tjmDEV, chargePrevisionnelleTIV, chargeEffectiveTIV, tjmTIV } = req.body;

    const cout = await prisma.cout.create({
      data: {
        chargePrevisionnelleDEV: chargePrevisionnelleDEV ? parseFloat(chargePrevisionnelleDEV) : null,
        chargeEffectiveDEV: chargeEffectiveDEV ? parseFloat(chargeEffectiveDEV) : null,
        tjmDEV: tjmDEV ? parseFloat(tjmDEV) : null,
        chargePrevisionnelleTIV: chargePrevisionnelleTIV ? parseFloat(chargePrevisionnelleTIV) : null,
        chargeEffectiveTIV: chargeEffectiveTIV ? parseFloat(chargeEffectiveTIV) : null,
        tjmTIV: tjmTIV ? parseFloat(tjmTIV) : null
      }
    });
    return res.status(201).json(cout);
  } catch (error) {
    console.error("Erreur INSERT cout:", error);
    return res.status(500).json({ message: "Erreur lors de la création", error: error instanceof Error ? error.message : error });
  }
});

// UPDATE
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { chargePrevisionnelleDEV, chargeEffectiveDEV, tjmDEV, chargePrevisionnelleTIV, chargeEffectiveTIV, tjmTIV } = req.body;

    const updateData: any = {};
    if (chargePrevisionnelleDEV !== undefined) updateData.chargePrevisionnelleDEV = chargePrevisionnelleDEV ? parseFloat(chargePrevisionnelleDEV) : null;
    if (chargeEffectiveDEV !== undefined) updateData.chargeEffectiveDEV = chargeEffectiveDEV ? parseFloat(chargeEffectiveDEV) : null;
    if (tjmDEV !== undefined) updateData.tjmDEV = tjmDEV ? parseFloat(tjmDEV) : null;
    if (chargePrevisionnelleTIV !== undefined) updateData.chargePrevisionnelleTIV = chargePrevisionnelleTIV ? parseFloat(chargePrevisionnelleTIV) : null;
    if (chargeEffectiveTIV !== undefined) updateData.chargeEffectiveTIV = chargeEffectiveTIV ? parseFloat(chargeEffectiveTIV) : null;
    if (tjmTIV !== undefined) updateData.tjmTIV = tjmTIV ? parseFloat(tjmTIV) : null;

    const cout = await prisma.cout.update({
      where: { id: parseInt(id) },
      data: updateData
    });
    return res.json(cout);
  } catch (error) {
    console.error("Erreur UPDATE cout:", error);
    return res.status(500).json({ message: "Erreur lors de la mise à jour", error: error instanceof Error ? error.message : error });
  }
});

// DELETE
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.cout.delete({
      where: { id: parseInt(id) }
    });
    return res.json({ message: "Coût supprimé" });
  } catch (error) {
    console.error("Erreur DELETE cout:", error);
    return res.status(500).json({ message: "Erreur lors de la suppression", error: error instanceof Error ? error.message : error });
  }
});

export default router;
