import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element not found. Check your index.html file.");
}

try {
  createRoot(rootElement).render(<App />);
} catch (error) {
  console.error("Failed to render app:", error);
  rootElement.innerHTML = `
    <div style="display:flex;align-items:center;justify-content:center;height:100vh;background:#fff;flex-direction:column;font-family:sans-serif">
      <h1>Error Loading Application</h1>
      <p>${error instanceof Error ? error.message : "Unknown error"}</p>
    </div>
  `;
}
