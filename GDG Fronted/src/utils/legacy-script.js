export const initLegacyUI = () => {
    // --- MOBILE MENU TOGGLE FUNCTIONALITY ---
    // (Managed natively in Header.jsx via React states)
    const eventListeners = [];
    
    const organizerAvatars = document.querySelectorAll('.organizer-card .avatar');
    organizerAvatars.forEach(avatar => {
        const img = avatar.querySelector('img');
        const fallback = avatar.querySelector('.avatar-fallback');
        if (!img) {
            fallback.style.display = 'grid';
            return;
        }
    
        img.addEventListener('load', () => {
            if (fallback) {
                fallback.style.display = 'none';
            }
        });
    
        img.addEventListener('error', () => {
            img.style.display = 'none';
            if (fallback) {
                fallback.style.display = 'grid';
            }
        });
    });
    
    const pageLoader = document.getElementById('pageLoader');
    let pageLoaderTimer = null;
    const hidePageLoader = () => {
        if (!pageLoader) return;
        pageLoader.classList.add('hidden');
        document.body.classList.remove('loading');
        pageLoaderTimer = window.setTimeout(() => {
            if (pageLoader && pageLoader.parentNode) {
                pageLoader.remove();
            }
        }, 500);
    };
    
    window.setTimeout(hidePageLoader, 700);
    
    // --- SECTION REVEAL, HORIZONTAL AUTOPLAY, AND VIEW-ALL PANELS ---
    const clamp = (value, min, max) => Math.min(Math.max(value, min), max);
    const throttle = (callback, delay) => {
        let lastCall = 0;
        return (...args) => {
            const now = Date.now();
            if (now - lastCall >= delay) {
                lastCall = now;
                callback(...args);
            }
        };
    };
    
    const sections = Array.from(document.querySelectorAll('.section'));
    const wrappers = Array.from(document.querySelectorAll('.carousel-wrapper'));
    const progressIndicators = Array.from(document.querySelectorAll('.section-progress .indicator'));
    const viewAllButtons = Array.from(document.querySelectorAll('.view-all-btn'));
    
    const setWrapperOffset = (wrapper, nextOffset) => {
        const track = wrapper.querySelector('.carousel-track');
        if (!track) return;
    
        const maxOffset = Number(wrapper.dataset.maxOffset || 0);
        const offset = clamp(nextOffset, 0, maxOffset);
        wrapper.dataset.offset = offset.toString();
        track.style.transform = `translateX(${-offset}px)`;
        updateWrapperIndicator(wrapper);
    };
    
    const refreshWrapper = (wrapper) => {
        const track = wrapper.querySelector('.carousel-track');
        if (!track) return;
    
        const maxOffset = Math.max(track.scrollWidth - wrapper.clientWidth, 0);
        wrapper.dataset.maxOffset = maxOffset.toString();
        const offset = clamp(Number(wrapper.dataset.offset || 0), 0, maxOffset);
        wrapper.dataset.offset = offset.toString();
        track.style.transform = `translateX(${-offset}px)`;
    };
    
    const syncWrapperIndicators = () => {
        wrappers.forEach(updateWrapperIndicator);
    };
    
    const updateWrapperIndicator = (wrapper) => {
        const section = wrapper.closest('section');
        const indicator = section?.querySelector('.section-progress .indicator');
        if (!indicator) return;
    
        const maxOffset = Number(wrapper.dataset.maxOffset || 0);
        const offset = Number(wrapper.dataset.offset || 0);
        indicator.style.width = `${maxOffset ? (offset / maxOffset) * 100 : 0}%`;
    };
    
    const pauseAutoplay = (wrapper, duration = 2200) => {
        wrapper.dataset.pauseUntil = (performance.now() + duration).toString();
    };
    
    const shouldAutoplay = (wrapper) => {
        if (window.innerWidth < 969) return false;
        const section = wrapper.closest('section');
        if (!section || !section.classList.contains('is-visible')) return false;
        if (section.querySelector('.view-all-panel:not([hidden])')) return false;
        if (wrapper.dataset.userPaused === 'true') return false;
        if (Number(wrapper.dataset.maxOffset || 0) <= 0) return false;
    
        const pauseUntil = Number(wrapper.dataset.pauseUntil || 0);
        return performance.now() >= pauseUntil;
    };
    
    const attachHorizontalControl = (wrapper) => {
        const track = wrapper.querySelector('.carousel-track');
        if (!track) return;
    
        wrapper.addEventListener('wheel', (event) => {
            if (window.innerWidth < 969) return;
            if (Math.abs(event.deltaX) > Math.abs(event.deltaY)) return;
            event.preventDefault();
            pauseAutoplay(wrapper);
    
            const current = Number(wrapper.dataset.offset || 0);
            const next = current + event.deltaY * 0.45;
            setWrapperOffset(wrapper, next);
        }, { passive: false });
    
        let startX = 0;
        let startY = 0;
        let startOffset = 0;
        let isScrollingPerf = false;
        let isSwipeChecking = false;
    
        wrapper.addEventListener('touchstart', (event) => {
            if (window.innerWidth < 969) return;
            pauseAutoplay(wrapper);
            startX = event.touches[0]?.clientX || 0;
            startY = event.touches[0]?.clientY || 0;
            startOffset = Number(wrapper.dataset.offset || 0);
            isScrollingPerf = false;
            isSwipeChecking = true;
        }, { passive: true });
    
        wrapper.addEventListener('touchmove', (event) => {
            if (window.innerWidth < 969) return;
            if (!event.touches.length) return;
            const currentX = event.touches[0].clientX || 0;
            const currentY = event.touches[0].clientY || 0;
            const deltaX = currentX - startX;
            const deltaY = currentY - startY;
            
            if (isSwipeChecking) {
                // If vertical movement is significantly larger than horizontal, treat it as vertical page scroll
                if (Math.abs(deltaY) > Math.abs(deltaX) && Math.abs(deltaY) > 6) {
                    isScrollingPerf = true;
                }
                isSwipeChecking = false;
            }
            
            if (isScrollingPerf) {
                // Let the browser handle native vertical page scroll
                return;
            }
            
            // Otherwise, it is a horizontal swipe: prevent page wiggling and slide the carousel track
            if (event.cancelable) {
                event.preventDefault();
            }
            const next = startOffset - deltaX;
            setWrapperOffset(wrapper, next);
        }, { passive: false });
    
        wrapper.addEventListener('mouseenter', () => {
            wrapper.dataset.userPaused = 'true';
        });
    
        wrapper.addEventListener('mouseleave', () => {
            wrapper.dataset.userPaused = 'false';
            pauseAutoplay(wrapper, 800);
        });
    };
    
    const buildVerticalPanel = (sectionId) => {
        const panel = document.querySelector(`[data-view-all-panel="${sectionId}"]`);
        const target = document.querySelector(`[data-vertical-slider="${sectionId}"]`);
        const section = document.getElementById(sectionId);
        const carouselTrack = section?.querySelector('.carousel-track');
    
        if (!panel || !target || !carouselTrack || target.dataset.ready === 'true') return;
    
        Array.from(carouselTrack.children).forEach(item => {
            const clone = item.cloneNode(true);
            clone.classList.remove('carousel-item');
            target.appendChild(clone);
        });
    
        target.dataset.ready = 'true';
    };
    
    const toggleViewAll = (sectionId) => {
        const section = document.getElementById(sectionId);
        const panel = document.querySelector(`[data-view-all-panel="${sectionId}"]`);
        const button = document.querySelector(`[data-view-all-target="${sectionId}"]`);
        const carouselWrapper = section?.querySelector('.carousel-wrapper');
        const isOpen = panel ? panel.hidden : true;
    
        if (!panel || !button || !carouselWrapper) return;
    
        if (isOpen) {
            buildVerticalPanel(sectionId);
            panel.hidden = false;
            carouselWrapper.hidden = true;
            section.classList.add('is-view-all-open');
            button.textContent = 'Close view all';
        } else {
            panel.hidden = true;
            carouselWrapper.hidden = false;
            section.classList.remove('is-view-all-open');
            button.textContent = sectionId === 'chapter-video' ? 'View all videos' : 'View all events';
        }
    };
    
    const initializeViewAllControls = () => {
        viewAllButtons.forEach(button => {
            const sectionId = button.dataset.viewAllTarget;
            if (!sectionId) return;
    
            button.addEventListener('click', () => toggleViewAll(sectionId));
        });
    };
    
    const initializeSectionReveal = () => {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                }
            });
        }, { threshold: 0.18, rootMargin: '0px 0px -8% 0px' });
    
        sections.forEach(section => revealObserver.observe(section));
    };
    
    const initializeHorizontalSections = () => {
        wrappers.forEach(wrapper => {
            wrapper.dataset.offset = wrapper.dataset.offset || '0';
            wrapper.dataset.userPaused = 'false';
            refreshWrapper(wrapper);
            attachHorizontalControl(wrapper);

            // Sync progress indicator dynamically with native mobile swipe scroll
            const container = wrapper.querySelector('.carousel-container');
            if (container) {
                const scrollHandler = () => {
                    if (window.innerWidth < 969) {
                        const maxScroll = container.scrollWidth - container.clientWidth;
                        const currentScroll = container.scrollLeft;
                        const indicator = wrapper.closest('section')?.querySelector('.section-progress .indicator');
                        if (indicator) {
                            indicator.style.width = `${maxScroll ? (currentScroll / maxScroll) * 100 : 0}%`;
                        }
                    }
                };
                container.addEventListener('scroll', scrollHandler, { passive: true });
                eventListeners.push(() => container.removeEventListener('scroll', scrollHandler));
            }
        });
        syncWrapperIndicators();
    };
    
    let revealObserver;
    let resizeHandler;
    let lastAutoplayFrame = performance.now();
    let autoplayReqId;
    
    const initAll = () => {
        // Initialize section reveal with observer
        revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                }
            });
        }, { threshold: 0.18, rootMargin: '0px 0px -8% 0px' });
        
        sections.forEach(section => revealObserver.observe(section));
        
        // Initialize view all controls
        initializeViewAllControls();
        
        // Initialize horizontal sections
        initializeHorizontalSections();
        
        // Resize handler
        const throttledResize = throttle(() => {
            wrappers.forEach(refreshWrapper);
            syncWrapperIndicators();
        }, 120);
        
        window.addEventListener('resize', throttledResize);
        resizeHandler = throttledResize;
    };
    
    const autoplayLoop = (now) => {
        const delta = now - lastAutoplayFrame;
        lastAutoplayFrame = now;
    
        wrappers.forEach(wrapper => {
            if (!shouldAutoplay(wrapper)) return;
    
            const maxOffset = Number(wrapper.dataset.maxOffset || 0);
            if (maxOffset <= 0) return;
    
            const current = Number(wrapper.dataset.offset || 0);
            const next = current + (delta * 0.03);
    
            if (next >= maxOffset) {
                setWrapperOffset(wrapper, 0);
                pauseAutoplay(wrapper, 1200);
                return;
            }
    
            setWrapperOffset(wrapper, next);
        });
    
        autoplayReqId = window.requestAnimationFrame(autoplayLoop);
    };
    
    initAll();
    autoplayReqId = window.requestAnimationFrame(autoplayLoop);
    
    // --- VISITOR ASSISTANT WIDGET ---
    const assistantShell = document.getElementById('visitorAssistant');
    const assistantToggle = document.getElementById('assistantToggle');
    const assistantPanel = document.getElementById('assistantPanel');
    const assistantClose = document.getElementById('assistantClose');
    const assistantMinimize = document.getElementById('assistantMinimize');
    const assistantVoiceBtn = document.getElementById('assistantVoiceBtn');
    const assistantFloatingPrompt = document.getElementById('assistantFloatingPrompt');
    const assistantMessages = document.getElementById('assistantMessages');
    const assistantForm = document.getElementById('assistantForm');
    const assistantInput = document.getElementById('assistantInput');
    
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const assistantRecognition = SpeechRecognition ? new SpeechRecognition() : null;
    let assistantPromptTimer = null;
    
    const assistantBounds = {
        x: 0,
        y: 0,
        scroll: 0,
    };
    
    const setAssistantPosition = () => {
        if (!assistantShell) return;
        assistantShell.style.setProperty('--assistant-drag-x', `${assistantBounds.x}px`);
        assistantShell.style.setProperty('--assistant-drag-y', `${assistantBounds.y}px`);
        assistantShell.style.setProperty('--assistant-scroll-offset', `${assistantBounds.scroll}px`);
    };
    
    const setAssistantOpen = (isOpen) => {
        if (!assistantPanel || !assistantToggle) return;
        assistantPanel.hidden = !isOpen;
        assistantToggle.setAttribute('aria-label', isOpen ? 'Close visitor assistant' : 'Open visitor assistant');
        assistantToggle.setAttribute('aria-expanded', String(isOpen));
    
        if (isOpen) {
            assistantInput?.focus();
        }
    };
    
    const appendAssistantMessage = (text, role = 'bot') => {
        if (!assistantMessages) return;
    
        const message = document.createElement('div');
        message.className = `assistant-message assistant-message--${role}`;
        message.textContent = text;
        assistantMessages.appendChild(message);
        assistantMessages.scrollTop = assistantMessages.scrollHeight;
    };
    
    const showAssistantPrompt = () => {
        if (!assistantFloatingPrompt) return;
    
        assistantFloatingPrompt.hidden = false;
    
        if (assistantPromptTimer) {
            window.clearTimeout(assistantPromptTimer);
        }
    
        assistantPromptTimer = window.setTimeout(() => {
            assistantFloatingPrompt.hidden = true;
            assistantPromptTimer = null;
        }, 3500);
    };
    
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
    
    const updateAssistantScroll = () => {
        if (!assistantShell) return;
        const offset = -Math.min(window.scrollY * 0.02, 44);
        assistantBounds.scroll = offset;
        setAssistantPosition();
    };
    
    const clampAssistant = (value, min, max) => Math.min(Math.max(value, min), max);
    
    const submitAssistantQuery = (text) => {
        const userText = text.trim();
        if (!userText) return;
    
        if (assistantFloatingPrompt) {
            assistantFloatingPrompt.hidden = true;
        }
        if (assistantPromptTimer) {
            window.clearTimeout(assistantPromptTimer);
            assistantPromptTimer = null;
        }
    
        appendAssistantMessage(userText, 'user');
        appendAssistantMessage(getAssistantReply(userText), 'bot');
    };
    
    const toggleAssistantVoice = () => {
        if (!assistantRecognition || !assistantVoiceBtn) {
            appendAssistantMessage('Voice input is not supported in this browser. Try typing your command instead.', 'bot');
            return;
        }
    
        if (assistantVoiceBtn.dataset.listening === 'true') {
            assistantRecognition.stop();
            return;
        }
    
        assistantRecognition.lang = 'en-US';
        assistantRecognition.interimResults = false;
        assistantRecognition.maxAlternatives = 1;
        assistantRecognition.start();
        assistantVoiceBtn.dataset.listening = 'true';
        assistantVoiceBtn.setAttribute('aria-label', 'Stop voice command');
        assistantVoiceBtn.classList.add('is-listening');
        appendAssistantMessage('Listening... speak your command.', 'bot');
    };
    
    if (assistantShell && assistantToggle && assistantPanel) {
        showAssistantPrompt();
    
        assistantToggle.addEventListener('click', () => {
            const isOpen = !assistantPanel.hidden;
            setAssistantOpen(!isOpen);
        });
    
        assistantClose?.addEventListener('click', () => setAssistantOpen(false));
        assistantMinimize?.addEventListener('click', () => setAssistantOpen(false));
    
        assistantForm?.addEventListener('submit', (event) => {
            event.preventDefault();
            const userText = assistantInput?.value.trim() || '';
            if (!userText) return;
    
            submitAssistantQuery(userText);
            assistantInput.value = '';
        });
    
        assistantVoiceBtn?.addEventListener('click', toggleAssistantVoice);
    
        if (assistantRecognition) {
            assistantRecognition.addEventListener('result', (event) => {
                const transcript = event.results[0]?.[0]?.transcript || '';
                assistantInput.value = transcript;
                submitAssistantQuery(transcript);
                assistantInput.value = '';
            });
    
            assistantRecognition.addEventListener('end', () => {
                if (assistantVoiceBtn) {
                    assistantVoiceBtn.dataset.listening = 'false';
                    assistantVoiceBtn.setAttribute('aria-label', 'Use voice command');
                    assistantVoiceBtn.classList.remove('is-listening');
                }
            });
        }
    
        let dragStartX = 0;
        let dragStartY = 0;
        let baseX = 0;
        let baseY = 0;
        let isDragging = false;
    
        const pointerDownHandler = (event) => {
            if (event.target.closest('button, input, textarea, select, a')) return;
            isDragging = true;
            assistantShell.classList.add('is-dragging');
            assistantShell.setPointerCapture(event.pointerId);
            dragStartX = event.clientX;
            dragStartY = event.clientY;
            baseX = assistantBounds.x;
            baseY = assistantBounds.y;
        };

        const pointerMoveHandler = (event) => {
            if (!isDragging) return;
    
            const nextX = clampAssistant(baseX + (event.clientX - dragStartX), -280, 24);
            const nextY = clampAssistant(baseY + (event.clientY - dragStartY), -240, 40);
            assistantBounds.x = nextX;
            assistantBounds.y = nextY;
            setAssistantPosition();
        };

        assistantShell.addEventListener('pointerdown', pointerDownHandler);
        assistantShell.addEventListener('pointermove', pointerMoveHandler);
    
        const endDrag = () => {
            isDragging = false;
            assistantShell.classList.remove('is-dragging');
        };
    
        assistantShell.addEventListener('pointerup', endDrag);
        assistantShell.addEventListener('pointercancel', endDrag);
    
        window.addEventListener('scroll', throttle(updateAssistantScroll, 30));
        window.addEventListener('resize', throttle(updateAssistantScroll, 100));
        updateAssistantScroll();
        setAssistantOpen(false);
        setAssistantPosition();
    }
    
    // --- LOGIN MODAL EVENT BINDING ---
    // (Now fully managed via React states inside LoginModal.jsx)

    // Cleanup function
    return () => {
        // Cancel animation frame
        if (autoplayReqId) {
            window.cancelAnimationFrame(autoplayReqId);
        }
        
        // Disconnect observer
        if (revealObserver) {
            revealObserver.disconnect();
        }
        
        // Remove resize listener
        if (resizeHandler) {
            window.removeEventListener('resize', resizeHandler);
        }
        
        // Remove all stored event listeners
        eventListeners.forEach(remove => remove());
        eventListeners.length = 0;
        
        // Clear page loader timeout
        if (pageLoaderTimer) {
            window.clearTimeout(pageLoaderTimer);
        }
        
        // Reset autoplay state
        lastAutoplayFrame = performance.now();
    };
};
