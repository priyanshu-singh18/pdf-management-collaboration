import React from "react";
import "./App.css";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { RecoilRoot } from "recoil";

import SignupComponent from "./components/login/SignupComponent";
import Header from "./components/common/Header";
import PdfViewPage from "./pages/PdfViewPage";

function App() {
  return (
    <RecoilRoot>
      <Router>
        <div className="App">
          <Header />
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
