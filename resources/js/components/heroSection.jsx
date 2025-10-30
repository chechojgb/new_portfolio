import React, { useState, useEffect } from "react";

export default function HeroSection() {
  const [typedText, setTypedText] = useState('');
  const roles = [
    "Fullstack Developer",
    "Experto en Laravel", 
    "Especialista en React",
    "Resolvedor de problemas",
    "automatizaciones"
  ];
  const [currentRole, setCurrentRole] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  // 💬 Efecto de máquina de escribir
  useEffect(() => {
    const typeWriter = () => {
      const current = roles[currentRole];
      
      setTypedText(isDeleting 
        ? current.substring(0, typedText.length - 1)
        : current.substring(0, typedText.length + 1)
      );

      if (!isDeleting && typedText === current) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && typedText === '') {
        setIsDeleting(false);
        setCurrentRole((prev) => (prev + 1) % roles.length);
      }
    };

    const timer = setTimeout(typeWriter, isDeleting ? 50 : 100);
    return () => clearTimeout(timer);
  }, [typedText, isDeleting, currentRole]);

  return (
    <section className="hero min-h-screen flex items-center relative px-4 sm:px-6 lg:px-8 z-20 pb-10 bg-[#020617] overflow-hidden">
      
      {/* 🔵 Blurs decorativos animados (sin estrellas) */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute hidden lg:block -top-20 -left-20 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute hidden lg:block top-40 -right-20 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl animate-pulse-slow" style={{animationDelay: '2s'}}></div>
        <div className="absolute hidden lg:block bottom-20 left-1/3 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl animate-pulse-slow" style={{animationDelay: '4s'}}></div>
      </div>

      <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between py-12 lg:py-0 relative z-20">
        
        {/* 🧑‍💻 Columna izquierda (Texto principal) */}
        <div className="w-full lg:w-1/2 mb-12 lg:mb-0 relative">

          {/* Badge de bienvenida */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 mb-8 animate-fadeInDown hover:border-blue-400/50 transition-all duration-300 cursor-pointer group">
            <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse group-hover:bg-green-400 transition-colors"></div>
            <span className="text-gray-300 text-sm font-medium group-hover:text-white transition-colors">
              Bienvenido a mi portafolio
            </span>
          </div>

          {/* Título principal */}
          <h1 className="text-5xl lg:text-7xl font-bold leading-tight mb-8">
            <span className="text-gray-300 block mb-2">Hola,</span>
            <span className="text-cyan-400 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Soy Sergio Ortiz
            </span>
          </h1>

          {/* Rol con typing animation */}
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-gradient-to-r from-blue-500/10 to-teal-500/10 border border-blue-500/20 mb-8 backdrop-blur-sm hover:border-blue-400/50 transition-all duration-300 group">
            <i className="fas fa-terminal text-blue-400 animate-bounce"></i>
            <span className="text-xl text-blue-400 font-medium min-h-[28px]">
              {typedText}
              <span className="ml-1 animate-pulse">|</span>
            </span>
          </div>

          {/* Descripción */}
          <p className="text-lg text-gray-300/90 leading-relaxed mb-12 max-w-xl hover:text-white transition-colors duration-300">
            Especialista en <span className="text-amber-400 font-semibold">Laravel</span> y 
            automatización con <span className="text-green-400 font-semibold">Asterisk</span>. 
            Creo soluciones escalables y eficientes.
          </p>

          {/* Botones */}
          <div className="flex flex-col sm:flex-row gap-6 animate-fadeInUp">
            <a
              href="/Hoja_de_Vida_oct- Sergio Ortiz.pdf"
              download
              className="group relative inline-flex items-center justify-center gap-3 bg-gradient-to-r from-blue-500 to-teal-400 p-0.5 rounded-xl hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/25"
            >
              <span className="block w-full px-8 py-4 rounded-[11px] bg-gray-900 group-hover:bg-gradient-to-r group-hover:from-blue-500 group-hover:to-teal-400 transition-all duration-300">
                <span className="flex items-center gap-2 text-white font-medium">
                  <i className="fas fa-download group-hover:animate-bounce"></i>
                  <span>Descargar CV</span>
                  <i className="fas fa-arrow-right group-hover:translate-x-1 transition-transform"></i>
                </span>
              </span>
            </a>

            <a
              href="#proyectos"
              className="group relative inline-flex items-center justify-center gap-3 p-0.5 rounded-xl border border-gray-600 hover:border-cyan-400/50 hover:scale-105 transition-all duration-300"
            >
              <span className="block w-full px-8 py-4 rounded-[11px] bg-gray-900/50 backdrop-blur-sm">
                <span className="flex items-center gap-2 text-gray-300 group-hover:text-cyan-400 font-medium transition-colors">
                  <i className="fas fa-eye group-hover:animate-pulse"></i>
                  <span>Ver Proyectos</span>
                </span>
              </span>
            </a>
          </div>

          {/* Stats */}
          <div className="flex gap-8 mt-12 animate-fadeInUp" style={{animationDelay: '0.5s'}}>
            <div className="text-center group cursor-pointer">
              <div className="text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors">1+</div>
              <div className="text-sm text-gray-400 group-hover:text-gray-300">Años Exp</div>
            </div>
            <div className="text-center group cursor-pointer">
              <div className="text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors">100%</div>
              <div className="text-sm text-gray-400 group-hover:text-gray-300">Compromiso</div>
            </div>
          </div>
        </div>

        {/*  Columna derecha */}
        <div className="w-full lg:w-1/2 flex flex-col items-center justify-center gap-0 mt-12 lg:mt-20 z-40">
          <div className="relative w-full bg-[#091121] rounded-2xl shadow-2xl max-w-2xl hover:shadow-blue-500/10 hover:scale-105 transition-all duration-500 group ">
            
            {/* Header de ventana */}
            <div className="flex items-center justify-between bg-gray-800 px-5 py-3 rounded-t-2xl">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full hover:scale-110 transition-transform cursor-pointer"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full hover:scale-110 transition-transform cursor-pointer"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full hover:scale-110 transition-transform cursor-pointer"></div>
              </div>
              <span className="text-sm text-gray-400 flex items-center gap-2">
                <i className="fas fa-code text-blue-400"></i> 
                <span className="group-hover:text-blue-400 transition-colors">sergio_ortiz.js</span>
              </span>
              <div className="w-12"></div>
            </div>
            
            {/* Código simulado */}
            <pre className="p-8 md:p-10 text-green-400 text-[1rem] md:text-lg leading-relaxed whitespace-pre-wrap font-mono">
{`const developer = {
  name: "Sergio Ortiz",
  role: "Fullstack Developer",
  stack: {
    backend: ["Laravel", "PHP", "Python"],
    frontend: ["React", "Alpine.js", "Tailwind"],
    tools: ["Asterisk", "Git", "Linux"]
  },
  passion: "Transformar ideas en código",
  contact: "¡Hablemos! 👇"
};`}
            </pre>

            {/* 🐧 Pingüino */}
            <div className="absolute -bottom-12 -right-4 z-50 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500">
              <img
                src="/images/linux.png"
                alt="Linux Penguin"
                className="h-36 md:h-40 lg:h-48 animate-float-slow drop-shadow-2xl"
              />
              <div className="absolute -top-16 -left-20 bg-white text-gray-800 px-4 py-2 rounded-2xl rounded-bl-none text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                ¡Hola! 👋
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 animate-bounce flex flex-col items-center gap-2">
        <div className="w-6 h-10 border-2 border-blue-400 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-blue-400 rounded-full mt-2 animate-pulse"></div>
        </div>
        <span className="text-gray-400 text-sm">Sobre mi</span>
      </div>
    </section>
  );
}