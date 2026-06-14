import React, { useState } from 'react';
import { 
  TrendingUp, 
  AlertTriangle, 
  CreditCard, 
  Users, 
  Zap, 
  Sparkles, 
  Download, 
  HelpCircle,
  Clock
} from 'lucide-react';

interface AnalyticsDashboardProps {
  onAddNotice: (msg: string, type: 'info' | 'success') => void;
}

export default function AnalyticsDashboard({ onAddNotice }: AnalyticsDashboardProps) {
  const [activeMetric, setActiveMetric] = useState<'occupancy' | 'complaints' | 'financials' | 'utilities'>('occupancy');

  // SVG Chart Dimension parameters
  const chartHeight = 160;
  const chartWidth = 560;

  // Mock data calculations
  const totalBilledFees = 2840000;
  const collectedAmount = 2150000;
  const pendingCollection = 690000;

  return (
    <div className="space-y-8 font-sans text-left">
      {/* Title block */}
      <div className="pb-4 border-b border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="font-display text-2xl font-extrabold text-brand-charcoal dark:text-zinc-50 flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-brand-primary" />
            HostelSphere Metrics & Forecasts
          </h1>
          <p className="text-sm text-brand-slate dark:text-zinc-400">
            Real-time analytics and future resource demand forecasts
          </p>
        </div>
        <button 
          onClick={() => onAddNotice('Downloaded PDF Analytics executive report!', 'success')}
          className="px-4 py-2 bg-brand-primary hover:bg-opacity-95 text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 cursor-pointer"
        >
          <Download className="w-4 h-4" /> Export Executive PDF
        </button>
      </div>

      {/* Grid of highlights cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div 
          onClick={() => setActiveMetric('occupancy')}
          className={`p-5 rounded-2xl border cursor-pointer transition relative overflow-hidden shadow-sm ${
            activeMetric === 'occupancy' 
              ? 'bg-orange-50/10 border-brand-accent dark:bg-zinc-950' 
              : 'bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-805 hover:bg-zinc-50'
          }`}
        >
          <div className="flex justify-between items-start text-xs">
            <span className="text-brand-slate block">Occupancy Rate</span>
            <Users className="w-4 h-4 text-brand-accent" />
          </div>
          <div className="text-3xl font-extrabold font-display text-brand-charcoal dark:text-zinc-50 mt-2">92%</div>
          <span className="text-[10px] text-brand-success font-medium mt-1 inline-block">
            ▲ +17% surge predicted in July
          </span>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-zinc-100 dark:bg-zinc-800">
            <div className="h-full bg-brand-accent" style={{ width: '92%' }}></div>
          </div>
        </div>

        <div 
          onClick={() => setActiveMetric('complaints')}
          className={`p-5 rounded-2xl border cursor-pointer transition relative overflow-hidden shadow-sm ${
            activeMetric === 'complaints' 
              ? 'bg-rose-50/10 border-brand-primary dark:bg-zinc-950' 
              : 'bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-805 hover:bg-zinc-50'
          }`}
        >
          <div className="flex justify-between items-start text-xs">
            <span className="text-brand-slate block">Avg Resolution Time</span>
            <AlertTriangle className="w-4 h-4 text-brand-primary" />
          </div>
          <div className="text-3xl font-extrabold font-display text-brand-primary mt-2">3.8 Hrs</div>
          <span className="text-[10px] text-brand-success font-medium mt-1 inline-block">
            ▼ 45% reduction from last sem
          </span>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-zinc-100 dark:bg-zinc-800">
            <div className="h-full bg-brand-primary" style={{ width: '45%' }}></div>
          </div>
        </div>

        <div 
          onClick={() => setActiveMetric('financials')}
          className={`p-5 rounded-2xl border cursor-pointer transition relative overflow-hidden shadow-sm ${
            activeMetric === 'financials' 
              ? 'bg-zinc-50/50 dark:bg-zinc-950 border-zinc-300' 
              : 'bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-805 hover:bg-zinc-50'
          }`}
        >
          <div className="flex justify-between items-start text-xs">
            <span className="text-brand-slate block">Fee Arrears Recovered</span>
            <CreditCard className="w-4 h-4 text-zinc-400" />
          </div>
          <div className="text-3xl font-extrabold font-display text-brand-charcoal dark:text-zinc-50 mt-2">75.7%</div>
          <span className="text-[10px] text-brand-slate font-medium mt-1 inline-block">
            ₹{collectedAmount.toLocaleString()} collected
          </span>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-zinc-100 dark:bg-zinc-800">
            <div className="h-full bg-brand-success" style={{ width: '75.7%' }}></div>
          </div>
        </div>

        <div 
          onClick={() => setActiveMetric('utilities')}
          className={`p-5 rounded-2xl border cursor-pointer transition relative overflow-hidden shadow-sm ${
            activeMetric === 'utilities' 
              ? 'bg-brand-primary/5 border-brand-success dark:bg-zinc-950' 
              : 'bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-805 hover:bg-zinc-50'
          }`}
        >
          <div className="flex justify-between items-start text-xs">
            <span className="text-brand-slate block">Power Consumption</span>
            <Zap className="w-4 h-4 text-brand-success animate-pulse" />
          </div>
          <div className="text-3xl font-extrabold font-display text-brand-success mt-2">1,425 kWh</div>
          <span className="text-[10px] text-brand-primary font-semibold mt-1 inline-block animate-pulse">
            ⚠️ Anomaly alert in W4 ACs
          </span>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-zinc-100 dark:bg-zinc-800">
            <div className="h-full bg-brand-success" style={{ width: '65%' }}></div>
          </div>
        </div>
      </div>

      {/* Main Charts Showcase Container */}
      <div className="p-6 bg-white dark:bg-zinc-900 border border-zinc-205 dark:border-zinc-850 rounded-3xl">
        
        {/* CHART 1: Occupancy forecast curves */}
        {activeMetric === 'occupancy' && (
          <div className="space-y-6">
            <div className="flex justify-between items-start max-w-xl">
              <div>
                <h3 className="font-display font-semibold text-lg text-brand-charcoal dark:text-zinc-100 flex items-center gap-1.5">
                  <Users className="w-5 h-5 text-brand-accent" />
                  Occupancy & New Admissions Projections
                </h3>
                <p className="text-xs text-brand-slate mt-1">
                  Solid Line represents historical stats. Dashed represents upcoming Freshman allocation models.
                </p>
              </div>
            </div>

            {/* Responsive custom vector SVG chart */}
            <div className="overflow-x-auto">
              <svg className="w-full max-w-2xl h-44 border-b border-zinc-100 dark:border-zinc-800" viewBox="0 0 600 180">
                {/* Horizontal grid lines */}
                <line x1="40" y1="30" x2="560" y2="30" stroke="#f1f1f1" strokeDasharray="3" />
                <line x1="40" y1="80" x2="560" y2="80" stroke="#f1f1f1" strokeDasharray="3" />
                <line x1="40" y1="130" x2="560" y2="130" stroke="#f1f1f1" strokeDasharray="3" />

                {/* Y-axis metrics */}
                <text x="15" y="34" className="text-[10px] fill-zinc-400 font-mono">100%</text>
                <text x="15" y="84" className="text-[10px] fill-zinc-400 font-mono">80%</text>
                <text x="15" y="134" className="text-[10px] fill-zinc-400 font-mono">60%</text>

                {/* Plot points (Jun, Jul, Aug, Sep, Oct, Nov, Dec) */}
                {/* Historical: Jun(72%), Jul(85%), Aug(96%), Sep(94%), etc. */}
                {/* AI: Jun(72%), Jul(92% limit), Aug(99% limit) */}
                
                {/* Historical Path line */}
                <path 
                  d="M 60 140 L 140 95 L 220 40 L 300 50 L 380 50 L 460 45 L 540 40" 
                  fill="none" 
                  stroke="#E03F4F" 
                  strokeWidth="3.5" 
                />
                
                {/* AI Predicted dashed vector line */}
                <path 
                  d="M 60 140 L 140 60 L 220 30 L 300 35 L 380 40 L 460 35 L 540 30" 
                  fill="none" 
                  stroke="#F8C463" 
                  strokeWidth="3" 
                  strokeDasharray="5,5" 
                />

                {/* Hot Dot points */}
                <circle cx="220" cy="30" r="5" fill="#F8C463" className="animate-ping" />
                <circle cx="220" cy="30" r="4" fill="#F8C463" />

                <circle cx="140" cy="60" r="4" fill="#F8C463" />

                {/* X Axis markings */}
                <text x="50" y="170" className="text-[11px] font-bold fill-zinc-400">Jun (Actual)</text>
                <text x="130" y="170" className="text-[11px] font-bold fill-brand-primary">Jul (AI)</text>
                <text x="210" y="170" className="text-[11px] font-bold fill-brand-accent">Aug (Peak)</text>
                <text x="290" y="170" className="text-[11px] font-bold fill-zinc-400">Sep</text>
                <text x="370" y="170" className="text-[11px] font-bold fill-zinc-400">Oct</text>
                <text x="450" y="170" className="text-[11px] font-bold fill-zinc-400">Nov</text>
                <text x="530" y="170" className="text-[11px] font-bold fill-zinc-400">Dec</text>
              </svg>
            </div>

            {/* Bullet legends */}
            <div className="flex gap-6 justify-center text-xs">
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 bg-brand-primary rounded-full inline-block" />
                Historical Standard (2025 avg)
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-1.5 border-t-2 border-dashed border-brand-accent rounded-sm inline-block" />
                AI Smart Predictive Intake Forecast (Batch 2026)
              </span>
            </div>

            <div className="p-4 bg-purple-50 dark:bg-purple-950/20 rounded-xl text-xs text-purple-700 dark:text-purple-300 flex items-center gap-2 border border-purple-150">
              <Sparkles className="w-5 h-5 flex-shrink-0 text-brand-primary animate-pulse" />
              <p>
                <strong>AI Forecasting Note:</strong> August shows a record 99% resource occupancy risk. We highly recommend notifying estate maintenance supervisors to expedite double-bunk partitions in B-Block corridors by mid-July.
              </p>
            </div>
          </div>
        )}

        {/* CHART 2: Complaint Categories frequency */}
        {activeMetric === 'complaints' && (
          <div className="space-y-6">
            <div>
              <h3 className="font-display font-semibold text-lg text-brand-charcoal dark:text-zinc-100 flex items-center gap-1.5">
                <AlertTriangle className="w-5 h-5 text-brand-primary" />
                Categorywise Complaint Volume & Sentiment Distribution
              </h3>
              <p className="text-xs text-brand-slate mt-1">
                Wi-Fi networks receive 42% of volume, followed closely by general laundry and housekeeping.
              </p>
            </div>

            {/* Custom proportion bars */}
            <div className="space-y-4 max-w-xl">
              {[
                { label: 'Wi-Fi Network / Bandwidth limits', count: 42, color: 'bg-brand-primary', width: 'w-full' },
                { label: 'Housekeeping & Mold reports', count: 31, color: 'bg-brand-primary/80', width: 'w-[74%]' },
                { label: 'Plumbing leaks / clogged corridors', count: 25, color: 'bg-brand-primary/60', width: 'w-[60%]' },
                { label: 'Mess oily food recommendations', count: 19, color: 'bg-brand-accent', width: 'w-[45%]' },
                { label: 'Electrical breakdown (Fans/ACs)', count: 14, color: 'bg-brand-accent/70', width: 'w-[33%]' }
              ].map((bar, idx) => (
                <div key={idx} className="space-y-1.5 text-xs">
                  <div className="flex justify-between font-medium">
                    <span className="text-brand-charcoal dark:text-zinc-200">{bar.label}</span>
                    <span className="font-mono text-brand-slate font-bold">{bar.count} Active Tickets</span>
                  </div>
                  <div className="w-full bg-zinc-100 dark:bg-zinc-800 h-3 rounded-full overflow-hidden">
                    <div className={`${bar.color} h-full ${bar.width} rounded-full`} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CHART 3: Fee collections circle or bar gauges */}
        {activeMetric === 'financials' && (
          <div className="space-y-6">
            <div>
              <h3 className="font-display font-semibold text-lg text-brand-charcoal dark:text-zinc-100 flex items-center gap-1.5">
                <CreditCard className="w-5 h-5 text-zinc-400" />
                Term Fee Recovery & Arrears Distribution
              </h3>
              <p className="text-xs text-brand-slate mt-1">
                Summary of the semester aggregate revenue. ₹2.15 Million collected out of ₹2.84 Million total.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Collected portion */}
              <div className="p-4 bg-zinc-50 dark:bg-zinc-950 rounded-2xl border text-center space-y-1.5">
                <span className="text-[10px] uppercase text-zinc-450 block">Amount Settled</span>
                <div className="text-2xl font-bold font-display text-brand-success">₹{collectedAmount.toLocaleString()}</div>
                <div className="w-full bg-zinc-200 dark:bg-zinc-800 h-2.5 rounded-full overflow-hidden">
                  <div className="bg-brand-success h-full w-[75%]" />
                </div>
                <span className="text-[10px] text-zinc-400 block font-mono">75.7% Collected</span>
              </div>

              {/* Outstanding portion */}
              <div className="p-4 bg-rose-50/10 dark:bg-zinc-950 rounded-2xl border border-brand-primary/10 text-center space-y-1.5">
                <span className="text-[10px] uppercase text-zinc-450 block">Outstanding Arrears</span>
                <div className="text-2xl font-bold font-display text-brand-primary">₹{pendingCollection.toLocaleString()}</div>
                <div className="w-full bg-zinc-200 dark:bg-zinc-800 h-2.5 rounded-full overflow-hidden">
                  <div className="bg-brand-primary h-full w-[24%]" />
                </div>
                <span className="text-[10px] text-zinc-400 block font-mono">24.3% Pending</span>
              </div>

              {/* Recovery speed rate */}
              <div className="p-4 bg-amber-50/10 dark:bg-zinc-950 rounded-2xl border border-brand-accent/20 text-center space-y-1 bg-yellow-50/10">
                <span className="text-[10px] uppercase text-zinc-450 block">UPI Speed Gateway Limit</span>
                <div className="text-lg font-bold font-display text-brand-charcoal dark:text-zinc-100 pt-1">Instantly Settled</div>
                <p className="text-[10px] text-brand-slate dark:text-zinc-400">
                  98% of payments occur directly through the unified student UPI pass in under 5 seconds.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* CHART 4: Utility load meter anomalies */}
        {activeMetric === 'utilities' && (
          <div className="space-y-6">
            <div>
              <h3 className="font-display font-semibold text-lg text-brand-charcoal dark:text-zinc-100 flex items-center gap-1.5">
                <Zap className="w-5 h-5 text-brand-success animate-bounce" />
                Weekly Sub-meter Load Anomaly Tracking
              </h3>
              <p className="text-xs text-brand-slate mt-1">
                Visualizing kWh weekly consumption. Week W4 recorded an unexplained humidity spike in A-Block.
              </p>
            </div>

            <div className="grid grid-cols-4 gap-4 max-w-xl text-center items-end h-40">
              {[
                { week: 'Week 1', usage: 1240, height: 'h-24', isAnomaly: false },
                { week: 'Week 2', usage: 1420, height: 'h-28', isAnomaly: false },
                { week: 'Week 3', usage: 1390, height: 'h-24', isAnomaly: false },
                { week: 'Week 4', usage: 1650, height: 'h-36', isAnomaly: true }
              ].map((bar, i) => (
                <div key={i} className="space-y-2 flex flex-col items-center">
                  <span className="text-[10px] font-mono text-zinc-400">{bar.usage} kWh</span>
                  <div className={`w-12 rounded-t-lg transition ${bar.height} ${
                    bar.isAnomaly ? 'bg-brand-primary animate-pulse' : 'bg-brand-success'
                  }`} />
                  <span className={`text-[11px] font-bold ${bar.isAnomaly ? 'text-brand-primary' : 'text-zinc-450'}`}>{bar.week}</span>
                </div>
              ))}
            </div>

            <div className="p-4 bg-rose-50/20 dark:bg-zinc-950 border border-brand-primary/20 rounded-xl text-xs flex gap-3 text-brand-primary">
              <AlertTriangle className="w-5 h-5 flex-shrink-0 animate-bounce" />
              <div>
                <strong>Active Anomaly Alert:</strong> Week 4 consumption exceeds historical thresholds by 18.7%. Sub-circuit profiling indicates G-block study hall air conditioning units left operating continuously overnight. Automated scheduled smart-breaker shutoff activated.
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
