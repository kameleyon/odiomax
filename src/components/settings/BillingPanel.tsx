import { CreditCard, Download } from 'lucide-react'

export function BillingPanel() {
  const paymentHistory = [
    {
      id: '1',
      date: 'Dec 20, 2023',
      amount: '$29.99',
      status: 'Paid',
      invoice: 'INV-2023-001'
    },
    {
      id: '2',
      date: 'Nov 20, 2023',
      amount: '$29.99',
      status: 'Paid',
      invoice: 'INV-2023-002'
    },
    {
      id: '3',
      date: 'Oct 20, 2023',
      amount: '$29.99',
      status: 'Paid',
      invoice: 'INV-2023-003'
    }
  ]

  return (
    <div className="space-y-8">
      {/* Payment Method */}
      <div>
        <h2 className="text-xl font-semibold mb-6">Payment Method</h2>
        <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10">
          <div className="flex items-center gap-4">
            <CreditCard className="w-6 h-6 text-white/60" />
            <div>
              <p className="font-medium">•••• •••• •••• 4242</p>
              <p className="text-sm text-white/60">Expires 12/24</p>
            </div>
          </div>
          <button className="px-4 py-2 bg-primary hover:bg-primary/80 rounded-lg transition-colors">
            Update
          </button>
        </div>
      </div>

      {/* Next Payment */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Next Payment</h2>
        <div className="p-4 bg-white/5 rounded-lg border border-white/10">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-white/60">Amount due</p>
              <p className="text-2xl font-bold">$29.99</p>
            </div>
            <div>
              <p className="text-sm text-white/60">Due date</p>
              <p className="font-medium">Jan 20, 2024</p>
            </div>
          </div>
        </div>
      </div>

      {/* Payment History */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Payment History</h2>
        <div className="bg-white/5 rounded-lg border border-white/10">
          <div className="grid grid-cols-[1fr,1fr,1fr,auto] gap-4 p-4 border-b border-white/10 text-sm text-white/60">
            <div>Date</div>
            <div>Amount</div>
            <div>Status</div>
            <div></div>
          </div>
          <div className="divide-y divide-white/10">
            {paymentHistory.map((payment) => (
              <div
                key={payment.id}
                className="grid grid-cols-[1fr,1fr,1fr,auto] gap-4 p-4 items-center"
              >
                <div>{payment.date}</div>
                <div>{payment.amount}</div>
                <div>
                  <span className="px-2 py-1 text-sm bg-green-500/20 text-green-500 rounded-full">
                    {payment.status}
                  </span>
                </div>
                <button
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                  title="Download Invoice"
                >
                  <Download className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}