import { Router } from "express";
import { prisma } from "../db";

const router = Router();

// GET all sprints
router.get("/", async (_req, res) => {
  try {
    const sprints = await prisma.sprint.findMany({
      orderBy: { dateCreation: 'desc' }
    });
    return res.json(sprints);
  } catch (error) {
    console.error("Erreur SELECT sprints:", error);
    return res.status(500).json({ message: "Erreur lors de la récupération des sprints", error: error instanceof Error ? error.message : error });
  }
});

// GET by id
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const sprint = await prisma.sprint.findUnique({
      where: { id: parseInt(id) }
    });
    if (!sprint) return res.status(404).json({ message: "Sprint non trouvé" });
    return res.json(sprint);
  } catch (error) {
    console.error("Erreur SELECT sprint:", error);
    return res.status(500).json({ message: "Erreur lors de la récupération", error: error instanceof Error ? error.message : error });
  }
});

// CREATE
router.post("/", async (req, res) => {
  try {
    const { nom, description, dateDebut, dateFin, dateValidationSI, dateReponseDEV, dateReponseTIV } = req.body;

    if (!nom || !dateDebut || !dateFin) {
      return res.status(400).json({ message: "Les champs nom, dateDebut et dateFin sont requis" });
    }

    const sprint = await prisma.sprint.create({
      data: {
        nom,
        description,
        dateDebut: new Date(dateDebut),
        dateFin: new Date(dateFin),
        dateValidationSI: dateValidationSI ? new Date(dateValidationSI) : null,
        dateReponseDEV: dateReponseDEV ? new Date(dateReponseDEV) : null,
        dateReponseTIV: dateReponseTIV ? new Date(dateReponseTIV) : null
      }
    });
    return res.status(201).json(sprint);
  } catch (error) {
    console.error("Erreur INSERT sprint:", error);
    return res.status(500).json({ message: "Erreur lors de la création", error: error instanceof Error ? error.message : error });
  }
});

// UPDATE
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { nom, description, dateDebut, dateFin, dateValidationSI, dateReponseDEV, dateReponseTIV } = req.body;

    const updateData: any = {};
    if (nom !== undefined) updateData.nom = nom;
    if (description !== undefined) updateData.description = description;
    if (dateDebut !== undefined) updateData.dateDebut = new Date(dateDebut);
    if (dateFin !== undefined) updateData.dateFin = new Date(dateFin);
    if (dateValidationSI !== undefined) updateData.dateValidationSI = dateValidationSI ? new Date(dateValidationSI) : null;
    if (dateReponseDEV !== undefined) updateData.dateReponseDEV = dateReponseDEV ? new Date(dateReponseDEV) : null;
    if (dateReponseTIV !== undefined) updateData.dateReponseTIV = dateReponseTIV ? new Date(dateReponseTIV) : null;

    const sprint = await prisma.sprint.update({
      where: { id: parseInt(id) },
      data: updateData
    });
    return res.json(sprint);
  } catch (error) {
    console.error("Erreur UPDATE sprint:", error);
    return res.status(500).json({ message: "Erreur lors de la mise à jour", error: error instanceof Error ? error.message : error });
  }
});

// DELETE
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.sprint.delete({
      where: { id: parseInt(id) }
    });
    return res.json({ message: "Sprint supprimé" });
  } catch (error) {
    console.error("Erreur DELETE sprint:", error);
    return res.status(500).json({ message: "Erreur lors de la suppression", error: error instanceof Error ? error.message : error });
  }
});

export default router;
