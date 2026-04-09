import { Outlet, useLocation } from "react-router";
import { AnimatePresence } from "motion/react";

export default function AuthLayout() {
  const location = useLocation();

  return (
    <div className="size-full relative">
      <AnimatePresence mode="wait">
        <Outlet key={location.pathname} />
      </AnimatePresence>
    </div>
  );
}
