import { lazy, Suspense } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

// styles
import "./App.css";

// views
import { Home } from "./components/views/Home/Home.jsx";
import { SubmittedForm } from "./components/views/SubmittedForm/SubmittedForm.jsx";
const Error404 = lazy(() => import("./components/views/Error404/Error404"));

export const App = () => {
  const location = useLocation();

  return (
    <Routes location={location} key={location.pathname}>
      <Route path="/" element={<Home />}></Route>
      <Route path="/submittedForm/:idForm" element={<SubmittedForm />}></Route>
      <Route
        path="*"
        element={
          <Suspense fallback={<>...</>}>
            <Error404 />
          </Suspense>
        }
      />
    </Routes>
  );
};
