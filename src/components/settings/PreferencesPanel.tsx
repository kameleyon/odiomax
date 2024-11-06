import { Bell, Mail } from 'lucide-react'

export function PreferencesPanel() {
  return (
    <div className="space-y-8">
      {/* Email Preferences */}
      <div>
        <h2 className="text-xl font-semibold mb-6">Email Preferences</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10">
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-white/60" />
              <div>
                <p className="font-medium">Product Updates</p>
                <p className="text-sm text-white/60">Receive updates about new features</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10">
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-white/60" />
              <div>
                <p className="font-medium">Marketing Emails</p>
                <p className="text-sm text-white/60">Receive special offers and promotions</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>
        </div>
      </div>

      {/* Notification Settings */}
      <div>
        <h2 className="text-xl font-semibold mb-6">Notification Settings</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10">
            <div className="flex items-center gap-3">
              <Bell className="w-5 h-5 text-white/60" />
              <div>
                <p className="font-medium">Processing Completed</p>
                <p className="text-sm text-white/60">When audio generation is complete</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10">
            <div className="flex items-center gap-3">
              <Bell className="w-5 h-5 text-white/60" />
              <div>
                <p className="font-medium">Token Usage Alerts</p>
                <p className="text-sm text-white/60">When approaching token limit</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10">
            <div className="flex items-center gap-3">
              <Bell className="w-5 h-5 text-white/60" />
              <div>
                <p className="font-medium">Security Alerts</p>
                <p className="text-sm text-white/60">Important account security updates</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>
        </div>
      </div>
    </div>
  )
}