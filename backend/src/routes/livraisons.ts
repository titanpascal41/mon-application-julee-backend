import { Router } from "express";
import { prisma } from "../db";

const router = Router();

// GET toutes les livraisons
router.get("/", async (_req, res) => {
  try {
    const livraisons = await prisma.livraison.findMany({
      orderBy: { dateCreation: "desc" },
    });
    res.json(livraisons);
  } catch (error) {
    console.error("Erreur lors de la récupération des livraisons:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

// GET une livraison par ID
router.get("/:id", async (req, res) => {
  try {
    const livraison = await prisma.livraison.findUnique({
      where: { id: parseInt(req.params.id) },
    });
    if (!livraison) {
      return res.status(404).json({ error: "Livraison introuvable" });
    }
    res.json(livraison);
  } catch (error) {
    console.error("Erreur lors de la récupération de la livraison:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

// POST créer une livraison
router.post("/", async (req, res) => {
  try {
    const {
      numeroVersion,
      releaseNotes,
      dateLivraisonPrevue,
      dateLivraisonEffective,
      dateDeploiement,
      responsableDevOps,
      statutLivraison,
      commentairesGP,
      validationGONOGO,
      rollbackAutomatique,
    } = req.body;

    const livraison = await prisma.livraison.create({
      data: {
        numeroVersion,
        releaseNotes,
        dateLivraisonPrevue: new Date(dateLivraisonPrevue),
        dateLivraisonEffective: dateLivraisonEffective ? new Date(dateLivraisonEffective) : null,
        dateDeploiement: dateDeploiement ? new Date(dateDeploiement) : null,
        responsableDevOps,
        statutLivraison,
        commentairesGP,
        validationGONOGO,
        rollbackAutomatique: rollbackAutomatique ?? false,
      },
    });
    res.status(201).json(livraison);
  } catch (error) {
    console.error("Erreur lors de la création de la livraison:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

// PUT mettre à jour une livraison
router.put("/:id", async (req, res) => {
  try {
    const {
      numeroVersion,
      releaseNotes,
      dateLivraisonPrevue,
      dateLivraisonEffective,
      dateDeploiement,
      responsableDevOps,
      statutLivraison,
      commentairesGP,
      validationGONOGO,
      rollbackAutomatique,
    } = req.body;

    const livraison = await prisma.livraison.update({
      where: { id: parseInt(req.params.id) },
      data: {
        ...(numeroVersion !== undefined && { numeroVersion }),
        ...(releaseNotes !== undefined && { releaseNotes }),
        ...(dateLivraisonPrevue !== undefined && { 
          dateLivraisonPrevue: new Date(dateLivraisonPrevue)
        }),
        ...(dateLivraisonEffective !== undefined && { 
          dateLivraisonEffective: dateLivraisonEffective ? new Date(dateLivraisonEffective) : null 
        }),
        ...(dateDeploiement !== undefined && { 
          dateDeploiement: dateDeploiement ? new Date(dateDeploiement) : null 
        }),
        ...(responsableDevOps !== undefined && { responsableDevOps }),
        ...(statutLivraison !== undefined && { statutLivraison }),
        ...(commentairesGP !== undefined && { commentairesGP }),
        ...(validationGONOGO !== undefined && { validationGONOGO }),
        ...(rollbackAutomatique !== undefined && { rollbackAutomatique }),
        dateModification: new Date(),
      },
    });
    res.json(livraison);
  } catch (error) {
    console.error("Erreur lors de la mise à jour de la livraison:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

// DELETE supprimer une livraison
router.delete("/:id", async (req, res) => {
  try {
    await prisma.livraison.delete({
      where: { id: parseInt(req.params.id) },
    });
    res.json({ message: "Livraison supprimée avec succès" });
  } catch (error) {
    console.error("Erreur lors de la suppression de la livraison:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

export default router;
