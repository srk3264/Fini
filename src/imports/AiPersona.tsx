import imgBack from "figma:asset/e60e4637762be3f449b41c550b8780a6e47c0476.png";
import imgHome from "figma:asset/d844412a0fd090db82b0a80f51b36ac0b22b0c10.png";
import imgGeography from "figma:asset/b48367ac4593171dc5ca8eb2fd63325d7fa3c2a1.png";
import imgPerson from "figma:asset/01c8ce85412a1e78ace257ad64db10a6091c1c5a.png";
import imgShoppingCart from "figma:asset/1e3ba6650f8888503e7dba56da8cc325edfc3943.png";

function Frame() {
  return (
    <div className="content-stretch flex items-center justify-between py-[16px] relative shrink-0 w-full">
      <div className="relative shrink-0 size-[16px]" data-name="Back">
        <img alt="" className="absolute inset-0 max-w-none object-contain pointer-events-none size-full" src={imgBack} />
      </div>
      <p className="font-['DM_Sans:Bold',sans-serif] font-bold leading-[20px] relative shrink-0 text-[15px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        Journal
      </p>
      <p className="font-['DM_Sans:Regular',sans-serif] font-normal leading-[16px] relative shrink-0 text-[12px] text-[rgba(0,0,0,0.87)] whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        Skip
      </p>
    </div>
  );
}

function Frame5() {
  return (
    <div className="content-stretch flex flex-col h-[56px] items-start relative shrink-0 w-full">
      <Frame />
    </div>
  );
}

function Loader() {
  return (
    <div className="bg-[rgba(33,33,33,0.12)] relative rounded-[100px] shrink-0 w-full" data-name="loader">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center pr-[291px] relative w-full">
          <div className="bg-[#ffcf48] flex-[1_0_0] h-[8px] min-h-px min-w-px" />
        </div>
      </div>
    </div>
  );
}

function Frame7() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full">
      <p className="font-['DM_Sans:SemiBold',sans-serif] font-semibold leading-[22px] relative shrink-0 text-[17px] text-black w-full" style={{ fontVariationSettings: "'opsz' 14" }}>
        Let’s make it personal with an AI persona
      </p>
    </div>
  );
}

function Frame9() {
  return (
    <div className="bg-[rgba(255,207,72,0.24)] relative rounded-[100px] shrink-0 w-full">
      <div aria-hidden="true" className="absolute border border-[#ffcf48] border-solid inset-[-1px] pointer-events-none rounded-[101px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[16px] items-center px-[12px] py-[8px] relative w-full">
          <p className="flex-[1_0_0] font-['DM_Sans:Regular',sans-serif] font-normal leading-[22px] min-h-px min-w-px relative text-[17px] text-black" style={{ fontVariationSettings: "'opsz' 14" }}>
            Balanced
          </p>
        </div>
      </div>
    </div>
  );
}

function Frame10() {
  return (
    <div className="relative rounded-[100px] shrink-0 w-full">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.12)] border-solid inset-[-1px] pointer-events-none rounded-[101px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[16px] items-center px-[12px] py-[8px] relative w-full">
          <p className="flex-[1_0_0] font-['DM_Sans:Regular',sans-serif] font-normal leading-[22px] min-h-px min-w-px relative text-[17px] text-black" style={{ fontVariationSettings: "'opsz' 14" }}>
            Strategic
          </p>
        </div>
      </div>
    </div>
  );
}

function Frame14() {
  return (
    <div className="relative rounded-[100px] shrink-0 w-full">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.12)] border-solid inset-[-1px] pointer-events-none rounded-[101px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[16px] items-center px-[12px] py-[8px] relative w-full">
          <p className="flex-[1_0_0] font-['DM_Sans:Regular',sans-serif] font-normal leading-[22px] min-h-px min-w-px relative text-[17px] text-black" style={{ fontVariationSettings: "'opsz' 14" }}>
            Empathetic
          </p>
        </div>
      </div>
    </div>
  );
}

