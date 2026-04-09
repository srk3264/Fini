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

function Component() {
  return (
    <div className="content-stretch flex font-['DM_Sans:Regular',sans-serif] font-normal gap-[24px] items-start relative shrink-0 w-full" data-name="Component 1">
      <p className="leading-[1.3] relative shrink-0 text-[12px] text-[rgba(0,0,0,0.6)] whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        7:00 am
      </p>
      <p className="flex-[1_0_0] leading-[1.4] min-h-px min-w-px relative text-[16px] text-[rgba(0,0,0,0.87)]" style={{ fontVariationSettings: "'opsz' 14" }}>
        Umm kinda rough start I’d say, w|
      </p>
    </div>
  );
}

function Frame5() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-full">
      <div className="content-stretch flex flex-col items-start py-[24px] relative size-full">
        <Component />
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

function RowAlphabetic() {
  return (
    <div className="content-stretch flex gap-[5px] items-start relative shrink-0 w-full" data-name="row / alphabetic">
      <div className="bg-white flex-[1_0_0] min-h-px min-w-px relative rounded-[4.6px] shadow-[0px_1px_0px_0px_#898a8d]" data-name="Component / Key">
        <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
          <div className="content-stretch flex items-center justify-center p-[7px] relative w-full">
            <p className="flex-[1_0_0] font-['SF_Pro_Display:Regular',sans-serif] leading-[28px] min-h-px min-w-px not-italic relative text-[22px] text-black text-center">Q</p>
          </div>
        </div>
      </div>
      <div className="bg-white flex-[1_0_0] min-h-px min-w-px relative rounded-[4.6px] shadow-[0px_1px_0px_0px_#898a8d]" data-name="Component / Key">
        <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
          <div className="content-stretch flex items-center justify-center p-[7px] relative w-full">
            <p className="flex-[1_0_0] font-['SF_Pro_Display:Regular',sans-serif] leading-[28px] min-h-px min-w-px not-italic relative text-[22px] text-black text-center">W</p>
          </div>
        </div>
      </div>
      <div className="bg-white flex-[1_0_0] min-h-px min-w-px relative rounded-[4.6px] shadow-[0px_1px_0px_0px_#898a8d]" data-name="Component / Key">
        <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
          <div className="content-stretch flex items-center justify-center p-[7px] relative w-full">
            <p className="flex-[1_0_0] font-['SF_Pro_Display:Regular',sans-serif] leading-[28px] min-h-px min-w-px not-italic relative text-[22px] text-black text-center">E</p>
          </div>
        </div>
      </div>
      <div className="bg-white flex-[1_0_0] min-h-px min-w-px relative rounded-[4.6px] shadow-[0px_1px_0px_0px_#898a8d]" data-name="Component / Key">
        <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
          <div className="content-stretch flex items-center justify-center p-[7px] relative w-full">
            <p className="flex-[1_0_0] font-['SF_Pro_Display:Regular',sans-serif] leading-[28px] min-h-px min-w-px not-italic relative text-[22px] text-black text-center">R</p>
          </div>
        </div>
      </div>
      <div className="bg-white flex-[1_0_0] min-h-px min-w-px relative rounded-[4.6px] shadow-[0px_1px_0px_0px_#898a8d]" data-name="Component / Key">
        <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
          <div className="content-stretch flex items-center justify-center p-[7px] relative w-full">
            <p className="flex-[1_0_0] font-['SF_Pro_Display:Regular',sans-serif] leading-[28px] min-h-px min-w-px not-italic relative text-[22px] text-black text-center">T</p>
          </div>
        </div>
      </div>
      <div className="bg-white flex-[1_0_0] min-h-px min-w-px relative rounded-[4.6px] shadow-[0px_1px_0px_0px_#898a8d]" data-name="Component / Key">
        <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
          <div className="content-stretch flex items-center justify-center p-[7px] relative w-full">
            <p className="flex-[1_0_0] font-['SF_Pro_Display:Regular',sans-serif] leading-[28px] min-h-px min-w-px not-italic relative text-[22px] text-black text-center">Y</p>
          </div>
        </div>
      </div>
      <div className="bg-white flex-[1_0_0] min-h-px min-w-px relative rounded-[4.6px] shadow-[0px_1px_0px_0px_#898a8d]" data-name="Component / Key">
        <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
          <div className="content-stretch flex items-center justify-center p-[7px] relative w-full">
            <p className="flex-[1_0_0] font-['SF_Pro_Display:Regular',sans-serif] leading-[28px] min-h-px min-w-px not-italic relative text-[22px] text-black text-center">U</p>
          </div>
        </div>
      </div>
      <div className="bg-white flex-[1_0_0] min-h-px min-w-px relative rounded-[4.6px] shadow-[0px_1px_0px_0px_#898a8d]" data-name="Component / Key">
        <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
          <div className="content-stretch flex items-center justify-center p-[7px] relative w-full">
            <p className="flex-[1_0_0] font-['SF_Pro_Display:Regular',sans-serif] leading-[28px] min-h-px min-w-px not-italic relative text-[22px] text-black text-center">I</p>
          </div>
        </div>
      </div>
      <div className="bg-white flex-[1_0_0] min-h-px min-w-px relative rounded-[4.6px] shadow-[0px_1px_0px_0px_#898a8d]" data-name="Component / Key">
        <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
          <div className="content-stretch flex items-center justify-center p-[7px] relative w-full">
            <p className="flex-[1_0_0] font-['SF_Pro_Display:Regular',sans-serif] leading-[28px] min-h-px min-w-px not-italic relative text-[22px] text-black text-center">O</p>
          </div>
        </div>
      </div>
      <div className="bg-white flex-[1_0_0] min-h-px min-w-px relative rounded-[4.6px] shadow-[0px_1px_0px_0px_#898a8d]" data-name="Component / Key">
        <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
          <div className="content-stretch flex items-center justify-center p-[7px] relative w-full">
            <p className="flex-[1_0_0] font-['SF_Pro_Display:Regular',sans-serif] leading-[28px] min-h-px min-w-px not-italic relative text-[22px] text-black text-center">P</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function RowAlphabetic1() {
  return (
    <div className="relative shrink-0 w-full" data-name="row / alphabetic">
      <div className="content-stretch flex gap-[5px] items-start px-[18px] relative w-full">
        <div className="bg-white flex-[1_0_0] min-h-px min-w-px relative rounded-[4.6px] shadow-[0px_1px_0px_0px_#898a8d]" data-name="Component / Key">
          <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
            <div className="content-stretch flex items-center justify-center p-[7px] relative w-full">
              <p className="flex-[1_0_0] font-['SF_Pro_Display:Regular',sans-serif] leading-[28px] min-h-px min-w-px not-italic relative text-[22px] text-black text-center">A</p>
            </div>
          </div>
        </div>
        <div className="bg-white flex-[1_0_0] min-h-px min-w-px relative rounded-[4.6px] shadow-[0px_1px_0px_0px_#898a8d]" data-name="Component / Key">
          <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
            <div className="content-stretch flex items-center justify-center p-[7px] relative w-full">
              <p className="flex-[1_0_0] font-['SF_Pro_Display:Regular',sans-serif] leading-[28px] min-h-px min-w-px not-italic relative text-[22px] text-black text-center">S</p>
            </div>
          </div>
        </div>
        <div className="bg-white flex-[1_0_0] min-h-px min-w-px relative rounded-[4.6px] shadow-[0px_1px_0px_0px_#898a8d]" data-name="Component / Key">
          <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
            <div className="content-stretch flex items-center justify-center p-[7px] relative w-full">
              <p className="flex-[1_0_0] font-['SF_Pro_Display:Regular',sans-serif] leading-[28px] min-h-px min-w-px not-italic relative text-[22px] text-black text-center">D</p>
            </div>
          </div>
        </div>
        <div className="bg-white flex-[1_0_0] min-h-px min-w-px relative rounded-[4.6px] shadow-[0px_1px_0px_0px_#898a8d]" data-name="Component / Key">
          <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
            <div className="content-stretch flex items-center justify-center p-[7px] relative w-full">
              <p className="flex-[1_0_0] font-['SF_Pro_Display:Regular',sans-serif] leading-[28px] min-h-px min-w-px not-italic relative text-[22px] text-black text-center">F</p>
            </div>
          </div>
        </div>
        <div className="bg-white flex-[1_0_0] min-h-px min-w-px relative rounded-[4.6px] shadow-[0px_1px_0px_0px_#898a8d]" data-name="Component / Key">
          <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
            <div className="content-stretch flex items-center justify-center p-[7px] relative w-full">
              <p className="flex-[1_0_0] font-['SF_Pro_Display:Regular',sans-serif] leading-[28px] min-h-px min-w-px not-italic relative text-[22px] text-black text-center">G</p>
            </div>
          </div>
        </div>
        <div className="bg-white flex-[1_0_0] min-h-px min-w-px relative rounded-[4.6px] shadow-[0px_1px_0px_0px_#898a8d]" data-name="Component / Key">
          <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
            <div className="content-stretch flex items-center justify-center p-[7px] relative w-full">
              <p className="flex-[1_0_0] font-['SF_Pro_Display:Regular',sans-serif] leading-[28px] min-h-px min-w-px not-italic relative text-[22px] text-black text-center">H</p>
            </div>
          </div>
        </div>
        <div className="bg-white flex-[1_0_0] min-h-px min-w-px relative rounded-[4.6px] shadow-[0px_1px_0px_0px_#898a8d]" data-name="Component / Key">
          <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
            <div className="content-stretch flex items-center justify-center p-[7px] relative w-full">
              <p className="flex-[1_0_0] font-['SF_Pro_Display:Regular',sans-serif] leading-[28px] min-h-px min-w-px not-italic relative text-[22px] text-black text-center">J</p>
            </div>
          </div>
        </div>
        <div className="bg-white flex-[1_0_0] min-h-px min-w-px relative rounded-[4.6px] shadow-[0px_1px_0px_0px_#898a8d]" data-name="Component / Key">
          <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
            <div className="content-stretch flex items-center justify-center p-[7px] relative w-full">
              <p className="flex-[1_0_0] font-['SF_Pro_Display:Regular',sans-serif] leading-[28px] min-h-px min-w-px not-italic relative text-[22px] text-black text-center">K</p>
            </div>
          </div>
        </div>
        <div className="bg-white flex-[1_0_0] min-h-px min-w-px relative rounded-[4.6px] shadow-[0px_1px_0px_0px_#898a8d]" data-name="Component / Key">
          <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
            <div className="content-stretch flex items-center justify-center p-[7px] relative w-full">
              <p className="flex-[1_0_0] font-['SF_Pro_Display:Regular',sans-serif] leading-[28px] min-h-px min-w-px not-italic relative text-[22px] text-black text-center">L</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function RowAlphabetic2() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="row / alphabetic">
      <div className="content-stretch flex gap-[5px] items-start px-[13px] relative w-full">
        <div className="bg-white flex-[1_0_0] min-h-px min-w-px relative rounded-[4.6px] shadow-[0px_1px_0px_0px_#898a8d]" data-name="Component / Key">
          <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
            <div className="content-stretch flex items-center justify-center p-[7px] relative w-full">
              <p className="flex-[1_0_0] font-['SF_Pro_Display:Regular',sans-serif] leading-[28px] min-h-px min-w-px not-italic relative text-[22px] text-black text-center">Z</p>
            </div>
          </div>
        </div>
        <div className="bg-white flex-[1_0_0] min-h-px min-w-px relative rounded-[4.6px] shadow-[0px_1px_0px_0px_#898a8d]" data-name="Component / Key">
          <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
            <div className="content-stretch flex items-center justify-center p-[7px] relative w-full">
              <p className="flex-[1_0_0] font-['SF_Pro_Display:Regular',sans-serif] leading-[28px] min-h-px min-w-px not-italic relative text-[22px] text-black text-center">X</p>
            </div>
          </div>
        </div>
        <div className="bg-white flex-[1_0_0] min-h-px min-w-px relative rounded-[4.6px] shadow-[0px_1px_0px_0px_#898a8d]" data-name="Component / Key">
          <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
            <div className="content-stretch flex items-center justify-center p-[7px] relative w-full">
              <p className="flex-[1_0_0] font-['SF_Pro_Display:Regular',sans-serif] leading-[28px] min-h-px min-w-px not-italic relative text-[22px] text-black text-center">C</p>
            </div>
          </div>
        </div>
        <div className="bg-white flex-[1_0_0] min-h-px min-w-px relative rounded-[4.6px] shadow-[0px_1px_0px_0px_#898a8d]" data-name="Component / Key">
          <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
            <div className="content-stretch flex items-center justify-center p-[7px] relative w-full">
              <p className="flex-[1_0_0] font-['SF_Pro_Display:Regular',sans-serif] leading-[28px] min-h-px min-w-px not-italic relative text-[22px] text-black text-center">V</p>
            </div>
          </div>
        </div>
        <div className="bg-white flex-[1_0_0] min-h-px min-w-px relative rounded-[4.6px] shadow-[0px_1px_0px_0px_#898a8d]" data-name="Component / Key">
          <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
            <div className="content-stretch flex items-center justify-center p-[7px] relative w-full">
              <p className="flex-[1_0_0] font-['SF_Pro_Display:Regular',sans-serif] leading-[28px] min-h-px min-w-px not-italic relative text-[22px] text-black text-center">B</p>
            </div>
          </div>
        </div>
        <div className="bg-white flex-[1_0_0] min-h-px min-w-px relative rounded-[4.6px] shadow-[0px_1px_0px_0px_#898a8d]" data-name="Component / Key">
          <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
            <div className="content-stretch flex items-center justify-center p-[7px] relative w-full">
              <p className="flex-[1_0_0] font-['SF_Pro_Display:Regular',sans-serif] leading-[28px] min-h-px min-w-px not-italic relative text-[22px] text-black text-center">N</p>
            </div>
          </div>
        </div>
        <div className="bg-white flex-[1_0_0] min-h-px min-w-px relative rounded-[4.6px] shadow-[0px_1px_0px_0px_#898a8d]" data-name="Component / Key">
          <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
            <div className="content-stretch flex items-center justify-center p-[7px] relative w-full">
              <p className="flex-[1_0_0] font-['SF_Pro_Display:Regular',sans-serif] leading-[28px] min-h-px min-w-px not-italic relative text-[22px] text-black text-center">M</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function RowShiftAlphabeticDelete() {
  return (
    <div className="content-stretch flex gap-px items-start relative shrink-0 w-full" data-name="row / shift + alphabetic + delete">
      <div className="bg-white content-stretch flex items-center justify-center overflow-clip p-[11px] relative rounded-[4.6px] shadow-[0px_1px_0px_0px_#898a8d] shrink-0 size-[42px]" data-name="Component / Key">
        <p className="flex-[1_0_0] font-['SF_Pro_Text:Regular',sans-serif] h-[20px] leading-[21px] min-h-px min-w-px not-italic relative text-[16px] text-black text-center">􀆞</p>
      </div>
      <RowAlphabetic2 />
      <div className="bg-[#adb3bc] content-stretch flex items-center justify-center overflow-clip p-[11px] relative rounded-[4.6px] shadow-[0px_1px_0px_0px_#898a8d] shrink-0 size-[42px]" data-name="Component / Key">
        <p className="flex-[1_0_0] font-['SF_Pro_Text:Regular',sans-serif] h-[20px] leading-[21px] min-h-px min-w-px not-italic relative text-[16px] text-black text-center">􀆛</p>
      </div>
    </div>
  );
}

function RowNumbersSpaceGo() {
  return (
    <div className="content-stretch flex gap-[6px] items-start relative shrink-0 w-full" data-name="row / numbers + space + go">
      <div className="bg-[#adb3bc] content-stretch flex h-[42px] items-start overflow-clip py-[11px] relative rounded-[4.6px] shadow-[0px_1px_0px_0px_#898a8d] shrink-0 w-[41px]" data-name="Component / Key">
        <p className="flex-[1_0_0] font-['SF_Pro_Text:Regular',sans-serif] h-[20px] leading-[21px] min-h-px min-w-px not-italic relative text-[16px] text-black text-center">123</p>
      </div>
      <div className="bg-[#adb3bc] content-stretch flex h-[42px] items-center justify-center overflow-clip py-[9px] relative rounded-[4.6px] shadow-[0px_1px_0px_0px_#898a8d] shrink-0 w-[41px]" data-name="Component / Key">
        <p className="flex-[1_0_0] font-['SF_Pro_Text:Regular',sans-serif] leading-[24px] min-h-px min-w-px not-italic relative text-[19px] text-black text-center">􀆪</p>
      </div>
      <div className="bg-white content-stretch flex h-[42px] items-center justify-center overflow-clip py-[9px] relative rounded-[4.6px] shadow-[0px_1px_0px_0px_#898a8d] shrink-0 w-[32px]" data-name="Component / Key">
        <p className="flex-[1_0_0] font-['SF_Pro_Text:Regular',sans-serif] leading-[24px] min-h-px min-w-px not-italic relative text-[19px] text-black text-center">􀊰</p>
      </div>
      <div className="bg-white flex-[1_0_0] h-[42px] min-h-px min-w-px relative rounded-[4.6px] shadow-[0px_1px_0px_0px_#898a8d]" data-name="Component / Key">
        <div className="overflow-clip rounded-[inherit] size-full">
          <div className="content-stretch flex items-start p-[11px] relative size-full">
            <p className="flex-[1_0_0] font-['SF_Pro_Text:Regular',sans-serif] leading-[21px] min-h-px min-w-px not-italic relative text-[16px] text-black text-center">space</p>
          </div>
        </div>
      </div>
      <div className="bg-[#adb3bc] content-stretch flex h-[42px] items-center justify-center overflow-clip p-[11px] relative rounded-[4.6px] shadow-[0px_1px_0px_0px_#898a8d] shrink-0 w-[88px]" data-name="Component / Key">
        <p className="flex-[1_0_0] font-['SF_Pro_Text:Regular',sans-serif] h-[20px] leading-[21px] min-h-px min-w-px not-italic relative text-[16px] text-black text-center">Go</p>
      </div>
    </div>
  );
}

export default function FirstEntryOfTheDayType() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start justify-between px-[16px] relative size-full" data-name="First entry of the day-type">
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
      <div className="backdrop-blur-[10px] bg-[rgba(204,206,211,0.76)] relative shrink-0 w-full" data-name=".Keys Layout / Alphabetic / English / No home indicator">
        <div className="content-stretch flex flex-col gap-[12px] items-start px-[3px] py-[8px] relative w-full">
          <RowAlphabetic />
          <RowAlphabetic1 />
          <RowShiftAlphabeticDelete />
          <RowNumbersSpaceGo />
        </div>
      </div>
    </div>
  );
}