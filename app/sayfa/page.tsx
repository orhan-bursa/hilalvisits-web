import { Sayfa as FeatureSayfa } from "@/components/features";
import { getPhotos } from "@/utils/notion";
export default async function Sayfa() {
  const pages: any = await getPhotos();

  if (!pages) return <div>No Pages found.</div>;

  return <FeatureSayfa />;
}
