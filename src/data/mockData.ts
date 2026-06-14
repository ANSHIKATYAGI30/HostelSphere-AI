import {
  StudentProfile,
  RoomDetails,
  LeaveRequest,
  Complaint,
  Visitor,
  NoticeItem,
  MessDayMenu,
  FeeStructure,
  SOSLog,
  ChatMessage
} from '../types';

export const mockStudents: StudentProfile[] = [
  {
    id: 'STU001',
    name: 'Rohan Sharma',
    rollNo: '2023CSB032',
    roomNo: 'B-302',
    block: 'Aravalli (B-Block)',
    gender: 'Male',
    batch: 'B.Tech CSE - 3rd Year',
    phone: '+91 98765 43210',
    email: 'rohan.sharma23@college.edu',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=120',
    parentName: 'Ramesh Sharma',
    parentPhone: '+91 94140 12345',
    parentEmail: 'ramesh.sharma.parent@gmail.com',
    status: 'In-Hostel',
    gatePassQr: 'PASS-STU001-B302-2026',
    gatePassExpires: '21:30, Today'
  },
  {
    id: 'STU002',
    name: 'Ananya Iyer',
    rollNo: '2023ECB104',
    roomNo: 'G-104',
    block: 'Gargi (Girls Block)',
    gender: 'Female',
    batch: 'B.Tech ECE - 3rd Year',
    phone: '+91 88776 55432',
    email: 'ananya.iyer23@college.edu',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=120',
    parentName: 'Srinivasan Iyer',
    parentPhone: '+91 98220 88776',
    parentEmail: 's.iyer.parent@yahoo.com',
    status: 'Out-Of-Hostel',
    gatePassQr: 'PASS-STU002-G104-2026',
    gatePassExpires: '22:00, Today'
  },
  {
    id: 'STU003',
    name: 'Kabir Mehta',
    rollNo: '2024MEB015',
    roomNo: 'B-108',
    block: 'Aravalli (B-Block)',
    gender: 'Male',
    batch: 'B.Tech Mech - 2nd Year',
    phone: '+91 70144 98765',
    email: 'kabir.mehta24@college.edu',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120',
    parentName: 'Alok Mehta',
    parentPhone: '+91 99990 44332',
    parentEmail: 'alok.mehta@gmail.com',
    status: 'On-Leave'
  },
  {
    id: 'STU004',
    name: 'Priya Patel',
    rollNo: '2024CSB155',
    roomNo: 'G-211',
    block: 'Gargi (Girls Block)',
    gender: 'Female',
    batch: 'B.Tech CSE - 2nd Year',
    phone: '+91 91160 55443',
    email: 'priya.patel24@college.edu',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=120',
    parentName: 'Dinesh Patel',
    parentPhone: '+91 97850 11223',
    parentEmail: 'dinesh.patel@gmail.com',
    status: 'In-Hostel'
  }
];

export const mockRooms: RoomDetails[] = [
  {
    id: 'ROOM001',
    roomNo: 'B-302',
    block: 'Aravalli (B-Block)',
    floor: 3,
    type: 'Double',
    amenities: ['Wi-Fi', 'Attached Washroom', 'AC', 'Balcony', 'Study Table'],
    occupants: ['Rohan Sharma', 'Siddharth Sen'],
    feeAmount: 65000,
    meterReading: 1245.8
  },
  {
    id: 'ROOM002',
    roomNo: 'G-104',
    block: 'Gargi (Girls Block)',
    floor: 1,
    type: 'Single',
    amenities: ['Wi-Fi', 'Attached Washroom', 'Room Cool', 'Single Bed', 'Study Wardrobe'],
    occupants: ['Ananya Iyer'],
    feeAmount: 75000,
    meterReading: 489.2
  },
  {
    id: 'ROOM003',
    roomNo: 'B-108',
    block: 'Aravalli (B-Block)',
    floor: 1,
    type: 'Double',
    amenities: ['Wi-Fi', 'Common Washroom', 'Non-AC', 'Study Table'],
    occupants: ['Kabir Mehta', 'Aman Verma'],
    feeAmount: 50000,
    meterReading: 890.4
  },
  {
    id: 'ROOM004',
    roomNo: 'G-211',
    block: 'Gargi (Girls Block)',
    floor: 2,
    type: 'Double',
    amenities: ['Wi-Fi', 'Attached Washroom', 'AC', 'Balcony'],
    occupants: ['Priya Patel', 'Tanvi Shah'],
    feeAmount: 65000,
    meterReading: 1560.1
  }
];

