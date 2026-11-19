// DATA STORE FOR BRIGHT LINKS INTERNATIONAL

export const DESTINATIONS = [
  {
    id: 'canada',
    name: 'Canada',
    flag: '🇨🇦',
    image: '/assets/images/dest_canada.jpg',
    tags: ['Work', 'Study', 'PR', 'Express Entry'],
    description: 'Direct PR pathways through Express Entry, PNP, and top-tier university admissions.',
    processingTime: '6 - 12 Months',
    successRate: '98.5%',
    minBudget: '$12,000 CAD'
  },
  {
    id: 'uk',
    name: 'United Kingdom',
    flag: '🇬🇧',
    image: '/assets/images/dest_uk.jpg',
    tags: ['Study', 'Work', 'Skilled Worker', 'PR'],
    description: 'Post-study work visa (PSW), Skilled Worker sponsorship & Innovator Founder visas.',
    processingTime: '3 - 8 Weeks',
    successRate: '99.1%',
    minBudget: '£10,000 GBP'
  },
  {
    id: 'portugal',
    name: 'Portugal',
    flag: '🇵🇹',
    image: '/assets/images/dest_portugal.jpg',
    tags: ['Golden Visa', 'D7 / D8 Nomad', 'PR', 'EU Residency'],
    description: 'Golden Visa investment, Digital Nomad D8, D7 Passive Income & Job Seeker visas.',
    processingTime: '3 - 6 Months',
    successRate: '97.8%',
    minBudget: '€280,000 / Passive Income'
  },
  {
    id: 'germany',
    name: 'Germany',
    flag: '🇩🇪',
    image: '/assets/images/dest_germany.jpg',
    tags: ['Study', 'Chancenkarte', 'Blue Card', 'Work'],
    description: 'Opportunity Card (Chancenkarte), Tuition-Free Universities & EU Blue Card.',
    processingTime: '2 - 4 Months',
    successRate: '96.9%',
    minBudget: '€11,208 Blocked Account'
  },
  {
    id: 'uae',
    name: 'United Arab Emirates',
    flag: '🇦🇪',
    image: '/assets/images/dest_uae.jpg',
    tags: ['Visit', 'Golden Visa 10-Yr', 'Work', 'Business'],
    description: '10-Year Golden Visa, Freelance & Remote Work Visas, Corporate Business Setup.',
    processingTime: '3 - 7 Days',
    successRate: '99.8%',
    minBudget: 'AED 3,000'
  },
  {
    id: 'australia',
    name: 'Australia',
    flag: '🇦🇺',
    image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=800&q=80',
    tags: ['Study', 'Subclass 189/190', 'Work', 'PR'],
    description: 'General Skilled Migration (GSM), Subclass 500 Student Visa & Regional PR.',
    processingTime: '4 - 9 Months',
    successRate: '97.2%',
    minBudget: '$15,000 AUD'
  }
];

export const SERVICES = [
  {
    id: 'tourism',
    icon: '✈️',
    title: 'Travel & Tourism',
    desc: 'Worldwide tourist visas, flight reservations, luxury hotel bookings & custom tour itineraries.',
    features: ['Fast-track Tourist Visa processing', 'Flight & Hotel Itinerary Vouchers', 'Travel Insurance Coverage', 'Embassy Interview Preparation']
  },
  {
    id: 'visit',
    icon: '📄',
    title: 'Visit Visa',
    desc: 'Tourist & family visit visas with 100% compliant documentation and quick embassy approvals.',
    features: ['Sponsorship letter drafting', 'Financial proof verification', 'Multi-entry visit options', 'Express application submission']
  },
  {
    id: 'study',
    icon: '🎓',
    title: 'Study Abroad',
    desc: 'Global education counseling, university admissions, scholarship assistance & student visas.',
    features: ['Top rank University shortlist', 'SOP & LOR writing assistance', 'Full Scholarship guidance', 'Post-study Work Visa guidance']
  },
  {
    id: 'work',
    icon: '💼',
    title: 'Work & Business',
    desc: 'Skilled worker permits, employer sponsorships, investor visas & company formation.',
    features: ['LMIA & Work Permit filing', 'Job Seeker visa documentation', 'Business Plan preparation', 'Investor Golden Visa routes']
  },
  {
    id: 'immigration',
    icon: '👥',
    title: 'Immigration & PR',
    desc: 'Permanent residency, Golden Visas, family reunification & passport by investment programs.',
    features: ['CRS score optimization', 'ECA (WES) credential evaluation', 'Permanent Residency filing', 'EU passport pathways']
  }
];

