import React, { useState, useEffect, useRef } from "react";

export default function TechStack() {
  const [activeTech, setActiveTech] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);
  const sectionRef = useRef(null);
  const rotationInterval = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Rotación automática de tecnologías
  useEffect(() => {
    if (autoRotate && isVisible) {
      rotationInterval.current = setInterval(() => {
        setActiveTech(prev => {
          const currentIndex = technologies.findIndex(tech => tech.name === prev);
          const nextIndex = (currentIndex + 1) % technologies.length;
          return technologies[nextIndex].name;
        });
      }, 2000); // Cambia cada 2 segundos
    }

    return () => {
      if (rotationInterval.current) {
        clearInterval(rotationInterval.current);
      }
    };
  }, [autoRotate, isVisible]);

  const technologies = [
    {
      name: "Laravel",
      icon: "/images/logos/laravel.svg",
      color: "text-red-400",
      bgColor: "bg-red-500/10",
      borderColor: "border-red-400/30",
      description: "Framework PHP para desarrollo web elegante y robusto",
      category: "Backend"
    },
    {
      name: "React",
      icon: "/images/logos/react.png",
      color: "text-cyan-400",
      bgColor: "bg-cyan-500/10",
      borderColor: "border-cyan-400/30",
      description: "Library de JavaScript para interfaces de usuario",
      category: "Frontend"
    },
    {
      name: "TailwindCSS",
      icon: "/images/logos/tailwind.png",
      color: "text-teal-400",
      bgColor: "bg-teal-500/10",
      borderColor: "border-teal-400/30",
      description: "Framework CSS utility-first para diseño rápido",
      category: "Frontend"
    },
    {
      name: "Python",
      icon: "/images/logos/python.svg",
      color: "text-yellow-400",
      bgColor: "bg-yellow-500/10",
      borderColor: "border-yellow-400/30",
      description: "Lenguaje versátil para automatización y backend",
      category: "Backend"
    },
    {
      name: "Git",
      icon: "/images/logos/git.svg",
      color: "text-orange-400",
      bgColor: "bg-orange-500/10",
      borderColor: "border-orange-400/30",
      description: "Sistema de control de versiones distribuido",
      category: "Herramientas"
    },
    {
      name: "Linux",
      icon: "/images/linux.png",
      color: "text-yellow-300",
      bgColor: "bg-yellow-500/10",
      borderColor: "border-yellow-400/30",
      description: "Sistema operativo para servidores y desarrollo",
      category: "Sistemas"
    },
    {
      name: "Asterisk",
      icon: "/images/logos/asterisk.svg",
      color: "text-green-400",
      bgColor: "bg-green-500/10",
      borderColor: "border-green-400/30",
      description: "Plataforma de comunicaciones VoIP y PBX",
      category: "Telecom"
    },
    {
      name: "MySQL",
      icon: "/images/logos/mysql.png",
      color: "text-blue-400",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-400/30",
      description: "Sistema de gestión de bases de datos relacional",
      category: "Base de datos"
    }
  ];

  const handleTechHover = (techName) => {
    setAutoRotate(false);
    setActiveTech(techName);
  };

  const handleTechLeave = () => {
    setAutoRotate(true);
  };

  return (
    <section
      id="tech-stack"
      ref={sectionRef}
      className="relative bg-[#020617] py-28 px-6 sm:px-8 text-white overflow-hidden z-20"
    >
      {/* Fondo con efectos decorativos - Sin partículas de estrellas */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Blurs decorativos animados */}
        <div className="absolute hidden lg:block -top-20 -left-20 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute hidden lg:block top-40 -right-20 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl animate-pulse-slow" style={{animationDelay: '2s'}}></div>
        <div className="absolute hidden lg:block bottom-20 left-1/3 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl animate-pulse-slow" style={{animationDelay: '4s'}}></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-16">
          
          {/* Columna izquierda - Texto */}
          <div className={`space-y-8 ${isVisible ? 'animate-fadeInLeft' : 'opacity-0'}`}>
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-800/50 backdrop-blur-sm border border-gray-700/50">
                <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></div>
                <span className="text-gray-300 text-sm font-medium">Tech Stack</span>
              </div>
              
              <h2 className="text-4xl lg:text-5xl font-extrabold bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text">
                Tecnologías que uso
              </h2>
            </div>

            <div className="space-y-6">
              <p className="text-lg text-gray-300 leading-relaxed">
                A lo largo de mi trayectoria he elegido herramientas que me permiten
                desarrollar productos{" "}
                <span className="text-emerald-400 font-semibold">eficientes</span>,{" "}
                <span className="text-amber-400 font-semibold">mantenibles</span> y{" "}
                <span className="text-pink-400 font-semibold">escalables</span>.
              </p>

              <p className="text-lg text-gray-300 leading-relaxed">
                Cada tecnología en mi stack ha sido seleccionada por su{" "}
                <span className="text-cyan-400 font-semibold">solidez</span>,{" "}
                <span className="text-blue-400 font-semibold">comunidad activa</span> y{" "}
                <span className="text-green-400 font-semibold">versatilidad</span> para resolver problemas reales.
              </p>
            </div>

            {/* Info de tecnología activa */}
            {activeTech && (
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-cyan-400/20 mt-6 animate-fadeInUp">
                <div className="flex items-center gap-3 mb-3">
                  <img
                    src={technologies.find(t => t.name === activeTech)?.icon}
                    alt={activeTech}
                    className="h-8 w-8 grayscale-0"
                  />
                  <h3 className="text-xl font-bold text-cyan-400">{activeTech}</h3>
                  <span className="px-2 py-1 bg-cyan-500/20 text-cyan-400 text-xs rounded-full">
                    {technologies.find(t => t.name === activeTech)?.category}
                  </span>
                </div>
                <p className="text-gray-300 text-sm">
                  {technologies.find(t => t.name === activeTech)?.description}
                </p>
                <div className="flex items-center gap-2 mt-3 text-cyan-400 text-sm">
                  <i className="fas fa-sync-alt animate-spin"></i>
                  <span>Rotación automática {autoRotate ? 'activada' : 'pausada'}</span>
                </div>
              </div>
            )}
          </div>

          {/* Columna derecha - Tecnologías interactivas */}
          <div className={`space-y-6 ${isVisible ? 'animate-fadeInRight' : 'opacity-0'}`}>
            
            {/* Grid de tecnologías */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {technologies.map((tech, index) => (
                <div
                  key={tech.name}
                  className={`relative group p-4 rounded-xl backdrop-blur-sm border transition-all duration-500 cursor-pointer ${
                    tech.bgColor
                  } ${tech.borderColor} ${
                    activeTech === tech.name 
                      ? 'scale-105 ring-2 ring-cyan-400 bg-cyan-500/20' 
                      : 'hover:scale-105 hover:bg-white/5'
                  }`}
                  style={{ 
                    animationDelay: `${index * 0.1}s`,
                    animation: isVisible ? `techAppear 0.6s ease-out ${index * 0.1}s forwards` : 'none'
                  }}
                  onMouseEnter={() => handleTechHover(tech.name)}
                  onMouseLeave={handleTechLeave}
                  onClick={() => {
                    setAutoRotate(false);
                    setActiveTech(tech.name);
                  }}
                >
                  <div className="flex flex-col items-center space-y-3">
                    <div className="relative">
                      <img
                        src={tech.icon}
                        alt={tech.name}
                        className={`h-12 w-12 transition-all duration-300 ${
                          activeTech === tech.name 
                            ? 'grayscale-0 scale-110' 
                            : 'grayscale group-hover:grayscale-0 group-hover:scale-110'
                        }`}
                      />
                      {/* Indicador activo */}
                      <div className={`absolute -top-1 -right-1 w-3 h-3 rounded-full bg-green-400 ${
                        activeTech === tech.name ? 'animate-pulse' : 'opacity-0'
                      }`}></div>
                    </div>
                    
                    <span className={`text-sm font-medium text-center transition-colors ${
                      activeTech === tech.name ? tech.color : 'text-gray-300 group-hover:text-white'
                    }`}>
                      {tech.name}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Indicador de rotación */}
            <div className="text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10">
                <div className={`w-2 h-2 rounded-full ${autoRotate ? 'bg-green-400 animate-pulse' : 'bg-yellow-400'}`}></div>
                <span className="text-sm text-gray-400">
                  {autoRotate ? 'Rotando automáticamente' : 'Selección manual'}
                </span>
                <button
                  onClick={() => setAutoRotate(!autoRotate)}
                  className="text-cyan-400 hover:text-cyan-300 transition-colors"
                >
                  <i className={`fas ${autoRotate ? 'fa-pause' : 'fa-play'} text-xs`}></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Flecha inferior */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce flex flex-col items-center gap-2">
        <div className="w-6 h-10 border-2 border-cyan-400 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-cyan-400 rounded-full mt-2 animate-pulse"></div>
        </div>
        <span className="text-gray-400 text-sm">Mis proyectos</span>
      </div>
    </section>
  );
}