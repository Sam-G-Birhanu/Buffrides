import BookingTab from "@/components/booking/BookingTab";
import PassengerDetails from "@/components/booking/PassengerDetails";

import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import MobailHeader1 from "@/components/headers/MobailHeader1";

import MetaComponent from "@/components/common/MetaComponent";
const metadata = {
  title: "Buff Rides - Reliable Taxi Booking",
  description:
    "Effortlessly book rides with Buff Rides, offering reliable and comfortable taxi services tailored to your schedule. Travel to your destination with ease!",
};
export default function BookingPassengerPage() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <Header1 /> <MobailHeader1 />
      <main className="main">
        <section className="section">
          <div className="container-sub">
            <BookingTab />
            <PassengerDetails />
          </div>
        </section>
      </main>
      <Footer1 />
    </>
  );
}
