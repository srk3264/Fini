import { RouterProvider } from "react-router";
import { router } from "./routes";
import { AuthProvider } from "./contexts/AuthContext";

export default function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-white flex">
        <div className="w-full max-w-[448px] h-full flex flex-col md:max-h-[844px] md:shadow-2xl">
          <RouterProvider router={router} />
        </div>
      </div>
    </AuthProvider>
  );
}