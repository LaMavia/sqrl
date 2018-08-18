export const CACHE_UPDATE = "POST_CACHE_UPDATE"
export const CACHE_FLUSH = "POST_CACHE_FLUSH"


export interface PostCacheInput {
  Content?: string
  ImageURL?: string
}
export const cacheUpdate = (input: PostCacheInput) => ({
  type: CACHE_UPDATE,
  input
})

export const cacheFlush = () => ({
  type: CACHE_FLUSH
})