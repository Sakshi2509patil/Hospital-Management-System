// import React, { useContext, useState } from 'react'
// import { AppContext } from '../context/AppContext'

// const UserProfile = () => {
//   const [activeTab, setActiveTab] = useState('profile')
//   const [isEditing, setIsEditing] = useState(false)
  
//   const {profileData, setProfileData} = useContext(AppContext)
//   const handleInputChange = (e) => {
//     const { name, value } = e.target
//     setProfileData(prev => ({
//       ...prev,
//       [name]: value
//     }))
//   }

//   const handleSaveProfile = () => {
//     // Here you would typically make an API call to save the profile
//     console.log('Saving profile:', profileData)
//     setIsEditing(false)
//     alert('Profile updated successfully!')
//   }

//   const handleAvatarChange = (e) => {
//     const file = e.target.files[0]
//     if (file) {
//       const reader = new FileReader()
//       reader.onload = (e) => {
//         setProfileData(prev => ({
//           ...prev,
//           avatar: e.target.result
//         }))
//       }
//       reader.readAsDataURL(file)
//     }
//   }



//   const TabButton = ({ tabId, label, icon }) => (
//     <button
//       onClick={() => setActiveTab(tabId)}
//       className={`flex items-center space-x-2 px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
//         activeTab === tabId
//           ? 'bg-blue-600 text-white shadow-lg'
//           : 'text-gray-600 hover:bg-gray-100'
//       }`}
//     >
//       {icon}
//       <span>{label}</span>
//     </button>
//   )

//   return (
//     <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-6xl mx-auto">
//         {/* Header */}
//         <div className="mb-8">
//           <h1 className="text-3xl font-bold text-gray-900 mb-2">My Profile</h1>
//           {/* <p className="text-gray-600">Manage your account settings and view your appointment history</p> */}
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
//           {/* Sidebar Navigation */}
//           <div className="lg:col-span-1">
//             <div className="bg-white rounded-xl shadow-lg p-6">
//               <div className="space-y-2">
//                 <TabButton
//                   tabId="profile"
//                   label="Profile Info"
//                   icon={
//                     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
//                     </svg>
//                   }
//                 />
//                 <TabButton
//                   tabId="settings"
//                   label="Settings"
//                   icon={
//                     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
//                     </svg>
//                   }
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Main Content */}
//           <div className="lg:col-span-3">
//             {/* Profile Tab */}
//             {activeTab === 'profile' && (
//               <div className="bg-white rounded-xl shadow-lg p-6">
//                 <div className="flex justify-between items-center mb-6">
//                   <h2 className="text-2xl font-bold text-gray-900">Profile Information</h2>
//                   <button
//                     onClick={() => isEditing ? handleSaveProfile() : setIsEditing(true)}
//                     className={`px-6 py-2 rounded-lg font-medium transition-all duration-200 ${
//                       isEditing
//                         ? 'bg-green-600 hover:bg-green-700 text-white'
//                         : 'bg-blue-600 hover:bg-blue-700 text-white'
//                     }`}
//                   >
//                     {isEditing ? 'Save Changes' : 'Edit Profile'}
//                   </button>
//                 </div>

//                 {/* Avatar Section */}
//                 <div className="flex items-center space-x-6 mb-8">
//                   <div className="relative">
//                     <div className="w-24 h-24 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold overflow-hidden">
//                       {profileData.avatar ? (
//                         <img src={profileData.avatar} alt="Profile" className="w-full h-full object-cover" />
//                       ) : (
//                         profileData.name.charAt(0)
//                       )}
//                     </div>
//                     {isEditing && (
//                       <label className="absolute bottom-0 right-0 bg-blue-600 rounded-full p-2 cursor-pointer hover:bg-blue-700 transition-colors">
//                         <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
//                         </svg>
//                         <input
//                           type="file"
//                           className="hidden"
//                           accept="image/*"
//                           onChange={handleAvatarChange}
//                         />
//                       </label>
//                     )}
//                   </div>
//                   <div>
//                     <h3 className="text-xl font-semibold text-gray-900">{profileData.name}</h3>
//                     <p className="text-gray-600">{profileData.email}</p>
//                     <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full mt-2">
//                       Verified Account
//                     </span>
//                   </div>
//                 </div>

