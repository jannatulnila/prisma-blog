import { Request, Response } from "express";
import { postService } from "./post.service";

const createPost = async (req: Request, res: Response) => {
  try {
    const user = req.user;
    if(!req.user){
      return res.status(401).json({
        success:false,
        message:"You are not authorized"
      })
    }
    const result = await postService.createPost(req.body, req.user.id as string);

    return res.status(201).json({
      success: true,
      message: "Post created successfully",
      data: result,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      error: "Failed to create post",
      details: error
    });
  }
};


export const postController = {
    createPost
}