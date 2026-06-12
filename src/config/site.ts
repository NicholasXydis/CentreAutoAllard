export const site = {
  name: "Centre D'Auto Allard",
  url: 'https://centreautoallard.ca',
  socialImage: '/shop-front.png',
  phone: '+15147684455',
  phoneDisplay: '(514) 768-4455',
  address: {
    street: '2350 Rue Allard',
    city: 'Montreal',
    province: 'QC',
    postalCode: 'H4E 2K9',
    country: 'CA'
  },
  googleMapsUrl: 'https://maps.google.com/?q=2350+Rue+Allard+Montreal+QC',
  hours: {
    days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    opens: '08:30',
    closes: '16:00'
  }
} as const;
