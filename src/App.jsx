import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Dumbbell, Flame, Calendar, PhoneCall, ChevronRight, Clock, Star, Users, Check } from 'lucide-react'

const API_BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

function useGymData() {
  const [trainers, setTrainers] = useState([])
  const [classes, setClasses] = useState([])
  const [plans, setPlans] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      try {
        // ensure sample data
        await fetch(`${API_BASE}/api/bootstrap`, { method: 'POST' })
        const [t, c, p] = await Promise.all([
          fetch(`${API_BASE}/api/trainers`).then(r => r.json()),
          fetch(`${API_BASE}/api/classes`).then(r => r.json()),
          fetch(`${API_BASE}/api/plans`).then(r => r.json()),
        ])
        setTrainers(t)
        setClasses(c)
        setPlans(p)
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  return { trainers, classes, plans, loading }
}

function Header() {
  return (
    <header className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-black to-zinc-900" />
      <div className="absolute -right-24 -top-24 w-[36rem] h-[36rem] bg-gradient-to-br from-amber-500/20 to-red-600/20 rounded-full blur-3xl" />
      <div className="absolute -left-24 -bottom-24 w-[36rem] h-[36rem] bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 rounded-full blur-3xl" />

      <div className="relative max-w-6xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-10 items-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="inline-flex items-center gap-2 text-amber-400 mb-4">
            <Flame className="w-5 h-5" />
            <span className="uppercase tracking-widest text-xs">Professional Gym</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white leading-tight">
            Build Strength. Move Better. Perform More.
          </h1>
          <p className="text-zinc-300 mt-4 text-lg">
            Elite coaching, data-driven classes, and memberships that fit your goals.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a href="#classes" className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-black font-semibold px-5 py-3 rounded-lg transition">
              Explore Classes <ChevronRight className="w-4 h-4" />
            </a>
            <a href="#plans" className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-5 py-3 rounded-lg transition">
              View Plans <ChevronRight className="w-4 h-4" />
            </a>
          </div>
          <div className="mt-10 flex items-center gap-6 text-zinc-300">
            <div className="flex items-center gap-2"><Dumbbell className="w-5 h-5 text-amber-400" /><span>Strength</span></div>
            <div className="flex items-center gap-2"><Clock className="w-5 h-5 text-amber-400" /><span>Conditioning</span></div>
            <div className="flex items-center gap-2"><Users className="w-5 h-5 text-amber-400" /><span>Community</span></div>
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, scale: .95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: .1 }} className="">
          <div className="relative bg-gradient-to-br from-zinc-800 to-zinc-900 border border-white/10 rounded-2xl p-6 shadow-2xl">
            <div className="absolute -top-6 -right-6 bg-amber-500 text-black px-4 py-2 rounded-lg font-bold shadow-lg">PRO</div>
            <div className="grid grid-cols-3 gap-4">
              {["HIIT", "Strength", "Mobility", "Cardio", "Core", "Power"].map((t,i)=> (
                <div key={i} className="aspect-video rounded-xl bg-zinc-800/60 border border-white/5 flex items-center justify-center text-zinc-300 text-sm">
                  {t}
                </div>
              ))}
            </div>
            <div className="mt-6 flex items-center gap-3 text-zinc-300">
              <Star className="w-5 h-5 text-amber-400" />
              <p className="text-sm">Rated 4.9/5 by over 2,000 members</p>
            </div>
          </div>
        </motion.div>
      </div>
    </header>
  )
}

