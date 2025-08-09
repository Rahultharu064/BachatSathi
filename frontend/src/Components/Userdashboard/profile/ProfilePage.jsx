import React, { useState } from 'react';
import { 
  User,
  TrendingUp,  // Add this
  Mail, 
  Star, 
  Award, 
  BookOpen, 
  Users, 
  Calendar,
  MapPin,
  Edit,
  Eye,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  BarChart,
  Coins,
  Target,
  CreditCard,
  Settings,
  Lock,
  ChevronDown,
  Search,
  Bell,
  X
} from 'lucide-react';



const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState('spin');
  const [editMode, setEditMode] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showRedeemModal, setShowRedeemModal] = useState(false);
  const [selectedReward, setSelectedReward] = useState(null);

  // Sample user data
  const userData = {
    name: "Priya Sharma",
    email: "priya.sharma@example.com",
    phone: "+977 9841234567",
    coins: 1250,
    goalsCreated: 8,
    totalSavings: 125000,
    completedGoals: 3,
    spinCount: 15,
    disputeParticipation: 2
  };

  // Sample data
  const badges = [
    { id: 1, name: "Savings Guru", earned: true },
    { id: 2, name: "Goal Crusher", earned: true },
    { id: 3, name: "Spin Master", earned: true },
    { id: 4, name: "Early Saver", earned: false }
  ];

  const redeemableItems = [
    { id: 1, name: "₹5 Cashback", coins: 50, description: 'Get ₹5 cashback on your next transaction' },
    { id: 2, name: "10% Discount", coins: 100, description: '10% off on partner vendors' },
    { id: 3, name: "Free Shipping", coins: 75, description: 'Free shipping on next purchase' }
  ];

  const historyData = {
    spin: [
      { id: 1, date: '2023-06-15', result: '10% Discount', coins: 20 },
      { id: 2, date: '2023-06-10', result: '₹5 Cashback', coins: 15 }
    ],
    redemption: [
      { id: 1, date: '2023-05-20', item: '₹5 Cashback', coins: 50 }
    ],
    goals: [
      { id: 1, date: '2023-06-01', goal: 'Emergency Fund', amount: 50000 }
    ]
  };

  const applications = [
    { id: 1, title: "Gold Loan", company: "Bank of Nepal", status: "Pending" },
    { id: 2, title: "Home Loan", company: "Global IME", status: "Accepted" },
    { id: 3, title: "Education Loan", company: "NIC Asia", status: "Rejected" }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Accepted': return 'bg-green-100 text-green-800';
      case 'Rejected': return 'bg-red-100 text-red-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Accepted': return <CheckCircle className="w-4 h-4" />;
      case 'Rejected': return <XCircle className="w-4 h-4" />;
      case 'Pending': return <Clock className="w-4 h-4" />;
      default: return <AlertCircle className="w-4 h-4" />;
    }
  };

  const handleRedeem = (item) => {
    setSelectedReward(item);
    setShowRedeemModal(true);
  };

  const confirmRedeem = () => {
    if (userData.coins >= selectedReward.coins) {
      // Update coins balance
      setShowRedeemModal(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-2xl shadow-lg max-w-4xl w-full overflow-hidden">
        {/* Header Section */}
        <div className="relative">
          <div className="h-32 bg-gradient-to-r from-blue-500 to-blue-600"></div>
          <div className="px-6 sm:px-8 pb-5">
            <div className="flex flex-col sm:flex-row items-start sm:items-end -mt-16 mb-6 gap-6">
              <div className="relative">
                <div className="w-32 h-32 rounded-full bg-blue-100 border-4 border-[#2A66DE] flex items-center justify-center overflow-hidden">
                  <User className="w-16 h-16 text-blue-500" />
                </div>
                <div className="absolute bottom-0 right-0 bg-green-500 w-6 h-6 rounded-full border-4 border-white"></div>
              </div>
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center w-full">
                  <div>
                    <h1 className="text-2xl font-bold text-gray-800">{userData.name}</h1>
                    <p className="text-gray-500 text-sm">{userData.email}</p>
                  </div>
                  <button 
                    onClick={() => setEditMode(!editMode)}
                    className="mt-3 sm:mt-0 bg-[#2A66DE] text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
                  >
                    <Edit className="w-4 h-4" />
                    Edit Profile
                  </button>
                </div>
              </div>
            </div>

            {/* Bio Section */}
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-2">Financial Overview</h2>
              <p className="text-gray-600 leading-relaxed">
                Active saver with {userData.completedGoals} completed goals and ₹{userData.totalSavings.toLocaleString()} 
                total savings. Passionate about financial growth and smart investments.
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              {/* Total Savings */}
              <div className="bg-blue-50 rounded-xl p-4 flex flex-col items-center">
                <div className="text-gray-500 mb-1 text-sm">Total Savings</div>
                <div className="font-bold text-xl mb-1">₹{userData.totalSavings.toLocaleString()}</div>
                <div className="text-sm text-blue-500 flex items-center">
                  <TrendingUp className="w-4 h-4 mr-1" /> 12.5% growth
                </div>
              </div>

              {/* Goals Completed */}
              <div className="bg-blue-50 rounded-xl p-4 flex flex-col items-center">
                <div className="text-gray-500 mb-1 text-sm">Goals Completed</div>
                <div className="font-bold text-xl mb-1">{userData.completedGoals}</div>
                <div className="text-sm text-blue-500">
                  of {userData.goalsCreated} total
                </div>
              </div>

              {/* Available Coins */}
              <div className="bg-blue-50 rounded-xl p-4 flex flex-col items-center">
                <div className="text-gray-500 mb-1 text-sm">Available Coins</div>
                <div className="font-bold text-xl mb-1">{userData.coins}</div>
                <div className="flex items-center gap-1 text-sm text-blue-500">
                  <Coins className="w-4 h-4" />
                  <span>Redeem rewards</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Badges Section */}
        <div className="px-6 sm:px-8 mb-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Financial Achievements
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {badges.map((badge) => (
              <div
                key={badge.id}
                className={`bg-blue-50 rounded-lg p-4 flex flex-col items-center group relative cursor-pointer ${!badge.earned && 'opacity-50'}`}
              >
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-[#2A66DE] mb-2">
                  <Award className="w-6 h-6" />
                </div>
                <div className="font-medium text-gray-800">{badge.name}</div>
                {badge.earned && (
                  <div className="absolute invisible group-hover:visible bg-gray-800 text-white text-xs rounded py-1 px-2 bottom-full mb-2 w-full max-w-[200px] opacity-0 group-hover:opacity-100 transition-opacity">
                    Earned for financial milestones
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Rewards Section */}
        <div className="px-6 sm:px-8 mb-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Redeem Rewards
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {redeemableItems.map((item) => (
              <div key={item.id} className="bg-white border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-medium">{item.name}</h3>
                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                    {item.coins} Coins
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-4">{item.description}</p>
                <button
                  onClick={() => handleRedeem(item)}
                  disabled={userData.coins < item.coins}
                  className={`w-full py-2 rounded-md text-sm ${userData.coins >= item.coins ? 
                    'bg-[#2A66DE] text-white hover:bg-blue-700' : 
                    'bg-gray-200 text-gray-500 cursor-not-allowed'}`}
                >
                  Redeem Now
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Applications Section */}
        <div className="px-6 sm:px-8 mb-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Recent Applications
          </h2>
          <div className="bg-gray-50 rounded-xl overflow-hidden">
            {applications.map((application, index) => (
              <div
                key={application.id}
                className={`p-4 flex justify-between items-center ${index % 2 === 0 ? "bg-white" : ""}`}
              >
                <div>
                  <div className="font-medium text-gray-800">
                    {application.title}
                  </div>
                  <div className="text-sm text-gray-500">
                    {application.company}
                  </div>
                </div>
                <div className={`px-3 py-1 rounded-full text-sm flex items-center gap-1 ${getStatusColor(application.status)}`}>
                  {getStatusIcon(application.status)}
                  {application.status}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="px-6 sm:px-8 pb-8 flex flex-wrap gap-3">
          <button className="bg-[#2A66DE] text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition flex items-center gap-2">
            <Coins className="w-4 h-4" />
            View All Rewards
          </button>
          <button className="border border-[#2A66DE] text-[#2A66DE] px-4 py-2 rounded-lg hover:bg-blue-50 transition flex items-center gap-2">
            <Target className="w-4 h-4" />
            My Savings Goals
          </button>
          <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition flex items-center gap-2">
            <CreditCard className="w-4 h-4" />
            Payment Methods
          </button>
        </div>

        {/* Redeem Modal */}
        {showRedeemModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-md w-full p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-800">Confirm Redemption</h3>
                <button 
                  onClick={() => setShowRedeemModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="bg-blue-50 rounded-lg p-4">
                  <p className="font-medium">{selectedReward?.name}</p>
                  <p className="text-sm text-gray-600">{selectedReward?.description}</p>
                  <p className="text-sm mt-2">
                    <span className="font-medium">Cost:</span> {selectedReward?.coins} Coins
                  </p>
                </div>
                
                <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
                  <p className="font-medium">Your Balance:</p>
                  <p className="text-blue-500 font-bold">{userData.coins} Coins</p>
                </div>
                
                <div className="flex space-x-3 pt-4">
                  <button 
                    onClick={() => setShowRedeemModal(false)}
                    className="flex-1 bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300 transition"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={confirmRedeem}
                    className="flex-1 bg-[#2A66DE] text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;