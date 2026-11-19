import { OFFICES } from './data.js';

export function initOfficeTabs() {
  const tabsContainer = document.getElementById('office-tabs-container');
  const detailContainer = document.getElementById('office-detail-container');

  if (!tabsContainer || !detailContainer) return;

  function renderOfficeDetails(officeId) {
    const office = OFFICES.find(o => o.id === officeId) || OFFICES[0];

    // Update Tab buttons active state
    document.querySelectorAll('.office-tab-btn').forEach(btn => {
      if (btn.getAttribute('data-office') === office.id) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    detailContainer.innerHTML = `
      <div class="glass-panel office-detail-card">
        <div class="office-detail-header">
          <div>
            <span style="font-size: 2.2rem; line-height: 1;">${office.flag}</span>
            <h3 class="office-detail-title" style="margin-top: 0.5rem;">${office.city}, ${office.country}</h3>
          </div>
          ${office.isHQ ? `<span class="hq-badge">Global Headquarters</span>` : `<span style="font-size: 0.8rem; color: var(--cyan-glow); font-weight: 700;">Regional Office</span>`}
        </div>

        <div class="office-info-grid">
          <div class="office-info-item">
            <div class="office-info-icon">📍</div>
            <div class="office-info-text-wrap">
              <span class="office-info-label">Office Address</span>
              <p class="office-info-val">${office.address}</p>
            </div>
          </div>

          <div class="office-info-item">
            <div class="office-info-icon">📞</div>
            <div class="office-info-text-wrap">
              <span class="office-info-label">Direct Phone / WhatsApp</span>
              <p class="office-info-val"><a href="tel:${office.phone}" style="color: var(--cyan-glow); font-weight: 700;">${office.phone}</a></p>
            </div>
          </div>

          <div class="office-info-item">
            <div class="office-info-icon">✉️</div>
            <div class="office-info-text-wrap">
              <span class="office-info-label">Official Email</span>
              <p class="office-info-val"><a href="mailto:${office.email}" style="color: #fff;">${office.email}</a></p>
            </div>
          </div>

          <div class="office-info-item">
            <div class="office-info-icon">🕒</div>
            <div class="office-info-text-wrap">
              <span class="office-info-label">Operating Hours</span>
              <p class="office-info-val">${office.hours}</p>
            </div>
          </div>
        </div>

        <div style="display: flex; gap: 1rem; margin-top: 1rem;">
          <a href="${office.mapUrl}" target="_blank" rel="noopener" class="btn btn-primary-cyan" style="flex: 1;">
            🗺️ Get Directions on Google Maps
          </a>
          <button class="btn btn-primary-gold schedule-branch-btn" data-branch="${office.city}" style="flex: 1;">
            📅 Schedule Visit to ${office.city} Office
          </button>
        </div>
      </div>
    `;

    const branchBtn = detailContainer.querySelector('.schedule-branch-btn');
    if (branchBtn) {
      branchBtn.addEventListener('click', () => {
        const bookingModal = document.getElementById('booking-modal-overlay');
        const branchSelect = document.getElementById('modal-branch-select');
        if (branchSelect) branchSelect.value = office.id;
        if (bookingModal) bookingModal.classList.add('active');
      });
    }
  }

  // Render Tabs
  tabsContainer.innerHTML = OFFICES.map(off => `
    <button class="office-tab-btn ${off.isHQ ? 'active' : ''}" data-office="${off.id}">
      <span class="office-tab-flag">${off.flag}</span>
      <div class="office-tab-info">
        <span class="office-country">${off.city}</span>
        <span class="office-city">${off.country}</span>
      </div>
    </button>
  `).join('');

  document.querySelectorAll('.office-tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const officeId = btn.getAttribute('data-office');
      renderOfficeDetails(officeId);
    });
  });

  renderOfficeDetails('dubai');
}
