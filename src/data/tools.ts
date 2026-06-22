export interface Tool {
  title: string;
  category: 'Pricing' | 'Income' | 'Finance' | string;
  description: string;
  href: string;
}

export const tools: Tool[] = [
  {
    title: "Freelance Rate Calculator",
    category: "Pricing",
    description: "Determine what you should charge clients based on profession, experience, location, and business expenses.",
    href: "/tools/freelance-rate-calculator"
  },
  {
    title: "Project Price Calculator",
    category: "Pricing",
    description: "Convert your hourly rate into professional fixed-price project quotes. Factor in complexity and revision rounds.",
    href: "/tools/project-price-calculator"
  },
  {
    title: "Hourly to Salary Calculator",
    category: "Income",
    description: "Instantly convert your hourly pay into annual, monthly and weekly salary breakdowns.",
    href: "/tools/hourly-to-salary-calculator"
  },
  {
    title: "Salary to Hourly Calculator",
    category: "Income",
    description: "Convert annual salary into hourly earnings and compare compensation more accurately.",
    href: "/tools/salary-to-hourly-calculator"
  },
  {
    title: "Profit Margin Calculator",
    category: "Finance",
    description: "Calculate profit margin, markup, revenue and net profit instantly.",
    href: "/tools/profit-margin-calculator"
  },
  {
    title: "ROI Calculator",
    category: "Finance",
    description: "Calculate your return on investment and measure business performance in seconds.",
    href: "/tools/roi-calculator"
  }
];
