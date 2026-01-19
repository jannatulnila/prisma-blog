import express, { NextFunction, Request, Response, Router }  from "express";
import { postController } from "./post.controller";
import { UserRole } from "../../../generated/prisma/enums";
import auth from "../../middleware/auth";

const router = express.Router();


router.get(
    "/",
    postController.getAllPost
)

router.post("/",
     auth(UserRole.USER),
      postController.createPost)

export const postRouter: Router = router;