export const mockLeaveRequests: LeaveRequest[] = [
  {
    id: 'LV001',
    studentId: 'STU001',
    studentName: 'Rohan Sharma',
    roomNo: 'B-302',
    type: 'Home',
    fromDate: '2026-06-19',
    toDate: '2026-06-22',
    reason: 'Attending elder sister\'s marriage reception in Jaipur.',
    status: 'Approved',
    parentApproval: 'Approved',
    appliedDate: '2026-06-12',
    approvedBy: 'Prof. S.K. Bhatia'
  },
  {
    id: 'LV002',
    studentId: 'STU002',
    studentName: 'Ananya Iyer',
    roomNo: 'G-104',
    type: 'Local',
    fromDate: '2026-06-13',
    toDate: '2026-06-13',
    reason: 'Going to local market to buy research reference manuals.',
    status: 'Approved',
    parentApproval: 'Approved',
    appliedDate: '2026-06-13',
    approvedBy: 'Prof. S.K. Bhatia'
  },
  {
    id: 'LV003',
    studentId: 'STU003',
    studentName: 'Kabir Mehta',
    roomNo: 'B-108',
    type: 'Home',
    fromDate: '2026-06-25',
    toDate: '2026-06-30',
    reason: 'Severe fever. Medical prescription scanned and submitted. Doctor recommended bed rest.',
    status: 'Pending',
    parentApproval: 'Approved',
    appliedDate: '2026-06-12'
  },
  {
    id: 'LV004',
    studentId: 'STU004',
    studentName: 'Priya Patel',
    roomNo: 'G-211',
    type: 'Local',
    fromDate: '2026-06-14',
    toDate: '2026-06-14',
    reason: 'Attending coding boot camp meetup from 10:00 AM to 6:00 PM.',
    status: 'Pending',
    parentApproval: 'Pending',
    appliedDate: '2026-06-13'
  }
];

export const mockComplaints: Complaint[] = [
  {
    id: 'CMP001',
    studentName: 'Rohan Sharma',
    roomNo: 'B-302',
    category: 'Electrical',
    description: 'Ceiling fan regulator is broken. The fan only runs on max speed, producing extreme buzzing noise holding up sleep.',
    appliedDate: '2026-06-11',
    status: 'In-Progress',
    sentiment: 'Negative',
    aiClassification: 'Medium Priority - Dispatched to Campus Electrician (Sohan Lal)',
    urgency: 'Medium',
    adminComments: 'Electrician assigned. Repair scheduled for 14th June morning.'
  },
  {
    id: 'CMP002',
    studentName: 'Ananya Iyer',
    roomNo: 'G-104',
    category: 'Wi-Fi',
    description: 'The study-table ethernet port and Wi-Fi access point in Gargi 1st floor are not negotiating IP. Disconnecting every 5 minutes during research submission.',
    appliedDate: '2026-06-10',
    status: 'Resolved',
    sentiment: 'Negative',
    aiClassification: 'High Priority - Critical Student Blockage',
    urgency: 'High',
    adminComments: 'AP reset initiated. Fiber switch-port patched correctly. Verified with the student.'
  },
  {
    id: 'CMP003',
    studentName: 'Kabir Mehta',
    roomNo: 'B-108',
    category: 'Plumbing',
    description: 'Severe water clogging in communal washroom-C. Water is overflowing into the corridor. Creating unsanitary and slippery walkway.',
    appliedDate: '2026-06-13',
    status: 'Pending',
    sentiment: 'Negative',
    aiClassification: 'Critical Priority - Dispatching Urgent Plumber with Sanitizer team',
    urgency: 'Critical'
  },
  {
    id: 'CMP004',
    studentName: 'Priya Patel',
    roomNo: 'G-211',
    category: 'Mess',
    description: 'Highly oily food served during dinners. Need salad counters and healthy paneer recipes instead of deep fried snacks.',
    appliedDate: '2026-06-12',
    status: 'Pending',
    sentiment: 'Neutral',
    aiClassification: 'Low Priority - Category: General Welfare & Mess Audit Inquiry',
    urgency: 'Low'
  },
  {
    id: 'CMP005',
    studentName: 'Siddharth Sen',
    roomNo: 'B-302',
    category: 'Wi-Fi',
    description: 'Speed drops from 100Mbps to 1Mbps around midnight. Is there a throttling policy?',
    appliedDate: '2026-06-13',
    status: 'Pending',
    sentiment: 'Neutral',
    aiClassification: 'Low Priority - FAQ/Bandwidth Allocation Query',
    urgency: 'Low'
  }
];

