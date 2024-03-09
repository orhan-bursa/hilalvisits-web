import { PhotoGrid } from "./sections";

export default function Galeri({ items }: { items?: any }) {
  return (
    <div className="space-y-12 md:space-y-16 my-4 md:my-8 ">
      <PhotoGrid items={items} />
    </div>
  );
}
