import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface PayoutRate {
  type: 'news' | 'blog'
  rate: number
}

interface PayoutCalculation {
  authorId: string
  articleCount: number
  totalPayout: number
}

interface PayoutState {
  rates: PayoutRate[]
  calculations: PayoutCalculation[]
  loading: boolean
  error: string | null
}

const initialState: PayoutState = {
  rates: [
    { type: 'news', rate: 100 },
    { type: 'blog', rate: 150 }
  ],
  calculations: [],
  loading: false,
  error: null
}

const payoutSlice = createSlice({
  name: 'payout',
  initialState,
  reducers: {
    setRates: (state, action: PayloadAction<PayoutRate[]>) => {
      state.rates = action.payload
    },
    updateCalculations: (state, action: PayloadAction<PayoutCalculation[]>) => {
      state.calculations = action.payload
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
    }
  }
})

export const { setRates, updateCalculations, setLoading, setError } = payoutSlice.actions
export default payoutSlice.reducer 