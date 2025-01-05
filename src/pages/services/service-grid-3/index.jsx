import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import MobailHeader1 from "@/components/headers/MobailHeader1";
import Breadcumb from "@/components/service/Breadcumb";
import Services3 from "@/components/service/Services3";

import MetaComponent from "@/components/common/MetaComponent";
const metadata = {
  title:
    "Service Grid 3 || Lixride Chauffeur Limousine Transport and Car Hire Reactjs Template",
  description:
    "Lixride Chauffeur Limousine Transport and Car Hire Reactjs Template",
};

export default function ServiceGridPage3() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <Header1 /> <MobailHeader1 />
      <main className="main">
        <Breadcumb />
        <Services3 />
      </main>
      <Footer1 />
    </>
  );
}
