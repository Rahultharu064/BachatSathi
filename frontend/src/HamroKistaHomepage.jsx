// import React, { useState, useEffect } from 'react';
// import { 
//   ChevronRight, 
//   Target, 
//   Users, 
//   TrendingUp, 
//   ShoppingCart, 
//   Gift, 
//   Bot,
//   Star,
//   Globe,
//   Menu,
//   X,
//   Play,
//   ArrowRight,
//   CheckCircle,
//   Sparkles,
//   Coins,
//   Wallet,
//   Shield
// } from 'lucide-react';

// const HamroKistaHomepage = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [scrollY, setScrollY] = useState(0);
//   const [currentTestimonial, setCurrentTestimonial] = useState(0);

//   useEffect(() => {
//     const handleScroll = () => setScrollY(window.scrollY);
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   // Auto-rotate testimonials
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentTestimonial(prev => (prev + 1) % testimonials.length);
//     }, 4000);
//     return () => clearInterval(interval);
//   }, []);

//   const features = [
//     {
//       icon: Target,
//       title: "Smart Saving Goals",
//       description: "Auto-plan + interest tracking",
//       color: "text-blue-600"
//     },
//     {
//       icon: Users,
//       title: "Group Savings with Blockchain",
//       description: "Save securely with friends or family",
//       color: "text-emerald-600"
//     },
//     {
//       icon: TrendingUp,
//       title: "Investment & Growth Tracker",
//       description: "Micro-invest in shares, tokens, or businesses",
//       color: "text-purple-600"
//     },
//     {
//       icon: ShoppingCart,
//       title: "Vendor Bidding Offers",
//       description: "Post a goal; vendors compete with discounts",
//       color: "text-orange-600"
//     },
//     {
//       icon: Gift,
//       title: "Spin-to-Win Rewards",
//       description: "Win gifts, NFTs, or cashback with each milestone",
//       color: "text-pink-600"
//     },
//     {
//       icon: Bot,
//       title: "AI Financial Assistant",
//       description: "Ask: \"What can I buy saving Rs. 100/day?\"",
//       color: "text-indigo-600"
//     }
//   ];

//   const steps = [
//     {
//       number: "01",
//       title: "Set Your Goal",
//       description: "e.g., \"Buy a fridge\", \"Save for Dashain\"",
//       icon: Target
//     },
//     {
//       number: "02", 
//       title: "Join a Group or Get Vendor Offers",
//       description: "Smart contracts secure group saving",
//       icon: Users
//     },
//     {
//       number: "03",
//       title: "Save → Spin → Invest → Redeem",
//       description: "Rewards, vendor delivery, investment dashboard",
//       icon: Gift
//     }
//   ];

//   const vendors = [
//     { name: "Daraz", discount: "15%", verified: true },
//     { name: "CG Electronics", discount: "20%", verified: true },
//     { name: "Bhatbhateni", discount: "10%", verified: true },
//     { name: "Samsung Store", discount: "25%", verified: true },
//     { name: "Local Vendors", discount: "30%", verified: true }
//   ];

//   const testimonials = [
//     {
//       name: "Anita Sharma",
//       location: "Kathmandu",
//       goal: "Bought a new smartphone",
//       quote: "HamroKista helped me save Rs. 50,000 in just 8 months with my college friends!",
//       avatar: "👩‍🎓"
//     },
//     {
//       name: "Ram Bahadur",
//       location: "Pokhara Village",
//       goal: "Started small business",
//       quote: "Our village group saved together and I opened my tea shop. Amazing platform!",
//       avatar: "👨‍🌾"
//     },
//     {
//       name: "Priya Thapa",
//       location: "Chitwan",
//       goal: "Festival shopping",
//       quote: "The AI assistant helped me plan perfectly for Dashain. Won prizes too!",
//       avatar: "👩‍💼"
//     }
//   ];

//   const stats = [
//     { number: "5,000+", label: "Saving Goals Completed" },
//     { number: "1,000+", label: "Active Users" },
//     { number: "30+", label: "Verified Vendors" },
//     { number: "10+", label: "Village Co-ops" }
//   ];

//   const AnimatedCounter = ({ number, label }) => {
//     const [count, setCount] = useState(0);
//     const targetNumber = parseInt(number.replace(/[^0-9]/g, ''));

