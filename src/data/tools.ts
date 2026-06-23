export interface Tool {
  title: string;
  category: 'Pricing' | 'Income' | 'Finance' | string;
  description: string;
  href: string;
  featured?: boolean;
}

export const tools: Tool[] = [
  {
    title: "Freelance Rate Calculator",
    category: "Pricing",
    description: "Determine what you should charge clients based on profession, experience, location, and business expenses.",
    href: "/tools/freelance-rate-calculator",
    featured: true
  },
  {
    title: "Freelance Retainer Calculator",
    category: "Pricing",
    description: "Calculate your recommended monthly retainer fee per client, annual revenue, and equivalent hourly rate based on target income and expenses.",
    href: "/tools/freelance-retainer-calculator",
    featured: true
  },
  {
    title: "Value-Based Pricing Calculator",
    category: "Pricing",
    description: "Calculate recommended project pricing, price ranges, hourly equivalents, and client ROI based on estimated client value generation.",
    href: "/tools/value-based-pricing-calculator",
    featured: true
  },
  {
    title: "Project Price Calculator",
    category: "Pricing",
    description: "Convert your hourly rate into professional fixed-price project quotes. Factor in complexity and revision rounds.",
    href: "/tools/project-price-calculator",
    featured: true
  },
  {
    title: "Hourly to Salary Calculator",
    category: "Income",
    description: "Instantly convert your hourly pay into annual, monthly and weekly salary breakdowns.",
    href: "/tools/hourly-to-salary-calculator",
    featured: false
  },
  {
    title: "Salary to Hourly Calculator",
    category: "Income",
    description: "Convert annual salary into hourly earnings and compare compensation more accurately.",
    href: "/tools/salary-to-hourly-calculator",
    featured: false
  },
  {
    title: "Raise Percentage Calculator",
    category: "Income",
    description: "Calculate salary raises, pay increases and compensation growth instantly.",
    href: "/tools/raise-percentage-calculator",
    featured: false
  },
  {
    title: "Profit Margin Calculator",
    category: "Finance",
    description: "Calculate profit margin, markup, revenue and net profit instantly.",
    href: "/tools/profit-margin-calculator",
    featured: false
  },
  {
    title: "ROI Calculator",
    category: "Finance",
    description: "Calculate your return on investment and measure business performance in seconds.",
    href: "/tools/roi-calculator",
    featured: false
  },
  {
    title: "Break-Even Calculator",
    category: "Finance",
    description: "Determine how much revenue you need to cover costs based on fixed expenses, selling price, and variable costs.",
    href: "/tools/break-even-calculator",
    featured: false
  },
  {
    title: "Freelance Tax Calculator",
    category: "Finance",
    description: "Estimate freelance taxes, taxable income and take-home earnings instantly.",
    href: "/tools/freelance-tax-calculator",
    featured: false
  },
  {
    title: "Client Lifetime Value (LTV) Calculator",
    category: "Finance",
    description: "Calculate client lifetime value (LTV), net LTV, LTV:CAC ratios, and customer profitability scores.",
    href: "/tools/client-ltv-calculator",
    featured: false
  },
  {
    title: "Agency Profit Margin Calculator",
    category: "Finance",
    description: "Calculate agency net profit, profit margins, annual profit projections, and profitability ratings based on revenue and overhead costs.",
    href: "/tools/agency-profit-margin-calculator",
    featured: false
  },
  {
    title: "Startup Runway Calculator",
    category: "Finance",
    description: "Calculate startup cash runway, net monthly burn rate, runway end date, and cash remaining after 12 months with MoM growth simulation.",
    href: "/tools/startup-runway-calculator",
    featured: false
  },
  {
    title: "SaaS Pricing Calculator",
    category: "Finance",
    description: "Calculate cost per customer, break-even targets, minimum pricing thresholds, and recommended subscription pricing tiers based on operating costs.",
    href: "/tools/saas-pricing-calculator",
    featured: false
  },
  {
    title: "Consulting Rate Calculator",
    category: "Consulting",
    description: "Calculate consulting hourly rates and revenue targets based on experience, expenses, utilization, and target income.",
    href: "/tools/consulting-rate-calculator",
    featured: false
  }
];
