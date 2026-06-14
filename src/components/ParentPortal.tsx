import React, { useState } from 'react';
import { 
  HeartHandshake, 
  User, 
  Briefcase, 
  CreditCard, 
  MapPin, 
  Phone, 
  Check, 
  X, 
  AlertTriangle,
  Clock,
  Sparkles
} from 'lucide-react';
import { 
  StudentProfile, 
  LeaveRequest, 
  FeeStructure 
} from '../types';

interface ParentPortalProps {
  onAddNotice: (msg: string, type: 'info' | 'success') => void;
  activeStudent: StudentProfile;
  leaveRequests: LeaveRequest[];
  onApproveLeaveParent: (leaveId: string, approval: 'Approved' | 'Rejected') => void;
  feeStructure: FeeStructure;
}

export default function ParentPortal({
  onAddNotice,
  activeStudent,
  leaveRequests,
  onApproveLeaveParent,
  feeStructure
}: ParentPortalProps) {
  const [parentName] = useState('Ramesh Sharma');
  const [activeSegment, setActiveSegment] = useState<'status' | 'billing' | 'parental-approvals'>('status');

  // Filter out any leave requests related to this student that need parent consent
  const studentLeavesPendingConsent = leaveRequests.filter(
    l => l.studentId === activeStudent.id && l.parentApproval === 'Pending'
  );

  const studentLeavesApprovedConsent = leaveRequests.filter(
    l => l.studentId === activeStudent.id && l.parentApproval !== 'Pending'
  );

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-xl overflow-hidden min-h-[500px] flex flex-col md:flex-row">
      {/* Parent Sidebar */}
      <div className="md:w-64 bg-zinc-50 dark:bg-zinc-950 p-6 border-r border-zinc-200 dark:border-zinc-800 flex flex-col justify-between">
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <HeartHandshake className="w-6 h-6 text-brand-accent" />
            <div>
              <h3 className="font-display font-semibold text-sm text-brand-charcoal dark:text-zinc-50">{parentName}</h3>
              <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider">Guardian Dashboard</span>
            </div>
          </div>

          <div className="p-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-850 rounded-xl space-y-1.5 text-[11px]">
            <span className="text-zinc-400 block font-bold uppercase">Associated Ward</span>
            <div className="font-bold text-brand-charcoal dark:text-zinc-100">{activeStudent.name}</div>
            <div className="text-[10px] text-brand-slate font-mono">{activeStudent.rollNo}</div>
          </div>

          <div className="space-y-1">
            {[
              { id: 'status', label: 'Student Gate Status', icon: MapPin },
              { id: 'billing', label: 'Dues & Fees Statement', icon: CreditCard, count: feeStructure.dueAmount > 0 ? 'DUE' : undefined },
              { id: 'parental-approvals', label: 'Parent Consent Hub', icon: Briefcase, count: studentLeavesPendingConsent.length || undefined }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveSegment(tab.id as any)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left text-xs font-medium tracking-tight transition cursor-pointer ${
                  activeSegment === tab.id 
                    ? 'bg-brand-accent text-zinc-950 font-bold' 
                    : 'text-brand-slate dark:text-zinc-400 hover:bg-zinc-200/50 dark:hover:bg-zinc-800/40'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <tab.icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </div>
                {tab.count !== undefined && (
                  <span className={`px-1.5 py-0.5 rounded text-[8px] font-bold ${
                    tab.count === 'DUE' ? 'bg-red-500 text-white animate-pulse' : 'bg-brand-accent/20 text-brand-charcoal'
                  }`}>
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="pt-6 border-t border-zinc-200 dark:border-zinc-850 text-left">
          <div className="text-[10px] text-zinc-400">Guardian Session Active</div>
          <div className="text-[9px] text-brand-slate font-mono mt-1">SSL Encrypted Portal</div>
        </div>
      </div>

      {/* Main Panel */}
      <div className="flex-1 p-6 md:p-8 text-brand-charcoal dark:text-zinc-100 text-left">
        {/* SEGMENT 1: Real-time status */}
        {activeSegment === 'status' && (
          <div className="space-y-6">
            <div className="pb-4 border-b border-zinc-200 dark:border-zinc-800">
              <h2 className="font-display text-xl font-bold tracking-tight text-brand-charcoal dark:text-zinc-50">Real-time Residency Tracking</h2>
              <p className="text-xs text-brand-slate dark:text-zinc-400">Verifying security gates check-in logs and active location status</p>
            </div>

            <div className="p-6 bg-orange-50/10 dark:bg-zinc-950 border border-brand-accent/20 rounded-2xl flex flex-col md:flex-row gap-6 items-center">
              <div className="w-20 h-20 rounded-full border-4 border-brand-accent flex items-center justify-center bg-white overflow-hidden shadow">
                <img src={activeStudent.avatar} alt="Student avatar" className="w-full h-full object-cover" />
              </div>
              <div className="space-y-1.5 flex-1 text-center md:text-left">
                <span className="text-[10px] uppercase font-bold text-zinc-400 tracking-wider">Current Presence</span>
                <div className="text-2xl font-bold font-display text-brand-success flex items-center justify-center md:justify-start gap-2">
                  <span className="w-3.5 h-3.5 rounded-full bg-brand-success animate-ping" />
                  Presumed In Campus Bounds
                </div>
                <p className="text-xs text-brand-slate max-w-md">
                  Resident {activeStudent.name} is checked into the Aravalli Block (Room {activeStudent.roomNo}) with last gate scanner biometric register tracked.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-5 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl space-y-4">
                <h3 className="font-display text-sm font-semibold text-brand-charcoal dark:text-zinc-100">Ward Identity Card</h3>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between pb-1.5 border-b border-zinc-100 dark:border-zinc-900">
                    <span className="text-brand-slate">Institutional Branch</span>
                    <span>{activeStudent.batch}</span>
                  </div>
                  <div className="flex justify-between pb-1.5 border-b border-zinc-100 dark:border-zinc-900">
                    <span className="text-brand-slate">Roll Number No</span>
                    <span className="font-mono">{activeStudent.rollNo}</span>
                  </div>
                  <div className="flex justify-between pb-1.5 border-b border-zinc-100 dark:border-zinc-900">
                    <span className="text-brand-slate">Assigned Warden</span>
                    <span className="font-semibold text-brand-primary">Prof. S.K. Bhatia</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-brand-slate">Warden Hotline</span>
                    <span>+91 94140 98554</span>
                  </div>
                </div>
              </div>

              {/* Automatic QR Pass telemetry info */}
              <div className="p-5 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-850 rounded-2xl space-y-3 flex flex-col justify-between">
                <div>
                  <h3 className="font-display text-sm font-semibold text-brand-charcoal dark:text-zinc-100">Valid Entry Token</h3>
                  <p className="text-xs text-brand-slate dark:text-zinc-400 mt-2">
                    A digital gate pass QR is generated inside the student app for evening entries expiring at <strong className="text-rose-500">21:30 Today</strong>.
                  </p>
                </div>
                <div className="text-[10px] text-zinc-400 italic">
                  * All entry and exit telemetry events trigger standard email summaries directly to parent inbox.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SEGMENT 2: Fees breakdown */}
        {activeSegment === 'billing' && (
          <div className="space-y-6">
            <div className="pb-4 border-b border-zinc-200 dark:border-zinc-800">
              <h2 className="font-display text-xl font-bold tracking-tight text-brand-charcoal dark:text-zinc-50">Guardian Billing Hub</h2>
              <p className="text-xs text-brand-slate dark:text-zinc-400">Audit tuition and residential financial invoices</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl text-left space-y-4">
                <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest block">Autumn Semester Billing Status</span>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs pb-2 border-b border-zinc-100 dark:border-zinc-900">
                    <span className="text-brand-slate">Institutional Tuition + Mess Rate</span>
                    <span className="font-mono">₹{feeStructure.totalAmount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-xs pb-2 border-b border-zinc-100 dark:border-zinc-900">
                    <span className="text-brand-slate">Amount Paid</span>
                    <span className="font-mono text-green-700 dark:text-green-500">-₹{feeStructure.paidAmount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between font-bold text-sm text-brand-primary">
                    <span>Unsettled Arrears</span>
                    <span>₹{feeStructure.dueAmount.toLocaleString()}</span>
                  </div>
                </div>

                {feeStructure.dueAmount > 0 ? (
                  <div className="p-3 bg-amber-50 dark:bg-rose-950/20 text-[10px] rounded-xl border border-amber-200 text-brand-slate dark:text-zinc-300">
                    ⚠️ An outstanding fee of <strong>₹{feeStructure.dueAmount.toLocaleString()}</strong> is due. Please coordinate with Rohan for UPI transaction clearance.
                  </div>
                ) : (
                  <div className="p-3 bg-emerald-50 dark:bg-emerald-950/20 text-[10px] rounded-xl text-green-800 border border-emerald-200">
                    🎉 Excellent! All current term fees are paid. No arrears pending.
                  </div>
                )}
              </div>

              {/* Verified Digital Ledger */}
              <div className="p-5 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl space-y-4">
                <h3 className="font-display text-sm font-semibold text-brand-charcoal dark:text-zinc-100">Verified Payment Transactions</h3>
                {feeStructure.transactions.map((t) => (
                  <div key={t.id} className="p-3 bg-zinc-50 dark:bg-zinc-900/50 rounded-xl text-[11px] border border-zinc-150 dark:border-zinc-850 flex justify-between items-center">
                    <div>
                      <div className="font-bold text-brand-charcoal dark:text-zinc-100">₹{t.amount.toLocaleString()} ({t.method})</div>
                      <div className="text-[9px] text-zinc-400">Reference: {t.reference}</div>
                    </div>
                    <span className="text-[10px] font-mono text-brand-slate">{t.date}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* SEGMENT 3: Parental approvals and out pass consent */}
        {activeSegment === 'parental-approvals' && (
          <div className="space-y-6">
            <div className="pb-4 border-b border-zinc-200 dark:border-zinc-800">
              <h2 className="font-display text-xl font-bold tracking-tight text-brand-charcoal dark:text-zinc-50">Parental Leave Consent Hub</h2>
              <p className="text-xs text-brand-slate dark:text-zinc-400">Warden security policies require prompt parent authorization for all overnight hometown slips</p>
            </div>

            {/* Pending approvals card */}
            <div className="space-y-4">
              <h3 className="font-display text-sm font-semibold text-brand-charcoal dark:text-zinc-50">Pending Outing Consent Appeals</h3>
              {studentLeavesPendingConsent.length === 0 ? (
                <div className="p-8 text-center bg-zinc-50 dark:bg-zinc-950 rounded-2xl text-xs text-brand-slate border border-zinc-200 dark:border-zinc-805">
                  <Check className="w-8 h-8 text-brand-success mx-auto mb-2" />
                  No leave requests are currently pending your parent consent check. Rohan is fully tracked!
                </div>
              ) : (
                <div className="space-y-4">
                  {studentLeavesPendingConsent.map((req) => (
                    <div key={req.id} className="p-5 bg-amber-50/10 dark:bg-zinc-950 border border-brand-accent/30 rounded-2xl space-y-4">
                      <div className="flex justify-between items-start text-xs">
                        <div>
                          <span className="px-2.5 py-0.5 rounded bg-brand-accent/25 text-brand-primary font-bold text-[9px] block w-fit mb-1">
                            OVERNIGHT {req.type.toUpperCase()} PASS
                          </span>
                          <span className="text-sm font-bold text-brand-charcoal dark:text-zinc-100">Reason: {req.reason}</span>
                        </div>
                        <div className="text-[10px] font-mono text-zinc-400">Slip ID: {req.id}</div>
                      </div>

                      <div className="p-3 bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-xl space-y-1 text-xs">
                        <div><strong>From Date:</strong> {req.fromDate}</div>
                        <div><strong>Return Date:</strong> {req.toDate}</div>
                      </div>

                      <div className="flex justify-end gap-2.5 pt-2">
                        <button 
                          onClick={() => {
                            onApproveLeaveParent(req.id, 'Rejected');
                            onAddNotice('Denied leave slip hometown transit', 'info');
                          }}
                          className="px-4 py-2 border border-red-200 text-red-700 hover:bg-red-50 text-xs rounded-xl cursor-pointer"
                        >
                          Decline Request
                        </button>
                        <button 
                          onClick={() => {
                            onApproveLeaveParent(req.id, 'Approved');
                            onAddNotice('Parental Approval granted successfully!', 'success');
                          }}
                          className="px-5 py-2 bg-brand-success hover:bg-opacity-95 text-white text-xs rounded-xl font-bold flex items-center gap-1.5 cursor-pointer"
                        >
                          <Check className="w-4 h-4" /> Grant Parental Consent
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Approved logs */}
            <div className="space-y-4 pt-4">
              <h3 className="font-display text-sm font-semibold text-brand-charcoal dark:text-zinc-50">Historical Consents Granted</h3>
              {studentLeavesApprovedConsent.length === 0 ? (
                <p className="text-xs text-brand-slate">No historical consents granted yet.</p>
              ) : (
                <div className="space-y-3">
                  {studentLeavesApprovedConsent.map((req) => (
                    <div key={req.id} className="p-4 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-xs flex justify-between items-center">
                      <div>
                        <div className="font-bold text-brand-charcoal dark:text-zinc-200">{req.reason}</div>
                        <div className="text-[10px] text-zinc-450 mt-1">Period: {req.fromDate} to {req.toDate}</div>
                      </div>
                      <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold ${
                        req.parentApproval === 'Approved' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' : 'bg-rose-100 text-rose-800'
                      }`}>
                        Consent: {req.parentApproval}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
