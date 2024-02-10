import {
  HomeHero,
  HomeLatestBlogs,
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
      <HomeLatestBlogs items={blogs} />
      <HomePhoto items={photos} />
    </div>
  );
}
