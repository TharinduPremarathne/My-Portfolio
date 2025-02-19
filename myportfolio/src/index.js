import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <header>
        <h1>Mr. Uditha</h1>
        <nav>
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#education">Education</a></li>
            <li><a href="#services">Services</a></li>
            <li><a href="#websites">Websites</a></li>
            <li><a href="#skills">Skills</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </nav>
      </header>

      <section id="home">
        <h2>Hi, I'm Uditha Vithanage</h2>
        <p>I'm a ML Engineer</p>
        <p>Welcome to my portfolio! As a dedicated developer, I specialize in building modern and user-friendly web applications with React and Node.js. With a strong focus on simplicity and functionality, I craft intuitive interfaces and efficient backend solutions. Explore my work, from real-time chat applications to advanced care management platforms, and see how I bring innovative ideas to life with clean, beginner-friendly code and advanced designs.</p>
        <button>Hire Me</button>
      </section>

      <section id="education">
        <h2>Education</h2>
        <div>
          <h3>2017-2019</h3>
          <p>Primary Education</p>
          <p>Rahula College Matara</p>
          <p>G.C.E (Ordinary Level) Examination with ICT</p>
          <p>Nine "A" passes</p>
        </div>
        <div>
          <h3>2019-2022(2023)</h3>
          <p>Science Stream</p>
          <p>"B" pass & two "C" passes</p>
        </div>
        <div>
          <h3>2023-2024</h3>
          <p>Foundation</p>
          <p>Informatics Institute of Technology (IIT)</p>
          <p>Foundation Certificate in Higher Education</p>
          <p>Distinction pass</p>
        </div>
        <div>
          <h3>2024-Present</h3>
          <p>University</p>
          <p>Informatics Institute of Technology (IIT)</p>
          <p>BSc (Hons) Computer Science</p>
        </div>
      </section>

      <section id="services">
        <h2>Services</h2>
        <p>I provide tailored web development services, creating responsive, user-friendly websites and applications. Specializing in front-end and back-end development, I deliver secure, scalable solutions, including e-commerce and custom functionality. I collaborate closely with clients to ensure impactful digital experiences that</p>
      </section>

      <section id="websites">
        <h2>My Websites</h2>
        <ul>
          <li>Public</li>
          <li>Video Downloader</li>
          <li>VCU Calculators</li>
          <li>We See You</li>
        </ul>
      </section>

      <section id="skills">
        <h2>Skills</h2>
        <ul>
          <li>JS</li>
          <li>HTML</li>
          <li>CSS</li>
          <li>JavaScript</li>
          <li>React JS</li>
        </ul>
      </section>

      <section id="contact">
        <h2>Contact</h2>
        <p>Feel free to reach out to me for any inquiries or collaborations.</p>
      </section>
    </div>
  );
}

export default App;