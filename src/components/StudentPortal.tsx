import React, { useState } from 'react';
import { 
  User, 
  Home, 
  Briefcase, 
  CreditCard, 
  AlertTriangle, 
  Bell, 
  QrCode, 
  LogOut, 
  Plus, 
  Check, 
  Clock, 
  X, 
  Send,
  Zap,
  Sparkles,
  Download
} from 'lucide-react';
import { 
  StudentProfile, 
  RoomDetails, 
  LeaveRequest, 
  Complaint, 
  FeeStructure 
} from '../types';
import { 
  mockStudents, 
  mockRooms, 
  mockLeaveRequests, 
  mockComplaints, 
  mockFeeRohan 
} from '../data/mockData';

interface StudentPortalProps {
  onAddNotice: (msg: string, type: 'info' | 'success') => void;
  leaveRequests: LeaveRequest[];
  onAddLeaveRequest: (req: LeaveRequest) => void;
  complaints: Complaint[];
  onAddComplaint: (comp: Complaint) => void;
  feeStructure: FeeStructure;
  onPayFee: (amount: number) => void;
  activeStudent: StudentProfile;
}

export default function StudentPortal({
  onAddNotice,
  leaveRequests,
  onAddLeaveRequest,
  complaints,
  onAddComplaint,
  feeStructure,
  onPayFee,
  activeStudent
}: StudentPortalProps) {
  const [activeTab, setActiveTabTab] = useState<'profile' | 'room' | 'leaves' | 'fees' | 'complaints' | 'qr'>('profile');

  // Local Form state
  const [leaveType, setLeaveType] = useState<'Home' | 'Local'>('Home');
  const [leaveFrom, setLeaveFrom] = useState('');
  const [leaveTo, setLeaveTo] = useState('');
  const [leaveReason, setLeaveReason] = useState('');

  const [complaintCategory, setComplaintCategory] = useState<Complaint['category']>('Electrical');
  const [complaintDesc, setComplaintDesc] = useState('');

  const [paymentAmount, setPaymentAmount] = useState('20000');
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  // Filter lists to active student (Rohan Sharma STU001) Only
  const rohanLeaves = leaveRequests.filter(l => l.studentId === activeStudent.id);
  const rohanComplaints = complaints.filter(c => c.studentName === activeStudent.name);

  // Compute stats or info
  const activeRoom = mockRooms.find(r => r.roomNo === activeStudent.roomNo) || mockRooms[0];

  const handleApplyLeave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!leaveFrom || !leaveTo || !leaveReason) {
      onAddNotice('Please fill all leave parameters', 'info');
      return;
    }

    const newLeave: LeaveRequest = {
      id: `LV${Math.floor(1000 + Math.random() * 9000)}`,
      studentId: activeStudent.id,
      studentName: activeStudent.name,
      roomNo: activeStudent.roomNo,
      type: leaveType,
      fromDate: leaveFrom,
      toDate: leaveTo,
      reason: leaveReason,
      status: 'Pending',
      parentApproval: leaveType === 'Home' ? 'Pending' : 'Approved', // Local leaves pre-approved by parent by policy
      appliedDate: new Date().toISOString().split('T')[0]
    };

    onAddLeaveRequest(newLeave);
    onAddNotice(`Applied for ${leaveType} leave successfully!`, 'success');
    setLeaveFrom('');
    setLeaveTo('');
    setLeaveReason('');
  };

  const handleApplyComplaint = (e: React.FormEvent) => {
    e.preventDefault();
    if (!complaintDesc) {
      onAddNotice('Please write a detailed description', 'info');
      return;
    }

    // Interactive Local "AI" Categorizer & Sentiment Analysis
    const textLower = complaintDesc.toLowerCase();
    
    // Default fallback
    let detectedSentiment: 'Negative' | 'Neutral' | 'Positive' = 'Neutral';
    let urgencyLevel: 'Low' | 'Medium' | 'High' | 'Critical' = 'Medium';
    let autoClassificationText = 'Auto Assigned to Caretakers';

    if (textLower.includes('urgent') || textLower.includes('clogged') || textLower.includes('overflow') || textLower.includes('spark') || textLower.includes('broken lock') || textLower.includes('stolen')) {
      detectedSentiment = 'Negative';
      urgencyLevel = 'Critical';
      autoClassificationText = 'AI Flagged [CRITICAL] - Forwarded with SOS Priority to Warden Team';
    } else if (textLower.includes('broken') || textLower.includes('not working') || textLower.includes('stuck') || textLower.includes('slow') || textLower.includes('bad smell')) {
      detectedSentiment = 'Negative';
      urgencyLevel = 'High';
      autoClassificationText = 'AI Classified: High Priority - Dispatched to Specialized Engineers';
    } else if (textLower.includes('healthy') || textLower.includes('salad') || textLower.includes('suggestion') || textLower.includes('improve')) {
      detectedSentiment = 'Neutral';
      urgencyLevel = 'Low';
      autoClassificationText = 'AI Classified: Advisory suggestion - Routed to Student Board Committee';
    }

    const newComplaint: Complaint = {
      id: `CMP${Math.floor(100 + Math.random() * 900)}`,
      studentName: activeStudent.name,
      roomNo: activeStudent.roomNo,
      category: complaintCategory,
      description: complaintDesc,
      appliedDate: new Date().toISOString().split('T')[0],
      status: 'Pending',
      sentiment: detectedSentiment,
      aiClassification: autoClassificationText,
      urgency: urgencyLevel
    };

    onAddComplaint(newComplaint);
    onAddNotice(`AI analyzed threat: Sentiment ${detectedSentiment}, Urgency: ${urgencyLevel}`, 'success');
    setComplaintDesc('');
  };

  // Simulates student paying due fees
  const handleFeePayment = () => {
    const payValue = parseFloat(paymentAmount);
    if (isNaN(payValue) || payValue <= 0 || payValue > feeStructure.dueAmount) {
      onAddNotice('Enter a valid pending amount', 'info');
      return;
    }

    onPayFee(payValue);
    setShowPaymentModal(false);
    onAddNotice(`Payment of ₹${payValue.toLocaleString()} settled successfully via Digital UPI Gateway!`, 'success');
  };

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-xl overflow-hidden min-h-[600px] flex flex-col md:flex-row">
      
      {/* Student Nav Sidebar */}
      <div className="md:w-64 bg-zinc-50 dark:bg-zinc-950 p-6 border-r border-zinc-200 dark:border-zinc-800 flex flex-col justify-between">
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <img 
              src={activeStudent.avatar} 
              alt={activeStudent.name} 
              className="w-12 h-12 rounded-full border-2 border-brand-primary object-cover"
            />
            <div>
              <h3 className="font-display font-semibold text-sm text-brand-charcoal dark:text-zinc-50">{activeStudent.name}</h3>
              <p className="text-[10px] text-brand-slate font-medium">{activeStudent.rollNo}</p>
              <div className="mt-1 inline-block px-2 py-0.5 rounded-full bg-brand-success/10 text-brand-success text-[9px] font-bold">
                ● In {activeStudent.roomNo}
              </div>
            </div>
          </div>

          <div className="space-y-1">
            {[
              { id: 'profile', label: 'My Bio Profile', icon: User },
              { id: 'room', label: 'Room & Utility', icon: Home },
              { id: 'leaves', label: 'Out/Leave Registry', icon: Briefcase, count: rohanLeaves.length },
              { id: 'fees', label: 'Fee Invoices', icon: CreditCard, unpaid: feeStructure.dueAmount > 0 },
              { id: 'complaints', label: 'Smart Complaints', icon: AlertTriangle, count: rohanComplaints.length },
              { id: 'qr', label: 'QR Gate Pass', icon: QrCode }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTabTab(tab.id as any)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left text-xs font-medium tracking-tight transition cursor-pointer ${
                  activeTab === tab.id 
                    ? 'bg-brand-primary text-white' 
                    : 'text-brand-slate dark:text-zinc-400 hover:bg-zinc-200/50 dark:hover:bg-zinc-800/40'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <tab.icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </div>
                {tab.count !== undefined && (
                  <span className={`px-1.5 py-0.5 rounded text-[8px] font-semibold ${activeTab === tab.id ? 'bg-white/30 text-white' : 'bg-zinc-200 dark:bg-zinc-800 text-brand-charcoal dark:text-zinc-300'}`}>
                    {tab.count}
                  </span>
                )}
                {tab.unpaid && (
                  <span className="w-2 h-2 rounded-full bg-brand-accent animate-ping" />
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="pt-6 border-t border-zinc-200 dark:border-zinc-800 text-left">
          <div className="text-[10px] text-brand-slate">HostelSphere Academic</div>
          <div className="text-[9px] font-mono mt-1 text-zinc-400">Node: Sandbox_Active</div>
        </div>
      </div>

      {/* Main Panel Content Area */}
      <div className="flex-1 p-6 md:p-8 bg-white dark:bg-zinc-900 text-brand-charcoal dark:text-zinc-100 text-left overflow-y-auto">
        
        {/* TAB 1: Profile */}
        {activeTab === 'profile' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center pb-4 border-b border-zinc-200 dark:border-zinc-800">
              <div>
                <h2 className="font-display text-xl font-bold tracking-tight text-brand-charcoal dark:text-zinc-50">Student Profile Card</h2>
                <p className="text-xs text-brand-slate dark:text-zinc-400">Verified institutional registration record</p>
              </div>
              <span className="text-[11px] font-mono bg-zinc-100 dark:bg-zinc-800 px-3 py-1 rounded-full text-brand-slate">
                ID: {activeStudent.id}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-5 bg-orange-50/20 dark:bg-zinc-950 border border-amber-100 dark:border-zinc-800 rounded-2xl space-y-4">
                <h3 className="font-display text-sm font-semibold text-brand-charcoal dark:text-zinc-100">Academic Details</h3>
                <div className="space-y-2.5 text-xs">
                  <div className="flex justify-between border-b border-zinc-100 dark:border-zinc-900 pb-1.5">
                    <span className="text-brand-slate">Full Registered Name</span>
                    <span className="font-medium text-brand-charcoal dark:text-zinc-200">{activeStudent.name}</span>
                  </div>
                  <div className="flex justify-between border-b border-zinc-100 dark:border-zinc-900 pb-1.5">
                    <span className="text-brand-slate">Roll Assignment</span>
                    <span className="font-mono text-brand-charcoal dark:text-zinc-200">{activeStudent.rollNo}</span>
                  </div>
                  <div className="flex justify-between border-b border-zinc-100 dark:border-zinc-900 pb-1.5">
                    <span className="text-brand-slate">Academic Branch</span>
                    <span className="font-medium text-brand-charcoal dark:text-zinc-200">{activeStudent.batch}</span>
                  </div>
                  <div className="flex justify-between border-b border-zinc-100 dark:border-zinc-900 pb-1.5">
                    <span className="text-brand-slate">Allocated Hostel Block</span>
                    <span className="font-medium text-brand-charcoal dark:text-zinc-200">{activeStudent.block}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-brand-slate">Contact Phone</span>
                    <span className="font-medium text-brand-charcoal dark:text-zinc-200">{activeStudent.phone}</span>
                  </div>
                </div>
              </div>

              <div className="p-5 bg-rose-50/10 dark:bg-zinc-950 border border-rose-100/30 dark:border-zinc-800 rounded-2xl space-y-4">
                <h3 className="font-display text-sm font-semibold text-brand-charcoal dark:text-zinc-100">Guardian & Emergency</h3>
                <div className="space-y-2.5 text-xs">
                  <div className="flex justify-between border-b border-zinc-100 dark:border-zinc-900 pb-1.5">
                    <span className="text-brand-slate">Parent/Guardian Name</span>
                    <span className="font-medium text-brand-charcoal dark:text-zinc-200">{activeStudent.parentName}</span>
                  </div>
                  <div className="flex justify-between border-b border-zinc-100 dark:border-zinc-900 pb-1.5">
                    <span className="text-brand-slate">Authorized Hotline</span>
                    <span className="font-medium text-brand-charcoal dark:text-zinc-200">{activeStudent.parentPhone}</span>
                  </div>
                  <div className="flex justify-between border-b border-zinc-100 dark:border-zinc-900 pb-1.5">
                    <span className="text-brand-slate">Registered Mail</span>
                    <span className="font-medium text-brand-charcoal dark:text-zinc-200">{activeStudent.parentEmail}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-brand-slate">Current Living Status</span>
                    <span className="font-medium px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 text-[10px]">
                      {activeStudent.status}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 bg-brand-primary/5 border border-brand-primary/10 rounded-xl flex items-center gap-3">
              <Sparkles className="w-5 h-5 text-brand-primary flex-shrink-0" />
              <p className="text-xs text-brand-slate dark:text-zinc-400">
                <strong>Warden Message:</strong> Be sure to keep your profile status current when preparing for out-of-bed night entries. All local gate entry sensors rely on your active registration state.
              </p>
            </div>
          </div>
        )}

        {/* TAB 2: Room Details */}
        {activeTab === 'room' && (
          <div className="space-y-6">
            <div className="pb-4 border-b border-zinc-200 dark:border-zinc-800">
              <h2 className="font-display text-xl font-bold tracking-tight text-brand-charcoal dark:text-zinc-50">Room & Smart Utilities</h2>
              <p className="text-xs text-brand-slate dark:text-zinc-400">Living quarter properties and telemetry</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-5 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl text-center">
                <span className="text-xs text-brand-slate">Room Number</span>
                <div className="text-3xl font-bold text-brand-primary font-display mt-2">{activeRoom.roomNo}</div>
                <div className="text-[10px] text-zinc-400 mt-1">{activeRoom.block}</div>
              </div>

              <div className="p-5 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl text-center">
                <span className="text-xs text-brand-slate">Sharing Structure</span>
                <div className="text-3xl font-bold text-brand-charcoal dark:text-zinc-100 font-display mt-2">{activeRoom.type}</div>
                <p className="text-[10px] text-zinc-400 mt-1">Rent: ₹{(activeRoom.feeAmount/10).toLocaleString()}/Mo included</p>
              </div>

              <div className="p-5 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl text-center relative overflow-hidden">
                <span className="text-xs text-brand-slate">Digital Utility Meter</span>
                <div className="text-3xl font-bold text-brand-success font-display mt-2 flex items-center justify-center gap-1">
                  <Zap className="w-5 h-5 text-brand-accent fill-brand-accent" />
                  {activeRoom.meterReading} <span className="text-xs font-mono text-brand-slate">kWh</span>
                </div>
                <span className="text-[9px] px-2 py-0.5 rounded-full bg-brand-success/10 text-brand-success font-bold mt-1 inline-block">
                  No Leak Anomalies
                </span>
              </div>
            </div>

            <div className="p-5 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl space-y-4">
              <h3 className="font-display text-sm font-semibold text-brand-charcoal dark:text-zinc-50">Roommates in {activeRoom.roomNo}</h3>
              <div className="space-y-3">
                {activeRoom.occupants.map((name, idx) => (
                  <div key={idx} className="flex justify-between items-center text-xs pb-3 border-b last:border-0 border-zinc-100 dark:border-zinc-900">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-brand-primary/10 text-brand-primary font-bold flex items-center justify-center text-xs">
                        {name[0]}
                      </div>
                      <span className="font-medium">{name}</span>
                    </div>
                    <span className="text-xs font-mono bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded text-brand-slate">
                      {idx === 0 ? 'Self (Rohan)' : 'Assigned Roommate'}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-5 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl space-y-3">
              <h3 className="font-display text-xs font-bold text-brand-charcoal dark:text-zinc-50 uppercase tracking-widest">Included Amenities</h3>
              <div className="flex flex-wrap gap-2">
                {activeRoom.amenities.map((item, idx) => (
                  <span key={idx} className="text-xs px-3 py-1 rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 font-medium">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: Leave Requests */}
        {activeTab === 'leaves' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center pb-4 border-b border-zinc-200 dark:border-zinc-800">
              <div>
                <h2 className="font-display text-xl font-bold tracking-tight text-brand-charcoal dark:text-zinc-50">Leave & Night-Out Requests</h2>
                <p className="text-xs text-brand-slate dark:text-zinc-400">Automated parent clearance and gate logs</p>
              </div>
            </div>

            {/* Quick interactive Leave Simulator */}
            <form onSubmit={handleApplyLeave} className="p-5 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl space-y-4">
              <h3 className="font-display text-sm font-semibold text-brand-charcoal dark:text-zinc-100 flex items-center gap-1.5">
                <Plus className="w-4 h-4 text-brand-primary" /> Apply for Virtual Out Pass
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[11px] font-bold uppercase text-brand-slate mb-1">Pass Category</label>
                  <select 
                    value={leaveType}
                    onChange={(e) => setLeaveType(e.target.value as any)}
                    className="w-full text-xs p-2.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-brand-charcoal dark:text-zinc-100"
                  >
                    <option value="Home">Home-Town Trip (Requires Parent OTP)</option>
                    <option value="Local">Local Outing (Requires Warden Gate approval)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase text-brand-slate mb-1">Out Date (From / Time)</label>
                  <input 
                    type="date"
                    value={leaveFrom}
                    onChange={(e) => setLeaveFrom(e.target.value)}
                    required
                    className="w-full text-xs p-2.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-brand-charcoal dark:text-zinc-100"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase text-brand-slate mb-1">Return Date (To Hour)</label>
                  <input 
                    type="date"
                    value={leaveTo}
                    onChange={(e) => setLeaveTo(e.target.value)}
                    required
                    className="w-full text-xs p-2.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-brand-charcoal dark:text-zinc-100"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase text-brand-slate mb-1">Affiliated Intention / Reason</label>
                <input 
                  type="text"
                  placeholder="e.g. Attending local book exhibition / visiting parents house"
                  value={leaveReason}
                  onChange={(e) => setLeaveReason(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-brand-charcoal dark:text-zinc-100"
                />
              </div>

              <div className="flex justify-end pt-2">
                <button 
                  type="submit"
                  className="px-5 py-2.5 bg-brand-primary hover:bg-opacity-90 text-white rounded-lg text-xs font-semibold inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" /> Submit to Warden Platform
                </button>
              </div>
            </form>

            <div className="space-y-3">
              <h3 className="font-display text-sm font-semibold text-brand-charcoal dark:text-zinc-100">Leave History Logs</h3>
              
              {rohanLeaves.length === 0 ? (
                <div className="p-6 text-center text-xs text-brand-slate">No leave records registered yet.</div>
              ) : (
                <div className="space-y-3">
                  {rohanLeaves.map((item) => (
                    <div key={item.id} className="p-4 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-xs space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-brand-charcoal dark:text-zinc-200">{item.type} Outing ({item.id})</span>
                        <div className="flex gap-2">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                            item.parentApproval === 'Approved' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                          }`}>
                            Parent: {item.parentApproval}
                          </span>
                          <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                            item.status === 'Approved' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' : item.status === 'Rejected' ? 'bg-red-100 text-red-800' : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                          }`}>
                            Warden: {item.status}
                          </span>
                        </div>
                      </div>
                      <p className="text-brand-slate dark:text-zinc-400 text-[11px]">{item.reason}</p>
                      <div className="flex justify-between text-[10px] text-zinc-400">
                        <span>Period: {item.fromDate} to {item.toDate}</span>
                        <span>Applied: {item.appliedDate}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 4: Fee Overview */}
        {activeTab === 'fees' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center pb-4 border-b border-zinc-200 dark:border-zinc-800">
              <div>
                <h2 className="font-display text-xl font-bold tracking-tight text-brand-charcoal dark:text-zinc-50">Academic Fee Statement</h2>
                <p className="text-xs text-brand-slate dark:text-zinc-400">Manage outstanding balances and semester bills</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-bold ${feeStructure.dueAmount > 0 ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300' : 'bg-emerald-100 text-emerald-850'}`}>
                {feeStructure.status}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-5 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl text-left">
                <span className="text-[10px] uppercase font-bold text-brand-slate block mb-1">Total Term Charge</span>
                <span className="text-2xl font-bold text-brand-charcoal dark:text-zinc-100 font-display">₹{feeStructure.totalAmount.toLocaleString()}</span>
                <span className="text-[10px] text-zinc-400 block mt-1">{feeStructure.termName}</span>
              </div>

              <div className="p-5 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl text-left">
                <span className="text-[10px] uppercase font-bold text-green-600 block mb-1">Amount Settled</span>
                <span className="text-2xl font-bold text-brand-success font-display">₹{feeStructure.paidAmount.toLocaleString()}</span>
                <span className="text-[10px] text-zinc-400 block mt-1">Cleared on {feeStructure.transactions[0]?.date}</span>
              </div>

              <div className="p-5 bg-rose-50/10 dark:bg-zinc-950 border border-brand-primary/20 rounded-2xl text-left relative">
                <span className="text-[10px] uppercase font-bold text-brand-primary block mb-1">Immediate Arrears</span>
                <span className="text-2xl font-bold text-brand-primary font-display">₹{feeStructure.dueAmount.toLocaleString()}</span>
                <span className="text-[10px] text-zinc-400 block mt-1">Payable by {feeStructure.dueDate}</span>
                {feeStructure.dueAmount > 0 && (
                  <button 
                    onClick={() => setShowPaymentModal(true)}
                    className="absolute right-5 bottom-4 px-3 py-1.5 bg-brand-primary hover:bg-opacity-95 text-white rounded-lg text-[10px] font-bold cursor-pointer"
                  >
                    Pay Off Bill
                  </button>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Charge Breakdown */}
              <div className="p-5 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl space-y-4">
                <h3 className="font-display text-sm font-semibold text-brand-charcoal dark:text-zinc-50">Invoice Breakdown</h3>
                <div className="space-y-2.5 text-xs">
                  <div className="flex justify-between pb-2 border-b border-zinc-100 dark:border-zinc-900">
                    <span className="text-brand-slate">Premium Rent (Double Sharing)</span>
                    <span className="font-mono">₹{feeStructure.breakdown.rent.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between pb-2 border-b border-zinc-100 dark:border-zinc-900">
                    <span className="text-brand-slate">Advanced Mess Deposit</span>
                    <span className="font-mono">₹{feeStructure.breakdown.mess.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between pb-2 border-b border-zinc-100 dark:border-zinc-900">
                    <span className="text-brand-slate">Utility Meter & Water Tax</span>
                    <span className="font-mono">₹{feeStructure.breakdown.utility.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between pb-2 border-b border-zinc-100 dark:border-zinc-900">
                    <span className="text-brand-slate">Common Amenities Charge</span>
                    <span className="font-mono">₹{feeStructure.breakdown.amenities.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between font-bold text-brand-primary pt-1 text-sm">
                    <span>Cumulative</span>
                    <span className="">₹{feeStructure.totalAmount.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Transactions list */}
              <div className="p-5 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl space-y-4">
                <h3 className="font-display text-sm font-semibold text-brand-charcoal dark:text-zinc-50">Settled Transactions</h3>
                {feeStructure.transactions.length === 0 ? (
                  <p className="text-xs text-brand-slate">No payments made yet.</p>
                ) : (
                  <div className="space-y-3">
                    {feeStructure.transactions.map((t) => (
                      <div key={t.id} className="p-3 bg-zinc-50 dark:bg-zinc-900/50 rounded-lg text-[11px] flex justify-between items-center border border-zinc-100 dark:border-zinc-800">
                        <div>
                          <div className="font-bold text-brand-charcoal dark:text-zinc-200">₹{t.amount.toLocaleString()} ({t.method})</div>
                          <div className="text-[9px] text-zinc-400">Ref: {t.reference}</div>
                        </div>
                        <div className="text-right">
                          <span className="px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 font-bold">Success</span>
                          <div className="text-[9px] text-zinc-400 mt-1">{t.date}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: Complaints (AI features listed here) */}
        {activeTab === 'complaints' && (
          <div className="space-y-6">
            <div className="pb-4 border-b border-zinc-200 dark:border-zinc-800">
              <h2 className="font-display text-xl font-bold tracking-tight text-brand-charcoal dark:text-zinc-50">Smart AI Complaint Registry</h2>
              <p className="text-xs text-brand-slate dark:text-zinc-400">Submit requests backed by local sentiment-threat checking auto categorization</p>
            </div>

            {/* Simulated Complaint Form */}
            <form onSubmit={handleApplyComplaint} className="p-5 bg-rose-50/10 dark:bg-zinc-950 border border-brand-primary/10 rounded-2xl space-y-4">
              <h3 className="font-display text-sm font-semibold text-brand-primary flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-brand-accent animate-spin" /> Log Urgent Maintenance
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold uppercase text-brand-slate mb-1">Issue Category</label>
                  <select 
                    value={complaintCategory}
                    onChange={(e) => setComplaintCategory(e.target.value as any)}
                    className="w-full text-xs p-2.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-brand-charcoal dark:text-zinc-100"
                  >
                    <option value="Electrical">Electrical (Fan/AC/Tubelight breakdown)</option>
                    <option value="Plumbing">Plumbing (Leakage/Clogged toilet/Water issue)</option>
                    <option value="Mess">Mess (Food hygiene/oil levels/raw supplies)</option>
                    <option value="Wi-Fi">Wi-Fi (Ping drops/slow speeds/authentication issues)</option>
                    <option value="Security">Security (Suspicious locks/corridor entries/theft)</option>
                    <option value="Housekeeping">Housekeeping (Damp mold/communal trash overflows)</option>
                    <option value="Other">Other general inquiry</option>
                  </select>
                </div>
                <div className="flex items-center text-[10px] text-brand-slate py-4">
                  <span>ℹ️ AI Analyzes description sentiment & severity instantly to route tickets directly to plumbers/electrician crews.</span>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase text-brand-slate mb-1">Detailed Symptoms / What is broken?</label>
                <textarea 
                  rows={3}
                  required
                  placeholder="e.g. Broken water conduit in washroom leaking persistently into B-block stairs. Or ceiling fan making constant squealing noise preventing sleep."
                  value={complaintDesc}
                  onChange={(e) => setComplaintDesc(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-brand-charcoal dark:text-zinc-100 placeholder:text-zinc-400"
                />
              </div>

              <div className="flex justify-between items-center">
                <span className="text-[10px] italic text-zinc-400">Auto-tagger: Analyzed prior patterns.</span>
                <button 
                  type="submit"
                  className="px-5 py-2.5 bg-brand-primary hover:bg-opacity-90 text-white rounded-lg text-xs font-semibold inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" /> Analyze & Register Complaint
                </button>
              </div>
            </form>

            {/* Complaints list */}
            <div className="space-y-4">
              <h3 className="font-display text-sm font-semibold text-brand-charcoal dark:text-zinc-50">Registered Logs</h3>
              {rohanComplaints.length === 0 ? (
                <div className="p-6 bg-zinc-50 dark:bg-zinc-950/20 text-center text-xs text-brand-slate rounded-xl">
                  No active reports made. Issues look resolved.
                </div>
              ) : (
                <div className="space-y-4">
                  {rohanComplaints.map((item) => (
                    <div key={item.id} className="p-4 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-xs space-y-3 shadow-sm hover:shadow-md transition">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-brand-charcoal dark:text-zinc-100">{item.category} (ID: {item.id})</span>
                            <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                              item.status === 'Resolved' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' : 'bg-amber-100 text-amber-800 dark:bg-amber-950'
                            }`}>
                              {item.status}
                            </span>
                          </div>
                          <span className="text-[10px] text-zinc-400 block mt-0.5 mt-1">Logged: {item.appliedDate}</span>
                        </div>
                        
                        <div className="text-right space-y-1">
                          <span className={`inline-block px-2 py-0.5 rounded text-[8px] font-semibold text-white uppercase ${
                            item.urgency === 'Critical' ? 'bg-red-500 animate-pulse' : item.urgency === 'High' ? 'bg-rose-500' : 'bg-gray-400'
                          }`}>
                            Urgency: {item.urgency}
                          </span>
                          <div className="text-[9px] text-brand-slate">
                            Sentiment: <strong className={item.sentiment === 'Negative' ? 'text-brand-primary' : 'text-brand-success'}>{item.sentiment}</strong>
                          </div>
                        </div>
                      </div>

                      <p className="text-brand-slate dark:text-zinc-300 text-xs leading-relaxed">{item.description}</p>
                      
                      {item.aiClassification && (
                        <div className="p-2.5 bg-purple-50 dark:bg-purple-950/20 text-[10px] rounded-lg border border-purple-100 dark:border-purple-900/30 text-purple-700 dark:text-purple-300 flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5 text-purple-650 flex-shrink-0 animate-pulse" />
                          <span><strong>AI Route Check:</strong> {item.aiClassification}</span>
                        </div>
                      )}

                      {item.adminComments && (
                        <div className="text-[11px] text-brand-charcoal dark:text-zinc-300 italic pl-3 border-l-2 border-brand-accent mt-2">
                          Warden Reply: {item.adminComments}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 6: QR Code pass */}
        {activeTab === 'qr' && (
          <div className="space-y-6 max-w-md mx-auto text-center">
            <div className="pb-4 border-b border-zinc-200 dark:border-zinc-800">
              <h2 className="font-display text-xl font-bold tracking-tight text-brand-charcoal dark:text-zinc-50">Student Entry Gate Pass</h2>
              <p className="text-xs text-brand-slate dark:text-zinc-400">Present this QR Code to wardens or campus gates</p>
            </div>

            {activeStudent.gatePassQr ? (
              <div className="glass-panel p-6 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-lg space-y-6 text-center">
                <div className="mx-auto w-48 h-48 bg-white border-4 border-brand-primary rounded-2xl flex flex-col items-center justify-center p-3 relative shadow-inner">
                  <QrCode className="w-full h-full text-brand-charcoal" />
                  <div className="absolute top-2 right-2 w-3.5 h-3.5 rounded-full bg-brand-success animate-ping" />
                  <div className="absolute top-2 right-2 w-3.5 h-3.5 rounded-full bg-brand-success" />
                </div>

                <div>
                  <h3 className="font-display font-bold text-lg text-brand-charcoal dark:text-zinc-100">{activeStudent.name}</h3>
                  <p className="text-xs text-brand-slate font-mono">{activeStudent.rollNo} (B-302)</p>
                  <div className="mt-2 text-xs font-mono text-zinc-400">Tokens ID: {activeStudent.gatePassQr}</div>
                </div>

                <div className="pt-4 border-t border-zinc-100 dark:border-zinc-850 space-y-1.5 text-xs text-brand-slate">
                  <div className="flex justify-between">
                    <span>Gate Status</span>
                    <span className="font-bold text-brand-success">Clear for check-out</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Token Expires</span>
                    <span className="font-bold text-rose-600">{activeStudent.gatePassExpires}</span>
                  </div>
                </div>

                <button 
                  onClick={() => onAddNotice('Gate pass token downloaded in PDF wallet mock format!', 'success')}
                  className="w-full py-3 bg-brand-primary hover:bg-opacity-95 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Download className="w-4 h-4" /> Download Digital Pass (.PKPASS)
                </button>
              </div>
            ) : (
              <div className="p-8 text-center space-y-4">
                <p className="text-xs text-brand-slate">Your active biometric pass is suspended because of pending approved leave statuses.</p>
                <button 
                  onClick={() => setActiveTabTab('leaves')}
                  className="px-4 py-2 bg-brand-primary text-white text-xs rounded-xl"
                >
                  Apply Leave Out First
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Fee Payment Dialog Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 max-w-sm w-full border border-zinc-200 dark:border-zinc-800 space-y-4 text-left">
            <div className="flex justify-between items-center">
              <span className="font-display font-semibold text-brand-charcoal dark:text-zinc-100">Settlement Gateway</span>
              <button onClick={() => setShowPaymentModal(false)} className="p-1 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800">
                <X className="w-4 h-4 text-zinc-400" />
              </button>
            </div>
            
            <p className="text-xs text-brand-slate">
              Review remaining balance for <strong>{feeStructure.termName}</strong> before committing digital transaction routing.
            </p>

            <div className="space-y-1 text-xs">
              <span className="text-brand-slate text-[11px] font-bold block">Paying Sum (₹)</span>
              <input 
                type="number"
                value={paymentAmount}
                onChange={(e) => setPaymentAmount(e.target.value)}
                className="w-full text-xs p-2.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 font-mono"
              />
            </div>

            <div className="pt-2 flex gap-2">
              <button 
                onClick={() => setShowPaymentModal(false)}
                className="flex-1 py-2.5 border border-zinc-200 dark:border-zinc-800 text-xs rounded-lg font-medium text-brand-slate dark:text-zinc-300"
              >
                Go Back
              </button>
              <button 
                onClick={handleFeePayment}
                className="flex-1 py-2.5 bg-brand-primary hover:bg-opacity-95 text-white text-xs rounded-lg font-bold"
              >
                Confirm UPI Pay
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
