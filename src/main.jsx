import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "antd/dist/reset.css"; // untuk Ant Design v5

createRoot(document.getElementById("root")).render(<App />);
