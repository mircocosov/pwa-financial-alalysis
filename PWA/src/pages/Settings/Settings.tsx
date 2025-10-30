const preferences = [
  {
    id: 'notifications',
    title: 'Notifications',
    description: 'Control email, Slack, and in-app alerts for key financial events.',
    options: [
      { id: 'close', label: 'Monthly close status', enabled: true },
      { id: 'variance', label: 'Variance thresholds exceeded', enabled: true },
      { id: 'cash', label: 'Cash runway milestones', enabled: false },
    ],
  },
  {
    id: 'permissions',
    title: 'Workspace roles',
    description: 'Review access to dashboards, exports, and sensitive data.',
    options: [
      { id: 'finance', label: 'Finance (full access)', enabled: true },
      { id: 'ops', label: 'Operations (restricted exports)', enabled: true },
      { id: 'product', label: 'Product (read-only)', enabled: true },
    ],
  },
]

const integrations = [
  'Oracle NetSuite',
  'Microsoft Dynamics 365',
  'Snowflake',
  'BigQuery',
  'PowerBI Sync',
  'Slack Alerts',
]

export default function Settings() {
  return (
    <div className="space-y-10">
      <section className="relative overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.02] p-8 shadow-[0_45px_160px_rgba(4,6,13,0.5)]">
        <span className="pointer-events-none absolute inset-x-0 top-0 h-36 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.12),_transparent_70%)] opacity-80" />
        <header className="relative flex flex-wrap items-end justify-between gap-4">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] uppercase tracking-[0.35em] text-white/50">
              Settings
              <span className="ml-1 h-1.5 w-1.5 rounded-full bg-sky-400 shadow-[0_0_8px_rgba(56,189,248,0.6)]" />
            </div>
            <h2 className="text-3xl font-semibold text-white">Workspace preferences</h2>
            <p className="max-w-2xl text-sm text-white/60">
              Configure notifications, roles, and integrations. Changes sync instantly across the
              command centre.
            </p>
          </div>
          <button
            type="button"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-white/15 px-4 text-sm text-white/75 transition hover:border-yellow-200/45 hover:text-white"
          >
            Save changes
          </button>
        </header>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        {preferences.map((group) => (
          <article
            key={group.id}
            className="relative overflow-hidden rounded-[28px] border border-white/10 bg-white/10 p-6 shadow-[0_30px_110px_rgba(4,6,13,0.45)] transition duration-300 hover:-translate-y-1 hover:border-yellow-200/35 hover:bg-yellow-200/10"
          >
            <span className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.14),_transparent_65%)] opacity-70" />
            <div className="relative">
              <h3 className="text-lg font-semibold text-white">{group.title}</h3>
              <p className="mt-2 text-sm text-white/65">{group.description}</p>

              <ul className="mt-5 space-y-3 text-sm text-white/80">
                {group.options.map((option) => (
                  <li
                    key={option.id}
                    className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/10 px-4 py-3"
                  >
                    <span>{option.label}</span>
                    <Toggle enabled={option.enabled} />
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </section>

      <section className="rounded-[32px] border border-white/10 bg-white/10 p-6 shadow-[0_30px_100px_rgba(4,6,13,0.4)]">
        <h3 className="text-lg font-semibold text-white">Integrations</h3>
        <p className="mt-2 text-sm text-white/65">
          Connect bank feeds, ERP systems, and data warehouses to automate ingest pipelines.
        </p>

        <div className="mt-5 grid gap-4 sm:grid-cols-3 text-sm text-white/75">
          {integrations.map((integration) => (
            <div
              key={integration}
              className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3 transition hover:border-yellow-200/40 hover:bg-yellow-200/10"
            >
              {integration}
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

function Toggle({ enabled }: { enabled: boolean }) {
  return (
    <span
      className={`inline-flex h-8 w-16 items-center rounded-full border transition ${
        enabled
          ? 'justify-end border-emerald-300/50 bg-emerald-300/20'
          : 'justify-start border-white/15 bg-white/10'
      }`}
    >
      <span
        className={`mx-1 h-6 w-6 rounded-full bg-white shadow-[0_8px_20px_rgba(255,255,255,0.2)] transition ${
          enabled ? 'translate-x-1.5' : ''
        }`}
      />
    </span>
  )
}
