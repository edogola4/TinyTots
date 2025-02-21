import { Navbar, Main, Footer, Product } from "../components";

function Home() {
  return (
    <>
      <Navbar />
      <Main />
      {/* Render the Products component */}
      <Product />
      <Footer />
    </>
  );
}

export default Home;
