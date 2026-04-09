import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { useOnboarding } from "../contexts/OnboardingContext";
import { saveProfile } from "../utils/profile";
import imgBack from "../../assets/e60e4637762be3f449b41c550b8780a6e47c0476.png";
import imgCheckedCheckbox from "../../assets/171c4d25e125328411307e42fff7c05578b730df.png";
import imgUncheckedCheckbox from "../../assets/dd4824a7d0ed2d936e77a7d155adb6308390984f.png";
import imgNotificationIllustration from "../../assets/131eaa1e886eb44ca09f06bdd372d27e88e00f7c.png";
import imgMascotLevitating from "../../assets/132f7480e00831bf915f0ff1c7f3a98ac0e578f5.png";

// Progress Bar Component
function ProgressBar({ step, total }: { step: number; total: number }) {
  const progress = (step / total) * 100;
  
  return (
    <div className="bg-[rgba(33,33,33,0.12)] relative rounded-[100px] shrink-0 w-full h-[8px]">
      <motion.div
        className="bg-[#ffcf48] h-full rounded-[100px]"
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      />
    </div>
  );
}

// Header Component
function OnboardingHeader({ onBack, onSkip }: { onBack: () => void; onSkip: () => void }) {
  return (
    <div className="content-stretch flex items-center justify-between py-[16px] relative shrink-0 w-full">
      <button
        onClick={onBack}
        className="relative shrink-0 size-[16px] cursor-pointer transition-opacity hover:opacity-70 active:opacity-50"
      >
        <img alt="Back" className="absolute inset-0 max-w-none object-contain pointer-events-none size-full" src={imgBack} />
      </button>
      <p className="font-['DM_Sans',sans-serif] font-bold leading-[20px] relative shrink-0 text-[15px] text-black whitespace-nowrap">
        Journal
      </p>
      <button
        onClick={onSkip}
        className="font-['DM_Sans',sans-serif] font-normal leading-[16px] relative shrink-0 text-[12px] text-[rgba(0,0,0,0.87)] whitespace-nowrap cursor-pointer bg-transparent border-none transition-opacity hover:opacity-70 active:opacity-50"
      >
        Skip
      </button>
    </div>
  );
}

// Step 1: Nickname
export function NicknameStep() {
  const navigate = useNavigate();
  const { data, updateData, currentStep, setCurrentStep, totalSteps } = useOnboarding();
  const [nickname, setNickname] = useState(data.nickname);
  const [isFocused, setIsFocused] = useState(false);

  const handleNext = () => {
    updateData("nickname", nickname);
    setCurrentStep(2);
    navigate("/onboarding/ai-persona");
  };

  const handleBack = () => {
    navigate("/sign-up");
  };

  const handleSkip = () => {
    // Skip to next step
    setCurrentStep(2);
    navigate("/onboarding/ai-persona");
  };

  return (
    <motion.div
      className="bg-white content-stretch flex flex-col items-start justify-between px-[16px] relative size-full"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
    >
      {/* Top Section */}
      <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full">
        <div className="content-stretch flex flex-col h-[56px] items-start relative shrink-0 w-full">
          <OnboardingHeader onBack={handleBack} onSkip={handleSkip} />
        </div>

        <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full">
          <ProgressBar step={currentStep} total={totalSteps} />
          <p className="font-['DM_Sans',sans-serif] font-semibold leading-[22px] relative shrink-0 text-[17px] text-black w-full">
            Please enter your nickname
          </p>
          <input
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Tap to start writing"
            className="font-['DM_Sans',sans-serif] font-normal leading-[22px] relative shrink-0 text-[17px] w-full bg-transparent border-none outline-none text-black placeholder:text-[rgba(0,0,0,0.6)] p-0 transition-colors"
          />
          <div className={`h-[1px] w-full transition-colors ${isFocused ? 'bg-[#ffcf48]' : 'bg-[rgba(0,0,0,0.1)]'}`} />
        </div>
      </div>

      {/* Bottom Section */}
      <div className="content-stretch flex flex-col items-start relative shrink-0 w-full pb-[16px]">
        <button
          onClick={handleNext}
          disabled={!nickname.trim()}
          className="bg-[#ffcf48] relative rounded-[100px] shrink-0 w-full cursor-pointer transition-all hover:bg-[#ffc829] active:bg-[#f0bd1e] disabled:opacity-38 disabled:cursor-not-allowed"
        >
          <div className="flex flex-row items-center justify-center size-full">
            <div className="content-stretch flex items-center justify-center p-[10px] relative w-full">
              <p className="font-['DM_Sans',sans-serif] font-normal leading-[21px] relative shrink-0 text-[16px] text-black whitespace-nowrap">
                Next
              </p>
            </div>
          </div>
        </button>
      </div>
    </motion.div>
  );
}

