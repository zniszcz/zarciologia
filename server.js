import "reflect-metadata";
import express from "express";
import { DataSource, EntitySchema } from "typeorm";

// === Definicja encji w EntitySchema ===
const UserSchema = new EntitySchema({
  name: "User",
  tableName: "users",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    name: {
      type: "varchar",
    },
  },
});

// === Konfiguracja TypeORM ===
const AppDataSource = new DataSource({
  type: "postgres",
  host: "db",        // nazwa serwisu z docker-compose
  port: 5432,
  username: "app",
  password: "app",
  database: "app",
  synchronize: true, // dev only — automatyczne tworzenie tabel
  logging: false,
  entities: [UserSchema],
});

const app = express();
app.use(express.json());

// Prosty endpoint testowy
app.get("/api/hello", (_req, res) => {
  res.json({ ok: true, message: "Hello from Express 👋" });
});

// Lista userów
app.get("/api/users", async (_req, res) => {
  const repo = AppDataSource.getRepository("User");
  res.json(await repo.find());
});

// Dodawanie usera
app.post("/api/users", async (req, res) => {
  const repo = AppDataSource.getRepository("User");
  const user = repo.create({ name: req.body.name });
  await repo.save(user);
  res.json(user);
});

// Start po inicjalizacji DB
AppDataSource.initialize()
  .then(() => {
    console.log("📦 DB connected");
    app.listen(3000, () =>
      console.log("🚀 Server listening on http://localhost:3000")
    );
  })
  .catch((err) => console.error("❌ DB connection error:", err));
