
import React, { useState, useEffect } from 'react';
import { 
  Menu, X, Home, Target, Gift, Store, Users, MessageSquare, 
  AlertTriangle, Wallet, User, Calculator, Bell, Search,
  ChevronRight, TrendingUp, Award, Clock, Hash, Settings, LogOut,
  Play, Pause, RotateCcw
} from 'lucide-react';

const HamroSaveDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('Home');
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [spinning, setSpinning] = useState(false);
  const [spinRotation, setSpinRotation] = useState(0);

  // Sample data
  const goals = [
    { id: 1, name: "Emergency Fund", current: 2500, target: 5000, progress: 50, hash: "0x1a2b3c..." },
    { id: 2, name: "Vacation Savings", current: 750, target: 2000, progress: 37.5, hash: "0x4d5e6f..." },
    { id: 3, name: "New Car", current: 8000, target: 15000, progress: 53.3, hash: "0x7g8h9i..." }
  ];

  const leaderboardData = [
    { rank: 1, name: "Sarah Johnson", points: 12450, badge: "🏆" },
    { rank: 2, name: "Mike Chen", points: 11200, badge: "🥈" },
    { rank: 3, name: "Emma Davis", points: 10800, badge: "🥉" },
    { rank: 4, name: "You", points: 9650, badge: "" }
  ];

  const recentTransactions = [
    { id: 1, type: "Goal Deposit", amount: "+$250", date: "Today", status: "completed" },
    { id: 2, type: "Spin Reward", amount: "+$50", date: "Yesterday", status: "completed" },
    { id: 3, type: "Vendor Purchase", amount: "-$89", date: "2 days ago", status: "completed" }
  ];

  const navigationItems = [
    { icon: Home, label: 'Home', id: 'Home' },
    { icon: Target, label: 'My Goals', id: 'Goals' },
    { icon: Gift, label: 'Spin & Rewards', id: 'Spin' },
    { icon: Store, label: 'Vendor Offers', id: 'Vendors' },
    { icon: Users, label: 'Group Saving', id: 'Group' },
    { icon: MessageSquare, label: 'Post Product Request', id: 'Requests' },
    { icon: AlertTriangle, label: 'Disputes', id: 'Disputes' },
    { icon: Wallet, label: 'My Wallet', id: 'Wallet' },
    { icon: User, label: 'Profile', id: 'Profile' },
    { icon: Calculator, label: 'Financial Calculators', id: 'Calculators' }
  ];

  const handleSpinWheel = () => {
    if (spinning) return;
    
    setSpinning(true);
    const newRotation = spinRotation + 1440 + Math.random() * 720; // At least 4 full rotations
    setSpinRotation(newRotation);
    
    setTimeout(() => {
      setSpinning(false);
    }, 3000);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userDropdownOpen && !event.target.closest('.user-dropdown')) {
        setUserDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [userDropdownOpen]);

  const GoalCard = ({ goal }) => (
    <div className="bg-white shadow-md rounded-lg border border-gray-300 p-6 hover:shadow-lg transition-shadow duration-300">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-semibold text-gray-800">{goal.name}</h3>
        <div className="flex items-center text-xs text-gray-500">
          <Hash size={12} className="mr-1" />
          <span>{goal.hash}</span>
        </div>
      </div>
      <div className="mb-4">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-gray-600">${goal.current.toLocaleString()}</span>
          <span className="text-gray-600">${goal.target.toLocaleString()}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
          <div 
            className="h-full bg-[#2A66DE] rounded-full transition-all duration-1000 ease-out"
            style={{ width: `${goal.progress}%` }}
          ></div>
        </div>
        <div className="text-right mt-2">
          <span className="text-[#2A66DE] font-semibold text-sm">{goal.progress}% Complete</span>
        </div>
      </div>
      <button className="w-full bg-[#2A66DE] hover:bg-blue-600 text-white font-semibold rounded-lg px-4 py-2 transition-all duration-200 hover:scale-105 hover:shadow-lg">
        Add Funds
      </button>
    </div>
  );

  const SpinWheel = () => (
    <div className="bg-white shadow-md rounded-lg border border-gray-300 p-6">
      <h3 className="text-xl font-bold text-gray-800 mb-6 text-center">Daily Spin Rewards</h3>
      <div className="flex flex-col items-center">
        <div className="relative w-48 h-48 mb-6">
          <div 
            className="w-full h-full rounded-full border-8 border-[#2A66DE] bg-gradient-to-r from-blue-100 to-blue-50 flex items-center justify-center transition-transform duration-3000 ease-out"
            style={{ transform: `rotate(${spinRotation}deg)` }}
          >
            <div className="w-32 h-32 rounded-full bg-[#2A66DE] flex items-center justify-center text-white font-bold text-lg">
              <Gift size={32} />
            </div>
          </div>
          <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-6 border-l-transparent border-r-transparent border-b-[#2A66DE]"></div>
        </div>
        <button 
          onClick={handleSpinWheel}
          disabled={spinning}
          className="bg-[#2A66DE] hover:bg-blue-600 disabled:bg-gray-400 text-white font-semibold rounded-lg px-8 py-3 transition-all duration-200 hover:scale-105 hover:shadow-lg disabled:hover:scale-100 disabled:hover:shadow-none"
        >
          {spinning ? (
            <div className="flex items-center">
              <RotateCcw className="animate-spin mr-2" size={20} />
              Spinning...
            </div>
          ) : (
            <div className="flex items-center">
              <Play className="mr-2" size={20} />
              Spin Now!
            </div>
          )}
        </button>
        <p className="text-sm text-gray-500 mt-3 text-center">Win rewards, cashback, and bonus points!</p>
      </div>
    </div>
  );

  const renderMainContent = () => {
    switch (activeSection) {
      case 'Home':
        return (
          <div className="space-y-8">
            {/* Welcome Section */}
            <div className="bg-gradient-to-r from-[#2A66DE] to-blue-600 text-white rounded-lg p-6 shadow-lg">
              <h2 className="text-2xl font-bold mb-2">Welcome back, John!</h2>
              <p className="text-blue-100">You're making great progress on your financial goals. Keep it up!</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white shadow-md rounded-lg border border-gray-300 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm">Total Savings</p>
                    <p className="text-2xl font-bold text-gray-800">$11,250</p>
                  </div>
                  <TrendingUp className="text-[#2A66DE]" size={32} />
                </div>
              </div>
              <div className="bg-white shadow-md rounded-lg border border-gray-300 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm">Rewards Earned</p>
                    <p className="text-2xl font-bold text-gray-800">$325</p>
                  </div>
                  <Award className="text-[#2A66DE]" size={32} />
                </div>
              </div>
              <div className="bg-white shadow-md rounded-lg border border-gray-300 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm">Active Goals</p>
                    <p className="text-2xl font-bold text-gray-800">3</p>
                  </div>
                  <Target className="text-[#2A66DE]" size={32} />
                </div>
              </div>
              <div className="bg-white shadow-md rounded-lg border border-gray-300 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm">Leaderboard Rank</p>
                    <p className="text-2xl font-bold text-gray-800">#4</p>
                  </div>
                  <Users className="text-[#2A66DE]" size={32} />
                </div>
              </div>
            </div>

            {/* Goals Section */}
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Your Goals</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {goals.map(goal => (
                  <GoalCard key={goal.id} goal={goal} />
                ))}
              </div>
            </div>

            {/* Bottom Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <SpinWheel />
              
              {/* Recent Activity */}
              <div className="bg-white shadow-md rounded-lg border border-gray-300 p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Recent Activity</h3>
                <div className="space-y-4">
                  {recentTransactions.map(transaction => (
                    <div key={transaction.id} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                      <div>
                        <p className="font-medium text-gray-800">{transaction.type}</p>
                        <p className="text-sm text-gray-500">{transaction.date}</p>
                      </div>
                      <span className={`font-semibold ${transaction.amount.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                        {transaction.amount}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Leaderboard */}
            <div className="bg-white shadow-md rounded-lg border border-gray-300 p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Community Leaderboard</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Rank</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">User</th>
                      <th className="text-right py-3 px-4 font-semibold text-gray-700">Points</th>
                    </tr>
                  </thead>
                  <tbody>
                    {leaderboardData.map((user, index) => (
                      <tr key={user.rank} className={`border-b border-gray-100 hover:bg-blue-50 transition-colors ${user.name === 'You' ? 'bg-blue-50 border-[#2A66DE]' : ''}`}>
                        <td className="py-3 px-4">
                          <span className="flex items-center">
                            {user.badge && <span className="mr-2">{user.badge}</span>}
                            #{user.rank}
                          </span>
                        </td>
                        <td className="py-3 px-4 font-medium">{user.name}</td>
                        <td className="py-3 px-4 text-right font-semibold text-[#2A66DE]">{user.points.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );
      
      default:
        return (
          <div className="bg-white shadow-md rounded-lg border border-gray-300 p-8">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">{activeSection}</h2>
              <p className="text-gray-600">This section is under development. Coming soon!</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className={`fixed top-0 left-0 h-full bg-white border-r border-gray-300 transition-all duration-300 ease-in-out z-50 ${
        sidebarOpen ? 'w-64' : 'w-16'
      } lg:w-64`}>
        <div className="p-4">
          <div className="flex items-center justify-between">
            <h1 className={`font-bold text-xl text-[#2A66DE] transition-opacity duration-300 ${
              sidebarOpen ? 'opacity-100' : 'opacity-0'
            } lg:opacity-100`}>
              FinanceApp
            </h1>
          </div>
        </div>
        
        <nav className="mt-8">
          {navigationItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveSection(item.id);
                if (window.innerWidth < 1024) setSidebarOpen(false);
              }}
              className={`w-full flex items-center px-4 py-3 text-left hover:bg-blue-50 transition-colors duration-200 ${
                activeSection === item.id ? 'bg-blue-50 border-r-4 border-[#2A66DE] text-[#2A66DE]' : 'text-gray-700'
              }`}
            >
              <item.icon size={20} className="flex-shrink-0" />
              <span className={`ml-3 transition-opacity duration-300 ${
                sidebarOpen ? 'opacity-100' : 'opacity-0'
              } lg:opacity-100`}>
                {item.label}
              </span>
            </button>
          ))}
        </nav>
      </div>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className={`transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-16'} lg:ml-64`}>
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors lg:hidden"
              >
                {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
              <h2 className="ml-4 text-2xl font-bold text-gray-800">{activeSection}</h2>
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                <Bell size={20} className="text-gray-600" />
              </button>
              <div className="relative user-dropdown">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="w-8 h-8 bg-[#2A66DE] rounded-full flex items-center justify-center text-white font-semibold text-sm">
                    JD
                  </div>
                  <span className="hidden sm:block text-gray-700 font-medium">John Doe</span>
                </button>
                
                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                    <button className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-50 flex items-center">
                      <Settings size={16} className="mr-2" />
                      Settings
                    </button>
                    <button className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-50 flex items-center">
                      <LogOut size={16} className="mr-2" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="p-6">
          {renderMainContent()}
        </main>
      </div>
    </div>
  );
};

export default HamroSaveDashboard;