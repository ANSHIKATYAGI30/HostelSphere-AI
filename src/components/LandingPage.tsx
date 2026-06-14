import React from 'react';
import { 
  Shield, 
  Sparkles, 
  Users, 
  FileText, 
  MessageSquare, 
  Bell, 
  Calendar, 
  HeartHandshake, 
  TrendingUp, 
  QrCode, 
  ArrowRight,
  Tv
} from 'lucide-react';
import { motion } from 'motion/react';

interface LandingPageProps {
  onSelectPortal: (portal: 'student' | 'parent' | 'warden' | 'security' | 'admin') => void;
  onNavigateToAI: () => void;
  onNavigateToNoticeBoard: () => void;
}

export default function LandingPage({ onSelectPortal, onNavigateToAI, onNavigateToNoticeBoard }: LandingPageProps) {
  // Stagger variants for motion
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: 'easeOut' } }
  };

  const stats = [
    { label: 'Colleges Adopted', value: '42+', icon: Users, color: 'text-brand-primary' },
    { label: 'AI Insights Logged Daily', value: '1,200+', icon: Sparkles, color: 'text-brand-accent' },
    { label: 'Time Saved in Leave Approval', value: '88%', icon: TrendingUp, color: 'text-brand-success' },
    { label: 'Complaint Resolution Time', value: '< 4 Hrs', icon: Shield, color: 'text-brand-primary' }
  ];

  const features = [
    {
      title: 'Smart Room Allocation',
      description: 'AI balances branches, habits, and preferences to match compatible roommates.',
      icon: Users
    },
    {
      title: 'Leave Approvals in seconds',
      description: 'Integrated automated Warden triggers and parent notification consent trackers.',
      icon: Calendar
    },
    {
      title: 'QR Security Check-in',
      description: 'Instant verification of entries and exits in front of guards with strict expired guards pass logs.',
      icon: QrCode
    },
    {
      title: 'Instant Sentiment Analysis',
      description: 'Classifies urgent complaints based on tone, automatically alerting maintenance teams.',
      icon: MessageSquare
    },
    {
      title: 'Dynamic Notice Bulletin',
      description: 'Push digital announcements, general schedules, and AI resource waste notifications instantly.',
      icon: Bell
    },
    {
      title: 'Predictive Electricity Tracking',
      description: 'Identify air-conditioned running hour anomalies and water leak hazards proactively.',
      icon: TrendingUp
    }
  ];

  return (
    <div className="bg-brand-bg md:py-8 dark:bg-zinc-950 font-sans min-h-screen">
      {/* Hero Section */}
      <div className="relative overflow-hidden px-4 pt-16 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-primary text-sm font-medium mb-6 dark:bg-brand-primary/20 dark:text-red-400"
          >
            <Sparkles className="w-4 h-4" />
            <span>Next-Gen Campus Living is Here</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-4xl sm:text-6xl font-extrabold text-brand-charcoal dark:text-zinc-50 tracking-tight leading-none mb-6"
          >
            Smart Hostel Management <br />
            <span className="text-brand-primary italic">Powered by AI</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-2xl mx-auto text-lg sm:text-xl text-brand-slate dark:text-zinc-400 leading-relaxed mb-10"
          >
            Empower colleges with a state-of-the-art interactive platform. Streamline automated room allocation, parent out-of-bed consents, guard logs, and predictive utility charts.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
          >
            <a
              href="#explore-portals"
              className="px-8 py-4 bg-brand-primary hover:bg-opacity-90 text-white font-medium rounded-xl transition duration-300 transform hover:-translate-y-0.5 shadow-lg flex items-center gap-2 cursor-pointer"
            >
              Start Exploring Portals
              <ArrowRight className="w-5 h-5 animate-pulse" />
            </a>
            <button
              onClick={onNavigateToAI}
              className="px-8 py-4 bg-white hover:bg-zinc-50 dark:bg-zinc-900 dark:hover:bg-zinc-800 text-brand-charcoal dark:text-zinc-200 font-medium rounded-xl border border-zinc-200 dark:border-zinc-800 transition duration-300 transform hover:-translate-y-0.5 flex items-center gap-2 cursor-pointer"
            >
              Test AI Sandbox
              <Sparkles className="w-4 h-4 text-brand-accent animate-spin" />
            </button>
          </motion.div>
        </div>

        {/* Diagonal Wave Graphic background */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none opacity-30 dark:opacity-10">
          <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-brand-primary rounded-full filter blur-[120px]" />
          <div className="absolute top-1/3 right-1/4 w-[350px] h-[350px] bg-brand-accent rounded-full filter blur-[100px]" />
          <div className="absolute bottom-10 left-1/3 w-[300px] h-[300px] bg-brand-success rounded-full filter blur-[90px]" />
        </div>
      </div>

      {/* Statistics Section */}
      <section className="py-12 bg-white/50 dark:bg-zinc-900/50 border-y border-zinc-200 dark:border-zinc-800 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, idx) => (
              <div key={idx} className="bg-white dark:bg-zinc-900 text-center p-5 rounded-2xl shadow-sm border border-zinc-150 dark:border-zinc-800 relative overflow-hidden flex flex-col items-center">
                <div className="inline-flex p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800 mb-3">
                  <stat.icon className={`w-5 h-5 ${stat.color}`} />
                </div>
                <div className="text-3xl font-bold text-brand-charcoal dark:text-zinc-50 font-display">
                  {stat.value}
                </div>
                <div className="text-xs font-semibold text-brand-slate dark:text-zinc-400 mt-1">
                  {stat.label}
                </div>
                {/* Sleek bottom indicator bar style */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-zinc-100 dark:bg-zinc-800">
                  <div 
                    className={`h-full ${
                      stat.color.includes('success') 
                        ? 'bg-brand-success' 
                        : stat.color.includes('accent') 
                        ? 'bg-brand-accent' 
                        : 'bg-brand-primary'
                    }`} 
                    style={{ width: idx === 0 ? '42%' : idx === 1 ? '75%' : idx === 2 ? '88%' : '65%' }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portals Explorer Sandbox section */}
      <section id="explore-portals" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-brand-charcoal dark:text-zinc-50 mb-4">
              Access Five Interactive Mock Portals
            </h2>
            <p className="text-brand-slate dark:text-zinc-400">
              HostelSphere AI connects every stakeholder. Choose any persona card below to open its specific real-time portal prototype instantly.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {/* Student Card */}
            <div 
              id="student-id"
              onClick={() => onSelectPortal('student')}
              className="bg-white dark:bg-zinc-900 text-left p-6 rounded-2xl cursor-pointer glass-card-hover group border border-zinc-150 dark:border-zinc-800 p-5 rounded-2xl shadow-sm relative overflow-hidden"
            >
              <div className="p-3 bg-red-50 dark:bg-red-950/40 rounded-xl mb-4 text-brand-primary w-fit">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="font-display font-semibold text-lg text-brand-charcoal dark:text-zinc-100 group-hover:text-brand-primary transition">
                Student Portal
              </h3>
              <p className="text-xs text-brand-slate dark:text-zinc-400 mt-2">
                Apply for leaves, raise smart complaints, track fees, and display your security QR pass.
              </p>
              <div className="text-xs text-brand-primary font-medium mt-6 inline-flex items-center gap-1 group-hover:translate-x-1 duration-300">
                Launch Portal <ArrowRight className="w-3.5 h-3.5" />
              </div>
              <div className="absolute bottom-0 left-0 w-full h-1 bg-brand-primary/10">
                <div className="h-full bg-brand-primary w-[35%] group-hover:w-[100%] transition-all duration-500"></div>
              </div>
            </div>

            {/* Parent Card */}
            <div 
              id="parent-id"
              onClick={() => onSelectPortal('parent')}
              className="bg-white dark:bg-zinc-900 text-left p-6 rounded-2xl cursor-pointer glass-card-hover group border border-zinc-150 dark:border-zinc-800 p-5 rounded-2xl shadow-sm relative overflow-hidden"
            >
              <div className="p-3 bg-amber-50 dark:bg-amber-950/40 rounded-xl mb-4 text-brand-accent w-fit">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <h3 className="font-display font-semibold text-lg text-brand-charcoal dark:text-zinc-100 group-hover:text-brand-accent transition">
                Parent Portal
              </h3>
              <p className="text-xs text-brand-slate dark:text-zinc-400 mt-2">
                Consent to overnight leaves, verify fee statements, and inspect student in/out hostel status.
              </p>
              <div className="text-xs text-brand-accent font-medium mt-6 inline-flex items-center gap-1 group-hover:translate-x-1 duration-300">
                Launch Portal <ArrowRight className="w-3.5 h-3.5" />
              </div>
              <div className="absolute bottom-0 left-0 w-full h-1 bg-brand-accent/10">
                <div className="h-full bg-brand-accent w-[60%] group-hover:w-[100%] transition-all duration-500"></div>
              </div>
            </div>

            {/* Warden Card */}
            <div 
              id="warden-id"
              onClick={() => onSelectPortal('warden')}
              className="bg-white dark:bg-zinc-900 text-left p-6 rounded-2xl cursor-pointer glass-card-hover group border border-zinc-150 dark:border-zinc-800 p-5 rounded-2xl shadow-sm relative overflow-hidden"
            >
              <div className="p-3 bg-rose-50 dark:bg-rose-950/40 rounded-xl mb-4 text-brand-primary w-fit">
                <FileText className="w-6 h-6" />
              </div>
              <h3 className="font-display font-semibold text-lg text-brand-charcoal dark:text-zinc-100 group-hover:text-brand-primary transition">
                Warden Portal
              </h3>
              <p className="text-xs text-brand-slate dark:text-zinc-400 mt-2">
                Allocate rooms, approve pending leaves, resolve complaints, and monitor active SOS alerts.
              </p>
              <div className="text-xs text-brand-primary font-medium mt-6 inline-flex items-center gap-1 group-hover:translate-x-1 duration-300">
                Launch Portal <ArrowRight className="w-3.5 h-3.5" />
              </div>
              <div className="absolute bottom-0 left-0 w-full h-1 bg-brand-primary/10">
                <div className="h-full bg-brand-primary w-[80%] group-hover:w-[100%] transition-all duration-500"></div>
              </div>
            </div>

            {/* Security Card */}
            <div 
              id="security-id"
              onClick={() => onSelectPortal('security')}
              className="bg-white dark:bg-zinc-900 text-left p-6 rounded-2xl cursor-pointer glass-card-hover group border border-zinc-150 dark:border-zinc-800 p-5 rounded-2xl shadow-sm relative overflow-hidden"
            >
              <div className="p-3 bg-lime-50 dark:bg-lime-950/40 rounded-xl mb-4 text-brand-success w-fit">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="font-display font-semibold text-lg text-brand-charcoal dark:text-zinc-100 group-hover:text-brand-success transition">
                Security Portal
              </h3>
              <p className="text-xs text-brand-slate dark:text-zinc-400 mt-2">
                Log external visitors, audit active scan gate archives, and verify digital student passes.
              </p>
              <div className="text-xs text-brand-success font-medium mt-6 inline-flex items-center gap-1 group-hover:translate-x-1 duration-300">
                Launch Portal <ArrowRight className="w-3.5 h-3.5" />
              </div>
              <div className="absolute bottom-0 left-0 w-full h-1 bg-brand-success/10">
                <div className="h-full bg-brand-success w-[50%] group-hover:w-[100%] transition-all duration-500"></div>
              </div>
            </div>

            {/* Admin Card */}
            <div 
              id="admin-id"
              onClick={() => onSelectPortal('admin')}
              className="bg-white dark:bg-zinc-900 text-left p-6 rounded-2xl cursor-pointer glass-card-hover group border border-zinc-150 dark:border-zinc-800 p-5 rounded-2xl shadow-sm relative overflow-hidden"
            >
              <div className="p-3 bg-zinc-100 dark:bg-zinc-850 rounded-xl mb-4 text-zinc-900 dark:text-zinc-50 w-fit">
                <Tv className="w-6 h-6" />
              </div>
              <h3 className="font-display font-semibold text-lg text-brand-charcoal dark:text-zinc-100 group-hover:text-zinc-500 transition">
                Admin Portal
              </h3>
              <p className="text-xs text-brand-slate dark:text-zinc-400 mt-2">
                Complete student records management, fee configurations, and real-time forecast visual charts.
              </p>
              <div className="text-xs text-brand-slate dark:text-zinc-400 font-medium mt-6 inline-flex items-center gap-1 group-hover:translate-x-1 duration-300">
                Launch Portal <ArrowRight className="w-3.5 h-3.5" />
              </div>
              <div className="absolute bottom-0 left-0 w-full h-1 bg-zinc-200 dark:bg-zinc-700">
                <div className="h-full bg-zinc-500 w-[90%] group-hover:w-[100%] transition-all duration-500"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Key Capabilities Section */}
      <section className="py-20 bg-zinc-900 text-white rounded-3xl mx-4 sm:mx-8 px-6 sm:px-12 relative overflow-hidden">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-brand-primary opacity-20 filter blur-[120px]" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-brand-accent opacity-25 filter blur-[120px]" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <div className="lg:w-1/2">
              <span className="text-brand-accent font-semibold tracking-wider uppercase text-sm font-display">Deep AI Capabilities</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-display mt-2 mb-6">
                Redefining college accommodation with pure intelligence.
              </h2>
              <p className="text-zinc-300 mb-8 leading-relaxed">
                Our platform embeds natural language insights directly into everyday operations. Understand what your residents feel and predict resource consumption effortlessly.
              </p>

              <div className="space-y-4">
                {[
                  'Automated sentiment checking tags high priority plumbing or electrical leaks.',
                  'Electricity anomaly sensor tracking flags room air conditioner abuses.',
                  'AI advisor chatbot processes messy complaints and provides prompt college policies.'
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-3 text-sm items-start">
                    <div className="p-1 rounded-full bg-brand-primary/20 text-brand-primary mt-0.5">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <span className="text-zinc-300">{item}</span>
                  </div>
                ))}
              </div>

              <div className="mt-10">
                <button
                  onClick={onNavigateToAI}
                  className="px-6 py-3 bg-brand-primary hover:bg-opacity-90 rounded-xl text-white text-sm font-medium transition inline-flex items-center gap-2 cursor-pointer"
                >
                  Configure AI Showcase Now
                </button>
              </div>
            </div>

            <div className="lg:w-1/2 w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-6 bg-zinc-800/80 border border-zinc-700/50 rounded-2xl text-left">
                <MessageSquare className="w-8 h-8 text-brand-primary mb-3" />
                <h3 className="font-display font-bold text-lg mb-1">Sentiment Engine</h3>
                <p className="text-xs text-zinc-400">
                  Analyze and auto-classify complaints into Critical, High, or Low urgency based on urgency metrics.
                </p>
              </div>
              <div className="p-6 bg-zinc-800/80 border border-zinc-700/50 rounded-2xl text-left">
                <TrendingUp className="w-8 h-8 text-brand-success mb-3" />
                <h3 className="font-display font-bold text-lg mb-1">Occupancy Forecast</h3>
                <p className="text-xs text-zinc-400">
                  Predict incoming freshman occupancy demands to draft early building expansions safely.
                </p>
              </div>
              <div className="p-6 bg-zinc-800/80 border border-zinc-700/50 rounded-2xl text-left">
                <Calendar className="w-8 h-8 text-brand-accent mb-3" />
                <h3 className="font-display font-bold text-lg mb-1">Mess Optimization</h3>
                <p className="text-xs text-zinc-400">
                  Cut Sunday plate waste by over 30% utilizing precise student RSVP sliders.
                </p>
              </div>
              <div className="p-6 bg-zinc-800/80 border border-zinc-700/50 rounded-2xl text-left">
                <Shield className="w-8 h-8 text-brand-primary mb-3" />
                <h3 className="font-display font-bold text-lg mb-1">Smart Gate Verification</h3>
                <p className="text-xs text-zinc-400">
                  Secure boundaries with unique temporary expiring QR gate tokens of residents.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Grids Detailed Overview */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-display text-3xl font-bold text-brand-charcoal dark:text-zinc-50 mb-3">
              Comprehensive Platform Features
            </h2>
            <p className="text-brand-slate dark:text-zinc-400 text-sm">
              Discover how HostelSphere AI coordinates daily routines for continuous college peace of mind.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feat, idx) => (
              <div key={idx} className="p-6 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl text-left shadow-sm">
                <div className="p-3 bg-rose-50 dark:bg-brand-primary/10 rounded-xl text-brand-primary w-fit mb-4">
                  <feat.icon className="w-5 h-5" />
                </div>
                <h3 className="font-display font-semibold text-lg text-brand-charcoal dark:text-zinc-100 mb-1">
                  {feat.title}
                </h3>
                <p className="text-xs text-brand-slate dark:text-zinc-400">
                  {feat.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white/40 dark:bg-zinc-900/40 border-t border-zinc-200 dark:border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="font-display text-2xl font-bold text-brand-charcoal dark:text-zinc-100 mb-12">
            What Dean Admins are Saying
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="p-6 bg-amber-50/20 dark:bg-zinc-950 border border-brand-accent/20 rounded-2xl text-left">
              <p className="text-sm italic text-brand-charcoal dark:text-zinc-300">
                "Our previous system was a mess of carbon papers and WhatsApp groups. HostelSphere AI consolidated Warden approvals and parent consents onto one reliable screen. The AI complaint categorization works magic!"
              </p>
              <div className="mt-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-brand-primary flex items-center justify-center text-white font-bold text-xs">
                  DR
                </div>
                <div>
                  <h4 className="text-xs font-bold text-brand-charcoal dark:text-zinc-50">Dr. Rajesh Deshmukh</h4>
                  <p className="text-[10px] text-brand-slate">Chief Admin, IIT Imperial campus</p>
                </div>
              </div>
            </div>
            <div className="p-6 bg-rose-50/20 dark:bg-zinc-950 border border-brand-primary/20 rounded-2xl text-left">
              <p className="text-sm italic text-brand-charcoal dark:text-zinc-300">
                "Wasted food was a continuous drain on college mess finances. With Sunday plate waste forecasts and the client-side opt-out slider, our daily raw purchase cost plummeted by 22% while keeping students happy."
              </p>
              <div className="mt-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-brand-success flex items-center justify-center text-white font-bold text-xs">
                  SK
                </div>
                <div>
                  <h4 className="text-xs font-bold text-brand-charcoal dark:text-zinc-50">Mrs. Shanti Kulkarni</h4>
                  <p className="text-[10px] text-brand-slate">Mess Advisor Warden, Gargi Block Hostels</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact & Footer Section */}
      <footer className="py-12 bg-zinc-900 border-t border-zinc-800 text-zinc-400 text-xs">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 text-left">
            <div>
              <h3 className="text-white font-bold font-display text-sm mb-3">HostelSphere AI</h3>
              <p className="text-zinc-400">
                Crafting robust cloud architectures for smart residential academics. Built with modern React and telemetry components.
              </p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-3">Stakeholders</h4>
              <ul className="space-y-2">
                <li><button onClick={() => onSelectPortal('student')} className="hover:text-white cursor-pointer transition">Student Panel</button></li>
                <li><button onClick={() => onSelectPortal('parent')} className="hover:text-white cursor-pointer transition">Parent Panel</button></li>
                <li><button onClick={() => onSelectPortal('warden')} className="hover:text-white cursor-pointer transition">Warden Panel</button></li>
                <li><button onClick={() => onSelectPortal('security')} className="hover:text-white cursor-pointer transition">Security Logs</button></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-3">Need a Presentation?</h4>
              <p className="mb-4">
                This is a Round 1 high-fidelity interactive preview. Use the active sandbox simulation to present it for academic deans.
              </p>
              <button 
                onClick={onNavigateToNoticeBoard}
                className="px-4 py-2 bg-brand-primary text-white rounded-lg hover:bg-opacity-95 text-[11px]"
              >
                Launch Digital Notice Board
              </button>
            </div>
          </div>
          <div className="pt-8 border-t border-zinc-800 text-center flex flex-col md:flex-row justify-between items-center gap-4">
            <p>© 2026 HostelSphere AI. Operating in full compliance with university security standards.</p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-white">Security Policy</a>
              <a href="#" className="hover:text-white">GDPR Compliance</a>
              <a href="#" className="hover:text-white">Contact Warden Office</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
