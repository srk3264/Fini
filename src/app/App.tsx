import { RouterProvider } from "react-router";
import { router } from "./routes";
import { AuthProvider } from "./contexts/AuthContext";

export default function App() {
  return (
    <AuthProvider>
      <div className="size-full bg-white flex items-center justify-center">
        <div className="w-full max-w-[448px] h-full md:max-h-[844px] md:shadow-2xl">
          <RouterProvider router={router} />
        </div>
      </div>
    </AuthProvider>
  );
}