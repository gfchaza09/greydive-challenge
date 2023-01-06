import { lazy, Suspense } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

// views
import { Home } from "./components/views/Home/Home.jsx";
import { Send } from "./components/views/Send/Send.jsx";
const Error404 = lazy(() => import("./components/views/Error404/Error404"));

export const App = () => {
  const location = useLocation();

  return (
    <Routes location={location} key={location.pathname}>
      <Route path="/" element={<Home />}></Route>
      <Route path="/send/:id" element={<Send />}></Route>
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
