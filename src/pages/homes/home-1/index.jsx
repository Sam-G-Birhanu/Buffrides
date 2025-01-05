import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import MobailHeader1 from "@/components/headers/MobailHeader1";

import Features from "@/components/common/features/Features";
import Process from "@/components/common/process/Process";
import Feet from "@/components/homes/home-1/Feet";
import Hero from "@/components/homes/home-1/Hero";

import MetaComponent from "@/components/common/MetaComponent";
const metadata = {
  title: "Buff Rides - Reliable Taxi Booking",
  description:
    "Effortlessly book rides with Buff Rides, offering reliable and comfortable taxi services tailored to your schedule. Travel to your destination with ease!",
};

export default function HomePage1() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <Header1 /> <MobailHeader1 />
      <MobailHeader1 />
      <main className="main">
        <Hero />
        {/* <Partners /> */}
        <Feet />
        <Process />
        <Features />
        {/* <Facts /> */}
        {/* <Service /> */}

        {/* <Cta /> */}
        {/* <Faq /> */}
      </main>
      <Footer1 />
    </>
  );
}