// Step 2: AI Persona
export function AIPersonaStep() {
  const navigate = useNavigate();
  const { data, updateData, currentStep, setCurrentStep, totalSteps } = useOnboarding();
  const [selected, setSelected] = useState(data.aiPersona);

  const options = ["Balanced", "Strategic", "Empathetic", "Objective"];

  const handleNext = () => {
    updateData("aiPersona", selected);
    setCurrentStep(3);
    navigate("/onboarding/gender");
  };

  const handleBack = () => {
    setCurrentStep(1);
    navigate("/onboarding/nickname");
  };

  const handleSkip = () => {
    // Skip to next step
    setCurrentStep(3);
    navigate("/onboarding/gender");
  };

  return (
    <motion.div
      className="bg-white content-stretch flex flex-col items-start justify-between px-[16px] relative size-full"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
    >
      {/* Top Section */}
      <div className="content-stretch flex flex-col gap-[35px] items-start relative shrink-0 w-full">
        <div className="content-stretch flex flex-col h-[56px] items-start relative shrink-0 w-full">
          <OnboardingHeader onBack={handleBack} onSkip={handleSkip} />
        </div>

        <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full">
          <ProgressBar step={currentStep} total={totalSteps} />
          <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full">
            <p className="font-['DM_Sans',sans-serif] font-semibold leading-[22px] relative shrink-0 text-[17px] text-black w-full">
              Let's make it personal with an AI persona
            </p>
          </div>

          <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full">
            {options.map((option) => (
              <button
                key={option}
                onClick={() => setSelected(option)}
                className={`relative rounded-[100px] shrink-0 w-full cursor-pointer transition-all ${
                  selected === option
                    ? "bg-[rgba(255,207,72,0.24)] hover:bg-[rgba(255,207,72,0.30)] active:bg-[rgba(255,207,72,0.40)]"
                    : "bg-transparent hover:bg-[rgba(0,0,0,0.02)] active:bg-[rgba(0,0,0,0.05)]"
                }`}
              >
                <div
                  aria-hidden="true"
                  className={`absolute border border-solid inset-[-1px] pointer-events-none rounded-[101px] ${
                    selected === option ? "border-[#ffcf48]" : "border-[rgba(0,0,0,0.12)]"
                  }`}
                />
                <div className="flex flex-row items-center size-full">
                  <div className="content-stretch flex gap-[16px] items-center px-[12px] py-[8px] relative w-full">
                    <p className="flex-[1_0_0] font-['DM_Sans',sans-serif] font-normal leading-[22px] min-h-px min-w-px relative text-[17px] text-black text-left">
                      {option}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="content-stretch flex flex-col gap-[8px] items-center relative shrink-0 w-full pb-[16px]">
        <button
          onClick={handleNext}
          className="bg-[#ffcf48] relative rounded-[100px] shrink-0 w-full cursor-pointer transition-all hover:bg-[#ffc829] active:bg-[#f0bd1e]"
        >
          <div className="flex flex-row items-center justify-center size-full">
            <div className="content-stretch flex items-center justify-center p-[10px] relative w-full">
              <p className="font-['DM_Sans',sans-serif] font-normal leading-[21px] relative shrink-0 text-[16px] text-black whitespace-nowrap">
                Next
              </p>
            </div>
          </div>
        </button>
        <p className="font-['DM_Sans',sans-serif] font-normal leading-[18px] relative shrink-0 text-[13px] text-[rgba(0,0,0,0.6)] text-center w-full">
          This can be changed later under preferences
        </p>
      </div>
    </motion.div>
  );
}

// Step 3: Gender
export function GenderStep() {
  const navigate = useNavigate();
  const { data, updateData, currentStep, setCurrentStep, totalSteps } = useOnboarding();
  const [selected, setSelected] = useState(data.gender);

  const options = ["Male", "Female", "Non-binary"];

  const handleNext = () => {
    updateData("gender", selected);
    setCurrentStep(4);
    navigate("/onboarding/occupation");
  };

  const handleBack = () => {
    setCurrentStep(2);
    navigate("/onboarding/ai-persona");
  };

  const handleSkip = () => {
    // Skip to next step
    setCurrentStep(4);
    navigate("/onboarding/occupation");
  };

  return (
    <motion.div
      className="bg-white content-stretch flex flex-col items-start justify-between px-[16px] relative size-full"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
    >
      {/* Top Section */}
      <div className="content-stretch flex flex-col gap-[35px] items-start relative shrink-0 w-full">
        <div className="content-stretch flex flex-col h-[56px] items-start relative shrink-0 w-full">
          <OnboardingHeader onBack={handleBack} onSkip={handleSkip} />
        </div>

        <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full">
          <ProgressBar step={currentStep} total={totalSteps} />
          <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full">
            <p className="font-['DM_Sans',sans-serif] font-semibold leading-[22px] relative shrink-0 text-[17px] text-black w-full">
              How do you identify?
            </p>
          </div>

          <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full">
            {options.map((option) => (
              <button
                key={option}
                onClick={() => setSelected(option)}
                className={`relative rounded-[100px] shrink-0 w-full cursor-pointer transition-all ${
                  selected === option
                    ? "bg-[rgba(255,207,72,0.24)] hover:bg-[rgba(255,207,72,0.30)] active:bg-[rgba(255,207,72,0.40)]"
                    : "bg-transparent hover:bg-[rgba(0,0,0,0.02)] active:bg-[rgba(0,0,0,0.05)]"
                }`}
              >
                <div
                  aria-hidden="true"
                  className={`absolute border border-solid inset-[-1px] pointer-events-none rounded-[101px] ${
                    selected === option ? "border-[#ffcf48]" : "border-[rgba(0,0,0,0.12)]"
                  }`}
                />
                <div className="flex flex-row items-center size-full">
                  <div className="content-stretch flex gap-[16px] items-center px-[12px] py-[8px] relative w-full">
                    <p className="flex-[1_0_0] font-['DM_Sans',sans-serif] font-normal leading-[22px] min-h-px min-w-px relative text-[17px] text-black text-left">
                      {option}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="content-stretch flex flex-col gap-[8px] items-center relative shrink-0 w-full pb-[16px]">
        <button
          onClick={handleNext}
          className="bg-[#ffcf48] relative rounded-[100px] shrink-0 w-full cursor-pointer transition-all hover:bg-[#ffc829] active:bg-[#f0bd1e]"
        >
          <div className="flex flex-row items-center justify-center size-full">
            <div className="content-stretch flex items-center justify-center p-[10px] relative w-full">
              <p className="font-['DM_Sans',sans-serif] font-normal leading-[21px] relative shrink-0 text-[16px] text-black whitespace-nowrap">
                Next
              </p>
            </div>
          </div>
        </button>
        <p className="font-['DM_Sans',sans-serif] font-normal leading-[18px] relative shrink-0 text-[13px] text-[rgba(0,0,0,0.6)] text-center w-full">
          This can be changed later under preferences
        </p>
      </div>
    </motion.div>
  );
}

// Step 4: Occupation
export function OccupationStep() {
  const navigate = useNavigate();
  const { data, updateData, currentStep, setCurrentStep, totalSteps } = useOnboarding();
  const [selected, setSelected] = useState(data.occupation);

  const options = ["Artist", "Entrepreneur", "Homemaker", "Office goer", "Retired", "Student", "Unemployed"];

  const handleNext = () => {
    updateData("occupation", selected);
    setCurrentStep(5);
    navigate("/onboarding/faith");
  };

  const handleBack = () => {
    setCurrentStep(3);
    navigate("/onboarding/gender");
  };

  const handleSkip = () => {
    // Skip to next step
    setCurrentStep(5);
    navigate("/onboarding/faith");
  };

  return (
    <motion.div
      className="bg-white content-stretch flex flex-col items-start justify-between px-[16px] relative size-full"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
    >
      {/* Top Section */}
      <div className="content-stretch flex flex-col gap-[35px] items-start relative shrink-0 w-full">
        <div className="content-stretch flex flex-col h-[56px] items-start relative shrink-0 w-full">
          <OnboardingHeader onBack={handleBack} onSkip={handleSkip} />
        </div>

        <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full">
          <ProgressBar step={currentStep} total={totalSteps} />
          <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full">
            <p className="font-['DM_Sans',sans-serif] font-semibold leading-[22px] relative shrink-0 text-[17px] text-black w-full">
              What do you do for a living?
            </p>
          </div>

          <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full">
            {options.map((option) => (
              <button
                key={option}
                onClick={() => setSelected(option)}
                className={`relative rounded-[100px] shrink-0 w-full cursor-pointer transition-all ${
                  selected === option
                    ? "bg-[rgba(255,207,72,0.24)] hover:bg-[rgba(255,207,72,0.30)] active:bg-[rgba(255,207,72,0.40)]"
                    : "bg-transparent hover:bg-[rgba(0,0,0,0.02)] active:bg-[rgba(0,0,0,0.05)]"
                }`}
              >
                <div
                  aria-hidden="true"
                  className={`absolute border border-solid inset-[-1px] pointer-events-none rounded-[101px] ${
                    selected === option ? "border-[#ffcf48]" : "border-[rgba(0,0,0,0.12)]"
                  }`}
                />
                <div className="flex flex-row items-center size-full">
                  <div className="content-stretch flex gap-[16px] items-center px-[12px] py-[8px] relative w-full">
                    <p className="flex-[1_0_0] font-['DM_Sans',sans-serif] font-normal leading-[22px] min-h-px min-w-px relative text-[17px] text-black text-left">
                      {option}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="content-stretch flex flex-col gap-[8px] items-center relative shrink-0 w-full pb-[16px]">
        <button
          onClick={handleNext}
          disabled={!selected}
          className="bg-[#ffcf48] relative rounded-[100px] shrink-0 w-full cursor-pointer transition-all hover:bg-[#ffc829] active:bg-[#f0bd1e] disabled:opacity-38 disabled:cursor-not-allowed"
        >
          <div className="flex flex-row items-center justify-center size-full">
            <div className="content-stretch flex items-center justify-center p-[10px] relative w-full">
              <p className="font-['DM_Sans',sans-serif] font-normal leading-[21px] relative shrink-0 text-[16px] text-black whitespace-nowrap">
                Next
              </p>
            </div>
          </div>
        </button>
        <p className="font-['DM_Sans',sans-serif] font-normal leading-[18px] relative shrink-0 text-[13px] text-[rgba(0,0,0,0.6)] text-center w-full">
          This can be changed later under preferences
        </p>
      </div>
    </motion.div>
  );
}

// Step 5: Faith
export function FaithStep() {
  const navigate = useNavigate();
  const { data, updateData, currentStep, setCurrentStep, totalSteps } = useOnboarding();
  const [selected, setSelected] = useState<string[]>(data.faiths);

  const options = ["Buddhism", "Christianity", "Hinduism", "Judaism", "Muslim", "Spiritual"];

  const toggleOption = (option: string) => {
    setSelected((prev) =>
      prev.includes(option) ? prev.filter((item) => item !== option) : [...prev, option]
    );
  };

  const handleNext = () => {
    updateData("faiths", selected);
    setCurrentStep(6);
    navigate("/onboarding/relationship-status");
  };

  const handleBack = () => {
    setCurrentStep(4);
    navigate("/onboarding/occupation");
  };

  const handleSkip = () => {
    // Skip to next step
    setCurrentStep(6);
    navigate("/onboarding/relationship-status");
  };

  return (
    <motion.div
      className="bg-white content-stretch flex flex-col items-start justify-between px-[16px] relative size-full"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
    >
      {/* Top Section */}
      <div className="content-stretch flex flex-col gap-[35px] items-start relative shrink-0 w-full">
        <div className="content-stretch flex flex-col h-[56px] items-start relative shrink-0 w-full">
          <OnboardingHeader onBack={handleBack} onSkip={handleSkip} />
        </div>

        <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full">
          <ProgressBar step={currentStep} total={totalSteps} />
          <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full">
            <p className="font-['DM_Sans',sans-serif] font-semibold leading-[22px] relative shrink-0 text-[17px] text-black w-full">
              What faith(s) do you believe in?
            </p>
            <p className="font-['DM_Sans',sans-serif] font-normal leading-[1.3] relative shrink-0 text-[12px] text-[rgba(0,0,0,0.6)] w-full">
              It need not necessarily be the one you practice
            </p>
          </div>

          <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full">
            {options.map((option) => {
              const isSelected = selected.includes(option);
              return (
                <button
                  key={option}
                  onClick={() => toggleOption(option)}
                  className={`relative rounded-[100px] shrink-0 w-full cursor-pointer transition-all ${
                    isSelected
                      ? "bg-[rgba(255,207,72,0.38)] hover:bg-[rgba(255,207,72,0.45)] active:bg-[rgba(255,207,72,0.55)]"
                      : "bg-transparent hover:bg-[rgba(0,0,0,0.02)] active:bg-[rgba(0,0,0,0.05)]"
                  }`}
                >
                  <div
                    aria-hidden="true"
                    className={`absolute border border-solid inset-[-1px] pointer-events-none rounded-[101px] ${
                      isSelected ? "border-[#ffcf48]" : "border-[rgba(0,0,0,0.12)]"
                    }`}
                  />
                  <div className="flex flex-row items-center size-full">
                    <div className="content-stretch flex gap-[16px] items-center px-[12px] py-[8px] relative w-full">
                      <div className="relative shrink-0 size-[24px]">
                        <img
                          alt=""
                          className="absolute inset-0 max-w-none object-contain pointer-events-none size-full"
                          src={isSelected ? imgCheckedCheckbox : imgUncheckedCheckbox}
                        />
                      </div>
                      <p className="flex-[1_0_0] font-['DM_Sans',sans-serif] font-normal leading-[22px] min-h-px min-w-px relative text-[17px] text-black text-left">
                        {option}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="content-stretch flex flex-col gap-[8px] items-center relative shrink-0 w-full pb-[16px]">
        <button
          onClick={handleNext}
          disabled={selected.length === 0}
          className="bg-[#ffcf48] relative rounded-[100px] shrink-0 w-full cursor-pointer transition-all hover:bg-[#ffc829] active:bg-[#f0bd1e] disabled:opacity-38 disabled:cursor-not-allowed"
        >
          <div className="flex flex-row items-center justify-center size-full">
            <div className="content-stretch flex items-center justify-center p-[10px] relative w-full">
              <p className="font-['DM_Sans',sans-serif] font-normal leading-[21px] relative shrink-0 text-[16px] text-black whitespace-nowrap">
                Next
              </p>
            </div>
          </div>
        </button>
        <p className="font-['DM_Sans',sans-serif] font-normal leading-[18px] relative shrink-0 text-[13px] text-[rgba(0,0,0,0.6)] text-center w-full">
          This can be changed later under preferences
        </p>
      </div>
    </motion.div>
  );
}

// Step 6: Relationship Status
export function RelationshipStatusStep() {
  const navigate = useNavigate();
  const { data, updateData, currentStep, setCurrentStep, totalSteps } = useOnboarding();
  const [selected, setSelected] = useState(data.relationshipStatus);

  const options = ["Committed", "Complicated", "Married", "Single"];

  const handleNext = () => {
    updateData("relationshipStatus", selected);
    setCurrentStep(7);
    navigate("/onboarding/birthday");
  };

  const handleBack = () => {
    setCurrentStep(5);
    navigate("/onboarding/faith");
  };

  const handleSkip = () => {
    // Skip to next step
    setCurrentStep(7);
    navigate("/onboarding/birthday");
  };

  return (
    <motion.div
      className="bg-white content-stretch flex flex-col items-start justify-between px-[16px] relative size-full"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
    >
      {/* Top Section */}
      <div className="content-stretch flex flex-col gap-[35px] items-start relative shrink-0 w-full">
        <div className="content-stretch flex flex-col h-[56px] items-start relative shrink-0 w-full">
          <OnboardingHeader onBack={handleBack} onSkip={handleSkip} />
        </div>

        <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full">
          <ProgressBar step={currentStep} total={totalSteps} />
          <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full">
            <p className="font-['DM_Sans',sans-serif] font-semibold leading-[22px] relative shrink-0 text-[17px] text-black w-full">
              Relationship status please
            </p>
          </div>

          <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full">
            {options.map((option) => (
              <button
                key={option}
                onClick={() => setSelected(option)}
                className={`relative rounded-[100px] shrink-0 w-full cursor-pointer transition-all ${
                  selected === option
                    ? "bg-[rgba(255,207,72,0.24)] hover:bg-[rgba(255,207,72,0.30)] active:bg-[rgba(255,207,72,0.40)]"
                    : "bg-transparent hover:bg-[rgba(0,0,0,0.02)] active:bg-[rgba(0,0,0,0.05)]"
                }`}
              >
                <div
                  aria-hidden="true"
                  className={`absolute border border-solid inset-[-1px] pointer-events-none rounded-[101px] ${
                    selected === option ? "border-[#ffcf48]" : "border-[rgba(0,0,0,0.12)]"
                  }`}
                />
                <div className="flex flex-row items-center size-full">
                  <div className="content-stretch flex gap-[16px] items-center px-[12px] py-[8px] relative w-full">
                    <p className="flex-[1_0_0] font-['DM_Sans',sans-serif] font-normal leading-[22px] min-h-px min-w-px relative text-[17px] text-black text-left">
                      {option}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="content-stretch flex flex-col gap-[8px] items-center relative shrink-0 w-full pb-[16px]">
        <button
          onClick={handleNext}
          disabled={!selected}
          className="bg-[#ffcf48] relative rounded-[100px] shrink-0 w-full cursor-pointer transition-all hover:bg-[#ffc829] active:bg-[#f0bd1e] disabled:opacity-38 disabled:cursor-not-allowed"
        >
          <div className="flex flex-row items-center justify-center size-full">
            <div className="content-stretch flex items-center justify-center p-[10px] relative w-full">
              <p className="font-['DM_Sans',sans-serif] font-normal leading-[21px] relative shrink-0 text-[16px] text-black whitespace-nowrap">
                Next
              </p>
            </div>
          </div>
        </button>
        <p className="font-['DM_Sans',sans-serif] font-normal leading-[18px] relative shrink-0 text-[13px] text-[rgba(0,0,0,0.6)] text-center w-full">
          This can be changed later under preferences
        </p>
      </div>
    </motion.div>
  );
}

// Step 7: Birthday
export function BirthdayStep() {
  const navigate = useNavigate();
  const { data, updateData, currentStep, setCurrentStep, totalSteps } = useOnboarding();
  const [birthday, setBirthday] = useState(data.birthday);
  const [isFocused, setIsFocused] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  const handleNext = async () => {
    // Prevent navigation while saving
    if (isSaving) {
      console.log("Already saving, please wait...");
      return;
    }

    updateData("birthday", birthday);
    setCurrentStep(8);
    navigate("/onboarding/notifications");
  };

  const handleBack = () => {
    setCurrentStep(6);
    navigate("/onboarding/relationship-status");
  };

  const handleSkip = () => {
    setCurrentStep(8);
    navigate("/onboarding/notifications");
  };

  return (
    <motion.div
      className="bg-white content-stretch flex flex-col items-start justify-between px-[16px] relative size-full"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
    >
      {/* Top Section */}
      <div className="content-stretch flex flex-col gap-[35px] items-start relative shrink-0 w-full">
        <div className="content-stretch flex flex-col h-[56px] items-start relative shrink-0 w-full">
          <OnboardingHeader onBack={handleBack} onSkip={handleSkip} />
        </div>

        <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full">
          <ProgressBar step={currentStep} total={totalSteps} />
          
          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 w-full">
              <p className="font-['DM_Sans',sans-serif] text-sm text-red-600">{error}</p>
            </div>
          )}
          
          <div className="content-stretch flex flex-col gap-[16px] items-start leading-[22px] relative shrink-0 text-[17px] w-full">
            <p className="font-['DM_Sans',sans-serif] font-semibold relative shrink-0 text-black w-full">
              When is your birthday?
            </p>
            <input
              type="date"
              value={birthday}
              onChange={(e) => setBirthday(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              max={new Date().toISOString().split('T')[0]}
              disabled={isSaving}
              className="font-['DM_Sans',sans-serif] font-normal relative shrink-0 w-full bg-transparent border-none outline-none text-black placeholder:text-[rgba(0,0,0,0.6)] p-0 transition-colors text-[17px] disabled:opacity-50"
            />
            <div className={`h-[1px] w-full transition-colors ${isFocused ? 'bg-[#ffcf48]' : 'bg-[rgba(0,0,0,0.1)]'}`} />
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="content-stretch flex flex-col items-start relative shrink-0 w-full pb-[16px]">
        <button
          onClick={handleNext}
          disabled={!birthday.trim() || isSaving}
          className="bg-[#ffcf48] relative rounded-[100px] shrink-0 w-full cursor-pointer transition-all hover:bg-[#ffc829] active:bg-[#f0bd1e] disabled:opacity-38 disabled:cursor-not-allowed"
        >
          <div className="flex flex-row items-center justify-center size-full">
            <div className="content-stretch flex items-center justify-center p-[10px] relative w-full">
              <p className="font-['DM_Sans',sans-serif] font-normal leading-[21px] relative shrink-0 text-[16px] text-black whitespace-nowrap">
                {isSaving ? "Saving..." : "Next"}
              </p>
            </div>
          </div>
        </button>
      </div>
    </motion.div>
  );
}

// Step 8: Notifications
export function NotificationsStep() {
  const navigate = useNavigate();
  const { data, updateData, currentStep, setCurrentStep, totalSteps } = useOnboarding();
  const [selectedTimes, setSelectedTimes] = useState<string[]>(data.notificationTimes);
  const [showCustomPicker, setShowCustomPicker] = useState(false);
  const [customTime, setCustomTime] = useState("12:00");
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  const timeOptions = ["10:00 am", "12:00 pm", "5:00 pm", "9:00 pm"];

  const toggleTime = (time: string) => {
    setSelectedTimes((prev) =>
      prev.includes(time) ? prev.filter((t) => t !== time) : [...prev, time]
    );
  };

  const handleCustomClick = () => {
    setShowCustomPicker(!showCustomPicker);
  };

  // Check if there's a custom time (not in preset options)
  const customSelectedTime = selectedTimes.find(time => !timeOptions.includes(time));

  const handleCustomButtonClick = () => {
    if (customSelectedTime) {
      // Remove the custom time if one exists
      setSelectedTimes((prev) => prev.filter((t) => t !== customSelectedTime));
    } else {
      // Show picker if no custom time selected
      setShowCustomPicker(true);
    }
  };

  const handleAddCustomTime = () => {
    if (customTime) {
      // Convert 24h format to 12h format with am/pm
      const [hours, minutes] = customTime.split(':');
      const hour = parseInt(hours);
      const ampm = hour >= 12 ? 'pm' : 'am';
      const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
      const formattedTime = `${displayHour}:${minutes} ${ampm}`;
      
      if (!selectedTimes.includes(formattedTime)) {
        setSelectedTimes((prev) => [...prev, formattedTime]);
      }
      setShowCustomPicker(false);
      setCustomTime("12:00");
    }
  };

  const handleNext = async () => {
    if (isSaving) {
      console.log("Already saving, please wait...");
      return;
    }

    updateData("notificationTimes", selectedTimes);

    // Save profile to Appwrite
    setIsSaving(true);
    setError("");

    try {
      const accessToken = localStorage.getItem("access_token");

      console.log("=== NOTIFICATIONS STEP: STARTING PROFILE SAVE ===");
      console.log("Notification times:", selectedTimes);
      console.log("Access token from localStorage:", accessToken ? `Found (${accessToken.substring(0, 30)}...)` : "NOT FOUND");

      if (!accessToken) {
        console.error("❌ CRITICAL: No access token found in localStorage");
        console.log("All localStorage keys:", Object.keys(localStorage));
        setError("You must be logged in to save your profile. Redirecting to sign in...");
        setTimeout(() => navigate("/sign-in"), 2000);
        setIsSaving(false);
        return;
      }

      const profileData = {
        ...data,
        notificationTimes: selectedTimes,
      };

      console.log("📦 Profile data to save:", JSON.stringify(profileData, null, 2));
      console.log("🚀 Making API call to save profile...");

      const result = await saveProfile(accessToken, profileData);

      console.log("📥 Save profile result:", JSON.stringify(result, null, 2));

      if (!result.success) {
        const errorMsg = result.error || "Unknown error occurred";
        setError(`Failed to save profile: ${errorMsg}`);
        setIsSaving(false);
        return;
      }

      await new Promise(resolve => setTimeout(resolve, 500));
      navigate("/onboarding/loading");
    } catch (error) {
      console.error("💥 Exception while saving profile:", error);
      const errorMsg = error instanceof Error ? error.message : "Failed to save profile. Please try again.";
      setError(errorMsg);
      setIsSaving(false);
    }
  };

  const handleBack = () => {
    setCurrentStep(7);
    navigate("/onboarding/birthday");
  };

  const handleSkip = async () => {
    // Save without notification times
    updateData("notificationTimes", []);
    
    setIsSaving(true);
    setError("");

    try {
      const accessToken = localStorage.getItem("access_token");

      if (!accessToken) {
        setError("You must be logged in. Redirecting to sign in...");
        setTimeout(() => navigate("/sign-in"), 2000);
        setIsSaving(false);
        return;
      }

      const profileData = {
        ...data,
        notificationTimes: [],
      };

      const result = await saveProfile(accessToken, profileData);

      if (!result.success) {
        const errorMsg = result.error || "Unknown error occurred";
        setError(`Failed to save profile: ${errorMsg}`);
        setIsSaving(false);
        return;
      }

      await new Promise(resolve => setTimeout(resolve, 500));
      navigate("/dashboard");
    } catch (error) {
      console.error("Exception while saving profile:", error);
      const errorMsg = error instanceof Error ? error.message : "Failed to save profile. Please try again.";
      setError(errorMsg);
      setIsSaving(false);
    }
  };

  return (
    <motion.div
      className="bg-white content-stretch flex flex-col items-start justify-between px-[16px] relative size-full"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
    >
      {/* Top Section */}
      <div className="content-stretch flex flex-col gap-[35px] items-start relative shrink-0 w-full">
        <div className="content-stretch flex flex-col h-[56px] items-start relative shrink-0 w-full">
          <OnboardingHeader onBack={handleBack} onSkip={handleSkip} />
        </div>

        <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full">
          <ProgressBar step={currentStep} total={totalSteps} />

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 w-full">
              <p className="font-['DM_Sans',sans-serif] text-sm text-red-600">{error}</p>
            </div>
          )}

          {/* Illustration */}
          <div className="w-full flex justify-center py-4">
            <img
              src={imgNotificationIllustration}
              alt="Notification illustration"
              className="w-48 h-48 object-contain"
            />
          </div>

          <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full">
            <p className="font-['DM_Sans',sans-serif] font-semibold leading-[22px] relative shrink-0 text-[17px] text-black w-full">
              People say I'm too sticky! so, let's pick a few times to meet daily
            </p>
          </div>

          {/* Pill-style time options */}
          <div className="content-stretch flex flex-wrap gap-[16px] items-start relative shrink-0 w-full">
            {timeOptions.map((time) => {
              const isSelected = selectedTimes.includes(time);
              return (
                <button
                  key={time}
                  onClick={() => toggleTime(time)}
                  disabled={isSaving}
                  className={`content-stretch flex gap-[8px] items-start px-[12px] py-[8px] relative rounded-[100px] shrink-0 cursor-pointer transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
                    isSelected
                      ? "bg-[#212121] hover:bg-[#353535] active:bg-[#454545]"
                      : "bg-transparent hover:bg-[rgba(0,0,0,0.02)] active:bg-[rgba(0,0,0,0.05)]"
                  }`}
                >
                  <div
                    aria-hidden="true"
                    className="absolute border border-[rgba(0,0,0,0.38)] border-solid inset-[-1px] pointer-events-none rounded-[101px]"
                  />
                  <p className={`font-['DM_Sans',sans-serif] font-normal leading-[1.4] relative shrink-0 text-[16px] whitespace-nowrap ${
                    isSelected ? "text-white" : "text-black"
                  }`}>
                    {time}
                  </p>
                </button>
              );
            })}
            
            {/* Custom button with inline time picker */}
            <div
              className={`content-stretch flex gap-[8px] items-center px-[12px] py-[8px] relative rounded-[100px] shrink-0 transition-all ${
                showCustomPicker || customSelectedTime
                  ? "bg-[#212121] hover:bg-[#353535] active:bg-[#454545]"
                  : "bg-transparent hover:bg-[rgba(0,0,0,0.02)] active:bg-[rgba(0,0,0,0.05)]"
              }`}
            >
              <div
                aria-hidden="true"
                className="absolute border border-[rgba(0,0,0,0.38)] border-solid inset-[-1px] pointer-events-none rounded-[101px]"
              />
              {showCustomPicker ? (
                <input
                  type="time"
                  value={customTime}
                  onChange={(e) => setCustomTime(e.target.value)}
                  onBlur={() => {
                    // Add the time when clicking outside
                    if (customTime) {
                      const [hours, minutes] = customTime.split(':');
                      const hour = parseInt(hours);
                      const ampm = hour >= 12 ? 'pm' : 'am';
                      const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
                      const formattedTime = `${displayHour}:${minutes} ${ampm}`;
                      
                      if (!selectedTimes.includes(formattedTime)) {
                        setSelectedTimes((prev) => [...prev, formattedTime]);
                      }
                    }
                    setShowCustomPicker(false);
                    setCustomTime("12:00");
                  }}
                  autoFocus
                  disabled={isSaving}
                  className="font-['DM_Sans',sans-serif] font-normal leading-[1.4] relative shrink-0 text-[16px] text-white whitespace-nowrap bg-transparent border-none outline-none p-0 disabled:opacity-50 disabled:cursor-not-allowed [color-scheme:dark] w-[80px]"
                />
              ) : (
                <button
                  onClick={handleCustomButtonClick}
                  disabled={isSaving}
                  className={`font-['DM_Sans',sans-serif] font-normal leading-[1.4] relative shrink-0 text-[16px] whitespace-nowrap cursor-pointer bg-transparent border-none p-0 disabled:opacity-50 disabled:cursor-not-allowed ${
                    customSelectedTime ? "text-white" : "text-black"
                  }`}
                >
                  {customSelectedTime || "Custom"}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="content-stretch flex flex-col gap-[8px] items-center relative shrink-0 w-full pb-[16px]">
        <button
          onClick={handleNext}
          disabled={selectedTimes.length === 0 || isSaving}
          className="bg-[#ffcf48] relative rounded-[100px] shrink-0 w-full cursor-pointer transition-all hover:bg-[#ffc829] active:bg-[#f0bd1e] disabled:opacity-38 disabled:cursor-not-allowed"
        >
          <div className="flex flex-row items-center justify-center size-full">
            <div className="content-stretch flex items-center justify-center p-[10px] relative w-full">
              <p className="font-['DM_Sans',sans-serif] font-normal leading-[21px] relative shrink-0 text-[16px] text-black whitespace-nowrap">
                {isSaving ? "Saving..." : "Complete"}
              </p>
            </div>
          </div>
        </button>
        <p className="font-['DM_Sans',sans-serif] font-normal leading-[18px] relative shrink-0 text-[13px] text-[rgba(0,0,0,0.6)] text-center w-full">
          This can be changed later under preferences
        </p>
      </div>
    </motion.div>
  );
}

// Loading Step
export function LoadingStep() {
  const navigate = useNavigate();

  useEffect(() => {
    // Auto-navigate to dashboard after 3 seconds
    const timer = setTimeout(() => {
      navigate("/dashboard");
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <motion.div
      className="bg-white content-stretch flex flex-col items-center justify-center px-[16px] relative size-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Animated levitating mascot */}
      <motion.div
        className="max-h-[150px] max-w-[150px] relative shrink-0 size-[150px] mb-6"
        animate={{
          y: [-10, 10, -10],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <img
          alt="Loading mascot"
          className="absolute inset-0 max-w-none object-cover pointer-events-none size-full"
          src={imgMascotLevitating}
        />
      </motion.div>

      {/* Loading text */}
      <p className="font-['DM_Sans',sans-serif] font-normal leading-[18px] max-w-[200px] relative shrink-0 text-[13px] text-[rgba(0,0,0,0.6)] text-center">
        Personalizing the experience for you
      </p>
    </motion.div>
  );
}