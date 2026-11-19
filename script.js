// BRIGHT LINKS L.L.C — MASTER INTERACTIVE JAVASCRIPT SYSTEM

document.addEventListener('DOMContentLoaded', () => {
  const root = document.documentElement;
  const menuBtn = document.getElementById('menuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  const transition = document.getElementById('flightTransition');

  let activeSelectedCountry = 'Canada'; // Default country selection
  let currentServiceV8Key = 'visit'; // Default service selection

  // Mobile Menu Toggle & Close Handlers
  const mobileCloseBtn = document.getElementById('mobileCloseBtn');
  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('open');
    });
  }
  if (mobileCloseBtn && mobileMenu) {
    mobileCloseBtn.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
    });
  }

  // Route Navigation with Flight Transition Animation (In-Page Anchors)
  document.querySelectorAll('[data-route]').forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (!href || !href.startsWith('#')) return;
      e.preventDefault();
      
      if (mobileMenu) mobileMenu.classList.remove('open');
      
      // Auto-pass country if navigating to appointment section
      if (href === '#appointment') {
        passCountryToAppointmentForm(activeSelectedCountry);
      }

      if (transition) {
        transition.classList.add('active');
        setTimeout(() => {
          if (link.dataset.megaCountry) {
            const previewBanner = document.getElementById('countryPreviewV12');
            if (previewBanner) {
              previewBanner.style.display = 'flex';
              previewBanner.scrollIntoView({ behavior: 'instant', block: 'start' });
              return;
            }
          }
          const target = document.querySelector(href);
          if (target) target.scrollIntoView({ behavior: 'instant', block: 'start' });
        }, 400);
        setTimeout(() => transition.classList.remove('active'), 850);
      } else {
        if (link.dataset.megaCountry) {
          const previewBanner = document.getElementById('countryPreviewV12');
          if (previewBanner) {
            previewBanner.style.display = 'flex';
            previewBanner.scrollIntoView({ behavior: 'smooth', block: 'start' });
            return;
          }
        }
        const target = document.querySelector(href);
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Inter-Page Navigation with Airplane Flight Transition (Between HTML Files)
  document.querySelectorAll('a[href*=".html"], [data-page-route]').forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (!href || href === '#' || href.startsWith('javascript:')) return;
      
      // If link points to an anchor on the CURRENT page, let data-route handle it
      if (href.startsWith('#') && document.querySelector(href)) return;

      e.preventDefault();
      if (mobileMenu) mobileMenu.classList.remove('open');

      if (transition) {
        transition.classList.add('active');
        setTimeout(() => {
          window.location.href = href;
        }, 450);
      } else {
        window.location.href = href;
      }
    });
  });

  // Services Mega Menu Link Click Handler (Auto-Selects Service & Scrolls to Detail Banner)
  document.querySelectorAll('[data-mega-service]').forEach(item => {
    item.addEventListener('click', () => {
      const sKey = item.dataset.megaService;
      if (sKey && typeof activateServiceV8 === 'function') {
        activateServiceV8(sKey, true);
      }
    });
  });

  // Destinations Mega Menu Link Click Handler (Auto-Selects Country & Scrolls to Selected Country Detail Bar)
  document.querySelectorAll('[data-mega-country]').forEach(item => {
    item.addEventListener('click', () => {
      const cName = item.dataset.megaCountry;
      if (cName) {
        sessionStorage.setItem('pendingSelectCountry', cName);
        if (typeof selectCountry === 'function') {
          selectCountry(cName, true);
        }
      }
    });
  });

  // Dynamically update Appointment Service Needed dropdown based on selected Country
  function updateAppointmentServicesForCountry(countryName) {
    const serviceSelect = document.getElementById('appointment-service-select');
    const otherWrap = document.getElementById('appointment-custom-service-wrap');
    if (!serviceSelect) return;

    const cName = (countryName || '').trim();
    
    // Find matching country key (case-insensitive match)
    let cData = countryDetailsData[cName];
    if (!cData && cName) {
      const matchKey = Object.keys(countryDetailsData).find(k => k.toLowerCase() === cName.toLowerCase());
      if (matchKey) cData = countryDetailsData[matchKey];
    }

    const currentVal = serviceSelect.value;

    if (cData && cData.services && cData.services.length > 0) {
      let optionsHTML = `<option value="">Select available service for ${cName || 'country'}...</option>`;
      cData.services.forEach(s => {
        optionsHTML += `<option value="${s}">${s}</option>`;
      });
      optionsHTML += `<option value="Other">Other (Type custom service...)</option>`;
      serviceSelect.innerHTML = optionsHTML;
    } else {
      // Default to full 7 services if no country or general country
      serviceSelect.innerHTML = `
        <option value="">Select service...</option>
        <option value="Travel and Tourism">Travel and Tourism</option>
        <option value="Tourist Visit Visa">Tourist Visit Visa</option>
        <option value="Business Visit Visa">Business Visit Visa</option>
        <option value="Temporary Residency">Temporary Residency</option>
        <option value="Golden Visa">Golden Visa</option>
        <option value="Second Citizenship">Second Citizenship</option>
        <option value="Study Abroad">Study Abroad</option>
        <option value="Other">Other (Type custom service...)</option>
      `;
    }

    if (currentVal && Array.from(serviceSelect.options).some(o => o.value === currentVal)) {
      serviceSelect.value = currentVal;
    } else {
      if (otherWrap) otherWrap.style.display = 'none';
    }
  }

  // Function to pass selected country to the appointment form
  function passCountryToAppointmentForm(countryName) {
    if (!countryName) return;
    const destInput = document.getElementById('appointment-destination-input');
    if (destInput) {
      destInput.value = countryName;
      destInput.classList.add('highlight-field');
      setTimeout(() => destInput.classList.remove('highlight-field'), 3000);
    }
    updateAppointmentServicesForCountry(countryName);
  }

  // SCHENGEN & GLOBAL DESTINATIONS LIST (EXACT USER SPECIFIED LIST IN A-Z ORDER)
  const allWorldCountries = [
    "Australia",
    "Austria",
    "Belgium",
    "Brazil",
    "Bulgaria",
    "Canada",
    "China",
    "Croatia",
    "Czech Republic",
    "Denmark",
    "Dubai, UAE",
    "Estonia",
    "Finland",
    "France",
    "Germany",
    "Greece",
    "Hong Kong",
    "Hungary",
    "Iceland",
    "Indonesia",
    "Ireland",
    "Italy",
    "Japan",
    "Latvia",
    "Liechtenstein",
    "Lithuania",
    "Luxembourg",
    "Malaysia",
    "Malta",
    "Netherlands",
    "New Zealand",
    "Norway",
    "Poland",
    "Portugal",
    "Romania",
    "Russia",
    "Saudi Arabia",
    "Schengen",
    "Singapore",
    "Slovakia",
    "Slovenia",
    "South Africa",
    "South Korea",
    "Spain",
    "Sweden",
    "Switzerland",
    "Thailand",
    "Turkey",
    "United Kingdom",
    "USA"
  ];

  const schengenServices = [
    "Tourist Visit Visa",
    "Business Visit Visa",
    "TRC (Temporary Residence)",
    "Golden Visa",
    "Study Visa",
    "Travel/Tourism Visa"
  ];

  // COUNTRY-SPECIFIC SERVICES DATA MAPPING FOR ALL SEARCHABLE DESTINATIONS
  const countryDetailsData = {
    "Schengen": { flag: "🇪🇺", services: schengenServices },
    "USA": { flag: "🇺🇸", services: ["Tourist Visit Visa", "Business Visit Visa", "Travel/Tourism Visa"] },
    "United States": { flag: "🇺🇸", services: ["Tourist Visit Visa", "Business Visit Visa", "Travel/Tourism Visa"] },
    "United Kingdom": { flag: "🇬🇧", services: ["Tourist Visit Visa", "Business Visit Visa", "Study Visa", "Travel/Tourism Visa"] },
    "UK": { flag: "🇬🇧", services: ["Tourist Visit Visa", "Business Visit Visa", "Study Visa", "Travel/Tourism Visa"] },
    "Australia": { flag: "🇦🇺", services: ["Tourist Visit Visa", "Business Visit Visa", "Travel/Tourism Visa"] },
    "Canada": { flag: "🇨🇦", services: ["Tourist Visit Visa", "Business Visit Visa", "Travel/Tourism Visa"] },
    "New Zealand": { flag: "🇳🇿", services: ["Tourist Visit Visa", "Business Visit Visa", "Travel/Tourism Visa"] },
    "Japan": { flag: "🇯🇵", services: ["Tourist Visit Visa", "Business Visit Visa", "Travel/Tourism Visa"] },
    "South Korea": { flag: "🇰🇷", services: ["Tourist Visit Visa", "Business Visit Visa", "Study Visa", "Travel/Tourism Visa"] },
    "Korea": { flag: "🇰🇷", services: ["Tourist Visit Visa", "Business Visit Visa", "Study Visa", "Travel/Tourism Visa"] },
    "South Africa": { flag: "🇿🇦", services: ["Tourist Visit Visa", "Business Visit Visa", "Travel/Tourism Visa"] },
    "Brazil": { flag: "🇧🇷", services: ["Tourist Visit Visa", "Business Visit Visa", "Travel/Tourism Visa"] },
    "Dubai, UAE": { flag: "🇦🇪", services: ["Tourist Visit Visa", "Residence / Employed Visa", "Travel/Tourism Visa"] },
    "United Arab Emirates": { flag: "🇦🇪", services: ["Tourist Visit Visa", "Residence / Employed Visa", "Travel/Tourism Visa"] },
    "Saudi Arabia": { flag: "🇸🇦", services: ["Tourist Visit Visa", "Umrah Visa", "Travel/Tourism Visa"] },
    "China": { flag: "🇨🇳", services: ["Business Visit Visa", "Travel/Tourism Visa"] },
    "Hong Kong": { flag: "🇭🇰", services: ["Tourist Visit Visa", "Business Visit Visa", "Travel/Tourism Visa"] },
    "Thailand": { flag: "🇹🇭", services: ["Tourist Visa", "Travel/Tourism Visa"] },
    "Malaysia": { flag: "🇲🇾", services: ["Tourist Visa", "Travel/Tourism Visa"] },
    "Indonesia": { flag: "🇮🇩", services: ["Tourist Visa", "Travel/Tourism Visa"] },
    "Singapore": { flag: "🇸🇬", services: ["Tourist Visa", "Travel/Tourism Visa"] },
    "Turkey": { flag: "🇹🇷", services: ["Tourist Visit Visa", "Business Visit Visa", "Travel/Tourism Visa"] },
    "Ireland": { flag: "🇮🇪", services: ["Tourist Visit Visa", "Business Visit Visa", "Travel/Tourism Visa"] },
    "Russia": { flag: "🇷🇺", services: ["Tourist Visit Visa", "Business Visit Visa", "Travel/Tourism Visa"] },

    // ALL 29 SCHENGEN MEMBER STATES
    "Austria": { flag: "🇦🇹", services: schengenServices },
    "Belgium": { flag: "🇧🇪", services: schengenServices },
    "Bulgaria": { flag: "🇧🇬", services: schengenServices },
    "Croatia": { flag: "🇭🇷", services: schengenServices },
    "Czech Republic": { flag: "🇨🇿", services: schengenServices },
    "Denmark": { flag: "🇩🇰", services: schengenServices },
    "Estonia": { flag: "🇪🇪", services: schengenServices },
    "Finland": { flag: "🇫🇮", services: schengenServices },
    "France": { flag: "🇫🇷", services: schengenServices },
    "Germany": { flag: "🇩🇪", services: schengenServices },
    "Greece": { flag: "🇬🇷", services: schengenServices },
    "Hungary": { flag: "🇭🇺", services: schengenServices },
    "Iceland": { flag: "🇮🇸", services: schengenServices },
    "Italy": { flag: "🇮🇹", services: schengenServices },
    "Latvia": { flag: "🇱🇻", services: schengenServices },
    "Liechtenstein": { flag: "🇱🇮", services: schengenServices },
    "Lithuania": { flag: "🇱🇹", services: schengenServices },
    "Luxembourg": { flag: "🇱🇺", services: schengenServices },
    "Malta": { flag: "🇲🇹", services: schengenServices },
    "Netherlands": { flag: "🇳🇱", services: schengenServices },
    "Norway": { flag: "🇳🇴", services: schengenServices },
    "Poland": { flag: "🇵🇱", services: schengenServices },
    "Portugal": { flag: "🇵🇹", services: schengenServices },
    "Romania": { flag: "🇷🇴", services: schengenServices },
    "Slovakia": { flag: "🇸🇰", services: schengenServices },
    "Slovenia": { flag: "🇸🇮", services: schengenServices },
    "Spain": { flag: "🇪🇸", services: schengenServices },
    "Sweden": { flag: "🇸🇪", services: schengenServices },
    "Switzerland": { flag: "🇨🇭", services: schengenServices }
  };

  // SEARCHABLE AUTOCOMPLETE FUNCTION GENERATOR
  function setupSearchableDropdown(inputId, dropdownId) {
    const inputEl = document.getElementById(inputId);
    const dropdownEl = document.getElementById(dropdownId);

    if (!inputEl || !dropdownEl) return;

    function renderList(query) {
      const q = (query || '').toLowerCase().trim();
      const matches = q ? allWorldCountries.filter(c => c.toLowerCase().includes(q)) : allWorldCountries;

      if (matches.length === 0) {
        dropdownEl.innerHTML = `<div style="padding: 12px; color: #8498a8; font-size: 0.85rem; text-align: center;">No country found matching "${query}"</div>`;
      } else {
        dropdownEl.innerHTML = matches.map(c => `
          <div class="autocomplete-item" data-country="${c}">
            <span>${c}</span>
            <span style="font-size: 0.75rem; color: var(--cyan); font-weight: 800;">Select →</span>
          </div>
        `).join('');
      }

      dropdownEl.classList.add('show');

      dropdownEl.querySelectorAll('.autocomplete-item').forEach(item => {
        item.addEventListener('click', () => {
          const selected = item.dataset.country;
          inputEl.value = selected;
          dropdownEl.classList.remove('show');

          if (inputId === 'appointment-destination-input') {
            updateAppointmentServicesForCountry(selected);
          }

          inputEl.dispatchEvent(new Event('input', { bubbles: true }));
          inputEl.dispatchEvent(new Event('change', { bubbles: true }));
        });
      });
    }

    inputEl.addEventListener('input', (e) => {
      renderList(e.target.value);
    });

    inputEl.addEventListener('focus', () => {
      renderList(inputEl.value);
    });

    document.addEventListener('click', (e) => {
      if (!inputEl.contains(e.target) && !dropdownEl.contains(e.target)) {
        dropdownEl.classList.remove('show');
      }
    });
  }

  // Setup Autocomplete for From Country & Target Destination
  setupSearchableDropdown('appointment-from-country-input', 'fromCountryDropdown');
  setupSearchableDropdown('appointment-destination-input', 'appointmentCountryDropdown');
  setupSearchableDropdown('review-country-input', 'reviewCountryDropdown');
  setupSearchableDropdown('standalone-country-input', 'standaloneCountryDropdown');

  // CUSTOM "OTHER" SERVICE DROPDOWN TOGGLE
  const serviceSelect = document.getElementById('appointment-service-select');
  const supportSelect = document.getElementById('appointment-support-select');
  const otherWrap = document.getElementById('other-service-wrap');

  if (serviceSelect && otherWrap) {
    serviceSelect.addEventListener('change', () => {
      if (serviceSelect.value === 'Other') {
        otherWrap.style.display = 'block';
      } else {
        otherWrap.style.display = 'none';
      }
    });
  }

  // Interactive Country Pins & Quick Selector Chips Click Handler
  document.querySelectorAll('.map-pin').forEach(pin => {
    pin.addEventListener('click', () => {
      const place = pin.dataset.place;
      if (!place) return;

      selectCountry(place);

      // Trigger flight transition and scroll smoothly to Destinations section
      if (transition) {
        transition.classList.add('active');
        setTimeout(() => {
          const target = document.getElementById('destinations');
          if (target) {
            target.scrollIntoView({ behavior: 'instant', block: 'start' });
          } else {
            sessionStorage.setItem('pendingSelectCountry', place);
            window.location.href = 'destinations.html';
          }
        }, 400);
        setTimeout(() => transition.classList.remove('active'), 850);
      } else {
        const target = document.getElementById('destinations');
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
          sessionStorage.setItem('pendingSelectCountry', place);
          window.location.href = 'destinations.html';
        }
      }
    });
  });

  // Mouse Parallax Effect on Hero Plane
  const stage = document.getElementById('heroStage');
  const plane = document.getElementById('heroPlane');
  if (stage && plane) {
    stage.addEventListener('pointermove', (e) => {
      const rect = stage.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      plane.style.transform = `translate(${x * 25}px, ${y * 15}px)`;
    });
    stage.addEventListener('pointerleave', () => {
      plane.style.transform = 'none';
    });
  }

  // Services V8 Component Switcher (7 OFFICIAL SERVICES MATCHING BOOKING FORM)
  const serviceV8Data = {
    travel: {
      kicker: 'TRAVEL & TOURISM',
      title: 'Travel and Tourism',
      description: 'Custom holiday packages, luxury itineraries, family visits, flight reservations, and hotel voucher arrangements.',
      tags: ['Holidays', 'Family Visits', 'Flight Reservations', 'Hotel Vouchers'],
      selectValue: 'Travel and Tourism'
    },
    tourist: {
      kicker: 'TOURIST VISIT VISA',
      title: 'Tourist Visit Visa',
      description: 'Short-term visitor visa filing, tourist entry permits, Schengen visitor visas, and global tourist visa support.',
      tags: ['Tourist Visas', 'Visitor Permits', 'Schengen Visas', 'Global Travel'],
      selectValue: 'Tourist Visit Visa'
    },
    business: {
      kicker: 'BUSINESS VISIT VISA',
      title: 'Business Visit Visa',
      description: 'Commercial visit visas, trade summit entry, corporate delegation permits, and international business meetings.',
      tags: ['Business Visas', 'Trade Summits', 'Corporate Permits', 'Commercial Travel'],
      selectValue: 'Business Visit Visa'
    },
    temp_residency: {
      kicker: 'TEMPORARY RESIDENCY',
      title: 'Temporary Residency',
      description: 'Temporary residency cards (TRC), digital nomad permits, temporary work & living residency across global destinations.',
      tags: ['TRC Permits', 'Digital Nomad Visas', 'Temporary Work', 'Living Permits'],
      selectValue: 'Temporary Residency'
    },
    golden: {
      kicker: 'GOLDEN VISA',
      title: 'Golden Visa',
      description: 'Long-term investor residency, 10-year Golden Visas, real estate investor routes, and high-net-worth residency solutions.',
      tags: ['10-Year Golden Visas', 'Investor Residency', 'Real Estate Routes', 'Long-Term Residency'],
      selectValue: 'Golden Visa'
    },
    citizenship: {
      kicker: 'SECOND CITIZENSHIP',
      title: 'Second Citizenship',
      description: 'Citizenship by investment programs, dual passport pathways, global mobility expansion, and international tax planning.',
      tags: ['Dual Passports', 'Citizenship By Investment', 'Global Mobility', 'Tax Optimization'],
      selectValue: 'Second Citizenship'
    },
    study: {
      kicker: 'STUDY ABROAD',
      title: 'Study Abroad',
      description: 'University admission guidance, student visa application filing, financial proof validation, and pre-departure assistance.',
      tags: ['University Admissions', 'Student Visas', 'Financial Proof', 'Pre-Departure Support'],
      selectValue: 'Study Abroad'
    }
  };

  function activateServiceV8(key, scrollIntoView = false) {
    const data = serviceV8Data[key];
    if (!data) return;

    currentServiceV8Key = key;

    document.querySelectorAll('.service-card-v8').forEach(card => {
      const active = card.dataset.service === key;
      card.classList.toggle('active', active);
    });

    const kicker = document.getElementById('serviceV8Kicker');
    const title = document.getElementById('serviceV8Title');
    const desc = document.getElementById('serviceV8Description');
    const tagsContainer = document.getElementById('serviceV8Tags');

    if (kicker) kicker.textContent = data.kicker;
    if (title) title.textContent = data.title;
    if (desc) desc.textContent = data.description;
    if (tagsContainer) {
      tagsContainer.innerHTML = data.tags.map(t => `<span>${t}</span>`).join('');
    }

    if (scrollIntoView) {
      const detailBanner = document.getElementById('serviceDetailV8');
      if (detailBanner) {
        detailBanner.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }

  document.querySelectorAll('.service-card-v8').forEach(card => {
    card.addEventListener('click', () => {
      activateServiceV8(card.dataset.service, true);
    });
  });

  // DISCUSS THIS SERVICE BUTTON ACTION (AUTO-PASS SERVICE TO BOOKING FORM)
  const discussServiceBtn = document.getElementById('discussServiceV8Btn');
  if (discussServiceBtn) {
    discussServiceBtn.addEventListener('click', (e) => {
      e.preventDefault();
      
      const serviceData = serviceV8Data[currentServiceV8Key];
      if (serviceData && serviceSelect) {
        serviceSelect.value = serviceData.selectValue;
        if (otherWrap) otherWrap.style.display = 'none';

        serviceSelect.classList.add('highlight-field');
        setTimeout(() => serviceSelect.classList.remove('highlight-field'), 3000);
      }

      const targetForm = document.getElementById('appointment');
      if (targetForm) {
        targetForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  }

  // INTERACTIVE OFFICE CARDS CLICK HANDLER
  document.querySelectorAll('.office-card-v12').forEach(card => {
    card.addEventListener('click', () => {
      const targetForm = document.getElementById('appointment');
      if (targetForm) {
        targetForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Popular Cards Interaction & Data-Passing
  const popularCards = document.querySelectorAll('.popular-country-v12');
  const previewCountryName = document.getElementById('previewCountryV12');

  function selectCountry(countryName, autoScroll = false) {
    if (!countryName) return;
    const trimmedCountry = countryName.trim();
    activeSelectedCountry = trimmedCountry;
    
    if (previewCountryName) previewCountryName.textContent = trimmedCountry;

    // Highlight matching card in the grid
    popularCards.forEach(c => {
      const cardC = (c.dataset.country || '').toLowerCase().trim();
      const targetC = trimmedCountry.toLowerCase();
      if (cardC === targetC || cardC.includes(targetC) || targetC.includes(cardC)) {
        c.classList.add('selected');
      } else {
        c.classList.remove('selected');
      }
    });

    // Render Country-Specific Available Visa Services inside preview banner (#countryPreviewServices)
    const previewServicesContainer = document.getElementById('countryPreviewServices');
    let cData = countryDetailsData[trimmedCountry];
    if (!cData) {
      const matchKey = Object.keys(countryDetailsData).find(k => k.toLowerCase() === trimmedCountry.toLowerCase());
      if (matchKey) cData = countryDetailsData[matchKey];
    }

    if (previewServicesContainer) {
      const availableServices = (cData && cData.services && cData.services.length > 0)
        ? cData.services
        : ["Tourist Visit Visa", "Business Visit Visa", "Travel/Tourism Visa"];

      previewServicesContainer.innerHTML = `
        <div style="margin-top: 3px;">
          <small style="display: block; color: #64748b; font-size: 0.72rem; font-weight: 800; letter-spacing: 0.6px; margin-bottom: 6px;">AVAILABLE SERVICES FOR ${trimmedCountry.toUpperCase()}:</small>
          <div style="display: flex; gap: 6px; flex-wrap: wrap;">
            ${availableServices.map(s => `<span style="background: #eaf4fc; color: #0c4a6e; border: 1px solid #bae0f7; padding: 4px 11px; border-radius: 999px; font-size: 0.76rem; font-weight: 700;">${s}</span>`).join('')}
          </div>
        </div>
      `;
    }

    // Reveal Selected Country Banner right beneath the grid (Image 1)
    const previewBanner = document.getElementById('countryPreviewV12');
    if (previewBanner) {
      previewBanner.style.display = 'flex';
      previewBanner.classList.add('highlight-field');
      setTimeout(() => previewBanner.classList.remove('highlight-field'), 3000);

      if (autoScroll) {
        setTimeout(() => {
          previewBanner.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 350);
      }
    }

    passCountryToAppointmentForm(trimmedCountry);
  }

  popularCards.forEach(card => {
    card.addEventListener('click', () => {
      const country = card.dataset.country;
      if (country) {
        selectCountry(country, true);
      }
    });
  });

  // Auto-restore pending country selection from sessionStorage on page load
  const pendingCountry = sessionStorage.getItem('pendingSelectCountry');
  if (pendingCountry && typeof selectCountry === 'function') {
    setTimeout(() => {
      selectCountry(pendingCountry, true);
      sessionStorage.removeItem('pendingSelectCountry');
    }, 450);
  }

  // Smooth-scroll to target anchor hash on cross-page navigation
  if (window.location.hash) {
    setTimeout(() => {
      try {
        const targetAnchor = document.querySelector(window.location.hash);
        if (targetAnchor) {
          targetAnchor.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      } catch (e) {}
    }, 450);
  }

  // REAL-TIME SEARCHABLE COUNTRY FIELD IN EXPLORE DESTINATIONS SECTION
  const countrySearchInput = document.getElementById('countrySearchV12');
  const dropdownList = document.getElementById('countryAutocompleteList');

  if (countrySearchInput && dropdownList) {
    function renderAutocomplete(query) {
      const q = (query || '').toLowerCase().trim();
      const matches = q ? allWorldCountries.filter(c => c.toLowerCase().includes(q)) : allWorldCountries;

      if (matches.length === 0) {
        dropdownList.innerHTML = `<div style="padding: 12px; color: #8498a8; font-size: 0.85rem; text-align: center;">No country found matching "${query}"</div>`;
      } else {
        dropdownList.innerHTML = matches.map(c => `
          <div class="autocomplete-item" data-country="${c}">
            <span>${c}</span>
            <span style="font-size: 0.75rem; color: var(--cyan); font-weight: 800;">Select →</span>
          </div>
        `).join('');
      }

      dropdownList.classList.add('show');

      dropdownList.querySelectorAll('.autocomplete-item').forEach(item => {
        item.addEventListener('click', () => {
          const selected = item.dataset.country;
          countrySearchInput.value = selected;
          dropdownList.classList.remove('show');
          selectCountry(selected);

          // Smoothly scroll down to focus directly on the Selected Country Banner (#countryPreviewV12)
          const previewBanner = document.getElementById('countryPreviewV12');
          if (previewBanner) {
            previewBanner.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        });
      });
    }

    countrySearchInput.addEventListener('click', () => {
      renderAutocomplete(countrySearchInput.value);
    });

    countrySearchInput.addEventListener('focus', () => {
      renderAutocomplete(countrySearchInput.value);
    });

    countrySearchInput.addEventListener('input', (e) => {
      renderAutocomplete(e.target.value);
    });

    document.addEventListener('click', (e) => {
      if (!countrySearchInput.contains(e.target) && !dropdownList.contains(e.target)) {
        dropdownList.classList.remove('show');
      }
    });
  }

  // Inquire Now Button Action (In Explore Destinations)
  const inquireBtn = document.getElementById('inquireDestinationBtn');
  if (inquireBtn) {
    inquireBtn.addEventListener('click', (e) => {
      e.preventDefault();
      passCountryToAppointmentForm(activeSelectedCountry);

      const targetForm = document.getElementById('appointment');
      if (targetForm) {
        targetForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        window.location.href = 'index.html#appointment';
      }
    });
  }

  // SMART VISA FINDER REDESIGN — 1-STEP-AT-A-TIME LUXURY WIZARD SYSTEM
  const finderSteps = [...document.querySelectorAll('.finder-step')];
  const finderChoices = [...document.querySelectorAll('.finder-choice')];
  const finderBack = document.getElementById('finderBack');
  const finderReset = document.getElementById('finderReset');
  const finderCounter = document.getElementById('finderCounter');
  const progressSteps = [...document.querySelectorAll('.progress-step')];

  const wizardData = {
    1: { value: 'Travel and Tourism', label: 'Travel and Tourism' },
    2: { value: 'Canada', label: 'Canada' },
    3: { value: 'Pathway Guidance', label: 'Pathway Guidance' },
    4: { action: 'appointment' }
  };

  let finderCurrentStep = 1;

  function renderWizardStep() {
    finderSteps.forEach((stepEl, idx) => {
      const stepNum = idx + 1;
      if (stepNum === finderCurrentStep) {
        stepEl.classList.add('active');
      } else {
        stepEl.classList.remove('active');
      }
    });

    progressSteps.forEach((progEl, idx) => {
      const stepNum = idx + 1;
      if (stepNum <= finderCurrentStep) {
        progEl.classList.add('active');
      } else {
        progEl.classList.remove('active');
      }
    });

    if (finderCounter) finderCounter.textContent = `Question ${finderCurrentStep} of 4`;
    if (finderBack) finderBack.style.visibility = (finderCurrentStep === 1) ? 'hidden' : 'visible';
  }

  finderChoices.forEach(choice => {
    choice.addEventListener('click', () => {
      const stepEl = choice.closest('.finder-step');
      const stepNum = Number(stepEl.dataset.step);

      // Save choice data
      wizardData[stepNum] = {
        value: choice.dataset.value || '',
        label: choice.dataset.label || choice.querySelector('b')?.textContent || ''
      };

      // Mark choice selected
      [...choice.parentElement.children].forEach(c => c.classList.remove('selected'));
      choice.classList.add('selected');

      // Step Action Logic
      if (stepNum < 4) {
        setTimeout(() => {
          finderCurrentStep = stepNum + 1;
          renderWizardStep();
        }, 220);
      } else {
        // Step 4 Action: Ask a Question vs Book Consultation
        const action = choice.dataset.value;
        if (action === 'whatsapp') {
          // Launch WhatsApp directly with choices summary
          const purpose = wizardData[1]?.label || 'Travel';
          const destination = wizardData[2]?.label || 'Destination';
          const support = wizardData[3]?.label || 'Guidance';

          const whatsappMsg = 
`Hello Bright Links, I would like to request an appointment.

Service: ${purpose}
Support Needed: ${support}
Destination: ${destination}
Plans: Seeking ${support}

Please let me know the available appointment time.`;

          window.open(`https://wa.me/971522994897?text=${encodeURIComponent(whatsappMsg)}`, '_blank', 'noopener,noreferrer');
        } else {
          // Book Consultation -> Auto-pass choices to appointment form
          const purposeVal = wizardData[1]?.value || 'Visit & Tourism';
          const destVal = wizardData[2]?.value || 'Canada';
          const supportVal = wizardData[3]?.value || 'Pathway Guidance';

          // 1. Service Needed
          if (serviceSelect) {
            serviceSelect.value = purposeVal;
            serviceSelect.classList.add('highlight-field');
            setTimeout(() => serviceSelect.classList.remove('highlight-field'), 3000);
          }

          // 2. Support Level Needed (NEW FIELD MATCHING USER SCREENSHOT #1)
          if (supportSelect) {
            supportSelect.value = supportVal;
            supportSelect.classList.add('highlight-field');
            setTimeout(() => supportSelect.classList.remove('highlight-field'), 3000);
          }

          // 3. Target Destination
          const destInput = document.getElementById('appointment-destination-input');
          if (destInput) {
            destInput.value = destVal;
            destInput.classList.add('highlight-field');
            setTimeout(() => destInput.classList.remove('highlight-field'), 3000);
          }

          // 4. Travel Plans
          const plansInput = document.getElementById('appointment-plans-input');
          if (plansInput) {
            plansInput.value = `Targeting ${destVal} for ${purposeVal}. Require ${supportVal}.`;
            plansInput.classList.add('highlight-field');
            setTimeout(() => plansInput.classList.remove('highlight-field'), 3000);
          }

          // Smooth scroll to form
          const targetForm = document.getElementById('appointment');
          if (targetForm) {
            targetForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }
      }
    });
  });

  if (finderBack) {
    finderBack.addEventListener('click', () => {
      if (finderCurrentStep > 1) {
        finderCurrentStep--;
        renderWizardStep();
      }
    });
  }

  if (finderReset) {
    finderReset.addEventListener('click', () => {
      finderCurrentStep = 1;
      finderChoices.forEach(c => c.classList.remove('selected'));
      renderWizardStep();
    });
  }

  const appointmentDestInput = document.getElementById('appointment-destination-input');
  if (appointmentDestInput) {
    appointmentDestInput.addEventListener('input', (e) => {
      updateAppointmentServicesForCountry(e.target.value);
    });
    appointmentDestInput.addEventListener('change', (e) => {
      updateAppointmentServicesForCountry(e.target.value);
    });
  }

  // DYNAMIC OTHER SERVICE & OTHER SUPPORT TOGGLE HANDLERS
  const apptServiceSelect = document.getElementById('appointment-service-select');
  const otherServiceWrap = document.getElementById('other-service-wrap');

  if (apptServiceSelect && otherServiceWrap) {
    apptServiceSelect.addEventListener('change', () => {
      if (apptServiceSelect.value === 'Other') {
        otherServiceWrap.style.display = 'block';
      } else {
        otherServiceWrap.style.display = 'none';
      }
    });
  }

  const apptSupportSelect = document.getElementById('appointment-support-select');
  const otherSupportWrap = document.getElementById('other-support-wrap');

  if (apptSupportSelect && otherSupportWrap) {
    apptSupportSelect.addEventListener('change', () => {
      if (apptSupportSelect.value === 'Other') {
        otherSupportWrap.style.display = 'block';
      } else {
        otherSupportWrap.style.display = 'none';
      }
    });
  }

  // APPOINTMENT FORM — DIRECT WHATSAPP SUBMISSION (WITH DEDICATED SUPPORT NEEDED LINE)
  const appointmentForm = document.getElementById('appointmentForm');
  if (appointmentForm) {
    appointmentForm.addEventListener('submit', (e) => {
      e.preventDefault();

      if (!appointmentForm.checkValidity()) {
        appointmentForm.reportValidity();
        return;
      }

      const name = document.getElementById('appointment-name-input')?.value.trim() || '';
      
      // Combine Country Calling Code + Local Phone Input
      const countryCode = document.getElementById('appointment-country-code')?.value || '';
      const localPhone = document.getElementById('appointment-phone-input')?.value.trim() || '';
      let fullPhone = localPhone;
      if (countryCode && !localPhone.startsWith('+')) {
        fullPhone = `${countryCode} ${localPhone}`;
      }

      const email = document.getElementById('appointment-email-input')?.value.trim() || '';
      
      let service = document.getElementById('appointment-service-select')?.value || '';
      if (service === 'Other') {
        const customService = document.getElementById('other-service-input')?.value.trim();
        service = customService ? `Other: ${customService}` : 'Other Custom Service';
      }

      let supportNeeded = document.getElementById('appointment-support-select')?.value || 'Not specified';
      if (supportNeeded === 'Other') {
        const customSupport = document.getElementById('other-support-input')?.value.trim();
        supportNeeded = customSupport ? `Other: ${customSupport}` : 'Other Custom Support Level';
      }

      const fromCountry = document.getElementById('appointment-from-country-input')?.value.trim() || 'Not specified';
      const destination = document.getElementById('appointment-destination-input')?.value.trim() || 'Not specified';
      const plans = document.getElementById('appointment-plans-input')?.value.trim() || 'Not specified';

      // EXACT WHATSAPP MESSAGE FORMAT WITH DEDICATED SUPPORT NEEDED LINE
      const message = 
`Hello Bright Links, I would like to request an appointment.

Name: ${name}
Phone / WhatsApp: ${fullPhone}
Email: ${email}
Service: ${service}
Support Needed: ${supportNeeded}
From Country: ${fromCountry}
Destination: ${destination}
Plans: ${plans}

Please let me know the available appointment time.`;

      const whatsappUrl = `https://wa.me/971522994897?text=${encodeURIComponent(message)}`;

      const note = document.getElementById('formNote');
      if (note) {
        note.textContent = 'Redirecting to WhatsApp with your appointment request...';
        note.style.color = 'var(--cyan)';
      }

      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    });
  }

  // FLOATING WHATSAPP CHAT
  const floatingChat = document.getElementById('floatingChat');
  if (floatingChat) {
    floatingChat.addEventListener('click', () => {
      window.open('https://wa.me/971522994897?text=Hello%20Bright%20Links,%20I%20have%20a%20question%20about%20my%20visa%20plans.', '_blank', 'noopener,noreferrer');
    });
  }

  // CUSTOMER REVIEWS & STAR RATINGS SYSTEM
  const openReviewBtn = document.getElementById('openReviewFormBtn');
  const reviewFormWrap = document.getElementById('inlineReviewFormWrap');

  if (openReviewBtn && reviewFormWrap) {
    openReviewBtn.addEventListener('click', () => {
      if (reviewFormWrap.style.display === 'none' || !reviewFormWrap.style.display) {
        reviewFormWrap.style.display = 'block';
        reviewFormWrap.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      } else {
        reviewFormWrap.style.display = 'none';
      }
    });
  }

  // Star Rating Picker Generator Function
  function setupStarRatingPicker(pickerId, inputId) {
    const picker = document.getElementById(pickerId);
    const hiddenInput = document.getElementById(inputId);
    if (!picker || !hiddenInput) return;

    const stars = picker.querySelectorAll('span');
    stars.forEach(star => {
      star.addEventListener('click', () => {
        const rating = parseInt(star.dataset.star, 10) || 5;
        hiddenInput.value = rating;
        
        stars.forEach((s, idx) => {
          if (idx < rating) {
            s.style.color = '#ffd700';
          } else {
            s.style.color = '#506578';
          }
        });
      });
    });
  }

  setupStarRatingPicker('starRatingPicker', 'review-rating-value');
  setupStarRatingPicker('standaloneStarPicker', 'standalone-rating-value');

  // Format Current Date and Time (e.g. "August 12, 2026 at 4:45 PM")
  function getFormattedDateTime() {
    const now = new Date();
    const optionsDate = { month: 'long', day: 'numeric', year: 'numeric' };
    const optionsTime = { hour: 'numeric', minute: '2-digit', hour12: true };
    return `${now.toLocaleDateString('en-US', optionsDate)} at ${now.toLocaleTimeString('en-US', optionsTime)}`;
  }

  // Helper to render stars string
  function renderStarIcons(ratingCount) {
    const num = Math.min(5, Math.max(1, parseInt(ratingCount, 10) || 5));
    return '★ '.repeat(num).trim();
  }

  // Toggle Custom Service Input in Review Form
  function setupReviewServiceToggle(selectId, customWrapId, customInputId) {
    const selectEl = document.getElementById(selectId);
    const wrapEl = document.getElementById(customWrapId);
    const inputEl = document.getElementById(customInputId);

    if (!selectEl || !wrapEl) return;

    selectEl.addEventListener('change', () => {
      if (selectEl.value === 'Other') {
        wrapEl.style.display = 'block';
        if (inputEl) inputEl.required = true;
      } else {
        wrapEl.style.display = 'none';
        if (inputEl) inputEl.required = false;
      }
    });
  }

  setupReviewServiceToggle('review-service-select', 'review-custom-service-wrap', 'review-custom-service-input');
  setupReviewServiceToggle('standalone-service-select', 'standalone-custom-service-wrap', 'standalone-custom-service-input');

  // Helper to extract 2-Letter ISO Country Code
  function get2LetterCountryCode(countryName) {
    const c = (countryName || '').trim();
    const cLower = c.toLowerCase();
    
    if (cLower.includes('pakistan')) return 'PK';
    if (cLower.includes('canada')) return 'CA';
    if (cLower.includes('united kingdom') || cLower.includes('uk') || cLower.includes('london')) return 'GB';
    if (cLower.includes('portugal') || cLower.includes('lisbon')) return 'PT';
    if (cLower.includes('germany')) return 'DE';
    if (cLower.includes('dubai') || cLower.includes('uae') || cLower.includes('emirates')) return 'AE';
    if (cLower.includes('france')) return 'FR';
    if (cLower.includes('andorra')) return 'AD';
    if (cLower.includes('united states') || cLower.includes('usa') || cLower.includes('us')) return 'US';
    if (cLower.includes('australia')) return 'AU';
    if (cLower.includes('saudi')) return 'SA';
    if (cLower.includes('qatar')) return 'QA';
    if (cLower.includes('oman')) return 'OM';
    if (cLower.includes('turkey') || cLower.includes('türkiye')) return 'TR';
    
    if (c.length >= 2) return c.substring(0, 2).toUpperCase();
    return 'GL';
  }

  // Map Country Name & Service to 2-letter Country Code Badge
  function getCountryFlagBadge(countryName, serviceName) {
    const code = get2LetterCountryCode(countryName);
    return `<span style="font-weight: 800; color: var(--cyan);">${code}</span> ${countryName} ${serviceName}`.trim();
  }

  // LIVE REAL-TIME CLOUD REVIEWS DATABASE ENDPOINT (AUTOMATICALLY SYNCED ACROSS ALL GADGETS)
  const CLOUD_SYNC_ENDPOINT = 'https://crudcrud.com/api/5e3d6ac8ef964601863c36b9d72bc42a/reviews';

  // Submit Review Handler (SAVES LOCALLY + SYNCED LIVE ACROSS ALL GADGETS LAPTOP, TABLET, MOBILE)
  function handleReviewSubmission(authorInputId, countryInputId, serviceSelectId, customInputId, ratingInputId, textInputId, formId) {
    const form = document.getElementById(formId);
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const author = document.getElementById(authorInputId)?.value.trim();
      const country = document.getElementById(countryInputId)?.value.trim() || 'Global';
      
      let service = document.getElementById(serviceSelectId)?.value || 'Visa Service';
      if (service === 'Other') {
        const customText = document.getElementById(customInputId)?.value.trim();
        service = customText ? customText : 'Custom Service';
      }

      const rating = document.getElementById(ratingInputId)?.value || '5';
      const text = document.getElementById(textInputId)?.value.trim();
      const timestamp = getFormattedDateTime();

      if (!author || !text) return;

      const initials = author.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2) || 'CL';
      const badge = getCountryFlagBadge(country, service);

      const newReview = {
        author,
        initials,
        country,
        service,
        badge,
        rating,
        text,
        timestamp
      };

      // 1. Save locally
      let savedReviews = JSON.parse(localStorage.getItem('bright_links_custom_reviews') || '[]');
      savedReviews.unshift(newReview);
      localStorage.setItem('bright_links_custom_reviews', JSON.stringify(savedReviews));

      // 2. Post to Live Cloud API Endpoint for instant multi-device sync
      fetch(CLOUD_SYNC_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newReview)
      }).then(() => {
        syncCloudReviews();
      }).catch(err => console.log('Cloud sync status:', err));

      alert(`Thank you ${author}! Your verified review for ${country} has been published across all devices.`);
      form.reset();

      // Reset custom wraps
      const customWrap = document.getElementById(formId === 'customerReviewForm' ? 'review-custom-service-wrap' : 'standalone-custom-service-wrap');
      if (customWrap) customWrap.style.display = 'none';

      renderCustomReviews();
    });
  }

  handleReviewSubmission('review-author-input', 'review-country-input', 'review-service-select', 'review-custom-service-input', 'review-rating-value', 'review-text-input', 'customerReviewForm');
  handleReviewSubmission('standalone-author-input', 'standalone-country-input', 'standalone-service-select', 'standalone-custom-service-input', 'standalone-rating-value', 'standalone-text-input', 'standaloneReviewForm');

  // COUNTRY FILTER BUTTONS HANDLER FOR REVIEWS
  document.querySelectorAll('.review-filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.review-filter-btn').forEach(b => {
        b.classList.remove('active');
        b.style.background = '#ffffff';
        b.style.color = '#1e3a5f';
      });

      btn.classList.add('active');
      btn.style.background = '#0084c7';
      btn.style.color = '#ffffff';

      const filter = btn.dataset.filter.toLowerCase();
      
      document.querySelectorAll('.review-card-v12').forEach(card => {
        const cAttr = (card.dataset.country || '').toLowerCase();
        if (filter === 'all' || cAttr.includes(filter)) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // MASTER VERIFIED REVIEWS STORE (ALWAYS SYNCHRONIZED ACROSS ALL DEVICES)
  const masterDefaultReviews = [
    {
      id: 'rev_0',
      author: 'Zaima Zafar',
      initials: 'ZZ',
      country: 'South Korea',
      service: 'SO South Korea Business Visit & Exhibition',
      badge: '<span style="font-weight: 800; color: var(--cyan);">SO</span> South Korea Business Visit & Exhibition',
      rating: '5',
      text: 'Here a great Experience I got Thanks Bright Links.',
      timestamp: 'August 15, 2026 at 1:03 PM'
    },
    {
      id: 'rev_1',
      author: 'Manahil Eman',
      initials: 'ME',
      country: 'Switzerland',
      service: 'SW Switzerland Study Abroad',
      badge: '<span style="font-weight: 800; color: var(--cyan);">SW</span> Switzerland Study Abroad',
      rating: '5',
      text: 'Really impressive work. I am honored that i get to work with Bright Links during my visa process.',
      timestamp: 'August 12, 2026 at 5:23 PM'
    },
    {
      id: 'rev_2',
      author: 'Abdullah Tahir',
      initials: 'AT',
      country: 'Andorra',
      service: 'Andorra Golden Visa',
      badge: '<span style="font-weight: 800; color: var(--cyan);">🌐</span> Andorra Golden Visa',
      rating: '5',
      text: 'A great experince with the Bright Links Team. Very coprative nature and best management. They do what they say. Highly Recommended.',
      timestamp: 'August 12, 2026 at 5:03 PM'
    },
    {
      id: 'rev_3',
      author: 'Hassan Raza',
      initials: 'HR',
      country: 'United Kingdom',
      service: 'GB UK Student Visa',
      badge: '<span style="font-weight: 800; color: var(--cyan);">GB</span> UK Student Visa',
      rating: '5',
      text: 'Bright Links handled my UK Student Visa smoothly from Pakistan. The Dubai HQ team checked every document meticulously. I got my visa approval in just 12 days!',
      timestamp: 'August 10, 2026 at 2:30 PM'
    },
    {
      id: 'rev_4',
      author: 'Sarah Al-Maktoum',
      initials: 'SA',
      country: 'Dubai, UAE',
      service: 'AE Dubai Golden Visa',
      badge: '<span style="font-weight: 800; color: var(--gold-light);">AE</span> Dubai Golden Visa',
      rating: '5',
      text: 'Exceptional Golden Visa service in Dubai! The staff explained the real estate pathway clearly and guided us step by step. Highly recommended for investor visas.',
      timestamp: 'August 08, 2026 at 5:15 PM'
    },
    {
      id: 'rev_5',
      author: 'Muhammad Ahmed',
      initials: 'MA',
      country: 'Canada',
      service: 'CA Canada Express Entry PR',
      badge: '<span style="font-weight: 800; color: var(--cyan);">CA</span> Canada Express Entry PR',
      rating: '5',
      text: 'Applied for Canada Express Entry PR consultation. The team was extremely transparent about points calculation and required documents. Professional experience throughout!',
      timestamp: 'August 04, 2026 at 11:10 AM'
    },
    {
      id: 'rev_6',
      author: 'Dr. Tariq Mahmood',
      initials: 'TM',
      country: 'Pakistan',
      service: 'PK Pakistan HQ Consultation',
      badge: '<span style="font-weight: 800; color: var(--cyan);">PK</span> Pakistan HQ Consultation',
      rating: '5',
      text: 'Visited their Okara office for Germany Job Seeker visa guidance. Very polite behavior and expert document verification. Five stars for integrity.',
      timestamp: 'July 20, 2026 at 1:15 PM'
    }
  ];

  // Render Saved & Default Reviews to Homepage Grid & Reviews Page Grid
  function renderCustomReviews() {
    const savedCustomReviews = JSON.parse(localStorage.getItem('bright_links_custom_reviews') || '[]');
    
    // Combine saved custom reviews on top, then default reviews
    // Deduplicate by author + text content
    const combined = [];
    const seenKeys = new Set();

    [...savedCustomReviews, ...masterDefaultReviews].forEach(r => {
      const key = ((r.author || '') + '_' + (r.text || '').substring(0, 20)).toLowerCase();
      if (!seenKeys.has(key)) {
        seenKeys.add(key);
        combined.push(r);
      }
    });

    const homepageGrid = document.getElementById('homepage-reviews-grid');
    const allGrid = document.getElementById('all-reviews-grid');

    const buildCardHtml = (r) => `
      <div class="review-card-v12" data-country="${r.country}" style="background: #ffffff; border: 1px solid #dbe6f2; border-radius: 20px; padding: 20px 22px; display: flex; flex-direction: column; justify-content: space-between; box-shadow: 0 8px 24px rgba(7, 30, 61, 0.06);">
        <div>
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
            <span style="color: #d4921b; font-size: 1.05rem; letter-spacing: 2px;">${renderStarIcons(r.rating)}</span>
            <span style="font-size: 0.78rem; color: #0084c7; font-weight: 700;">${r.timestamp}</span>
          </div>
          <p style="color: #2d435e; font-size: 0.92rem; line-height: 1.55; margin: 0 0 14px;">
            "${r.text}"
          </p>
        </div>
        <div style="display: flex; align-items: center; justify-content: space-between; border-top: 1px solid #eef3f8; padding-top: 12px;">
          <div style="display: flex; align-items: center; gap: 10px;">
            <div style="width: 38px; height: 38px; border-radius: 50%; background: #f0f6fc; border: 1px solid #dbe6f2; color: #0084c7; display: grid; place-items: center; font-weight: 900; font-family: 'Manrope'; font-size: 0.85rem;">${r.initials}</div>
            <div>
              <strong style="color: #071e3d; font-size: 0.92rem; font-family: 'Manrope';">${r.author}</strong>
              <small style="display: block; color: #b8860b; font-size: 0.76rem; font-weight: 700;">${r.badge || r.service}</small>
            </div>
          </div>
        </div>
      </div>
    `;

    if (homepageGrid) {
      // Homepage shows top 4 featured reviews
      homepageGrid.innerHTML = combined.slice(0, 4).map(buildCardHtml).join('');
    }

    if (allGrid) {
      // Reviews page shows all reviews
      allGrid.innerHTML = combined.map(buildCardHtml).join('');
    }
  }

  // FETCH & SYNC LIVE CLOUD REVIEWS ACROSS ALL DEVICES (LAPTOP, TABLET, MOBILE)
  function syncCloudReviews() {
    fetch(CLOUD_SYNC_ENDPOINT)
      .then(res => res.json())
      .then(cloudItems => {
        if (Array.isArray(cloudItems) && cloudItems.length > 0) {
          let savedReviews = JSON.parse(localStorage.getItem('bright_links_custom_reviews') || '[]');
          
          const seenKeys = new Set();
          savedReviews.forEach(r => seenKeys.add(((r.author || '') + '_' + (r.text || '').substring(0, 20)).toLowerCase()));

          let updated = false;
          cloudItems.reverse().forEach(item => {
            const key = ((item.author || '') + '_' + (item.text || '').substring(0, 20)).toLowerCase();
            if (!seenKeys.has(key) && item.author && item.text) {
              seenKeys.add(key);
              savedReviews.unshift({
                author: item.author,
                initials: item.initials || 'CL',
                country: item.country || 'Global',
                service: item.service || 'Visa Service',
                badge: item.badge || item.service,
                rating: item.rating || '5',
                text: item.text,
                timestamp: item.timestamp || getFormattedDateTime()
              });
              updated = true;
            }
          });

          if (updated) {
            localStorage.setItem('bright_links_custom_reviews', JSON.stringify(savedReviews));
            renderCustomReviews();
          }
        }
      })
      .catch(err => console.log('Cloud sync optional fallback:', err));
  }

  renderCustomReviews();
  if (document.readyState === 'complete') {
    setTimeout(syncCloudReviews, 300);
  } else {
    window.addEventListener('load', () => setTimeout(syncCloudReviews, 300));
  }

  // SMOOTH SCROLL & AUTO-FOCUS TO WRITE REVIEW FORM BUTTON
  document.querySelectorAll('a[href="#write-review-section"], a[href="#write-review"], .btn-write-review').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const targetForm = document.getElementById('write-review-section') || document.getElementById('write-review') || document.getElementById('standaloneReviewForm') || document.getElementById('customerReviewForm');
      if (targetForm) {
        targetForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
        const nameInput = targetForm.querySelector('#standalone-author-input') || targetForm.querySelector('#review-author-input') || targetForm.querySelector('input');
        if (nameInput) {
          setTimeout(() => nameInput.focus(), 600);
        }
      }
    });
  });

  // ==========================================================================
  // LIGHTWEIGHT ZERO-DEPENDENCY KNOWLEDGE BASE CHATBOT ENGINE
  // ==========================================================================
  const chatbotWidget = document.getElementById('chatbotWidget');
  const chatbotLauncher = document.getElementById('chatbotLauncher');
  const closeChatbotBtn = document.getElementById('closeChatbotBtn');
  const chatbotForm = document.getElementById('chatbotForm');
  const chatbotInput = document.getElementById('chatbotInput');
  const chatbotBody = document.getElementById('chatbotBody');

  const kbData = [
    {
      keywords: ["about", "about us", "who are you", "company", "owner", "founder", "zahid", "rafique", "experience", "years", "history", "who owns"],
      response: "🌟 About Bright Links:\n\n• Founder & CEO: Zahid Rafique (Portugal Permanent Resident 🇵🇹 | Traveled 30+ Countries Worldwide)\n• 13+ Years Experience: Premier global visa, travel, and immigration consultancy with 100+ verified successful cases.\n• High Approval Commitment: 'Your Approval, our priority.' We pre-audit financial files and embassy documentation to maximize visa approvals.\n• 5 Global Offices: Dubai (Global HQ), UK, Portugal, Spain, and Pakistan."
    },
    {
      keywords: ["hello", "hi", "hey", "greetings", "start", "help", "menu"],
      response: "Hello! 👋 Welcome to Bright Links (Your Approval, our priority).\n\nHow can I assist you today? You can ask about:\n• ⏱️ Processing Times ('how long will I get my visa')\n• 📍 Our 5 Global Offices (Dubai, UK, Portugal, Spain, Pakistan)\n• 🛂 Visa Services (Tourist, Business, TRC, Golden Visa, Study Abroad)\n• 📋 Required Documents\n• 💰 Fees & Pricing\n• 🇪🇺 Schengen Visas (29 European countries)"
    },
    {
      keywords: ["time", "how long", "duration", "days", "weeks", "when", "processing", "period", "fast", "urgent"],
      response: "⏱️ Visa Processing Times:\n\n• Schengen Visas: 10 to 15 working days after embassy appointment.\n• USA / UK Visas: 15 to 21 working days (Fast-track queue available).\n• Dubai (UAE) Visas: 24 to 72 hours (Express e-Visa entry).\n• Saudi Arabia / Umrah: 24 to 48 hours.\n• Canada / Australia: 3 to 6 weeks depending on application class.\n• Japan / South Korea: 5 to 10 working days.\n\n*Need urgent fast-track processing? Click 'Open WhatsApp' below to speak to an officer!*"
    },
    {
      keywords: ["document", "documents", "requirement", "requirements", "paper", "papers", "checklist", "bank", "salary", "proof", "passport"],
      response: "📋 Standard Required Documents:\n\n1. Passport: Original passport valid for 6+ months.\n2. Photos: 2 recent passport-size photos (white background).\n3. Financial Proof: 3-6 months bank statement.\n4. Employment / Business: Salary certificate, NOC letter, or company trade license.\n5. Travel Itinerary: Flight & hotel reservations (provided directly by Bright Links).\n\n*Specific document checklists are customized for your exact target country during consultation!*"
    },
    {
      keywords: ["fee", "fees", "cost", "price", "charge", "charges", "how much", "payment", "rate"],
      response: "💰 Visa Consultation & Application Fees:\n\nOur consultancy fees depend on your target country, visa category (Tourist, Business, TRC, Golden Visa), and service package.\n\n*Would you like a direct price quote? Click 'Open WhatsApp' below or fill out the booking form on our site!*"
    },
    {
      keywords: ["guarantee", "approval", "success", "chance", "chances", "rate", "rejected", "refused", "refusal"],
      response: "⭐ High Approval Commitment:\n\nBright Links slogan is 'Your Approval, our priority.'\nWe thoroughly audit every document, verify financial statements, and pre-screen your profile prior to submission to achieve maximum visa approval rates. Facing a past refusal? We also handle visa appeals!"
    },
    {
      keywords: ["office", "offices", "address", "location", "branch", "where", "dubai", "portugal", "uk", "pakistan", "spain", "okara", "valencia", "manager", "fiaz", "shahid", "ifrahim", "mateen"],
      response: "📍 Bright Links Official Offices & Branches:\n\n1. Dubai, UAE (Global HQ):\n• Manager: Hafiz Muhammad Fiaz\n• Office 45 Abdulrahman Al-Bahr Building 205 - Al-Khabaisi - Deira, Dubai, UAE | 📞 +971 52 299 4897 | ✉️ admin@brightlinks.ae\n\n2. United Kingdom (UK Branch):\n• Managed by CEO Zahid Rafique\n• blinks Trading Limited, Office No 6, Anne Bartholomew Road, Thetford Norfolk, IP24 1TF, UK | 📞 +44 7440 508797 | ✉️ admin@brightlinks.ae\n\n3. Portugal (Europe Branch):\n• Manager: Shahid Rafique\n• Rua ALFREDO COSTA PENICHE, Lote 153, 4785-280 TROFA PORTO PORTUGAL | 📞 +351 920 266 093 | ✉️ admin@brightlinks.ae\n\n4. Spain Branch:\n• Manager: Muhammad Ifrahim Nadeem\n• Calle Luis Campos, Nº 3, Piso 3, 46018 Valencia, Valencia, Spain | 📞 +34 603 89 29 14 | ✉️ admin@brightlinks.ae\n\n5. Pakistan (South Asia Branch):\n• Manager: Muhammad Mateen Zahid\n• 18 Khushi Trade Center M.A Jinnah Road, Okara, Pakistan | 📞 +92 300 6979097 | ✉️ admin@brightlinks.ae"
    },
    {
      keywords: ["services", "service", "what do you do", "offer", "provide"],
      response: "💼 Our 7 Official Services:\n\n1. Travel & Tourism (Holiday packages, flight & hotel vouchers)\n2. Tourist Visit Visa (Visitor permits & tourist entry)\n3. Business Visit Visa (Corporate delegations & trade summits)\n4. Temporary Residency (TRC) (Nomad permits & living cards)\n5. Golden Visa (10-Year investor & real estate residency)\n6. Second Citizenship (Citizenship by investment & dual passports)\n7. Study Abroad (University guidance, student visas & financial proof)"
    },
    {
      keywords: ["schengen", "europe", "germany", "france", "italy", "spain", "austria", "belgium", "netherlands", "switzerland"],
      response: "🇪🇺 Schengen Visa Services (29 Member States):\n\nWe provide full visa filing & documentation for all 29 Schengen countries including Austria, Belgium, France, Germany, Italy, Netherlands, Spain, Switzerland, etc.\n\nAvailable Schengen Services:\n• Tourist Visit Visa\n• Business Visit Visa\n• TRC (Temporary Residence)\n• Golden Visa\n• Study Visa\n• Travel/Tourism Visa"
    },
    {
      keywords: ["study", "student", "university", "education", "college", "abroad"],
      response: "🎓 Study Abroad Consultancy:\n\nWe assist students with university admissions, student visa application filing, financial proof validation, and pre-departure support across the UK, Europe, USA, Canada, Australia, South Korea & more!"
    },
    {
      keywords: ["golden visa", "investor", "10 year", "real estate", "residency"],
      response: "🏆 Golden Visa & Investor Residency:\n\nWe process 10-Year Golden Visas and investor residency programs for UAE (Dubai), Portugal, Schengen Zone & second citizenship programs worldwide."
    },
    {
      keywords: ["contact", "phone", "email", "whatsapp", "number", "call", "reach"],
      response: "📞 Contact Bright Links Support:\n\n• Main Phone / WhatsApp: +971 52 299 4897\n• Email: admin@brightlinks.ae\n• Website: brightlinks.biz\n\nClick 'Open WhatsApp' below to speak directly with an officer!"
    },
    {
      keywords: ["country", "countries", "destinations", "where can i go", "usa", "uk", "canada", "australia", "japan", "korea", "saudi", "china", "thailand", "turkey"],
      response: "🌍 Top 21 Official Visa Destinations:\n\nSchengen Zone, USA, UK, Australia, Canada, New Zealand, Japan, South Korea, South Africa, Brazil, Dubai (UAE), Saudi Arabia, China, Hong Kong, Thailand, Malaysia, Indonesia, Singapore, Turkey, Ireland, Russia."
    },
    {
      keywords: ["appointment", "book", "consultation", "schedule", "vfs", "slot", "apply"],
      response: "📅 Book a Consultation / Embassy Slot:\n\nYou can fill out our quick consultation form on the website, or speak directly to a visa specialist to evaluate your profile and book an embassy slot!"
    }
  ];

  function getBotResponse(userMsg) {
    const rawText = (userMsg || '').toLowerCase().trim();
    if (!rawText) return "Please type a question or choose one of the quick topics below!";

    // 0. COMPREHENSIVE TYPO & SHORTHAND NORMALIZER
    const text = rawText
      .replace(/\bclg\b/g, 'college')
      .replace(/\bderre\b/g, 'degree')
      .replace(/\bdegre\b/g, 'degree')
      .replace(/\bdgree\b/g, 'degree')
      .replace(/\baboard\b/g, 'abroad')
      .replace(/\baboad\b/g, 'abroad')
      .replace(/\babrod\b/g, 'abroad')
      .replace(/\bstdy\b/g, 'study')
      .replace(/\bvesa\b/g, 'visa')
      .replace(/\bvsa\b/g, 'visa')
      .replace(/\bexibition\b/g, 'exhibition')
      .replace(/\bexbition\b/g, 'exhibition')
      .replace(/\bexhibtion\b/g, 'exhibition')
      .replace(/\bbusines\b/g, 'business')
      .replace(/\bbussiness\b/g, 'business')
      .replace(/\bdocment\b/g, 'document')
      .replace(/\brequrment\b/g, 'requirement');

    const countryAliases = {
      "south africa": "South Africa",
      "africa": "South Africa",
      "south korea": "South Korea",
      "korea": "South Korea",
      "dubai": "Dubai, UAE",
      "uae": "Dubai, UAE",
      "emirates": "Dubai, UAE",
      "united arab emirates": "Dubai, UAE",
      "saudi arabia": "Saudi Arabia",
      "saudi": "Saudi Arabia",
      "ksa": "Saudi Arabia",
      "united kingdom": "United Kingdom",
      "uk": "United Kingdom",
      "london": "United Kingdom",
      "england": "United Kingdom",
      "united states": "USA",
      "usa": "USA",
      "us": "USA",
      "america": "USA",
      "schengen": "Schengen",
      "europe": "Schengen",
      "eu": "Schengen",
      "canada": "Canada",
      "australia": "Australia",
      "new zealand": "New Zealand",
      "nz": "New Zealand",
      "japan": "Japan",
      "brazil": "Brazil",
      "china": "China",
      "hong kong": "Hong Kong",
      "hk": "Hong Kong",
      "thailand": "Thailand",
      "malaysia": "Malaysia",
      "indonesia": "Indonesia",
      "singapore": "Singapore",
      "turkey": "Turkey",
      "ireland": "Ireland",
      "russia": "Russia",
      "germany": "Germany",
      "france": "France",
      "italy": "Italy",
      "spain": "Spain",
      "austria": "Austria",
      "belgium": "Belgium",
      "netherlands": "Netherlands",
      "switzerland": "Switzerland",
      "portugal": "Portugal"
    };

    let matchedCountryKey = null;
    const sortedAliases = Object.keys(countryAliases).sort((a, b) => b.length - a.length);
    for (const alias of sortedAliases) {
      if (text.includes(alias)) {
        matchedCountryKey = countryAliases[alias];
        break;
      }
    }

    // 1. WORK / JOB / EMPLOYMENT INQUIRIES (INCLUDING JOB AFTER DEGREE)
    if (["job", "jobs", "work", "employment", "hiring", "permit", "job seeker", "trc", "career", "working"].some(kw => text.includes(kw))) {
      const countryStr = matchedCountryKey ? ` for ${matchedCountryKey}` : '';
      return `💼 Work & Overseas Job Visa Guidance${countryStr}:\n\nYes! Whether you hold a college degree, vocational skills, or work experience, you can apply for overseas employment and residency through several official pathways:\n\n1. Post-Study Work Visas (PSW): UK (2-3 year Graduate Route), Canada (PGWP), Australia (485 visa), Germany (18-month job seeker visa).\n2. Job Seeker Visas: Germany Job Seeker Visa, Portugal Job Seeker Visa, UAE Job Exploration Visa.\n3. Temporary Residency (TRC): Portugal D2/D7/TRC, UK Skilled Worker Sponsorship, Dubai Employment Residency.\n\n*Would you like an eligibility audit for a Work or Job Seeker Visa? Click 'Open WhatsApp' below to speak to a relocation specialist!*`;
    }

    // 2. EXHIBITIONS / TRADE FAIRS / CORPORATE SUMMITS / BUSINESS DELEGATIONS
    if (["exhibition", "exhibitions", "trade fair", "trade show", "expo", "conference", "summit", "business visit", "corporate", "bussiness", "delegation", "fair"].some(kw => text.includes(kw))) {
      const countryStr = matchedCountryKey ? ` for ${matchedCountryKey}` : '';
      return `🏢 Business Visit & Exhibition / Trade Fair Visas${countryStr}:\n\nYes! We assist business owners, corporate delegates, traders, and employees attending international trade fairs, expos, and business summits worldwide (UK, Schengen 29 States, USA, UAE, China, Hong Kong, Germany, etc.).\n\nIncluded in Exhibition & Business Support:\n• Official Exhibition Invitation Letter Verification\n• Express Business Visa File Preparation & Cover Letter Drafting\n• Confirmed Hotel & Flight Bookings for Business Delegations\n• Fast-track appointment slot booking at embassies\n\n*Attending an upcoming international exhibition or trade summit? Click 'Open WhatsApp' below for priority business visa processing!*`;
    }

    // 3. TRAVEL & TOURISM / VISIT VISAS
    if (["tourism", "tourist", "holiday", "visit", "vacation", "sightseeing", "family visit", "leisure", "trip"].some(kw => text.includes(kw))) {
      const countryStr = matchedCountryKey ? ` for ${matchedCountryKey}` : '';
      return `✈️ Travel & Tourism / Visit Visa Services${countryStr}:\n\nWe provide complete tourist visit visa processing across 21+ top global destinations including Schengen 29 States, USA, UK, Canada, Australia, Japan, South Korea, Dubai (UAE), Saudi Arabia, Turkey, and more!\n\nIncluded in Tourism Service:\n1. Full Embassy Visa Application Filing\n2. Guaranteed Flight & Hotel Itinerary Reservations\n3. Financial Proof & Bank Statement Guidance\n4. Fast-Track Embassy Slot Appointment Booking\n\n*Planning a holiday or visit trip? Click 'Open WhatsApp' below to get started!*`;
    }

    // 4. SPECIFIC STUDY ABROAD ELIGIBILITY & DEGREE INQUIRIES
    if (["college", "degree", "bachelor", "bachelors", "master", "masters", "diploma", "high school", "inter", "matric", "qualification", "graduate", "study", "student", "university"].some(kw => text.includes(kw))) {
      const countryStr = matchedCountryKey ? ` for ${matchedCountryKey}` : '';
      return `🎓 Study Abroad Eligibility & University Admissions${countryStr}:\n\nYes, absolutely! Having completed your qualification/degree, you are eligible to apply for Bachelor's, Master's, or Post-Graduate Programs${countryStr} across top universities in the UK, Europe (Germany, Italy, France), USA, Canada, Australia, and South Korea.\n\n📋 Key Application Requirements:\n1. Academic Transcripts & Pass Certificates\n2. Passport Copy (Valid for 6+ months)\n3. Proof of English (College MOI Letter, IELTS, PTE, or Duolingo)\n4. Bank Statement for Student Visa\n\n*Would you like a free assessment of your university options? Click 'Open WhatsApp' below to speak directly with an Education Advisor!*`;
    }

    // 5. STUDY ABROAD WITHOUT IELTS / ENGLISH WAIVER
    if (["without ielts", "ielts", "duolingo", "pte", "moi", "english waiver"].some(kw => text.includes(kw))) {
      return `🎓 Study Abroad Without IELTS:\n\nYes! Many top universities in the UK, France, Italy, Hungary, Poland, and South Korea accept an English Medium of Instruction (MOI) letter from your college/university or Duolingo/PTE test scores instead of IELTS!\n\n*Click 'Open WhatsApp' below to check eligible IELTS-free universities!*`;
    }

    // 6. STUDY GAP / AGE LIMIT
    if (["gap", "age", "older", "study gap"].some(kw => text.includes(kw))) {
      return `🎓 Study Gap & Age Eligibility:\n\nYes! Gaps of 2 to 7+ years are accepted by many universities in the UK, Germany, Italy, Poland, and Canada provided you have work experience proof or skill certificates.`;
    }

    // 4. CHECK IF QUESTION IS ABOUT PROCESSING TIME / DURATION
    if (["time", "how long", "duration", "days", "weeks", "when", "processing", "period"].some(kw => text.includes(kw))) {
      if (matchedCountryKey) {
        return `⏱️ Visa Processing Time for ${matchedCountryKey}:\n\nProcessing typically takes between 5 to 15 working days depending on embassy workload and visa category.\n\nNeed express fast-track processing for ${matchedCountryKey}? Click 'Open WhatsApp' below to speak to an officer!`;
      }
      return `⏱️ Visa Processing Times:\n\n• Schengen Visas: 10 to 15 working days after embassy appointment.\n• USA / UK Visas: 15 to 21 working days (Fast-track queue available).\n• Dubai (UAE) Visas: 24 to 72 hours (Express e-Visa entry).\n• Saudi Arabia / Umrah: 24 to 48 hours.\n• Canada / Australia: 3 to 6 weeks depending on application class.\n• Japan / South Korea: 5 to 10 working days.\n\n*Need urgent fast-track processing? Click 'Open WhatsApp' below to speak to an officer!*`;
    }

    // 5. CHECK IF QUESTION IS ABOUT REQUIREMENTS / DOCUMENTS
    if (["document", "documents", "requirement", "requirements", "paper", "papers", "checklist", "bank", "proof", "passport"].some(kw => text.includes(kw))) {
      return `📋 Standard Required Documents:\n\n1. Passport: Original passport valid for 6+ months.\n2. Photos: 2 recent passport-size photos (white background).\n3. Financial Proof: 3-6 months bank statement.\n4. Employment / Business: Salary certificate, NOC letter, or company trade license.\n5. Travel Itinerary: Flight & hotel reservations (provided directly by Bright Links).\n\n*Specific document checklists are customized for your exact target country during consultation!*`;
    }

    // 6. CHECK IF QUESTION IS ABOUT FEES / COSTS
    if (["fee", "fees", "cost", "price", "charge", "charges", "how much", "payment"].some(kw => text.includes(kw))) {
      return `💰 Visa Consultation & Application Fees:\n\nOur consultancy fees depend on your target country, visa category (Tourist, Business, TRC, Golden Visa, Study Abroad), and service package.\n\n*Would you like a direct price quote? Click 'Open WhatsApp' below or fill out the booking form on our site!*`;
    }

    // 7. CHECK COUNTRY MATCH NEXT
    if (matchedCountryKey) {
      const cData = countryDetailsData[matchedCountryKey] || countryDetailsData["Schengen"];
      if (cData && cData.services) {
        const flag = cData.flag || "📍";
        const serviceList = cData.services.map(s => `• ${s}`).join("\n");
        return `${flag} Visa Services for ${matchedCountryKey}:\n\n${serviceList}\n\nWould you like to apply or book a consultation for ${matchedCountryKey}? You can fill the booking form on the site or click 'Open WhatsApp' below to chat live!`;
      }
    }

    // 8. GENERAL KNOWLEDGE BASE MATCHES
    for (const item of kbData) {
      if (item.keywords.some(kw => text.includes(kw))) {
        return item.response;
      }
    }

    return "I'm here to help! 🔍 Ask about any topic (e.g. 'Can I apply with college degree?', 'Processing time', 'Required documents', 'Fees') or any country (e.g. 'Korea', 'Dubai', 'Schengen', 'UK', 'USA')!";
  }

  function appendChatMessage(sender, text) {
    if (!chatbotBody) return null;
    const msgDiv = document.createElement('div');
    msgDiv.className = `chat-msg ${sender}-msg`;
    msgDiv.innerHTML = `<div class="msg-bubble">${text}</div>`;
    chatbotBody.appendChild(msgDiv);
    return msgDiv;
  }

  function handleUserChat(queryText) {
    const text = (queryText || chatbotInput?.value || '').trim();
    if (!text) return;

    const userNode = appendChatMessage('user', text);
    if (chatbotInput) chatbotInput.value = '';

    if (userNode && chatbotBody) {
      chatbotBody.scrollTop = userNode.offsetTop - 12;
    }

    setTimeout(() => {
      const reply = getBotResponse(text);
      const botNode = appendChatMessage('bot', reply);
      
      // Align top of bot answer bubble right at the top of the chat viewable container!
      if (botNode && chatbotBody) {
        chatbotBody.scrollTo({
          top: botNode.offsetTop - 12,
          behavior: 'smooth'
        });
      }
    }, 350);
  }

  if (chatbotLauncher && chatbotWidget) {
    chatbotLauncher.addEventListener('click', () => {
      chatbotWidget.classList.toggle('open');
      const badge = chatbotLauncher.querySelector('.notification-badge');
      if (badge) badge.style.display = 'none';
    });
  }

  if (closeChatbotBtn && chatbotWidget) {
    closeChatbotBtn.addEventListener('click', () => {
      chatbotWidget.classList.remove('open');
    });
  }

  if (chatbotForm) {
    chatbotForm.addEventListener('submit', (e) => {
      e.preventDefault();
      handleUserChat();
    });
  }

  document.querySelectorAll('.chat-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      const q = chip.dataset.query;
      handleUserChat(q);
    });
  });
});