//     useEffect(() => {
//       let start = 0;
//       const end = targetNumber;
//       const duration = 2000;
//       const increment = end / (duration / 16);

//       const timer = setInterval(() => {
//         start += increment;
//         if (start >= end) {
//           setCount(end);
//           clearInterval(timer);
//         } else {
//           setCount(Math.floor(start));
//         }
//       }, 16);

//       return () => clearInterval(timer);
//     }, [targetNumber]);

//     return (
//       <div className="text-center">
//         <div className="text-4xl font-bold text-blue-600 mb-2">
//           {count.toLocaleString()}{number.includes('+') ? '+' : ''}
//         </div>
//         <div className="text-gray-600">{label}</div>
//       </div>
//     );
//   };

//   const FloatingIcon = ({ Icon, delay = 0, size = 20 }) => (
//     <div 
//       className="absolute animate-bounce"
//       style={{
//         animationDelay: `${delay}s`,
//         animationDuration: '3s'
//       }}
//     >
//       <Icon size={size} className="text-yellow-400 opacity-70" />
//     </div>
//   );

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 font-inter">
//       {/* Sticky Navbar */}
//       <nav className={`fixed w-full z-50 transition-all duration-300 ${
//         scrollY > 50 ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
//       }`}>
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center h-16">
//             <div className="flex items-center space-x-2">
//               <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-emerald-500 rounded-lg flex items-center justify-center">
//                 <Wallet className="w-6 h-6 text-white" />
//               </div>
//               <div className="font-bold text-xl bg-gradient-to-r from-blue-600 to-emerald-500 bg-clip-text text-transparent">
//                 HamroKista
//               </div>
//             </div>

//             {/* Desktop Menu */}
//             <div className="hidden md:flex items-center space-x-8">
//               <a href="#home" className="text-gray-700 hover:text-blue-600 transition-colors">Home</a>
//               <a href="#features" className="text-gray-700 hover:text-blue-600 transition-colors">Features</a>
//               <a href="#how-it-works" className="text-gray-700 hover:text-blue-600 transition-colors">How it Works</a>
//               <a href="#vendors" className="text-gray-700 hover:text-blue-600 transition-colors">Vendors</a>
//               <a href="#investment" className="text-gray-700 hover:text-blue-600 transition-colors">Investment</a>
//               <button className="text-gray-700 hover:text-blue-600 transition-colors">Login</button>
//             </div>

//             <div className="flex items-center space-x-4">
//               <div className="hidden sm:flex items-center space-x-2 text-sm">
//                 <span className="text-red-600 font-semibold">🇳🇵 ने</span>
//                 <span className="text-gray-400">|</span>
//                 <span className="text-gray-600">En</span>
//               </div>
//               <button className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-2 rounded-full hover:scale-105 transform transition-all duration-200 animate-pulse">
//                 Start Saving Now
//               </button>
//               <button 
//                 className="md:hidden"
//                 onClick={() => setIsMenuOpen(!isMenuOpen)}
//               >
//                 {isMenuOpen ? <X /> : <Menu />}
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Mobile Menu */}
//         {isMenuOpen && (
//           <div className="md:hidden bg-white/95 backdrop-blur-md border-t">
//             <div className="px-4 py-4 space-y-3">
//               <a href="#home" className="block text-gray-700 hover:text-blue-600">Home</a>
//               <a href="#features" className="block text-gray-700 hover:text-blue-600">Features</a>
//               <a href="#how-it-works" className="block text-gray-700 hover:text-blue-600">How it Works</a>
//               <a href="#vendors" className="block text-gray-700 hover:text-blue-600">Vendors</a>
//               <a href="#investment" className="block text-gray-700 hover:text-blue-600">Investment</a>
//               <a href="#login" className="block text-gray-700 hover:text-blue-600">Login</a>
//             </div>
//           </div>
//         )}
//       </nav>

//       {/* Hero Section */}
//       <section id="home" className="pt-20 pb-16 relative overflow-hidden">
//         <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-emerald-500/10"></div>
        
