import imgBack from "figma:asset/e60e4637762be3f449b41c550b8780a6e47c0476.png";

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

function Frame1() {
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
        <div className="content-stretch flex items-center pr-[118px] relative w-full">
          <div className="bg-[#ffcf48] flex-[1_0_0] h-[8px] min-h-px min-w-px" />
        </div>
      </div>
    </div>
  );
}

function Frame3() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start leading-[22px] relative shrink-0 text-[17px] w-full">
      <p className="font-['DM_Sans:SemiBold',sans-serif] font-semibold relative shrink-0 text-black w-full" style={{ fontVariationSettings: "'opsz' 14" }}>
        When is your birthday?
      </p>
      <p className="font-['DM_Sans:Regular',sans-serif] font-normal relative shrink-0 text-[rgba(0,0,0,0.6)] w-full" style={{ fontVariationSettings: "'opsz' 14" }}>
        MM/DD/YYYY
      </p>
    </div>
  );
}

function Frame4() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full">
      <Loader />
      <Frame3 />
    </div>
  );
}

function Frame5() {
  return (
    <div className="content-stretch flex flex-col gap-[35px] items-start relative shrink-0 w-full">
      <Frame1 />
      <Frame4 />
    </div>
  );
}

function Frame2() {
  return (
    <div className="bg-[#ffcf48] h-[34px] opacity-38 relative rounded-[100px] shrink-0 w-full">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center p-[10px] relative size-full">
          <p className="font-['DM_Sans:Regular',sans-serif] font-normal leading-[21px] relative shrink-0 text-[16px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
            Next
          </p>
        </div>
      </div>
    </div>
  );
}

function RowNumbers() {
  return (
    <div className="content-stretch flex gap-[6px] items-start not-italic relative shrink-0 text-black text-center w-full" data-name="row / numbers">
      <div className="bg-white content-stretch flex flex-[1_0_0] flex-col h-[46px] items-start min-h-px min-w-px overflow-clip relative rounded-[5px] shadow-[0px_1px_0px_0px_#898a8d]" data-name="Component / Key">
        <p className="font-['SF_Pro_Display:Regular',sans-serif] leading-[30px] relative shrink-0 text-[25px] w-full">1</p>
        <p className="font-['SF_Pro_Text:Bold',sans-serif] leading-[12px] relative shrink-0 text-[10px] tracking-[2px] w-full">{` `}</p>
      </div>
      <div className="bg-white content-stretch flex flex-[1_0_0] flex-col h-[46px] items-start min-h-px min-w-px overflow-clip relative rounded-[5px] shadow-[0px_1px_0px_0px_#898a8d]" data-name="Component / Key">
        <p className="font-['SF_Pro_Display:Regular',sans-serif] leading-[30px] relative shrink-0 text-[25px] w-full">2</p>
        <p className="font-['SF_Pro_Text:Bold',sans-serif] leading-[12px] relative shrink-0 text-[10px] tracking-[2px] w-full">ABC</p>
      </div>
      <div className="bg-white content-stretch flex flex-[1_0_0] flex-col h-[46px] items-start min-h-px min-w-px overflow-clip relative rounded-[5px] shadow-[0px_1px_0px_0px_#898a8d]" data-name="Component / Key">
        <p className="font-['SF_Pro_Display:Regular',sans-serif] leading-[30px] relative shrink-0 text-[25px] w-full">3</p>
        <p className="font-['SF_Pro_Text:Bold',sans-serif] leading-[12px] relative shrink-0 text-[10px] tracking-[2px] w-full">DEF</p>
      </div>
    </div>
  );
}

function RowNumbers1() {
  return (
    <div className="content-stretch flex gap-[6px] items-start not-italic relative shrink-0 text-black text-center w-full" data-name="row / numbers">
      <div className="bg-white content-stretch flex flex-[1_0_0] flex-col h-[46px] items-start min-h-px min-w-px overflow-clip relative rounded-[5px] shadow-[0px_1px_0px_0px_#898a8d]" data-name="Component / Key">
        <p className="font-['SF_Pro_Display:Regular',sans-serif] leading-[30px] relative shrink-0 text-[25px] w-full">4</p>
        <p className="font-['SF_Pro_Text:Bold',sans-serif] leading-[12px] relative shrink-0 text-[10px] tracking-[2px] w-full">GHI</p>
      </div>
      <div className="bg-white content-stretch flex flex-[1_0_0] flex-col h-[46px] items-start min-h-px min-w-px overflow-clip relative rounded-[5px] shadow-[0px_1px_0px_0px_#898a8d]" data-name="Component / Key">
        <p className="font-['SF_Pro_Display:Regular',sans-serif] leading-[30px] relative shrink-0 text-[25px] w-full">5</p>
        <p className="font-['SF_Pro_Text:Bold',sans-serif] leading-[12px] relative shrink-0 text-[10px] tracking-[2px] w-full">JKL</p>
      </div>
      <div className="bg-white content-stretch flex flex-[1_0_0] flex-col h-[46px] items-start min-h-px min-w-px overflow-clip relative rounded-[5px] shadow-[0px_1px_0px_0px_#898a8d]" data-name="Component / Key">
        <p className="font-['SF_Pro_Display:Regular',sans-serif] leading-[30px] relative shrink-0 text-[25px] w-full">6</p>
        <p className="font-['SF_Pro_Text:Bold',sans-serif] leading-[12px] relative shrink-0 text-[10px] tracking-[2px] w-full">MNO</p>
      </div>
    </div>
  );
}

