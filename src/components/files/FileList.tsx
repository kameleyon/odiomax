import { useState } from 'react'
import { 
  MoreVertical, 
  Download, 
  Share2, 
  Trash2, 
  Edit2, 
  Star,
  Archive,
  Play,
  Pause
} from 'lucide-react'
import { FileActionsMenu } from './FileActionsMenu'

interface FileListProps {
  searchQuery: string
  activeFilter: string
  showFavorites: boolean
}

export function FileList({ searchQuery, activeFilter, showFavorites }: FileListProps) {
  const [activeFile, setActiveFile] = useState<string | null>(null)
  const [isPlaying, setIsPlaying] = useState<string | null>(null)

  // Mock data with updated categories
  const files = [
    {
      id: '1',
      title: 'Tech Insights Episode 1',
      date: '2023-12-20',
      category: 'Podcast',
      tone: 'Professional',
      voice: 'Emma',
      favorite: true,
    },
    {
      id: '2',
      title: 'Future of AI',
      date: '2023-12-19',
      category: 'TED Talk',
      tone: 'Inspirational',
      voice: 'James',
      favorite: false,
    },
    {
      id: '3',
      title: 'Morning Headlines',
      date: '2023-12-18',
      category: 'News',
      tone: 'Professional',
      voice: 'Sarah',
      favorite: false,
    },
    {
      id: '4',
      title: 'Bedtime Story',
      date: '2023-12-17',
      category: 'Kids Content',
      tone: 'Friendly',
      voice: 'Alex',
      favorite: true,
    },
    {
      id: '5',
      title: 'Brand Commercial',
      date: '2023-12-16',
      category: 'Advertisement',
      tone: 'Energetic',
      voice: 'Michael',
      favorite: false,
    }
  ]

  // Filter files based on search query, active filter, and favorites
  const filteredFiles = files.filter(file => {
    const matchesSearch = file.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         file.category.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter = activeFilter === 'all' || file.category.toLowerCase() === activeFilter
    const matchesFavorites = !showFavorites || file.favorite

    return matchesSearch && matchesFilter && matchesFavorites
  })

  return (
    <div className="bg-white/5 rounded-lg border border-white/10">
      {/* Table Header */}
      <div className="grid grid-cols-[1fr,2fr,1fr,1fr,1fr,auto] gap-4 p-4 border-b border-white/10 text-white/60">
        <div>Date</div>
        <div>Title</div>
        <div>Category</div>
        <div>Tone</div>
        <div>Voice</div>
        <div className="w-10"></div>
      </div>

      {/* Table Body */}
      <div className="divide-y divide-white/10">
        {filteredFiles.length === 0 ? (
          <div className="p-8 text-center text-white/60">
            No files found matching your criteria
          </div>
        ) : (
          filteredFiles.map((file) => (
            <div
              key={file.id}
              className="grid grid-cols-[1fr,2fr,1fr,1fr,1fr,auto] gap-4 p-4 items-center hover:bg-white/5 transition-colors"
            >
              <div className="text-white/80">{file.date}</div>
              <div className="text-white font-medium">{file.title}</div>
              <div className="text-white/80">{file.category}</div>
              <div className="text-white/80">{file.tone}</div>
              <div className="text-white/80">{file.voice}</div>
              <div className="relative">
                <button
                  onClick={() => setActiveFile(activeFile === file.id ? null : file.id)}
                  className="p-1 hover:bg-white/10 rounded-full transition-colors"
                >
                  <MoreVertical className="w-5 h-5 text-white/80" />
                </button>

                {activeFile === file.id && (
                  <FileActionsMenu
                    file={file}
                    isPlaying={isPlaying === file.id}
                    onPlay={() => setIsPlaying(isPlaying === file.id ? null : file.id)}
                    onClose={() => setActiveFile(null)}
                  />
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}