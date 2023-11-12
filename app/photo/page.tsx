import { Photos as FeaturePhotos } from "@/components/features";
import { getPhotos } from "@/utils/notion";
export default async function Photo() {
  const photos: any = await getPhotos();
  console.log("photos: ", photos);

  if (!photos) return <div>No Posts found.</div>;

  return <FeaturePhotos data={photos} />;
}
