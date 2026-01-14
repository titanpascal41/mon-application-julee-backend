import { Router } from "express";
import { db } from "../db";
import { ResultSetHeader, RowDataPacket } from "mysql2";

const router = Router();

// GET all
router.get("/", (_req, res) => {
  db.query("SELECT * FROM users", (err, results) => {
    if (err) {
      console.error("Erreur SELECT users:", err);
      return res.status(500).json({ message: "Erreur lors de la récupération", error: err.message });
    }
    const rows = results as RowDataPacket[];
    return res.json(rows);
  });
});

// GET by id
router.get("/:id", (req, res) => {
  const { id } = req.params;
  db.query("SELECT * FROM users WHERE id = ?", [id], (err, results) => {
    if (err) {
      console.error("Erreur SELECT user:", err);
      return res.status(500).json({ message: "Erreur lors de la récupération", error: err.message });
    }
    const rows = results as RowDataPacket[];
    if (rows.length === 0) return res.status(404).json({ message: "Utilisateur non trouvé" });
    return res.json(rows[0]);
  });
});

// CREATE
router.post("/", (req, res) => {
  const { prenom, nom, email, motDePasse, profilId, description } = req.body;

  if (!email) return res.status(400).json({ message: "Le champ email est requis" });
  if (!nom || !prenom) return res.status(400).json({ message: "Le nom et prénom sont requis" });
  if (!profilId) return res.status(400).json({ message: "Le profil est requis" });

  db.query(
    "INSERT INTO users (prenom, nom, email, motDePasse, profilId, description) VALUES (?, ?, ?, ?, ?, ?)",
    [prenom, nom, email, motDePasse, profilId, description || null],
    (err, result) => {
      if (err) {
        console.error("Erreur INSERT user:", err);
        return res.status(500).json({ message: "Erreur lors de la création", error: err.message });
      }
      const info = result as ResultSetHeader;
      return res.status(201).json({
        id: info.insertId,
        prenom,
        nom,
        email,
        profilId,
        description
      });
    }
  );
});

// UPDATE
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { prenom, nom, email, motDePasse, profilId, description } = req.body;
  
  if (!prenom && !nom && !email && !motDePasse && !profilId && !description) {
    return res.status(400).json({ message: "Aucun champ à mettre à jour" });
  }

  const fields: string[] = [];
  const values: any[] = [];
  
  if (prenom !== undefined) { fields.push("prenom = ?"); values.push(prenom); }
  if (nom !== undefined) { fields.push("nom = ?"); values.push(nom); }
  if (email !== undefined) { fields.push("email = ?"); values.push(email); }
  if (motDePasse !== undefined) { fields.push("motDePasse = ?"); values.push(motDePasse); }
  if (profilId !== undefined) { fields.push("profilId = ?"); values.push(profilId); }
  if (description !== undefined) { fields.push("description = ?"); values.push(description); }
  
  values.push(id);

  db.query(`UPDATE users SET ${fields.join(", ")} WHERE id = ?`, values, (err, result) => {
    if (err) {
      console.error("Erreur UPDATE user:", err);
      return res.status(500).json({ message: "Erreur lors de la mise à jour", error: err.message });
    }
    const info = result as ResultSetHeader;
    if (info.affectedRows === 0) return res.status(404).json({ message: "Utilisateur non trouvé" });
    return res.json({ id, prenom, nom, email, profilId, description });
  });
});

// DELETE
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM users WHERE id = ?", [id], (err, result) => {
    if (err) {
      console.error("Erreur DELETE user:", err);
      return res.status(500).json({ message: "Erreur lors de la suppression", error: err.message });
    }
    const info = result as ResultSetHeader;
    if (info.affectedRows === 0) return res.status(404).json({ message: "Utilisateur non trouvé" });
    return res.json({ message: "Utilisateur supprimé" });
  });
});

export default router;
