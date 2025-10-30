export type SummaryMetric = {
  id: string
  label: string
  value: string
  delta: string
  trend: 'up' | 'down' | 'neutral'
  description: string
}

export type NavigationItem = {
  id: string
  label: string
  description?: string
}

export type ForecastHighlight = {
  id: string
  title: string
  projection: string
  change: string
  description: string
  tone: 'positive' | 'warning' | 'neutral'
}

export type CashflowItem = {
  id: string
  title: string
  value: string
  share: number
}

export type TransactionItem = {
  id: string
  description: string
  category: string
  counterparty: string
  amount: number
  direction: 'income' | 'expense'
  date: string
}

export const navigation: NavigationItem[] = [
  {
    id: 'overview',
    label: 'Overview',
    description: 'Key financial metrics',
  },
  {
    id: 'cashflow',
    label: 'Dynamics',
    description: 'Monthly revenue trends',
  },
  {
    id: 'forecast',
    label: 'Forecast',
    description: 'Quarter outlook and scenarios',
  },
  {
    id: 'transactions',
    label: 'Transactions',
    description: 'Latest ledger activity',
  },
]

export const summaryMetrics: SummaryMetric[] = [
  {
    id: 'revenue',
    label: 'Revenue',
    value: '₽2,480,000',
    delta: '+12.4% MoM',
    trend: 'up',
    description:
      'Growth comes from a higher average order value and returning enterprise customers.',
  },
  {
    id: 'expenses',
    label: 'Expenses',
    value: '₽1,540,000',
    delta: '+4.1% MoM',
    trend: 'neutral',
    description:
      'Marketing and logistics spend increased ahead of the seasonal demand spike.',
  },
  {
    id: 'gross-margin',
    label: 'Gross margin',
    value: '38.2%',
    delta: '+2.3 p.p.',
    trend: 'up',
    description:
      'Margin improvement driven by procurement optimisation and warehouse automation.',
  },
  {
    id: 'cash-on-hand',
    label: 'Cash on hand',
    value: '₽860,000',
    delta: '-6.8% MoM',
    trend: 'down',
    description:
      'Cash balance reduced after an early loan repayment and planned CAPEX investment.',
  },
]

export const monthlyRevenue = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  values: [
    1180000, 1240000, 1310000, 1450000, 1510000, 1630000, 1750000, 1890000, 2010000, 2140000,
    2240000, 2360000,
  ],
  target: 2500000,
}

export const forecastHighlights: ForecastHighlight[] = [
  {
    id: 'q4-outlook',
    title: 'Q4 revenue outlook',
    projection: '₽2.9M',
    change: '+18% vs previous quarter',
    description:
      'Enterprise contracts and expansion into new regions remain the primary growth drivers.',
    tone: 'positive',
  },
  {
    id: 'burn-rate',
    title: 'Monthly burn rate',
    projection: '₽410K',
    change: '-6% vs last month',
    description:
      'Lower acquisition spend and better SLA adherence reduced the operating run rate.',
    tone: 'neutral',
  },
  {
    id: 'risk',
    title: 'Risk focus',
    projection: 'Medium level',
    change: 'Attention on accounts payable',
    description:
      'Supplier negotiations on payment terms continue while credit limits are being rebalanced.',
    tone: 'warning',
  },
]

export const cashflowBreakdown: CashflowItem[] = [
  { id: 'incoming', title: 'Incoming payments', value: '₽1,880,000', share: 64 },
  { id: 'outgoing', title: 'Outgoing payments', value: '₽1,020,000', share: 36 },
  { id: 'operational', title: 'Operational costs', value: '₽620,000', share: 22 },
  { id: 'investments', title: 'Investments & CAPEX', value: '₽270,000', share: 9 },
]

export const transactions: TransactionItem[] = [
  {
    id: 'trx-001',
    description: 'Quarterly subscription renewal',
    category: 'Revenue',
    counterparty: 'Northwind Analytics',
    amount: 125000,
    direction: 'income',
    date: '2024-12-15',
  },
  {
    id: 'trx-002',
    description: 'Cloud infrastructure spend',
    category: 'Operations',
    counterparty: 'Azure CSP',
    amount: -48200,
    direction: 'expense',
    date: '2024-12-14',
  },
  {
    id: 'trx-003',
    description: 'Marketing performance bonus',
    category: 'Payroll',
    counterparty: 'Growth Team',
    amount: -18500,
    direction: 'expense',
    date: '2024-12-13',
  },
  {
    id: 'trx-004',
    description: 'Enterprise onboarding services',
    category: 'Revenue',
    counterparty: 'Omega Retail',
    amount: 72000,
    direction: 'income',
    date: '2024-12-12',
  },
  {
    id: 'trx-005',
    description: 'Data enrichment vendor fee',
    category: 'Vendors',
    counterparty: 'ClearSignal',
    amount: -22600,
    direction: 'expense',
    date: '2024-12-12',
  },
]
