import React from "react";
import "../styles/ProjectsSection.css";

const ProjectsSection = () => {
  const projects = [
    { name: "UNIX Shell Portfolio", link: "https://github.com/yourusername/unix-shell-portfolio" },
    { name: "Search Sort Visualizer", link: "https://github.com/yourusername/search-sort-visualizer" },
    { name: "Firebase React App", link: "https://github.com/yourusername/firebase-react-app" },
  ];

  return (
    <div className="projects-section">
      <h2>Projects</h2>
      <ul>
        {projects.map((project, index) => (
          <li key={index}>
            <a href={project.link} target="_blank" rel="noopener noreferrer">
              {project.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectsSection;
