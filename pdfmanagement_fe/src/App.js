import React from "react";
import "./App.css";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { RecoilRoot } from "recoil";
import PdfViewPage from "./components/dashboard/PdfViewPage";
import SignupComponent from "./components/login/SignupComponent";

function App() {
  return (
    <RecoilRoot>
      <Router>
        <div className="App">
          <Routes>
            <Route exact path="/" element={<LoginPage />} />
            <Route exact path="/dashboard" element={<DashboardPage />} />
            <Route exact path="/pdfview" element={<PdfViewPage />} />
            <Route exact path="/signup" element={<SignupComponent />} />
          </Routes>
        </div>
      </Router>
    </RecoilRoot>
  );
}

export default App;
