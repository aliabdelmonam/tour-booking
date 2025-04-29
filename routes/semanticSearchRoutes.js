import express from "express";
import  * as SSController from "../controllers/semanticSearchController.js";


const semanticSearchRouter = express.Router();

semanticSearchRouter.route("/").get(SSController.semantic_search);

export default semanticSearchRouter;