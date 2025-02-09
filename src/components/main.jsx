/*
/* global particlesJS *
import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import Loading from "./Loading";
//import logoWhite from "../assets/logo_white.jpg";
import Typed from "typed.js";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());
  const typingTextRef = useRef(null);

  // Update loading state
  useEffect(() => {
    setTimeout(() => setLoading(false), 2000);
  }, []);

  // Update the current time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Initialize typed.js effect once loading is false
  useEffect(() => {
    if (!loading && typingTextRef.current) {
      const typed = new Typed(typingTextRef.current, {
        strings: [
          "Organic Cotton Essentials 🌱",
          "Eco-Friendly Materials ♻️",
          "Hypoallergenic Fabrics",
          "Ethical Manufacturing Practices",
          "Seasonal Collections",
          "Parent-Approved Designs 👪",
          "Easy-Care Clothing",
          "Size-Inclusive Options",
          "Play-Ready Outfits 🧸",
          "Developmental Appropriate Styles",
          "Gender-Neutral Collections"
        ],
        loop: true,
        typeSpeed: 50,
        backSpeed: 30,
        backDelay: 1000,
      });
      return () => typed.destroy();
    }
  }, [loading]);

  // Inject Tawk.to Script (do not delete the commented out code below)
  // <!--Start of Tawk.to Script-->
  // <script type="text/javascript">
  //   var Tawk_API = Tawk_API || {}, Tawk_LoadStart = new Date();
  //   (function () {
  //     var s1 = document.createElement("script"), s0 = document.getElementsByTagName("script")[0];
  //     s1.async = true;
  //     s1.src = 'https://embed.tawk.to/671b6bef2480f5b4f593ad9d/1ib1hr8va';
  //     s1.charset = 'UTF-8';
  //     s1.setAttribute('crossorigin', '*');
  //     s0.parentNode.insertBefore(s1, s0);
  //   })();
  // </script>
  // <!--End of Tawk.to Script-->
  useEffect(() => {
    // Use the global window object for Tawk_API and Tawk_LoadStart
    window.Tawk_API = window.Tawk_API || {};
    window.Tawk_LoadStart = new Date();
    (function () {
      var s1 = document.createElement("script");
      var s0 = document.getElementsByTagName("script")[0];
      s1.async = true;
      s1.src = "https://embed.tawk.to/671b6bef2480f5b4f593ad9d/1ib1hr8va";
      s1.charset = "UTF-8";
      s1.setAttribute("crossorigin", "*");
      s0.parentNode.insertBefore(s1, s0);
    })();
  }, []);

  // Initialize particlesJS
  useEffect(() => {
    /* --------------------------------------------------------
       Customized Particle Animation for Professional Web Page
       -------------------------------------------------------- */

    /*
       This script sets up a customized particle animation on the
       'particles-js' element. You can modify the appearance and
       behavior of the particles by adjusting the values in the
       configuration object below.
    */

    /* 
       particlesJS function initializes the particle effect directly
       without the need for an external JSON file.
    */
   /*
    if (window.particlesJS) {
      particlesJS("particles-js", {
        "particles": {
          "number": {
            "value": 60,
            "density": {
              "enable": true,
              "value_area": 1000
            }
          },
          "color": {
            "value": "#2e86de"
          },
          "shape": {
            "type": "triangle",
            "stroke": {
              "width": 0,
              "color": "#ffffff"
            },
            "polygon": {
              "nb_sides": 3
            },
            "image": {
              "src": "img/github.svg",
              "width": 100,
              "height": 100
            }
          },
          "opacity": {
            "value": 0.6,
            "random": false,
            "anim": {
              "enable": false,
              "speed": 1,
              "opacity_min": 0.3,
              "sync": false
            }
          },
          "size": {
            "value": 7,
            "random": true,
            "anim": {
              "enable": true,
              "speed": 10,
              "size_min": 0.5,
              "sync": false
            }
          },
          "line_linked": {
            "enable": true,
            "distance": 180,
            "color": "#2e86de",
            "opacity": 0.6,
            "width": 1
          },
          "move": {
            "enable": true,
            "speed": 4,
            "direction": "none",
            "random": true,
            "straight": false,
            "out_mode": "out",
            "attract": {
              "enable": false,
              "rotateX": 800,
              "rotateY": 1600
            }
          }
        },
        "interactivity": {
          "detect_on": "canvas",
          "events": {
            "onhover": {
              "enable": true,
              "mode": "bubble"
            },
            "onclick": {
              "enable": true,
              "mode": "push"
            },
            "resize": true
          },
          "modes": {
            "grab": {
              "distance": 400,
              "line_linked": {
                "opacity": 0.8
              }
            },
            "bubble": {
              "distance": 200,
              "size": 10,
              "duration": 2,
              "opacity": 1,
              "speed": 3
            },
            "repulse": {
              "distance": 100
            },
            "push": {
              "particles_nb": 5
            },
            "remove": {
              "particles_nb": 2
            }
          }
        },
        "retina_detect": true,
        "config_demo": {
          "hide_card": true,
          "background_color": "#f8f9fa",
          "background_image": "",
          "background_position": "50% 50%",
          "background_repeat": "no-repeat",
          "background_size": "cover"
        }
      });
    }
  }, []);

  // Get greeting based on the current hour
  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) {
      return "Rise & Shine ✨";
    } else if (hour < 18) {
      return "Afternoon Glow ☀️";
    } else if (hour < 21) {
      return "Evening Elegance 🌙";
    } else {
      return "Night Time Bliss 🌌";
    }
  };

  // Format the time to a human-readable string
  const formattedTime = currentTime.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  return (
    <AnimatePresence>
      {loading ? (
        <Loading />
      ) : (
        <HeroContainer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/*The particles container for particle animation }
          <ParticlesContainer id="particles-js" />

          <HeroImage>
            {/*<ParallaxImage
              src={logoWhite}
              alt="Modern Fashion Collection"
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            />}
            <GradientOverlay />
          </HeroImage>

          <ContentWrapper>
            <TextGroup
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <GreetingText>{getGreeting()}</GreetingText>
              <TimeText>{formattedTime}</TimeText>
              <MainHeading>
                Curated Styles for <br />
                <Emphasis>Modern Littles</Emphasis>
              </MainHeading>
              {/* Render the typed.js text *}
              <TypingText ref={typingTextRef} className="typing-text" />
              {/*<SubText>
                Discover sustainable, organic-cotton essentials designed for
                play and growth. Shop our ethically crafted collection.
              </SubText>*}
              <subText></subText>
              <CtaButton
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Explore Collection
              </CtaButton>
            </TextGroup>
          </ContentWrapper>
        </HeroContainer>
      )}
    </AnimatePresence>
  );
};

// Styled Components

const HeroContainer = styled(motion.div)`
  position: relative;
  height: 100vh;
  overflow: hidden;
`;

const ParticlesContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 0;
`;

const HeroImage = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
`;

const ParallaxImage = styled(motion.img)`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 30%;
`;

const GradientOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    45deg,
    rgba(18, 18, 18, 0.6) 0%,
    rgba(18, 18, 18, 0.2) 100%
  );
  backdrop-filter: blur(2px);
  z-index: 2;
`;

const ContentWrapper = styled.div`
  position: relative;
  height: 100%;
  display: flex;
  align-items: center;
  padding: 0 8%;
  color: #fff;
  z-index: 3;
`;

const TextGroup = styled(motion.div)`
  max-width: 600px;
`;

const GreetingText = styled.p`
  font-size: 1.2rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 0.3rem;
  letter-spacing: 0.1em;
`;

const TimeText = styled.p`
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 1rem;
`;

const MainHeading = styled.h1`
  font-size: 3.5rem;
  font-weight: 700;
  line-height: 1.1;
  margin-bottom: 1.5rem;
  font-family: "Inter", sans-serif;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const Emphasis = styled.span`
  background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const TypingText = styled.span`
  font-size: 2.1rem;
  background: linear-gradient(45deg, #ff9a9e, #fad0c4, #fbc2eb, #a18cd1);
  background-size: 400% 400%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  display: block;
  margin-top: 0.5rem;
  animation: gradientAnimation 8s ease infinite;
`;

const SubText = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.85);
  margin-bottom: 2rem;
  max-width: 500px;
`;

const CtaButton = styled(motion.button)`
  background: linear-gradient(45deg, #ff6b6b 0%, #4ecdc4 100%);
  color: white;
  border: none;
  padding: 1rem 2rem;
  font-size: 1.1rem;
  border-radius: 50px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
  backdrop-filter: blur(4px);
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

export default Home;
*/

