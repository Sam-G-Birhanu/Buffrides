import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import MobailHeader1 from "@/components/headers/MobailHeader1";
import Breadcumb from "@/components/otherPages/pricing/Breadcumb";
import Pricing from "@/components/otherPages/pricing/Pricing";

import MetaComponent from "@/components/common/MetaComponent";
const metadata = {
  title:
    "Pricing || Lixride Chauffeur Limousine Transport and Car Hire Reactjs Template",
  description:
    "Lixride Chauffeur Limousine Transport and Car Hire Reactjs Template",
};
export default function PricingPage() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <Header1 /> <MobailHeader1 />
      <main className="main">
        <Breadcumb />
        <Pricing />
      </main>
      <Footer1 />
    </>
  );
}
