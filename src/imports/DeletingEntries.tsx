import svgPaths from "./svg-m8miuujrwb";
import imgBack from "figma:asset/e60e4637762be3f449b41c550b8780a6e47c0476.png";
import imgMenuVertical from "figma:asset/b2774143423e71485a704f9730d2a104faf4226b.png";
import imgLock from "figma:asset/ef753b695b0845109003a51fdcf17838a0edde82.png";
import imgDelete from "figma:asset/6161d1e0b2947f1636808ce7b712646d605ee7e8.png";
import imgFrame8637 from "figma:asset/d03113c7b33af245750f4650afa7243df5938af5.png";
import imgFrame8638 from "figma:asset/b1e27634552f1e908c50e51742e25ec8fa5211d0.png";
import imgFrame8639 from "figma:asset/1d31f5a21d449ef3754bc8fefcf831dc0b73f236.png";
import imgXlargeIcons from "figma:asset/951682e4223c22ec85fa3820295fece43cc29eab.png";
import imgMicrophone from "figma:asset/f6e225d1d7bed07d025a199c40de73151fac42c5.png";
import imgSignUp from "figma:asset/f387def340aeea59ee5b04bffb6cadb926a90695.png";

function Frame() {
  return (
    <div className="content-stretch flex items-center justify-between py-[16px] relative shrink-0 w-full">
      <div className="relative shrink-0 size-[16px]" data-name="Back">
        <img alt="" className="absolute inset-0 max-w-none object-contain pointer-events-none size-full" src={imgBack} />
      </div>
      <p className="font-['DM_Sans:Bold',sans-serif] font-bold leading-[20px] relative shrink-0 text-[15px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        Journal
      </p>
      <div className="relative shrink-0 size-[16px]" data-name="Menu Vertical">
        <img alt="" className="absolute inset-0 max-w-none object-contain pointer-events-none size-full" src={imgMenuVertical} />
      </div>
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex gap-[4px] items-center justify-center relative shrink-0">
      <div className="relative shrink-0 size-[16px]" data-name="Lock">
        <img alt="" className="absolute inset-0 max-w-none object-contain opacity-38 pointer-events-none size-full" src={imgLock} />
      </div>
      <p className="font-['DM_Sans:Regular',sans-serif] font-normal leading-[18px] relative shrink-0 text-[13px] text-[rgba(0,0,0,0.6)] whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        Your data is protected
      </p>
    </div>
  );
}

function Frame2() {
  return (
    <div className="content-stretch flex items-center justify-between py-[8px] relative shrink-0 w-full">
      <p className="font-['DM_Sans:SemiBold',sans-serif] font-semibold leading-[28px] relative shrink-0 text-[22px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        Sun, Feb 22
      </p>
      <Frame1 />
    </div>
  );
}

function Frame11() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
      <Frame />
      <Frame2 />
    </div>
  );
}

function Frame10() {
  return (
    <div className="bg-[#e86a2a] relative self-stretch shrink-0">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex h-full items-center p-[16px] relative">
          <div className="relative shrink-0 size-[32px]" data-name="Delete">
            <img alt="" className="absolute inset-0 max-w-none object-contain pointer-events-none size-full" src={imgDelete} />
          </div>
        </div>
      </div>
    </div>
  );
}

function Delete() {
  return (
    <div className="content-stretch flex gap-[24px] items-start relative shrink-0 w-full" data-name="delete">
      <p className="font-['DM_Sans:Regular',sans-serif] font-normal leading-[1.3] relative shrink-0 text-[12px] text-[rgba(0,0,0,0.6)] whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        9:00 am
      </p>
      <p className="flex-[1_0_0] font-['DM_Sans:Regular',sans-serif] font-normal leading-[1.4] min-h-px min-w-px relative text-[16px] text-black" style={{ fontVariationSettings: "'opsz' 14" }}>{`Umm kinda rough start I’d say, woke up late, currently in the bus, got no time, byeee `}</p>
      <Frame10 />
    </div>
  );
}

