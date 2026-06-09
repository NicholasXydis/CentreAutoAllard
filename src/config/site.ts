export const site = {
  name: "Centre D'Auto Allard",
  phone: '+15147684455',
  phoneDisplay: '(514) 768-4455',
  address: '2350 Rue Allard',
  city: 'Montreal',
  province: 'QC',
  postalCode: 'H4E 2K9',
  addressFull: '2350 Rue Allard, Montreal, QC H4E 2K9',
  googleMapsUrl: 'https://maps.google.com/?q=2350+Rue+Allard+Montreal+QC',
  bookingUrl: process.env.NEXT_PUBLIC_BOOKING_URL ?? 'https://squareup.com/appointments/book/REPLACE_ME',
  since: 1968
} as const;