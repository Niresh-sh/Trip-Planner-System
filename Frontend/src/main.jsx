import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import MyRoutes from "./Routes/MyRoutes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import 'leaflet/dist/leaflet.css';
import { GoogleOAuthProvider } from '@react-oauth/google';


const queryClient = new QueryClient()

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <GoogleOAuthProvider clientId="79711263829-e3r18c7fo36vf9gps390ughqlado180s.apps.googleusercontent.com">
      <BrowserRouter>
        <MyRoutes />
      </BrowserRouter>
      </GoogleOAuthProvider>
    </QueryClientProvider>
  </StrictMode>
);
