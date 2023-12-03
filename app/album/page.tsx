import { Albums as FeatureAlbums } from "@/components/features";
import { getAlbums } from "@/utils/notion";
export default async function Album() {
  const albums: any = await getAlbums();
  console.log("albums: ", albums);

  if (!albums) return <div>No Albums found.</div>;

  return <FeatureAlbums data={albums} />;
}