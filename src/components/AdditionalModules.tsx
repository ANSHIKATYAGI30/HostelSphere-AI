import React, { useState } from 'react';
import { 
  Tv, 
  MessageSquare, 
  Calendar,
  ShieldAlert, 
  Plus, 
  Check, 
  Sparkles, 
  Clock, 
  Search, 
  Flame, 
  VolumeX,
  ChevronRight,
  TrendingDown,
  Star
} from 'lucide-react';
import { NoticeItem, MessDayMenu, SOSLog } from '../types';
import { mockNotices, mockMessMenu, mockSOSList } from '../data/mockData';

interface AdditionalModulesProps {
  onAddNotice: (msg: string, type: 'info' | 'success') => void;
  notices: NoticeItem[];
  onAddNoticeBoardEntry: (entry: NoticeItem) => void;
  messMenu: MessDayMenu[];
  onToggleSundayMessOptOut: (day: string, state: boolean) => void;
  sundayOptedOut: boolean;
  sosLogs: SOSLog[];
}

export default function AdditionalModules({
  onAddNotice,
  notices,
  onAddNoticeBoardEntry,
  messMenu,
  onToggleSundayMessOptOut,
  sundayOptedOut,
  sosLogs
}: AdditionalModulesProps) {
  const [activeSubModule, setActiveSubModule] = useState<'mess' | 'bulletin' | 'emergency'>('mess');

  // Form states for Notice creation
  const [showNoticeForm, setShowNoticeForm] = useState(false);
  const [newNoticeTitle, setNewNoticeTitle] = useState('');
  const [newNoticeCategory, setNewNoticeCategory] = useState<NoticeItem['category']>('General');
  const [newNoticeContent, setNewNoticeContent] = useState('');
  const [newNoticeImportant, setNewNoticeImportant] = useState(false);

  const [noticeSearch, setNoticeSearch] = useState('');

  const handlePostNotice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoticeTitle || !newNoticeContent) {
      onAddNotice('Please fill title and contents fields', 'info');
      return;
    }

    const nItem: NoticeItem = {
      id: `N${Math.floor(100 + Math.random() * 900)}`,
      title: newNoticeTitle,
      category: newNoticeCategory,
      content: newNoticeContent,
      date: new Date().toISOString().split('T')[0],
      postedBy: 'Admin (Desk Officer)',
      isImportant: newNoticeImportant
    };

    onAddNoticeBoardEntry(nItem);
    setShowNoticeForm(false);
    setNewNoticeTitle('');
    setNewNoticeContent('');
    setNewNoticeImportant(false);
    onAddNotice(`Announcement "${nItem.title}" posted on digital board!`, 'success');
  };

  return (
    <div className="space-y-8 font-sans text-left">
      {/* Tab Navigation header */}
      <div className="pb-4 border-b border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="font-display text-2xl font-extrabold text-brand-charcoal dark:text-zinc-50 flex items-center gap-2">
            <Tv className="w-6 h-6 text-brand-accent fill-brand-accent animate-pulse" />
            Additional Operations
          </h1>
          <p className="text-sm text-brand-slate dark:text-zinc-400">
            Audit weekly mess parameters, digital announcements board, and boundary incident logs
          </p>
        </div>

        {/* Tab pills switcher */}
        <div className="flex bg-zinc-100 dark:bg-zinc-950 p-1 rounded-xl border">
          {[
            { id: 'mess', label: 'Mess Management', icon: Calendar },
            { id: 'bulletin', label: 'Digital Notice Board', icon: Tv },
            { id: 'emergency', label: 'Emergency SOS Logs', icon: ShieldAlert }
          ].map((pill) => (
            <button
              key={pill.id}
              onClick={() => setActiveSubModule(pill.id as any)}
              className={`px-4 py-2 text-xs font-semibold rounded-lg flex items-center gap-2 cursor-pointer transition ${
                activeSubModule === pill.id 
                  ? 'bg-white dark:bg-zinc-900 text-brand-primary shadow-sm' 
                  : 'text-brand-slate dark:text-zinc-400 hover:text-brand-charcoal'
              }`}
            >
              <pill.icon className="w-3.5 h-3.5" />
              <span>{pill.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* SUB-MODULE 1: Mess Management & Waste Optimizer */}
      {activeSubModule === 'mess' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Left promo: food wastage slider alert */}
            <div className="p-6 bg-rose-50/10 dark:bg-zinc-950 border border-brand-primary/25 rounded-2xl flex flex-col justify-between space-y-4">
              <div>
                <span className="text-[10px] font-bold tracking-widest text-brand-primary uppercase block">Food Wastage Counter</span>
                <h3 className="font-display font-bold text-lg text-brand-charcoal dark:text-zinc-150 mt-1">AI-Predictive RSVP Optimizer</h3>
                <p className="text-xs text-brand-slate dark:text-zinc-400 mt-2 leading-relaxed">
                  Sunday Lunch accounts for 32% of total weekly raw waste. Toggle your attendance early to save resources and claim micro refund tokens.
                </p>
              </div>

              <div className="space-y-4 pt-2">
                <div className="p-4 bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-xl space-y-3">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold">Sunday Dining Choice</span>
                    <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${sundayOptedOut ? 'bg-red-100 text-red-800' : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'}`}>
                      {sundayOptedOut ? '✗ Dining Out' : '✓ Dining In'}
                    </span>
                  </div>

                  {/* Interactive Slider simulated toggle */}
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-zinc-450 italic">Opt-out Sunday Lunch?</span>
                    <button 
                      onClick={() => {
                        onToggleSundayMessOptOut('Sunday', !sundayOptedOut);
                        onAddNotice(
                          sundayOptedOut 
                            ? 'Opted in for Sunday Lunch. Ingredient supply booked!'
                            : 'Opted out of Sunday Lunch! Saved 400g raw carbon footprint.', 
                          'success'
                        );
                      }}
                      className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                        sundayOptedOut ? 'bg-brand-primary' : 'bg-zinc-200 dark:bg-zinc-800'
                      }`}
                    >
                      <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                        sundayOptedOut ? 'translate-x-5' : 'translate-x-0'
                      }`} />
                    </button>
                  </div>
                </div>

                <div className="p-3 bg-brand-success/5 border border-brand-success/15 rounded-xl text-[11px] text-zinc-500 italic flex items-center gap-1.5">
                  <TrendingDown className="w-5 h-5 text-brand-success flex-shrink-0" />
                  <span>Your opt-out logs saved <strong>₹120</strong> in dining refunds this sem cycle!</span>
                </div>
              </div>
            </div>

            {/* Middle & Right columns: Weekly Diet schedule calendar list */}
            <div className="lg:col-span-2 p-5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl space-y-4">
              <div className="flex justify-between items-center border-b border-zinc-155 dark:border-zinc-850 pb-3">
                <h3 className="font-display font-semibold text-sm text-brand-charcoal dark:text-zinc-50 flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-brand-accent fill-brand-accent animate-pulse" />
                  College Standard Dining Calendar & Ingredients list
                </h3>
                <span className="text-[10px] bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded text-brand-slate">Cycle: Spring-Sem</span>
              </div>

              <div className="space-y-4 max-h-[360px] overflow-y-auto pr-1">
                {messMenu.map((dayObj) => (
                  <div key={dayObj.day} className={`p-4 rounded-xl border text-xs space-y-2.5 transition ${
                    dayObj.isSpecialDay 
                      ? 'bg-amber-50/15 border-brand-accent' 
                      : 'bg-zinc-50/40 dark:bg-zinc-950 border-zinc-150 dark:border-zinc-800 hover:bg-zinc-50'
                  }`}>
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-sm text-brand-charcoal dark:text-zinc-50">{dayObj.day}</span>
                      {dayObj.isSpecialDay && (
                        <span className="px-2 py-0.5 rounded bg-brand-accent text-zinc-950 font-extrabold text-[9px] uppercase animate-pulse">
                          🧁 Royal Sunday Special Dinner
                        </span>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-[11px] pt-1">
                      <div className="p-1.5 bg-white dark:bg-zinc-900 rounded border">
                        <strong className="text-brand-primary block text-[10px]">🍳 Breakfast ({dayObj.breakfastTime.split(' ')[0]})</strong>
                        <span className="text-zinc-500 text-[10px] block mt-0.5 leading-tight">{dayObj.breakfast}</span>
                      </div>
                      <div className="p-1.5 bg-white dark:bg-zinc-900 rounded border">
                        <strong className="text-brand-success block text-[10px]">🍛 Lunch ({dayObj.lunchTime.split(' ')[0]})</strong>
                        <span className="text-zinc-500 text-[10px] block mt-0.5 leading-tight">{dayObj.lunch}</span>
                      </div>
                      <div className="p-1.5 bg-white dark:bg-zinc-900 rounded border">
                        <strong className="text-brand-accent block text-[10px]">☕ Snacks ({dayObj.snacksTime.split(' ')[0]})</strong>
                        <span className="text-zinc-500 text-[10px] block mt-0.5 leading-tight">{dayObj.snacks}</span>
                      </div>
                      <div className="p-1.5 bg-white dark:bg-zinc-900 rounded border">
                        <strong className="text-indigo-600 block text-[10px]">🍲 Dinner ({dayObj.dinnerTime.split(' ')[0]})</strong>
                        <span className="text-zinc-500 text-[10px] block mt-0.5 leading-tight">{dayObj.dinner}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      )}

      {/* SUB-MODULE 2: Digital notice bulletin board */}
      {activeSubModule === 'bulletin' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center pb-3 border-b border-zinc-150 dark:border-zinc-850">
            <h3 className="font-display font-semibold text-sm text-brand-charcoal dark:text-zinc-100">Official Notice Bulletin archives</h3>
            <button 
              onClick={() => setShowNoticeForm(!showNoticeForm)}
              className="px-3 py-1.5 bg-brand-primary text-white hover:bg-opacity-95 text-xs font-semibold rounded-lg flex items-center gap-1 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" /> Post New Announcement
            </button>
          </div>

          {/* Quick Announcement creator form */}
          {showNoticeForm && (
            <form onSubmit={handlePostNotice} className="p-5 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl space-y-4">
              <h4 className="font-display font-bold text-xs uppercase text-zinc-450">Compose Digital Announcement</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-brand-slate uppercase mb-1">Notice Header Title</label>
                  <input 
                    type="text"
                    required
                    placeholder="e.g. Electrical shut-down or badminton cup"
                    value={newNoticeTitle}
                    onChange={(e) => setNewNoticeTitle(e.target.value)}
                    className="w-full text-xs p-2.5 bg-white dark:bg-zinc-900 rounded-lg border text-brand-charcoal dark:text-zinc-100 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-brand-slate uppercase mb-1">Category Group</label>
                  <select
                    value={newNoticeCategory}
                    onChange={(e) => setNewNoticeCategory(e.target.value as any)}
                    className="w-full text-xs p-2.5 bg-white dark:bg-zinc-900 rounded-lg border text-brand-charcoal focus:outline-none"
                  >
                    <option value="General">General Campus News</option>
                    <option value="Warden">Warden / Dean Directions</option>
                    <option value="Mess">Mess / Diet Audits</option>
                    <option value="AI Insight">AI Waste Warnings</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-brand-slate uppercase mb-1 font-bold">Comprehensive content body</label>
                <textarea 
                  rows={2.5}
                  required
                  placeholder="e.g. Detailed schedule or instructions for residents..."
                  value={newNoticeContent}
                  onChange={(e) => setNewNoticeContent(e.target.value)}
                  className="w-full text-xs p-2.5 bg-white dark:bg-zinc-900 rounded-lg border text-brand-charcoal focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <label className="flex items-center gap-2 text-xs font-semibold text-brand-primary dark:text-red-400">
                  <input 
                    type="checkbox"
                    checked={newNoticeImportant}
                    onChange={(e) => setNewNoticeImportant(e.target.checked)}
                    className="w-4 h-4 accent-brand-primary"
                  />
                  Mark as Crucial / Important Warning
                </label>
                <button type="submit" className="px-5 py-2 bg-brand-primary hover:bg-opacity-95 text-white text-xs rounded-lg font-bold">
                  Publish to Dashboard
                </button>
              </div>
            </form>
          )}

          {/* Search bar */}
          <div className="p-3 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl flex items-center gap-2">
            <Search className="w-4 h-4 text-zinc-400" />
            <input 
              type="text"
              placeholder="Search circulars by keywords..."
              value={noticeSearch}
              onChange={(e) => setNoticeSearch(e.target.value)}
              className="bg-transparent text-xs w-full focus:outline-none dark:text-zinc-100"
            />
          </div>

          {/* Notices listing */}
          <div className="space-y-4">
            {notices
              .filter(n => n.title.toLowerCase().includes(noticeSearch.toLowerCase()) || n.content.toLowerCase().includes(noticeSearch.toLowerCase()))
              .map((notice) => (
                <div key={notice.id} className={`p-5 rounded-2xl border transition ${
                  notice.isImportant 
                    ? 'bg-amber-50/10 border-brand-accent dark:bg-zinc-950' 
                    : 'bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-805 hover:bg-zinc-50'
                }`}>
                  <div className="flex justify-between items-start text-xs mb-2">
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                          notice.category === 'AI Insight' ? 'bg-purple-100 text-purple-800' : 'bg-zinc-100 dark:bg-zinc-800'
                        }`}>
                          {notice.category.toUpperCase()}
                        </span>
                        <strong className="text-sm font-bold tracking-tight text-brand-charcoal dark:text-zinc-50">{notice.title}</strong>
                      </div>
                      <span className="text-[10px] text-zinc-400 block mt-1.5">Posted by {notice.postedBy} • {notice.date}</span>
                    </div>

                    {notice.isImportant && (
                      <span className="px-2 py-0.5 rounded bg-brand-primary text-white text-[9px] font-bold uppercase animate-pulse">
                        Important
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-brand-slate dark:text-zinc-300 leading-relaxed pt-1">{notice.content}</p>
                </div>
              ))}
          </div>

        </div>
      )}

      {/* SUB-MODULE 3: Emergency SOS Boundary Logs */}
      {activeSubModule === 'emergency' && (
        <div className="space-y-6">
          <div className="pb-4 border-b border-zinc-200 dark:border-zinc-850">
            <h2 className="font-display text-xl font-bold tracking-tight text-brand-primary">Emergency Incident Logbook</h2>
            <p className="text-xs text-brand-slate dark:text-zinc-400">Archived boundary emergency security logs or dispatch records</p>
          </div>

          <div className="space-y-4">
            {sosLogs.map((log) => (
              <div key={log.id} className="p-4 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-xs space-y-2.5">
                <div className="flex justify-between items-center text-xs">
                  <div>
                    <span className="px-2 py-0.5 rounded bg-red-100 text-red-800 font-bold text-[9px] mr-2 block sm:inline-block w-fit mb-1 sm:mb-0">
                      RESOLVED {log.triggerType.toUpperCase()} ALERT
                    </span>
                    <strong className="text-brand-charcoal dark:text-zinc-100">{log.studentName} (Room {log.roomNo})</strong>
                  </div>
                  <span className="font-mono text-zinc-400 text-[10px]">{log.id}</span>
                </div>

                <p className="text-[11px] text-zinc-450 italic leading-relaxed">
                  "Action took by <strong>{log.resolvedBy}</strong>: {log.remarks}"
                </p>

                <div className="flex justify-between text-[10px] text-zinc-400 font-mono pt-2 border-t border-zinc-100 dark:border-zinc-900 border-dashed">
                  <span>Contact: {log.phone}</span>
                  <span>Incident Time: {log.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
