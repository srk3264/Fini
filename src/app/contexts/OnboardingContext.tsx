import { createContext, useContext, useState, ReactNode } from "react";

interface OnboardingData {
  nickname: string;
  aiPersona: string;
  gender: string;
  faiths: string[];
  occupation: string;
  relationshipStatus: string;
  birthday: string;
  notificationTimes: string[];
}

interface OnboardingContextType {
  data: OnboardingData;
  updateData: (field: keyof OnboardingData, value: any) => void;
  currentStep: number;
  setCurrentStep: (step: number) => void;
  totalSteps: number;
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

export function OnboardingProvider({ children }: { children: ReactNode }) {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 8; // Updated to include notifications step

  const [data, setData] = useState<OnboardingData>({
    nickname: "",
    aiPersona: "Balanced",
    gender: "Male",
    faiths: [],
    occupation: "",
    relationshipStatus: "",
    birthday: "",
    notificationTimes: [],
  });

  const updateData = (field: keyof OnboardingData, value: any) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <OnboardingContext.Provider
      value={{ data, updateData, currentStep, setCurrentStep, totalSteps }}
    >
      {children}
    </OnboardingContext.Provider>
  );
}

export function useOnboarding() {
  const context = useContext(OnboardingContext);
  if (context === undefined) {
    throw new Error("useOnboarding must be used within an OnboardingProvider");
  }
  return context;
}