export const OFFICES = [
  {
    id: 'dubai',
    country: 'United Arab Emirates (HQ)',
    city: 'Dubai',
    flag: '🇦🇪',
    isHQ: true,
    manager: 'Hafiz Muhammad Fiaz',
    address: 'Office 45 Abdulrahman Al-Bahr Building 205, Al-Khabaisi, Deira, Dubai, United Arab Emirates',
    phone: '+971 52 299 4897',
    email: 'admin@brightlinks.ae',
    website: 'brightlinks.ae',
    hours: 'Mon - Sat: 9:00 AM - 7:00 PM (GST)',
    mapUrl: 'https://maps.google.com/?q=Al-Khabaisi+Deira+Dubai'
  },
  {
    id: 'uk',
    country: 'United Kingdom',
    city: 'Thetford Norfolk',
    flag: '🇬🇧',
    isHQ: false,
    manager: 'CEO Zahid Rafique',
    company: 'blinks Trading Limited',
    address: 'Office No 6, Anne Bartholomew Road, Thetford Norfolk, IP24 1TF, UK',
    phone: '+44 7440 508797',
    email: 'admin@brightlinks.ae',
    website: 'brightlinks.ae',
    hours: 'Mon - Fri: 9:00 AM - 5:30 PM (GMT)',
    mapUrl: 'https://maps.google.com/?q=Anne+Bartholomew+Road+Thetford'
  },
  {
    id: 'portugal',
    country: 'Portugal',
    city: 'Porto',
    flag: '🇵🇹',
    isHQ: false,
    manager: 'Shahid Rafique',
    address: 'Rua ALFREDO COSTA PENICHE , Lote 153, 4785-280 TROFA PORTO PORTUGAL',
    phone: '+351 920 266 093',
    email: 'admin@brightlinks.ae',
    website: 'brightlinks.ae',
    hours: 'Mon - Fri: 9:00 AM - 6:00 PM (WET)',
    mapUrl: 'https://maps.google.com/?q=Rua+ALFREDO+COSTA+PENICHE+TROFA+PORTO'
  },
  {
    id: 'spain',
    country: 'Spain',
    city: 'Valencia',
    flag: '🇪🇸',
    isHQ: false,
    manager: 'Muhammad Ifrahim Nadeem',
    address: 'Calle Luis Campos, Nº 3, Piso 3, 46018 Valencia, Valencia, Spain',
    phone: '+34 603 89 29 14',
    email: 'admin@brightlinks.ae',
    website: 'brightlinks.ae',
    hours: 'Mon - Fri: 9:00 AM - 6:00 PM (CET)',
    mapUrl: 'https://maps.google.com/?q=Calle+Luis+Campos+3+Valencia+Spain'
  },
  {
    id: 'pakistan',
    country: 'Pakistan',
    city: 'Okara',
    flag: '🇵🇰',
    isHQ: false,
    manager: 'Muhammad Mateen Zahid',
    address: '18 Khushi Trade Center M.A Jinnah Road, Okara, Pakistan',
    phone: '+92 300 6979097',
    email: 'admin@brightlinks.ae',
    website: 'brightlinks.ae',
    hours: 'Mon - Sat: 9:30 AM - 6:30 PM (PKT)',
    mapUrl: 'https://maps.google.com/?q=Khushi+Trade+Center+Okara'
  }
];

export const TESTIMONIALS = [
  {
    id: 1,
    name: 'Ahmed Raza',
    country: 'Canada PR Applicant',
    flag: '🇨🇦',
    rating: 5,
    text: 'Bright Links made my entire Canada Express Entry visa process smooth and fast. Their Dubai & Pakistan team provided step-by-step guidance from ECA evaluation to CoPR!',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 2,
    name: 'Maria Santos',
    country: 'Portugal D8 Nomad Visa',
    flag: '🇵🇹',
    rating: 5,
    text: 'Extremely professional immigration consultants! The Lisbon branch handled my NIF, bank account, and D8 visa application seamlessly.',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 3,
    name: 'Dr. Tariq Mahmood',
    country: 'UK Skilled Worker Visa',
    flag: '🇬🇧',
    rating: 5,
    text: 'I got my UK NHS doctor sponsorship visa within 3 weeks through Bright Links London & Dubai office. 100% recommended!',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'
  }
];
