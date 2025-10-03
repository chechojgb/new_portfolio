import React from "react";
import { Link } from "@inertiajs/react";

const ProjectCard = ({
  image,
  title,
  description,
  tags = [],
  github = null,
  route = null, // 👈 Cambié "link" por "route" para diferenciar interno de externo
  pageTitle = null,
  himagelg = "auto",
  himagexl = "auto",
}) => {
  return (
    <article className="flex flex-col md:flex-row gap-8 group">
      {/* Imagen + ventana navegador */}
      <div className="w-full md:w-1/2 ">
        <div className="relative w-full h-64 md:h-96 lg:h-104 overflow-hidden rounded-lg shadow-lg group-hover:scale-[1.02] transition-transform duration-300 border border-gray-900 bg-blue-200 sm:h-104 min-h-[310px]">
          {/* Contenido ventana */}
          <div className="px-8 py-8 relative z-10 p-30">
            <div className="overflow-hidden rounded-xl bg-gray-800 shadow-md w-full max-w-3xl mx-auto">
              {/* Barra navegador */}
              <div className="flex items-center bg-gray-800 px-5 pt-2">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <div className="bg-gray-900 px-4 py-1 rounded-t-lg flex items-center gap-2 ml-2 border-b-2 border-gray-700 ml-4">
                  <i className="fas fa-code text-gray-400"></i>
                  <span className="text-sm text-gray-300 truncate">{pageTitle}</span>
                  <span className="text-gray-500 ml-2 text-sm">x</span>
                </div>
              </div>

              {/* Imagen principal */}
              <div className="relative overflow-hidden">
                <img
                  src={`/${image}`}
                  alt={title}
                  className={`w-full h-40 lg:h-${himagelg} xl:h-${himagexl} md:h-70 max-h-72 object-cover transition duration-500 group-hover:scale-105`}
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Info del proyecto */}
      <div className="md:w-1/2 md:max-w-lg">
        <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
        <ul className="flex flex-wrap mb-4 gap-2">
          {tags.map((tag, i) => (
            <li
              key={i}
              className={`flex items-center gap-2 text-xs px-3 py-1 rounded-full ${tag.class}`}
            >
              {tag.icon && <img src={`/${tag.icon}`} alt={tag.name} className="w-6 h-6" />}
              {tag.name}
            </li>
          ))}
        </ul>

        <p className="text-gray-400">{description}</p>

        <div className="flex mt-4 gap-4">
          {github && (
            <a
              href={github}
              target="_blank"
              rel="noreferrer"
              className="text-white bg-gray-800 hover:bg-gray-600 px-4 py-2 rounded flex items-center gap-2"
            >
              <img src="/images/logos/github.svg" alt="Github" className="w-6 h-6" /> Código
            </a>
          )}
          {route && (
            <Link
              href={route}
              className="text-white bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded flex items-center gap-2"
            >
              <i className="fas fa-external-link-alt"></i> Ver Página
            </Link>
          )}
        </div>
      </div>
    </article>
  );
};

export default ProjectCard;
