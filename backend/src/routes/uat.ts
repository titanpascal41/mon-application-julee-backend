import { Router } from "express";
import { prisma } from "../db";

const router = Router();

// GET tous les UAT
router.get("/", async (_req, res) => {
  try {
    const uats = await prisma.uAT.findMany({
      orderBy: { dateCreation: "desc" },
    });
    res.json(uats);
  } catch (error) {
    console.error("Erreur lors de la récupération des UAT:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

// GET un UAT par ID
router.get("/:id", async (req, res) => {
  try {
    const uat = await prisma.uAT.findUnique({
      where: { id: parseInt(req.params.id) },
    });
    if (!uat) {
      return res.status(404).json({ error: "UAT introuvable" });
    }
    res.json(uat);
  } catch (error) {
    console.error("Erreur lors de la récupération de l'UAT:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

// POST créer un UAT
router.post("/", async (req, res) => {
  try {
    const {
      dateDebutUAT,
      dateFinUAT,
      statutUAT,
      nombreRetoursUAT,
      reservesMetier,
      commentaireUAT,
      signatureValidationClient,
      planAction,
    } = req.body;

    const uat = await prisma.uAT.create({
      data: {
        dateDebutUAT: new Date(dateDebutUAT),
        dateFinUAT: dateFinUAT ? new Date(dateFinUAT) : null,
        statutUAT,
        nombreRetoursUAT: nombreRetoursUAT || 0,
        reservesMetier,
        commentaireUAT,
        signatureValidationClient,
        planAction,
      },
    });
    res.status(201).json(uat);
  } catch (error) {
    console.error("Erreur lors de la création de l'UAT:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

// PUT mettre à jour un UAT
router.put("/:id", async (req, res) => {
  try {
    const {
      dateDebutUAT,
      dateFinUAT,
      statutUAT,
      nombreRetoursUAT,
      reservesMetier,
      commentaireUAT,
      signatureValidationClient,
      planAction,
    } = req.body;

    const uat = await prisma.uAT.update({
      where: { id: parseInt(req.params.id) },
      data: {
        ...(dateDebutUAT !== undefined && { 
          dateDebutUAT: new Date(dateDebutUAT)
        }),
        ...(dateFinUAT !== undefined && { 
          dateFinUAT: dateFinUAT ? new Date(dateFinUAT) : null 
        }),
        ...(statutUAT !== undefined && { statutUAT }),
        ...(nombreRetoursUAT !== undefined && { nombreRetoursUAT }),
        ...(reservesMetier !== undefined && { reservesMetier }),
        ...(commentaireUAT !== undefined && { commentaireUAT }),
        ...(signatureValidationClient !== undefined && { signatureValidationClient }),
        ...(planAction !== undefined && { planAction }),
        dateModification: new Date(),
      },
    });
    res.json(uat);
  } catch (error) {
    console.error("Erreur lors de la mise à jour de l'UAT:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

// DELETE supprimer un UAT
router.delete("/:id", async (req, res) => {
  try {
    await prisma.uAT.delete({
      where: { id: parseInt(req.params.id) },
    });
    res.json({ message: "UAT supprimé avec succès" });
  } catch (error) {
    console.error("Erreur lors de la suppression de l'UAT:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

export default router;
