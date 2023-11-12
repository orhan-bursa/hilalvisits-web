import SwiperComponent from "@/components/shared/Swiper/Swiper";
import { babylonica } from "@/utils/fonts";

type HomePropTypes = {
  blogs: any[];
  photos: any[];
};
export default function Home({ blogs, photos }: HomePropTypes) {
  return (
    <div className="relative">
      <h1
        className={
          babylonica.className +
          " " +
          "absolute right-0 text-[100px] text-amber-400"
        }
      >
        Hilal Visits
      </h1>
      <section className="grid grid-cols-12 justify-items-center">
        <div className="col-span-9">
          <SwiperComponent />
        </div>
        <div className="col-span-3">3</div>
      </section>
    </div>
  );
}
