import imgBack from "figma:asset/e60e4637762be3f449b41c550b8780a6e47c0476.png";
import imgFrame8762 from "figma:asset/132f7480e00831bf915f0ff1c7f3a98ac0e578f5.png";
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
      <p className="font-['DM_Sans:Regular',sans-serif] font-normal leading-[1.3] opacity-0 relative shrink-0 text-[12px] text-[rgba(0,0,0,0.87)] whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
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

function Frame6() {
  return (
    <div className="max-h-[150px] max-w-[150px] relative shrink-0 size-[150px]">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgFrame8762} />
    </div>
  );
}

function Frame7() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-center relative shrink-0 w-full">
      <Frame6 />
      <p className="font-['DM_Sans:Regular',sans-serif] font-normal leading-[18px] max-w-[200px] min-w-full relative shrink-0 text-[13px] text-[rgba(0,0,0,0.6)] text-center w-[min-content]" style={{ fontVariationSettings: "'opsz' 14" }}>
        Personalizing the experience for you
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

export default function Loading() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start justify-between relative size-full" data-name="loading">
      <Frame5 />
      <Frame7 />
      <div className="content-stretch flex h-[70px] items-center justify-between py-[16px] relative shrink-0 w-full" data-name="nav bar">
        <Frame1 />
        <Frame2 />
        <Frame3 />
        <Frame4 />
      </div>
    </div>
  );
}