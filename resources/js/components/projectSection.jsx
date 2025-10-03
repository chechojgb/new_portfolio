import React from "react";
import ProjectCard from "./projectCard";

const ProjectsSection = () => {
  return (
    <section id="proyectos" className="bg-[#020617] text-white py-24 px-6 sm:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text pb-4">
          Mis proyectos
        </h2>

        <div className="flex flex-col gap-16">
            <ProjectCard
              pageTitle="Button Lovers"
              image="images/projects/eclipse.png"
              himagelg="70"
              himagexl="auto"
              title="Inventario de Botones"
              description="Sistema de gestión para una empresa de botones. Incluye control de inventario, CRUD de productos, seguimiento de movimientos, y un dashboard con estadísticas de stock, producción, ventas y pedidos pendientes."
              tags={[
                  { name: "Laravel", class: "bg-red-600 text-white", icon: "images/logos/laravel.svg" },
                  { name: "React", class: "bg-sky-500 text-white", icon: "images/logos/react.svg" },
                  { name: "Inertia.js", class: "bg-indigo-600 text-white", icon: "images/logos/inertia.svg" },
                  { name: "TailwindCSS", class: "bg-cyan-500 text-white", icon: "images/logos/tailwind.svg" },
              ]}
              github="https://github.com/chechojgb/inventario-botones"
              />
          <ProjectCard
            pageTitle="AZZU"
            image="images/projects/nexoAgents.png"
            himagelg="70"
            himagexl="70"
            title="NexoAgents - Control y monitoreo de agentes"
            description="Sistema integral de control y monitoreo de agentes, diseñado para optimizar operaciones de atención y gestión en tiempo real. Desarrollado utilizando tecnologías modernas como Laravel y React, permitiendo interacciones fluidas, actualizaciones en vivo y una experiencia de usuario ligera y responsiva."
            tags={[
              { name: "Laravel", class: "bg-red-900 text-white", icon: "images/logos/laravel.svg" },
              { name: "Tailwind CSS", class: "bg-cyan-700 text-white", icon: "images/logos/tailwind.png" },
              { name: "React", class: "bg-blue-400 text-white", icon: "images/logos/react.png" },
            ]}
            github="https://github.com/chechojgb/AZZU"
          />



          <ProjectCard
            pageTitle="decroche"
            image="images/projects/decroche.png"
            himagelg="70"
            himagexl="70"
            title="DeCroche - Tienda de productos"
            description="Tienda de productos de crochet desarrollada con Laravel y APIs de comercio. Permite explorar productos, gestionar inventario y realizar compras de manera segura."
            tags={[
              { name: "Laravel", class: "bg-rose-900 text-white", icon: "images/logos/laravel.svg" },
              { name: "PHP", class: "bg-indigo-800 text-white", icon: "images/logos/php.svg" },
              { name: "JavaScript", class: "bg-yellow-500 text-white", icon: "images/logos/javascript.svg" },
            ]}
            github="https://github.com/chechojgb/laravel-DC"
          />
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
