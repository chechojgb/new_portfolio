import React from "react";

export default function AboutMe() {
  return (
    <section
      id="sobre-mi"
      className="relative bg-[#020617] text-white py-28 px-6 lg:px-8 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[minmax(0,auto)_1fr] gap-20 items-center">
        {/* Imagen con glow */}
        <div className="relative flex justify-center lg:justify-start sm:pl-6 md:px-12">
          <img
            src="/images/yo.jpeg"
            alt="Sergio Ortiz Garzon"
            className="w-60 h-60 rounded-full animate-float-slow drop-shadow-xl"
          />
          <div className="absolute -inset-1 bg-cyan-400/20 rounded-full blur-2xl animate-ping -z-10"></div>
        </div>

        {/* Texto descriptivo */}
        <div className="relative space-y-6 pl-0 sm:pl-6 md:px-12 lg:pl-40">
          {/* Fondo decorativo */}
          <div className="absolute hidden lg:block -top-20 -left-20 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
          <div className="absolute hidden lg:block top-40 -right-20 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl"></div>

          <h2 className="text-4xl lg:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
            Sobre mí
          </h2>

          <p className="text-lg text-gray-300 leading-relaxed">
            Soy <span className="text-cyan-300 font-semibold">Sergio Ortiz</span>
            , desarrollador fullstack con una profunda orientación a la creación
            de soluciones digitales eficientes, escalables y centradas en el
            usuario. Mi experiencia se ha enfocado principalmente en el
            ecosistema de{" "}
            <span className="text-red-400 font-semibold">Laravel</span>, donde
            he desarrollado desde APIs robustas hasta sistemas completos de
            gestión.
          </p>

          <p className="text-lg text-gray-300 leading-relaxed mt-6">
            Me apasiona automatizar procesos, optimizar flujos de trabajo y
            conectar piezas clave de software para que las soluciones no solo
            funcionen bien, sino que sean sostenibles a largo plazo. He trabajado
            en proyectos que van desde paneles de administración personalizados
            hasta herramientas para centros de contacto, integrando diversas
            tecnologías modernas en el backend y frontend.
          </p>

          <p className="text-lg text-gray-300 leading-relaxed mt-6">
            En el desarrollo de interfaces y experiencias de usuario, aprovecho
            la flexibilidad de{" "}
            <span className="text-cyan-400 font-semibold">TailwindCSS</span>{" "}
            para construir diseños limpios y responsivos, y utilizo{" "}
            <span className="text-blue-400 font-semibold">React</span> para
            añadir interactividad dinámica y componentes reutilizables,
            manteniendo el enfoque en rendimiento y escalabilidad.
          </p>

          <p className="text-lg text-gray-300 leading-relaxed">
            Me enfoco en eficiencia, simplicidad y escalabilidad. Desde sistemas
            internos hasta herramientas de contacto, cada línea de código busca
            resolver problemas reales.
          </p>

          {/* Mini tarjetas tipo glass */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
            <div className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-cyan-400/10 hover:scale-[1.02] transition shadow-md">
              <h3 className="text-cyan-400 font-bold mb-3">¿Qué hago?</h3>
              <ul className="list-disc list-inside text-sm text-gray-300 space-y-1">
                <li>Backends sólidos en Laravel</li>
                <li>Integraciones VoIP con Asterisk</li>
                <li>Dashboards interactivos</li>
                <li>Automatizaciones inteligentes</li>
              </ul>
            </div>

            <div className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-indigo-400/10 hover:scale-[1.02] transition shadow-md">
              <h3 className="text-indigo-400 font-bold mb-3">¿Cómo lo hago?</h3>
              <ul className="list-disc list-inside text-sm text-gray-300 space-y-1">
                <li>React, TailwindCSS, Git</li>
                <li>Buenas prácticas y CI/CD</li>
                <li>Escuchando al usuario final</li>
                <li>Optimizando cada capa del sistema</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Flecha inferior */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce flex flex-col items-center gap-2">
        <span className="text-gray-400 text-sm flex items-center gap-2">
          <i className="fas fa-mouse text-blue-400"></i> Skills
        </span>
        <i className="fas fa-chevron-down text-blue-400 text-xl"></i>
      </div>
    </section>
  );
}
