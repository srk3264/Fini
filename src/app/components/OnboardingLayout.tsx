import { useEffect, useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router";
import { AnimatePresence } from "motion/react";

export default function OnboardingLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [progress, setProgress] = useState(0);

  // Determine current step based on path
  const getCurrentStep = () => {
    if (location.pathname === "/") return 0;
    if (location.pathname === "/step-2") return 1;
    if (location.pathname === "/step-3") return 2;
    return 0;
  };

  const currentStep = getCurrentStep();

  // Auto-advance after 5 seconds with progress animation
  useEffect(() => {
    setProgress(0); // Reset progress when screen changes
    
    const duration = 5000; // 5 seconds
    const interval = 50; // Update every 50ms
    const increment = (interval / duration) * 100;
    
    const timer = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + increment;
        if (newProgress >= 100) {
          clearInterval(timer);
          return 100;
        }
        return newProgress;
      });
    }, interval);

    const advanceTimer = setTimeout(() => {
      if (currentStep === 0) navigate("/step-2");
      else if (currentStep === 1) navigate("/step-3");
      else if (currentStep === 2) navigate("/sign-up"); // Navigate to sign-up after last onboarding screen
    }, duration);

    return () => {
      clearInterval(timer);
      clearTimeout(advanceTimer);
    };
  }, [currentStep, navigate]);

  // Allow manual navigation via tap - left side goes back, right side goes forward
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const clickX = e.clientX;
    const screenWidth = window.innerWidth;
    const midPoint = screenWidth / 2;

    if (clickX < midPoint) {
      // Clicked left side - go back
      if (currentStep === 2) navigate("/step-2");
      else if (currentStep === 1) navigate("/");
    } else {
      // Clicked right side - go forward
      if (currentStep === 0) navigate("/step-2");
      else if (currentStep === 1) navigate("/step-3");
    }
  };

  return (
    <div className="size-full relative" onClick={handleClick}>
      <AnimatePresence mode="wait">
        <Outlet key={location.pathname} context={{ progress }} />
      </AnimatePresence>
    </div>
  );
}