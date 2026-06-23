import React from 'react';

const AssistantShell = () => {
  return (
    <div className="assistant-shell fixed right-6 bottom-6 z-[1200] flex flex-col items-end gap-3 cursor-grab max-sm:right-3.5 max-sm:bottom-3.5" id="visitorAssistant" aria-live="polite">
      <div className="assistant-floating-prompt relative self-end max-w-[220px] mr-2 mb-0.5 px-3.5 py-3 rounded-[18px_18px_6px_18px] bg-gradient-to-br from-[#12141a]/96 to-goog-blue/18 border border-goog-blue/24 text-text-light shadow-[0_18px_40px_rgba(0,0,0,0.34)] text-[0.92rem] leading-snug animate-[assistantPromptPop_0.28s_ease]" id="assistantFloatingPrompt">How can I help you ?</div>
      <button className="assistant-toggle w-[62px] h-[62px] rounded-full border border-goog-blue/35 bg-gradient-to-br from-white/20 to-goog-blue/88 text-white text-[1.35rem] cursor-pointer shadow-[0_18px_40px_rgba(66,133,244,0.3)] transition-all duration-250 hover:-translate-y-0.5 hover:scale-104 hover:shadow-[0_22px_46px_rgba(66,133,244,0.36)] focus-visible:outline-none max-sm:w-[58px] max-sm:h-[58px] max-sm:text-[1.2rem]" id="assistantToggle" type="button" aria-label="Open visitor assistant">
        <i className="fa-solid fa-comment-dots"></i>
      </button>
      <div className="assistant-panel w-[min(340px,calc(100vw-32px))] bg-[#12141a]/94 border border-white/8 rounded-3xl backdrop-blur-md shadow-[0_34px_72px_rgba(0,0,0,0.46)] overflow-hidden origin-bottom-right animate-[assistantSlideIn_0.28s_ease] max-sm:w-[min(320px,calc(100vw-24px))]" id="assistantPanel" hidden>
        <div className="assistant-header flex items-start justify-between gap-3 p-4 pb-3 bg-gradient-to-br from-goog-blue/16 to-goog-green/10 border-b border-white/6 cursor-grab select-none text-left" id="assistantDragHandle">
          <div>
            <strong className="block font-display text-[1rem] text-text-light font-bold">GDG Helper</strong>
            <p className="text-text-muted text-[0.78rem] mt-0.5 mb-0">Ask about events, chapters, or joining.</p>
          </div>
          <div className="flex gap-2">
            <button className="assistant-icon-btn w-[30px] h-[30px] border border-white/8 rounded-full bg-white/4 text-text-light cursor-pointer flex items-center justify-center hover:border-goog-blue/32 hover:shadow-[0_0_20px_rgba(66,133,244,0.26)] focus-visible:outline-none" id="assistantMinimize" type="button" aria-label="Minimize assistant">
              <i className="fa-solid fa-minus"></i>
            </button>
            <button className="assistant-icon-btn w-[30px] h-[30px] border border-white/8 rounded-full bg-white/4 text-text-light cursor-pointer flex items-center justify-center hover:border-goog-blue/32 hover:shadow-[0_0_20px_rgba(66,133,244,0.26)] focus-visible:outline-none" id="assistantClose" type="button" aria-label="Close assistant">
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>
        </div>
        <div className="assistant-messages flex flex-col gap-2.5 max-h-[280px] overflow-y-auto px-4 py-3.5" id="assistantMessages">
          <div className="assistant-message assistant-message--bot align-self-start bg-white/6 border border-goog-blue/16 text-text-light">Hi, I can help you find events, chapter info, or joining details.</div>
        </div>
        <form className="flex gap-2 p-4 py-3 bg-white/2 border-t border-white/6 items-center" id="assistantForm">
          <button type="button" className="assistant-voice-btn w-11 h-11 flex-none border border-white/8 rounded-2xl bg-white/5 text-text-light cursor-pointer shadow-[0_0_20px_rgba(234,67,53,0.2)] flex items-center justify-center hover:border-goog-red/28 hover:shadow-[0_0_24px_rgba(234,67,53,0.3)] focus-visible:outline-none" id="assistantVoiceBtn" aria-label="Use voice command">
            <i className="fa-solid fa-microphone"></i>
          </button>
          <input id="assistantInput" type="text" placeholder="Type your question..." autoComplete="off" className="flex-1 min-w-0 bg-white/5 border border-white/8 rounded-2xl p-3.5 py-3 text-text-light outline-none focus:border-goog-blue/35 focus:shadow-[0_0_0_3px_rgba(66,133,244,0.16)]" />
          <button type="submit" className="border-0 rounded-2xl px-4 py-3 bg-gradient-to-br from-goog-blue to-[#2b6cb0] text-white font-semibold cursor-pointer shadow-[0_0_20px_rgba(66,133,244,0.26)] hover:-translate-y-[1px] hover:shadow-[0_0_24px_rgba(66,133,244,0.34)] focus-visible:outline-none">Send</button>
        </form>
      </div>
    </div>
  );
};

export default AssistantShell;
