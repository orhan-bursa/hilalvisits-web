import { Galeri as FeatureGaleri } from "@/components/features";
import { getPhotos } from "@/utils/notion";
export default async function Galeri() {
  const photos: any = await getPhotos();

  if (!photos) return <div>No Photos found.</div>;

  return <FeatureGaleri items={photos} />;
}