//         {/* Floating Icons */}
//         <FloatingIcon Icon={Coins} delay={0} size={24} />
//         <FloatingIcon Icon={Sparkles} delay={1} size={20} />
//         <FloatingIcon Icon={Gift} delay={2} size={22} />
        
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
//           <div className="grid lg:grid-cols-2 gap-12 items-center">
//             <div className="text-center lg:text-left">
//               <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 font-poppins">
//                 Save Smart.{' '}
//                 <span className="bg-gradient-to-r from-blue-600 to-emerald-500 bg-clip-text text-transparent">
//                   Reach Goals.
//                 </span>{' '}
//                 Invest Together.
//               </h1>
              
//               <p className="text-xl text-gray-600 mb-8 leading-relaxed">
//                 Nepal's first blockchain-powered group saving & investment platform.
//                 Join thousands creating wealth together.
//               </p>

//               <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
//                 <button className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-full hover:scale-105 transform transition-all duration-200 flex items-center justify-center space-x-2 group">
//                   <span className="font-semibold">Join Now</span>
//                   <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
//                 </button>
//                 <button className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-8 py-4 rounded-full hover:scale-105 transform transition-all duration-200 flex items-center justify-center space-x-2">
//                   <Target className="w-5 h-5" />
//                   <span className="font-semibold">Post a Saving Goal</span>
//                 </button>
//               </div>

//               {/* Trust Logos */}
//               <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 opacity-70">
//                 <div className="flex items-center space-x-2 text-sm text-gray-600">
//                   <Shield className="w-4 h-4" />
//                   <span>Polygon</span>
//                 </div>
//                 <div className="flex items-center space-x-2 text-sm text-gray-600">
//                   <Wallet className="w-4 h-4" />
//                   <span>MetaMask</span>
//                 </div>
//                 <div className="flex items-center space-x-2 text-sm text-gray-600">
//                   <Bot className="w-4 h-4" />
//                   <span>GPT-AI</span>
//                 </div>
//                 <div className="flex items-center space-x-2 text-sm text-gray-600">
//                   <span>eSewa</span>
//                 </div>
//                 <div className="flex items-center space-x-2 text-sm text-gray-600">
//                   <span>Khalti</span>
//                 </div>
//               </div>
//             </div>

//             {/* Hero Animation */}
//             <div className="relative">
//               <div className="bg-gradient-to-br from-white to-blue-50 rounded-3xl p-8 shadow-2xl transform hover:scale-105 transition-all duration-300">
//                 <div className="text-center mb-6">
//                   <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-emerald-500 rounded-full mx-auto mb-4 flex items-center justify-center animate-pulse">
//                     <Wallet className="w-10 h-10 text-white" />
//                   </div>
//                   <h3 className="text-2xl font-bold text-gray-900 mb-2">Smart Saving Dashboard</h3>
//                   <p className="text-gray-600">Track your goals in real-time</p>
//                 </div>
                
//                 <div className="space-y-4">
//                   <div className="bg-blue-50 rounded-lg p-4">
//                     <div className="flex items-center justify-between mb-2">
//                       <span className="text-sm font-medium text-gray-700">iPhone 15 Goal</span>
//                       <span className="text-sm text-blue-600 font-semibold">85%</span>
//                     </div>
//                     <div className="w-full bg-gray-200 rounded-full h-2">
//                       <div className="bg-gradient-to-r from-blue-600 to-blue-700 h-2 rounded-full" style={{width: '85%'}}></div>
//                     </div>
//                   </div>
                  
//                   <div className="bg-emerald-50 rounded-lg p-4">
//                     <div className="flex items-center justify-between mb-2">
//                       <span className="text-sm font-medium text-gray-700">Dashain Shopping</span>
//                       <span className="text-sm text-emerald-600 font-semibold">62%</span>
//                     </div>
//                     <div className="w-full bg-gray-200 rounded-full h-2">
//                       <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 h-2 rounded-full" style={{width: '62%'}}></div>
//                     </div>
//                   </div>

//                   <div className="bg-yellow-50 rounded-lg p-4 text-center">
//                     <Gift className="w-8 h-8 text-yellow-600 mx-auto mb-2 animate-bounce" />
//                     <p className="text-sm font-medium text-gray-700">Next Spin in 2 days!</p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Features Section */}
//       <section id="features" className="py-20 bg-white">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-16">
//             <h2 className="text-4xl font-bold text-gray-900 mb-4 font-poppins">
//               Why <span className="text-blue-600">HamroKista</span>?
//             </h2>
//             <p className="text-xl text-gray-600 max-w-3xl mx-auto">
//               Discover powerful features designed for Nepali savers and investors
//             </p>
//           </div>

