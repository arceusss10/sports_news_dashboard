type Article = {
  id: string
  title: string
  author: string
  date: string
  type: 'news' | 'blog'
  content: string
}

export const mockArticles: Article[] = [
  {
    id: '1',
    title: 'The Future of Cricket: T20 Leagues vs International Cricket',
    author: 'John Smith',
    date: '2024-03-12',
    type: 'news',
    content: 'An analysis of the growing influence of T20 leagues on international cricket...'
  },
  {
    id: '2',
    title: 'Top 10 Football Transfers of 2024',
    author: 'Sarah Johnson',
    date: '2024-03-11',
    type: 'blog',
    content: 'A comprehensive look at the biggest football transfers this year...'
  },
  {
    id: '3',
    title: 'NBA Playoff Race Heats Up',
    author: 'Mike Brown',
    date: '2024-03-10',
    type: 'news',
    content: 'Latest updates on the NBA playoff race and team standings...'
  },
  {
    id: '4',
    title: 'The Evolution of Tennis Equipment',
    author: 'Sarah Johnson',
    date: '2024-03-09',
    type: 'blog',
    content: 'How tennis equipment has evolved over the decades...'
  },
  {
    id: '5',
    title: 'Formula 1: New Season Preview',
    author: 'John Smith',
    date: '2024-03-08',
    type: 'news',
    content: 'What to expect from the upcoming Formula 1 season...'
  }
] as const

export const mockPayoutRates = {
  news: 100, // $100 per news article
  blog: 150  // $150 per blog post
} 