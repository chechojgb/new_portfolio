import React from "react";

export default function TechStack() {
  return (
    <section
      id="tech-stack"
      className="relative bg-[#020617] py-20 px-6 sm:px-8 text-white overflow-hidden"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 items-center gap-16 relative z-10">
        {/* Fondos decorativos */}
        <div className="absolute hidden lg:block top-20 right-40 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute hidden lg:block top-40 -right-20 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl"></div>

        {/* Texto descriptivo */}
        <div className="space-y-6">
          <h2 className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text pb-4">
            Tecnologías que uso
          </h2>
          <p className="text-lg text-gray-300 leading-relaxed">
            A lo largo de mi trayectoria he elegido herramientas que me permiten
            desarrollar productos{" "}
            <span className="text-emerald-400 font-semibold">eficientes</span>,{" "}
            <span className="text-amber-400 font-semibold">mantenibles</span> y{" "}
            <span className="text-pink-400 font-semibold">escalables</span>.
          </p>
          <p className="text-lg text-gray-400">
            Desde frameworks modernos hasta entornos de automatización, cada
            tecnología ha sido elegida por su solidez, comunidad y versatilidad.
          </p>
        </div>

        {/* Logos flotando */}
        <div className="relative w-full h-[500px] sm:h-[400px]">
          <img
            src="/images/logos/laravel.svg"
            alt="Laravel"
            className="absolute top-16 sm:top-20 left-1/2 transform -translate-x-1/2 grayscale transition h-14 animate-glow"
            style={{ animationDelay: "0s" }}
          />
          <img
            src="/images/logos/tailwind.png"
            alt="Tailwind"
            className="absolute top-36 sm:top-28 left-10 sm:left-16 grayscale transition h-12 animate-glow"
            style={{ animationDelay: "2s" }}
          />
          <img
            src="/images/logos/react.png"
            alt="React.js"
            className="absolute top-56 sm:top-40 left-1/3 grayscale transition h-12 animate-glow"
            style={{ animationDelay: "3s" }}
          />
          <img
            src="/images/logos/python.svg"
            alt="Python"
            className="absolute top-28 sm:top-28 right-16 sm:right-20 grayscale transition h-12 animate-glow"
            style={{ animationDelay: "4s" }}
          />
          <img
            src="/images/logos/git.svg"
            alt="Git"
            className="absolute top-76 sm:top-50 right-24 sm:right-28 grayscale transition h-12 animate-glow"
            style={{ animationDelay: "5s" }}
          />
          <img
            src="/images/linux.png"
            alt="Linux"
            className="absolute bottom-4 sm:top-60 left-1/2 transform -translate-x-1/2 grayscale transition h-14 animate-glow"
            style={{ animationDelay: "6s" }}
          />
        </div>
      </div>

      {/* Flecha inferior */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce flex flex-col items-center gap-2">
        <span className="text-gray-400 text-sm flex items-center gap-2">
          <i className="fas fa-mouse text-blue-400"></i> Mis proyectos
        </span>
        <i className="fas fa-chevron-down text-blue-400 text-xl"></i>
      </div>

    </section>
  );
}
