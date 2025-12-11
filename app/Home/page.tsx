import Hero from "../components/Hero"


import OurServices from "../components/Services";
import AboutSection from "../components/AboutUs";
import TestimonialSection from "../components/Testimonial";
import FAQ from "../components/FAQ";
import Partners from "../components/Partners";
import Works from "../components/Works";



function Homepage() {
  return (
    <div>
<Hero />    
<AboutSection/>
<OurServices/>
<Works/>
<TestimonialSection/>
<FAQ/>
<Partners/>
    </div>
  )
}

export default Homepage