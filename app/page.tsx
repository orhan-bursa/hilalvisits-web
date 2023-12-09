import { Home as FeatureHome } from "@/components";
import { getHomePage } from "@/utils/notion";

export default async function Home() {
  const { blogs, photos } = await getHomePage();
  return <FeatureHome photos={photos} blogs={blogs} />;
}