//                 {/* Profile Form */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
//                     <input
//                       type="text"
//                       name="name"
//                       value={profileData.name}
//                       onChange={handleInputChange}
//                       disabled={!isEditing}
//                       className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
//                     <input
//                       type="email"
//                       name="email"
//                       value={profileData.email}
//                       onChange={handleInputChange}
//                       disabled={!isEditing}
//                       className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
//                     <input
//                       type="tel"
//                       name="phone"
//                       value={profileData.phone}
//                       onChange={handleInputChange}
//                       disabled={!isEditing}
//                       className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
//                     <input
//                       type="date"
//                       name="dateOfBirth"
//                       value={profileData.dateOfBirth}
//                       onChange={handleInputChange}
//                       disabled={!isEditing}
//                       className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
//                     <select
//                       name="gender"
//                       value={profileData.gender}
//                       onChange={handleInputChange}
//                       disabled={!isEditing}
//                       className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
//                     >
//                       <option value="Male">Male</option>
//                       <option value="Female">Female</option>
//                       <option value="Other">Other</option>
//                     </select>
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">Blood Group</label>
//                     <select
//                       name="bloodGroup"
//                       value={profileData.bloodGroup}
//                       onChange={handleInputChange}
//                       disabled={!isEditing}
//                       className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
//                     >
//                       <option value="A+">A+</option>
//                       <option value="A-">A-</option>
//                       <option value="B+">B+</option>
//                       <option value="B-">B-</option>
//                       <option value="AB+">AB+</option>
//                       <option value="AB-">AB-</option>
//                       <option value="O+">O+</option>
//                       <option value="O-">O-</option>
//                     </select>
//                   </div>

//                   <div className="md:col-span-2">
//                     <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
//                     <input
//                       type="text"
//                       name="address"
//                       value={profileData.address}
//                       onChange={handleInputChange}
//                       disabled={!isEditing}
//                       className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
//                     />
//                   </div>

//                   <div className="md:col-span-2">
//                     <label className="block text-sm font-medium text-gray-700 mb-2">Emergency Contact</label>
//                     <input
//                       type="tel"
//                       name="emergencyContact"
//                       value={profileData.emergencyContact}
//                       onChange={handleInputChange}
//                       disabled={!isEditing}
//                       className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
//                     />
//                   </div>
//                 </div>
//               </div>
//             )}

//             {/* Settings Tab */}
//             {activeTab === 'settings' && (
//               <div className="bg-white rounded-xl shadow-lg p-6">
//                 <h2 className="text-2xl font-bold text-gray-900 mb-6">Account Settings</h2>
                
