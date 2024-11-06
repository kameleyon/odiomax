import { Crown, Check } from 'lucide-react'

export function SubscriptionPanel() {
  const plans = [
    {
      name: 'Basic',
      price: '$9.99',
      features: [
        '100,000 tokens per month',
        'Up to 3 voice clones',
        'Standard support',
        'Basic analytics'
      ],
      current: false
    },
    {
      name: 'Pro',
      price: '$29.99',
      features: [
        '500,000 tokens per month',
        'Up to 10 voice clones',
        'Priority support',
        'Advanced analytics',
        'Custom voice settings'
      ],
      current: true
    },
    {
      name: 'Enterprise',
      price: '$99.99',
      features: [
        'Unlimited tokens',
        'Unlimited voice clones',
        '24/7 dedicated support',
        'Custom integrations',
        'API access',
        'Team management'
      ],
      current: false
    }
  ]

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold mb-2">Current Subscription</h2>
        <p className="text-white/60">Manage your subscription plan and features</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`rounded-lg border ${
              plan.current
                ? 'border-primary bg-primary/10'
                : 'border-white/10 bg-white/5'
            } p-6`}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">{plan.name}</h3>
              <Crown className={`w-5 h-5 ${plan.current ? 'text-primary' : 'text-white/40'}`} />
            </div>

            <div className="mb-6">
              <span className="text-2xl font-bold">{plan.price}</span>
              <span className="text-white/60">/month</span>
            </div>

            <ul className="space-y-3">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-center gap-2 text-sm">
                  <Check className="w-4 h-4 text-primary" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <button
              className={`mt-6 w-full py-2 px-4 rounded-lg transition-colors ${
                plan.current
                  ? 'bg-white/10 text-white cursor-default'
                  : 'bg-primary hover:bg-primary/80'
              }`}
            >
              {plan.current ? 'Current Plan' : 'Upgrade'}
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}