/* global particlesJS */
import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import Loading from "./Loading";
//import logoWhite from "../assets/logo_white.jpg";
import Typed from "typed.js";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());
  const typingTextRef = useRef(null);

  // Update loading state
  useEffect(() => {
    setTimeout(() => setLoading(false), 2000);
  }, []);

  // Update the current time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Initialize typed.js effect once loading is false
  useEffect(() => {
    if (!loading && typingTextRef.current) {
      const typed = new Typed(typingTextRef.current, {
        strings: [
          "Organic Cotton Essentials 🌱",
          "Eco-Friendly Materials ♻️",
          "Hypoallergenic Fabrics",
          "Ethical Manufacturing Practices",
          "Seasonal Collections",
          "Parent-Approved Designs 👪",
          "Easy-Care Clothing",
          "Size-Inclusive Options",
          "Play-Ready Outfits 🧸",
          "Developmental Appropriate Styles",
          "Gender-Neutral Collections"
        ],
        loop: true,
        typeSpeed: 50,
        backSpeed: 30,
        backDelay: 1000,
      });
      return () => typed.destroy();
    }
  }, [loading]);

  // Inject Tawk.to Script (do not delete the commented out code below)
  // <!--Start of Tawk.to Script-->
  // <script type="text/javascript">
  //   var Tawk_API = Tawk_API || {}, Tawk_LoadStart = new Date();
  //   (function () {
  //     var s1 = document.createElement("script"), s0 = document.getElementsByTagName("script")[0];
  //     s1.async = true;
  //     s1.src = 'https://embed.tawk.to/671b6bef2480f5b4f593ad9d/1ib1hr8va';
  //     s1.charset = 'UTF-8';
  //     s1.setAttribute('crossorigin', '*');
  //     s0.parentNode.insertBefore(s1, s0);
  //   })();
  // </script>
  // <!--End of Tawk.to Script-->
  useEffect(() => {
    window.Tawk_API = window.Tawk_API || {};
    window.Tawk_LoadStart = new Date();
    (function () {
      var s1 = document.createElement("script");
      var s0 = document.getElementsByTagName("script")[0];
      s1.async = true;
      s1.src = "https://embed.tawk.to/671b6bef2480f5b4f593ad9d/1ib1hr8va";
      s1.charset = "UTF-8";
      s1.setAttribute("crossorigin", "*");
      s0.parentNode.insertBefore(s1, s0);
    })();
  }, []);

  // Initialize particlesJS
  useEffect(() => {
    if (window.particlesJS) {
      particlesJS("particles-js", {
        "particles": {
          "number": {
            "value": 60,
            "density": {
              "enable": true,
              "value_area": 1000
            }
          },
          "color": {
            "value": "#2e86de"
          },
          "shape": {
            "type": "triangle",
            "stroke": {
              "width": 0,
              "color": "#ffffff"
            },
            "polygon": {
              "nb_sides": 3
            },
            "image": {
              "src": "img/github.svg",
              "width": 100,
              "height": 100
            }
          },
          "opacity": {
            "value": 0.6,
            "random": false,
            "anim": {
              "enable": false,
              "speed": 1,
              "opacity_min": 0.3,
              "sync": false
            }
          },
          "size": {
            "value": 7,
            "random": true,
            "anim": {
              "enable": true,
              "speed": 10,
              "size_min": 0.5,
              "sync": false
            }
          },
          "line_linked": {
            "enable": true,
            "distance": 180,
            "color": "#2e86de",
            "opacity": 0.6,
            "width": 1
          },
          "move": {
            "enable": true,
            "speed": 4,
            "direction": "none",
            "random": true,
            "straight": false,
            "out_mode": "out",
            "attract": {
              "enable": false,
              "rotateX": 800,
              "rotateY": 1600
            }
          }
        },
        "interactivity": {
          "detect_on": "canvas",
          "events": {
            "onhover": {
              "enable": true,
              "mode": "bubble"
            },
            "onclick": {
              "enable": true,
              "mode": "push"
            },
            "resize": true
          },
          "modes": {
            "grab": {
              "distance": 400,
              "line_linked": {
                "opacity": 0.8
              }
            },
            "bubble": {
              "distance": 200,
              "size": 10,
              "duration": 2,
              "opacity": 1,
              "speed": 3
            },
            "repulse": {
              "distance": 100
            },
            "push": {
              "particles_nb": 5
            },
            "remove": {
              "particles_nb": 2
            }
          }
        },
        "retina_detect": true,
        "config_demo": {
          "hide_card": true,
          "background_color": "#f8f9fa",
          "background_image": "",
          "background_position": "50% 50%",
          "background_repeat": "no-repeat",
          "background_size": "cover"
        }
      });
    }
  }, []);

  // Get greeting based on the current hour
  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) {
      return "Rise & Shine ✨";
    } else if (hour < 18) {
      return "Afternoon Glow ☀️";
    } else if (hour < 21) {
      return "Evening Elegance 🌙";
    } else {
      return "Night Time Bliss 🌌";
    }
  };

  // Format the time to a human-readable string
  const formattedTime = currentTime.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  return (
    <AnimatePresence>
      {loading ? (
        <Loading />
      ) : (
        <HeroContainer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Place the particles container at the top of the hero section */}
          <ParticlesContainer id="particles-js" />

          <HeroImage>
            {/* Optionally include an image with ParallaxImage */}
            {/*<ParallaxImage
              src={logoWhite}
              alt="Modern Fashion Collection"
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            />*/}
            <GradientOverlay />
          </HeroImage>

          <ContentWrapper>
            <TextGroup
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <GreetingText>{getGreeting()}</GreetingText>
              <TimeText>{formattedTime}</TimeText>
              <MainHeading>
                Curated Styles for <br />
                <Emphasis>Modern Littles</Emphasis>
              </MainHeading>
              {/* Render the typed.js text */}
              <TypingText ref={typingTextRef} className="typing-text" />
              {/*<SubText>
                Discover sustainable, organic-cotton essentials designed for
                play and growth. Shop our ethically crafted collection.
              </SubText>*/}
              <subText></subText>
              <CtaButton
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Explore Collection
              </CtaButton>
            </TextGroup>
          </ContentWrapper>
        </HeroContainer>
      )}
    </AnimatePresence>
  );
};

