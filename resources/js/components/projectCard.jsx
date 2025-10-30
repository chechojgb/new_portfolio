import React, { useState } from "react";
import { Link } from "@inertiajs/react";

const ProjectCard = ({
  image,
  title,
  description,
  tags = [],
  github = null,
  route = null,
  pageTitle = null,
  himagelg = "auto",
  himagexl = "auto",
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <article 
      className="flex flex-col md:flex-row gap-8 group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Efecto de glow al hacer hover */}
      <div className={`absolute -inset-4 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-2xl blur-xl transition-opacity duration-500 ${
        isHovered ? 'opacity-100' : 'opacity-0'
      }`}></div>

      {/* Imagen + ventana navegador */}
      <div className="w-full md:w-1/2 relative z-30">
        <div className="relative w-full h-64 md:h-96 lg:h-104 overflow-hidden rounded-xl shadow-2xl group-hover:scale-[1.02] transition-all duration-500 border border-gray-700/50 bg-gradient-to-br from-gray-900 to-gray-800 sm:h-104 min-h-[310px]">
          
          {/* Efecto de reflexión en el escritorio */}
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent z-10"></div>

          {/* Iconos de escritorio al fondo */}
          <div className="absolute top-4 left-1 flex flex-col gap-5 text-center text-sm text-gray-300 font-semibold z-0">
            <div className="flex flex-col items-center transition-transform duration-300 hover:scale-110">
              <img src={`/images/desk/carpeta-mac-48.png`} alt="Files-mac" className="w-12 h-12"/>
              <span>Proyectos</span>
            </div>
            <div className="flex flex-col items-center transition-transform duration-300 hover:scale-110">
              <img src={'/images/desk/notes_icon.svg'} alt="Notes-mac" className="w-12 h-12" />
              <span>Notas</span>
            </div>
            <div className="flex flex-col items-center transition-transform duration-300 hover:scale-110">
              <img src={'images/desk/discord.png'} alt="Discord" className="w-12 h-12" />
              <span>Discord</span>
            </div>
          </div>

          {/* Contenido ventana */}
          <div className="px-8 py-8 relative z-20 p-30">
            <div className="overflow-hidden rounded-xl bg-gray-800 shadow-2xl w-full max-w-3xl mx-auto border border-gray-600/50">
              {/* Barra navegador mejorada */}
              <div className="flex items-center bg-gradient-to-r from-gray-800 to-gray-700 px-4 py-3 border-b border-gray-600">
                <div className="flex space-x-2 mr-4">
                  <div className="w-3 h-3 bg-red-500 rounded-full hover:scale-110 transition-transform cursor-pointer"></div>
                  <div className="w-3 h-3 bg-yellow-400 rounded-full hover:scale-110 transition-transform cursor-pointer"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full hover:scale-110 transition-transform cursor-pointer"></div>
                </div>
                <div className="bg-gray-900 px-4 py-2 rounded-lg flex items-center gap-2 border border-gray-600 flex-1">
                  <i className="fas fa-lock text-green-400 text-xs"></i>
                  <span className="text-sm text-gray-300 truncate">{pageTitle}</span>
                  <span className="text-gray-500 ml-auto text-sm hover:text-white transition-colors cursor-pointer">×</span>
                </div>
              </div>

              {/* Imagen principal con overlay */}
              <div className="relative overflow-hidden">
                <img
                  src={`/${image}`}
                  alt={title}
                  className={`w-full h-40 lg:h-${himagelg} xl:h-${himagexl} md:h-70 max-h-72 object-cover transition duration-700 group-hover:scale-105`}
                  loading="lazy"
                />
                {/* Overlay sutil al hacer hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </div>
          </div>

          {/* Barra de tareas mejorada */}
          <div className="absolute bottom-0 w-full h-14 bg-gradient-to-t from-gray-800 to-gray-900 border-t border-gray-600/50"></div>
          <div className="absolute bottom-2 left-0 w-full flex justify-center items-center px-4 gap-6 z-30">
            <div className="flex items-center gap-6 bg-gray-800/80 backdrop-blur-sm px-6 py-2 rounded-xl border border-gray-600/50">
              <img src={'images/desk/spotify.svg'} alt="Spotify" className="w-6 h-6 hover:scale-110 transition-transform"/>
              <div className="relative">
                <img src={'images/desk/safari.svg'} alt="Safari" className="w-8 h-8 bg-blue-500/20 rounded-lg p-1 hover:scale-110 transition-transform"/>
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              </div>
              <img src={'images/desk/visual-studio-code.svg'} alt="VSCode" className="w-6 h-6 hover:scale-110 transition-transform"/>
              <img src={'images/desk/app-store.svg'} alt="App Store" className="w-6 h-6 hover:scale-110 transition-transform"/>
              <img src={'images/desk/gmail-icon.svg'} alt="Gmail" className="w-6 h-6 hover:scale-110 transition-transform"/>
            </div>
          </div>
        </div>
      </div>

      {/* Info del proyecto mejorada */}
      <div className="md:w-1/2 md:max-w-lg relative z-10">
        <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors duration-300">
          {title}
        </h3>
        
        <div className="flex flex-wrap mb-4 gap-2">
          {tags.map((tag, i) => (
            <li
              key={i}
              className={`flex items-center gap-2 text-xs px-3 py-2 rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-105 ${tag.class}`}
            >
              {tag.icon && <img src={`/${tag.icon}`} alt={tag.name} className="w-4 h-4" />}
              {tag.name}
            </li>
          ))}
        </div>

        <p className="text-gray-400 leading-relaxed mb-6 group-hover:text-gray-300 transition-colors duration-300">
          {description}
        </p>

        <div className="flex flex-wrap gap-3">
          {github && (
            <a
              href={github}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-800/80 backdrop-blur-sm border border-gray-600/50 text-gray-300 hover:bg-gray-700 hover:text-white hover:scale-105 transition-all duration-300"
            >
              <img src="/images/logos/github.svg" alt="Github" className="w-5 h-5" /> 
              <span>Código</span>
            </a>
          )}
          {route && (
            <Link
              href={route}
              className="relative inline-flex items-center gap-2 px-4 py-2 rounded-lg text-white font-semibold overflow-hidden group/btn transition-all duration-300 hover:scale-105"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 animate-gradient-x"></span>
              <span className="absolute inset-0 bg-black opacity-0 group-hover/btn:opacity-20 transition-opacity duration-300"></span> 
              <span className="relative z-10 flex items-center gap-2">
                <i className="fas fa-external-link-alt"></i> 
                <span>Ver Proyecto</span>
              </span>
            </Link>
          )}
        </div>

        {/* Indicador de interacción */}
        <div className="flex items-center gap-2 mt-4 text-sm text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <i className="fas fa-mouse-pointer text-cyan-400"></i>
          <span>Haz click para explorar</span>
        </div>
      </div>
    </article>
  );
};

export default ProjectCard;