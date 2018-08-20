export interface LooseObject {
  [key: string]: any
}


export interface Comment {
  Author: string,
  Date: string,
  Content: string
}

export interface Post {
	Author: string
  Date: string
  Content: string,
  Image?: string,
  Likes: number,
  Comments: Comment[]
}