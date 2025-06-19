'use client';

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/store';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import {
  NewspaperIcon,
  DocumentTextIcon,
  CurrencyRupeeIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline';

interface DashboardStats {
  totalArticles: number;
  totalBlogs: number;
  totalPayout: number;
  articlesByAuthor: { [key: string]: number };
  blogsByAuthor: { [key: string]: number };
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

export default function DashboardOverview() {
  const { articles } = useSelector((state: RootState) => state.news);
  const { calculations, rates } = useSelector((state: RootState) => state.payout);
  const [stats, setStats] = useState<DashboardStats>({
    totalArticles: 0,
    totalBlogs: 0,
    totalPayout: 0,
    articlesByAuthor: {},
    blogsByAuthor: {}
  });

  useEffect(() => {
    const articlesByAuthor: { [key: string]: number } = {};
    const blogsByAuthor: { [key: string]: number } = {};
    let totalPayout = 0;

    articles.forEach(article => {
      if (article.type === 'article') {
        articlesByAuthor[article.author] = (articlesByAuthor[article.author] || 0) + 1;
        totalPayout += rates.articleRate;
      } else {
        blogsByAuthor[article.author] = (blogsByAuthor[article.author] || 0) + 1;
        totalPayout += rates.blogRate;
      }
    });

    setStats({
      totalArticles: Object.values(articlesByAuthor).reduce((a, b) => a + b, 0),
      totalBlogs: Object.values(blogsByAuthor).reduce((a, b) => a + b, 0),
      totalPayout,
      articlesByAuthor,
      blogsByAuthor
    });
  }, [articles, rates]);

  const authorDistributionData = Object.entries(stats.articlesByAuthor).map(([author, count]) => ({
    name: author,
    Articles: count,
    Blogs: stats.blogsByAuthor[author] || 0
  }));

  const contentTypeData = [
    { name: 'Articles', value: stats.totalArticles },
    { name: 'Blogs', value: stats.totalBlogs }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <NewspaperIcon className="h-8 w-8 text-blue-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Articles</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.totalArticles}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <DocumentTextIcon className="h-8 w-8 text-green-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Blogs</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.totalBlogs}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <CurrencyRupeeIcon className="h-8 w-8 text-yellow-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Payout</p>
              <p className="text-2xl font-semibold text-gray-900">₹{stats.totalPayout.toFixed(2)}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <ChartBarIcon className="h-8 w-8 text-purple-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Content</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.totalArticles + stats.totalBlogs}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Author Distribution Chart */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Content Distribution by Author</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={authorDistributionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="Articles" fill="#0088FE" />
                <Bar dataKey="Blogs" fill="#00C49F" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Content Type Distribution */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Content Type Distribution</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={contentTypeData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {contentTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
} 