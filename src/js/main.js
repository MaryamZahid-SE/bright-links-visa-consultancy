import { initVisaFinder, openDestinationModal } from './visa-finder.js';
import { initOfficeTabs } from './office-tabs.js';
import { initBookingModal } from './booking-modal.js';
import { initChatWidget } from './chat-widget.js';
import { SERVICES } from './data.js';

document.addEventListener('DOMContentLoaded', () => {
  // Sticky Navbar
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Initialize Modules
  initVisaFinder();
  initOfficeTabs();
  initBookingModal();
  initChatWidget();

  // Hero Quick Journey Search Form Action
  const heroSearchBtn = document.getElementById('hero-explore-options-btn');
  if (heroSearchBtn) {
    heroSearchBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const toCountry = document.getElementById('hero-to-country').value;
      if (toCountry) {
        openDestinationModal(toCountry);
      } else {
        openDestinationModal('canada');
      }
    });
  }

  // Swap From/To Countries Button in Hero
  const swapBtn = document.getElementById('hero-swap-btn');
  if (swapBtn) {
    swapBtn.addEventListener('click', () => {
      const fromSelect = document.getElementById('hero-from-country');
      const toSelect = document.getElementById('hero-to-country');
      const temp = fromSelect.value;
      fromSelect.value = toSelect.value;
      toSelect.value = temp;
    });
  }

  // Services Learn More Buttons
  document.querySelectorAll('.service-learn-more').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const serviceId = btn.getAttribute('data-service');
      openServiceModal(serviceId);
    });
  });

  function openServiceModal(serviceId) {
    const service = SERVICES.find(s => s.id === serviceId) || SERVICES[0];
    const modalOverlay = document.getElementById('global-modal-overlay');
    const modalContainer = document.getElementById('global-modal-content');

    modalContainer.innerHTML = `
      <div class="modal-header">
        <div style="display: flex; align-items: center; gap: 0.75rem;">
          <span style="font-size: 2rem;">${service.icon}</span>
          <h2 class="modal-title">${service.title} Services</h2>
        </div>
        <button class="modal-close-btn" id="close-service-x">✕</button>
      </div>
      <div class="modal-body">
        <p style="color: var(--text-muted); font-size: 1.05rem; margin-bottom: 1.5rem;">${service.desc}</p>
        
        <h4 style="color: #fff; font-size: 1.1rem; margin-bottom: 1rem;">Service Features & Deliverables:</h4>
        <div style="display: flex; flex-direction: column; gap: 0.85rem; margin-bottom: 2rem;">
          ${service.features.map(f => `
            <div style="display: flex; align-items: center; gap: 0.75rem; background: rgba(0, 210, 255, 0.05); padding: 0.85rem 1rem; border-radius: var(--radius-sm); border: 1px solid var(--border-cyan);">
              <span style="color: var(--cyan-glow); font-weight: 800;">✓</span>
              <span style="color: #fff; font-weight: 600; font-size: 0.95rem;">${f}</span>
            </div>
          `).join('')}
        </div>

        <div style="display: flex; gap: 1rem;">
          <button class="btn btn-primary-gold open-booking-modal-btn" id="service-modal-apply" style="flex: 1;">Apply for ${service.title}</button>
          <button class="btn btn-outline-glass" id="close-service-btn">Close</button>
        </div>
      </div>
    `;

    modalOverlay.classList.add('active');

    [document.getElementById('close-service-x'), document.getElementById('close-service-btn')].forEach(b => {
      if (b) b.addEventListener('click', () => modalOverlay.classList.remove('active'));
    });

    const applyBtn = document.getElementById('service-modal-apply');
    if (applyBtn) {
      applyBtn.addEventListener('click', () => {
        modalOverlay.classList.remove('active');
        const bookingModal = document.getElementById('booking-modal-overlay');
        if (bookingModal) bookingModal.classList.add('active');
      });
    }
  }

  // Theme Accent Switcher Toggle
  const themeBtn = document.getElementById('theme-toggle-btn');
  let currentHue = 0;
  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      currentHue = (currentHue + 60) % 360;
      document.documentElement.style.setProperty('--cyan-glow', `hsl(${190 + currentHue}, 100%, 50%)`);
      document.documentElement.style.setProperty('--primary-blue', `hsl(${210 + currentHue}, 100%, 50%)`);
    });
  }

  // Mobile Hamburger Toggle
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const navLinks = document.getElementById('nav-links');
  if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', () => {
      if (navLinks.style.display === 'flex') {
        navLinks.style.display = 'none';
      } else {
        navLinks.style.display = 'flex';
        navLinks.style.flexDirection = 'column';
        navLinks.style.position = 'absolute';
        navLinks.style.top = '100%';
        navLinks.style.left = '0';
        navLinks.style.width = '100%';
        navLinks.style.background = '#070c1b';
        navLinks.style.padding = '1.5rem';
        navLinks.style.borderBottom = '1px solid var(--border-cyan)';
      }
    });
  }
});
