import React, { useState, useEffect, useRef } from "react";
import ProjectCard from "./projectCard";

const ProjectsSection = () => {
  const [preview, setPreview] = useState(null);
  const sectionRef = useRef(null);

  // Efecto de estrellas fugaces (mismo que Hero)
  useEffect(() => {
    const createShootingStar = () => {
      const star = document.createElement('div');
      star.className = 'shooting-star';
      
      const startFromLeft = Math.random() > 0.5;
      const startFromTop = Math.random() > 0.5;
      
      const startX = startFromLeft ? -5 : 105;
      const startY = startFromTop ? Math.random() * 40 : Math.random() * 40 + 60;
      
      const targetX = startFromLeft ? 110 : -10;
      const targetY = startY + (Math.random() * 30 - 15);
      
      const distanceX = targetX - startX;
      const distanceY = targetY - startY;
      const angle = Math.atan2(distanceY, distanceX) * (180 / Math.PI);
      
      star.style.setProperty('--startX', startX);
      star.style.setProperty('--startY', startY);
      star.style.setProperty('--distanceX', distanceX);
      star.style.setProperty('--distanceY', distanceY);
      star.style.setProperty('--angle', angle);
      star.style.animationDelay = `${Math.random() * 1}s`;
      star.style.animationDuration = `${1.5 + Math.random() * 1.5}s`;
      
      document.getElementById('projects-stars-container')?.appendChild(star);
      
      setTimeout(() => {
        star.remove();
      }, 4000);
    };

    // Crear estrellas estáticas
    const createStaticStars = () => {
      const starsContainer = document.getElementById('projects-stars-container');
      if (!starsContainer) return;

      const starSizes = ['small', 'medium', 'medium', 'large'];
      const shouldFloat = [true, false, true, false, true];
      
      for (let i = 0; i < 25; i++) {
        const star = document.createElement('div');
        const size = starSizes[Math.floor(Math.random() * starSizes.length)];
        const floating = shouldFloat[Math.floor(Math.random() * shouldFloat.length)];
        
        star.className = `static-star ${size} ${floating ? 'float' : ''}`;
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.animationDelay = `${Math.random() * 5}s`;
        star.style.animationDuration = `${3 + Math.random() * 4}s`;
        
        starsContainer.appendChild(star);
      }
    };

    const interval = setInterval(createShootingStar, 1200);
    createStaticStars();

    return () => {
      clearInterval(interval);
      const container = document.getElementById('projects-stars-container');
      if (container) {
        container.innerHTML = '';
      }
    };
  }, []);

  // Efecto de planeta rotando
  useEffect(() => {
    const createPlanet = () => {
      const planet = document.createElement('div');
      planet.className = 'floating-planet';
      
      planet.style.left = `${10 + Math.random() * 80}%`;
      planet.style.top = `${20 + Math.random() * 60}%`;
      planet.style.setProperty('--rotate-speed', `${20 + Math.random() * 40}s`);
      planet.style.setProperty('--float-speed', `${15 + Math.random() * 20}s`);
      planet.style.animationDelay = `${Math.random() * 10}s`;
      
      // Crear anillos para el planeta
      const rings = document.createElement('div');
      rings.className = 'planet-rings';
      rings.style.setProperty('--ring-speed', `${25 + Math.random() * 30}s`);
      
      planet.appendChild(rings);
      document.getElementById('space-elements')?.appendChild(planet);
    };

    // Efecto de nave espacial
    const createSpaceship = () => {
      const spaceship = document.createElement('div');
      spaceship.className = 'spaceship';
      
      const startX = -10;
      const startY = 15 + Math.random() * 70;
      const endX = 110;
      const endY = startY + (Math.random() * 20 - 10);
      
      spaceship.style.setProperty('--startX', startX);
      spaceship.style.setProperty('--startY', startY);
      spaceship.style.setProperty('--endX', endX);
      spaceship.style.setProperty('--endY', endY);
      spaceship.style.animationDelay = `${Math.random() * 15}s`;
      
      // Crear efecto de propulsión
      const thrust = document.createElement('div');
      thrust.className = 'spaceship-thrust';
      spaceship.appendChild(thrust);
      
      document.getElementById('space-elements')?.appendChild(spaceship);
      
      // Remover después de la animación
      setTimeout(() => {
        spaceship.remove();
      }, 20000);
    };

    // Crear 2-3 planetas
    for (let i = 0; i < 3; i++) {
      setTimeout(createPlanet, i * 5000);
    }

    // Crear naves periódicamente
    const spaceshipInterval = setInterval(createSpaceship, 15000);
    
    // Crear una nave inicial
    setTimeout(createSpaceship, 3000);

    return () => {
      clearInterval(spaceshipInterval);
      const container = document.getElementById('space-elements');
      if (container) {
        container.innerHTML = '';
      }
    };
  }, []);

  return (
    <section 
      id="proyectos" 
      ref={sectionRef}
      className="relative bg-[#020617] text-white py-24 px-6 sm:px-8 overflow-hidden"
    >
      {/* Efectos espaciales */}
      <div className="absolute inset-0 overflow-hidden">
        <div id="projects-stars-container" className="absolute inset-0"></div>
        <div id="space-elements" className="absolute inset-0"></div>
        
        {/* Blurs decorativos animados */}
        <div className="absolute hidden lg:block -top-20 -left-20 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute hidden lg:block top-40 -right-20 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl animate-pulse-slow" style={{animationDelay: '2s'}}></div>
        <div className="absolute hidden lg:block bottom-20 left-1/3 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl animate-pulse-slow" style={{animationDelay: '4s'}}></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 mb-4">
            <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></div>
            <span className="text-gray-300 text-sm font-medium">Portafolio</span>
          </div>
          
          <h2 className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text pb-4">
            Mis Proyectos
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Explorando nuevas galaxias del desarrollo
          </p>
        </div>

        <div className="flex flex-col gap-20">
          <ProjectCard
            pageTitle="Button Lovers"
            image="images/projects/ButtonLovers.png"
            himagelg="70"
            himagexl="auto"
            title="B&A (Empresa creadora de diseños de botones) "
            description="Sistema de gestión para una empresa de botones. Incluye control de inventario, CRUD de productos, seguimiento de movimientos, analisis de datos y un dashboard con estadísticas."
            tags={[
              { name: "Laravel", class: "bg-red-500/20 text-red-400 border border-red-400/30", icon: "images/logos/laravel.svg" },
              { name: "React", class: "bg-blue-500/20 text-blue-400 border border-blue-400/30", icon: "images/logos/react.png" },
              { name: "TailwindCSS", class: "bg-cyan-500/20 text-cyan-400 border border-cyan-400/30", icon: "images/logos/tailwind.png" },
            ]}
            github="https://github.com/chechojgb/AZZU"
            route='/dashboardBL'
          />

          <ProjectCard
            pageTitle="AZZU"
            image="images/projects/nexoAgents.png"
            himagelg="70"
            himagexl="70"
            title="NexoAgents - Control y monitoreo de agentes"
            description="Sistema integral de control y monitoreo de agentes, diseñado para optimizar operaciones de atención y gestión en tiempo real."
            tags={[
              { name: "Laravel", class: "bg-red-500/20 text-red-400 border border-red-400/30", icon: "images/logos/laravel.svg" },
              { name: "React", class: "bg-blue-500/20 text-blue-400 border border-blue-400/30", icon: "images/logos/react.png" },
              { name: "Tailwind CSS", class: "bg-cyan-500/20 text-cyan-400 border border-cyan-400/30", icon: "images/logos/tailwind.png" },
              { name: "Asterisk", class: "bg-cyan-500/20 text-cyan-400 border border-cyan-400/30", icon: "images/logos/asterisk.svg" },
            ]}
            github="https://github.com/chechojgb/FrontEstadoColas"
            preview={() => setPreview("azzu")}
            route='/dashboardAZZU'
          />
        </div>

        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-4 px-6 py-3 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
            <i className="fas fa-rocket text-cyan-400 text-xl"></i>
            <span className="text-gray-300">¿Listo para lanzar un proyecto?</span>
            <a 
              href="https://wa.me/573209925728?text=¡Hola%20Sergio!%20Vi%20tu%20portafolio%20y%20me%20encantó%20tu%20trabajo.%20¿Podemos%20conversar%20sobre%20un%20proyecto?"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg text-white font-medium hover:scale-105 transition-transform flex items-center gap-2"
            >
              <i className="fab fa-whatsapp"></i>
              Hablemos
            </a>
          </div>
        </div>
      </div>

      {/* <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce flex flex-col items-center gap-2">
        <div className="w-6 h-10 border-2 border-cyan-400 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-cyan-400 rounded-full mt-2 animate-pulse"></div>
        </div>
        <span className="text-gray-400 text-sm">Contacto</span>
      </div> */}


    </section>
  );
};

export default ProjectsSection;