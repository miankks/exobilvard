import React, { useEffect, useRef } from "react";
import "./AboutUs.css";

const services = [
  {
    title: "Bilservice & underhåll",
    description:
      "Regelbundna servicekontroller, oljebyten och genomgång av bilens vitala delar. Vi följer alltid tillverkarens rekommendationer.",
  },
  {
    title: "Reparationer",
    description:
      "Vi utför allt från mindre åtgärder till större reparationer av motor, koppling, växellåda, styrning, underrede och mycket mer.",
  },
  {
    title: "Däck & Hjul",
    description:
      "Däckservice, hjulbyte, balansering och rådgivning kring rätt däck för din bil och körstil.",
  },
  {
    title: "Bilvård",
    description:
      "Professionell rekond, polering, rengöring och skyddsbehandlingar som får din bil att se ut och kännas som ny.",
  },
];

const expertise = [
  "Avgaser",
  "Batterier",
  "Bromsar",
  "Kamrem & kamkedja",
  "Stötdämpare & fjädring",
  "Motorarbete",
  "Tillbehör & extrautrustning",
];

const AboutUs = () => {
  const sectionsRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate");
          }
        });
      },
      { threshold: 0.2 }
    );

    sectionsRef.current.forEach((el) => el && observer.observe(el));
  }, []);

  return (
    <div className="about-container">
      <section className="intro" ref={(el) => (sectionsRef.current[0] = el)}>
        <h1>Om EXO Bilvårdscenter</h1>
        <p>
          Sedan 2020 har vi servat och reparerat bilar med kvalitet och omtanke.
          EXO Bilvårdscenter startades 2020 och har sedan dess utvecklats till en
          uppskattad bilverkstad med fokus på noggrannhet, tydlig kommunikation
          och kundens trygghet.
        </p>
        <h2>Vår vision</h2>
        <p>
          Att vara den självklara bilverkstaden i området genom att erbjuda hög
          kvalitet, rätt pris och ett personligt bemötande.
        </p>
      </section>

      <section className="services" ref={(el) => (sectionsRef.current[1] = el)}>
        <h2>Våra tjänster</h2>
        <div className="services-grid">
          {services.map((service, index) => (
            <div key={index} className="service-card">
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="expertise" ref={(el) => (sectionsRef.current[2] = el)}>
        <h2>Expertis inom:</h2>
        <ul>
          {expertise.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
        <p>Behöver du något annat? Vi löser det mesta – fråga oss gärna!</p>
      </section>
    </div>
  );
};

export default AboutUs;