export const mockVisitors: Visitor[] = [
  {
    id: 'VIS001',
    name: 'Alok Mehta',
    relationship: 'Father',
    studentName: 'Kabir Mehta',
    studentRoll: '2024MEB015',
    phone: '+91 99990 44332',
    plannedDate: '2026-06-13',
    entryTime: '09:30 AM',
    status: 'Inside',
    purpose: 'Delivering home remedies and winter clothes.',
    passId: 'PASS-9824'
  },
  {
    id: 'VIS002',
    name: 'Ramesh Sharma',
    relationship: 'Father',
    studentName: 'Rohan Sharma',
    studentRoll: '2023CSB032',
    phone: '+91 94140 12345',
    plannedDate: '2026-06-13',
    entryTime: '10:00 AM',
    exitTime: '12:15 PM',
    status: 'Checked-Out',
    purpose: 'Academic fee payment counseling and lunch out together.',
    passId: 'PASS-1025'
  },
  {
    id: 'VIS003',
    name: 'Suhail Khan',
    relationship: 'Friend',
    studentName: 'Siddharth Sen',
    studentRoll: '2023CSB034',
    phone: '+91 76543 21098',
    plannedDate: '2026-06-14',
    status: 'Planned',
    purpose: 'Joint Project Research working in Group Study Hall.',
    passId: 'PASS-5541'
  }
];

export const mockNotices: NoticeItem[] = [
  {
    id: 'N001',
    title: 'Biometric Attendance Smart Tracking Integration',
    category: 'Warden',
    content: 'All hostel gates have now been fitted with HostelSphere Smart QR scanners. Please keep your personal Student Portal dashboard QR active on your mobile devices during check-in/out to log continuous gate logs automatically.',
    date: '2026-06-12',
    postedBy: 'Prof. S.K. Bhatia (Dean/Warden)',
    isImportant: true
  },
  {
    id: 'N002',
    title: 'AI Mess Waste Forecast Circular',
    category: 'AI Insight',
    content: 'Using past predictive data feeds, 32% of Sunday Lunch preparation went to waste. We are introducing a mandatory "Mess Out Opt-out Slider" on the student panel. If you are dining outside on Sunday, please toggle the opt-out by Friday night to save food resources.',
    date: '2026-06-11',
    postedBy: 'AI Analytics Engine',
    isImportant: true
  },
  {
    id: 'N003',
    title: 'Inter-Block Badminton Championship 2026',
    category: 'General',
    content: 'Registrations are open for Singles and Doubles events in the Central Court. Forms must be filled at the office reception by 15th June.',
    date: '2026-06-09',
    postedBy: 'Sport Advisor Committee',
    isImportant: false
  },
  {
    id: 'N004',
    title: 'Maintenance Shut-down for Water Clean-up',
    category: 'Warden',
    content: 'All central high-pressure water containers will undergo seasonal scrubbing this Saturday from 06:00 AM to 09:00 AM. Inconvenience is highly regretted.',
    date: '2026-06-13',
    postedBy: 'Estate Supervisor Office',
    isImportant: true
  }
];

