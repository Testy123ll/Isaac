import { Hero } from '../components/Hero';
import { ServicesSection } from '../components/ServicesSection';
import { ProcessSection } from '../components/ProcessSection';
import { ProjectsSection } from '../components/ProjectsSection';
import { AboutSection } from '../components/AboutSection';
import { FAQSection } from '../components/FAQSection';
import { ContactSection } from '../components/ContactSection';

export const Home = () => {
  return (
    <div className="pt-0"> {/* PT-0 because Hero has Min-H-Screen and Centers */}
        <Hero />
        <ServicesSection />
        <ProcessSection />
        <ProjectsSection />
        <AboutSection />
        <FAQSection />
        <ContactSection />
    </div>
  );
};
