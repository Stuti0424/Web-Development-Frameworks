/*import Header from "./component/Header";
import About from "./component/About";
import Skills from "./component/Skills";
import Footer from "./component/Footer";
import NavBar from "./component/NavBar";

function App() {
  const skills = [
    "HTML","CSS","JavaScript","React","Python"
  ];

  return (
    <div>
      <Header 
      title="Student Portfolio"
      themeColor = "lightblue" />

      <NavBar active="Skills" />
      
        <About />

        
          <Skills skillList={skills} />
        
     

      <Footer />
    </div>
  );
}

export default App;*/

/* PR2 import NavBar from "./component/NavBar";
import { Routes, Route } from "react-router-dom";
import Home from "./component/Home";
import Projects from "./component/Projects";
import Contact from "./component/Contact";
import "./App.css";

function App() {
  return (
    <div className="app-shell">
      <NavBar />

      <main className="page">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;*/

/* PR3 import Projects from "./component/Projects";

function App() {
  return (
    <div>
      <Projects />
    </div>
  );
}

export default App;*/