function Classes({ classes }) {
  return (
    <section id="classes" className="max-w-6xl mx-auto px-6 py-20">
      <div className="flex items-end justify-between mb-8">
        <h2 className="text-3xl md:text-4xl font-black text-white">Signature Classes</h2>
        <div className="text-zinc-400">Train smart. Progress weekly.</div>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {classes.map((c) => (
          <motion.div key={c._id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="rounded-2xl bg-gradient-to-br from-zinc-800 to-zinc-900 p-6 border border-white/10">
            <div className="flex items-center justify-between">
              <div className="font-bold text-white text-lg">{c.title}</div>
              <div className="text-xs px-2 py-1 rounded bg-amber-500/20 text-amber-300 border border-amber-400/30">{c.difficulty}</div>
            </div>
            <p className="text-zinc-300 mt-3 text-sm min-h-[48px]">{c.description}</p>
            <div className="mt-4 flex items-center justify-between text-zinc-400 text-sm">
              <div className="flex items-center gap-2"><Clock className="w-4 h-4 text-amber-400" />{c.duration_minutes}m</div>
              <div className="flex items-center gap-2"><Calendar className="w-4 h-4 text-amber-400" />{(c.schedule||[]).slice(0,2).join(' · ')}</div>
            </div>
            <a href="#lead" className="mt-6 inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 font-semibold">Book a Trial <ChevronRight className="w-4 h-4" /></a>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

function Trainers({ trainers }) {
  return (
    <section className="max-w-6xl mx-auto px-6 py-20">
      <h2 className="text-3xl md:text-4xl font-black text-white mb-8">Coaches</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {trainers.map((t) => (
          <motion.div key={t._id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="rounded-2xl bg-gradient-to-br from-zinc-800 to-zinc-900 p-6 border border-white/10">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl bg-zinc-700 flex items-center justify-center text-2xl font-black text-amber-400">
                {t.name?.split(' ').map(s=>s[0]).join('')}
              </div>
              <div>
                <div className="text-white font-bold">{t.name}</div>
                <div className="text-amber-300 text-sm">{t.specialty}</div>
              </div>
            </div>
            <p className="text-zinc-300 mt-4 text-sm min-h-[56px]">{t.bio}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

function Plans({ plans }) {
  return (
    <section id="plans" className="max-w-6xl mx-auto px-6 py-20">
      <h2 className="text-3xl md:text-4xl font-black text-white mb-8">Memberships</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {plans.map((p) => (
          <div key={p._id} className={`rounded-2xl p-6 border transition ${p.best_value ? 'bg-amber-500 text-black border-amber-400' : 'bg-gradient-to-br from-zinc-800 to-zinc-900 text-white border-white/10'}`}>
            <div className="flex items-center justify-between">
              <div className="text-xl font-bold">{p.name}</div>
              {p.best_value && <span className="text-xs font-bold bg-black/10 px-2 py-1 rounded">BEST</span>}
            </div>
            <div className="mt-2 text-4xl font-black">${p.price_monthly}<span className="text-base font-semibold">/mo</span></div>
            <ul className="mt-4 space-y-2">
              {(p.features||[]).map((f,i)=> (
                <li key={i} className="flex items-center gap-2"><Check className={`w-4 h-4 ${p.best_value ? 'text-black' : 'text-amber-400'}`} />{f}</li>
              ))}
            </ul>
            <a href="#lead" className={`mt-6 inline-flex items-center gap-2 font-semibold ${p.best_value ? 'text-black' : 'text-amber-400 hover:text-amber-300'}`}>Join Now <ChevronRight className="w-4 h-4" /></a>
          </div>
        ))}
      </div>
    </section>
  )
}

function LeadForm() {
  const [submitting, setSubmitting] = useState(false)
  const [ok, setOk] = useState(false)

  const onSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    setOk(false)
    const formData = new FormData(e.currentTarget)
    const payload = Object.fromEntries(formData.entries())
    try {
      await fetch(`${API_BASE}/api/leads`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
      setOk(true)
      e.currentTarget.reset()
    } catch (e) {
      console.error(e)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section id="lead" className="max-w-6xl mx-auto px-6 py-20">
      <div className="grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h2 className="text-3xl md:text-4xl font-black text-white">Start your trial</h2>
          <p className="text-zinc-300 mt-2">Tell us your goal. We’ll match you with a coach and program.</p>
          {ok && <div className="mt-4 text-emerald-400">We got your request. A coach will reach out soon.</div>}
        </div>
        <form onSubmit={onSubmit} className="bg-gradient-to-br from-zinc-800 to-zinc-900 p-6 rounded-2xl border border-white/10">
          <div className="grid grid-cols-2 gap-4">
            <input name="name" required placeholder="Full name" className="col-span-2 md:col-span-1 bg-zinc-800 border border-white/10 rounded-lg px-3 py-2 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-amber-500" />
            <input name="email" required type="email" placeholder="Email" className="col-span-2 md:col-span-1 bg-zinc-800 border border-white/10 rounded-lg px-3 py-2 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-amber-500" />
            <input name="phone" placeholder="Phone (optional)" className="col-span-2 bg-zinc-800 border border-white/10 rounded-lg px-3 py-2 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-amber-500" />
            <select name="interest" className="col-span-2 bg-zinc-800 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-amber-500">
              <option value="Weight Loss">Weight Loss</option>
              <option value="Strength">Strength</option>
              <option value="Athletic Performance">Athletic Performance</option>
            </select>
            <textarea name="message" placeholder="Tell us more…" rows={3} className="col-span-2 bg-zinc-800 border border-white/10 rounded-lg px-3 py-2 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-amber-500" />
          </div>
          <button disabled={submitting} className="mt-4 inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 disabled:opacity-60 text-black font-semibold px-5 py-3 rounded-lg transition"><PhoneCall className="w-4 h-4" />
            {submitting ? 'Sending…' : 'Request Call'}</button>
        </form>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="border-t border-white/10">
      <div className="max-w-6xl mx-auto px-6 py-10 text-sm text-zinc-400 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-white"><Dumbbell className="w-5 h-5 text-amber-400" /> Gym Pro</div>
        <div>© {new Date().getFullYear()} Gym Pro. All rights reserved.</div>
      </div>
    </footer>
  )
}

export default function App() {
  const { trainers, classes, plans, loading } = useGymData()

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />

      {loading ? (
        <div className="max-w-6xl mx-auto px-6 py-20 text-zinc-400">Loading…</div>
      ) : (
        <>
          <Classes classes={classes} />
          <Trainers trainers={trainers} />
          <Plans plans={plans} />
          <LeadForm />
        </>
      )}

      <Footer />
    </div>
  )
}
