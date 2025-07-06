import { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

const UserLogin = lazy(() => import("../pages/UserLogin"));
const Chat = lazy(() => import("../pages/Chat"));
const Sessions = lazy(() => import("../pages/Sessions"));

export default function AppRoutes() {
  const token = localStorage.getItem("token");
  console.log("Token:", token);
  return (
    <Suspense fallback={<div className="p-6">Loading...</div>}>
      <Routes>
        {!token ? (
          <>
            <Route path="/login" element={<UserLogin />} />
            <Route path="/" element={<Navigate to="/login" replace />} />
          </>
        ) : (
          <>
            <Route path="*" element={<UserLogin />} />
            <Route path="/" element={<Sessions />} />
            <Route path="/chat/:id" element={<Chat />} />
          </>
        )}
      </Routes>
    </Suspense>
  );
}