//           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {features.map((feature, index) => (
//               <div 
//                 key={index}
//                 className="bg-gradient-to-br from-white to-gray-50 p-8 rounded-xl border border-gray-100 hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 group"
//               >
//                 <div className={`w-16 h-16 rounded-lg ${feature.color} bg-opacity-10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
//                   <feature.icon className={`w-8 h-8 ${feature.color}`} />
//                 </div>
//                 <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
//                 <p className="text-gray-600 leading-relaxed">{feature.description}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* How It Works */}
//       <section id="how-it-works" className="py-20 bg-gradient-to-br from-slate-50 to-blue-50 relative overflow-hidden">
//         {/* Background Pattern */}
//         <div className="absolute inset-0 opacity-5">
//           <div className="absolute top-20 left-20 w-32 h-32 border-2 border-blue-600 rounded-full animate-pulse"></div>
//           <div className="absolute bottom-20 right-20 w-24 h-24 border-2 border-emerald-500 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
//         </div>

//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
//           <div className="text-center mb-20">
//             <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 font-poppins">
//               How It <span className="bg-gradient-to-r from-blue-600 to-emerald-500 bg-clip-text text-transparent">Works</span>
//             </h2>
//             <p className="text-xl text-gray-600 max-w-2xl mx-auto">
//               Simple steps to achieve your financial goals with smart group savings
//             </p>
//           </div>

//           <div className="relative">
//             {/* Desktop Timeline Line */}
//             <div className="hidden lg:block absolute top-32 left-1/2 transform -translate-x-1/2 w-full max-w-4xl">
//               <div className="relative h-1">
//                 <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-500 to-emerald-500 rounded-full"></div>
//                 <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-500 to-emerald-500 rounded-full animate-pulse opacity-50"></div>
//               </div>
//             </div>

//             <div className="grid lg:grid-cols-3 gap-12 lg:gap-8">
//               {steps.map((step, index) => (
//                 <div key={index} className="relative">
//                   {/* Mobile Timeline Connector */}
//                   <div className="lg:hidden flex items-center justify-center mb-6">
//                     {index > 0 && (
//                       <div className="flex-1 h-px bg-gradient-to-r from-blue-600 to-emerald-500 mr-4"></div>
//                     )}
//                     <div className="w-3 h-3 bg-gradient-to-r from-blue-600 to-emerald-500 rounded-full"></div>
//                     {index < steps.length - 1 && (
//                       <div className="flex-1 h-px bg-gradient-to-r from-blue-600 to-emerald-500 ml-4"></div>
//                     )}
//                   </div>

//                   <div className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 text-center group hover:-translate-y-3 border border-gray-100 relative overflow-hidden">
//                     {/* Card Background Decoration */}
//                     <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-emerald-500"></div>
                    
//                     {/* Floating Number Badge */}
//                     <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
//                       <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-emerald-500 rounded-full flex items-center justify-center shadow-lg">
//                         <span className="text-white font-bold text-sm">{index + 1}</span>
//                       </div>
//                     </div>

//                     {/* Icon Container */}
//                     <div className="relative mb-8 mt-4">
//                       <div className="w-20 h-20 bg-gradient-to-br from-blue-50 to-emerald-50 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
//                         <step.icon className="w-10 h-10 text-blue-600" />
//                       </div>
                      
//                       {/* Decorative Sparkles */}
//                       <div className="absolute -top-2 -right-2 w-4 h-4 bg-yellow-400 rounded-full animate-ping opacity-75"></div>
//                       <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-emerald-400 rounded-full animate-pulse"></div>
//                     </div>

//                     {/* Step Number */}
//                     <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-emerald-500 bg-clip-text text-transparent mb-4 font-poppins">
//                       {step.number}
//                     </div>

//                     {/* Title */}
//                     <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors duration-300">
//                       {step.title}
//                     </h3>

//                     {/* Description */}
//                     <p className="text-gray-600 leading-relaxed">
//                       {step.description}
//                     </p>

