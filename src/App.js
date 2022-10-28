import 'bootswatch/dist/zephyr/bootstrap.css'
import React from "react";
import Navbar from "./components/Navbar";
import Dashboard from './views/Dashboard';

function App() {
  return (
    <div>
      <Navbar />
      <div className="container my-5">
        <Dashboard />
      </div>
    </div>
  );
}

export default App;