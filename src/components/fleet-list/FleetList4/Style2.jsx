import { cars } from "@/data/cars";

export default function Style2() {
  return (
    <>
      {" "}
      <div className="row mt-30 align-items-center">
        <div className="col-lg-6">
          <h2 className="heading-24-medium wow fadeInUp">List Style V2</h2>
        </div>
      </div>
      <div className="row mt-30">
        {cars.slice(0, 3).map((elm, i) => (
          <div key={i} className="col-lg-4 mb-30">
            <div className="cardFleet cardFleetStyle2 wow fadeInUp">
              <div className="cardInfo">
                <a href="#">
                  <h3 className="text-20-medium color-text mb-10">
                    {elm.title}
                  </h3>
                </a>
                <p className="text-14 color-text mb-30">{elm.description}</p>
              </div>
              <div className="cardImage mb-30">
                <a href="#">
                  <img src={elm.imgSrc} alt="Buff Rides" />
                </a>
              </div>
              <div className="cardInfoBottom">
                <div className="passenger">
                  <span className="icon-circle icon-passenger"></span>
                  <span className="text-14">
                    Passengers<span>{elm.passenger}</span>
                  </span>
                </div>
                <div className="luggage">
                  <span className="icon-circle icon-luggage"></span>
                  <span className="text-14">
                    Luggage<span>{elm.luggage}</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
