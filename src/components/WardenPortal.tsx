import React, { useState } from 'react';
import { 
  Building, 
  Briefcase, 
  AlertTriangle, 
  Users, 
  ShieldAlert, 
  Check, 
  X, 
  Send,
  Zap,
  Sparkles,
  Search
} from 'lucide-react';
import { 
  RoomDetails, 
  LeaveRequest, 
  Complaint, 
  SOSLog, 
  StudentProfile 
} from '../types';

interface WardenPortalProps {
  onAddNotice: (msg: string, type: 'info' | 'success') => void;
  leaveRequests: LeaveRequest[];
  onApproveLeaveWarden: (leaveId: string, status: 'Approved' | 'Rejected') => void;
  complaints: Complaint[];
  onResolveComplaint: (compId: string, comment: string) => void;
  sosLogs: SOSLog[];
  onResolveSOS: (sosId: string, remarks: string) => void;
  rooms: RoomDetails[];
  students: StudentProfile[];
  onAddMessage: (sender: 'user' | 'assistant', content: string) => void;
}

export default function WardenPortal({
  onAddNotice,
  leaveRequests,
  onApproveLeaveWarden,
  complaints,
  onResolveComplaint,
  sosLogs,
  onResolveSOS,
  rooms,
  students,
  onAddMessage
}: WardenPortalProps) {
  const [activeWardenTab, setActiveWardenTab] = useState<'occupancy' | 'leaves' | 'complaints' | 'rooms' | 'sos'>('sos');
  const [searchQuery, setSearchQuery] = useState('');

  // Local state for complaint resolution comments
  const [resolvingId, setResolvingId] = useState<string | null>(null);
  const [resolutionComment, setResolutionComment] = useState('');

  // Local state for SOS remarks
  const [resolvingSosId, setResolvingSosId] = useState<string | null>(null);
  const [sosRemarks, setSosRemarks] = useState('');

  // Filtering data bases
  const pendingLeaves = leaveRequests.filter(l => l.status === 'Pending');
  const activeComplaints = complaints.filter(c => c.status !== 'Resolved');
  const activeSosCount = sosLogs.filter(s => s.status !== 'Resolved').length;

  const handleResolveComplaintSubmit = (compId: string) => {
    if (!resolutionComment) {
      onAddNotice('Please write a quick comment to inform the student', 'info');
      return;
    }
    onResolveComplaint(compId, resolutionComment);
    setResolvingId(null);
    setResolutionComment('');
    onAddNotice(`Resolved complaint ${compId} with student status feedback`, 'success');
  };

  const handleResolveSosSubmit = (sosId: string) => {
    if (!sosRemarks) {
      onAddNotice('Please specify resolution action details', 'info');
      return;
    }
    onResolveSOS(sosId, sosRemarks);
    setResolvingSosId(null);
    setSosRemarks('');
    onAddNotice(`SOS Alarm ${sosId} resolved and logged in institutional safety records`, 'success');
  };

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-xl overflow-hidden min-h-[600px] flex flex-col md:flex-row">
      
      {/* Warden Sidebar */}
      <div className="md:w-64 bg-zinc-50 dark:bg-zinc-950 p-6 border-r border-zinc-200 dark:border-zinc-800 flex flex-col justify-between">
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-brand-primary text-white flex items-center justify-center font-display font-bold">
              SKB
            </div>
            <div>
              <h3 className="font-display font-semibold text-sm text-brand-charcoal dark:text-zinc-50">Prof. S.K. Bhatia</h3>
              <span className="text-[9px] uppercase font-bold tracking-wider text-brand-slate">Chief Residence Dean</span>
            </div>
          </div>

          <div className="space-y-1">
            {[
              { id: 'sos', label: 'Emergency SOS Monitor', icon: ShieldAlert, alert: activeSosCount > 0, count: activeSosCount },
              { id: 'occupancy', label: 'Resident Directory', icon: Users },
              { id: 'rooms', label: 'Room Allocations', icon: Building },
              { id: 'leaves', label: 'Leave Approvals', icon: Briefcase, count: pendingLeaves.length },
              { id: 'complaints', label: 'Complaints Hub', icon: AlertTriangle, count: activeComplaints.length }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveWardenTab(tab.id as any)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left text-xs font-medium tracking-tight transition cursor-pointer ${
                  activeWardenTab === tab.id 
                    ? 'bg-brand-primary text-white font-semibold' 
                    : 'text-brand-slate dark:text-zinc-400 hover:bg-zinc-200/50 dark:hover:bg-zinc-800/40'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <tab.icon className={`w-4 h-4 ${tab.alert ? 'text-brand-accent animate-bounce' : ''}`} />
                  <span>{tab.label}</span>
                </div>
                {tab.count !== undefined && tab.count > 0 && (
                  <span className={`px-1.5 py-0.5 rounded text-[8px] font-bold ${
                    tab.alert ? 'bg-brand-accent text-zinc-900 animate-pulse' : 'bg-zinc-200 dark:bg-zinc-800 text-brand-charcoal dark:text-zinc-300'
                  }`}>
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="p-4 bg-brand-primary/10 border border-brand-primary/20 rounded-2xl text-left">
          <span className="text-[9px] font-bold text-brand-primary uppercase block mb-1">AI Assistant Dispatcher</span>
          <p className="text-[10px] text-zinc-500 leading-relaxed">
            Automatic priority tagging is live. Low-sentiment critical washroom leakages are routed to building B-Plumber automatically.
          </p>
        </div>
      </div>

      {/* Main Panel */}
      <div className="flex-1 p-6 md:p-8 text-brand-charcoal dark:text-zinc-100 text-left overflow-y-auto">
        
        {/* TAB 1: Emergency SOS Panel */}
        {activeWardenTab === 'sos' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center pb-4 border-b border-zinc-200 dark:border-zinc-850">
              <div>
                <h2 className="font-display text-xl font-bold tracking-tight text-brand-primary">Warden Emergency Dispatch Desk</h2>
                <p className="text-xs text-brand-slate dark:text-zinc-400">Institutional immediate response alarms. Blink state matches alert triggers.</p>
              </div>
              <span className={`px-3 py-1 text-xs rounded-full font-bold ${activeSosCount > 0 ? 'bg-red-500 text-white animate-pulse' : 'bg-emerald-150 text-emerald-800'}`}>
                {activeSosCount > 0 ? `🚨 ${activeSosCount} UNRESOLVED SOS` : '✓ SECURE'}
              </span>
            </div>

            {/* Glowing warning banners if active */}
            {activeSosCount > 0 && (
              <div className="p-4 bg-brand-primary/10 border border-brand-primary sos-glow text-xs text-brand-primary rounded-xl flex items-center gap-3">
                <ShieldAlert className="w-6 h-6 animate-spin flex-shrink-0" />
                <div>
                  <strong>CRITICAL:</strong> High voltage panic telemetry was logged in some residential block corridors. Please proceed with immediate campus warden or medical team dispatch!
                </div>
              </div>
            )}

            <div className="space-y-4">
              <h3 className="font-display text-sm font-semibold text-zinc-800 dark:text-zinc-50">Active Alarm Stack</h3>
              {sosLogs.map((item) => (
                <div key={item.id} className={`p-5 rounded-2xl border transition ${
                  item.status !== 'Resolved'
                    ? 'bg-rose-50/20 dark:bg-zinc-950 border-brand-primary'
                    : 'bg-zinc-50/50 dark:bg-zinc-900 border-zinc-150 dark:border-zinc-800 opacity-70'
                }`}>
                  <div className="flex justify-between items-start text-xs mb-3">
                    <div className="flex items-center gap-2">
                      <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-bold text-white ${
                        item.triggerType === 'Medical' ? 'bg-indigo-600' : 'bg-brand-primary'
                      }`}>
                        {item.triggerType.toUpperCase()} ALARM
                      </span>
                      <strong className="text-brand-charcoal dark:text-zinc-100">{item.studentName} (Room {item.roomNo})</strong>
                    </div>
                    <span className="text-[10px] text-zinc-400 font-mono">Timestamp: {item.time}</span>
                  </div>

                  <div className="text-xs text-brand-slate dark:text-zinc-300">
                    <strong>Warden Action:</strong> Student telephone helpline: <span className="font-mono underline">{item.phone}</span>. Immediate dispatch action has been logged into boundary logs.
                  </div>

                  {item.status !== 'Resolved' ? (
                    <div className="mt-4 pt-4 border-t border-zinc-200/55 dark:border-zinc-800 text-right space-y-3">
                      {resolvingSosId === item.id ? (
                        <div className="space-y-3 text-left">
                          <label className="block text-[10px] uppercase font-bold text-zinc-400">Resolution Logs (Remarks / Medics sent)</label>
                          <textarea 
                            rows={2}
                            placeholder="e.g. Dispatched hostel guard. Found student secure. Resolved medical symptoms with local campus ambulance."
                            value={sosRemarks}
                            onChange={(e) => setSosRemarks(e.target.value)}
                            className="w-full p-2 rounded border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs"
                          />
                          <div className="flex justify-end gap-2 text-xs">
                            <button onClick={() => setResolvingSosId(null)} className="px-3 py-1.5 border">Cancel</button>
                            <button 
                              onClick={() => handleResolveSosSubmit(item.id)}
                              className="px-4 py-1.5 bg-brand-success text-white rounded font-bold"
                            >
                              Resolve Alarm Now
                            </button>
                          </div>
                        </div>
                      ) : (
                        <button 
                          onClick={() => setResolvingSosId(item.id)}
                          className="px-4 py-2 bg-brand-primary hover:bg-opacity-90 text-white rounded-xl text-xs font-bold inline-flex items-center gap-1 cursor-pointer"
                        >
                          <Check className="w-4 h-4" /> Finalize Dispatch & Resolve
                        </button>
                      )}
                    </div>
                  ) : (
                    <div className="mt-3 p-3 bg-zinc-100 dark:bg-zinc-900 rounded-lg text-[11px] text-zinc-500 italic">
                      ✓ Resolved by <strong>{item.resolvedBy}</strong>: {item.remarks}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: Resident Directory */}
        {activeWardenTab === 'occupancy' && (
          <div className="space-y-6">
            <div className="pb-4 border-b border-zinc-200 dark:border-zinc-850">
              <h2 className="font-display text-xl font-bold tracking-tight text-brand-charcoal dark:text-zinc-50">Resident Student Directory</h2>
              <p className="text-xs text-brand-slate dark:text-zinc-400">Review status logs, emergency phone lines, and room occupancies</p>
            </div>

            {/* Search filter bar */}
            <div className="p-3 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl flex items-center gap-2">
              <Search className="w-4 h-4 text-zinc-400" />
              <input 
                type="text"
                placeholder="Filter residents by names, branch, or room..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent text-xs w-full focus:outline-none dark:text-zinc-100"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {students
                .filter(s => s.name.toLowerCase().includes(searchQuery.toLowerCase()) || s.roomNo.toLowerCase().includes(searchQuery.toLowerCase()))
                .map((student) => (
                  <div key={student.id} className="p-4 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl flex gap-3 check-in-card">
                    <img src={student.avatar} alt="avatar" className="w-12 h-12 rounded-full object-cover border border-zinc-200" />
                    <div className="space-y-1 text-xs flex-1">
                      <div className="flex justify-between">
                        <strong className="text-brand-charcoal dark:text-zinc-100">{student.name}</strong>
                        <span className="font-mono bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded text-[10px]">{student.roomNo}</span>
                      </div>
                      <div className="text-[10px] text-brand-slate">{student.batch}</div>
                      <div className="text-[10px] text-zinc-400">Guardian: {student.parentName} ({student.parentPhone})</div>
                      <div className="pt-2 flex justify-between items-center text-[10px]">
                        <span className={`px-2 py-0.5 rounded-full font-semibold ${
                          student.status === 'In-Hostel' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950' : 'bg-amber-100 text-amber-800 dark:bg-amber-950'
                        }`}>
                          {student.status}
                        </span>
                        <span className="text-[9px] text-zinc-450 font-mono">Roll: {student.rollNo}</span>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* TAB 3: Room allocations listing */}
        {activeWardenTab === 'rooms' && (
          <div className="space-y-6">
            <div className="pb-4 border-b border-zinc-200 dark:border-zinc-850">
              <h2 className="font-display text-xl font-bold tracking-tight text-brand-charcoal dark:text-zinc-50">Room Allocation & Utility Audit</h2>
              <p className="text-xs text-brand-slate dark:text-zinc-400">Manage institutional building capacities and smart power anomalies</p>
            </div>

            <div className="space-y-4">
              {rooms.map((room) => (
                <div key={room.id} className="p-5 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl text-xs space-y-4">
                  <div className="flex justify-between items-center border-b border-zinc-200 dark:border-zinc-800 pb-2">
                    <div>
                      <span className="text-sm font-bold text-brand-charcoal dark:text-zinc-200">{room.block} - Room {room.roomNo}</span>
                      <span className="ml-2 px-1.5 py-0.5 rounded bg-zinc-200 dark:bg-zinc-800 text-[10px] text-brand-slate">{room.type} Suite</span>
                    </div>
                    <div className="text-right flex items-center gap-1 text-brand-success font-bold font-mono">
                      <Zap className="w-3.5 h-3.5 text-brand-accent fill-brand-accent animate-pulse" />
                      {room.meterReading} kWh meter
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row gap-4 justify-between">
                    <div className="space-y-1.5 flex-1">
                      <span className="text-[10px] text-zinc-400 font-bold block">Current Occupants</span>
                      <div className="flex flex-wrap gap-2 pt-1">
                        {room.occupants.map((occ, i) => (
                          <span key={i} className="px-2.5 py-1 rounded bg-white dark:bg-zinc-900 border border-zinc-150 dark:border-zinc-800 font-medium">
                            🧑‍🎓 {occ}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <span className="text-[10px] text-zinc-400 font-bold block">Actions</span>
                      <button 
                        onClick={() => {
                          onAddNotice(`Initiating room migration mock wizard for occupants in ${room.roomNo}`, 'success');
                          onAddMessage('assistant', `Hello Warden, I can assist you with Room Allocation shifts. Moving residents out of B-Block requires generating vacant slips. Current vacancy is 3 rooms.`);
                        }}
                        className="mt-1 px-3 py-1.5 border border-brand-primary text-brand-primary text-[10px] rounded hover:bg-rose-50 font-bold"
                      >
                        Shift Positions / Allocate
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: Leave approvals */}
        {activeWardenTab === 'leaves' && (
          <div className="space-y-6">
            <div className="pb-4 border-b border-zinc-200 dark:border-zinc-850">
              <h2 className="font-display text-xl font-bold tracking-tight text-brand-charcoal dark:text-zinc-50">Resident Leave Approvals</h2>
              <p className="text-xs text-brand-slate dark:text-zinc-400">Approve or reject active slips with automated parental verification tags</p>
            </div>

            <div className="space-y-4">
              {pendingLeaves.length === 0 ? (
                <div className="p-10 text-center bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-850 rounded-2xl text-xs text-brand-slate">
                  ✓ Excellent! All pending leave slips are cleared of backlog.
                </div>
              ) : (
                pendingLeaves.map((req) => (
                  <div key={req.id} className="p-5 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl text-xs space-y-4 shadow-sm hover:shadow-md transition">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center gap-2">
                          <strong className="text-sm text-brand-charcoal dark:text-zinc-100">{req.studentName} (Room {req.roomNo})</strong>
                          <span className="px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-[10px] font-semibold text-brand-slate">{req.type} Visit</span>
                        </div>
                        <div className="text-[10px] text-zinc-400 mt-1">Hometown Intention: {req.reason}</div>
                      </div>
                      <span className="font-mono text-zinc-400 text-[10px]">{req.id}</span>
                    </div>

                    <div className="p-3 bg-zinc-50 dark:bg-zinc-900 rounded-xl space-y-1.5 text-[11px] text-brand-slate">
                      <div>🗓️ <strong>Duration Period:</strong> {req.fromDate} to {req.toDate}</div>
                      <div className="flex items-center gap-1.5">
                        🛡️ <strong>Parent Consent Check:</strong> 
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          req.parentApproval === 'Approved' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                        }`}>
                          {req.parentApproval === 'Approved' ? '✓ Guardian Approved' : '⏳ Parent Awaiting'}
                        </span>
                      </div>
                    </div>

                    <div className="flex justify-end gap-2 pt-2 border-t border-zinc-100 dark:border-zinc-900">
                      <button 
                        onClick={() => {
                          onApproveLeaveWarden(req.id, 'Rejected');
                          onAddNotice(`Rejected leave request slip ${req.id}`, 'info');
                        }}
                        className="px-3 py-1.5 border hover:bg-zinc-50 text-brand-slate rounded text-xs font-semibold"
                      >
                        Decline Slip
                      </button>
                      <button 
                        onClick={() => {
                          onApproveLeaveWarden(req.id, 'Approved');
                          onAddNotice(`Approved leave request slip ${req.id}`, 'success');
                        }}
                        className="px-4 py-1.5 bg-brand-primary text-white rounded hover:bg-opacity-95 text-xs font-bold inline-flex items-center gap-1"
                      >
                        <Check className="w-3.5 h-3.5" /> Approve Leaving Pass
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* TAB 5: Complaint monitoring */}
        {activeWardenTab === 'complaints' && (
          <div className="space-y-6">
            <div className="pb-4 border-b border-zinc-200 dark:border-zinc-850">
              <h2 className="font-display text-xl font-bold tracking-tight text-brand-charcoal dark:text-zinc-50">Resident Complaint Monitoring</h2>
              <p className="text-xs text-brand-slate dark:text-zinc-400">Respond to active maintenance tickets backed by threat-checked urgency</p>
            </div>

            <div className="space-y-4">
              {activeComplaints.length === 0 ? (
                <div className="p-10 text-center bg-zinc-50 dark:bg-zinc-950 border rounded-2xl text-xs text-brand-slate">
                  ✓ Perfect state! No active complaints reported.
                </div>
              ) : (
                activeComplaints.map((comp) => (
                  <div key={comp.id} className="p-5 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl text-xs space-y-4">
                    <div className="flex justify-between items-start border-b border-zinc-100 dark:border-zinc-900 pb-2.5">
                      <div>
                        <div className="flex items-center gap-2">
                          <strong className="text-sm font-semibold text-brand-charcoal dark:text-zinc-100">{comp.category} Issue (CMP: {comp.id})</strong>
                          <span className={`px-2 py-0.5 rounded text-[8px] font-bold text-white uppercase ${
                            comp.urgency === 'Critical' ? 'bg-red-500 animate-pulse' : comp.urgency === 'High' ? 'bg-rose-500' : 'bg-gray-400'
                          }`}>
                            {comp.urgency} Urgency
                          </span>
                        </div>
                        <div className="text-[10px] text-zinc-400 mt-1">Reporter: {comp.studentName} (Room {comp.roomNo}) • Date: {comp.appliedDate}</div>
                      </div>

                      <div className="text-right">
                        <span className={`text-[9px] font-bold px-2 py-0.5 rounded ${
                          comp.sentiment === 'Negative' ? 'bg-red-150 text-red-800' : 'bg-orange-100'
                        }`}>
                          Sentiment: {comp.sentiment}
                        </span>
                      </div>
                    </div>

                    <p className="text-brand-slate dark:text-zinc-300 text-xs leading-relaxed">{comp.description}</p>

                    {comp.aiClassification && (
                      <div className="p-2.5 bg-purple-50 dark:bg-purple-950/20 text-[10px] rounded-lg border border-purple-100 text-purple-700 dark:text-purple-300 flex items-center gap-1.5 font-medium">
                        <Sparkles className="w-3.5 h-3.5 animate-spin flex-shrink-0" />
                        <span><strong>AI Action Recommendation:</strong> {comp.aiClassification}</span>
                      </div>
                    )}

                    <div className="pt-2 text-right">
                      {resolvingId === comp.id ? (
                        <div className="space-y-2 text-left">
                          <label className="block text-[10px] uppercase font-bold text-zinc-400">Response Comments (Dispatched Plumber/Electricians)</label>
                          <input 
                            type="text"
                            placeholder="e.g. Electrician assigned. Scheduled for repair at 10 AM tomorrow."
                            value={resolutionComment}
                            onChange={(e) => setResolutionComment(e.target.value)}
                            className="w-full text-xs p-2 rounded border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900"
                          />
                          <div className="flex justify-end gap-1.5 text-[11px]">
                            <button onClick={() => setResolvingId(null)} className="px-2.5 py-1 border text-brand-slate">Cancel</button>
                            <button 
                              onClick={() => handleResolveComplaintSubmit(comp.id)}
                              className="px-3 py-1 bg-brand-success text-white rounded font-bold"
                            >
                              Dispatch Solution
                            </button>
                          </div>
                        </div>
                      ) : (
                        <button 
                          onClick={() => setResolvingId(comp.id)}
                          className="px-4 py-2 border border-brand-primary text-brand-primary hover:bg-rose-50/50 rounded-xl font-bold cursor-pointer text-xs"
                        >
                          Address & Dispatch Team
                        </button>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
