import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import MyRoutes from "./Routes/MyRoutes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import 'leaflet/dist/leaflet.css';


const queryClient = new QueryClient()

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <MyRoutes />
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>
);
