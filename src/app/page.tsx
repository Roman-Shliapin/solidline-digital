import About from "@/components/sections/About";
import Contact from "@/components/sections/Contact";
import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";

const Home = () => {
    return (
        <main>
            <Hero />
            <Services />
            <About />
            <Contact />
        </main>
    )
};

export default Home;