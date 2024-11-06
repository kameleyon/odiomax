import { useState } from 'react'
import { Plus, Search } from 'lucide-react'

export function BlogManagement() {
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Blog Management</h2>
        <button className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary/80 rounded-lg transition-colors">
          <Plus className="w-4 h-4" />
          <span>New Post</span>
        </button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search posts..."
          className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg 
                   focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
        />
      </div>

      <div className="bg-white/5 rounded-lg border border-white/10">
        <div className="p-4 text-center text-white/60">
          Blog management features coming soon...
        </div>
      </div>
    </div>
  )
}