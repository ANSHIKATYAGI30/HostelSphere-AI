import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Sun, 
  Moon,
  Workflow, 
  TrendingUp, 
  Users, 
  QrCode, 
  AlertTriangle, 
  Menu, 
  X, 
  ShieldAlert, 
  ArrowLeft, 
  Tv, 
  Lightbulb,
  Bell,
  CheckCircle2,
  BookOpen
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Data and component imports
import { 
  mockStudents,
  mockRooms,
  mockLeaveRequests,
  mockComplaints,
  mockVisitors,
  mockNotices,
  mockMessMenu,
  mockFeeRohan,
  mockSOSList
} from './data/mockData';
import { 
  StudentProfile, 
  LeaveRequest, 
  Complaint, 
  Visitor, 
  NoticeItem, 
  MessDayMenu, 
  FeeStructure, 
  SOSLog 
} from './types';

// Page Views imports
import LandingPage from './components/LandingPage';
import StudentPortal from './components/StudentPortal';
import ParentPortal from './components/ParentPortal';
import WardenPortal from './components/WardenPortal';
import SecurityPortal from './components/SecurityPortal';
import AdminPortal from './components/AdminPortal';
import AIShowcase from './components/AIShowcase';
import AnalyticsDashboard from './components/AnalyticsDashboard';
import AdditionalModules from './components/AdditionalModules';

type AppView = 'landing' | 'dashboard' | 'ai-sandbox' | 'analytics' | 'additional';
type UserPersona = 'student' | 'parent' | 'warden' | 'security' | 'admin';

interface NoticeToast {
  id: string;
  msg: string;
  type: 'info' | 'success';
}

