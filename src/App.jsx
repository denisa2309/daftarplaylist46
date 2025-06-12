import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPages from "./pages/LandingPages.jsx";

const App = () => {
  return (
    <BrowserRouter
      future={{
        v7_relativeSplatPath: true,
        v7_startTransition: true,
      }}
    >
      <Routes>
        <Route path="/" element={<LandingPages />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
