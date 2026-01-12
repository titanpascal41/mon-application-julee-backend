import express from "express";
import cors from "cors";
import { config } from "dotenv";
import { requireDbReady } from "./db";
import profilsRoutes from "./routes/profils";
import societesRoutes from "./routes/societes";
import collaborateursRoutes from "./routes/collaborateurs";
import usersRoutes from "./routes/users";
import statutsRoutes from "./routes/statuts";
import demandesRoutes from "./routes/demandes";
import uoRoutes from "./routes/uo";
import recettesRoutes from "./routes/recettes";
import livraisonsRoutes from "./routes/livraisons";
import uatRoutes from "./routes/uat";
import roadmapRoutes from "./routes/roadmap";
import cadreTemporelRoutes from "./routes/cadreTemporel";

config();

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());
app.use(requireDbReady);

app.get("/", (_req, res) => {
  res.send("Serveur Node.js + TypeScript opérationnel !");
});

app.use("/profils", profilsRoutes);
app.use("/societes", societesRoutes);
app.use("/collaborateurs", collaborateursRoutes);
app.use("/users", usersRoutes);
app.use("/statuts", statutsRoutes);
app.use("/demandes", demandesRoutes);
app.use("/uo", uoRoutes);
app.use("/recettes", recettesRoutes);
app.use("/livraisons", livraisonsRoutes);
app.use("/uat", uatRoutes);
app.use("/roadmap", roadmapRoutes);
app.use("/cadre-temporel", cadreTemporelRoutes);

app.listen(PORT, () => {
  console.log(`[server]: Serveur démarré sur http://localhost:${PORT}`);
});
