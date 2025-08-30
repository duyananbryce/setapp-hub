import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import TestPage from "@/pages/TestPage";

export default function App() {
  return (
    <Router basename='/setapp-hub/'>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/test" element={<TestPage />} />
      </Routes>
    </Router>
  );
}