function RowNumbers2() {
  return (
    <div className="content-stretch flex gap-[6px] items-start not-italic relative shrink-0 text-black text-center w-full" data-name="row / numbers">
      <div className="bg-white content-stretch flex flex-[1_0_0] flex-col h-[46px] items-start min-h-px min-w-px overflow-clip relative rounded-[5px] shadow-[0px_1px_0px_0px_#898a8d]" data-name="Component / Key">
        <p className="font-['SF_Pro_Display:Regular',sans-serif] leading-[30px] relative shrink-0 text-[25px] w-full">7</p>
        <p className="font-['SF_Pro_Text:Bold',sans-serif] leading-[12px] relative shrink-0 text-[10px] tracking-[2px] w-full">PQRS</p>
      </div>
      <div className="bg-white content-stretch flex flex-[1_0_0] flex-col h-[46px] items-start min-h-px min-w-px overflow-clip relative rounded-[5px] shadow-[0px_1px_0px_0px_#898a8d]" data-name="Component / Key">
        <p className="font-['SF_Pro_Display:Regular',sans-serif] leading-[30px] relative shrink-0 text-[25px] w-full">8</p>
        <p className="font-['SF_Pro_Text:Bold',sans-serif] leading-[12px] relative shrink-0 text-[10px] tracking-[2px] w-full">TUV</p>
      </div>
      <div className="bg-white content-stretch flex flex-[1_0_0] flex-col h-[46px] items-start min-h-px min-w-px overflow-clip relative rounded-[5px] shadow-[0px_1px_0px_0px_#898a8d]" data-name="Component / Key">
        <p className="font-['SF_Pro_Display:Regular',sans-serif] leading-[30px] relative shrink-0 text-[25px] w-full">9</p>
        <p className="font-['SF_Pro_Text:Bold',sans-serif] leading-[12px] relative shrink-0 text-[10px] tracking-[2px] w-full">WXYZ</p>
      </div>
    </div>
  );
}

function RowNumbers3() {
  return (
    <div className="content-stretch flex gap-[6px] items-start relative shrink-0 w-full" data-name="row / numbers">
      <div className="flex-[1_0_0] min-h-px min-w-px relative rounded-[4.6px] self-stretch" data-name="Component / Key">
        <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
          <div className="content-stretch flex items-center justify-center p-[7px] relative size-full">
            <p className="flex-[1_0_0] font-['SF_Pro_Display:Regular',sans-serif] leading-[28px] min-h-px min-w-px not-italic relative text-[#50555c] text-[22px] text-center">{` `}</p>
          </div>
        </div>
      </div>
      <div className="bg-white content-stretch flex flex-[1_0_0] flex-col h-[46px] items-start min-h-px min-w-px not-italic overflow-clip relative rounded-[5px] shadow-[0px_1px_0px_0px_#898a8d] text-black text-center" data-name="Component / Key">
        <p className="font-['SF_Pro_Display:Regular',sans-serif] leading-[30px] relative shrink-0 text-[25px] w-full">0</p>
        <p className="font-['SF_Pro_Text:Bold',sans-serif] leading-[12px] relative shrink-0 text-[10px] tracking-[2px] w-full">{` `}</p>
      </div>
      <div className="flex-[1_0_0] min-h-px min-w-px relative rounded-[4.6px] self-stretch" data-name="Component / Key">
        <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
          <div className="content-stretch flex items-center justify-center p-[7px] relative size-full">
            <p className="flex-[1_0_0] font-['SF_Pro_Display:Regular',sans-serif] leading-[28px] min-h-px min-w-px not-italic relative text-[#50555c] text-[22px] text-center">􀆛</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame6() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full">
      <Frame2 />
      <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="iOS Numeric Keyboard">
        <div className="backdrop-blur-[10px] bg-[rgba(204,206,211,0.76)] relative shrink-0 w-full" data-name=".Keys Layout / Numeric / English / Default">
          <div className="content-stretch flex flex-col gap-[7px] items-start p-[6px] relative w-full">
            <RowNumbers />
            <RowNumbers1 />
            <RowNumbers2 />
            <RowNumbers3 />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Age() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start justify-between px-[16px] relative size-full" data-name="Age">
      <Frame5 />
      <Frame6 />
    </div>
  );
}