//                 <div className="space-y-6">
//                   {/* Notification Settings */}
//                   <div className="border-b border-gray-200 pb-6">
//                     <h3 className="text-lg font-semibold text-gray-900 mb-4">Notifications</h3>
//                     <div className="space-y-4">
//                       <div className="flex items-center justify-between">
//                         <div>
//                           <p className="font-medium text-gray-900">Email Notifications</p>
//                           <p className="text-sm text-gray-500">Receive appointment reminders via email</p>
//                         </div>
//                         <label className="relative inline-flex items-center cursor-pointer">
//                           <input type="checkbox" className="sr-only peer" defaultChecked />
//                           <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
//                         </label>
//                       </div>
//                       <div className="flex items-center justify-between">
//                         <div>
//                           <p className="font-medium text-gray-900">SMS Notifications</p>
//                           <p className="text-sm text-gray-500">Receive appointment reminders via SMS</p>
//                         </div>
//                         <label className="relative inline-flex items-center cursor-pointer">
//                           <input type="checkbox" className="sr-only peer" />
//                           <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
//                         </label>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Privacy Settings */}
//                   <div className="border-b border-gray-200 pb-6">
//                     <h3 className="text-lg font-semibold text-gray-900 mb-4">Privacy</h3>
//                     <div className="space-y-4">
//                       <div className="flex items-center justify-between">
//                         <div>
//                           <p className="font-medium text-gray-900">Profile Visibility</p>
//                           <p className="text-sm text-gray-500">Allow doctors to view your profile</p>
//                         </div>
//                         <label className="relative inline-flex items-center cursor-pointer">
//                           <input type="checkbox" className="sr-only peer" defaultChecked />
//                           <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
//                         </label>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Security Settings */}
//                   <div className="space-y-4">
//                     <h3 className="text-lg font-semibold text-gray-900">Security</h3>
//                     <div className="space-y-3">
//                       <button className="w-full text-left p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
//                         <div className="flex items-center justify-between">
//                           <div>
//                             <p className="font-medium text-gray-900">Change Password</p>
//                             <p className="text-sm text-gray-500">Update your account password</p>
//                           </div>
//                           <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
//                           </svg>
//                         </div>
//                       </button>
//                       <button className="w-full text-left p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
//                         <div className="flex items-center justify-between">
//                           <div>
//                             <p className="font-medium text-gray-900">Two-Factor Authentication</p>
//                             <p className="text-sm text-gray-500">Add extra security to your account</p>
//                           </div>
//                           <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
//                           </svg>
//                         </div>
//                       </button>
//                     </div>
//                   </div>

//                   {/* Danger Zone */}
//                   <div className="border-t border-red-200 pt-6">
//                     <h3 className="text-lg font-semibold text-red-600 mb-4">Danger Zone</h3>
//                     <button className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors font-medium">
//                       Delete Account
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default UserProfile



// const [profileData, setProfileData] = useState({
  //   name: 'John Doe',
  //   email: 'john.doe@email.com',
  //   phone: '+1 (555) 123-4567',
  //   address: '123 Main Street, New York, NY 10001',
  //   dateOfBirth: '1990-05-15',
  //   gender: 'Male',
  //   bloodGroup: 'O+',
  //   emergencyContact: '+1 (555) 987-6543',
  //   avatar: null
  // })


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// import React, { useContext, useState } from 'react'
// import { AppContext } from '../context/AppContext'

// const UserProfile = () => {
//   const [activeTab, setActiveTab] = useState('profile')
//   const [isEditing, setIsEditing] = useState(false)
  
//   const {profileData, setProfileData} = useContext(AppContext)
  
//   // Add null check for profileData
//   if (!profileData) {
//     return (
//       <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
//           <p className="mt-4 text-gray-600">Loading profile...</p>
//         </div>
//       </div>
//     )
//   }

//   const handleInputChange = (e) => {
//     const { name, value } = e.target
//     setProfileData(prev => ({
//       ...prev,
//       [name]: value
//     }))
//   }

//   const handleSaveProfile = () => {
//     // Here you would typically make an API call to save the profile
//     console.log('Saving profile:', profileData)
//     setIsEditing(false)
//     alert('Profile updated successfully!')
//   }

//   const handleAvatarChange = (e) => {
//     const file = e.target.files[0]
//     if (file) {
//       const reader = new FileReader()
//       reader.onload = (e) => {
//         setProfileData(prev => ({
//           ...prev,
//           avatar: e.target.result
//         }))
//       }
//       reader.readAsDataURL(file)
//     }
//   }



//   const TabButton = ({ tabId, label, icon }) => (
//     <button
//       onClick={() => setActiveTab(tabId)}
//       className={`flex items-center space-x-2 px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
//         activeTab === tabId
//           ? 'bg-blue-600 text-white shadow-lg'
//           : 'text-gray-600 hover:bg-gray-100'
//       }`}
//     >
//       {icon}
//       <span>{label}</span>
//     </button>
//   )

