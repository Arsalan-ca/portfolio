import React, { useState, useRef, useEffect } from "react";
import "../styles/ComputerScreen.css";
import computerImage from "../assets/computer1.png"; // Add your old computer image here

const ComputerScreen = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState([]);
  const [showDefaultNotes, setShowDefaultNotes] = useState(false); // New state
  const shellRef = useRef(null); // Reference for the shell to manage scrolling
  const projectSectionRef = useRef(null); // Reference for the Project section
  const resumeSectionRef = useRef(null); // Reference for the Resume section
  const workSectionRef = useRef(null); // Reference for the Work section

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
        { text: `Hi! I'm Arsalan.`, className: "default-note" },
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
    <div className="container">
         <ul id="sections">
            <li class="section" id="section1">
                {/* Shell Section */}
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
            </li>
            <li class="section" id="section2">
                {/* About Section */}
                <div className="aboutme-section">
                  <h2>About</h2>
                  <p>A dedicated and passionate Software Developer with hands-on industry experience. Skilled in various programming languages and tools, with a strong foundation in software development principles. Passionate about solving challenging problems and contributing to innovative solutions in a collaborative environment.</p>
                </div>
            </li>
            <li class="section" id="section3">
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
            </li>
            <li class="section" id="section4">
                {/* Resume Section */}
                <div ref={resumeSectionRef} className="resume-section">
                  <h2>Resume</h2>
                  <a href={require("../assets/M.M-resume.pdf")} download="Arsalan_Moaddeli_Resume.pdf">
                    Download Resume
                  </a>
                  <br></br>
                  <embed class="resume" src={require("../assets/M.M-resume.pdf")} type="application/pdf" />
                </div>
            </li>
            <li class="section" id="section5">
                <div ref={workSectionRef} className="work-section">
                  <h2>Work Experience</h2>
                  <div className="work-experience">
                    <h3>Data Analyst (co-op) | Procor Limited | Oakville, ON | 02/2024 - 05/2024</h3>
                    <ul>
                      <li>Developed and deployed a digital transformation system that converted over 100 manual PDF forms into interactive digital forms, enabling seamless data entry on iPads and reducing paper usage by 90%.</li>
                      <li>Optimized database efficiency by designing a system to store only essential data fields from submitted forms, significantly reducing storage requirements and improving data retrieval accuracy.</li>
                      <li>Collaborated with a team to implement dynamic, dependency-driven form fields using Adobe Acrobat and JavaScript, enhancing user experience and ensuring accurate data mapping across workflows.</li>
                    </ul>
                  </div>
                  <div className="work-experience">
                    <h3>ML Research Assistant (Intern) | McMaster Automotive Resource Centre | Hamilton, ON | 05/2023 - 12/2023</h3>
                    <ul>
                      <li>Preprocessed and annotated large datasets, including fisheye camera frames and GPS data, for use in LSTM and RNN models aimed at enhancing pedestrian safety at intersections.</li>
                      <li>Designed and implemented mathematical algorithms to identify and track surrounding vehicles in a driver's field of view, creating a dataset for autonomous driving systems to improve situational awareness.</li>
                      <li>Trained deep learning models for speed and trajectory prediction, leveraging Python, MongoDB, and Google My Maps, while self-learning advanced ML techniques to optimize model performance.</li>
                    </ul>
                  </div>
                </div>
            </li>
            <li class="section" id="section6">
                {/* Social Section */}
                <div className="social-section">
                  <h2>Socials</h2>
                  <div >
                    <ul className="social-icons">
                      <li>
                          <a href="https://www.linkedin.com/in/arsalan-moaddeli/" target="_blank" rel="noopener noreferrer">
                              <img src={require("../assets/Linkedin.png")} alt="LinkedIn" className="social-icon" />
                              LinkedIn</a>
                      </li>
                      <li>
                          <a href="mailto:your.arsalanmod2003.com" target="_blank" rel="noopener noreferrer">
                              <img src={require("../assets/Gmail.png")} alt="Gmail" className="social-icon" />
                              Email</a>
                      </li>
                      <li>
                          <a href="https://github.com/Arsalan-ca" target="_blank" rel="noopener noreferrer">
                              <img src={require("../assets/GitHub.png")} alt="GitHub" className="social-icon" />
                              GitHub</a>
                      </li>
                    </ul>
                  </div>
                </div>
            </li>
        </ul>
    </div>
  );
};

export default ComputerScreen;
