'use client';

import React from 'react';
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

// Sample data - replace with actual data from your backend
const authorData = [
  { name: 'John Doe', articles: 12 },
  { name: 'Jane Smith', articles: 8 },
  { name: 'Mike Johnson', articles: 15 },
  { name: 'Sarah Wilson', articles: 10 }
];

const contentTypeData = [
  { name: 'News Articles', value: 45 },
  { name: 'Match Reports', value: 25 },
  { name: 'Player Profiles', value: 15 },
  { name: 'Analysis', value: 20 }
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export default function NewsAnalytics() {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold mb-6">News Analytics</h2>
      
      {/* Articles by Author Bar Chart */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4">Articles by Author</h3>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={authorData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="articles" fill="#4F46E5" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Content Type Distribution Pie Chart */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Content Type Distribution</h3>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={contentTypeData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
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
  );
} 