function Frame4() {
  return (
    <div className="aspect-[48/48] flex-[1_0_0] min-h-px min-w-px overflow-clip relative">
      <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[206.763px] left-[calc(50%+0.27px)] top-[calc(50%+0.38px)] w-[226.54px]" data-name="Vector">
        <div className="absolute inset-[-0.69%_-0.63%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 229.396 209.62">
            <path d={svgPaths.p2638af20} id="Vector" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeWidth="2.85657" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Frame3() {
  return (
    <div className="aspect-[48/48] pointer-events-none relative rounded-[8px] size-full">
      <img alt="" className="absolute inset-0 max-w-none object-cover rounded-[8px] size-full" src={imgFrame8637} />
      <div aria-hidden="true" className="absolute border-4 border-solid border-white inset-[-4px] rounded-[12px] shadow-[0px_4px_16px_0px_rgba(0,0,0,0.12)]" />
    </div>
  );
}

function Frame5() {
  return (
    <div className="aspect-[48/48] pointer-events-none relative rounded-[8px] size-full">
      <img alt="" className="absolute inset-0 max-w-none object-cover rounded-[8px] size-full" src={imgFrame8638} />
      <div aria-hidden="true" className="absolute border-4 border-solid border-white inset-[-4px] rounded-[12px] shadow-[0px_4px_16px_0px_rgba(0,0,0,0.12)]" />
    </div>
  );
}

function Frame6() {
  return (
    <div className="aspect-[48/48] pointer-events-none relative rounded-[8px] size-full">
      <img alt="" className="absolute inset-0 max-w-none object-cover rounded-[8px] size-full" src={imgFrame8639} />
      <div aria-hidden="true" className="absolute border-4 border-solid border-white inset-[-4px] rounded-[12px] shadow-[0px_4px_16px_0px_rgba(0,0,0,0.12)]" />
    </div>
  );
}

function Frame9() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-center min-h-px min-w-px pr-[4px] relative">
      <div className="flex flex-[1_0_0] h-[102.463px] items-center justify-center max-h-[150px] max-w-[150px] min-h-px min-w-px mr-[-4px] relative" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "19" } as React.CSSProperties}>
        <div className="-rotate-4 flex-none w-full">
          <Frame3 />
        </div>
      </div>
      <div className="flex flex-[1_0_0] h-[102.463px] items-center justify-center max-h-[150px] max-w-[150px] min-h-px min-w-px mr-[-4px] relative" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "19" } as React.CSSProperties}>
        <div className="flex-none rotate-4 w-full">
          <Frame5 />
        </div>
      </div>
      <div className="flex flex-[1_0_0] h-[102.463px] items-center justify-center max-h-[150px] max-w-[150px] min-h-px min-w-px mr-[-4px] relative" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "19" } as React.CSSProperties}>
        <div className="-rotate-4 flex-none w-full">
          <Frame6 />
        </div>
      </div>
    </div>
  );
}

function Frame13() {
  return (
    <div className="absolute content-stretch flex inset-[20.46px_34px_49.51px_226px] items-center">
      <div className="bg-[#7dc66b] flex-[1_0_0] h-full min-h-px min-w-px" />
    </div>
  );
}

function Frame8() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[8px] items-start justify-center min-h-px min-w-px relative">
      <Frame13 />
      <p className="font-['DM_Sans:Regular',sans-serif] font-normal leading-[1.4] min-w-full relative shrink-0 text-[16px] text-black w-[min-content]" style={{ fontVariationSettings: "'opsz' 14" }}>
        It was a long yet productive day actually phew! My eyes get dry so fast, gotta do something
      </p>
      <p className="font-['DM_Sans:Regular',sans-serif] font-normal leading-[1.4] min-w-full relative shrink-0 text-[16px] text-black w-[min-content]" style={{ fontVariationSettings: "'opsz' 14" }}>
        My boss liked the ppt!
      </p>
    </div>
  );
}

