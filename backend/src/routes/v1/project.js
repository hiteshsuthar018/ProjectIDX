import express from "express";
import { createProjectController, getProjectTree } from "../../controllers/projectController.js";
const router = express.Router();

// Create a new project /api/v1/project
router.post('/',createProjectController);
router.get('/:projectId/tree',getProjectTree);


export default router;