export const mockMessMenu: MessDayMenu[] = [
  {
    day: 'Monday',
    breakfast: 'Idli Vada with Sambhar, Coconut Chutney, Tea/Coffee/Milk/Eggs',
    breakfastTime: '07:30 - 09:00 AM',
    lunch: 'Roti, Dal Tadka, Aloo Gobhi Dry, Jeera Rice, Curd, Green Salad',
    lunchTime: '12:30 - 02:00 PM',
    snacks: 'Samosa, Mint Chutney, Hot Tea/Filter Coffee',
    snacksTime: '05:00 - 06:00 PM',
    dinner: 'Malai Kofta Curry, Butter Roti, Basmati Pulav, Kheer sweet',
    dinnerTime: '07:30 - 09:30 PM',
    isSpecialDay: false
  },
  {
    day: 'Tuesday',
    breakfast: 'Aloo Paratha with Butter, Curd, Mixed Pickles, Milk/Eggs',
    breakfastTime: '07:30 - 09:00 AM',
    lunch: 'Paneer Butter Masala, Butter Naan, Mixed Veg Dry, Bundi Raita',
    lunchTime: '12:30 - 02:00 PM',
    snacks: 'Vada Pav, Red Chutney, Ginger Tea',
    snacksTime: '05:00 - 06:00 PM',
    dinner: 'Dal Makhani, Mix Roti, Steamed Plain Rice, Hot Gulab Jamun',
    dinnerTime: '07:30 - 09:30 PM',
    isSpecialDay: false
  },
  {
    day: 'Wednesday',
    breakfast: 'Poha with Sev & Pomegranate, Jalebi, Tea/Coffee/Hot Milk/Fruits',
    breakfastTime: '07:30 - 09:00 AM',
    lunch: 'Bengali Fish Curry / Shahi Paneer, Roti, Yellow Dal, Veg Salad',
    lunchTime: '12:30 - 02:00 PM',
    snacks: 'Bread Pakora, Garlic Chutney, Masala Chai',
    snacksTime: '05:00 - 06:00 PM',
    dinner: 'Kashmiri Dum Aloo, Garlic Roti, Peas Pulav, Custard Fruit Salad',
    dinnerTime: '07:30 - 09:30 PM',
    isSpecialDay: false
  },
  {
    day: 'Thursday',
    breakfast: 'Chola Bhature, Pickled Onions, Mint Raita, Fresh Juice/Tea',
    breakfastTime: '07:30 - 09:00 AM',
    lunch: 'Rajma Masala, Steamed Basmati Rice, Dry Bhindi Masala, Curd',
    lunchTime: '12:30 - 02:00 PM',
    snacks: 'Mixed Veg Pakora, Roasted Peanut Chaat, Tea/Coffee',
    snacksTime: '05:00 - 06:00 PM',
    dinner: 'Kadai Paneer, Chapati, Egg Masala / Veg Kofta, Caramel Pudding',
    dinnerTime: '07:30 - 09:30 PM',
    isSpecialDay: false
  },
  {
    day: 'Friday',
    breakfast: 'Uttapam, Tomato Onion Chutney, Sambhar, Hot Milk/Tea/Bananas',
    breakfastTime: '07:30 - 09:00 AM',
    lunch: 'Kadi Pakora, Plain Rice, Baingan Bharta, Roasted Papad, Onion Salad',
    lunchTime: '12:30 - 02:00 PM',
    snacks: 'Veg Grilled Sandwich, Tomato Ketchup, Green Tea/Chai',
    snacksTime: '05:00 - 06:00 PM',
    dinner: 'Veg Biryani with thick Raita, Chili Paneer Gravy, Spring Rolls',
    dinnerTime: '07:30 - 09:30 PM',
    isSpecialDay: false
  },
  {
    day: 'Saturday',
    breakfast: 'Gobi Paratha, White Butter, Green Chutney, Tea/Coffee/Boiled Eggs',
    breakfastTime: '07:30 - 09:00 AM',
    lunch: 'Aloo Shimla Mirch, Yellow Dal Fry, Khichdi, Tomato Raita, Salad',
    lunchTime: '12:30 - 02:00 PM',
    snacks: 'Pav Bhaji, Sliced Lemon, Local Filter Coffee',
    snacksTime: '05:00 - 06:00 PM',
    dinner: 'Palak Paneer, Tawa Roti, Veg Pulao, Rasmalai Sweet desert',
    dinnerTime: '07:30 - 09:30 PM',
    isSpecialDay: false
  },
  {
    day: 'Sunday',
    breakfast: 'Poori Bhaji, Sweet Curd, Fresh Orange Slices, Tea/Coffee/Boiled Eggs',
    breakfastTime: '07:30 - 09:00 AM',
    lunch: 'Hyderabadi Chicken Biryani / Paneer Tikka Dum Biryani, Mirchi Salan, Raita',
    lunchTime: '12:30 - 02:00 PM',
    snacks: 'Assorted Pastries/Muffins, Potato Wafers, Dry Chana, Tea',
    snacksTime: '05:00 - 06:00 PM',
    dinner: 'Shahi Kadhai Mushroom, Laccha Naan, Pineapple Raita, Premium Butterscotch Ice Cream',
    dinnerTime: '07:30 - 09:30 PM',
    isSpecialDay: true
  }
];

