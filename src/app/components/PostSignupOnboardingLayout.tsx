import { Outlet } from "react-router";
import { OnboardingProvider } from "../contexts/OnboardingContext";

export default function PostSignupOnboardingLayout() {
  return (
    <OnboardingProvider>
      <Outlet />
    </OnboardingProvider>
  );
}
