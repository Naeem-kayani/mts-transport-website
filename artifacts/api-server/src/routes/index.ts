import { Router, type IRouter } from "express";
import healthRouter from "./health";
import routesRouter from "./routes";
import messagesRouter from "./messages";
import contactsRouter from "./contacts";

const router: IRouter = Router();

router.use(healthRouter);
router.use(routesRouter);
router.use(messagesRouter);
router.use(contactsRouter);

export default router;
