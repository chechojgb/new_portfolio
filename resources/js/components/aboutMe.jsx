import React, { useState, useRef, useEffect } from "react";

export default function AboutMe() {
  const [activeCard, setActiveCard] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="sobre-mi"
      ref={sectionRef}
      className="relative bg-[#020617] text-white py-28 px-6 lg:px-8 overflow-hidden z-20"
    >
      {/* Fondo con blurs decorativos (sin estrellas) */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute hidden lg:block -top-20 -left-20 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse-slow"></div>
        <div
          className="absolute hidden lg:block top-40 -right-20 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl animate-pulse-slow"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute hidden lg:block bottom-20 left-1/3 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl animate-pulse-slow"
          style={{ animationDelay: "4s" }}
        ></div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[minmax(0,auto)_1fr] gap-20 items-center relative z-20">
        
        {/* Imagen con mejoras interactivas */}
        <div className="relative flex justify-center lg:justify-start sm:pl-6 md:px-12">
          <div className="relative group">
            <img
              src="/images/yo.jpeg"
              alt="Sergio Ortiz Garzon"
              className="w-60 h-60 rounded-full animate-float-slow drop-shadow-xl border-4 border-cyan-400/20 group-hover:border-cyan-400/40 transition-all duration-500 group-hover:scale-105 object-cover"
            />
            <div className="absolute -inset-4 bg-cyan-400/20 rounded-full blur-2xl animate-pulse -z-10 group-hover:bg-cyan-400/30 transition-all duration-500"></div>
            
            {/* Badges flotantes sutiles */}
            <div className="absolute -top-2 -right-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg animate-float">
              <i className="fas fa-code mr-1"></i>Dev
            </div>
            <div className="absolute -bottom-2 -left-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg animate-float" style={{animationDelay: '2s'}}>
              <i className="fas fa-rocket mr-1"></i>
            </div>
          </div>
        </div>

        {/* Texto descriptivo con mejoras */}
        <div className="relative space-y-6 pl-0 sm:pl-6 md:px-12 lg:pl-40">
          {/* Header con animación */}
          <div className={`space-y-2 ${isVisible ? 'animate-fadeInUp' : 'opacity-0'}`}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 mb-4">
              <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></div>
              <span className="text-gray-300 text-sm font-medium">Sobre Mí</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
              Sobre mí
            </h2>
          </div>

          {/* Textos con highlights interactivos */}
          <div className="space-y-6">
            <p className="text-lg text-gray-300 leading-relaxed hover:bg-white/5 p-4 rounded-xl transition-all duration-300">
              Soy <span className="text-cyan-300 font-semibold bg-cyan-400/10 px-2 py-1 rounded">Sergio Ortiz</span>
              , desarrollador fullstack con una profunda orientación a la creación
              de soluciones digitales eficientes, escalables y centradas en el
              usuario. Mi experiencia se ha enfocado principalmente en el
              ecosistema de{" "}
              <span className="text-red-400 font-semibold bg-red-400/10 px-2 py-1 rounded">Laravel</span>, donde
              he desarrollado desde APIs robustas hasta sistemas completos de
              gestión.
            </p>

            <p className="text-lg text-gray-300 leading-relaxed hover:bg-white/5 p-4 rounded-xl transition-all duration-300">
              Me apasiona <span className="text-green-400 font-semibold">automatizar procesos</span>, optimizar flujos de trabajo y
              conectar piezas clave de software para que las soluciones no solo
              funcionen bien, sino que sean sostenibles a largo plazo. He trabajado
              en proyectos que van desde paneles de administración personalizados
              hasta herramientas para centros de contacto, integrando diversas
              tecnologías modernas en el backend y frontend.
            </p>

            <p className="text-lg text-gray-300 leading-relaxed hover:bg-white/5 p-4 rounded-xl transition-all duration-300">
              En el desarrollo de interfaces y experiencias de usuario, aprovecho
              la flexibilidad de{" "}
              <span className="text-cyan-400 font-semibold bg-cyan-400/10 px-2 py-1 rounded">TailwindCSS</span>{" "}
              para construir diseños limpios y responsivos, y utilizo{" "}
              <span className="text-blue-400 font-semibold bg-blue-400/10 px-2 py-1 rounded">React</span> para
              añadir interactividad dinámica y componentes reutilizables,
              manteniendo el enfoque en rendimiento y escalabilidad.
            </p>
          </div>

          {/* Mini tarjetas tipo glass mejoradas */}
          <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 ${isVisible ? 'animate-fadeInUp' : 'opacity-0'}`} style={{animationDelay: '0.6s'}}>
            <div 
              className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-cyan-400/10 hover:scale-[1.02] transition-all duration-300 shadow-lg hover:shadow-cyan-500/10 group cursor-pointer"
              onMouseEnter={() => setActiveCard("que-hago")}
              onMouseLeave={() => setActiveCard(null)}
            >
              <h3 className="text-cyan-400 font-bold mb-3 flex items-center gap-2 group-hover:text-cyan-300 transition-colors">
                <i className="fas fa-code group-hover:animate-bounce"></i>
                ¿Qué hago?
              </h3>
              <ul className="text-sm text-gray-300 space-y-2">
                <li className="flex items-center gap-2 hover:text-white transition-colors">
                  <i className="fas fa-check text-green-400 text-xs"></i>
                  Backends sólidos en Laravel
                </li>
                <li className="flex items-center gap-2 hover:text-white transition-colors">
                  <i className="fas fa-check text-green-400 text-xs"></i>
                  Automatización de procesos
                </li>
                <li className="flex items-center gap-2 hover:text-white transition-colors">
                  <i className="fas fa-check text-green-400 text-xs"></i>
                  Dashboards interactivos
                </li>
                <li className="flex items-center gap-2 hover:text-white transition-colors">
                  <i className="fas fa-check text-green-400 text-xs"></i>
                  Automatizaciones inteligentes
                </li>
              </ul>
            </div>

            <div 
              className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-indigo-400/10 hover:scale-[1.02] transition-all duration-300 shadow-lg hover:shadow-indigo-500/10 group cursor-pointer"
              onMouseEnter={() => setActiveCard("como-hago")}
              onMouseLeave={() => setActiveCard(null)}
            >
              <h3 className="text-indigo-400 font-bold mb-3 flex items-center gap-2 group-hover:text-indigo-300 transition-colors">
                <i className="fas fa-cogs group-hover:animate-spin"></i>
                ¿Cómo lo hago?
              </h3>
              <ul className="text-sm text-gray-300 space-y-2">
                <li className="flex items-center gap-2 hover:text-white transition-colors">
                  <i className="fas fa-star text-yellow-400 text-xs"></i>
                  React, TailwindCSS, Git
                </li>
                <li className="flex items-center gap-2 hover:text-white transition-colors">
                  <i className="fas fa-star text-yellow-400 text-xs"></i>
                  Buenas prácticas y CI/CD
                </li>
                <li className="flex items-center gap-2 hover:text-white transition-colors">
                  <i className="fas fa-star text-yellow-400 text-xs"></i>
                  Escuchando al usuario final
                </li>
                <li className="flex items-center gap-2 hover:text-white transition-colors">
                  <i className="fas fa-star text-yellow-400 text-xs"></i>
                  Optimizando cada capa del sistema
                </li>
              </ul>
            </div>
          </div>

          {/* CTA sutil (comentado) */}
          {/* <div className={`flex gap-4 pt-6 ${isVisible ? 'animate-fadeInUp' : 'opacity-0'}`} style={{animationDelay: '0.9s'}}>
            <a
              href="#proyectos"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-cyan-500/10 border border-cyan-400/20 text-cyan-400 hover:bg-cyan-500/20 hover:border-cyan-400/30 hover:scale-105 transition-all duration-300 font-medium"
            >
              <i className="fas fa-rocket"></i>
              Ver mis proyectos
            </a>
            <a
              href="#contacto"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10 hover:text-white hover:scale-105 transition-all duration-300 font-medium"
            >
              <i className="fas fa-paper-plane"></i>
              Contactarme
            </a>
          </div> */}
        </div>
      </div>

      {/* Flecha inferior mejorada */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 animate-bounce flex flex-col items-center gap-2">
        <div className="w-6 h-10 border-2 border-cyan-400 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-cyan-400 rounded-full mt-2 animate-pulse"></div>
        </div>
        <span className="text-gray-400 text-sm">Skills</span>
      </div>
    </section>
  );
}