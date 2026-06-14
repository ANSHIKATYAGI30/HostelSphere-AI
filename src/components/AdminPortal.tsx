import React, { useState } from 'react';
import { 
  Building, 
  Users, 
  Tv, 
  CreditCard, 
  Search, 
  Plus, 
  Check, 
  Trash, 
  Sparkles, 
  AlertTriangle 
} from 'lucide-react';
import { StudentProfile, RoomDetails, NoticeItem } from '../types';

interface AdminPortalProps {
  onAddNotice: (msg: string, type: 'info' | 'success') => void;
  students: StudentProfile[];
  onAddStudent: (student: StudentProfile) => void;
  onDeleteStudent: (id: string) => void;
  rooms: RoomDetails[];
  onAddNoticeBoardEntry: (entry: NoticeItem) => void;
}

export default function AdminPortal({
  onAddNotice,
  students,
  onAddStudent,
  onDeleteStudent,
  rooms,
  onAddNoticeBoardEntry
}: AdminPortalProps) {
  const [adminTab, setAdminTab] = useState<'students' | 'buildings' | 'notices'>('students');
  const [searchQuery, setSearchQuery] = useState('');

  // Add new student simulator state
  const [showAddForm, setShowAddForm] = useState(false);
  const [name, setName] = useState('');
  const [roll, setRoll] = useState('');
  const [room, setRoom] = useState('B-302');
  const [block, setBlock] = useState('Aravalli (B-Block)');
  const [gender, setGender] = useState('Male');
  const [batch, setBatch] = useState('B.Tech CSE - 1st Year');
  const [phone, setPhone] = useState('+91 99999 88888');
  const [parentName, setParentName] = useState('Sohan Larshman');
  const [parentPhone, setParentPhone] = useState('+91 94140 99999');

  const handleAddStudentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !roll) {
      onAddNotice('Please fill Name and Roll Number', 'info');
      return;
    }

    const newStudent: StudentProfile = {
      id: `STU${Math.floor(100 + Math.random() * 900)}`,
      name,
      rollNo: roll,
      roomNo: room,
      block,
      gender,
      batch,
      phone,
      email: `${name.toLowerCase().replace(' ', '')}@college.edu`,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=120',
      parentName,
      parentPhone,
      parentEmail: `${parentName.toLowerCase().replace(' ', '')}@gmail.com`,
      status: 'In-Hostel',
      gatePassQr: `PASS-STU-${Math.floor(1000 + Math.random() * 9000)}`,
      gatePassExpires: '21:30, Today'
    };

    onAddStudent(newStudent);
    setShowAddForm(false);
    setName('');
    setRoll('');
    onAddNotice(`Student ${newStudent.name} registered and assigned to ${newStudent.roomNo}!`, 'success');
  };

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-xl overflow-hidden min-h-[600px] flex flex-col md:flex-row">
      
      {/* Admin Sidebar */}
      <div className="md:w-64 bg-zinc-50 dark:bg-zinc-950 p-6 border-r border-zinc-200 dark:border-zinc-800 flex flex-col justify-between">
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-zinc-900 border text-white rounded-xl">
              <Building className="w-5 h-5 text-brand-accent fill-brand-accent animate-pulse" />
            </div>
            <div>
              <h3 className="font-display font-semibold text-sm text-brand-charcoal dark:text-zinc-50">Admin Workspace</h3>
              <span className="text-[10px] text-zinc-450 uppercase font-bold tracking-widest block">Principal Portal</span>
            </div>
          </div>

          <div className="space-y-1">
            {[
              { id: 'students', label: 'Admissions Control', icon: Users, count: students.length },
              { id: 'buildings', label: 'Accommodation Assets', icon: Building, count: rooms.length }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setAdminTab(tab.id as any)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left text-xs font-medium tracking-tight transition cursor-pointer ${
                  adminTab === tab.id 
                    ? 'bg-zinc-900 text-white dark:bg-zinc-850 font-bold' 
                    : 'text-brand-slate dark:text-zinc-400 hover:bg-zinc-200/50 dark:hover:bg-zinc-800/40'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <tab.icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </div>
                {tab.count !== undefined && (
                  <span className={`px-1.5 py-0.5 rounded text-[8px] font-mono ${
                    adminTab === tab.id ? 'bg-white/20 text-white' : 'bg-zinc-200 dark:bg-zinc-800 text-zinc-400'
                  }`}>
                    {tab.count} entries
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="pt-6 border-t border-zinc-200 dark:border-zinc-850 text-left">
          <div className="text-[10px] text-zinc-400">Institutional superuser</div>
          <div className="text-[9px] font-mono mt-1 text-brand-slate">NodeId: ADM-CENTRAL</div>
        </div>
      </div>

      {/* Main Panel */}
      <div className="flex-1 p-6 md:p-8 text-brand-charcoal dark:text-zinc-100 text-left overflow-y-auto">
        
        {/* TAB 1: Student Control table list */}
        {adminTab === 'students' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center pb-4 border-b border-zinc-200 dark:border-zinc-850">
              <div>
                <h2 className="font-display text-xl font-bold tracking-tight text-brand-charcoal dark:text-zinc-50">Admissions Control</h2>
                <p className="text-xs text-brand-slate dark:text-zinc-400">Add institutional records, suspend rosters or match roommate spaces</p>
              </div>
              <button 
                onClick={() => setShowAddForm(!showAddForm)}
                className="px-3.5 py-2 bg-brand-primary text-white hover:bg-opacity-95 rounded-xl text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-4 h-4" /> Register New Resident
              </button>
            </div>

            {/* Simulated Add Student form */}
            {showAddForm && (
              <form onSubmit={handleAddStudentSubmit} className="p-5 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl space-y-4">
                <h3 className="font-display text-xs uppercase tracking-widest font-bold text-zinc-450">Compose Student Dossier</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                  <div>
                    <label className="block text-[11px] font-bold text-brand-slate uppercase mb-1">Student Full Name</label>
                    <input 
                      type="text"
                      required
                      placeholder="e.g. Sameer Verma"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full p-2.5 bg-white dark:bg-zinc-900 border rounded-lg focus:outline-none focus:ring-1 focus:ring-brand-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-brand-slate uppercase mb-1">University Roll Assignment</label>
                    <input 
                      type="text"
                      required
                      placeholder="e.g. 2023CSB088"
                      value={roll}
                      onChange={(e) => setRoll(e.target.value)}
                      className="w-full p-2.5 bg-white dark:bg-zinc-900 border rounded-lg focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-brand-slate uppercase mb-1">Branch Batch</label>
                    <input 
                      type="text"
                      value={batch}
                      onChange={(e) => setBatch(e.target.value)}
                      className="w-full p-2.5 bg-white dark:bg-zinc-900 border rounded-lg"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                  <div>
                    <label className="block text-[11px] font-bold text-brand-slate uppercase mb-1">Select Hostel Block</label>
                    <select 
                      value={block}
                      onChange={(e) => setBlock(e.target.value)}
                      className="w-full p-2.5 bg-white dark:bg-zinc-900 border rounded-lg focus:outline-none"
                    >
                      <option value="Aravalli (B-Block)">Aravalli (B-Block)</option>
                      <option value="Sukhsanstha (C-Block)">Sukhsanstha (C-Block)</option>
                      <option value="Gargi (Girls Block)">Gargi (Girls Block)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-brand-slate uppercase mb-1">Assigned Room</label>
                    <input 
                      type="text"
                      value={room}
                      onChange={(e) => setRoom(e.target.value)}
                      className="w-full p-2.5 bg-white dark:bg-zinc-900 border rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-brand-slate uppercase mb-1">Emergency Parent Phone</label>
                    <input 
                      type="text"
                      value={parentPhone}
                      onChange={(e) => setParentPhone(e.target.value)}
                      className="w-full p-2.5 bg-white dark:bg-zinc-900 border rounded-lg"
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-2">
                  <button type="submit" className="px-5 py-2.5 bg-zinc-900 text-white rounded-lg hover:bg-zinc-800 text-xs font-bold">
                    Inject Institutional Record
                  </button>
                </div>
              </form>
            )}

            {/* Filter query */}
            <div className="p-3 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl flex items-center gap-2">
              <Search className="w-4 h-4 text-zinc-455" />
              <input 
                type="text"
                placeholder="Search registered students roster..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent text-xs w-full focus:outline-none dark:text-zinc-100"
              />
            </div>

            {/* Tabular data represent */}
            <div className="overflow-x-auto border border-zinc-200 dark:border-zinc-800 rounded-2xl">
              <table className="w-full text-xs text-left">
                <thead className="bg-zinc-50 dark:bg-zinc-950 text-brand-slate uppercase font-semibold text-[10px] tracking-wider border-b border-zinc-200 dark:border-zinc-800">
                  <tr>
                    <th className="p-4">Resident Student</th>
                    <th className="p-4">Roll Number</th>
                    <th className="p-4">Allocated Quarter</th>
                    <th className="p-4">Guardian / Parent Name</th>
                    <th className="p-4 text-center">Roster Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-150 dark:divide-zinc-800 bg-white dark:bg-zinc-900">
                  {students
                    .filter(s => s.name.toLowerCase().includes(searchQuery.toLowerCase()) || s.rollNo.toLowerCase().includes(searchQuery.toLowerCase()))
                    .map((stu) => (
                      <tr key={stu.id} className="hover:bg-zinc-50/50">
                        <td className="p-4 flex items-center gap-3">
                          <img src={stu.avatar} alt="avatar" className="w-10 h-10 rounded-full object-cover" />
                          <div>
                            <div className="font-bold text-brand-charcoal dark:text-zinc-150">{stu.name}</div>
                            <div className="text-[10px] text-brand-slate">{stu.batch}</div>
                          </div>
                        </td>
                        <td className="p-4 font-mono">{stu.rollNo}</td>
                        <td className="p-4">
                          <div>{stu.roomNo}</div>
                          <div className="text-[9px] text-zinc-400">{stu.block.split(' ')[0]}</div>
                        </td>
                        <td className="p-4">
                          <div>{stu.parentName}</div>
                          <div className="text-[9px] text-zinc-400">{stu.parentPhone}</div>
                        </td>
                        <td className="p-4 text-center">
                          {stu.id === 'STU001' ? (
                            <span className="text-[10px] text-zinc-400 italic">Protected (Root Student)</span>
                          ) : (
                            <button 
                              onClick={() => {
                                onDeleteStudent(stu.id);
                                onAddNotice(`Suspended registration copy file for ${stu.name}`, 'info');
                              }}
                              className="p-2 border rounded-lg text-red-650 hover:bg-rose-50 text-[10px]"
                            >
                              Revoke Roster
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: Asset management stats */}
        {adminTab === 'buildings' && (
          <div className="space-y-6">
            <div className="pb-4 border-b border-zinc-200 dark:border-zinc-850">
              <h2 className="font-display text-xl font-bold tracking-tight text-brand-charcoal dark:text-zinc-50">Accommodation Assets Management</h2>
              <p className="text-xs text-brand-slate dark:text-zinc-400">Audit power loads, ceiling maintenance, and furniture assets across structures</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {rooms.map((room) => (
                <div key={room.id} className="p-5 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl block text-xs space-y-4">
                  <div className="flex justify-between font-bold border-b pb-2">
                    <span className="text-sm font-semibold">{room.block} - Quarter {room.roomNo}</span>
                    <span className="text-brand-success font-mono">{room.meterReading} kWh</span>
                  </div>
                  <div className="space-y-2">
                    <div><strong>Rental Value:</strong> ₹{room.feeAmount.toLocaleString()} per semester</div>
                    <div><strong>Amenities List:</strong> {room.amenities.join(', ')}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
