import React, { Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

// Lazy loading
const Dashboard = React.lazy(() => import("./pages/Dashboard"));
const Appointment = React.lazy(() => import("./pages/Appointment"));

const App = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BrowserRouter>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/appointment" element={<Appointment />} />
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
};

export default App;
