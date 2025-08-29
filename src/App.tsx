import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";

export default function App() {
  return (
    <Router basename={import.meta.env.PROD ? '/setapp-apps-showcase-modern' : '/'}>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}