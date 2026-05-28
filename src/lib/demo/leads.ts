export interface TimelineEvent {
  date: string
  action: string
  target: string
  type: 'like' | 'comment' | 'repost' | 'profile_view'
}

export interface Lead {
  id: string
  name: string
  title: string
  company: string
  companySize: string
  industry: string
  location: string
  engagementType: 'like' | 'comment' | 'repost' | 'profile_view'
  engagedProfile: string
  icpScore: number
  enriched: boolean
  email?: string
  phone?: string
  linkedinUrl: string
  lastEngagement: string
  tags: string[]
  timeline?: TimelineEvent[]
}

export const mockLeads: Lead[] = [
  {
    id: 'lead-1',
    name: 'Alexandra Chen',
    title: 'VP of Engineering',
    company: 'Stripe',
    companySize: '5,000+',
    industry: 'Fintech',
    location: 'San Francisco, CA',
    engagementType: 'comment',
    engagedProfile: 'Lenny Rachitsky',
    icpScore: 94,
    enriched: true,
    email: 'alex.chen@stripe.com',
    phone: '+1 (415) 555-0192',
    linkedinUrl: 'https://linkedin.com/in/alexandra-chen',
    lastEngagement: '2026-05-27T14:32:00Z',
    tags: ['decision-maker', 'engineering-lead', 'fintech'],
    timeline: [
      { date: '2026-05-27T14:32:00Z', action: 'Commented on post', target: 'Lenny Rachitsky', type: 'comment' },
      { date: '2026-05-25T09:15:00Z', action: 'Liked post', target: 'Lenny Rachitsky', type: 'like' },
      { date: '2026-05-22T11:40:00Z', action: 'Reposted thread', target: 'Sam Altman', type: 'repost' },
      { date: '2026-05-18T16:20:00Z', action: 'Viewed profile', target: 'Your Profile', type: 'profile_view' },
    ],
  },
  {
    id: 'lead-2',
    name: 'Marcus Williams',
    title: 'Head of Sales',
    company: 'Notion',
    companySize: '500-1,000',
    industry: 'SaaS',
    location: 'New York, NY',
    engagementType: 'repost',
    engagedProfile: 'Lenny Rachitsky',
    icpScore: 88,
    enriched: true,
    email: 'marcus.w@notion.so',
    linkedinUrl: 'https://linkedin.com/in/marcus-williams',
    lastEngagement: '2026-05-27T11:15:00Z',
    tags: ['sales-lead', 'saas', 'high-intent'],
    timeline: [
      { date: '2026-05-27T11:15:00Z', action: 'Reposted thread', target: 'Lenny Rachitsky', type: 'repost' },
      { date: '2026-05-24T08:30:00Z', action: 'Commented on post', target: 'Lenny Rachitsky', type: 'comment' },
      { date: '2026-05-20T14:10:00Z', action: 'Liked post', target: 'Dylan Field', type: 'like' },
    ],
  },
  {
    id: 'lead-3',
    name: 'Priya Sharma',
    title: 'CTO',
    company: 'Vercel',
    companySize: '500-1,000',
    industry: 'DevTools',
    location: 'Remote',
    engagementType: 'like',
    engagedProfile: 'Guillermo Rauch',
    icpScore: 91,
    enriched: true,
    email: 'priya@vercel.com',
    phone: '+1 (555) 234-5678',
    linkedinUrl: 'https://linkedin.com/in/priya-sharma',
    lastEngagement: '2026-05-27T09:45:00Z',
    tags: ['c-level', 'technical', 'devtools'],
    timeline: [
      { date: '2026-05-27T09:45:00Z', action: 'Liked post', target: 'Guillermo Rauch', type: 'like' },
      { date: '2026-05-26T10:00:00Z', action: 'Commented on post', target: 'Guillermo Rauch', type: 'comment' },
      { date: '2026-05-21T13:25:00Z', action: 'Reposted thread', target: 'Vercel', type: 'repost' },
      { date: '2026-05-15T09:50:00Z', action: 'Viewed profile', target: 'Your Profile', type: 'profile_view' },
    ],
  },
  {
    id: 'lead-4',
    name: 'Jordan Lee',
    title: 'Director of Growth',
    company: 'Figma',
    companySize: '1,000-5,000',
    industry: 'Design Tools',
    location: 'San Francisco, CA',
    engagementType: 'comment',
    engagedProfile: 'Dylan Field',
    icpScore: 82,
    enriched: false,
    linkedinUrl: 'https://linkedin.com/in/jordan-lee',
    lastEngagement: '2026-05-26T16:20:00Z',
    tags: ['growth', 'design-tools', 'mid-market'],
    timeline: [
      { date: '2026-05-26T16:20:00Z', action: 'Commented on thread', target: 'Dylan Field', type: 'comment' },
      { date: '2026-05-23T11:05:00Z', action: 'Liked post', target: 'Dylan Field', type: 'like' },
      { date: '2026-05-19T15:40:00Z', action: 'Viewed profile', target: 'Your Profile', type: 'profile_view' },
    ],
  },
  {
    id: 'lead-5',
    name: 'Ryan Torres',
    title: 'Founder & CEO',
    company: 'Kinetic AI',
    companySize: '10-50',
    industry: 'AI / ML',
    location: 'Austin, TX',
    engagementType: 'repost',
    engagedProfile: 'Sam Altman',
    icpScore: 96,
    enriched: true,
    email: 'ryan@kineticai.io',
    phone: '+1 (512) 555-0147',
    linkedinUrl: 'https://linkedin.com/in/ryan-torres',
    lastEngagement: '2026-05-26T13:10:00Z',
    tags: ['founder', 'ai', 'early-stage', 'high-intent'],
    timeline: [
      { date: '2026-05-26T13:10:00Z', action: 'Reposted thread', target: 'Sam Altman', type: 'repost' },
      { date: '2026-05-25T07:20:00Z', action: 'Commented on post', target: 'Sam Altman', type: 'comment' },
      { date: '2026-05-22T12:00:00Z', action: 'Liked post', target: 'Sam Altman', type: 'like' },
      { date: '2026-05-10T09:30:00Z', action: 'Viewed profile', target: 'Your Profile', type: 'profile_view' },
      { date: '2026-04-28T14:15:00Z', action: 'Commented on post', target: 'Lenny Rachitsky', type: 'comment' },
    ],
  },
  {
    id: 'lead-6',
    name: 'Emily Park',
    title: 'Senior Product Manager',
    company: 'Linear',
    companySize: '100-500',
    industry: 'SaaS',
    location: 'Stockholm, Sweden',
    engagementType: 'profile_view',
    engagedProfile: 'Lenny Rachitsky',
    icpScore: 76,
    enriched: false,
    linkedinUrl: 'https://linkedin.com/in/emily-park',
    lastEngagement: '2026-05-25T08:55:00Z',
    tags: ['product', 'saas', 'emea'],
    timeline: [
      { date: '2026-05-25T08:55:00Z', action: 'Viewed profile', target: 'Your Profile', type: 'profile_view' },
      { date: '2026-05-20T10:45:00Z', action: 'Liked post', target: 'Lenny Rachitsky', type: 'like' },
    ],
  },
  {
    id: 'lead-7',
    name: 'David Kim',
    title: 'VP of Revenue',
    company: 'Loom',
    companySize: '500-1,000',
    industry: 'SaaS',
    location: 'New York, NY',
    engagementType: 'like',
    engagedProfile: 'Dylan Field',
    icpScore: 85,
    enriched: true,
    email: 'david.kim@loom.com',
    linkedinUrl: 'https://linkedin.com/in/david-kim',
    lastEngagement: '2026-05-25T19:30:00Z',
    tags: ['revenue-lead', 'saas', 'enterprise'],
    timeline: [
      { date: '2026-05-25T19:30:00Z', action: 'Liked post', target: 'Dylan Field', type: 'like' },
      { date: '2026-05-22T08:15:00Z', action: 'Commented on post', target: 'Dylan Field', type: 'comment' },
      { date: '2026-05-18T11:30:00Z', action: 'Reposted thread', target: 'Lenny Rachitsky', type: 'repost' },
    ],
  },
  {
    id: 'lead-8',
    name: 'Sarah Johnson',
    title: 'Chief Technology Officer',
    company: 'Plaid',
    companySize: '1,000-5,000',
    industry: 'Fintech',
    location: 'San Francisco, CA',
    engagementType: 'comment',
    engagedProfile: 'Sam Altman',
    icpScore: 93,
    enriched: true,
    email: 'sarah.j@plaid.com',
    phone: '+1 (415) 555-0284',
    linkedinUrl: 'https://linkedin.com/in/sarah-johnson',
    lastEngagement: '2026-05-24T10:15:00Z',
    tags: ['c-level', 'fintech', 'technical', 'high-intent'],
    timeline: [
      { date: '2026-05-24T10:15:00Z', action: 'Commented on thread', target: 'Sam Altman', type: 'comment' },
      { date: '2026-05-21T09:00:00Z', action: 'Liked post', target: 'Sam Altman', type: 'like' },
      { date: '2026-05-17T13:45:00Z', action: 'Reposted thread', target: 'Sam Altman', type: 'repost' },
      { date: '2026-05-12T10:20:00Z', action: 'Viewed profile', target: 'Your Profile', type: 'profile_view' },
    ],
  },
]

export const mockWatchlist = [
  { id: 'watch-1', name: 'Lenny Rachitsky', handle: '@lennysan', followers: '850K', role: 'Product Thought Leader', category: 'Influencer' },
  { id: 'watch-2', name: 'Sam Altman', handle: '@sama', followers: '2.1M', role: 'OpenAI CEO', category: 'Executive' },
  { id: 'watch-3', name: 'Dylan Field', handle: '@zoink', followers: '320K', role: 'Figma CEO', category: 'Founder' },
  { id: 'watch-4', name: 'Guillermo Rauch', handle: '@rauchg', followers: '410K', role: 'Vercel CEO', category: 'Founder' },
]

export const icpTemplate = {
  titles: ['VP', 'Director', 'Head of', 'CTO', 'CEO', 'Founder'],
  industries: ['SaaS', 'Fintech', 'DevTools', 'AI / ML', 'HealthTech'],
  companySizes: ['10-50', '50-200', '200-1,000', '1,000-5,000', '5,000+'],
  locations: ['North America', 'EMEA', 'APAC'],
}
