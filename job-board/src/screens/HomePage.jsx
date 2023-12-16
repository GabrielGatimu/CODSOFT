import Hero from "../components/home/Hero.jsx";
import HowItWorks from "../components/home/HowItWorks.jsx";

export default function HomePage() {
    return (
        <section className="h-full font-normal">
            <Hero/>
            <HowItWorks/>
        </section>
    );
}

