import { Photos as FeaturePhotos } from "@/components/features";
import { getPhotos } from "@/utils/notion";
export default async function Photo() {
  const photos: any = await getPhotos();

  if (!photos) return <div>No Photos found.</div>;

  return <FeaturePhotos items={photos} />;
}