// Styled Components

const HeroContainer = styled(motion.div)`
  position: relative;
  height: 100vh;
  overflow: hidden;
  /* Ensure the hero section is on top */
  z-index: 10;
`;

const ParticlesContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  /* This container should be behind your content but inside the hero section */
  z-index: 0;
`;

const HeroImage = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
`;

const ParallaxImage = styled(motion.img)`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 30%;
`;

const GradientOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    45deg,
    rgba(18, 18, 18, 0.6) 0%,
    rgba(18, 18, 18, 0.2) 100%
  );
  backdrop-filter: blur(2px);
  z-index: 2;
`;

const ContentWrapper = styled.div`
  position: relative;
  height: 100%;
  display: flex;
  align-items: center;
  padding: 0 8%;
  color: #fff;
  z-index: 3;
`;

const TextGroup = styled(motion.div)`
  max-width: 600px;
`;

const GreetingText = styled.p`
  font-size: 1.2rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 0.3rem;
  letter-spacing: 0.1em;
`;

const TimeText = styled.p`
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 1rem;
`;

const MainHeading = styled.h1`
  font-size: 3.5rem;
  font-weight: 700;
  line-height: 1.1;
  margin-bottom: 1.5rem;
  font-family: "Inter", sans-serif;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const Emphasis = styled.span`
  background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const TypingText = styled.span`
  font-size: 2.1rem;
  background: linear-gradient(45deg, #ff9a9e, #fad0c4, #fbc2eb, #a18cd1);
  background-size: 400% 400%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  display: block;
  margin-top: 0.5rem;
  animation: gradientAnimation 8s ease infinite;
`;

const SubText = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.85);
  margin-bottom: 2rem;
  max-width: 500px;
`;

const CtaButton = styled(motion.button)`
  background: linear-gradient(45deg, #ff6b6b 0%, #4ecdc4 100%);
  color: white;
  border: none;
  padding: 1rem 2rem;
  font-size: 1.1rem;
  border-radius: 50px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
  backdrop-filter: blur(4px);
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

export default Home;
