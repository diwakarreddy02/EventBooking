import Navbar from "../../components/Navbar/Navbar"
import Hero from "../../components/Hero";
import React from "react"; 
import Footer from "../../components/Footer";




function AboutUs () {
    return (
        <>
           <Navbar/>
           <Hero 
                cName="hero-mid"
                // heroImg={AboutImg}
                //heroImg="https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YmxhY2slMjB0ZXh0dXJlJTIwYmFja2dyb3VuZHxlbnwwfDB8MHx8&auto=format&fit=crop&w=500&q=60"        
                title="About Us"
                btnClass="hide"
            />
            <Footer />
        </>
    );
}


export default AboutUs;





