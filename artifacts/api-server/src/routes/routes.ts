import { Router, type IRouter } from "express";
import { eq } from "drizzle-orm";
import { db, routesTable } from "@workspace/db";
import {
  CreateRouteBody,
  UpdateRouteBody,
  UpdateRouteParams,
  DeleteRouteParams,
} from "@workspace/api-zod";

const router: IRouter = Router();

router.get("/routes", async (_req, res): Promise<void> => {
  const rows = await db.select().from(routesTable).orderBy(routesTable.createdAt);
  res.json(rows);
});

router.post("/routes", async (req, res): Promise<void> => {
  const parsed = CreateRouteBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  const [row] = await db.insert(routesTable).values({
    title: parsed.data.title,
    fromLocation: parsed.data.fromLocation,
    toLocation: parsed.data.toLocation,
    covered: parsed.data.covered ?? "",
    timing: parsed.data.timing ?? "",
    vehicle: parsed.data.vehicle,
    category: parsed.data.category,
  }).returning();
  res.status(201).json(row);
});

router.patch("/routes/:id", async (req, res): Promise<void> => {
  const params = UpdateRouteParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }
  const parsed = UpdateRouteBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  const [row] = await db
    .update(routesTable)
    .set({
      ...(parsed.data.title != null && { title: parsed.data.title }),
      ...(parsed.data.fromLocation != null && { fromLocation: parsed.data.fromLocation }),
      ...(parsed.data.toLocation != null && { toLocation: parsed.data.toLocation }),
      ...(parsed.data.covered != null && { covered: parsed.data.covered }),
      ...(parsed.data.timing != null && { timing: parsed.data.timing }),
      ...(parsed.data.vehicle != null && { vehicle: parsed.data.vehicle }),
      ...(parsed.data.category != null && { category: parsed.data.category }),
    })
    .where(eq(routesTable.id, params.data.id))
    .returning();
  if (!row) {
    res.status(404).json({ error: "Route not found" });
    return;
  }
  res.json(row);
});

router.delete("/routes/:id", async (req, res): Promise<void> => {
  const params = DeleteRouteParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }
  const [row] = await db.delete(routesTable).where(eq(routesTable.id, params.data.id)).returning();
  if (!row) {
    res.status(404).json({ error: "Route not found" });
    return;
  }
  res.sendStatus(204);
});

export default router;
