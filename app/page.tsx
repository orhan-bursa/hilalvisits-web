import { Home as FeatureHome } from "@/components";
import { getBlogs, getPhotos } from "@/utils/notion";
export default async function Home() {
  const blogs = await getBlogs();
  const photos = await getPhotos();

  return <FeatureHome photos={photos} blogs={blogs} />;
}
