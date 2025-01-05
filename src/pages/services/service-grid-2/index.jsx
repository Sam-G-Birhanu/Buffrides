import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import MobailHeader1 from "@/components/headers/MobailHeader1";
import Breadcumb from "@/components/service/Breadcumb";
import Services2 from "@/components/service/Services2";

import MetaComponent from "@/components/common/MetaComponent";
const metadata = {
  title:
    "Service Grid 2 || Lixride Chauffeur Limousine Transport and Car Hire Reactjs Template",
  description:
    "Lixride Chauffeur Limousine Transport and Car Hire Reactjs Template",
};

export default function ServiceGridPage2() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <Header1 /> <MobailHeader1 />
      <main className="main">
        <Breadcumb />
        <Services2 />
      </main>
      <Footer1 />
    </>
  );
}
