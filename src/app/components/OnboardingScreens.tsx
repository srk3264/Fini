import Onboarding1 from "../../imports/Onboarding1";
import Onboarding2 from "../../imports/Onboarding2";
import Onboarding3 from "../../imports/Onboarding3";
import { useOnboardingProgress } from "./OnboardingWrapper";
import { motion } from "motion/react";

export function OnboardingScreen1() {
  const { progress } = useOnboardingProgress();
  return (
    <motion.div
      className="absolute inset-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <Onboarding1 progress={progress} />
    </motion.div>
  );
}

export function OnboardingScreen2() {
  const { progress } = useOnboardingProgress();
  return (
    <motion.div
      className="absolute inset-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <Onboarding2 progress={progress} />
    </motion.div>
  );
}

export function OnboardingScreen3() {
  const { progress } = useOnboardingProgress();
  return (
    <motion.div
      className="absolute inset-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <Onboarding3 progress={progress} />
    </motion.div>
  );
}