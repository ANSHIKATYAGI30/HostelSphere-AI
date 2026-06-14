export type LeaveType = 'Home' | 'Local';
export type LeaveStatus = 'Pending' | 'Approved' | 'Rejected';
export type ComplaintStatus = 'Pending' | 'In-Progress' | 'Resolved';
export type ComplaintSentiment = 'Negative' | 'Neutral' | 'Positive';
export type VisitorStatus = 'Planned' | 'Inside' | 'Checked-Out';

export interface StudentProfile {
  id: string;
  name: string;
  rollNo: string;
  roomNo: string;
  block: string;
  gender: string;
  batch: string;
  phone: string;
  email: string;
  avatar: string;
  parentName: string;
  parentPhone: string;
  parentEmail: string;
  status: 'In-Hostel' | 'Out-Of-Hostel' | 'On-Leave';
  gatePassQr?: string;
  gatePassExpires?: string;
}

export interface RoomDetails {
  id: string;
  roomNo: string;
  block: string;
  floor: number;
  type: 'Single' | 'Double' | 'Triple' | 'Four-Sharing';
  amenities: string[];
  occupants: string[]; // List of student Names/IDs
  feeAmount: number;
  meterReading: number; // For electricity tracking
}

export interface LeaveRequest {
  id: string;
  studentId: string;
  studentName: string;
  roomNo: string;
  type: LeaveType;
  fromDate: string;
  toDate: string;
  reason: string;
  status: LeaveStatus;
  parentApproval: LeaveStatus;
  appliedDate: string;
  approvedBy?: string;
}

export interface Complaint {
  id: string;
  studentName: string;
  roomNo: string;
  category: 'Electrical' | 'Plumbing' | 'Mess' | 'Wi-Fi' | 'Security' | 'Housekeeping' | 'Other';
  description: string;
  appliedDate: string;
  status: ComplaintStatus;
  sentiment: ComplaintSentiment;
  aiClassification: string; // e.g. "Critical Priority - Immediate Warden dispatch"
  urgency: 'Low' | 'Medium' | 'High' | 'Critical';
  adminComments?: string;
}

export interface Visitor {
  id: string;
  name: string;
  relationship: string;
  studentName: string;
  studentRoll: string;
  phone: string;
  plannedDate: string;
  entryTime?: string;
  exitTime?: string;
  status: VisitorStatus;
  purpose: string;
  passId: string;
}

export interface NoticeItem {
  id: string;
  title: string;
  category: 'Warden' | 'Mess' | 'Academic' | 'AI Insight' | 'General';
  content: string;
  date: string;
  postedBy: string;
  isImportant: boolean;
}

export interface MessDayMenu {
  day: string;
  breakfast: string;
  breakfastTime: string;
  lunch: string;
  lunchTime: string;
  snacks: string;
  snacksTime: string;
  dinner: string;
  dinnerTime: string;
  isSpecialDay: boolean;
}

export interface FeeStructure {
  id: string;
  termName: string;
  totalAmount: number;
  paidAmount: number;
  dueAmount: number;
  dueDate: string;
  status: 'Paid' | 'Partially-Paid' | 'Unpaid';
  breakdown: {
    rent: number;
    mess: number;
    utility: number;
    amenities: number;
  };
  transactions: {
    id: string;
    amount: number;
    date: string;
    method: string;
    reference: string;
  }[];
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  content: string;
  timestamp: string;
  aiInsights?: string[];
}

export interface SOSLog {
  id: string;
  studentName: string;
  roomNo: string;
  phone: string;
  time: string;
  triggerType: 'Medical' | 'Security Break-in' | 'Fire/Smoke' | 'Other';
  status: 'Triggered' | 'Dispatched' | 'Resolved';
  resolvedBy?: string;
  remarks?: string;
}
