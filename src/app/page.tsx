import About from "@/components/sections/About";
import Contact from "@/components/sections/Contact";
import Hero from "@/components/sections/Hero";
import PriceCalculator from "@/components/sections/PriceCalculator";
import Services from "@/components/sections/Services";

const Home = () => {
    return (
        <main>
            <Hero />
            <div className="h-px bg-gradient-to-r from-transparent via-[#222] to-transparent" />
            <Services />
            <div className="h-px bg-gradient-to-r from-transparent via-[#222] to-transparent" />
            <PriceCalculator />
            <div className="h-px bg-gradient-to-r from-transparent via-[#222] to-transparent" />
            <About />
            <div className="h-px bg-gradient-to-r from-transparent via-[#222] to-transparent" />
            <Contact />
        </main>
    )
};

export default Home;