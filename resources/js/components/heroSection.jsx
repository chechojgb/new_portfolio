import React from "react";

export default function HeroSection() {
  return (
    <section className="hero min-h-screen flex items-center relative px-4 sm:px-6 lg:px-8 z-10 pb-10">
      <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between py-12 lg:py-0">
        
        {/* Columna izquierda (Texto) */}
        <div className="w-full lg:w-1/2 mb-12 lg:mb-0 relative">
          {/* Blurs decorativos */}
          <div className="absolute hidden lg:block -top-20 -left-20 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
          <div className="absolute hidden lg:block top-40 -right-20 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl"></div>

          {/* Badge de bienvenida */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 mb-8 animate-fadeInDown">
            <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></div>
            <span className="text-gray-300 text-sm font-medium">
              Bienvenido a mi portafolio
            </span>
          </div>

          {/* Título principal */}
          <h1 className="text-5xl lg:text-7xl font-bold leading-tight mb-8">
            <span className="text-gray-300">Hola,</span>
            <br />
            <span className="text-cyan-400">Soy Sergio Ortiz</span>
          </h1>

          {/* Rol animado */}
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-gradient-to-r from-blue-500/10 to-teal-500/10 border border-blue-500/20 mb-8 backdrop-blur-sm">
            <i className="fas fa-rocket text-blue-400 animate-bounce"></i>
            <span className="text-xl text-blue-400 font-medium">
              Fullstack Developer | Laravel | Asterisk
            </span>
          </div>

          {/* Descripción */}
          <p className="text-lg text-gray-300/90 leading-relaxed mb-12 max-w-xl">
            Amante de Laravel | Automatización Asterisk | Construyendo soluciones
            de software eficientes
          </p>

          {/* Botones de acción */}
          <div className="flex flex-col sm:flex-row gap-6 animate-fadeInUp">
            <a
              href="/cv_sergio_ortiz.pdf"
              download
              className="group relative inline-flex items-center justify-center gap-3 bg-gradient-to-r from-blue-500 to-teal-400 p-0.5 rounded-xl hover:scale-105 transition"
            >
              <span className="block w-full px-8 py-4 rounded-[11px] bg-gray-900 group-hover:bg-gradient-to-r group-hover:from-blue-500 group-hover:to-teal-400">
                <span className="flex items-center gap-2 text-white font-medium">
                  <span>Descargar mi CV</span>
                  <i className="fas fa-arrow-right group-hover:translate-x-1 transition"></i>
                </span>
              </span>
            </a>

            <a
              href="https://github.com/chechojgb"
              className="group relative inline-flex items-center justify-center gap-3 p-0.5 rounded-xl bg-gradient-to-r from-gray-800 to-gray-700 hover:scale-105 transition"
            >
              <span className="block w-full px-8 py-4 rounded-[11px] bg-gray-900 border border-gray-700/50 group-hover:bg-gradient-to-r group-hover:from-gray-800 group-hover:to-gray-700">
                <span className="flex items-center gap-2 text-gray-300 group-hover:text-white font-medium">
                  <span>Mi github</span>
                  <i className="fas fa-envelope group-hover:rotate-12 transition"></i>
                </span>
              </span>
            </a>
          </div>

          {/* Badges flotantes */}
          <div className="hidden lg:block absolute left-24 top-10 animate-float">
            <div className="px-4 py-2 rounded-lg bg-purple-500/10 backdrop-blur-sm border border-purple-500/20 text-purple-400">
              <i className="fas fa-brain"></i> Programación
            </div>
          </div>

          <div className="hidden lg:block absolute right-10 top-20 animate-float-slow">
            <div className="px-4 py-2 rounded-lg bg-blue-500/10 backdrop-blur-sm border border-blue-500/20 text-blue-400">
              <i className="fas fa-code"></i> Código limpio
            </div>
          </div>

          <div className="hidden lg:block absolute left-1/2 top-60 -translate-x-1/2 animate-float">
            <div className="px-4 py-2 rounded-lg bg-amber-500/10 backdrop-blur-sm border border-amber-500/20 text-amber-400">
              <i className="fas fa-lightbulb"></i> Innovación
            </div>
          </div>
        </div>

        {/* Columna derecha (Código + Pinguino) */}
        <div className="w-full lg:w-1/2 flex flex-col items-center justify-center gap-0 mt-12 lg:mt-20">
          <div className="relative w-full bg-[#091121] rounded-2xl shadow-2xl max-w-2xl">
            <div className="flex items-center bg-gray-800 px-5 py-3">
              <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="ml-4 text-sm text-gray-400 flex items-center gap-2">
                <i className="fas fa-code"></i> developer.js
              </span>
            </div>
            <pre className="p-10 text-green-400 text-[1rem] md:text-lg leading-relaxed whitespace-pre-wrap">
{`const profile = {
  name: 'Sergio Ortiz Garzon',
  title: 'Fullstack Developer',
  skills: ['Laravel', 'Python', 'Alpine.js', 'TailwindCSS', 'Asterisk'],
  passion: 'Construir algo innovador (rm -rf /)'
}`}
            </pre>

            {/* 🐧 Pingüino */}
            <div className="absolute -bottom-12 right-0 z-20">
              <img
                src="/images/linux.png"
                alt="Linux Penguin"
                className="h-36 md:h-40 lg:h-48 animate-float-slow drop-shadow-xl"
              />
            </div>
          </div>
        </div>

        {/* Flecha inferior */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce flex flex-col items-center gap-2">
          <span className="text-gray-400 text-sm flex items-center gap-2">
            <i className="fas fa-mouse text-blue-400"></i> Sobre mí
          </span>
          <i className="fas fa-chevron-down text-blue-400 text-xl"></i>
        </div>
      </div>
    </section>
  );
}
