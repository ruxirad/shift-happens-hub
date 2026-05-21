import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route } from "react-router-dom";
import { ShiftHappensApp } from "@/components/shift/ShiftHappensApp";
import "./styles.css";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <HashRouter>
        <Routes>
          <Route path="/" element={<ShiftHappensApp />} />
          <Route path="*" element={<ShiftHappensApp />} />
        </Routes>
      </HashRouter>
    </QueryClientProvider>
  </React.StrictMode>
);