//                     {/* Hover Glow Effect */}
//                     <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-600/5 to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
//                   </div>

//                   {/* Desktop Animated Arrow Connector */}
//                   {index < steps.length - 1 && (
//                     <div className="hidden lg:block absolute top-36 -right-16 transform">
//                       <div className="relative">
//                         {/* Animated Arrow */}
//                         <div className="flex items-center space-x-2 animate-bounce" style={{animationDuration: '2s', animationDelay: `${index * 0.5}s`}}>
//                           <div className="w-8 h-px bg-gradient-to-r from-blue-600 to-emerald-500"></div>
//                           <div className="w-8 h-px bg-gradient-to-r from-blue-600 to-emerald-500"></div>
//                           <div className="w-0 h-0 border-l-4 border-l-emerald-500 border-t-2 border-t-transparent border-b-2 border-b-transparent"></div>
//                         </div>
                        
//                         {/* Flowing Dots */}
//                         <div className="absolute top-0 left-0 w-6 h-px">
//                           <div className="w-1 h-1 bg-blue-600 rounded-full animate-ping" style={{animationDelay: `${index * 0.3}s`}}></div>
//                         </div>
//                         <div className="absolute top-0 left-4 w-6 h-px">
//                           <div className="w-1 h-1 bg-purple-500 rounded-full animate-ping" style={{animationDelay: `${index * 0.3 + 0.2}s`}}></div>
//                         </div>
//                         <div className="absolute top-0 left-8 w-6 h-px">
//                           <div className="w-1 h-1 bg-emerald-500 rounded-full animate-ping" style={{animationDelay: `${index * 0.3 + 0.4}s`}}></div>
//                         </div>
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Bottom CTA */}
//           <div className="text-center mt-16">
//             <button className="bg-gradient-to-r from-blue-600 to-emerald-500 text-white px-10 py-4 rounded-full hover:scale-105 transform transition-all duration-300 font-semibold text-lg shadow-xl hover:shadow-2xl flex items-center justify-center space-x-2 mx-auto group">
//               <span>Get Started Now</span>
//               <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
//             </button>
//           </div>
//         </div>
//       </section>

//       {/* Vendor Highlight */}
//       <section id="vendors" className="py-20 bg-white">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-16">
//             <h2 className="text-4xl font-bold text-gray-900 mb-4 font-poppins">
//               Top Vendors You Can Trust
//             </h2>
//             <p className="text-xl text-gray-600">Verified partners offering exclusive discounts</p>
//           </div>

//           <div className="grid md:grid-cols-5 gap-6 mb-12">
//             {vendors.map((vendor, index) => (
//               <div 
//                 key={index}
//                 className="bg-gradient-to-br from-white to-gray-50 p-6 rounded-xl border border-gray-100 hover:shadow-lg transition-all duration-300 text-center group cursor-pointer"
//               >
//                 <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-emerald-500 rounded-lg mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
//                   <ShoppingCart className="w-8 h-8 text-white" />
//                 </div>
//                 <h3 className="font-bold text-gray-900 mb-2">{vendor.name}</h3>
//                 <div className="space-y-2">
//                   <span className="inline-block bg-emerald-100 text-emerald-800 text-xs px-2 py-1 rounded-full">
//                     Discount {vendor.discount}
//                   </span>
//                   {vendor.verified && (
//                     <div className="flex items-center justify-center space-x-1">
//                       <CheckCircle className="w-4 h-4 text-blue-600" />
//                       <span className="text-xs text-blue-600 font-medium">Verified</span>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             ))}
//           </div>

//           <div className="text-center">
//             <button className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-3 rounded-full hover:scale-105 transform transition-all duration-200">
//               Become a Vendor
//             </button>
//           </div>
//         </div>
//       </section>

//       {/* AI Assistant Preview */}
//       <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
//         <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="bg-white rounded-2xl shadow-xl p-8">
//             <div className="text-center mb-8">
//               <h2 className="text-3xl font-bold text-gray-900 mb-4">
//                 Ask Our <span className="text-blue-600">AI Assistant</span>
//               </h2>
//               <p className="text-gray-600">Get personalized financial advice instantly</p>
//             </div>

