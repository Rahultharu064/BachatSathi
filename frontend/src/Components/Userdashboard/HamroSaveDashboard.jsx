import React, { useState } from 'react';
import { 
  Home, 
  Target, 
  Gift, 
  ShoppingBag, 
  Users, 
  PlusCircle, 
  AlertTriangle, 
  Wallet, 
  User, 
  Calculator,
  Menu,
  X,
  ChevronDown,
  TrendingUp,
  Star,
  Clock,
  CheckCircle,
  CreditCard,
  Download
} from 'lucide-react';

const HamroSaveDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentSection, setCurrentSection] = useState('home');
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const menuItems = [
    { id: 'home', name: 'Home', icon: Home },
    { id: 'goals', name: 'My Goals', icon: Target },
    { id: 'rewards', name: 'Spin & Rewards', icon: Gift },
    { id: 'vendors', name: 'Vendor Offers', icon: ShoppingBag },
    { id: 'groups', name: 'Group Saving', icon: Users },
    { id: 'requests', name: 'Post Product Request', icon: PlusCircle },
    { id: 'disputes', name: 'Disputes', icon: AlertTriangle },
    { id: 'wallet', name: 'My Wallet', icon: Wallet },
    { id: 'profile', name: 'Profile', icon: User },
    { id: 'calculators', name: 'Financial Calculators', icon: Calculator },
  ];

  const HomePage = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((goal) => (
          <div key={goal} className="bg-slate-800 bg-opacity-30 backdrop-blur-lg border border-slate-700 rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 hover:bg-opacity-40">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-semibold text-white">Dream Vacation</h3>
              <span className="text-emerald-400 text-sm">75% Complete</span>
            </div>
            <div className="mb-4">
              <div className="bg-slate-700 rounded-full h-3">
                <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full" style={{ width: '75%' }}></div>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-300">$7,500 / $10,000</span>
              <div className="flex items-center text-emerald-400">
                <CheckCircle className="h-4 w-4 mr-1" />
                <span className="text-xs">Verified</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-slate-800 bg-opacity-30 backdrop-blur-lg border border-slate-700 rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-white mb-4">Leaderboard</h3>
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((rank) => (
              <div key={rank} className="flex items-center justify-between p-3 bg-slate-700 bg-opacity-40 rounded-lg">
                <div className="flex items-center">
                  <span className="text-emerald-400 font-bold w-6">#{rank}</span>
                  <span className="text-white ml-3">User {rank}</span>
                </div>
                <span className="text-slate-300">$12,{500 - rank * 100}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-800 bg-opacity-30 backdrop-blur-lg border border-slate-700 rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-white mb-4">Your Badges</h3>
          <div className="grid grid-cols-3 gap-3">
            {['Saver', 'Achiever', 'Consistent', 'Top 10', 'Diamond', 'Elite'].map((badge) => (
              <div key={badge} className="text-center p-3 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg">
                <Star className="h-6 w-6 mx-auto text-yellow-400 mb-1" />
                <span className="text-xs text-white">{badge}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const MyGoals = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">My Savings Goals</h2>
        <button className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-2 rounded-lg hover:shadow-lg transition-all duration-300">
          Create New Goal
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[1, 2, 3, 4].map((goal) => (
          <div key={goal} className="bg-slate-800 bg-opacity-30 backdrop-blur-lg border border-slate-700 rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold text-white">Goal {goal}</h3>
                <p className="text-slate-400 text-sm">Target: $10,000</p>
              </div>
              <span className="text-emerald-400 text-sm flex items-center">
                <CheckCircle className="h-4 w-4 mr-1" />
                Verified
              </span>
            </div>
            <div className="flex justify-between mt-4">
              <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
                View Details
              </button>
              <button className="bg-slate-700 text-white px-4 py-2 rounded-lg hover:bg-slate-600 transition-colors">
                Edit Goal
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const SpinRewards = () => {
    const [spinning, setSpinning] = useState(false);

    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-slate-800 bg-opacity-30 backdrop-blur-lg border border-slate-700 rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-white mb-4 text-center">Spin the Wheel</h3>
            <div className="flex justify-center mb-6">
              <div className={`w-48 h-48 rounded-full bg-gradient-to-br from-blue-500 via-purple-500 to-emerald-500 flex items-center justify-center ${spinning ? 'animate-spin' : ''}`}>
                <div className="w-40 h-40 bg-slate-900 rounded-full flex items-center justify-center">
                  <Gift className="h-16 w-16 text-white" />
                </div>
              </div>
            </div>
            <div className="text-center">
              <button 
                onClick={() => {
                  setSpinning(true);
                  setTimeout(() => setSpinning(false), 2000);
                }}
                className="bg-gradient-to-r from-emerald-500 to-blue-500 text-white px-8 py-3 rounded-lg hover:shadow-lg transition-all duration-300 disabled:opacity-50"
                disabled={spinning}
              >
                {spinning ? 'Spinning...' : 'Spin Now (1 Token)'}
              </button>
            </div>
          </div>

          <div className="bg-slate-800 bg-opacity-30 backdrop-blur-lg border border-slate-700 rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-white mb-4">Reward Tiers</h3>
            <div className="space-y-3">
              {[5, 10, 20, 50, 100].map((coins) => (
                <div key={coins} className="flex items-center justify-between p-3 bg-slate-700 bg-opacity-40 rounded-lg">
                  <span className="text-white">{coins} Coins</span>
                  <span className="text-emerald-400">${coins * 0.1}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-slate-800 bg-opacity-30 backdrop-blur-lg border border-slate-700 rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-white mb-4">Luckiest Savers</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[1, 2, 3].map((rank) => (
              <div key={rank} className="text-center p-4 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-lg">
                <div className="text-2xl font-bold text-white">#{rank}</div>
                <div className="text-white">User {rank}</div>
                <div className="text-yellow-200">500 coins won</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const VendorOffers = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">Vendor Offers</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((offer) => (
          <div key={offer} className="bg-slate-800 bg-opacity-30 backdrop-blur-lg border border-slate-700 rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300">
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-white">Product Offer {offer}</h3>
              <p className="text-slate-400 text-sm">Best quality guaranteed</p>
            </div>
            
            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span className="text-slate-300">Price:</span>
                <span className="text-emerald-400 font-semibold">${500 + offer * 50}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-300">Delivery:</span>
                <span className="text-white">{2 + offer} days</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-300">Status:</span>
                <span className="text-emerald-400 flex items-center">
                  <CheckCircle className="h-4 w-4 mr-1" />
                  Verified
                </span>
              </div>
            </div>
            
            <button className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-2 rounded-lg hover:shadow-lg transition-all duration-300">
              Accept Bid
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  const GroupSaving = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Group Savings</h2>
        <div className="space-x-3">
          <button className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-2 rounded-lg hover:shadow-lg transition-all duration-300">
            Create Group
          </button>
          <button className="bg-emerald-500 text-white px-6 py-2 rounded-lg hover:shadow-lg transition-all duration-300">
            Join Group
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {[1, 2].map((group) => (
          <div key={group} className="bg-slate-800 bg-opacity-30 backdrop-blur-lg border border-slate-700 rounded-xl shadow-lg p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold text-white">Vacation Fund Group {group}</h3>
                <p className="text-slate-400 text-sm">Target: $50,000 | 5 members</p>
              </div>
              <span className="text-emerald-400 text-sm">Active</span>
            </div>
            
            <div className="mb-4">
              <div className="bg-slate-700 rounded-full h-3">
                <div className="bg-gradient-to-r from-emerald-500 to-blue-500 h-3 rounded-full" style={{ width: '40%' }}></div>
              </div>
              <p className="text-slate-300 text-sm mt-2">$20,000 / $50,000 (40%)</p>
            </div>
            
            <div className="space-y-2 mb-4">
              <h4 className="text-white font-medium">Recent Contributions:</h4>
              {[1, 2, 3].map((contribution) => (
                <div key={contribution} className="flex justify-between text-sm">
                  <span className="text-slate-300">Member {contribution}</span>
                  <span className="text-emerald-400">+$500</span>
                </div>
              ))}
            </div>
            
            <button className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-2 rounded-lg hover:shadow-lg transition-all duration-300">
              Contribute Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  const PostProductRequest = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">Post Product Request</h2>
      
      <div className="bg-slate-800 bg-opacity-30 backdrop-blur-lg border border-slate-700 rounded-xl shadow-lg p-6">
        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-white mb-2">Product Name</label>
              <input 
                type="text" 
                className="w-full bg-slate-700 bg-opacity-50 border border-slate-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
                placeholder="Enter product name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white mb-2">Target Price</label>
              <input 
                type="number" 
                className="w-full bg-slate-700 bg-opacity-50 border border-slate-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
                placeholder="$0.00"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-white mb-2">Category</label>
              <select className="w-full bg-slate-700 bg-opacity-50 border border-slate-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500">
                <option>Electronics</option>
                <option>Fashion</option>
                <option>Home & Garden</option>
                <option>Sports</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-white mb-2">Deadline</label>
              <input 
                type="date" 
                className="w-full bg-slate-700 bg-opacity-50 border border-slate-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-white mb-2">Description</label>
            <textarea 
              rows="4" 
              className="w-full bg-slate-700 bg-opacity-50 border border-slate-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
              placeholder="Describe your product requirements..."
            ></textarea>
          </div>
          
          <div className="flex justify-center">
            <div className="text-center p-4 bg-slate-700 bg-opacity-40 rounded-lg">
              <Clock className="h-8 w-8 text-emerald-400 mx-auto mb-2" />
              <div className="text-white font-bold text-xl">23:45:12</div>
              <div className="text-slate-300 text-sm">Time Remaining</div>
            </div>
          </div>
          
          <button type="submit" className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 rounded-lg hover:shadow-lg transition-all duration-300">
            Post Request
          </button>
        </form>
      </div>
    </div>
  );

  const Disputes = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">Disputes Center</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-slate-800 bg-opacity-30 backdrop-blur-lg border border-slate-700 rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-white mb-4">Raise New Dispute</h3>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-white mb-2">Transaction Hash</label>
              <input 
                type="text" 
                className="w-full bg-slate-700 bg-opacity-50 border border-slate-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
                placeholder="0x..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white mb-2">Issue Description</label>
              <textarea 
                rows="3" 
                className="w-full bg-slate-700 bg-opacity-50 border border-slate-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
                placeholder="Describe your issue..."
              ></textarea>
            </div>
            <button type="submit" className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition-colors">
              Submit Dispute
            </button>
          </form>
        </div>
        
        <div className="bg-slate-800 bg-opacity-30 backdrop-blur-lg border border-slate-700 rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-white mb-4">Active Disputes</h3>
          <div className="space-y-3">
            {[1, 2].map((dispute) => (
              <div key={dispute} className="p-4 bg-slate-700 bg-opacity-40 rounded-lg">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="text-white font-medium">Dispute #{dispute}001</h4>
                    <p className="text-slate-400 text-sm">Product delivery issue</p>
                  </div>
                  <span className="text-yellow-400 text-sm">Pending</span>
                </div>
                
                <div className="flex justify-between space-x-2">
                  <button className="flex-1 bg-green-500 text-white py-1 px-3 rounded text-sm hover:bg-green-600 transition-colors">
                    Refund
                  </button>
                  <button className="flex-1 bg-blue-500 text-white py-1 px-3 rounded text-sm hover:bg-blue-600 transition-colors">
                    Release
                  </button>
                  <button className="flex-1 bg-purple-500 text-white py-1 px-3 rounded text-sm hover:bg-purple-600 transition-colors">
                    Split
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const MyWallet = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">My Wallet</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl shadow-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100">Total Balance</p>
              <p className="text-2xl font-bold">$12,450.00</p>
            </div>
            <Wallet className="h-12 w-12 text-blue-200" />
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl shadow-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-emerald-100">Savings Goals</p>
              <p className="text-2xl font-bold">$8,750.00</p>
            </div>
            <Target className="h-12 w-12 text-emerald-200" />
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl shadow-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-yellow-100">Rewards</p>
              <p className="text-2xl font-bold">245 Coins</p>
            </div>
            <Gift className="h-12 w-12 text-yellow-200" />
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-slate-800 bg-opacity-30 backdrop-blur-lg border border-slate-700 rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-white mb-4">Top Up Wallet</h3>
          <div className="space-y-4">
            <input 
              type="number" 
              className="w-full bg-slate-700 bg-opacity-50 border border-slate-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
              placeholder="Enter amount"
            />
            <div className="grid grid-cols-2 gap-3">
              <button className="bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center">
                <CreditCard className="h-4 w-4 mr-2" />
                eSewa
              </button>
              <button className="bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center">
                <CreditCard className="h-4 w-4 mr-2" />
                Khalti
              </button>
            </div>
          </div>
        </div>
        
        <div className="bg-slate-800 bg-opacity-30 backdrop-blur-lg border border-slate-700 rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-white mb-4">Recent Transactions</h3>
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {[1, 2, 3, 4, 5].map((transaction) => (
              <div key={transaction} className="flex justify-between items-center p-3 bg-slate-700 bg-opacity-40 rounded-lg">
                <div>
                  <p className="text-white text-sm">Goal Contribution</p>
                  <p className="text-slate-400 text-xs">2 hours ago</p>
                </div>
                <span className="text-red-400">-$500.00</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const Profile = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">Profile</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-slate-800 bg-opacity-30 backdrop-blur-lg border border-slate-700 rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-white mb-4">Personal Information</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-white mb-2">Full Name</label>
              <input 
                type="text" 
                value="John Doe"
                className="w-full bg-slate-700 bg-opacity-50 border border-slate-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white mb-2">Email</label>
              <input 
                type="email" 
                value="john.doe@example.com"
                className="w-full bg-slate-700 bg-opacity-50 border border-slate-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white mb-2">Phone</label>
              <input 
                type="tel" 
                value="+1 234 567 8900"
                className="w-full bg-slate-700 bg-opacity-50 border border-slate-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>
        </div>
        
        <div className="bg-slate-800 bg-opacity-30 backdrop-blur-lg border border-slate-700 rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-white mb-4">Rewards & Redemption</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg">
              <span className="text-white font-medium">Coin Balance</span>
              <span className="text-white font-bold">245 Coins</span>
            </div>
            
            <div className="space-y-2">
              <h4 className="text-white font-medium">Available Redemptions:</h4>
              {['₹5 Cashback (50 coins)', 'Coffee Coupon (100 coins)', 'Movie Ticket (200 coins)'].map((redemption, index) => (
                <div key={index} className="flex justify-between items-center p-2 bg-slate-700 bg-opacity-40 rounded-lg">
                  <span className="text-slate-300 text-sm">{redemption}</span>
                  <button className="bg-emerald-500 text-white px-3 py-1 rounded text-xs hover:bg-emerald-600 transition-colors">
                    Redeem
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const FinancialCalculators = () => {
    const [activeTab, setActiveTab] = useState('investment');
    const [results, setResults] = useState({});

    const tabs = [
      { id: 'investment', name: 'Investment' },
      { id: 'education', name: 'Education' },
      { id: 'wedding', name: 'Wedding' },
      { id: 'emergency', name: 'Emergency' },
    ];

    const calculateInvestment = (principal, rate, time) => {
      const amount = principal * Math.pow((1 + rate / 100), time);
      return amount - principal;
    };

    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-white">Financial Calculators</h2>
        
        <div className="bg-slate-800 bg-opacity-30 backdrop-blur-lg border border-slate-700 rounded-xl shadow-lg p-6">
          <div className="flex flex-wrap gap-2 mb-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                    : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                }`}
              >
                {tab.name}
              </button>
            ))}
          </div>

          {activeTab === 'investment' && (
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white">Investment Calculator</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-white mb-2">Principal Amount ($)</label>
                  <input 
                    type="number" 
                    className="w-full bg-slate-700 bg-opacity-50 border border-slate-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
                    placeholder="10000"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white mb-2">Annual Rate (%)</label>
                  <input 
                    type="number" 
                    className="w-full bg-slate-700 bg-opacity-50 border border-slate-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
                    placeholder="8"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white mb-2">Time (Years)</label>
                  <input 
                    type="number" 
                    className="w-full bg-slate-700 bg-opacity-50 border border-slate-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
                    placeholder="10"
                  />
                </div>
              </div>
              <div className="flex justify-between items-center mt-4">
                <button className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-2 rounded-lg hover:shadow-lg transition-all duration-300">
                  Calculate
                </button>
                <button className="bg-slate-700 text-white px-4 py-2 rounded-lg hover:bg-slate-600 transition-colors flex items-center">
                  <Download className="h-4 w-4 mr-2" />
                  Export PDF
                </button>
              </div>
              <div className="bg-slate-700 bg-opacity-40 rounded-lg p-4 mt-4">
                <div className="text-center">
                  <p className="text-slate-300 text-sm">Projected Returns</p>
                  <p className="text-2xl font-bold text-emerald-400">$11,589.25</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'education' && (
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white">Education Planning Calculator</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-white mb-2">Current Cost ($)</label>
                  <input 
                    type="number" 
                    className="w-full bg-slate-700 bg-opacity-50 border border-slate-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
                    placeholder="50000"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white mb-2">Years Until Needed</label>
                  <input 
                    type="number" 
                    className="w-full bg-slate-700 bg-opacity-50 border border-slate-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
                    placeholder="15"
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'wedding' && (
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white">Wedding Planning Calculator</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-white mb-2">Target Amount ($)</label>
                  <input 
                    type="number" 
                    className="w-full bg-slate-700 bg-opacity-50 border border-slate-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
                    placeholder="25000"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white mb-2">Years to Save</label>
                  <input 
                    type="number" 
                    className="w-full bg-slate-700 bg-opacity-50 border border-slate-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
                    placeholder="3"
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'emergency' && (
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white">Emergency Fund Calculator</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-white mb-2">Monthly Expenses ($)</label>
                  <input 
                    type="number" 
                    className="w-full bg-slate-700 bg-opacity-50 border border-slate-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
                    placeholder="3000"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white mb-2">Months to Cover</label>
                  <input 
                    type="number" 
                    className="w-full bg-slate-700 bg-opacity-50 border border-slate-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
                    placeholder="6"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderContent = () => {
    switch (currentSection) {
      case 'home': return <HomePage />;
      case 'goals': return <MyGoals />;
      case 'rewards': return <SpinRewards />;
      case 'vendors': return <VendorOffers />;
      case 'groups': return <GroupSaving />;
      case 'requests': return <PostProductRequest />;
      case 'disputes': return <Disputes />;
      case 'wallet': return <MyWallet />;
      case 'profile': return <Profile />;
      case 'calculators': return <FinancialCalculators />;
      default: return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white font-sans">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-slate-800 bg-opacity-40 backdrop-blur-lg border-r border-slate-700 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition-transform duration-300 ease-in-out`}>
        <div className="flex items-center justify-between p-6 border-b border-slate-700">
          <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            DeFi Savings
          </h1>
          <button 
            onClick={toggleSidebar}
            className="lg:hidden text-slate-400 hover:text-white transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        
        <nav className="p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentSection(item.id);
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                  currentSection === item.id
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                    : 'text-slate-300 hover:bg-slate-700 hover:bg-opacity-50 hover:text-white'
                }`}
              >
                <Icon className="h-5 w-5" />
                <span className="font-medium">{item.name}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Main Content */}
      <div className="lg:ml-64">
        {/* Header */}
        <header className="bg-slate-800 bg-opacity-40 backdrop-blur-lg border-b border-slate-700 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button 
                onClick={toggleSidebar}
                className="lg:hidden text-slate-400 hover:text-white transition-colors"
              >
                <Menu className="h-6 w-6" />
              </button>
              <div>
                <h2 className="text-xl font-semibold text-white">
                  {menuItems.find(item => item.id === currentSection)?.name || 'Dashboard'}
                </h2>
                <p className="text-slate-400 text-sm">Welcome back, John!</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center space-x-4">
                <div className="bg-gradient-to-r from-emerald-500 to-blue-500 px-4 py-2 rounded-lg">
                  <span className="text-white font-semibold">Balance: $12,450.00</span>
                </div>
              </div>
              
              <div className="relative">
                <button 
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="flex items-center space-x-2 bg-slate-700 bg-opacity-50 px-4 py-2 rounded-lg hover:bg-opacity-70 transition-all duration-300"
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                    <User className="h-4 w-4 text-white" />
                  </div>
                  <span className="hidden md:block text-white">John Doe</span>
                  <ChevronDown className="h-4 w-4 text-slate-400" />
                </button>
                
                {profileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-slate-800 bg-opacity-90 backdrop-blur-lg rounded-lg shadow-lg border border-slate-700 z-10">
                    <div className="p-2">
                      <button className="w-full text-left px-3 py-2 text-slate-300 hover:text-white hover:bg-slate-700 rounded-lg transition-colors">
                        Profile Settings
                      </button>
                      <button className="w-full text-left px-3 py-2 text-slate-300 hover:text-white hover:bg-slate-700 rounded-lg transition-colors">
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="p-6">
          {renderContent()}
        </main>
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default HamroSaveDashboard