function Frame15() {
  return (
    <div className="relative rounded-[100px] shrink-0 w-full">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.12)] border-solid inset-[-1px] pointer-events-none rounded-[101px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[16px] items-center px-[12px] py-[8px] relative w-full">
          <p className="flex-[1_0_0] font-['DM_Sans:Regular',sans-serif] font-normal leading-[22px] min-h-px min-w-px relative text-[17px] text-black" style={{ fontVariationSettings: "'opsz' 14" }}>
            Objective
          </p>
        </div>
      </div>
    </div>
  );
}

function Frame11() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full">
      <Frame9 />
      <Frame10 />
      <Frame14 />
      <Frame15 />
    </div>
  );
}

function Frame12() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full">
      <Loader />
      <Frame7 />
      <Frame11 />
    </div>
  );
}

function Frame13() {
  return (
    <div className="content-stretch flex flex-col gap-[35px] items-start relative shrink-0 w-full">
      <Frame5 />
      <Frame12 />
    </div>
  );
}

function Frame6() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-center relative shrink-0 w-full">
      <p className="font-['DM_Sans:Regular',sans-serif] font-normal leading-[18px] relative shrink-0 text-[13px] text-[rgba(0,0,0,0.6)] text-center w-full" style={{ fontVariationSettings: "'opsz' 14" }}>
        This can be changed later under preferences
      </p>
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-[62px]">
      <div className="relative shrink-0 size-[24px]" data-name="Home">
        <img alt="" className="absolute inset-0 max-w-none object-contain pointer-events-none size-full" src={imgHome} />
      </div>
      <p className="font-['DM_Sans:Medium',sans-serif] font-medium leading-[1.3] relative shrink-0 text-[11px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        Dashboard
      </p>
    </div>
  );
}

function Frame2() {
  return (
    <div className="content-stretch flex flex-col items-center opacity-60 relative shrink-0 w-[62px]">
      <div className="relative shrink-0 size-[24px]" data-name="Geography">
        <img alt="" className="absolute inset-0 max-w-none object-contain pointer-events-none size-full" src={imgGeography} />
      </div>
      <p className="font-['DM_Sans:Medium',sans-serif] font-medium leading-[1.3] relative shrink-0 text-[11px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        Dashboard
      </p>
    </div>
  );
}

function Frame3() {
  return (
    <div className="content-stretch flex flex-col items-center opacity-60 relative shrink-0 w-[62px]">
      <div className="relative shrink-0 size-[24px]" data-name="Person">
        <img alt="" className="absolute inset-0 max-w-none object-contain pointer-events-none size-full" src={imgPerson} />
      </div>
      <p className="font-['DM_Sans:Medium',sans-serif] font-medium leading-[1.3] relative shrink-0 text-[11px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        Profile
      </p>
    </div>
  );
}

function Frame4() {
  return (
    <div className="content-stretch flex flex-col items-center opacity-60 relative shrink-0 w-[62px]">
      <div className="relative shrink-0 size-[24px]" data-name="Shopping Cart">
        <img alt="" className="absolute inset-0 max-w-none object-contain pointer-events-none size-full" src={imgShoppingCart} />
      </div>
      <p className="font-['DM_Sans:Medium',sans-serif] font-medium leading-[1.3] relative shrink-0 text-[11px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        Marketplace
      </p>
    </div>
  );
}

function Frame8() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-center relative shrink-0 w-full">
      <Frame6 />
      <div className="content-stretch flex h-[70px] items-center justify-between py-[16px] relative shrink-0 w-full" data-name="nav bar">
        <Frame1 />
        <Frame2 />
        <Frame3 />
        <Frame4 />
      </div>
    </div>
  );
}

export default function AiPersona() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start justify-between px-[16px] relative size-full" data-name="AI persona">
      <Frame13 />
      <Frame8 />
    </div>
  );
}