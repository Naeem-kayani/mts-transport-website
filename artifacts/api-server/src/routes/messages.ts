import { Router, type IRouter } from "express";
import { eq } from "drizzle-orm";
import { db, messagesTable } from "@workspace/db";
import {
  CreateMessageBody,
  UpdateMessageBody,
  UpdateMessageParams,
  DeleteMessageParams,
} from "@workspace/api-zod";

const router: IRouter = Router();

router.get("/messages", async (_req, res): Promise<void> => {
  const rows = await db.select().from(messagesTable).orderBy(messagesTable.createdAt);
  res.json(rows);
});

router.post("/messages", async (req, res): Promise<void> => {
  const parsed = CreateMessageBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  const [row] = await db.insert(messagesTable).values({
    name: parsed.data.name,
    phone: parsed.data.phone,
    message: parsed.data.message,
    status: "unresolved",
  }).returning();
  res.status(201).json(row);
});

router.patch("/messages/:id", async (req, res): Promise<void> => {
  const params = UpdateMessageParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }
  const parsed = UpdateMessageBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  const [row] = await db
    .update(messagesTable)
    .set({ status: parsed.data.status })
    .where(eq(messagesTable.id, params.data.id))
    .returning();
  if (!row) {
    res.status(404).json({ error: "Message not found" });
    return;
  }
  res.json(row);
});

router.delete("/messages/:id", async (req, res): Promise<void> => {
  const params = DeleteMessageParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }
  const [row] = await db.delete(messagesTable).where(eq(messagesTable.id, params.data.id)).returning();
  if (!row) {
    res.status(404).json({ error: "Message not found" });
    return;
  }
  res.sendStatus(204);
});

export default router;