//   return (
//     <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-6xl mx-auto">
//         {/* Header */}
//         <div className="mb-8">
//           <h1 className="text-3xl font-bold text-gray-900 mb-2">My Profile</h1>
//           {/* <p className="text-gray-600">Manage your account settings and view your appointment history</p> */}
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
//           {/* Sidebar Navigation */}
//           <div className="lg:col-span-1">
//             <div className="bg-white rounded-xl shadow-lg p-6">
//               <div className="space-y-2">
//                 <TabButton
//                   tabId="profile"
//                   label="Profile Info"
//                   icon={
//                     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
//                     </svg>
//                   }
//                 />
//                 <TabButton
//                   tabId="settings"
//                   label="Settings"
//                   icon={
//                     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
//                     </svg>
//                   }
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Main Content */}
//           <div className="lg:col-span-3">
//             {/* Profile Tab */}
//             {activeTab === 'profile' && (
//               <div className="bg-white rounded-xl shadow-lg p-6">
//                 <div className="flex justify-between items-center mb-6">
//                   <h2 className="text-2xl font-bold text-gray-900">Profile Information</h2>
//                   <button
//                     onClick={() => isEditing ? handleSaveProfile() : setIsEditing(true)}
//                     className={`px-6 py-2 rounded-lg font-medium transition-all duration-200 ${
//                       isEditing
//                         ? 'bg-green-600 hover:bg-green-700 text-white'
//                         : 'bg-blue-600 hover:bg-blue-700 text-white'
//                     }`}
//                   >
//                     {isEditing ? 'Save Changes' : 'Edit Profile'}
//                   </button>
//                 </div>

//                 {/* Avatar Section */}
//                 <div className="flex items-center space-x-6 mb-8">
//                   <div className="relative">
//                     <div className="w-24 h-24 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold overflow-hidden">
//                       {profileData.avatar ? (
//                         <img src={profileData.avatar} alt="Profile" className="w-full h-full object-cover" />
//                       ) : (
//                         (profileData.name || 'U').charAt(0)
//                       )}
//                     </div>
//                     {isEditing && (
//                       <label className="absolute bottom-0 right-0 bg-blue-600 rounded-full p-2 cursor-pointer hover:bg-blue-700 transition-colors">
//                         <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
//                         </svg>
//                         <input
//                           type="file"
//                           className="hidden"
//                           accept="image/*"
//                           onChange={handleAvatarChange}
//                         />
//                       </label>
//                     )}
//                   </div>
//                   <div>
//                     <h3 className="text-xl font-semibold text-gray-900">{profileData.name || 'User'}</h3>
//                     <p className="text-gray-600">{profileData.email || 'No email provided'}</p>
//                     <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full mt-2">
//                       Verified Account
//                     </span>
//                   </div>
//                 </div>

//                 {/* Profile Form */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
//                     <input
//                       type="text"
//                       name="name"
//                       value={profileData.name || ''}
//                       onChange={handleInputChange}
//                       disabled={!isEditing}
//                       className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
//                     <input
//                       type="email"
//                       name="email"
//                       value={profileData.email || ''}
//                       onChange={handleInputChange}
//                       disabled={!isEditing}
//                       className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
//                     <input
//                       type="tel"
//                       name="phone"
//                       value={profileData.phone || ''}
//                       onChange={handleInputChange}
//                       disabled={!isEditing}
//                       className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
//                     <input
//                       type="date"
//                       name="dateOfBirth"
//                       value={profileData.dateOfBirth || ''}
//                       onChange={handleInputChange}
//                       disabled={!isEditing}
//                       className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
//                     <select
//                       name="gender"
//                       value={profileData.gender || 'Male'}
//                       onChange={handleInputChange}
//                       disabled={!isEditing}
//                       className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
//                     >
//                       <option value="Male">Male</option>
//                       <option value="Female">Female</option>
//                       <option value="Other">Other</option>
//                     </select>
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">Blood Group</label>
//                     <select
//                       name="bloodGroup"
//                       value={profileData.bloodGroup || 'A+'}
//                       onChange={handleInputChange}
//                       disabled={!isEditing}
//                       className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
//                     >
//                       <option value="A+">A+</option>
//                       <option value="A-">A-</option>
//                       <option value="B+">B+</option>
//                       <option value="B-">B-</option>
//                       <option value="AB+">AB+</option>
//                       <option value="AB-">AB-</option>
//                       <option value="O+">O+</option>
//                       <option value="O-">O-</option>
//                     </select>
//                   </div>

