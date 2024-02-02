import { SectionDivider } from "@/components/shared/custom";
import {
  HomeHero,
  HomeDestinations,
  HomePhoto
} from "./sections"
import { PhotoPageObject, BlogPageObject } from "@/types";
interface IPropTypes {
  blogs: BlogPageObject[] | undefined;
  photos: PhotoPageObject[] | undefined;
};
export default function Home({ blogs, photos }: IPropTypes) {

  return (
    <div>
      <HomeHero items={blogs} />
      <SectionDivider />
      <HomeDestinations items={blogs} />
      <SectionDivider />
      <HomePhoto items={photos} />
      <SectionDivider />
    </div>
  );
}
