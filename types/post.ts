import { User } from './user'

export type Post = {
  post_id: number,
  text: string,
  timestamp: string,
  author: User,
  numLikes: number
}