//                   <div className="md:col-span-2">
//                     <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
//                     <input
//                       type="text"
//                       name="address"
//                       value={profileData.address || ''}
//                       onChange={handleInputChange}
//                       disabled={!isEditing}
//                       className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
//                     />
//                   </div>

//                   <div className="md:col-span-2">
//                     <label className="block text-sm font-medium text-gray-700 mb-2">Emergency Contact</label>
//                     <input
//                       type="tel"
//                       name="emergencyContact"
//                       value={profileData.emergencyContact || ''}
//                       onChange={handleInputChange}
//                       disabled={!isEditing}
//                       className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
//                     />
//                   </div>
//                 </div>
//               </div>
//             )}

//             {/* Settings Tab */}
//             {activeTab === 'settings' && (
//               <div className="bg-white rounded-xl shadow-lg p-6">
//                 <h2 className="text-2xl font-bold text-gray-900 mb-6">Account Settings</h2>
                
//                 <div className="space-y-6">
//                   {/* Notification Settings */}
//                   <div className="border-b border-gray-200 pb-6">
//                     <h3 className="text-lg font-semibold text-gray-900 mb-4">Notifications</h3>
//                     <div className="space-y-4">
//                       <div className="flex items-center justify-between">
//                         <div>
//                           <p className="font-medium text-gray-900">Email Notifications</p>
//                           <p className="text-sm text-gray-500">Receive appointment reminders via email</p>
//                         </div>
//                         <label className="relative inline-flex items-center cursor-pointer">
//                           <input type="checkbox" className="sr-only peer" defaultChecked />
//                           <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
//                         </label>
//                       </div>
//                       <div className="flex items-center justify-between">
//                         <div>
//                           <p className="font-medium text-gray-900">SMS Notifications</p>
//                           <p className="text-sm text-gray-500">Receive appointment reminders via SMS</p>
//                         </div>
//                         <label className="relative inline-flex items-center cursor-pointer">
//                           <input type="checkbox" className="sr-only peer" />
//                           <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
//                         </label>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Privacy Settings */}
//                   <div className="border-b border-gray-200 pb-6">
//                     <h3 className="text-lg font-semibold text-gray-900 mb-4">Privacy</h3>
//                     <div className="space-y-4">
//                       <div className="flex items-center justify-between">
//                         <div>
//                           <p className="font-medium text-gray-900">Profile Visibility</p>
//                           <p className="text-sm text-gray-500">Allow doctors to view your profile</p>
//                         </div>
//                         <label className="relative inline-flex items-center cursor-pointer">
//                           <input type="checkbox" className="sr-only peer" defaultChecked />
//                           <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
//                         </label>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Security Settings */}
//                   <div className="space-y-4">
//                     <h3 className="text-lg font-semibold text-gray-900">Security</h3>
//                     <div className="space-y-3">
//                       <button className="w-full text-left p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
//                         <div className="flex items-center justify-between">
//                           <div>
//                             <p className="font-medium text-gray-900">Change Password</p>
//                             <p className="text-sm text-gray-500">Update your account password</p>
//                           </div>
//                           <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
//                           </svg>
//                         </div>
//                       </button>
//                       <button className="w-full text-left p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
//                         <div className="flex items-center justify-between">
//                           <div>
//                             <p className="font-medium text-gray-900">Two-Factor Authentication</p>
//                             <p className="text-sm text-gray-500">Add extra security to your account</p>
//                           </div>
//                           <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
//                           </svg>
//                         </div>
//                       </button>
//                     </div>
//                   </div>

//                   {/* Danger Zone */}
//                   <div className="border-t border-red-200 pt-6">
//                     <h3 className="text-lg font-semibold text-red-600 mb-4">Danger Zone</h3>
//                     <button className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors font-medium">
//                       Delete Account
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default UserProfile

////////////////////////////////////////////////////////////////////////////////////////////////////////////
import React, { useContext, useState, useEffect } from 'react'
import { AppContext } from '../context/AppContext'

