import { useOutletContext } from "react-router";

export function useOnboardingProgress() {
  return useOutletContext<{ progress: number }>();
}
