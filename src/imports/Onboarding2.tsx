import imgOnboarding2 from "../assets/26f7b194d0cf90b6ece947bb4336e18f5c396493.png";
import imgFrame8769 from "../assets/3c7747242e1d842706ae83d8f0b3983d193bc445.png";
import { motion } from "motion/react";

function Frame2() {
  return (
    <div className="h-[56px] relative shrink-0 w-[99.556px]">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgFrame8769} />
    </div>
  );
}

function Frame() {
  return (
    <div className="content-stretch flex items-center justify-center py-[16px] relative shrink-0 w-full">
      <Frame2 />
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex flex-col h-[88px] items-start relative shrink-0 w-full">
      <Frame />
    </div>
  );
}

function Frame5() {
  return <div className="bg-[#ffcf48] flex-[1_0_0] h-[8px] min-h-px min-w-px rounded-[100px]" />;
}

function Frame4({ progress }: { progress: number }) {
  return (
    <div className="relative flex-[1_0_0] h-[8px] min-h-px min-w-px rounded-[100px] bg-white overflow-hidden">
      <div
        className="absolute inset-y-0 left-0 bg-[#ffcf48] rounded-[100px] transition-all duration-[50ms] ease-linear"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

function Frame6({ progress }: { progress: number }) {
  return (
    <div className="relative flex-[1_0_0] h-[8px] min-h-px min-w-px rounded-[100px] bg-white overflow-hidden">
      <div
        className="absolute inset-y-0 left-0 bg-[#ffcf48] rounded-[100px] transition-all duration-[50ms] ease-linear"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

function Progress({ progress }: { progress: number }) {
  return (
    <div className="content-stretch flex gap-[16px] items-center p-[8px] relative shrink-0 w-[303px]" data-name="progress">
      <Frame5 />
      <Frame4 progress={progress} />
      <Frame6 progress={0} />
    </div>
  );
}

function Frame3({ progress }: { progress: number }) {
  const lines = [
    "Typing is outdated",
    "speaking is real."
  ];

  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start py-[16px] relative shrink-0 w-full">
      <Progress progress={progress} />
      <div className="font-['MuseoModerno',sans-serif] font-bold text-[56px] leading-[48px] text-[#FFF] min-w-full relative shrink-0 w-[min-content]">
        {lines.map((line, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.5, 
              delay: index * 0.15,
              ease: "easeOut" 
            }}
          >
            {line}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default function Onboarding({ progress = 0 }: { progress?: number }) {
  return (
    <div className="content-stretch flex flex-col items-start px-[16px] relative min-h-screen" data-name="Onboarding-2">
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <img alt="" className="absolute max-w-none object-cover size-full" src={imgOnboarding2} />
        <div className="absolute bg-gradient-to-b from-[61.42%] from-[rgba(0,0,0,0)] inset-0 to-[71.074%] to-[rgba(0,0,0,0.2)]" />
      </div>
      <Frame1 />
      <div className="mt-auto w-full">
        <Frame3 progress={progress} />
      </div>
    </div>
  );
}
