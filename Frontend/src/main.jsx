import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import MyRoutes from "./Routes/MyRoutes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import 'leaflet/dist/leaflet.css';
import { GoogleOAuthProvider } from '@react-oauth/google';


const queryClient = new QueryClient()
const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <GoogleOAuthProvider clientId={clientId}>
      <BrowserRouter>
        <MyRoutes />
      </BrowserRouter>
      </GoogleOAuthProvider>
    </QueryClientProvider>
  </StrictMode>
);
