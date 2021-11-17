export type paraContent ={
  text: string;
}
export type content={
  data: paraContent;
  type: string;
}
export type Post ={
  title: string;
  id:string;
  claps_count: number;
  comments_count: number;
  content: Array<content>;
  image: string;
}
export type MetaDataObj ={
  status :number
}
export type Posts = Array<Post>
export type Result={
  data: Posts;
  metaData: MetaDataObj;
}
export type IdsType ={
  Ids : Array<string>
}
export type Results ={
  data: Result;
  currentPage: string;
//Ids: IdsType;
//  setIds: Function;
}
export type blogPost = {
data: Post;
metaData: MetaDataObj;
}
export type Comment ={
  content: string;
}
export type Comments = Array<Comment>
export type blogComments ={
data: Comments;
metaData: MetaDataObj;
}
export type PostResult={
  post: blogPost;
  comments: blogComments; 
}
export const TotalPages :number = 200 
