import { BarChart3 } from 'lucide-react'

export function TokenUsagePanel() {
  const tokenUsage = {
    total: 500000,
    used: 324500,
    categories: [
      { name: 'Text Generation', tokens: 150000 },
      { name: 'Voice Cloning', tokens: 100000 },
      { name: 'Audio Processing', tokens: 74500 }
    ]
  }

  const percentageUsed = (tokenUsage.used / tokenUsage.total) * 100

  return (
    <div className="space-y-8">
      {/* Overall Usage */}
      <div>
        <h2 className="text-xl font-semibold mb-6">Token Usage Overview</h2>
        <div className="p-6 bg-white/5 rounded-lg border border-white/10">
          <div className="flex justify-between items-end mb-4">
            <div>
              <p className="text-sm text-white/60 mb-1">Monthly Usage</p>
              <p className="text-3xl font-bold">{tokenUsage.used.toLocaleString()}</p>
            </div>
            <p className="text-white/60">
              of {tokenUsage.total.toLocaleString()} tokens
            </p>
          </div>

          {/* Progress Bar */}
          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-primary"
              style={{ width: `${percentageUsed}%` }}
            />
          </div>
        </div>
      </div>

      {/* Usage by Category */}
      <div>
        <h2 className="text-xl font-semibold mb-6">Usage by Category</h2>
        <div className="space-y-4">
          {tokenUsage.categories.map((category) => (
            <div
              key={category.name}
              className="p-4 bg-white/5 rounded-lg border border-white/10"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-primary" />
                  <span className="font-medium">{category.name}</span>
                </div>
                <span>{category.tokens.toLocaleString()} tokens</span>
              </div>
              <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary"
                  style={{
                    width: `${(category.tokens / tokenUsage.total) * 100}%`
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Buy More Tokens */}
      <div className="flex justify-end">
        <button className="px-6 py-2 bg-primary hover:bg-primary/80 rounded-lg transition-colors">
          Buy More Tokens
        </button>
      </div>
    </div>
  )
}