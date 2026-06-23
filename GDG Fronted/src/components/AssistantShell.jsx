import React, { useState, useEffect, useRef } from 'react';

const AssistantShell = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [floatingPromptVisible, setFloatingPromptVisible] = useState(true);
  const [messages, setMessages] = useState([
    { text: 'Hi, I can help you find events, chapter info, or joining details.', sender: 'bot' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [dragPos, setDragPos] = useState({ x: 0, y: 0 });
  const [scrollOffset, setScrollOffset] = useState(0);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const recognitionRef = useRef(null);
  const isDraggingRef = useRef(false);
  const dragStartRef = useRef({ x: 0, y: 0 });
  const basePosRef = useRef({ x: 0, y: 0 });

  // Floating prompt timer
  useEffect(() => {
    const timer = setTimeout(() => {
      setFloatingPromptVisible(false);
    }, 3500);
    return () => clearTimeout(timer);
  }, []);

  // Auto-scroll messages to bottom
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // Focus input when panel opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Scroll offset listener to match the styling
  useEffect(() => {
    const handleScroll = () => {
      const offset = -Math.min(window.scrollY * 0.02, 44);
      setScrollOffset(offset);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Speech Recognition setup
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const rec = new SpeechRecognition();
      rec.lang = 'en-US';
      rec.interimResults = false;
      rec.maxAlternatives = 1;

      rec.addEventListener('result', (event) => {
        const transcript = event.results[0]?.[0]?.transcript || '';
        submitQuery(transcript);
      });

      rec.addEventListener('end', () => {
        setIsListening(false);
      });

      recognitionRef.current = rec;
    }
  }, []);

  const getAssistantReply = (input) => {
    const text = input.toLowerCase();
    if (text.includes('join') || text.includes('membership')) {
      return 'You can join by using the Join Chapter button at the top. I can also help you explore events and community links.';
    }
    if (text.includes('upcoming') || text.includes('event')) {
      return 'Upcoming events are listed in the events section. Use View all events to open the full vertical list.';
    }
    if (text.includes('past')) {
      return 'Past events are also available in the events section. Open View all events to see the archive.';
    }
    if (text.includes('video') || text.includes('watch')) {
      return 'The chapter video section is near the bottom of the page. Open View all videos to browse more content.';
    }
    if (text.includes('hello') || text.includes('hi')) {
      return 'Hello. I can help you find events, videos, and joining details for GDG on Campus IIT Bhilai.';
    }
    return 'I can help with events, chapter videos, and joining details. Try asking about upcoming events or how to join.';
  };

  const submitQuery = (text) => {
    const userText = text.trim();
    if (!userText) return;

    setFloatingPromptVisible(false);
    setMessages((prev) => [
      ...prev,
      { text: userText, sender: 'user' },
      { text: getAssistantReply(userText), sender: 'bot' }
    ]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    submitQuery(inputValue);
    setInputValue('');
  };

  const toggleVoice = () => {
    if (!recognitionRef.current) {
      setMessages((prev) => [
        ...prev,
        { text: 'Voice input is not supported in this browser. Try typing your command instead.', sender: 'bot' }
      ]);
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
    } else {
      setIsListening(true);
      setMessages((prev) => [
        ...prev,
        { text: 'Listening... speak your command.', sender: 'bot' }
      ]);
      recognitionRef.current.start();
    }
  };

  // Dragging logic
  const handlePointerDown = (event) => {
    if (event.target.closest('button, input, textarea, select, a')) return;
    isDraggingRef.current = true;
    event.currentTarget.classList.add('is-dragging');
    event.currentTarget.setPointerCapture(event.pointerId);
    dragStartRef.current = { x: event.clientX, y: event.clientY };
    basePosRef.current = { x: dragPos.x, y: dragPos.y };
  };

  const handlePointerMove = (event) => {
    if (!isDraggingRef.current) return;
    const deltaX = event.clientX - dragStartRef.current.x;
    const deltaY = event.clientY - dragStartRef.current.y;
    
    const nextX = Math.min(Math.max(basePosRef.current.x + deltaX, -280), 24);
    const nextY = Math.min(Math.max(basePosRef.current.y + deltaY, -240), 40);
    
    setDragPos({ x: nextX, y: nextY });
  };

  const handlePointerUp = (event) => {
    isDraggingRef.current = false;
    event.currentTarget.classList.remove('is-dragging');
  };

  return (
    <div 
      className="assistant-shell fixed right-6 bottom-6 z-[1200] flex flex-col items-end gap-3 cursor-grab max-sm:right-3.5 max-sm:bottom-3.5"
      style={{
        '--assistant-drag-x': `${dragPos.x}px`,
        '--assistant-drag-y': `${dragPos.y}px`,
        '--assistant-scroll-offset': `${scrollOffset}px`
      }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      aria-live="polite"
    >
      {floatingPromptVisible && (
        <div className="assistant-floating-prompt relative self-end max-w-[220px] mr-2 mb-0.5 px-3.5 py-3 rounded-[18px_18px_6px_18px] bg-gradient-to-br from-[#12141a]/96 to-goog-blue/18 border border-goog-blue/24 text-text-light shadow-[0_18px_40px_rgba(0,0,0,0.34)] text-[0.92rem] leading-snug animate-[assistantPromptPop_0.28s_ease]">
          How can I help you ?
        </div>
      )}
      
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="assistant-toggle w-[62px] h-[62px] rounded-full border border-goog-blue/35 bg-gradient-to-br from-white/20 to-goog-blue/88 text-white text-[1.35rem] cursor-pointer shadow-[0_18px_40px_rgba(66,133,244,0.3)] transition-all duration-250 hover:-translate-y-0.5 hover:scale-104 hover:shadow-[0_22px_46px_rgba(66,133,244,0.36)] focus-visible:outline-none max-sm:w-[58px] max-sm:h-[58px] max-sm:text-[1.2rem]"
        type="button" 
        aria-label={isOpen ? "Close visitor assistant" : "Open visitor assistant"}
        aria-expanded={isOpen}
      >
        <i className={`fa-solid ${isOpen ? 'fa-xmark' : 'fa-comment-dots'}`}></i>
      </button>
      
      {isOpen && (
        <div className="assistant-panel w-[min(340px,calc(100vw-32px))] bg-[#12141a]/94 border border-white/8 rounded-3xl backdrop-blur-md shadow-[0_34px_72px_rgba(0,0,0,0.46)] overflow-hidden origin-bottom-right animate-[assistantSlideIn_0.28s_ease] max-sm:w-[min(320px,calc(100vw-24px))]">
          <div className="assistant-header flex items-start justify-between gap-3 p-4 pb-3 bg-gradient-to-br from-goog-blue/16 to-goog-green/10 border-b border-white/6 select-none text-left">
            <div>
              <strong className="block font-display text-[1rem] text-text-light font-bold">GDG Helper</strong>
              <p className="text-text-muted text-[0.78rem] mt-0.5 mb-0">Ask about events, chapters, or joining.</p>
            </div>
            <div className="flex gap-2">
              <button 
                onClick={() => setIsOpen(false)}
                className="assistant-icon-btn w-[30px] h-[30px] border border-white/8 rounded-full bg-white/4 text-text-light cursor-pointer flex items-center justify-center hover:border-goog-blue/32 hover:shadow-[0_0_20px_rgba(66,133,244,0.26)] focus-visible:outline-none"
                type="button" 
                aria-label="Minimize assistant"
              >
                <i className="fa-solid fa-minus"></i>
              </button>
              <button 
                onClick={() => setIsOpen(false)}
                className="assistant-icon-btn w-[30px] h-[30px] border border-white/8 rounded-full bg-white/4 text-text-light cursor-pointer flex items-center justify-center hover:border-goog-blue/32 hover:shadow-[0_0_20px_rgba(66,133,244,0.26)] focus-visible:outline-none" 
                type="button" 
                aria-label="Close assistant"
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>
          </div>
          
          <div className="assistant-messages flex flex-col gap-2.5 max-h-[280px] overflow-y-auto px-4 py-3.5 text-left">
            {messages.map((msg, index) => (
              <div 
                key={index} 
                className={`assistant-message assistant-message--${msg.sender} ${msg.sender === 'bot' ? 'align-self-start' : 'align-self-end'} ${
                  msg.sender === 'bot' 
                    ? 'bg-white/6 border border-goog-blue/16 text-text-light' 
                    : 'bg-goog-blue/20 border border-goog-blue/40 text-white'
                }`}
              >
                {msg.text}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          
          <form onSubmit={handleSubmit} className="flex gap-2 p-4 py-3 bg-white/2 border-t border-white/6 items-center">
            <button 
              type="button" 
              onClick={toggleVoice}
              className={`assistant-voice-btn w-11 h-11 flex-none border border-white/8 rounded-2xl bg-white/5 text-text-light cursor-pointer shadow-[0_0_20px_rgba(234,67,53,0.2)] flex items-center justify-center hover:border-goog-red/28 hover:shadow-[0_0_24px_rgba(234,67,53,0.3)] focus-visible:outline-none ${isListening ? 'is-listening bg-goog-red/20' : ''}`}
              aria-label={isListening ? "Stop voice command" : "Use voice command"}
            >
              <i className="fa-solid fa-microphone"></i>
            </button>
            
            <input 
              ref={inputRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              type="text" 
              placeholder="Type your question..." 
              autoComplete="off" 
              className="flex-1 min-w-0 bg-white/5 border border-white/8 rounded-2xl p-3.5 py-3 text-text-light outline-none focus:border-goog-blue/35 focus:shadow-[0_0_0_3px_rgba(66,133,244,0.16)]" 
            />
            
            <button type="submit" className="border-0 rounded-2xl px-4 py-3 bg-gradient-to-br from-goog-blue to-[#2b6cb0] text-white font-semibold cursor-pointer shadow-[0_0_20px_rgba(66,133,244,0.26)] hover:-translate-y-[1px] hover:shadow-[0_0_24px_rgba(66,133,244,0.34)] focus-visible:outline-none">Send</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default AssistantShell;
