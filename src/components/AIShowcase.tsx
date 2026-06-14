import React, { useState } from 'react';
import { 
  Sparkles, 
  MessageSquare, 
  TrendingUp, 
  AlertOctagon, 
  Lightbulb, 
  Send,
  User,
  Brain,
  BarChart,
  Target
} from 'lucide-react';
import { ChatMessage } from '../types';
import { mockInitialChat } from '../data/mockData';

interface AIShowcaseProps {
  onAddNotice: (msg: string, type: 'info' | 'success') => void;
}

export default function AIShowcase({ onAddNotice }: AIShowcaseProps) {
  // Chat state
  const [messages, setMessages] = useState<ChatMessage[]>(mockInitialChat);
  const [chatInput, setChatInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // Suggested AI recommendation stats
  const aiInsightsList = [
    {
      title: 'Water Outlet Leakage Flagged',
      desc: 'Room G-211 electricity/humidity telemetry matches pipe dampness templates. Plumber notified proactively.',
      urgency: 'Medium',
      category: 'Plumbing'
    },
    {
      title: 'Sunday Raw Ingredient Waste Risk',
      desc: 'Based on RSVP trackers, 18 resident students will be out on Sunday lunch. Raw purchase quota cut back by 15kg.',
      urgency: 'High',
      category: 'Mess'
    },
    {
      title: 'AC running hour outlier observed',
      desc: 'A-Block room room 103 logged 19 hours of active AC usage during standard classroom hours. Advisory sent.',
      urgency: 'Low',
      category: 'Utility'
    }
  ];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      content: chatInput,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    const normalizedInput = chatInput.toLowerCase();
    setChatInput('');
    setIsTyping(true);

    // Simulate smart delay and customized replies
    setTimeout(() => {
      let botResponse = '';
      if (normalizedInput.includes('sentiment') || normalizedInput.includes('complaint')) {
        botResponse = `### 📊 AI Sentiment & Complaint Analysis:
* **Electrical complaints** are analyzed at high-negative sentiment of 75% due to sleeping noise blocks (e.g. Broken ceiling fan regulators).
* **Wi-Fi reports** logged medium-negative severity because of evening class research submissions.
* **Our recommendation:** Prioritize fan repairs in B-Block to raise immediate resident happiness by 18%.`;
      } else if (normalizedInput.includes('waste') || normalizedInput.includes('sunday') || normalizedInput.includes('mess')) {
        botResponse = `### 🍽️ AI Mess Waste Forecast:
* **Sunday Lunch** usually records the highest food plate waste (around 32%).
* **Active Solution:** I have activated the "RSVP Opt-out" notifications slider.
* **Forecasted Saving:** If 15 more residents toggle opt-out, we save ₹4,500 in direct raw vegetables purchase this week alone.`;
      } else if (normalizedInput.includes('electricity') || normalizedInput.includes('anomaly') || normalizedInput.includes('meter')) {
        botResponse = `### ⚡ Utility Anomaly Summary:
* **A-Block Corridor:** High continuous load recorded between 10:00 AM - 04:00 PM (typical empty hours).
* **Likely Cause:** Corridors or study tables AC left operating in empty rooms.
* **Proposed Intervention:** Dispatched smart thermal triggers to turn off standby electronics automatically.`;
      } else {
        botResponse = `I have logged your request: *"type custom questions"*. Currently, operating in high-fidelity mock state. I am continuously assessing occupancy forecasts and real-time student complaints in institutional databases. Let me know if you would like me to review particular corridor utility feeds or check pending hometown out-pass backlogs.`;
      }

      const botMsg: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        sender: 'assistant',
        content: botResponse,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
      onAddNotice('AI Advisory answered your question', 'success');
    }, 1000);
  };

  return (
    <div className="space-y-8 font-sans">
      
      {/* Visual Title Header */}
      <div className="pb-4 border-b border-zinc-200 dark:border-zinc-800 text-left">
        <h1 className="font-display text-2xl font-extrabold text-brand-charcoal dark:text-zinc-50 flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-brand-accent animate-spin" />
          HostelSphere AI Showcase Sandbox
        </h1>
        <p className="text-sm text-brand-slate dark:text-zinc-400">
          Experience our five core client-side intelligent processing and natural language prediction cards
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-left">
        
        {/* Left column: Demonstration Cards */}
        <div className="space-y-6">
          
          {/* Card 1: AI Complaint Categorization & Sentiment Analysis */}
          <div className="p-5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl space-y-4 relative overflow-hidden shadow-sm">
            <h3 className="font-display text-sm font-semibold text-brand-charcoal dark:text-zinc-100 flex items-center gap-1.5">
              <Brain className="w-4 h-4 text-brand-primary" />
              AI Sentiment & Urgency Categorization
            </h3>
            <p className="text-xs text-brand-slate dark:text-zinc-400 leading-relaxed">
              Every complaint is scrutinized instantly. Harsh descriptive nouns trigger automatic urgency tags and direct plumber alerts.
            </p>

            <div className="space-y-2.5">
              <div className="p-3 bg-rose-50/20 dark:bg-zinc-950 border border-brand-primary/10 rounded-xl">
                <div className="flex justify-between font-bold text-[10px] text-brand-primary">
                  <span>TEXT: "Toilet is overflowing water, flooding bedroom"</span>
                  <span>SENTIMENT: DEEP NEGATIVE (92%)</span>
                </div>
                <p className="text-[11px] text-brand-charcoal dark:text-zinc-200 font-semibold mt-1">
                  AI Action: Forwarded to plumbing crew. High alert tag.
                </p>
              </div>

              <div className="p-3 bg-amber-50/20 dark:bg-zinc-950 border border-brand-accent/20 rounded-xl">
                <div className="flex justify-between font-bold text-[10px] text-brand-accent">
                  <span>TEXT: "Can we get high quality butter at breakfast?"</span>
                  <span>SENTIMENT: ANALYZED NEUTRAL (50%)</span>
                </div>
                <p className="text-[11px] text-brand-charcoal dark:text-zinc-200 font-semibold mt-1">
                  AI Action: Placed in monthly general cafeteria feedback cards.
                </p>
              </div>
            </div>
            
            {/* Sleek bottom indicator bar style */}
            <div className="absolute bottom-0 left-0 w-full h-1 bg-zinc-100 dark:bg-zinc-800">
              <div className="h-full bg-brand-primary" style={{ width: '92%' }} />
            </div>
          </div>

          {/* Card 2: Occupancy & Admissions Forecasting */}
          <div className="p-5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl space-y-4 relative overflow-hidden shadow-sm">
            <h3 className="font-display text-sm font-semibold text-brand-charcoal dark:text-zinc-100 flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4 text-brand-success" />
              Pre-admission Occupancy Forecasting
            </h3>
            <p className="text-xs text-brand-slate dark:text-zinc-400">
              Correlating institutional intake and prior room occupancy structures. B-Block expansion model is pre-suggested.
            </p>

            <div className="grid grid-cols-3 gap-2 text-center text-[11px]">
              <div className="p-2.5 bg-zinc-50 dark:bg-zinc-950 rounded-lg">
                <span className="text-zinc-450 block text-[9px] uppercase tracking-wider font-semibold">June standard</span>
                <span className="text-base font-bold text-brand-charcoal dark:text-zinc-150">72%</span>
              </div>
              <div className="p-2.5 bg-zinc-50 dark:bg-zinc-950 rounded-lg">
                <span className="text-zinc-450 block text-[9px] uppercase tracking-wider font-semibold">July Predicted</span>
                <span className="text-base font-bold text-brand-accent animate-pulse">92%</span>
              </div>
              <div className="p-2.5 bg-amber-50/15 dark:bg-zinc-950 rounded-lg">
                <span className="text-zinc-450 block text-[9px] uppercase tracking-wider font-semibold">August Predicted</span>
                <span className="text-base font-bold text-brand-primary">99%</span>
              </div>
            </div>

            {/* Sleek bottom indicator bar style */}
            <div className="absolute bottom-0 left-0 w-full h-1 bg-zinc-100 dark:bg-zinc-800">
              <div className="h-full bg-brand-success animate-pulse" style={{ width: '99%' }} />
            </div>
          </div>

          {/* Card 3: Smart Insights Advisory Feed */}
          <div className="p-5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl space-y-4 relative overflow-hidden shadow-sm">
            <h3 className="font-display text-sm font-semibold text-brand-charcoal dark:text-zinc-100 flex items-center gap-1.5">
              <Lightbulb className="w-4 h-4 text-brand-accent fill-brand-accent" />
              Smart Insights & Active Flags
            </h3>
            <div className="space-y-3">
              {aiInsightsList.map((ins, idx) => (
                <div key={idx} className="p-3 bg-zinc-50 dark:bg-zinc-950 border border-zinc-150 dark:border-zinc-800 rounded-xl space-y-1">
                  <div className="flex justify-between items-center text-[10px]">
                    <span className="font-bold text-brand-charcoal dark:text-zinc-200">{ins.title}</span>
                    <span className={`px-1 rounded text-[8px] font-bold ${
                      ins.urgency === 'High' ? 'bg-red-100 text-red-800' : 'bg-gray-100'
                    }`}>
                      {ins.category} • {ins.urgency}
                    </span>
                  </div>
                  <p className="text-[11px] text-brand-slate dark:text-zinc-450">{ins.desc}</p>
                </div>
              ))}
            </div>

            {/* Sleek bottom indicator bar style */}
            <div className="absolute bottom-0 left-0 w-full h-1 bg-zinc-100 dark:bg-zinc-800">
              <div className="h-full bg-brand-accent" style={{ width: '85%' }} />
            </div>
          </div>

        </div>

        {/* Right column: Interactive AI Coach Chatbot */}
        <div className="p-5 bg-zinc-50 dark:bg-zinc-950 border border-zinc-250 dark:border-zinc-850 rounded-2xl flex flex-col justify-between h-[560px]">
          <div>
            <div className="flex justify-between items-center pb-3 border-b border-zinc-200 dark:border-zinc-800 mb-4">
              <div className="flex items-center gap-2">
                <Brain className="w-5 h-5 text-brand-primary" />
                <div>
                  <h3 className="font-display font-semibold text-sm text-brand-charcoal dark:text-zinc-100">AI Advisory Coach</h3>
                  <span className="text-[9px] text-brand-success font-bold font-mono">ONLINE • BOT ANALYSER</span>
                </div>
              </div>
              <button 
                onClick={() => {
                  setMessages(mockInitialChat);
                  onAddNotice('Chat memory purged!', 'info');
                }}
                className="text-[10px] text-brand-slate hover:text-brand-primary"
              >
                Clear History
              </button>
            </div>

            {/* AI Prompts Suggestions helper pills */}
            <div className="flex flex-wrap gap-1.5 mb-4">
              {[
                { text: 'Analyze complaint trends', label: 'Sentiment' },
                { text: 'Sunday mess waste forecast', label: 'Plate RSVP' },
                { text: 'Electricity anomalies', label: 'Utilities kWh' }
              ].map((pill, i) => (
                <button
                  key={i}
                  onClick={() => setChatInput(pill.text)}
                  className="px-2.5 py-1 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-[10px] rounded-full hover:border-brand-primary text-brand-slate hover:text-brand-charcoal cursor-pointer font-medium"
                >
                  💡 {pill.label}
                </button>
              ))}
            </div>

            {/* Chat message logs scroll area */}
            <div className="space-y-4 max-h-[300px] overflow-y-auto pr-1">
              {messages.map((m) => (
                <div key={m.id} className={`flex gap-2 text-xs ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  {m.sender !== 'user' && (
                    <div className="w-6 h-6 rounded-full bg-brand-primary flex items-center justify-center text-white text-[10px] font-bold">
                      Sphere_AI
                    </div>
                  )}
                  <div className={`p-3 rounded-2xl max-w-[80%] text-xs whitespace-pre-line leading-relaxed ${
                    m.sender === 'user' 
                      ? 'bg-brand-primary text-white font-medium rounded-tr-none' 
                      : 'bg-white dark:bg-zinc-900 text-brand-charcoal dark:text-zinc-200 border rounded-tl-none border-zinc-200/50'
                  }`}>
                    {m.content}
                    <span className="block text-[9px] opacity-75 mt-1.5 text-right font-mono">
                      {m.timestamp}
                    </span>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex gap-2 text-xs text-brand-slate items-center">
                  <span className="animate-bounce">●</span>
                  <span className="animate-bounce" style={{ animationDelay: '0.2s' }}>●</span>
                  <span className="animate-bounce" style={{ animationDelay: '0.4s' }}>●</span>
                  <span className="italic block text-[10px]">Sphere AI Coach processing raw counts...</span>
                </div>
              )}
            </div>
          </div>

          {/* Input formulation */}
          <form onSubmit={handleSendMessage} className="mt-4 pt-3 border-t border-zinc-200 dark:border-zinc-800 flex gap-2">
            <input 
              type="text"
              placeholder="Ask anything or click one of the suggested query bubbles..."
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              className="flex-1 p-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs focus:ring-1 focus:ring-brand-primary focus:outline-none placeholder:text-zinc-400 dark:text-zinc-100"
            />
            <button 
              type="submit"
              className="p-2.5 bg-brand-primary hover:bg-opacity-90 rounded-xl text-white cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>

      </div>

    </div>
  );
}
