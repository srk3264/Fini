import imgFrame8769 from "figma:asset/5b5cb40b8a653d716ec93572667a47ef7d4b366c.png";

function Frame4() {
  return (
    <div className="h-[56px] relative shrink-0 w-[99.556px]">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgFrame8769} />
    </div>
  );
}

function Frame() {
  return (
    <div className="content-stretch flex items-center justify-between py-[16px] relative shrink-0 w-full">
      <Frame4 />
    </div>
  );
}

function Frame3() {
  return (
    <div className="content-stretch flex flex-col h-[88px] items-start relative shrink-0 w-full">
      <Frame />
    </div>
  );
}

function Frame2() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] h-[58px] items-start relative shrink-0 w-full">
      <p className="font-['DM_Sans:SemiBold',sans-serif] font-semibold relative shrink-0 text-black w-full" style={{ fontVariationSettings: "'opsz' 14" }}>
        Your e-mail please
      </p>
      <p className="font-['DM_Sans:Regular',sans-serif] font-normal relative shrink-0 text-[rgba(0,0,0,0.6)] w-full" style={{ fontVariationSettings: "'opsz' 14" }}>
        username@gmail.com
      </p>
    </div>
  );
}

function Frame6() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] h-[58px] items-start relative shrink-0 w-full">
      <p className="font-['DM_Sans:SemiBold',sans-serif] font-semibold relative shrink-0 text-black w-full" style={{ fontVariationSettings: "'opsz' 14" }}>
        Your password
      </p>
      <p className="font-['DM_Sans:Regular',sans-serif] font-normal relative shrink-0 text-[rgba(0,0,0,0.6)] w-full" style={{ fontVariationSettings: "'opsz' 14" }}>
        Tap to start writing
      </p>
    </div>
  );
}

function Frame5() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start leading-[22px] relative shrink-0 text-[17px] w-full">
      <Frame2 />
      <Frame6 />
    </div>
  );
}

function Frame9() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full">
      <Frame3 />
      <Frame5 />
    </div>
  );
}

function Frame1() {
  return (
    <div className="bg-[#ffcf48] relative rounded-[100px] shrink-0 w-full">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center p-[10px] relative w-full">
          <p className="font-['DM_Sans:Regular',sans-serif] font-normal leading-[21px] relative shrink-0 text-[16px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
            Sign in
          </p>
        </div>
      </div>
    </div>
  );
}

function Frame10() {
  return (
    <div className="content-stretch flex flex-col font-['DM_Sans:Regular',sans-serif] font-normal gap-[4px] items-start relative shrink-0 text-center w-full">
      <p className="leading-[18px] relative shrink-0 text-[13px] text-[rgba(0,0,0,0.6)] w-full" style={{ fontVariationSettings: "'opsz' 14" }}>{`Don't have an account?`}</p>
      <p className="leading-[21px] relative shrink-0 text-[16px] text-black w-full" style={{ fontVariationSettings: "'opsz' 14" }}>
        Sign up
      </p>
    </div>
  );
}

function Frame7() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full">
      <Frame1 />
      <Frame10 />
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

function Frame8() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full">
      <Frame7 />
      <div className="backdrop-blur-[10px] bg-[rgba(204,206,211,0.76)] h-[220px] relative shrink-0 w-full" data-name=".Keys Layout / Alphabetic / English / No home indicator">
        <div className="content-stretch flex flex-col gap-[12px] items-start px-[3px] py-[8px] relative size-full">
          <RowAlphabetic />
          <RowAlphabetic1 />
          <RowShiftAlphabeticDelete />
          <RowNumbersSpaceGo />
        </div>
      </div>
    </div>
  );
}

export default function SignIn() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start justify-between px-[16px] relative size-full" data-name="Sign in">
      <Frame9 />
      <Frame8 />
    </div>
  );
}