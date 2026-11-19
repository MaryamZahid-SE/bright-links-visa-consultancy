export function initBookingModal() {
  const modalOverlay = document.getElementById('booking-modal-overlay');
  const openBtns = document.querySelectorAll('.open-booking-modal-btn');
  const closeBtn = document.getElementById('close-booking-modal');
  const form = document.getElementById('booking-wizard-form');
  const successContainer = document.getElementById('booking-success-msg');

  if (!modalOverlay) return;

  openBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      modalOverlay.classList.add('active');
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      modalOverlay.classList.remove('active');
    });
  }

  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
      modalOverlay.classList.remove('active');
    }
  });

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = document.getElementById('modal-name-input').value;
      const phone = document.getElementById('modal-phone-input').value;
      const branch = document.getElementById('modal-branch-select').options[document.getElementById('modal-branch-select').selectedIndex].text;
      const visaType = document.getElementById('modal-visa-select').value;
      const date = document.getElementById('modal-date-input').value;

      form.style.display = 'none';
      if (successContainer) {
        successContainer.style.display = 'block';
        successContainer.innerHTML = `
          <div style="text-align: center; padding: 2rem 1rem;">
            <div style="width: 70px; height: 70px; margin: 0 auto 1.5rem; border-radius: 50%; background: rgba(37, 211, 102, 0.2); border: 2px solid #25d366; color: #25d366; display: flex; align-items: center; justify-content: center; font-size: 2rem;">
              ✓
            </div>
            <h3 style="color: #fff; font-size: 1.6rem; font-weight: 800; margin-bottom: 0.75rem;">Appointment Requested!</h3>
            <p style="color: var(--text-muted); font-size: 0.95rem; margin-bottom: 1.5rem;">
              Thank you, <strong style="color: #fff;">${name}</strong>! Your visa consultation with our <strong style="color: var(--cyan-glow);">${branch}</strong> office has been scheduled for <strong style="color: var(--gold-accent);">${date}</strong>.
            </p>
            <p style="color: var(--text-dim); font-size: 0.85rem; margin-bottom: 2rem;">
              Our senior consultant will contact you on <strong>${phone}</strong> within 2 hours to confirm your time slot.
            </p>
            <button class="btn btn-primary-cyan" id="reset-booking-btn">Done</button>
          </div>
        `;

        document.getElementById('reset-booking-btn').addEventListener('click', () => {
          modalOverlay.classList.remove('active');
          setTimeout(() => {
            form.reset();
            form.style.display = 'block';
            successContainer.style.display = 'none';
          }, 400);
        });
      }
    });
  }
}
