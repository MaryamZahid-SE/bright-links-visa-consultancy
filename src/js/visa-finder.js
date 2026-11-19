import { DESTINATIONS } from './data.js';

export function initVisaFinder() {
  const searchInput = document.getElementById('visa-search-input');
  const tagBtns = document.querySelectorAll('.tag-btn');
  const resultsContainer = document.getElementById('visa-results-grid');

  if (!resultsContainer) return;

  let currentCategory = 'all';
  let searchQuery = '';

  function renderDestinations() {
    const filtered = DESTINATIONS.filter(dest => {
      const matchesSearch = dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            dest.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
                            dest.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = currentCategory === 'all' || 
                              dest.tags.some(tag => tag.toLowerCase().includes(currentCategory.toLowerCase()));

      return matchesSearch && matchesCategory;
    });

    if (filtered.length === 0) {
      resultsContainer.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 3rem; color: var(--text-muted);">
          <p style="font-size: 1.2rem; margin-bottom: 0.5rem;">No matching visas found for "${searchQuery}"</p>
          <p style="font-size: 0.9rem;">Try searching for Canada, UK, Portugal, Germany, UAE, or Australia.</p>
        </div>
      `;
      return;
    }

    resultsContainer.innerHTML = filtered.map(dest => `
      <div class="destination-card" data-id="${dest.id}">
        <img src="${dest.image}" alt="${dest.name}" class="destination-card-img" />
        <div class="destination-overlay">
          <div class="destination-header">
            <span class="flag-badge">${dest.flag} ${dest.name}</span>
            <span style="font-size: 0.78rem; color: var(--gold-accent); font-weight: 700;">Rate: ${dest.successRate}</span>
          </div>
          <div class="destination-content">
            <h3 class="destination-name">${dest.name}</h3>
            <div class="destination-tags">
              ${dest.tags.map(t => `<span class="dest-tag">${t}</span>`).join('')}
            </div>
            <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 1rem;">${dest.description}</p>
            <div class="destination-action">
              <span>Time: ${dest.processingTime}</span>
              <button class="btn btn-outline-glass dest-detail-btn" data-id="${dest.id}" style="padding: 0.4rem 0.9rem; font-size: 0.8rem;">Apply Now →</button>
            </div>
          </div>
        </div>
      </div>
    `).join('');

    // Attach click listeners to cards/buttons
    document.querySelectorAll('.dest-detail-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = btn.getAttribute('data-id');
        openDestinationModal(id);
      });
    });
  }

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value;
      renderDestinations();
    });
  }

  tagBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tagBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentCategory = btn.getAttribute('data-category');
      renderDestinations();
    });
  });

  renderDestinations();
}

export function openDestinationModal(destId) {
  const dest = DESTINATIONS.find(d => d.id === destId);
  if (!dest) return;

  const modalOverlay = document.getElementById('global-modal-overlay');
  const modalContainer = document.getElementById('global-modal-content');

  modalContainer.innerHTML = `
    <div class="modal-header">
      <div style="display: flex; align-items: center; gap: 0.75rem;">
        <span style="font-size: 2rem;">${dest.flag}</span>
        <div>
          <h2 class="modal-title">${dest.name} Visa Guidance</h2>
          <span style="font-size: 0.8rem; color: var(--cyan-glow); font-weight: 700;">Processing: ${dest.processingTime}</span>
        </div>
      </div>
      <button class="modal-close-btn" id="close-modal-x">✕</button>
    </div>
    <div class="modal-body">
      <img src="${dest.image}" style="width: 100%; height: 220px; object-fit: cover; border-radius: var(--radius-md); margin-bottom: 1.5rem;" />
      
      <h4 style="color: #fff; font-size: 1.1rem; margin-bottom: 0.5rem;">Key Pathways & Requirements</h4>
      <p style="color: var(--text-muted); margin-bottom: 1.5rem; font-size: 0.95rem;">${dest.description}</p>
      
      <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; margin-bottom: 1.5rem; background: rgba(0, 210, 255, 0.05); padding: 1rem; border-radius: var(--radius-sm); border: 1px solid var(--border-cyan);">
        <div>
          <span style="font-size: 0.75rem; color: var(--text-dim); text-transform: uppercase;">Success Rate</span>
          <p style="color: var(--gold-accent); font-weight: 800; font-size: 1.2rem;">${dest.successRate}</p>
        </div>
        <div>
          <span style="font-size: 0.75rem; color: var(--text-dim); text-transform: uppercase;">Estimated Proof of Funds</span>
          <p style="color: #fff; font-weight: 800; font-size: 1.1rem;">${dest.minBudget}</p>
        </div>
      </div>

      <h4 style="color: #fff; font-size: 1rem; margin-bottom: 0.75rem;">Required Checklist:</h4>
      <ul style="color: var(--text-muted); font-size: 0.9rem; margin-bottom: 2rem; display: flex; flex-direction: column; gap: 0.5rem;">
        <li>✔ Valid Passport with 6+ months validity</li>
        <li>✔ Clean Police Clearance & Medical Fitness Certificate</li>
        <li>✔ Proof of Sufficient Financial Funds / Bank Statement</li>
        <li>✔ Certified Educational / Employment Certificates</li>
      </ul>

      <div style="display: flex; gap: 1rem;">
        <button class="btn btn-primary-gold" id="modal-book-now" style="flex: 1;">Book Consultation for ${dest.name}</button>
        <button class="btn btn-outline-glass" id="close-modal-btn">Close</button>
      </div>
    </div>
  `;

  modalOverlay.classList.add('active');

  const closeBtns = [document.getElementById('close-modal-x'), document.getElementById('close-modal-btn')];
  closeBtns.forEach(btn => {
    if (btn) btn.addEventListener('click', () => modalOverlay.classList.remove('active'));
  });

  const bookBtn = document.getElementById('modal-book-now');
  if (bookBtn) {
    bookBtn.addEventListener('click', () => {
      modalOverlay.classList.remove('active');
      const bookingModal = document.getElementById('booking-modal-overlay');
      if (bookingModal) bookingModal.classList.add('active');
    });
  }
}
