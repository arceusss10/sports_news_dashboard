'use client'

import { useSelector } from 'react-redux'
import { RootState } from '@/lib/store'
import { ArrowDownTrayIcon } from '@heroicons/react/24/outline'
import { jsPDF } from 'jspdf'
import * as XLSX from 'xlsx'
import { Menu, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { unparse } from 'papaparse'

interface Calculation {
  authorId: string
  articleCount: number
  totalPayout: number
}

interface Rate {
  type: string
  rate: number
}

interface PayoutState {
  calculations: Calculation[]
  rates: Rate[]
}

interface NewsState {
  articles: Array<{
    author: string
    type: string
  }>
}

export default function PayoutSection() {
  const { calculations, rates } = useSelector((state: RootState) => state.payout as PayoutState)
  const { articles } = useSelector((state: RootState) => state.news as NewsState)

  const calculateTotalPayout = (authorId: string) => {
    const authorArticles = articles.filter(article => article.author === authorId)
    return authorArticles.reduce((total, article) => {
      const rate = rates.find((r: Rate) => r.type === article.type)?.rate || 0
      return total + rate
    }, 0)
  }

  const exportToPDF = () => {
    const doc = new jsPDF()
    
    // Add title
    doc.setFontSize(16)
    doc.text('Payout Report', 20, 20)
    
    // Add table headers
    doc.setFontSize(12)
    doc.text(['Author', 'Articles', 'Total Payout'], 20, 40)
    
    // Add data rows
    let yPos = 50
    calculations.forEach((calc: Calculation) => {
      doc.text([
        calc.authorId,
        calc.articleCount.toString(),
        `₹${calc.totalPayout.toFixed(2)}`
      ], 20, yPos)
      yPos += 10
    })
    
    doc.save('payout-report.pdf')
  }

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(calculations)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Payouts')
    XLSX.writeFile(workbook, 'payout-report.xlsx')
  }

  const exportToCSV = () => {
    const csv = unparse(calculations)
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)
    link.setAttribute('href', url)
    link.setAttribute('download', 'payout-report.csv')
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="px-4 py-5 sm:p-6">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h3 className="text-base font-semibold leading-6 text-gray-900">Payout Calculator</h3>
            <p className="mt-2 text-sm text-gray-700">Calculate and export payout information for all authors.</p>
          </div>
          <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
            <Menu as="div" className="relative inline-block text-left">
              <div>
                <Menu.Button className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus:visible:outline focus:visible:outline-2 focus:visible:outline-offset-2 focus:visible:outline-indigo-600">
                  <ArrowDownTrayIcon className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
                  Export
                </Menu.Button>
              </div>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-1">
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={exportToPDF}
                          className={`${
                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                          } block w-full px-4 py-2 text-left text-sm`}
                        >
                          Export as PDF
                        </button>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={exportToExcel}
                          className={`${
                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                          } block w-full px-4 py-2 text-left text-sm`}
                        >
                          Export as Excel
                        </button>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={exportToCSV}
                          className={`${
                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                          } block w-full px-4 py-2 text-left text-sm`}
                        >
                          Export as CSV
                        </button>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        </div>

        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Author</th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Articles</th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Total Payout</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {calculations.map((calc: Calculation) => (
                  <tr key={calc.authorId}>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">{calc.authorId}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{calc.articleCount}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">₹{calc.totalPayout.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
} 