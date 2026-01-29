import express, { NextFunction, Request, Response, Router } from "express";
import { postController } from "./post.controller";
import { UserRole } from "../../../generated/prisma/enums";
import auth from "../../middleware/auth";

const router = express.Router();


router.get(
    "/",
    postController.getAllPost
)
router.get(
    "/my-posts",
    auth(UserRole.USER, UserRole.ADMIN),
    postController.getMyPosts
)

router.get(
    "/:postId",
    postController.getPostById

)

router.post(
    "/",
    auth(UserRole.USER, UserRole.ADMIN),
    postController.createPost
)

router.patch(
    "/:postId",
    auth(UserRole.USER, UserRole.ADMIN),
    postController.updatePost
)



export const postRouter: Router = router;