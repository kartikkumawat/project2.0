import React from "react";
import Header from "./Header";
import Features from "./Features";
import Services from "./Services";
import About from "./About";
import HowToCreatePaper from "./HowToCreatePaper";
import FAQ from "./FAQ";
import Contact from "./contact";
import Menu from "./menu";
import "./css/home.css";
function Home() {
  return (
    <>
      <Menu />
      <Header />
      <Features />
      <Services />
      <HowToCreatePaper />
      <About />
      <FAQ />
    </>
  );
}
export default Home;
