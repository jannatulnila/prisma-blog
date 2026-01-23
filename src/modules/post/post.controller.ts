import { Request, Response } from "express";
import { postService } from "./post.service";
import { PostStatus } from "../../../generated/prisma/enums";
import paginationSortingHelper from "../../helpers/paginationSortingHelper";
import { error } from "node:console";

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

const getAllPost= async(req:Request, res:Response)=>{
  try {
    const {search} = req.query;
    const searchString = typeof search === "string" ? search : undefined;
    const tags = req.query.tags ? (req.query.tags as string).split(",") :[];

    const isFeatured = req.query.isFeatured 
           ? req.query.isFeatured === 'true' 
           ? true 
           : req.query.isFeatured === 'false' 
              ? false 
              : undefined
           : undefined;
      
    const status = req.query.status as PostStatus | undefined;       
    const authorId = req.query.authorId as string | undefined;


    const { page, limit, skip, sortBy, sortOrder } = paginationSortingHelper(req.query);

    const result = await postService.getAllPost({search: searchString, tags, isFeatured, status, authorId, page, limit, skip, sortBy, sortOrder});
    res.status(200).json(result)
  } catch (error) {
     res.status(400).json({
      success: false,
      error: "Failed to create post",
      details: error
    });
  }
}


const getPostById = async(req:Request, res:Response)=>{
  try {
    const {postId}= req.params;
    
    if(!postId){
      throw new Error("Post id is required")
    }

    const result = await postService.getPostById(postId);
    res.status(200).json(result)
  } catch (e) {
    res.status(400).json({
      success: false,
      error: "Failed to create post",
      details: e
    });
}
}
export const postController = {
    createPost,
    getAllPost,
    getPostById
}