//             <div className="bg-gray-50 rounded-xl p-6 mb-6">
//               <div className="flex items-start space-x-3 mb-4">
//                 <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
//                   <span className="text-white text-sm">👤</span>
//                 </div>
//                 <div className="bg-blue-600 text-white px-4 py-2 rounded-lg rounded-tl-none">
//                   What can I get saving Rs. 50/day for 9 months?
//                 </div>
//               </div>

//               <div className="flex items-start space-x-3">
//                 <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center">
//                   <Bot className="w-5 h-5 text-white" />
//                 </div>
//                 <div className="bg-white border border-gray-200 px-4 py-3 rounded-lg rounded-tl-none flex-1">
//                   <p className="text-gray-800 mb-3">Great question! With Rs. 50/day for 9 months, you can:</p>
//                   <div className="space-y-2">
//                     <div className="flex items-center space-x-2">
//                       <CheckCircle className="w-4 h-4 text-green-600" />
//                       <span className="text-sm">📱 Phone from XYZ Vendor (Rs. 12,000)</span>
//                     </div>
//                     <div className="flex items-center space-x-2">
//                       <CheckCircle className="w-4 h-4 text-green-600" />
//                       <span className="text-sm">🎁 Spin Rewards (Monthly)</span>
//                     </div>
//                     <div className="flex items-center space-x-2">
//                       <CheckCircle className="w-4 h-4 text-green-600" />
//                       <span className="text-sm">💰 Rs. 2,000 Return via Investment Plan</span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div className="text-center">
//               <button className="bg-gradient-to-r from-indigo-600 to-indigo-700 text-white px-8 py-3 rounded-full hover:scale-105 transform transition-all duration-200 flex items-center justify-center space-x-2 mx-auto">
//                 <Bot className="w-5 h-5" />
//                 <span>Ask Now</span>
//               </button>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Testimonials & Stats */}
//       <section className="py-20 bg-white">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-16">
//             <h2 className="text-4xl font-bold text-gray-900 mb-4 font-poppins">Our Impact So Far</h2>
//             <p className="text-xl text-gray-600">Real stories from real users</p>
//           </div>

//           {/* Stats */}
//           <div className="grid md:grid-cols-4 gap-8 mb-16">
//             {stats.map((stat, index) => (
//               <AnimatedCounter key={index} number={stat.number} label={stat.label} />
//             ))}
//           </div>

//           {/* Testimonials */}
//           <div className="bg-gradient-to-br from-blue-50 to-emerald-50 rounded-2xl p-8">
//             <div className="max-w-3xl mx-auto text-center">
//               <div className="text-6xl mb-4">{testimonials[currentTestimonial].avatar}</div>
//               <blockquote className="text-xl text-gray-700 mb-6 italic">
//                 "{testimonials[currentTestimonial].quote}"
//               </blockquote>
//               <div>
//                 <div className="font-bold text-gray-900">{testimonials[currentTestimonial].name}</div>
//                 <div className="text-gray-600">{testimonials[currentTestimonial].location}</div>
//                 <div className="text-sm text-blue-600 font-medium mt-1">
//                   Goal: {testimonials[currentTestimonial].goal}
//                 </div>
//               </div>
//             </div>

//             {/* Testimonial Dots */}
//             <div className="flex justify-center space-x-2 mt-8">
//               {testimonials.map((_, index) => (
//                 <button
//                   key={index}
//                   onClick={() => setCurrentTestimonial(index)}
//                   className={`w-3 h-3 rounded-full transition-colors duration-200 ${
//                     index === currentTestimonial ? 'bg-blue-600' : 'bg-gray-300'
//                   }`}
//                 />
//               ))}
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Final CTA */}
//       <section className="py-20 bg-gradient-to-br from-blue-600 to-emerald-500 text-white relative overflow-hidden">
//         <div className="absolute inset-0 opacity-10">
//           <div className="absolute top-10 left-10 w-20 h-20 border-2 border-white rounded-full"></div>
//           <div className="absolute bottom-10 right-10 w-32 h-32 border-2 border-white rounded-full"></div>
//           <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 border-2 border-white rounded-full"></div>
//         </div>
        
