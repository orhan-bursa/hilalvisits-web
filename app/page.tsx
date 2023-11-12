import { Home as FeatureHome } from "@/components/features";
import { getHomePage } from "@/utils/notion";

export default async function Home() {
  const { blogs, photos } = await getHomePage();
  return <FeatureHome photos={photos} blogs={blogs} />;
}
