'use client'

export function Sidebar() {
  return (
    <aside className="w-64 bg-white shadow">
      <nav className="mt-5 px-2">
        <a href="#" className="group flex items-center px-2 py-2 text-base font-medium rounded-md">
          Dashboard
        </a>
        <a href="#" className="group flex items-center px-2 py-2 text-base font-medium rounded-md">
          Backtesting
        </a>
        <a href="#" className="group flex items-center px-2 py-2 text-base font-medium rounded-md">
          Analytics
        </a>
      </nav>
    </aside>
  )
} 