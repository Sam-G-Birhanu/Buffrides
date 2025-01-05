import DownloadApp from "@/components/common/downloadApp/DownloadApp2";
import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import MobailHeader1 from "@/components/headers/MobailHeader1";
import BreadCumbs from "@/components/otherPages/team/BreadCumbs";
import TeamMambers from "@/components/otherPages/team/TeamMambers";

import MetaComponent from "@/components/common/MetaComponent";
const metadata = {
  title:
    "Our Team || Lixride Chauffeur Limousine Transport and Car Hire Reactjs Template",
  description:
    "Lixride Chauffeur Limousine Transport and Car Hire Reactjs Template",
};

export default function OurTeamPage() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <Header1 /> <MobailHeader1 />
      <main className="main">
        <BreadCumbs />
        <TeamMambers />
        <DownloadApp />
      </main>
      <Footer1 />
    </>
  );
}
