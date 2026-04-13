import { getAllPostsMeta } from "@/lib/mdx";
import HomeView from "@/components/HomeView";

export default async function Home() {
  const posts = await getAllPostsMeta();
  
  return <HomeView posts={posts} />;
}
