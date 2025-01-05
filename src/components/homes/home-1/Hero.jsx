const banners = [
  {
    id: 1,
    url: "https://images.pexels.com/photos/4606338/pexels-photo-4606338.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    title: "Embark on an Unforgettable Journey",
    text: "Discover the World with Our Expert Guides",
  },
  {
    id: 2,
    url: "https://images.pexels.com/photos/4606336/pexels-photo-4606336.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    title: "Adventure Awaits",
    text: "Find Your Perfect Escape",
  },
  {
    id: 3,
    url: "https://images.pexels.com/photos/3783112/pexels-photo-3783112.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    title: "Luxury Redefined",
    text: "Travel in Style and Comfort",
  },
];

import SearchRide from "@/components/search-ride/search-ride";
import { bookingErr } from "@/store/features/booking";
import { useSelector } from "react-redux";

import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function Hero() {
  const bookingError = useSelector(bookingErr);
  const settings = {
    slidesPerView: 1,
    loop: true,
    navigation: {
      nextEl: ".snbn2",
      prevEl: ".snbp2",
    },
    modules: [Navigation, Autoplay, Pagination],
    pagination: {
      el: ".sph1",
      clickable: true,
      type: "fraction",
    },
    autoplay: {
      delay: 10000,
    },
  };

  return (
    <section className="section banner-home1">
      <div className="box-swiper">
        <Swiper
          style={{ maxWidth: "100vw", overflow: "hidden" }}
          {...settings}
          className="swiper-container swiper-banner-1 pb-0"
        >
          {banners.map((elm, i) => (
            <SwiperSlide key={i} className="swiper-slide">
              <div
                className="box-cover-image boxBgImage"
                style={{
                  backgroundImage: `url(${elm.url})`,
                }}
              ></div>
              <div className="box-banner-info">
                <p className="text-16 color-white wow fadeInUp">{elm.title}</p>
                <h2 className="heading-52-medium color-white wow fadeInUp">
                  {elm.text.split(" ").slice(0, 2).join(" ")}{" "}
                  <br className="d-none d-lg-block" />
                  {elm.text.split(" ").slice(2).join(" ")}
                </h2>
              </div>
            </SwiperSlide>
          ))}

          <div className="box-pagination-button hero1nagigation">
            <div className="swiper-button-prev swiper-button-prev-banner snbp2"></div>
            <div className="swiper-button-next swiper-button-next-banner snbn2"></div>
            <div className="swiper-pagination swiper-pagination-banner sph1"></div>
          </div>
        </Swiper>
      </div>
      {/* <div className="box-search-ride w-full bg-blue-300 flex items-center justify-between wow fadeInUp">
        <div className="search-item search-date">
          <div className="search-icon">
            <span className="item-icon icon-date"> </span>
          </div>
          <div className="search-inputs">
            <label className="text-14 color-grey">Date</label>
            <DatePickerComponent />
          </div>
        </div>
        <div className="search-item search-time">
          <div className="search-icon">
            <span className="item-icon icon-time"> </span>
          </div>
          <div className="search-inputs">
            <label className="text-14 color-grey">Time</label>
            <TimePickerComponent />
          </div>
        </div>
        <div className="search-item search-button">
          <Link to={"/booking-vehicle"} className="btn btn-search">
            <img src="/assets/imgs/template/icons/search.svg" alt="Buff Rides" />
            Search
          </Link>
        </div>
      </div> */}

      <div>
        <p className="p-3" style={{ color: "#FF4C4C" }}>
          {bookingError}
        </p>
      </div>
      <div>
        <SearchRide />
      </div>
    </section>
  );
}
