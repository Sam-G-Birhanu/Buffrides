import { useEffect } from "react";
import { Provider } from "react-redux";
import { Route, Routes, useLocation } from "react-router-dom";
import WOW from "wow.js";
import ScrollTopBehaviour from "./components/common/ScrollTopBehaviour";
import Home from "./pages";
import BookingExtraPage from "./pages/booking/booking-extra";
import BookingPassengerPage from "./pages/booking/booking-passenger";
import BookingPaymentPage from "./pages/booking/booking-payment";
import BookingRecevedPage from "./pages/booking/booking-receved";
import BookingVehiclePage from "./pages/booking/booking-vehicle";
import FleetListPage1 from "./pages/fleets/fleet-list";
import FleetSinglePage from "./pages/fleets/fleet-single";
import HomePage1 from "./pages/homes/home-1";
import InvoicePage from "./pages/invoice";
import PageNotFoundPage from "./pages/page-not-found";
import AboutPage1 from "./pages/pages/about";
import CommingSoonPage from "./pages/pages/coming-soon";
import ContactPage1 from "./pages/pages/contact";
import LoginPage from "./pages/pages/login";
import PricingPage from "./pages/pages/pricing";
import RegisterPage from "./pages/pages/register";
import ServiceGridPage1 from "./pages/services/service-grid";
import ServiceGridPage2 from "./pages/services/service-grid-2";
import ServiceGridPage3 from "./pages/services/service-grid-3";
import ServiceSinglePage from "./pages/services/service-single";
import { store } from "./store/store";
import "./styles/style.scss";
// import "../index.css"
function App() {
  const { pathname } = useLocation();
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Import the script only on the client side
      import("bootstrap/dist/js/bootstrap.esm").then(() => {
        // Module is imported, you can access any exported functionality if
      });
    }
  }, []);
  useEffect(() => {
    new WOW({
      live: false,
    }).init();
  }, [pathname]);
  return (
    <>
      <Provider store={store}>
        <Routes>
          <Route path="/">
            <Route index element={<Home />} />
            {/* <Route path="home-1" element={<HomePage1 />} /> */}

            <Route path="about" element={<AboutPage1 />} />

            <Route path="contact" element={<ContactPage1 />} />
            {/* <Route path="our-team" element={<OurTeamPage />} /> */}
            {/* <Route path="team-single/:id" element={<TeamSinglePage />} /> */}
            <Route path="register" element={<RegisterPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="pricing" element={<PricingPage />} />
            <Route path="coming-soon" element={<CommingSoonPage />} />
            <Route path="page-not-found" element={<PageNotFoundPage />} />
            <Route path="booking-vehicle" element={<BookingVehiclePage />} />
            <Route path="booking-extra" element={<BookingExtraPage />} />
            <Route
              path="booking-passenger"
              element={<BookingPassengerPage />}
            />
            <Route path="booking-payment" element={<BookingPaymentPage />} />
            <Route path="booking-receved" element={<BookingRecevedPage />} />
            <Route path="invoice" element={<InvoicePage />} />

            <Route path="fleet-list" element={<FleetListPage1 />} />

            <Route path="fleet-single/:id" element={<FleetSinglePage />} />

            <Route path="service-grid" element={<ServiceGridPage1 />} />
            <Route path="service-grid-2" element={<ServiceGridPage2 />} />
            <Route path="service-grid-3" element={<ServiceGridPage3 />} />
            <Route path="service-single/:id" element={<ServiceSinglePage />} />
            <Route path="*" element={<PageNotFoundPage />} />
          </Route>
        </Routes>
      </Provider>
      <ScrollTopBehaviour />
    </>
  );
}

export default App;
