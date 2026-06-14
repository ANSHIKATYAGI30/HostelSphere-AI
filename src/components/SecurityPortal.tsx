import React, { useState } from 'react';
import { 
  Shield, 
  QrCode, 
  Users, 
  FileText, 
  Check, 
  X, 
  Clock, 
  FileCheck, 
  UserPlus, 
  MapPin,
  Sparkles
} from 'lucide-react';
import { Visitor, StudentProfile } from '../types';

interface SecurityPortalProps {
  onAddNotice: (msg: string, type: 'info' | 'success') => void;
  visitors: Visitor[];
  onAddVisitor: (visitor: Visitor) => void;
  onCheckInOutVisitor: (visitorId: string, type: 'entry' | 'exit') => void;
  students: StudentProfile[];
}

export default function SecurityPortal({
  onAddNotice,
  visitors,
  onAddVisitor,
  onCheckInOutVisitor,
  students
}: SecurityPortalProps) {
  const [securitySegment, setSecuritySegment] = useState<'qr-verify' | 'visitors' | 'gatelogs'>('qr-verify');

  // Interactive QR terminal Simulation state
  const [qrInputPayload, setQrInputPayload] = useState('');
  const [scanResult, setScanResult] = useState<{
    success: boolean;
    message: string;
    student?: StudentProfile;
  } | null>(null);

  // New Visitor register formulation
  const [vName, setVName] = useState('');
  const [vRelation, setVRelation] = useState('Father');
  const [vStudentName, setVStudentName] = useState('');
  const [vStudentRoll, setVStudentRoll] = useState('');
  const [vPhone, setVPhone] = useState('');
  const [vPurpose, setVPurpose] = useState('');

  const handleSimulateScan = (payload: string) => {
    setQrInputPayload(payload);
    
    // Check if matching any students active gate pass
    const matchedStudent = students.find(s => s.gatePassQr === payload);

    if (matchedStudent) {
      if (matchedStudent.status === 'On-Leave') {
        setScanResult({
          success: false,
          message: 'ALERT: Resident has active approved hometown leave. Campus checkout is pre-authorized, but double check baggage.',
          student: matchedStudent
        });
        onAddNotice(`Checked leave status for student ${matchedStudent.name}`, 'info');
      } else if (matchedStudent.gatePassQr === 'PASS-STU002-G104-2026') {
        // Mock expired/out pass warning
        setScanResult({
          success: false,
          message: 'WARNING: Late entry token. Student is coming in after authorized curfew hour 21:30.',
          student: matchedStudent
        });
        onAddNotice(`Late entry flag logged for student ${matchedStudent.name}`, 'info');
      } else {
        setScanResult({
          success: true,
          message: 'ACCESS GRANTED: Gate Pass verified. QR token is valid, active, and institution approved.',
          student: matchedStudent
        });
        onAddNotice(`Successful QR gate scan! Checked-in student ${matchedStudent.name}`, 'success');
      }
    } else {
      setScanResult({
        success: false,
        message: 'ACCESS DENIED: Decryption error. The scanned token is expired, tampered, or unregistered.'
      });
      onAddNotice('Invalid gate pass scanned', 'info');
    }
  };

  const handleCreateVisitor = (e: React.FormEvent) => {
    e.preventDefault();
    if (!vName || !vStudentName || !vPhone) {
      onAddNotice('Please fill key visitor fields', 'info');
      return;
    }

    const newV: Visitor = {
      id: `VIS${Math.floor(100 + Math.random() * 900)}`,
      name: vName,
      relationship: vRelation,
      studentName: vStudentName,
      studentRoll: vStudentRoll || '2023CSB---',
      phone: vPhone,
      plannedDate: new Date().toISOString().split('T')[0],
      status: 'Planned',
      purpose: vPurpose || 'Personal meet',
      passId: `PASS-${Math.floor(1000 + Math.random() * 9000)}`
    };

    onAddVisitor(newV);
    setVName('');
    setVStudentName('');
    setVStudentRoll('');
    setVPhone('');
    setVPurpose('');
    onAddNotice(`Logged planning pass ${newV.passId} for visitor ${newV.name} successfully!`, 'success');
  };

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-xl overflow-hidden min-h-[580px] flex flex-col md:flex-row">
      {/* Security Sidebar */}
      <div className="md:w-64 bg-zinc-50 dark:bg-zinc-950 p-6 border-r border-zinc-200 dark:border-zinc-800 flex flex-col justify-between">
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-brand-success" />
            <div>
              <h3 className="font-display font-semibold text-sm text-brand-charcoal dark:text-zinc-50">Officer Balwan Singh</h3>
              <span className="text-[10px] text-zinc-400 font-bold uppercase block tracking-wider">Campus Gate Duty</span>
            </div>
          </div>

          <div className="space-y-1">
            {[
              { id: 'qr-verify', label: 'QR Scan Terminal', icon: QrCode },
              { id: 'visitors', label: 'Visitor Logs', icon: Users, count: visitors.filter(v => v.status === 'Inside').length || undefined },
              { id: 'gatelogs', label: 'Entry/Exit Archives', icon: FileText }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setSecuritySegment(tab.id as any)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left text-xs font-semibold tracking-tight transition cursor-pointer ${
                  securitySegment === tab.id 
                    ? 'bg-brand-success text-white font-bold' 
                    : 'text-brand-slate dark:text-zinc-400 hover:bg-zinc-200/50 dark:hover:bg-zinc-800/40'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <tab.icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </div>
                {tab.count !== undefined && (
                  <span className={`px-1.5 py-0.5 rounded text-[8px] font-bold ${activeSegmentClassForCount(securitySegment, tab.id)}`}>
                    {tab.count} Inside
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="pt-6 border-t border-zinc-200 dark:border-zinc-850 text-left">
          <div className="text-[10px] text-zinc-400">Terminal ID: GATE_01A</div>
          <div className="text-[9px] text-brand-slate font-mono mt-1">HostelSphere Gate API</div>
        </div>
      </div>

      {/* Main Panel */}
      <div className="flex-1 p-6 md:p-8 text-brand-charcoal dark:text-zinc-100 text-left overflow-y-auto">
        
        {/* TAB 1: QR Verification Terminal simulation */}
        {securitySegment === 'qr-verify' && (
          <div className="space-y-6">
            <div className="pb-4 border-b border-zinc-200 dark:border-zinc-850">
              <h2 className="font-display text-xl font-bold tracking-tight text-brand-charcoal dark:text-zinc-50">Gate QR Verification Terminal</h2>
              <p className="text-xs text-brand-slate dark:text-zinc-400">Scan temporary digital passes carried by exiting or entering residents</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Scan emulator trigger */}
              <div className="p-5 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl space-y-4">
                <h3 className="font-display text-xs uppercase tracking-widest font-bold text-zinc-450">Biometric Scan Simulator</h3>
                <p className="text-xs text-brand-slate">
                  Click any student profile below to simulate scanning their mobile app QR pass.
                </p>

                <div className="space-y-2.5">
                  <button 
                    onClick={() => handleSimulateScan('PASS-STU001-B302-2026')}
                    className="w-full p-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs text-left rounded-xl hover:border-brand-primary cursor-pointer flex justify-between items-center transition"
                  >
                    <div>
                      <strong>Rohan Sharma (Double B-302)</strong>
                      <div className="text-[10px] text-zinc-400">Pass Token: PASS-STU001-B302-2026</div>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-50 text-emerald-800">Clear Card</span>
                  </button>

                  <button 
                    onClick={() => handleSimulateScan('PASS-STU002-G104-2026')}
                    className="w-full p-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs text-left rounded-xl hover:border-brand-primary cursor-pointer flex justify-between items-center transition"
                  >
                    <div>
                      <strong>Ananya Iyer (Single G-104)</strong>
                      <div className="text-[10px] text-zinc-400">Pass Token: PASS-STU002-G104-2026</div>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-amber-50 text-amber-800">Late curfews</span>
                  </button>

                  <button 
                    onClick={() => handleSimulateScan('INVALID-CODE-9854')}
                    className="w-full p-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs text-left rounded-xl hover:border-red-400 cursor-pointer flex justify-between items-center transition"
                  >
                    <div>
                      <strong>Simulate Fake/Unregistered Pass</strong>
                      <div className="text-[10px] text-zinc-400">Token: INVALID-CODE-9854</div>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-red-50 text-red-800">Tampered</span>
                  </button>
                </div>
              </div>

              {/* Scan feedback dashboard display */}
              <div className="space-y-4">
                <h3 className="font-display text-xs uppercase tracking-widest font-bold text-zinc-450">Handheld Display Output</h3>
                
                {scanResult ? (
                  <div className={`p-6 rounded-2xl border text-center space-y-4 ${
                    scanResult.success 
                      ? 'bg-emerald-50/10 dark:bg-zinc-950/20 border-brand-success' 
                      : 'bg-rose-50/10 dark:bg-zinc-950/20 border-brand-primary'
                  }`}>
                    <div className="mx-auto w-16 h-16 rounded-full flex items-center justify-center text-white font-bold" style={{
                      backgroundColor: scanResult.success ? '#81912F' : '#E03F4F'
                    }}>
                      {scanResult.success ? <Check className="w-8 h-8" /> : <X className="w-8 h-8" />}
                    </div>

                    <div className="space-y-1">
                      <h4 className="font-display font-semibold text-sm tracking-tight">
                        {scanResult.success ? 'Resident Approved' : 'Attention Guard Alert'}
                      </h4>
                      <p className="text-xs text-brand-slate leading-relaxed">{scanResult.message}</p>
                    </div>

                    {scanResult.student && (
                      <div className="p-3 bg-zinc-50 dark:bg-zinc-905 rounded-xl border text-left text-xs space-y-1.5 border-zinc-200/50">
                        <div className="flex justify-between font-bold">
                          <span>Name: {scanResult.student.name}</span>
                          <span>Roll: {scanResult.student.rollNo}</span>
                        </div>
                        <div>Block: {scanResult.student.block} (Room {scanResult.student.roomNo})</div>
                        <div className="text-[10px] text-brand-slate flex justify-between">
                          <span>Guardian Contact: {scanResult.student.parentPhone}</span>
                          <span className="font-mono text-zinc-450">Gate pass payload validated</span>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="p-10 border border-dashed border-zinc-200 dark:border-zinc-800 rounded-2xl text-center text-xs text-brand-slate flex flex-col items-center justify-center h-48">
                    <QrCode className="w-10 h-10 text-zinc-200 animate-pulse mb-3" />
                    <span>Awaiting active QR payload feed from simulator gate swipe...</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: Visitor Registry */}
        {securitySegment === 'visitors' && (
          <div className="space-y-6">
            <div className="pb-4 border-b border-zinc-200 dark:border-zinc-850">
              <h2 className="font-display text-xl font-bold tracking-tight text-brand-charcoal dark:text-zinc-50">Visitor Passes & Verification</h2>
              <p className="text-xs text-brand-slate dark:text-zinc-400">Log entry or exit of parents, guest students, or authorized field technicians</p>
            </div>

            {/* Register new dynamic visitor logs */}
            <form onSubmit={handleCreateVisitor} className="p-5 bg-zinc-50 dark:bg-zinc-950 border border-zinc-205 dark:border-zinc-850 rounded-2xl space-y-4">
              <h3 className="font-display text-xs uppercase tracking-widest font-bold text-zinc-450 flex items-center gap-1">
                <UserPlus className="w-4 h-4 text-brand-success" /> Log New External Visitor Pass
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                <div>
                  <label className="block text-[11px] font-bold text-brand-slate uppercase mb-1">Visitor Full Name</label>
                  <input 
                    type="text"
                    required
                    placeholder="e.g. Alok Mehta"
                    value={vName}
                    onChange={(e) => setVName(e.target.value)}
                    className="w-full text-xs p-2.5 bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 text-brand-charcoal dark:text-zinc-100"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-brand-slate uppercase mb-1">Relationship / Role</label>
                  <select 
                    value={vRelation}
                    onChange={(e) => setVRelation(e.target.value)}
                    className="w-full text-xs p-2.5 bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 text-brand-charcoal dark:text-zinc-100"
                  >
                    <option value="Father">Father</option>
                    <option value="Mother">Mother</option>
                    <option value="Friend">Friend / Academic Group</option>
                    <option value="Plumber">Electrician/Technician</option>
                    <option value="Delivery">Delivery / Courier Agent</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-brand-slate uppercase mb-1 font-bold text-brand-primary">Student to Visit Name</label>
                  <input 
                    type="text"
                    required
                    placeholder="e.g. Kabir Mehta"
                    value={vStudentName}
                    onChange={(e) => setVStudentName(e.target.value)}
                    className="w-full text-xs p-2.5 bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 text-brand-charcoal dark:text-zinc-100"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                <div>
                  <label className="block text-[11px] font-bold text-brand-slate uppercase mb-1">Student Roll Number</label>
                  <input 
                    type="text"
                    placeholder="e.g. 2024MEB015"
                    value={vStudentRoll}
                    onChange={(e) => setVStudentRoll(e.target.value)}
                    className="w-full text-xs p-2.5 bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 text-brand-charcoal"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-brand-slate uppercase mb-1">Visitor Phone Contact</label>
                  <input 
                    type="text"
                    required
                    placeholder="e.g. +91 99990 44332"
                    value={vPhone}
                    onChange={(e) => setVPhone(e.target.value)}
                    className="w-full text-xs p-2.5 bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 text-brand-charcoal"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-brand-slate uppercase mb-1">Purpose of entry</label>
                  <input 
                    type="text"
                    placeholder="e.g. Delivering clinical medicine"
                    value={vPurpose}
                    onChange={(e) => setVPurpose(e.target.value)}
                    className="w-full text-xs p-2.5 bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 text-brand-charcoal"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button 
                  type="submit"
                  className="px-5 py-2.5 bg-brand-success hover:bg-opacity-95 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
                >
                  <UserPlus className="w-4 h-4" /> Issue Gate Slip Pass
                </button>
              </div>
            </form>

            <div className="space-y-4">
              <h3 className="font-display text-sm font-semibold text-brand-charcoal dark:text-zinc-100">Live Visitor Registry Status</h3>
              
              <div className="space-y-3">
                {visitors.map((v) => (
                  <div key={v.id} className="p-4 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-xs space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <div>
                        <strong className="text-zinc-800 dark:text-zinc-100">{v.name}</strong> 
                        <span className="text-brand-slate ml-2">({v.relationship} of {v.studentName})</span>
                      </div>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        v.status === 'Checked-Out' ? 'bg-gray-100 text-gray-700' : v.status === 'Inside' ? 'bg-lime-100 text-lime-900' : 'bg-blue-50 text-blue-800'
                      }`}>
                        {v.status.toUpperCase()}
                      </span>
                    </div>

                    <p className="text-brand-slate text-[11px]">Reason: {v.purpose} • Contact: <span className="font-mono">{v.phone}</span></p>

                    <div className="flex justify-between items-center text-[10px] text-zinc-400 pt-2 border-t border-zinc-100 dark:border-zinc-900">
                      <span>Pass ID: <strong className="font-mono">{v.passId}</strong></span>
                      <div className="flex gap-2">
                        {v.status === 'Planned' && (
                          <button 
                            onClick={() => {
                              onCheckInOutVisitor(v.id, 'entry');
                              onAddNotice(`Logged gate CHECK-IN for customer ${v.name}`, 'success');
                            }}
                            className="bg-brand-success text-white px-2 py-1 rounded text-[10px] font-bold cursor-pointer"
                          >
                            Mark Inside Campus
                          </button>
                        )}
                        {v.status === 'Inside' && (
                          <button 
                            onClick={() => {
                              onCheckInOutVisitor(v.id, 'exit');
                              onAddNotice(`Logged gate CHECK-OUT for customer ${v.name}`, 'info');
                            }}
                            className="bg-brand-primary text-white px-2 py-1 rounded text-[10px] font-bold cursor-pointer"
                          >
                            Mark Checked-Out
                          </button>
                        )}
                        {v.status !== 'Planned' && (
                          <span>Logs: Entry {v.entryTime || 'N/A'} {v.exitTime ? `• Exit ${v.exitTime}` : ''}</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: Entry Exit general gate logs */}
        {securitySegment === 'gatelogs' && (
          <div className="space-y-6">
            <div className="pb-4 border-b border-zinc-200 dark:border-zinc-850">
              <h2 className="font-display text-xl font-bold tracking-tight text-brand-charcoal dark:text-zinc-50">Gate Entry/Exit Logs Archive</h2>
              <p className="text-xs text-brand-slate dark:text-zinc-400">Chronological history of security scans logged during checkout curfews</p>
            </div>

            <div className="p-4 bg-zinc-50 dark:bg-zinc-950 border border-zinc-20 border-dashed rounded-xl space-y-3">
              <h3 className="font-display text-xs uppercase tracking-widest font-bold text-zinc-400">Live Activity Feed</h3>
              
              <div className="space-y-2 text-xs font-mono">
                <div className="p-2 border-l-2 border-brand-success bg-white dark:bg-zinc-900 rounded-r shadow-sm">
                  <span className="text-brand-success font-bold">[Scan Logged]</span> 14:15 - Resident Rohan Sharma (STU001) checked in. Card token PASS-STU001 verified.
                </div>
                <div className="p-2 border-l-2 border-brand-primary bg-white dark:bg-zinc-900 rounded-r shadow-sm">
                  <span className="text-brand-primary font-bold">[Late Trigger]</span> 15:30 - Resident Ananya Iyer (STU002) curfew breach flag cleared by Warden special memo.
                </div>
                <div className="p-2 border-l-2 border-blue-500 bg-white dark:bg-zinc-900 rounded-r shadow-sm">
                  <span className="text-blue-500 font-bold">[Visitor Entry]</span> 09:30 - Father Alok Mehta (PASS-9824) logged on-gate. Purpose: Clothing deliver.
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Quick helper
function activeSegmentClassForCount(current: string, tab: string) {
  return current === tab ? 'bg-white text-zinc-900' : 'bg-brand-success/15 text-brand-success';
}
