export function initChatWidget() {
  const chatFloatBtn = document.getElementById('chat-float-btn');
  const chatDrawer = document.getElementById('chat-drawer');
  const closeChatBtn = document.getElementById('close-chat-drawer');
  const chatForm = document.getElementById('chat-input-form');
  const chatInput = document.getElementById('chat-user-input');
  const chatMessages = document.getElementById('chat-messages');

  if (!chatFloatBtn || !chatDrawer) return;

  chatFloatBtn.addEventListener('click', () => {
    chatDrawer.classList.toggle('active');
  });

  if (closeChatBtn) {
    closeChatBtn.addEventListener('click', () => {
      chatDrawer.classList.remove('active');
    });
  }

  const botResponses = [
    "Welcome to Bright Links International! Which destination (Canada, UK, Portugal, Germany, UAE, or Australia) are you interested in?",
    "We have 5 offices across Dubai (HQ), United Kingdom, Portugal, Spain, and Pakistan. Would you like to schedule an in-person or online consultation?",
    "Our visa success rate is 99%! You can click 'Book Appointment' to get a free preliminary assessment with our certified visa specialists.",
    "For urgent inquiries, feel free to call our Dubai HQ team directly at +971 52 299 4897 or email admin@brightlinks.ae!"
  ];

  let botStep = 0;

  if (chatForm) {
    chatForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const text = chatInput.value.trim();
      if (!text) return;

      // Add user message
      const userMsg = document.createElement('div');
      userMsg.style.cssText = 'align-self: flex-end; background: var(--cyan-glow); color: #050a17; padding: 0.75rem 1rem; border-radius: 14px 14px 2px 14px; max-width: 80%; font-size: 0.9rem; font-weight: 600; margin-bottom: 0.75rem;';
      userMsg.textContent = text;
      chatMessages.appendChild(userMsg);

      chatInput.value = '';
      chatMessages.scrollTop = chatMessages.scrollHeight;

      // Simulate typing indicator & bot response
      setTimeout(() => {
        const botMsg = document.createElement('div');
        botMsg.style.cssText = 'align-self: flex-start; background: rgba(255,255,255,0.08); color: #fff; border: 1px solid var(--border-cyan); padding: 0.75rem 1rem; border-radius: 14px 14px 14px 2px; max-width: 85%; font-size: 0.9rem; margin-bottom: 0.75rem;';
        
        botMsg.textContent = botResponses[botStep % botResponses.length];
        botStep++;

        chatMessages.appendChild(botMsg);
        chatMessages.scrollTop = chatMessages.scrollHeight;
      }, 600);
    });
  }
}
