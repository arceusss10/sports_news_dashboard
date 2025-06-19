import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface Article {
  id: string
  title: string
  author: string
  date: string
  type: 'news' | 'blog'
  content: string
}

interface NewsState {
  articles: Article[]
  loading: boolean
  error: string | null
  filters: {
    author: string | null
    dateRange: {
      start: string | null
      end: string | null
    }
    type: 'all' | 'news' | 'blog'
    searchQuery: string
  }
}

const initialState: NewsState = {
  articles: [],
  loading: false,
  error: null,
  filters: {
    author: null,
    dateRange: {
      start: null,
      end: null
    },
    type: 'all',
    searchQuery: ''
  }
}

const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {
    setArticles: (state, action: PayloadAction<Article[]>) => {
      state.articles = action.payload
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
    },
    setFilters: (state, action: PayloadAction<Partial<NewsState['filters']>>) => {
      state.filters = { ...state.filters, ...action.payload }
    },
    clearFilters: (state) => {
      state.filters = initialState.filters
    }
  }
})

export const { setArticles, setLoading, setError, setFilters, clearFilters } = newsSlice.actions
export default newsSlice.reducer 