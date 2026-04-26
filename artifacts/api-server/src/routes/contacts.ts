import { Router, type IRouter } from "express";
import { eq } from "drizzle-orm";
import { db, contactsTable } from "@workspace/db";
import {
  CreateContactBody,
  UpdateContactBody,
  UpdateContactParams,
  DeleteContactParams,
} from "@workspace/api-zod";

const router: IRouter = Router();

router.get("/contacts", async (_req, res): Promise<void> => {
  const rows = await db.select().from(contactsTable).orderBy(contactsTable.createdAt);
  res.json(rows);
});

router.post("/contacts", async (req, res): Promise<void> => {
  const parsed = CreateContactBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  const [row] = await db.insert(contactsTable).values({
    name: parsed.data.name,
    phone: parsed.data.phone,
    pickupLocation: parsed.data.pickupLocation ?? "",
    message: parsed.data.message ?? "",
    status: "new",
  }).returning();
  res.status(201).json(row);
});

router.patch("/contacts/:id", async (req, res): Promise<void> => {
  const params = UpdateContactParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }
  const parsed = UpdateContactBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  const [row] = await db
    .update(contactsTable)
    .set({ status: parsed.data.status })
    .where(eq(contactsTable.id, params.data.id))
    .returning();
  if (!row) {
    res.status(404).json({ error: "Contact not found" });
    return;
  }
  res.json(row);
});

router.delete("/contacts/:id", async (req, res): Promise<void> => {
  const params = DeleteContactParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }
  const [row] = await db.delete(contactsTable).where(eq(contactsTable.id, params.data.id)).returning();
  if (!row) {
    res.status(404).json({ error: "Contact not found" });
    return;
  }
  res.sendStatus(204);
});

export default router;
