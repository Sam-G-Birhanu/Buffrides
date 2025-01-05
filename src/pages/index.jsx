import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import MobailHeader1 from "@/components/headers/MobailHeader1";
import Blogs from "@/components/homes/common/blogs/Blogs2";
import Cta from "@/components/homes/common/cta/Cta";

import Facts from "@/components/common/facts/Facts";
import Faq from "@/components/homes/home-1/Faq";
import Features from "@/components/common/features/Features";
import Feet from "@/components/homes/home-1/Feet";
import Hero from "@/components/homes/home-1/Hero";
import Partners from "@/components/common/partners/Partners";
import Process from "@/components/common/process/Process";
import Service from "@/components/homes/home-1/Service";
import Testimonials from "@/components/common/testimonials/Testimonials2";
import DownloadApp from "@/components/common/downloadApp/DownloadApp";

import MetaComponent from "@/components/common/MetaComponent";
const metadata = {
  title: "Buff Rides - Reliable Taxi Booking",
  description:
    "Effortlessly book rides with Buff Rides, offering reliable and comfortable taxi services tailored to your schedule. Travel to your destination with ease!",
};
export default function Home() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <Header1 /> <MobailHeader1 />
      <main className="main">
        <Hero />
        {/* <Partners /> */}
        <Feet />
        <Process />
        <Features />
        {/* <Facts /> */}
        <Service />
        <Testimonials />
        {/* <Cta /> */}
        {/* <Blogs /> */}
        {/* <Faq />
        <DownloadApp /> */}
      </main>
      <Footer1 />
    </>
  );
}