//         <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
//           <h2 className="text-4xl lg:text-5xl font-bold mb-6 font-poppins">
//             Ready to Save Smarter, Together?
//           </h2>
//           <p className="text-xl mb-12 opacity-90">
//             Join thousands of Nepali savers building wealth through smart group savings
//           </p>

//           <div className="flex flex-col sm:flex-row gap-4 justify-center">
//             <button className="bg-white text-blue-600 px-8 py-4 rounded-full hover:scale-105 transform transition-all duration-200 font-semibold">
//               Start Saving Now
//             </button>
//             <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-full hover:scale-105 transform transition-all duration-200 font-semibold">
//               Become a Vendor
//             </button>
//             <button className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 rounded-full hover:scale-105 transform transition-all duration-200 font-semibold flex items-center justify-center space-x-2">
//               <Play className="w-5 h-5" />
//               <span>Launch Demo</span>
//             </button>
//           </div>
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="bg-gray-900 text-white py-16">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="grid md:grid-cols-3 gap-8">
//             {/* Left Column */}
//             <div>
//               <div className="flex items-center space-x-2 mb-6">
//                 <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-emerald-500 rounded-lg flex items-center justify-center">
//                   <Wallet className="w-6 h-6 text-white" />
//                 </div>
//                 <div className="font-bold text-xl">HamroKista</div>
//               </div>
//               <p className="text-gray-300 mb-6 leading-relaxed">
//                 Save Smart. Grow Together.<br />
//                 Nepal's trusted blockchain-powered saving platform.
//               </p>
//               <div className="flex space-x-4">
//                 <a href="#" className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors">
//                   <span className="text-sm font-bold">f</span>
//                 </a>
//                 <a href="#" className="w-10 h-10 bg-pink-600 rounded-full flex items-center justify-center hover:bg-pink-700 transition-colors">
//                   <span className="text-sm font-bold">📱</span>
//                 </a>
//                 <a href="#" className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center hover:bg-red-700 transition-colors">
//                   <span className="text-sm font-bold">▶</span>
//                 </a>
//                 <a href="#" className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center hover:opacity-80 transition-opacity">
//                   <span className="text-sm font-bold">📷</span>
//                 </a>
//               </div>
//             </div>

//             {/* Middle Column */}
//             <div>
//               <h3 className="font-bold text-lg mb-6">Quick Links</h3>
//               <div className="space-y-3">
//                 <a href="#" className="block text-gray-300 hover:text-white transition-colors">About Us</a>
//                 <a href="#" className="block text-gray-300 hover:text-white transition-colors">Privacy Policy</a>
//                 <a href="#" className="block text-gray-300 hover:text-white transition-colors">Terms of Service</a>
//                 <a href="#" className="block text-gray-300 hover:text-white transition-colors">Contact Support</a>
//                 <a href="#" className="block text-gray-300 hover:text-white transition-colors">Help Center</a>
//               </div>
//             </div>

//             {/* Right Column */}
//             <div>
//               <h3 className="font-bold text-lg mb-6">Powered By</h3>
//               <div className="grid grid-cols-2 gap-4">
//                 <div className="flex items-center space-x-2 text-gray-300 text-sm">
//                   <Shield className="w-4 h-4" />
//                   <span>Polygon</span>
//                 </div>
//                 <div className="flex items-center space-x-2 text-gray-300 text-sm">
//                   <Bot className="w-4 h-4" />
//                   <span>GPT-4</span>
//                 </div>
//                 <div className="flex items-center space-x-2 text-gray-300 text-sm">
//                   <Wallet className="w-4 h-4" />
//                   <span>MetaMask</span>
//                 </div>
//                 <div className="flex items-center space-x-2 text-gray-300 text-sm">
//                   <span>💳</span>
//                   <span>eSewa</span>
//                 </div>
//                 <div className="flex items-center space-x-2 text-gray-300 text-sm">
//                   <TrendingUp className="w-4 h-4" />
//                   <span>Alpha Vantage</span>
//                 </div>
//                 <div className="flex items-center space-x-2 text-gray-300 text-sm">
//                   <span>🔥</span>
//                   <span>Firebase</span>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="border-t border-gray-800 mt-12 pt-8 text-center">
//             <p className="text-gray-400">
//               © 2025 HamroKista. All rights reserved. Made with ❤️ in Nepal.
//             </p>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default HamroKistaHomepage;