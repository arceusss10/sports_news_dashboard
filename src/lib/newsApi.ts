const NEWS_API_KEY = process.env.NEXT_PUBLIC_NEWS_API_KEY
const BASE_URL = 'https://newsapi.org/v2'

export type NewsArticle = {
  id: string
  title: string
  author: string
  date: string
  type: 'news'
  content: string
  source: {
    id: string | null
    name: string
  }
  url: string
  urlToImage: string | null
  description: string
  publishedAt: string
}

type NewsAPIResponse = {
  status: string
  totalResults: number
  articles: Array<{
    source: {
      id: string | null
      name: string
    }
    author: string | null
    title: string
    description: string
    url: string
    urlToImage: string | null
    publishedAt: string
    content: string
  }>
}

export async function fetchSportsNews(
  query: string = 'sports',
  page: number = 1,
  pageSize: number = 10
): Promise<{ articles: NewsArticle[]; totalResults: number }> {
  if (!NEWS_API_KEY) {
    throw new Error('News API key is not configured')
  }

  try {
    const response = await fetch(
      `${BASE_URL}/everything?` +
      `q=${encodeURIComponent(query)}` +
      `&apiKey=${NEWS_API_KEY}` +
      `&page=${page}` +
      `&pageSize=${pageSize}` +
      `&language=en` +
      `&sortBy=publishedAt`
    )

    if (!response.ok) {
      throw new Error(`News API responded with status: ${response.status}`)
    }

    const data: NewsAPIResponse = await response.json()

    const articles: NewsArticle[] = data.articles.map((article, index) => ({
      id: `${article.source.id || 'news'}-${Date.now()}-${index}`,
      title: article.title,
      author: article.author || 'Unknown',
      date: article.publishedAt,
      type: 'news',
      content: article.content || article.description,
      source: article.source,
      url: article.url,
      urlToImage: article.urlToImage,
      description: article.description,
      publishedAt: article.publishedAt
    }))

    return {
      articles,
      totalResults: data.totalResults
    }
  } catch (error) {
    console.error('Error fetching news:', error)
    throw error
  }
}

export async function searchSportsNews(
  searchTerm: string,
  page: number = 1,
  pageSize: number = 10
): Promise<{ articles: NewsArticle[]; totalResults: number }> {
  return fetchSportsNews(searchTerm, page, pageSize)
}

export async function fetchNewsByCategory(
  category: string,
  page: number = 1,
  pageSize: number = 10
): Promise<{ articles: NewsArticle[]; totalResults: number }> {
  return fetchSportsNews(`${category} sports`, page, pageSize)
} 