import React from "react";

const Home = () => {
  // Helper function to return a greeting based on the current hour.
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  return (
    <>
      <div className="hero border-1 pb-3">
        <div className="card bg-dark text-white border-0 mx-3">
          <img
            className="card-img img-fluid"
            src="./assets/main.png.jpg"
            alt="Seasonal Fashion"
            height={500}
          />
          <div className="card-img-overlay d-flex align-items-center">
            <div className="container">
              <h5 className="card-title fs-1 text fw-lighter">
                {getGreeting()}, New Season Arrivals
              </h5>
              <p className="card-text fs-5 d-none d-sm-block">
                Discover our latest collection to refresh your style.
                Enjoy exclusive offers and updates, curated just for you.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
