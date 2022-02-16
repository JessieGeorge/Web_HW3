import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import ArtSchool from "./components/ArtSchool.js";
import Students from "./components/Students.js";
import NewStudent from "./components/NewStudent.js";
import Groups from "./components/Groups.js";
import NewGroup from "./components/NewGroup.js";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/Students" element={<Students />}></Route>
        <Route path="/NewStudent" element={<NewStudent />}></Route>
        <Route path="/Groups" element={<Groups />}></Route>
        <Route path="/NewGroup" element={<NewGroup />}></Route>
        <Route path="/" element={<ArtSchool />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
