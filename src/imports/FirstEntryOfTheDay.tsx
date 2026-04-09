import imgBack from "figma:asset/e60e4637762be3f449b41c550b8780a6e47c0476.png";
import imgMenuVertical from "figma:asset/b2774143423e71485a704f9730d2a104faf4226b.png";
import imgLock from "figma:asset/ef753b695b0845109003a51fdcf17838a0edde82.png";
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
        Sat, Feb 21
      </p>
      <Frame1 />
    </div>
  );
}

function Frame4() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
      <Frame />
      <Frame2 />
    </div>
  );
}

function Frame5() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-full">
      <div className="content-stretch flex flex-col items-start py-[24px] relative size-full">
        <div className="content-stretch flex font-['DM_Sans:Regular',sans-serif] font-normal gap-[24px] items-start relative shrink-0 w-full" data-name="Entry">
          <p className="leading-[16px] relative shrink-0 text-[12px] text-[rgba(0,0,0,0.6)] whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
            7:00 am
          </p>
          <p className="flex-[1_0_0] leading-[22px] min-h-px min-w-px relative text-[17px] text-[rgba(0,0,0,0.38)] whitespace-pre-wrap" style={{ fontVariationSettings: "'opsz' 14" }}>{`Yesterday was a lil rough, that’s okay. We’ve been through crazier shit before from staying up 2 days for an exam that was eventually canceled & the other time when you farted thinking no one would notice! New day, new start!  `}</p>
        </div>
      </div>
    </div>
  );
}

function Frame3() {
  return (
    <div className="bg-white content-stretch flex items-center p-[16px] relative rounded-[100px] shrink-0">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.12)] border-solid inset-0 pointer-events-none rounded-[100px]" />
      <div className="relative shrink-0 size-[32px]" data-name="Xlarge Icons">
        <img alt="" className="absolute inset-0 max-w-none object-contain pointer-events-none size-full" src={imgXlargeIcons} />
      </div>
    </div>
  );
}

export default function FirstEntryOfTheDay() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start justify-between px-[16px] relative size-full" data-name="First entry of the day">
      <Frame4 />
      <Frame5 />
      <div className="content-stretch flex items-center justify-between py-[12px] relative shrink-0 w-full">
        <Frame3 />
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