const UserProfile = () => {
  const [activeTab, setActiveTab] = useState('profile')
  const [isEditing, setIsEditing] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  
  const { profileData, setProfileData, loadUserProfileData, token } = useContext(AppContext)
  
  // Debug what we're getting from context
  useEffect(() => {
    console.log('UserProfile Debug:', { token, profileData, typeof: typeof profileData })
    
    // If we have token but no profile data, try loading it
    if (token && !profileData && loadUserProfileData) {
      console.log('Token exists but no profile data - attempting to load...')
      setLoading(true)
      setError(null)
      
      loadUserProfileData()
        .then(() => {
          setLoading(false)
        })
        .catch((err) => {
          console.error('Error loading profile:', err)
          setLoading(false)
          setError('Unable to load profile data. Please try again later.')
        })
    }
  }, [token, profileData, loadUserProfileData])

  // Show loading when we have token but are still loading profile data
  if (token && loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your profile...</p>
        </div>
      </div>
    )
  }

  // Show login message if no token
  if (!token) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="text-center">
          <div className="bg-white rounded-xl shadow-lg p-8 max-w-md">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Please Login</h2>
            <p className="text-gray-600 mb-6">You need to be logged in to view your profile</p>
            <button 
              onClick={() => window.location.href = '/login'} 
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Go to Login
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Show error if profile loading failed
  if (token && error) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="text-center">
          <div className="bg-white rounded-xl shadow-lg p-8 max-w-md">
            <div className="text-red-500 mb-4">
              <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Error Loading Profile</h2>
            <p className="text-gray-600 mb-6">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Only show profile content if we have both token and profileData
  if (!token || !profileData) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="text-center">
          <div className="bg-white rounded-xl shadow-lg p-8 max-w-md">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Profile Not Found</h2>
            <p className="text-gray-600 mb-6">Unable to load your profile information.</p>
            <button 
              onClick={() => window.location.reload()} 
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Refresh Page
            </button>
          </div>
        </div>
      </div>
    )
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    const updatedData = {
      ...profileData,
      [name]: value
    }
    setProfileData(updatedData)
  }

  const handleSaveProfile = async () => {
    try {
      setLoading(true)
      console.log('Saving profile:', profileData)
      
      // If you have a save function in context, use it
      // await saveUserProfileData(profileData)
      
      // For now, just show success (implement API call here)
      setIsEditing(false)
      setLoading(false)
      alert('Profile updated successfully!')
    } catch (error) {
      console.error('Error saving profile:', error)
      setLoading(false)
      alert('Error saving profile. Please try again.')
    }
  }

  const handleAvatarChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const updatedData = {
          ...profileData,
          avatar: e.target.result
        }
        setProfileData(updatedData)
      }
      reader.readAsDataURL(file)
    }
  }

  const TabButton = ({ tabId, label, icon }) => (
    <button
      onClick={() => setActiveTab(tabId)}
      className={`flex items-center space-x-2 px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
        activeTab === tabId
          ? 'bg-blue-600 text-white shadow-lg'
          : 'text-gray-600 hover:bg-gray-100'
      }`}
    >
      {icon}
      <span>{label}</span>
    </button>
  )

  // Check if this is a new/empty profile
  const isEmptyProfile = !profileData.name && !profileData.phone && !profileData.address

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Profile</h1>
          {isEmptyProfile && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
              <div className="flex items-center">
                <svg className="w-5 h-5 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-blue-800">
                  <span className="font-medium">Welcome!</span> Please complete your profile information below.
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="space-y-2">
                <TabButton
                  tabId="profile"
                  label="Profile Info"
                  icon={
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  }
                />
                <TabButton
                  tabId="settings"
                  label="Settings"
                  icon={
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  }
                />
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Profile Information</h2>
                  <button
                    onClick={() => isEditing ? handleSaveProfile() : setIsEditing(true)}
                    disabled={loading}
                    className={`px-6 py-2 rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${
                      isEditing
                        ? 'bg-green-600 hover:bg-green-700 text-white'
                        : 'bg-blue-600 hover:bg-blue-700 text-white'
                    }`}
                  >
                    {loading ? 'Saving...' : (isEditing ? 'Save Changes' : 'Edit Profile')}
                  </button>
                </div>

                {/* Avatar Section */}
                <div className="flex items-center space-x-6 mb-8">
                  <div className="relative">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold overflow-hidden">
                      {profileData.avatar ? (
                        <img src={profileData.avatar} alt="Profile" className="w-full h-full object-cover" />
                      ) : (
                        (profileData.name || profileData.email || 'U').charAt(0).toUpperCase()
                      )}
                    </div>
                    {isEditing && (
                      <label className="absolute bottom-0 right-0 bg-blue-600 rounded-full p-2 cursor-pointer hover:bg-blue-700 transition-colors">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <input
                          type="file"
                          className="hidden"
                          accept="image/*"
                          onChange={handleAvatarChange}
                        />
                      </label>
                    )}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      {profileData.name || 'Please add your name'}
                    </h3>
                    <p className="text-gray-600">{profileData.email || 'No email provided'}</p>
                    <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full mt-2">
                      {token ? 'Logged In' : 'Guest'}
                    </span>
                  </div>
                </div>

                {/* Profile Form */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name {isEmptyProfile && <span className="text-red-500">*</span>}
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={profileData.name || ''}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      placeholder={isEditing ? "Enter your full name" : ""}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={profileData.email || ''}
                      onChange={handleInputChange}
                      disabled={true} // Email should not be editable
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
                    />
                    <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={profileData.phone || ''}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      placeholder={isEditing ? "Enter your phone number" : ""}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
                    <input
                      type="date"
                      name="dateOfBirth"
                      value={profileData.dateOfBirth || ''}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                    <select
                      name="gender"
                      value={profileData.gender || ''}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
                    >
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Blood Group</label>
                    <select
                      name="bloodGroup"
                      value={profileData.bloodGroup || ''}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
                    >
                      <option value="">Select Blood Group</option>
                      <option value="A+">A+</option>
                      <option value="A-">A-</option>
                      <option value="B+">B+</option>
                      <option value="B-">B-</option>
                      <option value="AB+">AB+</option>
                      <option value="AB-">AB-</option>
                      <option value="O+">O+</option>
                      <option value="O-">O-</option>
                    </select>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                    <input
                      type="text"
                      name="address"
                      value={profileData.address || ''}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      placeholder={isEditing ? "Enter your full address" : ""}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Emergency Contact</label>
                    <input
                      type="tel"
                      name="emergencyContact"
                      value={profileData.emergencyContact || ''}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      placeholder={isEditing ? "Emergency contact number" : ""}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Settings Tab */}
            {activeTab === 'settings' && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Account Settings</h2>
                
                <div className="space-y-6">
                  {/* Notification Settings */}
                  <div className="border-b border-gray-200 pb-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Notifications</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-900">Email Notifications</p>
                          <p className="text-sm text-gray-500">Receive appointment reminders via email</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" defaultChecked />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-900">SMS Notifications</p>
                          <p className="text-sm text-gray-500">Receive appointment reminders via SMS</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Privacy Settings */}
                  <div className="border-b border-gray-200 pb-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Privacy</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-900">Profile Visibility</p>
                          <p className="text-sm text-gray-500">Allow doctors to view your profile</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" defaultChecked />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Security Settings */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">Security</h3>
                    <div className="space-y-3">
                      <button className="w-full text-left p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-gray-900">Change Password</p>
                            <p className="text-sm text-gray-500">Update your account password</p>
                          </div>
                          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </button>
                      <button className="w-full text-left p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-gray-900">Two-Factor Authentication</p>
                            <p className="text-sm text-gray-500">Add extra security to your account</p>
                          </div>
                          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </button>
                    </div>
                  </div>

                  {/* Danger Zone */}
                  <div className="border-t border-red-200 pt-6">
                    <h3 className="text-lg font-semibold text-red-600 mb-4">Danger Zone</h3>
                    <button className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors font-medium">
                      Delete Account
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserProfile