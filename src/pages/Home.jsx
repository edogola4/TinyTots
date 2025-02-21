import { Navbar, Main, Footer, Products } from "../components";

function Home() {
  return (
    <>
      <Navbar />
      <Main />
      {/* Render the Products component */}
      <Products />
      <Footer />
    </>
  );
}

export default Home;
