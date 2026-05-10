import { getAllPosts, getAllTags } from "@/lib/posts"
import { SearchPageClient } from "./search-client"

export default function SearchPage() {
  const posts = getAllPosts()
  const tags = getAllTags()

  return <SearchPageClient posts={posts} tags={tags} />
}