export default function App() {
  // Styles dark or light
  const [darkMode, setDarkMode] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Active navigational coordinates
  const [activeView, setActiveView] = useState<AppView>('landing');
  const [activePersona, setActivePersona] = useState<UserPersona>('student');

  // Unified global reactive states (simulates database live triggers)
  const [students, setStudents] = useState<StudentProfile[]>(mockStudents);
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>(mockLeaveRequests);
  const [complaints, setComplaints] = useState<Complaint[]>(mockComplaints);
  const [visitors, setVisitors] = useState<Visitor[]>(mockVisitors);
  const [notices, setNotices] = useState<NoticeItem[]>(mockNotices);
  const [messMenu, setMessMenu] = useState<MessDayMenu[]>(mockMessMenu);
  const [sundayOptedOut, setSundayOptedOut] = useState(false);
  const [feeStructure, setFeeStructure] = useState<FeeStructure>(mockFeeRohan);
  const [sosLogs, setSosLogs] = useState<SOSLog[]>(mockSOSList);

  // Chat memory is handled local to AIShowcase, initial prompts initialized
  const [messagesMemory, setMessagesMemory] = useState<any[]>([]);

  // Sliding system notification banners
  const [toasts, setToasts] = useState<NoticeToast[]>([]);

  // Toggle HTML selector body class for theme
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const addNoticeToast = (msg: string, type: 'info' | 'success' = 'info') => {
    const freshToast: NoticeToast = { id: `toast-${Date.now()}`, msg, type };
    setToasts((prev) => [...prev, freshToast]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== freshToast.id));
    }, 4500);
  };

  // State handlers to facilitate real-time interconnected prototype actions
  const handleAddLeaveRequest = (req: LeaveRequest) => {
    setLeaveRequests((prev) => [req, ...prev]);
  };

  const handleApproveLeaveParent = (leaveId: string, approval: 'Approved' | 'Rejected') => {
    setLeaveRequests((prev) =>
      prev.map((l) => (l.id === leaveId ? { ...l, parentApproval: approval } : l))
    );
  };

  const handleApproveLeaveWarden = (leaveId: string, status: 'Approved' | 'Rejected') => {
    setLeaveRequests((prev) =>
      prev.map((l) => (l.id === leaveId ? { ...l, status } : l))
    );
    // If approved, update active student status to outbound
    const matchedLeave = leaveRequests.find(l => l.id === leaveId);
    if (matchedLeave && status === 'Approved') {
      setStudents((prev) =>
        prev.map((s) => (s.id === matchedLeave.studentId ? { ...s, status: 'On-Leave' } : s))
      );
    }
  };

  const handleAddComplaint = (comp: Complaint) => {
    setComplaints((prev) => [comp, ...prev]);
  };

  const handleResolveComplaint = (compId: string, comment: string) => {
    setComplaints((prev) =>
      prev.map((c) => (c.id === compId ? { ...c, status: 'Resolved', adminComments: comment } : c))
    );
  };

  const handlePayFee = (amount: number) => {
    setFeeStructure((prev) => {
      const remainingDues = prev.dueAmount - amount;
      return {
        ...prev,
        paidAmount: prev.paidAmount + amount,
        dueAmount: remainingDues,
        status: remainingDues <= 0 ? 'Paid' : 'Partially-Paid',
        transactions: [
          {
            id: `TXN${Math.floor(100000 + Math.random() * 900000)}`,
            amount,
            date: new Date().toISOString().split('T')[0],
            method: 'Unified UPI Secure Applet',
            reference: `UPI${Math.floor(1000000000 + Math.random() * 9000000000)}`
          },
          ...prev.transactions
        ]
      };
    });
  };

  const handleAddVisitor = (newV: Visitor) => {
    setVisitors((prev) => [newV, ...prev]);
  };

  const handleCheckInOutVisitor = (vId: string, action: 'entry' | 'exit') => {
    const nowTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setVisitors((prev) =>
      prev.map((v) => {
        if (v.id === vId) {
          if (action === 'entry') {
            return { ...v, status: 'Inside', entryTime: nowTime };
          } else {
            return { ...v, status: 'Checked-Out', exitTime: nowTime };
          }
        }
        return v;
      })
    );
  };

  const handleAddNoticeBoardEntry = (entry: NoticeItem) => {
    setNotices((prev) => [entry, ...prev]);
  };

  const handleToggleSundayMessOptOut = (day: string, activeState: boolean) => {
    setSundayOptedOut(activeState);
  };

  const handleResolveSOS = (sosId: string, remarks: string) => {
    setSosLogs((prev) =>
      prev.map((s) => (s.id === sosId ? { ...s, status: 'Resolved', remarks, resolvedBy: 'Warden Bhatia' } : s))
    );
  };

  const handleAddStudent = (stu: StudentProfile) => {
    setStudents((prev) => [...prev, stu]);
  };

  const handleDeleteStudent = (stuId: string) => {
    setStudents((prev) => prev.filter((s) => s.id !== stuId));
  };

  const handleAddChatMessage = (sender: 'user' | 'assistant', content: string) => {
    setMessagesMemory((prev) => [...prev, { id: `msg-${Date.now()}`, sender, content }]);
  };

  // Get current active student context (defaults to Rohan)
  const currentRohan = students.find((s) => s.id === 'STU001') || students[0];

  return (
    <div className="min-h-screen bg-brand-bg dark:bg-zinc-950 font-sans flex flex-col justify-between text-brand-charcoal dark:text-zinc-100 transition-colors duration-300">
      
      {/* GLOBAL INSTANCE HEADER ALERT BAR */}
      <div className="bg-zinc-900 text-white text-[11px] font-sans font-semibold py-2 px-4 shadow-sm relative z-50 text-center flex flex-col sm:flex-row gap-2 justify-center items-center">
        <span className="bg-brand-accent text-zinc-900 px-2 py-0.5 rounded text-[9px] font-bold tracking-wider animate-pulse uppercase">
          DEMO MODE ACTIVE
        </span>
        <p className="text-zinc-300 leading-tight">
          Welcome to **HostelSphere AI Round 1 clickable flow sandbox**. Easily change stakeholder roles inside dashboards using the bottom/top switcher.
        </p>
      </div>

      {/* PRIMARY MASTER CONTROLS BAR */}
      <header className="sticky top-0 z-40 bg-white/85 dark:bg-zinc-950/85 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-850 px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Logo Brand pairing */}
          <div 
            onClick={() => setActiveView('landing')}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-xl bg-brand-primary flex items-center justify-center shadow-md shadow-red-500/20 group-hover:scale-105 duration-300">
              <Sparkles className="w-5 h-5 text-white animate-pulse" />
            </div>
            <div>
              <span className="font-display font-black text-base sm:text-lg tracking-tight text-brand-charcoal dark:text-white group-hover:text-brand-primary transition">
                HostelSphere <span className="text-brand-primary font-normal text-xs italic">AI</span>
              </span>
              <p className="text-[9px] font-mono text-brand-slate uppercase font-semibold">Campus living solutions</p>
            </div>
          </div>

          {/* Desktop Nav Actions */}
          <nav className="hidden md:flex items-center gap-6 text-xs font-semibold">
            <button 
              onClick={() => { setActiveView('landing'); }}
              className={`hover:text-brand-primary tracking-tight transition cursor-pointer ${activeView === 'landing' ? 'text-brand-primary font-bold' : 'text-brand-slate dark:text-zinc-300'}`}
            >
              Intro Cover
            </button>
            <button 
              onClick={() => { setActiveView('dashboard'); }}
              className={`hover:text-brand-primary tracking-tight transition cursor-pointer ${activeView === 'dashboard' ? 'text-brand-primary font-bold' : 'text-brand-slate dark:text-zinc-300'}`}
            >
              Interactive Portals
            </button>
            <button 
              onClick={() => { setActiveView('ai-sandbox'); }}
              className={`hover:text-brand-primary tracking-tight transition cursor-pointer ${activeView === 'ai-sandbox' ? 'text-brand-primary font-bold' : 'text-brand-slate dark:text-zinc-300'}`}
            >
              AI Showcase Sandbox
            </button>
            <button 
              onClick={() => { setActiveView('analytics'); }}
              className={`hover:text-brand-primary tracking-tight transition cursor-pointer ${activeView === 'analytics' ? 'text-brand-primary font-bold' : 'text-brand-slate dark:text-zinc-300'}`}
            >
              Utility Analytics
            </button>
            <button 
              onClick={() => { setActiveView('additional'); }}
              className={`hover:text-brand-primary tracking-tight transition cursor-pointer ${activeView === 'additional' ? 'text-brand-primary font-bold' : 'text-brand-slate dark:text-zinc-300'}`}
            >
              Mess & Announcements
            </button>
          </nav>

          {/* Right utility buttons: Theme change, triggers */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-900 hover:bg-zinc-150 dark:hover:bg-zinc-800 transition text-brand-slate dark:text-zinc-300 cursor-pointer"
              title="Toggle Contrast Style"
            >
              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Simulated SOS Hot Key */}
            <button
              onClick={() => {
                const nowTimeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                const freshSos: SOSLog = {
                  id: `SOS-${Math.floor(100 + Math.random() * 900)}`,
                  studentName: currentRohan.name,
                  roomNo: currentRohan.roomNo,
                  phone: currentRohan.phone,
                  time: `${nowTimeStr}, Today`,
                  triggerType: 'Medical',
                  status: 'Triggered'
                };
                setSosLogs((prev) => [freshSos, ...prev]);
                addNoticeToast('🔴 EMERGENCY MEDICAL SOS ALARM INJECTED! Warden team notified instantly.', 'success');
                setActiveView('dashboard');
                setActivePersona('warden');
              }}
              className="px-3.5 py-2 bg-brand-primary hover:bg-red-700 text-white font-semibold text-xs rounded-xl shadow-lg shadow-red-500/20 active:scale-95 duration-200 flex items-center gap-1.5 cursor-pointer"
            >
              <ShieldAlert className="w-4 h-4 animate-bounce" />
              SOS Panic Alert
            </button>

            {/* Mobile menu drawer trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl md:hidden hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE NAV MENU DRAWER */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-zinc-50 dark:bg-zinc-950 border-b border-zinc-200 p-4 relative z-30"
          >
            <div className="flex flex-col gap-3 font-semibold text-xs text-left">
              <button 
                onClick={() => { setActiveView('landing'); setMobileMenuOpen(false); }}
                className="p-2 hover:bg-zinc-100 rounded"
              >
                Cover Welcome
              </button>
              <button 
                onClick={() => { setActiveView('dashboard'); setMobileMenuOpen(false); }}
                className="p-2 hover:bg-zinc-100 rounded"
              >
                Interactive Portals
              </button>
              <button 
                onClick={() => { setActiveView('ai-sandbox'); setMobileMenuOpen(false); }}
                className="p-2 hover:bg-zinc-100 rounded"
              >
                AI Showcase Sandbox
              </button>
              <button 
                onClick={() => { setActiveView('analytics'); setMobileMenuOpen(false); }}
                className="p-2 hover:bg-zinc-100 rounded"
              >
                Utility Analytics
              </button>
              <button 
                onClick={() => { setActiveView('additional'); setMobileMenuOpen(false); }}
                className="p-2 hover:bg-zinc-100 rounded"
              >
                Mess & Notice Board
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MAIN CONTAINER AREA */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 relative">

        {/* PERSISTENT BAR: PORTAL SELECTOR BAR (ONLY VISIBLE ON VIEW='DASHBOARD') */}
        {activeView === 'dashboard' && (
          <div className="mb-8 p-4 bg-orange-50/20 dark:bg-zinc-950/40 border border-zinc-200 dark:border-zinc-805 rounded-2xl flex flex-col sm:flex-row justify-between items-center gap-4 text-left">
            <div>
              <h3 className="font-display font-extrabold text-sm text-brand-charcoal dark:text-zinc-100 flex items-center gap-1.5">
                <Workflow className="w-4 h-4 text-brand-accent" />
                Stakeholder Persona Switcher
              </h3>
              <p className="text-xs text-brand-slate dark:text-zinc-400">
                Instantly switch the viewing dashboard to test the seamless end-to-end prototype interactions.
              </p>
            </div>

            {/* Persona Pills Switchers */}
            <div className="flex flex-wrap gap-1.5 p-1 bg-zinc-150 dark:bg-zinc-900 rounded-xl border">
              {[
                { id: 'student', label: 'Student (Rohan)', color: 'border-brand-primary' },
                { id: 'parent', label: 'Parent (Ramesh)', color: 'border-brand-accent' },
                { id: 'warden', label: 'Warden (Bhatia)', color: 'border-brand-primary' },
                { id: 'security', label: 'Security Guard', color: 'border-brand-success' },
                { id: 'admin', label: 'Principal Admin', color: 'border-zinc-500' }
              ].map((persona) => (
                <button
                  key={persona.id}
                  onClick={() => {
                    setActivePersona(persona.id as any);
                    addNoticeToast(`Switched active environment identity role to ${persona.label}!`, 'info');
                  }}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg cursor-pointer transition ${
                    activePersona === persona.id 
                      ? 'bg-white dark:bg-zinc-800 text-brand-primary shadow-sm font-bold border-b-2 ' + persona.color
                      : 'text-brand-slate dark:text-zinc-405 hover:text-brand-charcoal'
                  }`}
                >
                  {persona.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* RENDER ACTIVE COORDINATE COMPONENT */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeView + '-' + activePersona}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
          >
            {activeView === 'landing' && (
              <LandingPage 
                onSelectPortal={(p) => {
                  setActivePersona(p);
                  setActiveView('dashboard');
                }}
                onNavigateToAI={() => setActiveView('ai-sandbox')}
                onNavigateToNoticeBoard={() => setActiveView('additional')}
              />
            )}

            {activeView === 'dashboard' && (
              <>
                {activePersona === 'student' && (
                  <StudentPortal 
                    onAddNotice={addNoticeToast}
                    activeStudent={currentRohan}
                    leaveRequests={leaveRequests}
                    onAddLeaveRequest={handleAddLeaveRequest}
                    complaints={complaints}
                    onAddComplaint={handleAddComplaint}
                    feeStructure={feeStructure}
                    onPayFee={handlePayFee}
                  />
                )}

                {activePersona === 'parent' && (
                  <ParentPortal 
                    onAddNotice={addNoticeToast}
                    activeStudent={currentRohan}
                    leaveRequests={leaveRequests}
                    onApproveLeaveParent={handleApproveLeaveParent}
                    feeStructure={feeStructure}
                  />
                )}

                {activePersona === 'warden' && (
                  <WardenPortal 
                    onAddNotice={addNoticeToast}
                    leaveRequests={leaveRequests}
                    onApproveLeaveWarden={handleApproveLeaveWarden}
                    complaints={complaints}
                    onResolveComplaint={handleResolveComplaint}
                    sosLogs={sosLogs}
                    onResolveSOS={handleResolveSOS}
                    rooms={mockRooms}
                    students={students}
                    onAddMessage={handleAddChatMessage}
                  />
                )}

                {activePersona === 'security' && (
                  <SecurityPortal 
                    onAddNotice={addNoticeToast}
                    visitors={visitors}
                    onAddVisitor={handleAddVisitor}
                    onCheckInOutVisitor={handleCheckInOutVisitor}
                    students={students}
                  />
                )}

                {activePersona === 'admin' && (
                  <AdminPortal 
                    onAddNotice={addNoticeToast}
                    students={students}
                    onAddStudent={handleAddStudent}
                    onDeleteStudent={handleDeleteStudent}
                    rooms={mockRooms}
                    onAddNoticeBoardEntry={handleAddNoticeBoardEntry}
                  />
                )}
              </>
            )}

            {activeView === 'ai-sandbox' && (
              <AIShowcase 
                onAddNotice={addNoticeToast}
              />
            )}

            {activeView === 'analytics' && (
              <AnalyticsDashboard 
                onAddNotice={addNoticeToast}
              />
            )}

            {activeView === 'additional' && (
              <AdditionalModules 
                onAddNotice={addNoticeToast}
                notices={notices}
                onAddNoticeBoardEntry={handleAddNoticeBoardEntry}
                messMenu={messMenu}
                sundayOptedOut={sundayOptedOut}
                onToggleSundayMessOptOut={handleToggleSundayMessOptOut}
                sosLogs={sosLogs.filter(s => s.status === 'Resolved')}
              />
            )}
          </motion.div>
        </AnimatePresence>

      </main>

      {/* FIXED TOAST FLOATING SNACKBAR BANNER NOTIFICATIONS FEED */}
      <div className="fixed bottom-6 right-6 z-50 space-y-3.5 max-w-sm w-full text-left">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, x: 50, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 50, scale: 0.95 }}
              className={`p-4 rounded-2xl shadow-xl flex gap-3 border items-center backdrop-blur-md justify-between ${
                toast.type === 'success' 
                  ? 'bg-zinc-900/95 border-brand-accent text-white dark:bg-zinc-900' 
                  : 'bg-white dark:bg-zinc-900 text-brand-charcoal border-zinc-200'
              }`}
            >
              <div className="flex gap-2.5 items-center">
                {toast.type === 'success' ? (
                  <CheckCircle2 className="w-5 h-5 text-brand-accent animate-spin" />
                ) : (
                  <Lightbulb className="w-5 h-5 text-brand-primary" />
                )}
                <span className="text-xs font-semibold tracking-tight leading-relaxed">{toast.msg}</span>
              </div>
              <button 
                onClick={() => setToasts((prev) => prev.filter((t) => t.id !== toast.id))}
                className="text-zinc-400 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

    </div>
  );
}
