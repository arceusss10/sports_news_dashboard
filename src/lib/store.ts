import { configureStore } from '@reduxjs/toolkit'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// News Slice
interface Article {
  id: string;
  title: string;
  author: string;
  type: 'article' | 'blog';
}

interface NewsState {
  articles: Article[];
  loading: boolean;
  error: string | null;
}

const initialNewsState: NewsState = {
  articles: [],
  loading: false,
  error: null,
};

const newsSlice = createSlice({
  name: 'news',
  initialState: initialNewsState,
  reducers: {
    setArticles: (state, action: PayloadAction<Article[]>) => {
      state.articles = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

// Payout Slice
interface PayoutCalculation {
  authorId: string;
  articleCount: number;
  totalPayout: number;
}

interface Rate {
  type: string;
  rate: number;
}

interface PayoutState {
  calculations: PayoutCalculation[];
  rates: {
    articleRate: number;
    blogRate: number;
  };
}

const initialPayoutState: PayoutState = {
  calculations: [],
  rates: {
    articleRate: 5000,
    blogRate: 10000,
  },
};

const payoutSlice = createSlice({
  name: 'payout',
  initialState: initialPayoutState,
  reducers: {
    setCalculations: (state, action: PayloadAction<PayoutCalculation[]>) => {
      state.calculations = action.payload;
    },
    setRates: (state, action: PayloadAction<{ articleRate: number; blogRate: number }>) => {
      state.rates = action.payload;
    },
  },
});

// Configure Store
export const store = configureStore({
  reducer: {
    news: newsSlice.reducer,
    payout: payoutSlice.reducer,
  },
})

// Export actions
export const { setArticles, setLoading, setError } = newsSlice.actions;
export const { setCalculations, setRates } = payoutSlice.actions;

// Export types
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch 