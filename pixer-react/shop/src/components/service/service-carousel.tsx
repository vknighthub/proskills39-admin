import { ChevronLeft } from '@/components/icons/chevron-left';
import { ChevronRight } from '@/components/icons/chevron-right';
import Image from '@/components/ui/image';
import { Autoplay, Navigation, Pagination, Swiper, SwiperSlide } from '@/components/ui/slider';
import { Type } from '@/types';

const carouselBreakpoints = {
  1024: {
    slidesPerView: 2.2,
    spaceBetween: 24,
  },
};

export default function ServiceCarousel({ types }: { types: Type[] }) {
  return (
    <div className="relative border-b border-light-300 bg-light-100 pl-4 pt-5 dark:border-dark-300 dark:bg-dark-100 md:pt-6 ltr:md:pl-6 rtl:md:pr-6 ltr:lg:pl-7 rtl:lg:pr-7 ltr:3xl:pl-8 rtl:3xl:pr-8">
      <Swiper
        id="promoCarousel"
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        centeredSlides={true}
        speed={400}
        spaceBetween={30}
        slidesPerView={1.2}
        allowTouchMove={true}
        breakpoints={carouselBreakpoints}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
      >
        {types?.map(
          (type, index) =>
            type?.promotional_sliders?.original && (
              <SwiperSlide
                key={`promo-carousel-key-${index}`}
                className="relative mb-5 aspect-[37/16] w-full  bg-light-200 dark:bg-dark-250 2xl:mb-6"
              >
                <Image
                  layout="fill"
                  objectFit="cover"
                  alt={`promo-carousel-${index}`}
                  src={type?.promotional_sliders?.original}
                />
              </SwiperSlide>
            )
        )}
      </Swiper>
      <div className="absolute top-2/4 left-0 z-10 flex w-full items-center justify-between pl-1 pr-4 sm:pr-6 md:pl-2.5">
        <button className="prev flex h-8 w-8 -translate-y-1/2 transform cursor-pointer items-center justify-center rounded-full border border-light-400 bg-light text-dark-100 shadow-xl hover:bg-light-200 focus:outline-none rtl:rotate-180 dark:border-dark-400 dark:bg-dark-400 dark:text-white hover:dark:bg-dark-300 xl:h-9 xl:w-9">
          <ChevronLeft className="h-4 w-4 xl:h-[18px] xl:w-[18px]" />
        </button>
        <button className="next flex h-8 w-8 -translate-y-1/2 transform cursor-pointer items-center justify-center rounded-full border border-light-400 bg-light text-dark-100 shadow-xl hover:bg-light-200 focus:outline-none rtl:rotate-180 dark:border-dark-400 dark:bg-dark-400 dark:text-white hover:dark:bg-dark-300 xl:h-9 xl:w-9">
          <ChevronRight className="h-4 w-4 xl:h-[18px] xl:w-[18px]" />
        </button>
      </div>
    </div>
  );
}
