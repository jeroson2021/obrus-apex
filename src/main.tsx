import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom"; // Added this
import { AuthProvider } from "@/contexts/AuthContext"; // Added this
import App from "./App.tsx";
import "./index.css";

// Debug: Check if React is loaded
console.log('✓ React loaded');

const rootElement = document.getElementById("root");
console.log('Root element:', rootElement);

if (!rootElement) {
  console.error('✗ Root element not found!');
  throw new Error("Root element not found. Check your index.html file.");
}

try {
  console.log('Creating React root...');
  const root = createRoot(rootElement);
  console.log('✓ Root created');
  
  console.log('Rendering App...');
  // Wrapped App with BrowserRouter and AuthProvider to prevent crashes
  root.render(
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  );
  console.log('✓ App rendered successfully!');
} catch (error) {
  console.error("❌ Failed to render app:", error);
  
  // Show detailed error
  const errorMsg = error instanceof Error ? error.message : String(error);
  const errorStack = error instanceof Error ? error.stack : '';
  
  rootElement.innerHTML = `
    <div style="
      display:flex;
      align-items:center;
      justify-content:center;
      height:100vh;
      background:#fff;
      flex-direction:column;
      font-family:sans-serif;
      padding: 20px;
    ">
      <h1 style="color: red; margin-bottom: 10px;">❌ Error Loading Application</h1>
      <p style="color: #333; max-width: 500px; white-space: pre-wrap; background: #f5f5f5; padding: 15px; border-radius: 5px;">
        <strong>Error:</strong> ${errorMsg}
        
        <strong style="display: block; margin-top: 10px;">Stack:</strong>
        ${errorStack}
      </p>
    </div>
  `;
}
