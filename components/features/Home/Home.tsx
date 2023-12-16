import { SectionDivider } from "@/components/shared/custom";
import {
  HomeHero,
  HomeDestinations,
  HomePhoto
} from "./sections"
import array from "@/utils/array";

type HomePropTypes = {
  blogs: any[];
  photos: any[];
};
export default function Home({ blogs, photos }: HomePropTypes) {

  return (
    <div>
      <HomeHero data={array(blogs)} />
      <SectionDivider />
      <HomeDestinations data={array(blogs)} />
      <SectionDivider />
      <HomePhoto data={array(blogs)} />
      <SectionDivider />
    </div>
  );
}
