export interface Guide {
  title: string;
  description: string;
  path: string;
  category: 'Pricing' | 'Tax' | 'Income' | string;
}

export const guides: Guide[] = [
  {
    title: "Freelance Pricing Guide 2026",
    description: "Discover how to calculate your hourly rate, understand project pricing strategies, evaluate profit margins, and avoid common undercharging mistakes.",
    path: "/guides/freelance-pricing-guide-2026",
    category: "Pricing"
  },
  {
    title: "Freelance Tax Guide 2026: Taxes for Freelancers and Contractors",
    description: "Learn how freelance taxes work, understand taxable income and deductible expenses, estimate tax payments, and plan your take-home earnings.",
    path: "/guides/freelance-tax-guide-2026",
    category: "Tax"
  },
  {
    title: "Freelance Hourly Rate Guide 2026: What Should You Charge?",
    description: "Discover how to calculate freelance hourly rates based on experience, expenses, profitability, and market demand.",
    path: "/guides/freelance-hourly-rate-guide-2026",
    category: "Income"
  },
  {
    title: "Consulting Rates Guide 2026: How Much Should Consultants Charge?",
    description: "Learn how consultants price their services in 2026. Discover consulting fees, hourly rates, value-based pricing and revenue planning strategies.",
    path: "/guides/consulting-rates-guide-2026",
    category: "Consulting"
  }
];
