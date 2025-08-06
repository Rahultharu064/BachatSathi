import React, { useState, useEffect } from 'react';
import { 
  Home, Target, Users, TrendingUp, Gift, Bot, Bell, User, LogOut,
  Plus, Edit, Trash2, Award, Clock, DollarSign, PieChart, BarChart3,
  Calendar, Filter, Download, Settings, Star, Trophy, Coins,
  ArrowUp, ArrowDown, ChevronRight, RefreshCw, Menu, X
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPieChart, Cell, AreaChart, Area, Pie } from 'recharts';

const HamroSaveDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSpinning, setIsSpinning] = useState(false);
  const [totalSavings, setTotalSavings] = useState(0);
  const [rewardsPoints, setRewardsPoints] = useState(0);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Check for mobile screen size
  useEffect(() => {
    const checkScreenSize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) {
        setSidebarCollapsed(true);
        setMobileMenuOpen(false);
      }
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Animated counter effect
  useEffect(() => {
    const targetSavings = 125750;
    const targetRewards = 2450;
    const duration = 2000;
    const increment = targetSavings / (duration / 16);
    const rewardIncrement = targetRewards / (duration / 16);
    
    let currentSavings = 0;
    let currentRewards = 0;
    
    const timer = setInterval(() => {
      currentSavings += increment;
      currentRewards += rewardIncrement;
      
      if (currentSavings >= targetSavings) {
        setTotalSavings(targetSavings);
        setRewardsPoints(targetRewards);
        clearInterval(timer);
      } else {
        setTotalSavings(Math.floor(currentSavings));
        setRewardsPoints(Math.floor(currentRewards));
      }
    }, 16);
    
    return () => clearInterval(timer);
  }, []);

  const sidebarItems = [
    { id: 'dashboard', icon: Home, label: 'Dashboard Overview' },
    { id: 'goals', icon: Target, label: 'My Saving Goals' },
    { id: 'group', icon: Users, label: 'Group Savings' },
    { id: 'investments', icon: TrendingUp, label: 'Investment Plans' },
    { id: 'spin', icon: Gift, label: 'Spin-to-Win' },
    { id: 'ai', icon: Bot, label: 'AI Financial Assistant' },
    { id: 'notifications', icon: Bell, label: 'Notifications & Transactions' },
    { id: 'profile', icon: User, label: 'Profile' },
  ];

  const investmentData = [
    { month: 'Jan', value: 15000 },
    { month: 'Feb', value: 22000 },
    { month: 'Mar', value: 28000 },
    { month: 'Apr', value: 35000 },
    { month: 'May', value: 42000 },
    { month: 'Jun', value: 48000 },
  ];

  const savingsAllocation = [
    { name: 'Education', value: 35, color: '#3B82F6' },
    { name: 'Wedding', value: 25, color: '#10B981' },
    { name: 'Phone', value: 20, color: '#F59E0B' },
    { name: 'Emergency', value: 20, color: '#EF4444' },
  ];

  const goals = [
    { id: 1, name: 'iPhone 15 Pro', target: 150000, current: 89500, status: 'Active', type: 'gadget', daysLeft: 45 },
    { id: 2, name: 'Wedding Fund', target: 500000, current: 325000, status: 'Locked', type: 'wedding', daysLeft: 180 },
    { id: 3, name: 'Masters Degree', target: 800000, current: 245000, status: 'Active', type: 'education', daysLeft: 365 },
  ];

  const groupSavings = [
    { id: 1, name: 'Friends Trip to Pokhara', members: 8, target: 80000, current: 45000, role: 'Admin', status: 'Active' },
    { id: 2, name: 'Office Party Fund', members: 15, target: 50000, current: 38000, role: 'Member', status: 'Voting' },
    { id: 3, name: 'Gaming Setup', members: 4, target: 200000, current: 125000, role: 'Member', status: 'Active' },
  ];

  const spinHistory = [
    { date: '2025-07-26', reward: '500 Points', type: 'points' },
    { date: '2025-07-25', reward: '₹50 Cashback', type: 'cash' },
    { date: '2025-07-24', reward: '1000 Points', type: 'points' },
    { date: '2025-07-23', reward: '₹25 Cashback', type: 'cash' },
  ];

  const notifications = [
    { id: 1, type: 'goal', message: 'You\'re 60% towards your iPhone goal!', time: '2 hours ago', read: false },
    { id: 2, type: 'group', message: 'Friends Trip group needs your vote', time: '5 hours ago', read: false },
    { id: 3, type: 'reward', message: 'You earned 500 points from daily spin!', time: '1 day ago', read: true },
    { id: 4, type: 'investment', message: 'Your crypto investment is up 12%', time: '2 days ago', read: true },
  ];

  const handleSpin = () => {
    setIsSpinning(true);
    setTimeout(() => {
      setIsSpinning(false);
      setRewardsPoints(prev => prev + 750);
    }, 3000);
  };

  const toggleSidebar = () => {
    if (isMobile) {
      setMobileMenuOpen(!mobileMenuOpen);
    } else {
      setSidebarCollapsed(!sidebarCollapsed);
    }
  };

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    if (isMobile) {
      setMobileMenuOpen(false);
    }
  };

  const StatCard = ({ title, value, icon: Icon, trend, color = "blue" }) => (
    <div className="bg-white rounded-2xl p-4 md:p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:scale-[1.02]">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-2 md:p-3 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600`}>
          <Icon className="w-4 h-4 md:w-6 md:h-6 text-white" />
        </div>
        {trend && (
          <div className={`flex items-center text-xs md:text-sm ${trend > 0 ? 'text-green-600' : 'text-red-600'}`}>
            {trend > 0 ? <ArrowUp className="w-3 h-3 md:w-4 md:h-4 mr-1" /> : <ArrowDown className="w-3 h-3 md:w-4 md:h-4 mr-1" />}
            {Math.abs(trend)}%
          </div>
        )}
      </div>
      <h3 className="text-gray-600 text-xs md:text-sm font-medium mb-2">{title}</h3>
      <p className="text-xl md:text-2xl font-bold text-gray-900">{value}</p>
    </div>
  );

  const GoalCard = ({ goal }) => {
    const progress = (goal.current / goal.target) * 100;
    return (
      <div className="bg-white rounded-2xl p-4 md:p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-900 text-sm md:text-base">{goal.name}</h3>
          <span className={`px-2 md:px-3 py-1 rounded-full text-xs font-medium ${
            goal.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
          }`}>
            {goal.status}
          </span>
        </div>
        <div className="mb-4">
          <div className="flex justify-between text-xs md:text-sm text-gray-600 mb-2">
            <span>₹{goal.current.toLocaleString()}</span>
            <span>₹{goal.target.toLocaleString()}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-blue-500 to-green-500 h-3 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="text-center mt-2 text-xs md:text-sm font-medium text-gray-700">
            {progress.toFixed(1)}% Complete
          </div>
        </div>
        <div className="flex items-center justify-between text-xs md:text-sm text-gray-600">
          <span className="flex items-center">
            <Clock className="w-3 h-3 md:w-4 md:h-4 mr-1" />
            {goal.daysLeft} days left
          </span>
          <div className="flex space-x-2">
            <button className="p-1 md:p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
              <Edit className="w-3 h-3 md:w-4 md:h-4" />
            </button>
            <button className="p-1 md:p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
              <Trash2 className="w-3 h-3 md:w-4 md:h-4" />
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderDashboard = () => (
    <div className="space-y-6 md:space-y-8 animate-fadeIn">
      <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
        <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
          Welcome back, Sagar! 👋
        </h1>
        <div className="flex items-center space-x-3">
          <div className="flex items-center bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 md:px-4 py-2 rounded-xl">
            <Star className="w-4 h-4 md:w-5 md:h-5 mr-2" />
            <span className="font-semibold text-sm md:text-base">{rewardsPoints.toLocaleString()} Points</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <StatCard
          title="Total Savings"
          value={`₹${totalSavings.toLocaleString()}`}
          icon={DollarSign}
          trend={12.5}
          color="blue"
        />
        <StatCard
          title="Active Goals"
          value="3"
          icon={Target}
          trend={0}
          color="green"
        />
        <StatCard
          title="Spin Rewards Earned"
          value="₹2,350"
          icon={Gift}
          trend={25.8}
          color="purple"
        />
        <StatCard
          title="Investment Growth"
          value="₹48,200"
          icon={TrendingUp}
          trend={18.7}
          color="emerald"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
        <div className="bg-white rounded-2xl p-4 md:p-6 shadow-lg">
          <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-6">Investment Performance</h2>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={investmentData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: 'none', 
                  borderRadius: '12px', 
                  boxShadow: '0 10px 25px rgba(0,0,0,0.1)' 
                }} 
              />
              <Area 
                type="monotone" 
                dataKey="value" 
                stroke="url(#gradient)" 
                fill="url(#gradient)" 
                strokeWidth={3}
              />
              <defs>
                <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#10B981" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-2xl p-4 md:p-6 shadow-lg">
          <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-6">Saving Allocation</h2>
          <ResponsiveContainer width="100%" height={300}>
            <RechartsPieChart>
              <Pie
                data={savingsAllocation}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {savingsAllocation.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </RechartsPieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-4 mt-4">
            {savingsAllocation.map((item, index) => (
              <div key={index} className="flex items-center">
                <div 
                  className="w-3 h-3 rounded-full mr-3" 
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-xs md:text-sm text-gray-600">{item.name} ({item.value}%)</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-4 md:p-6 shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 space-y-2 md:space-y-0">
          <h2 className="text-lg md:text-xl font-semibold text-gray-900">Recent Goals Progress</h2>
          <button 
            onClick={() => setActiveTab('goals')}
            className="flex items-center text-blue-600 hover:text-blue-700 font-medium text-sm md:text-base"
          >
            View All <ChevronRight className="w-4 h-4 ml-1" />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {goals.slice(0, 3).map(goal => (
            <GoalCard key={goal.id} goal={goal} />
          ))}
        </div>
      </div>
    </div>
  );

  const renderGoals = () => (
    <div className="space-y-6 md:space-y-8 animate-fadeIn">
      <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">My Saving Goals</h1>
        <button className="bg-gradient-to-r from-blue-600 to-green-600 text-white px-4 md:px-6 py-2 md:py-3 rounded-xl hover:shadow-lg transition-all duration-300 flex items-center text-sm md:text-base">
          <Plus className="w-4 h-4 md:w-5 md:h-5 mr-2" />
          Create New Goal
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {goals.map(goal => (
          <GoalCard key={goal.id} goal={goal} />
        ))}
      </div>

      <div className="bg-white rounded-2xl p-4 md:p-6 shadow-lg">
        <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-6">Goal Achievement Timeline</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={investmentData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="month" stroke="#6b7280" />
            <YAxis stroke="#6b7280" />
            <Tooltip />
            <Line 
              type="monotone" 
              dataKey="value" 
              stroke="#3B82F6" 
              strokeWidth={3}
              dot={{ fill: '#3B82F6', strokeWidth: 2, r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );

  const renderGroupSavings = () => (
    <div className="space-y-6 md:space-y-8 animate-fadeIn">
      <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Group Savings</h1>
        <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 md:px-6 py-2 md:py-3 rounded-xl hover:shadow-lg transition-all duration-300 flex items-center text-sm md:text-base">
          <Users className="w-4 h-4 md:w-5 md:h-5 mr-2" />
          Join New Group
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {groupSavings.map(group => (
          <div key={group.id} className="bg-white rounded-2xl p-4 md:p-6 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900 text-sm md:text-base">{group.name}</h3>
              <span className={`px-2 md:px-3 py-1 rounded-full text-xs font-medium ${
                group.status === 'Active' ? 'bg-green-100 text-green-700' : 
                group.status === 'Voting' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'
              }`}>
                {group.status}
              </span>
            </div>
            
            <div className="flex items-center text-xs md:text-sm text-gray-600 mb-4">
              <Users className="w-3 h-3 md:w-4 md:h-4 mr-2" />
              {group.members} members • Your role: {group.role}
            </div>

            <div className="mb-4">
              <div className="flex justify-between text-xs md:text-sm text-gray-600 mb-2">
                <span>₹{group.current.toLocaleString()}</span>
                <span>₹{group.target.toLocaleString()}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${(group.current / group.target) * 100}%` }}
                />
              </div>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-xs md:text-sm font-medium text-gray-700">
                {((group.current / group.target) * 100).toFixed(1)}% Complete
              </span>
              <div className="flex space-x-2">
                <button className="px-3 md:px-4 py-1 md:py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-xs md:text-sm">
                  Contribute
                </button>
                {group.status === 'Voting' && (
                  <button className="px-3 md:px-4 py-1 md:py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors text-xs md:text-sm">
                    Vote
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderSpin = () => (
    <div className="space-y-6 md:space-y-8 animate-fadeIn">
      <div className="text-center">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Daily Spin to Win! 🎰</h1>
        <p className="text-gray-600 text-sm md:text-base">Spin the wheel daily for amazing rewards and bonus points!</p>
      </div>

      <div className="bg-white rounded-2xl p-4 md:p-8 shadow-lg text-center">
        <div className="relative inline-block">
          <div 
            className={`w-48 h-48 md:w-64 md:h-64 mx-auto mb-6 md:mb-8 rounded-full bg-gradient-to-r from-yellow-400 via-red-500 to-purple-600 flex items-center justify-center text-white text-4xl md:text-6xl font-bold shadow-2xl ${
              isSpinning ? 'animate-spin' : ''
            }`}
            style={{ animationDuration: isSpinning ? '3s' : '0s' }}
          >
            🎯
          </div>
          <button
            onClick={handleSpin}
            disabled={isSpinning}
            className={`px-6 md:px-8 py-3 md:py-4 rounded-xl font-bold text-base md:text-lg transition-all duration-300 ${
              isSpinning 
                ? 'bg-gray-400 text-gray-600 cursor-not-allowed' 
                : 'bg-gradient-to-r from-orange-500 to-red-500 text-white hover:shadow-lg hover:scale-105'
            }`}
          >
            {isSpinning ? 'Spinning...' : 'SPIN NOW!'}
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-4 md:p-6 shadow-lg">
        <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-6">Recent Spin History</h2>
        <div className="space-y-4">
          {spinHistory.map((spin, index) => (
            <div key={index} className="flex items-center justify-between p-3 md:p-4 bg-gray-50 rounded-xl">
              <div className="flex items-center">
                <div className={`w-3 h-3 rounded-full mr-3 md:mr-4 ${
                  spin.type === 'points' ? 'bg-blue-500' : 'bg-green-500'
                }`} />
                <div>
                  <p className="font-medium text-gray-900 text-sm md:text-base">{spin.reward}</p>
                  <p className="text-xs md:text-sm text-gray-600">{spin.date}</p>
                </div>
              </div>
              <button className="px-3 md:px-4 py-1 md:py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-xs md:text-sm">
                Claim
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderNotifications = () => (
    <div className="space-y-6 md:space-y-8 animate-fadeIn">
      <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Notifications & Transactions</h1>
        <div className="flex space-x-3">
          <button className="flex items-center px-3 md:px-4 py-2 border border-gray-300 rounded-xl hover:bg-gray-50 text-sm md:text-base">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </button>
          <button className="flex items-center px-3 md:px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 text-sm md:text-base">
            <Download className="w-4 h-4 mr-2" />
            Export
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-4 md:p-6 shadow-lg">
        <div className="space-y-4">
          {notifications.map(notification => (
            <div key={notification.id} className={`p-3 md:p-4 rounded-xl border-l-4 ${
              notification.read ? 'bg-gray-50 border-gray-300' : 'bg-blue-50 border-blue-500'
            }`}>
              <div className="flex items-start justify-between">
                <div className="flex items-start">
                  <div className={`p-2 rounded-lg mr-3 md:mr-4 ${
                    notification.type === 'goal' ? 'bg-green-100 text-green-600' :
                    notification.type === 'group' ? 'bg-purple-100 text-purple-600' :
                    notification.type === 'reward' ? 'bg-yellow-100 text-yellow-600' :
                    'bg-blue-100 text-blue-600'
                  }`}>
                    {notification.type === 'goal' && <Target className="w-3 h-3 md:w-4 md:h-4" />}
                    {notification.type === 'group' && <Users className="w-3 h-3 md:w-4 md:h-4" />}
                    {notification.type === 'reward' && <Gift className="w-3 h-3 md:w-4 md:h-4" />}
                    {notification.type === 'investment' && <TrendingUp className="w-3 h-3 md:w-4 md:h-4" />}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 text-sm md:text-base">{notification.message}</p>
                    <p className="text-xs md:text-sm text-gray-600">{notification.time}</p>
                  </div>
                </div>
                {!notification.read && (
                  <div className="w-3 h-3 bg-blue-500 rounded-full" />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderProfile = () => (
    <div className="space-y-6 md:space-y-8 animate-fadeIn">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Profile</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
        <div className="bg-white rounded-2xl p-4 md:p-6 shadow-lg">
          <div className="text-center">
            <div className="w-20 h-20 md:w-24 md:h-24 bg-gradient-to-r from-blue-500 to-green-500 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-xl md:text-2xl font-bold">
              SG
            </div>
            <h2 className="text-lg md:text-xl font-semibold text-gray-900">Sagar Gurung</h2>
            <p className="text-gray-600 text-sm md:text-base">sagar@hamrosave.com</p>
            <div className="mt-4 flex items-center justify-center bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 md:px-4 py-2 rounded-xl">
              <Trophy className="w-4 h-4 md:w-5 md:h-5 mr-2" />
              <span className="font-semibold text-sm md:text-base">{rewardsPoints.toLocaleString()} Points</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl p-4 md:p-6 shadow-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <input 
                  type="text" 
                  value="Sagar Gurung" 
                  className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm md:text-base"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input 
                  type="email" 
                  value="sagar@hamrosave.com" 
                  className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm md:text-base"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Mobile</label>
                <input 
                  type="tel" 
                  value="+977 9851234567" 
                  className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm md:text-base"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                <input 
                  type="text" 
                  value="Kathmandu, Nepal" 
                  className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm md:text-base"
                />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 md:p-6 shadow-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Rewards Summary</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
              <div className="text-center p-3 md:p-4 bg-blue-50 rounded-xl">
                <Coins className="w-6 h-6 md:w-8 md:h-8 text-blue-600 mx-auto mb-2" />
                <p className="text-xl md:text-2xl font-bold text-blue-600">1,250</p>
                <p className="text-xs md:text-sm text-gray-600">Spin Points</p>
              </div>
              <div className="text-center p-3 md:p-4 bg-green-50 rounded-xl">
                <Users className="w-6 h-6 md:w-8 md:h-8 text-green-600 mx-auto mb-2" />
                <p className="text-xl md:text-2xl font-bold text-green-600">800</p>
                <p className="text-xs md:text-sm text-gray-600">Referral Points</p>
              </div>
              <div className="text-center p-3 md:p-4 bg-purple-50 rounded-xl">
                <Award className="w-6 h-6 md:w-8 md:h-8 text-purple-600 mx-auto mb-2" />
                <p className="text-xl md:text-2xl font-bold text-purple-600">400</p>
                <p className="text-xs md:text-sm text-gray-600">Milestone Bonus</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 md:p-6 shadow-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Linked Wallets</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 md:p-4 border border-gray-200 rounded-xl">
                <div className="flex items-center">
                  <div className="w-8 h-8 md:w-10 md:h-10 bg-orange-500 rounded-lg flex items-center justify-center text-white font-bold mr-3 text-sm md:text-base">
                    M
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 text-sm md:text-base">MetaMask</p>
                    <p className="text-xs md:text-sm text-gray-600">0x1234...5678</p>
                  </div>
                </div>
                <span className="px-2 md:px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs md:text-sm">Connected</span>
              </div>
              <div className="flex items-center justify-between p-3 md:p-4 border border-gray-200 rounded-xl">
                <div className="flex items-center">
                  <div className="w-8 h-8 md:w-10 md:h-10 bg-green-500 rounded-lg flex items-center justify-center text-white font-bold mr-3 text-sm md:text-base">
                    E
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 text-sm md:text-base">eSewa</p>
                    <p className="text-xs md:text-sm text-gray-600">98512*****</p>
                  </div>
                </div>
                <span className="px-2 md:px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs md:text-sm">Connected</span>
              </div>
              <div className="flex items-center justify-between p-3 md:p-4 border border-gray-200 rounded-xl">
                <div className="flex items-center">
                  <div className="w-8 h-8 md:w-10 md:h-10 bg-purple-500 rounded-lg flex items-center justify-center text-white font-bold mr-3 text-sm md:text-base">
                    K
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 text-sm md:text-base">Khalti</p>
                    <p className="text-xs md:text-sm text-gray-600">98123*****</p>
                  </div>
                </div>
                <span className="px-2 md:px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs md:text-sm">Disconnected</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return renderDashboard();
      case 'goals':
        return renderGoals();
      case 'group':
        return renderGroupSavings();
      case 'spin':
        return renderSpin();
      case 'notifications':
        return renderNotifications();
      case 'profile':
        return renderProfile();
      default:
        return renderDashboard();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Mobile Overlay */}
      {isMobile && mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed left-0 top-0 h-full bg-gradient-to-b from-blue-600 to-blue-800 text-white shadow-2xl z-50 transition-all duration-300 ${
        isMobile 
          ? `w-64 ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`
          : sidebarCollapsed 
            ? 'w-20' 
            : 'w-64'
      }`}>
        <div className="p-4 md:p-6">
          <div className="flex items-center mb-6 md:mb-8">
            <div className="w-8 h-8 md:w-10 md:h-10 bg-white rounded-lg flex items-center justify-center text-blue-600 font-bold text-lg md:text-xl mr-3">
              H
            </div>
            {(!sidebarCollapsed || isMobile) && (
              <div>
                <h1 className="font-bold text-lg md:text-xl">HamroSave</h1>
                <p className="text-blue-200 text-xs md:text-sm">Smart Savings</p>
              </div>
            )}
          </div>

          <nav className="space-y-2">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => handleTabChange(item.id)}
                  className={`w-full flex items-center px-3 md:px-4 py-2 md:py-3 rounded-xl transition-all duration-300 text-left ${
                    activeTab === item.id
                      ? 'bg-white text-blue-600 shadow-lg transform scale-105'
                      : 'text-blue-100 hover:bg-blue-700 hover:text-white'
                  } ${sidebarCollapsed && !isMobile ? 'justify-center' : ''}`}
                  title={sidebarCollapsed && !isMobile ? item.label : ''}
                >
                  <Icon className="w-4 h-4 md:w-5 md:h-5 mr-3" />
                  {(!sidebarCollapsed || isMobile) && (
                    <>
                      <span className="font-medium text-sm md:text-base">{item.label}</span>
                      {item.id === 'profile' && (
                        <div className="ml-auto bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full text-xs font-bold">
                          {Math.floor(rewardsPoints / 100)}
                        </div>
                      )}
                    </>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="absolute bottom-4 md:bottom-6 left-4 md:left-6 right-4 md:right-6">
          <button className={`w-full flex items-center px-3 md:px-4 py-2 md:py-3 text-blue-100 hover:bg-blue-700 rounded-xl transition-all duration-300 ${
            sidebarCollapsed && !isMobile ? 'justify-center' : ''
          }`}>
            <LogOut className="w-4 h-4 md:w-5 md:h-5 mr-3" />
            {(!sidebarCollapsed || isMobile) && (
              <span className="font-medium text-sm md:text-base">Logout</span>
            )}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className={`transition-all duration-300 ${
        isMobile 
          ? 'ml-0' 
          : sidebarCollapsed 
            ? 'ml-20' 
            : 'ml-64'
      } p-4 md:p-8`}>
        {/* Mobile Header */}
        <div className="flex items-center justify-between mb-6 md:hidden">
          <button
            onClick={toggleSidebar}
            className="p-2 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Menu className="w-6 h-6 text-gray-600" />
          </button>
          <div className="flex items-center bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-2 rounded-xl">
            <Star className="w-4 h-4 mr-2" />
            <span className="font-semibold text-sm">{rewardsPoints.toLocaleString()}</span>
          </div>
        </div>

        {/* Desktop Toggle Button */}
        {!isMobile && (
          <div className="mb-6 md:mb-8 flex justify-end">
            <button
              onClick={toggleSidebar}
              className="p-2 md:p-3 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              {sidebarCollapsed ? (
                <Menu className="w-5 h-5 md:w-6 md:h-6 text-gray-600" />
              ) : (
                <X className="w-5 h-5 md:w-6 md:h-6 text-gray-600" />
              )}
            </button>
          </div>
        )}

        {renderContent()}
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out;
        }
      `}</style>
    </div>
  );
};

export default HamroSaveDashboard;
