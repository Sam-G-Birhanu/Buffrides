import Features2 from "@/components/common/features/Features";
import Process from "@/components/common/process/Process";
import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import MobailHeader1 from "@/components/headers/MobailHeader1";
import Banner from "@/components/otherPages/about/Banner";
import Breadcumb from "@/components/otherPages/about/Breadcumb";
import Features from "@/components/otherPages/about/Features";

import MetaComponent from "@/components/common/MetaComponent";
const metadata = {
  title: "Buff Rides - Reliable Taxi Booking",
  description:
    "Effortlessly book rides with Buff Rides, offering reliable and comfortable taxi services tailored to your schedule. Travel to your destination with ease!",
};
export default function AboutPage1() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <Header1 /> <MobailHeader1 />
      <main className="main">
        <Breadcumb />
        <Banner />
        <Features />
        {/* <Facts /> */}
        <Features2 />
        <Process />
        {/* <Testimonials /> */}
        {/* <Partners /> */}
        {/* <Faq /> */}
        {/* <DownloadApp /> */}
      </main>
      <Footer1 />
    </>
  );
}
