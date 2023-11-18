import SwiperComponent from "@/components/shared/Swiper/Swiper";
import { babylonica } from "@/utils/fonts";

type HomePropTypes = {
  blogs: any[];
  photos: any[];
};
export default function Home({ blogs, photos }: HomePropTypes) {
  return (
    <div className="relative h-[400px] w-[100%]">
      <h1
        className={
          babylonica.className +
          " " +
          "absolute right-0 text-[100px] z-30 text-amber-400"
        }
      >
        Hilal Visits
      </h1>
      <section className="relative h-[100%]">
        <div className="h-[90%]">
          <SwiperComponent />
        </div>
      </section>
    </div>
  );
}