export const mockFeeRohan: FeeStructure = {
  id: 'FEE2026T1',
  termName: 'Autumn Semester 2026-27',
  totalAmount: 65000,
  paidAmount: 45000,
  dueAmount: 20000,
  dueDate: '2026-07-15',
  status: 'Partially-Paid',
  breakdown: {
    rent: 30000,
    mess: 20000,
    utility: 10000,
    amenities: 5000
  },
  transactions: [
    {
      id: 'TXN20260401',
      amount: 25000,
      date: '2026-04-12',
      method: 'UPI / GPay',
      reference: 'UPI9085542109'
    },
    {
      id: 'TXN20260515',
      amount: 20000,
      date: '2026-05-15',
      method: 'Net Banking (SBI)',
      reference: 'SBI443217088'
    }
  ]
};

export const mockSOSList: SOSLog[] = [
  {
    id: 'SOS-012',
    studentName: 'Kabir Mehta',
    roomNo: 'B-108',
    phone: '+91 70144 98765',
    time: '2026-06-13 02:15 AM',
    triggerType: 'Medical',
    status: 'Resolved',
    resolvedBy: 'Warden Bhatia',
    remarks: 'Dispatched campus ambulance. Kabir diagnosed with an infection, administered IV fluids, and safely resting now.'
  },
  {
    id: 'SOS-015',
    studentName: 'Priya Patel',
    roomNo: 'G-211',
    phone: '+91 91160 55443',
    time: '03:10 AM, Today',
    triggerType: 'Security Break-in',
    status: 'Resolved',
    resolvedBy: 'Guard Officer Singh',
    remarks: 'False alarm. Corridor wind blew open the window latch, hitting the iron locker. Student panicking. Room secured.'
  }
];

// Predictive statistics for the Admin Panel
export const aiOccupancyForecast = {
  months: ['Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  historical: [72, 85, 96, 94, 94, 95, 96],
  aiPredicted: [72, 92, 99, 98, 97, 98, 99],
  textReasoning: 'July-August occupancy is predicted to surge to near solid 99% due to incoming Freshman allocation of batch 2026. B-Block expansion is highly recommended.'
};

export const complaintTrends = {
  categories: ['Electrical', 'Plumbing', 'Wi-Fi', 'Mess', 'Security', 'Housekeeping'],
  counts: [14, 25, 42, 19, 8, 31],
  aiClassificationSentiment: {
    negativePercent: 62,
    neutralPercent: 28,
    positivePercent: 10
  }
};

export const sampleElectricityUsage = [
  { week: 'W1', usage: 1240 },
  { week: 'W2', usage: 1420 },
  { week: 'W3', usage: 1390 },
  { week: 'W4', usage: 1650, isAILinkedAnomaly: true, predictionReason: 'AC continuous usage during intense humidity peak' }
];

export const mockInitialChat: ChatMessage[] = [
  {
    id: 'msg-01',
    sender: 'assistant',
    content: `Hello! I am **HostelSphere AI Advisory Coach**.

I monitor occupancy rates, mess stock levels, real-time complaint sentiment scores, and utility anomalies to assist Warden, Admins, and Students. 

How can I assist you today? Try asking me:
* *"Can you analyze complaint sentiment trends?"*
* *"What is the mess waste forecast for Sunday?"*
* *"Give me a summary of electricity usage anomalies."*`,
    timestamp: '10:00 AM'
  }
];
