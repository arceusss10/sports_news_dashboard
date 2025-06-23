# SportsDunia Dashboard

A responsive dashboard application with news aggregation and payout calculation features.

![image](https://github.com/user-attachments/assets/455b9753-51b6-416e-9804-4ab7c49c6304)



## Features

- **User Authentication**
  - Secure login functionality
  - Role-based access control (admin/user)

- **News and Blog Integration**
  - Fetch and display articles from third-party APIs
  - Filter articles by author, date range, and type
  - Global search functionality

- **Payout Calculator**
  - Set payout rates for different content types
  - Automatic calculation based on article count
  - Export functionality (PDF/CSV/Excel)

- **Responsive Design**
  - Mobile-first approach
  - Modern UI with Tailwind CSS
  - Smooth transitions and animations

## Tech Stack

- Next.js 14 with App Router
- TypeScript
- Redux Toolkit for state management
- Tailwind CSS for styling
- Headless UI for accessible components
- jsPDF and XLSX for export functionality

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
src/
├── app/                 # Next.js app router pages
├── components/         # React components
│   └── Dashboard/     # Dashboard-related components
├── lib/               # Utilities and store
│   ├── store.ts      # Redux store configuration
│   └── features/     # Redux slices
└── styles/           # Global styles
```


