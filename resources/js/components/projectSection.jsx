import React, { useState } from "react";
import ProjectCard from "./projectCard";

// 👉 Importa tus previews de ejemplo


const ProjectsSection = () => {
  const [preview, setPreview] = useState(null);

  return (
    <section id="proyectos" className="bg-[#020617] text-white py-24 px-6 sm:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text pb-10">
          Mis proyectos
        </h2>

        <div className="flex flex-col gap-16">
          <ProjectCard
            pageTitle="Button Lovers"
            image="images/projects/ButtonLovers.png"
            himagelg="70"
            himagexl="auto"
            title="Inventario de Botones"
            description="Sistema de gestión para una empresa de botones. Incluye control de inventario, CRUD de productos, seguimiento de movimientos, y un dashboard con estadísticas."
            tags={[
              { name: "Laravel", class: "bg-red-900 text-white", icon: "images/logos/laravel.svg" },
              { name: "React", class: "bg-blue-400 text-white", icon: "images/logos/react.png" },
              { name: "TailwindCSS", class: "bg-cyan-700 text-white", icon: "images/logos/tailwind.png" },
            ]}
            github="https://github.com/chechojgb/inventario-botones"
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
              { name: "Laravel", class: "bg-red-900 text-white", icon: "images/logos/laravel.svg" },
              { name: "React", class: "bg-blue-400 text-white", icon: "images/logos/react.png" },
              { name: "Tailwind CSS", class: "bg-cyan-700 text-white", icon: "images/logos/tailwind.png" },
            ]}
            github="https://github.com/chechojgb/AZZU"
            preview={() => setPreview("azzu")} // 👉 acción interna
          />

          {/* Los demás proyectos sin preview siguen igual */}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
