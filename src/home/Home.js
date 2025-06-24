
import React from 'react';
import Header from "./header/header";
import {OffersSection} from "./offers";
import {DownloadAppSection} from "./downloadsection";
import Testimonials from "./Testimonials";
import ContactUs from "./ContactUs";
import Footer from "./Footer";
import AboutUs from "./AboutUs";

const Home = () => {
  return (
      <fragment>
          <section className='header'>
              <Header/>
          </section>
         <section className="offers">
             <OffersSection/>
         </section>
          <section className="download">
              <DownloadAppSection/>
          </section>
          <section className="Testimonials">
              <Testimonials/>
          </section>
          <section className="about us" id="about">
              <AboutUs/>
          </section>
          <section className="contact" id="contact">
              <ContactUs/>
          </section>
          <section className="footer">
              <Footer/>
          </section>
      </fragment>

  );
};

export default Home;
