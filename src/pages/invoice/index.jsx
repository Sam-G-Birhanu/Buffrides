import Invoice from "@/components/Invoice";

import MetaComponent from "@/components/common/MetaComponent";
const metadata = {
  title:
    "Invoice || Lixride Chauffeur Limousine Transport and Car Hire Reactjs Template",
  description:
    "Lixride Chauffeur Limousine Transport and Car Hire Reactjs Template",
};
export default function InvoicePage() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <main className="main">
        <Invoice />
      </main>
    </>
  );
}