function Component() {
  return (
    <div className="content-stretch flex gap-[24px] items-start relative shrink-0 w-full" data-name="Component 4">
      <p className="font-['DM_Sans:Regular',sans-serif] font-normal leading-[1.3] relative shrink-0 text-[12px] text-[rgba(0,0,0,0.6)] whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        5:00 pm
      </p>
      <Frame8 />
    </div>
  );
}

function Component1() {
  return (
    <div className="content-stretch flex gap-[24px] items-start relative shrink-0 w-full" data-name="Component 6">
      <p className="font-['DM_Sans:Regular',sans-serif] font-normal leading-[1.3] relative shrink-0 text-[12px] text-[rgba(0,0,0,0.6)] whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        6:13 pm
      </p>
      <div className="absolute bg-[#9bccff] inset-[1.46px_22px_21.54px_211px]" />
      <p className="flex-[1_0_0] font-['DM_Sans:Regular',sans-serif] font-normal leading-[1.4] min-h-px min-w-px relative text-[16px] text-black" style={{ fontVariationSettings: "'opsz' 14" }}>
        Walking to the bus. Slight headache, shit! I feel so lazy, though!
      </p>
    </div>
  );
}

function Frame12() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-full">
      <div className="content-stretch flex flex-col gap-[24px] items-start py-[24px] relative size-full">
        <Delete />
        <div className="content-stretch flex gap-[24px] items-start relative shrink-0 w-full" data-name="Component 2">
          <p className="font-['DM_Sans:Regular',sans-serif] font-normal leading-[16px] relative shrink-0 text-[12px] text-[rgba(0,0,0,0.6)] whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
            9:18 am
          </p>
          <Frame4 />
        </div>
        <div className="content-stretch flex gap-[24px] items-start relative shrink-0 w-full" data-name="Component 3">
          <p className="font-['DM_Sans:Regular',sans-serif] font-normal leading-[16px] relative shrink-0 text-[12px] text-[rgba(0,0,0,0.6)] whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
            12:12 pm
          </p>
          <Frame9 />
        </div>
        <Component />
        <Component1 />
        <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="Component 5">
          <p className="flex-[1_0_0] font-['DM_Sans:Regular',sans-serif] font-normal leading-[16px] min-h-px min-w-px relative text-[12px] text-[rgba(0,0,0,0.6)]" style={{ fontVariationSettings: "'opsz' 14" }}>
            6:28 pm
          </p>
        </div>
      </div>
    </div>
  );
}

function Frame7() {
  return (
    <div className="bg-white content-stretch flex items-center p-[16px] relative rounded-[100px] shrink-0">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.12)] border-solid inset-0 pointer-events-none rounded-[100px]" />
      <div className="relative shrink-0 size-[32px]" data-name="Xlarge Icons">
        <img alt="" className="absolute inset-0 max-w-none object-contain pointer-events-none size-full" src={imgXlargeIcons} />
      </div>
    </div>
  );
}

export default function DeletingEntries() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start justify-between px-[16px] relative size-full" data-name="deleting entries">
      <Frame11 />
      <Frame12 />
      <div className="content-stretch flex items-center justify-between py-[12px] relative shrink-0 w-full">
        <Frame7 />
        <div className="bg-[#ffcf48] content-stretch flex items-center p-[16px] relative rounded-[100px] shrink-0" data-name="Voice">
          <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.12)] border-solid inset-0 pointer-events-none rounded-[100px]" />
          <div className="relative shrink-0 size-[32px]" data-name="Microphone">
            <img alt="" className="absolute inset-0 max-w-none object-contain pointer-events-none size-full" src={imgMicrophone} />
          </div>
        </div>
        <div className="bg-white content-stretch flex items-center p-[16px] relative rounded-[100px] shrink-0" data-name="Draw">
          <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.12)] border-solid inset-0 pointer-events-none rounded-[100px]" />
          <div className="relative shrink-0 size-[32px]" data-name="Sign Up">
            <img alt="" className="absolute inset-0 max-w-none object-contain pointer-events-none size-full" src={imgSignUp} />
          </div>
        </div>
      </div>
    </div>
  );
}