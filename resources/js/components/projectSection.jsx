import React, { useState, useEffect, useRef } from "react";
import ProjectCard from "./projectCard";

const ProjectsSection = () => {
  const [preview, setPreview] = useState(null);
  const sectionRef = useRef(null);

  return (
    <section 
      id="proyectos" 
      ref={sectionRef}
      className="relative bg-[#020617] text-white py-24 px-6 sm:px-8 overflow-hidden z-20"
    >
      {/* Fondo con efectos decorativos - Sin estrellas ni elementos espaciales */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Blurs decorativos animados */}
        <div className="absolute hidden lg:block -top-20 -left-20 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute hidden lg:block top-40 -right-20 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl animate-pulse-slow" style={{animationDelay: '2s'}}></div>
        <div className="absolute hidden lg:block bottom-20 left-1/3 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl animate-pulse-slow" style={{animationDelay: '4s'}}></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-30">
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

      {/* Flecha inferior (comentada) */}
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