import type { SiteConfig } from "@indirecttek/essentials-engine";

export const siteConfig: SiteConfig = {
  businessName: "Triangle Tax & Advisory",

  theme: {
    primary: "#1f2937",
    secondary: "#0f766e",
    accent: "#fbbf24",
    background: "#f9fafb",
    foreground: "#111827",
  },

  contactInfo: {
    phone: "(919) 555-0199",
    email: "support@triangletaxadvisory.com",
    address: "245 Main Street, Fuquay-Varina, NC 27526",
  },

  heroSection: {
    headline: "Stress-Free Tax Preparation for Raleigh & Fuquay-Varina Families and Businesses",
    subheadline:
      "Maximize your refund, avoid costly mistakes, and get year-round support from a real advisor—not just software. We're your trusted local tax partner.",
    imageUrl: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=1200&h=800&fit=crop&q=80",
    imageAlt: "Tax advisor reviewing documents with a client",
    callToActionLabel: "Schedule a Tax Consultation",
  },

  services: [
    {
      title: "Individual Tax Preparation",
      description:
        "Get every deduction you deserve with personalized tax preparation. We ensure accuracy, maximize your refund, and handle the paperwork so you don't have to.",
    },
    {
      title: "Small Business Tax Returns",
      description:
        "From sole proprietors to LLCs, we prepare your business taxes with precision. Stay compliant, minimize liability, and focus on running your business.",
    },
    {
      title: "Year-Round Tax Planning",
      description:
        "Don't wait until April. Proactive tax planning throughout the year helps you make smarter financial decisions and avoid surprises at tax time.",
    },
    {
      title: "Bookkeeping & Financial Organization",
      description:
        "Keep your finances organized and tax-ready year-round. Our bookkeeping services give you clarity and peace of mind about your numbers.",
    },
    {
      title: "IRS Notices & Audit Support",
      description:
        "Received a letter from the IRS? Don't panic. We'll review the notice, explain your options, and represent you if needed—so you never face the IRS alone.",
    },
    {
      title: "New Business Setup & Entity Choice",
      description:
        "Starting a business? We'll help you choose the right entity structure (LLC, S-Corp, etc.) and set up your finances for long-term success and tax efficiency.",
    },
  ],

  analytics: {
    enableTracking: true,
    mixpanelToken: "YOUR_MIXPANEL_TOKEN_HERE",
  },

  seo: {
    title: "Triangle Tax & Advisory | Tax Preparation & CPA Services in Fuquay-Varina & Raleigh, NC",
    description:
      "Reliable, local tax preparation and planning for individuals and small businesses in Fuquay-Varina and Raleigh, NC. Year-round advisory support from experienced professionals.",
  },

  imageSearchHints: {
    hero: "tax advisor meeting with clients",
    services: [
      "accountant reviewing documents",
      "small business owner with paperwork",
      "calculator and tax forms on desk",
      "meeting with financial advisor",
      "person signing tax forms",
      "business consultation meeting",
    ],
  },

  // Integrations - Scheduling, Payments, Email
  integrations: {
    scheduling: {
      provider: "calendly",
      url: "https://calendly.com/triangletax-demo/consultation",
      buttonText: "Schedule Consultation",
    },
    payments: {
      provider: "stripe",
      mode: "deposit",
      depositAmount: 15000, // $150.00 retainer
      buttonText: "Pay $150 Retainer",
    },
    email: {
      provider: "resend",
    },
  },
};
