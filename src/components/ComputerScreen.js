import React, { useState, useRef, useEffect } from "react";
import "../styles/ComputerScreen.css";
import computerImage from "../assets/computer1.png"; // Add your old computer image here
import "../styles/ProjectsSection.css";

const ComputerScreen = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState([]);
  const [showDefaultNotes, setShowDefaultNotes] = useState(false); // New state
  const shellRef = useRef(null); // Reference for the shell to manage scrolling
  const projectSectionRef = useRef(null); // Reference for the Project section
  const resumeSectionRef = useRef(null); // Reference for the Resume section

  useEffect(() => {
    // Automatically scroll to the bottom of the shell when output changes
    if (shellRef.current) {
      shellRef.current.scrollTop = shellRef.current.scrollHeight;
    }
  }, [output]);

  useEffect(() => {
    // Set default notes once when the component mounts
    const timer = setTimeout(() => {
      setOutput([
        { text: "Hi! I'm Arsalan.", className: "default-note" },
        { text: `Type "help" or scroll to start.`, className: "default-note" },
      ]);
      setShowDefaultNotes(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []); // Empty dependency array ensures this runs only once

  const handleCommand = (command) => {
    const commands = {
      about: "Hi, I'm a Software Developer passionate about creating innovative solutions.",
      help: "Commands: about, resume, projects, clear, help ",
      projects: "Scrolling to the Project section...",
      resume: "Displaying Resume...",
    };
  
    if (command === "clear") {
      setOutput([
        { text: "Hi! I'm Arsalan.", className: "default-note" },
        { text: `Type "help" or scroll to start.`, className: "default-note" },
      ]);
    } else if (commands[command]) {
      setOutput((prev) => [
        ...prev,
        { text: `$ ${command}`, className: "command-line" },
        { text: commands[command], className: "response" },
      ]);

      const sectionRef =
      command === "projects"
        ? projectSectionRef
        : command === "resume"
        ? resumeSectionRef
        : null;

      if (sectionRef?.current) {
        sectionRef.current.scrollIntoView({ behavior: "smooth" });

        // Add the highlight animation
        sectionRef.current.classList.add("section-highlight");

        // Remove the highlight animation after it completes
        setTimeout(() => {
          sectionRef.current.classList.remove("section-highlight");
        }, 1500);
      }
    } else {
      setOutput((prev) => [
        ...prev,
        { text: `$ ${command}`, className: "command-line" },
        { text: "Command not recognized. Type 'help' for a list of commands.", className: "error" },
      ]);
    }
  };
  

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      handleCommand(input.trim().toLowerCase());
    }
    setInput("");
  };


  const projects = [
    { name: "Sort Visualizer", link: "https://github.com/Arsalan-ca/Sort-Visualizer" },
    { name: "ArtTherapy Assistant", link: "https://github.com/Arsalan-ca/ArtTherapy-Assistant" },
    { name: "ToDo List", link: "https://github.com/Arsalan-ca/ToDo-List" },
    { name: "Toronto KSI Data Analysis", link: "https://github.com/Arsalan-ca/Toronto-KSI-Data-Analysis" },
    { name: "Amazon Stock Forcasting", link: "https://github.com/Arsalan-ca/Amazon-Stock-forcasting" },
    { name: "", link: "" },
    // 
  ];

  return (
    <div>
      <div className="computer-screen">
        <div className="shell" ref={shellRef}>
          <div className="output">
          {output.map((line, index) => (
              <div key={index} className={line.className}>
                {line.text}
              </div>
            ))}
          </div>
          <form onSubmit={handleSubmit}>
            <span>$ </span>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              autoFocus
            />
          </form>
        </div>
        <img src={computerImage} alt="Old Computer" className="computer-image" />
      </div>
      <div className="content">
          {/* About Section */}
          <div className="aboutme-section">
            <h2>About</h2>
            <p>A dedicated and passionate Software Developer with hands-on industry experience. Skilled in various programming languages and tools, with a strong foundation in software development principles. Passionate about solving challenging problems and contributing to innovative solutions in a collaborative environment.</p>
          </div>
          {/* Project Section */}
          <div ref={projectSectionRef} className="projects-section">
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
          {/* Resume Section */}
          <div ref={resumeSectionRef} className="resume-section">
            <h2>Resume</h2>
            <a href={require("../assets/M.M-resume.pdf")} download="Arsalan_Moaddeli_Resume.pdf">
              View Resume
            </a>
          </div>
          {/* Social Section */}
          <div className="social-section">
            <h2>Socials</h2>
            <ul>
              <li>
                  <a href="https://www.linkedin.com/in/arsalan-moaddeli/" target="_blank" rel="noopener noreferrer">
                      <img src={require("../assets/Linkedin.png")} alt="LinkedIn" className="social-icon" />
                      LinkedIn</a>
                  <a href="mailto:your.arsalanmod2003.com" target="_blank" rel="noopener noreferrer">
                      <img src={require("../assets/Gmail.png")} alt="Gmail" className="social-icon" />
                      Email</a>
                  <a href="https://github.com/Arsalan-ca" target="_blank" rel="noopener noreferrer">
                      <img src={require("../assets/GitHub.png")} alt="GitHub" className="social-icon" />
                      GitHub</a>
              </li>
            </ul>
          </div>
      </div>
    </div>
  );
};

export default ComputerScreen;
