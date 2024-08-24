import {
  HomeFavoritesAndAboutMe,
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

  const latestFive = blogs?.slice?.(0, 5)
  const favorites = blogs
    ?.filter(blog => blog?.properties?.favorite?.checkbox)
    ?.slice(0, 3)
  return (
    <div className="space-y-12 md:space-y-16 my-4 md:my-8 ">
      <HomeHero items={latestFive} />
      <HomeFavoritesAndAboutMe items={favorites} />
      <HomeLatestBlogs items={latestFive} />
      <HomePhoto items={photos} />
    </div>
  );
}
