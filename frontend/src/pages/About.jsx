import React from 'react'
import { assets } from '../assets/assets'

const About = () => {
  return (
    <div>
      <div className='text-center text-2xl pt-10 text-gray-500'>
        <p>ABOUT <span className='text-gray-700 font-medium'>US</span></p>
      </div>
      <div className='my-10 flex flex-col md:flex-row gap-12'>
        <img className='w-full md:max-w-[360px]' src={assets.about_image} alt="" />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-sm text-gray-600'>
          <p >Welcome to Patil Hospital, your trusted partner in simplifying healthcare access. We are dedicated to making it easier for patients to find the right doctors and book appointments without the hassle of long queues or phone calls. Our mission is to connect you with experienced and verified healthcare professionals in just a few clicks.
          </p>

          <p>We provide a user-friendly platform where you can browse through a wide network of doctors, view their profiles, check availability, and schedule appointments instantly. Whether you need a consultation with a general physician, a specialist, or follow-up care, our system ensures a smooth and secure booking experience anytime, anywhere.
          </p>

          <p>At Patil Hospital, we value your health and time. That’s why we partner only with trusted and qualified medical practitioners. Our goal is to give you quick, reliable, and convenient access to the care you need while maintaining the highest standards of privacy and security for your personal information.
          </p>
           {/* <b className='text-gray-500'>Vision</b> */}
          <p>To revolutionize healthcare access by creating a seamless, reliable, and technology-driven platform that connects patients with trusted doctors anytime, anywhere — ensuring quality care is just a click away.</p>
        </div>
      </div>
      <div>
        <p>WHY <span className='text-gray-700 font-semibold'>CHOOSE US</span></p>
      </div>
      <div className='flex flex-col md:flex-row mb-20'>
        <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'> 
          <b>Efficiency:</b>
          <p>Streamlined appointment scheduling that fits into your busy lifestyle.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'> 
          <b>Convenience:</b>
          <p>Access to a network of trusted healthcare professionals in your area.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'> 
          <b>Personalization:</b>
          <p>Tailored recommendations and remainders to help you stay on top of your health.</p>
        </div>
      </div>
    </div>
  )
}

export default About


// import React from 'react'
// import { assets } from '../assets/assets'

// const About = () => {
//   return (
//     <div className="bg-gradient-to-br from-blue-50 to-white py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8">
//       {/* Header Section */}
//       <div className="max-w-6xl mx-auto">
//         <div className="text-center mb-8 sm:mb-12 lg:mb-16">
//           <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
//             ABOUT
//             <span className="text-blue-600 ml-2 relative">
//               US
//               <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full"></div>
//             </span>
//           </h1>
//           <div className="w-16 sm:w-20 lg:w-24 h-1 bg-blue-600 mx-auto mt-4 sm:mt-6 rounded-full"></div>
//         </div>

//         {/* Main Content Section */}
//         <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start lg:items-center mb-12 sm:mb-16 lg:mb-20">
//           {/* Image Section */}
//           <div className="order-2 lg:order-1 mb-8 lg:mb-0">
//             <div className="relative group max-w-md mx-auto lg:max-w-none">
//               <div className="absolute -inset-2 sm:-inset-4 bg-gradient-to-r from-blue-400 to-purple-400 rounded-xl sm:rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-500"></div>
//               <div className="relative">
//                 <img 
//                   src={assets.about_image} 
//                   alt="About Patil Hospital" 
//                   className="w-full h-64 sm:h-80 lg:h-96 object-cover rounded-xl sm:rounded-2xl shadow-xl transform transition duration-500 hover:scale-105"
//                 />
//                 <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-xl sm:rounded-2xl"></div>
//               </div>
//             </div>
//           </div>

//           {/* Text Content Section */}
//           <div className="order-1 lg:order-2 space-y-6 lg:space-y-8">
//             <div className="space-y-4 sm:space-y-6">
//               {/* First Paragraph */}
//               <div className="bg-white/80 backdrop-blur-sm rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
//                 <div className="flex items-start space-x-3 sm:space-x-4">
//                   <div className="flex-shrink-0">
//                     <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-full flex items-center justify-center">
//                       <svg className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
//                       </svg>
//                     </div>
//                   </div>
//                   <p className="text-gray-700 leading-relaxed text-sm sm:text-base lg:text-lg">
//                     Welcome to <span className="font-semibold text-blue-600">Patil Hospital</span>, your trusted partner in simplifying healthcare access. We are dedicated to making it easier for patients to find the right doctors and book appointments without the hassle of long queues or phone calls. Our mission is to connect you with experienced and verified healthcare professionals in just a few clicks.
//                   </p>
//                 </div>
//               </div>

//               {/* Second Paragraph */}
//               <div className="bg-white/80 backdrop-blur-sm rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
//                 <div className="flex items-start space-x-3 sm:space-x-4">
//                   <div className="flex-shrink-0">
//                     <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-full flex items-center justify-center">
//                       <svg className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
//                       </svg>
//                     </div>
//                   </div>
//                   <p className="text-gray-700 leading-relaxed text-sm sm:text-base lg:text-lg">
//                     We provide a user-friendly platform where you can browse through a wide network of doctors, view their profiles, check availability, and schedule appointments instantly. Whether you need a consultation with a general physician, a specialist, or follow-up care, our system ensures a smooth and secure booking experience anytime, anywhere.
//                   </p>
//                 </div>
//               </div>

//               {/* Third Paragraph */}
//               <div className="bg-white/80 backdrop-blur-sm rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
//                 <div className="flex items-start space-x-3 sm:space-x-4">
//                   <div className="flex-shrink-0">
//                     <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-100 rounded-full flex items-center justify-center">
//                       <svg className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
//                       </svg>
//                     </div>
//                   </div>
//                   <p className="text-gray-700 leading-relaxed text-sm sm:text-base lg:text-lg">
//                     At <span className="font-semibold text-blue-600">Patil Hospital</span>, we value your health and time. That's why we partner only with trusted and qualified medical practitioners. Our goal is to give you quick, reliable, and convenient access to the care you need while maintaining the highest standards of privacy and security for your personal information.
//                   </p>
//                 </div>
//               </div>
//             </div>

//             {/* Call to Action */}
//             <div className="text-center lg:text-left mt-6 sm:mt-8 lg:mt-10">
//               <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 hover:from-blue-700 hover:to-purple-700">
//                 Book Your Appointment Today
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Stats Section */}
//         <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16 lg:mb-20">
//           <div className="text-center bg-white/60 backdrop-blur-sm rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300">
//             <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-blue-600 mb-2">500+</div>
//             <div className="text-gray-700 font-medium text-sm sm:text-base">Qualified Doctors</div>
//           </div>
//           <div className="text-center bg-white/60 backdrop-blur-sm rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300">
//             <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-green-600 mb-2">10K+</div>
//             <div className="text-gray-700 font-medium text-sm sm:text-base">Happy Patients</div>
//           </div>
//           <div className="text-center bg-white/60 backdrop-blur-sm rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300">
//             <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-purple-600 mb-2">24/7</div>
//             <div className="text-gray-700 font-medium text-sm sm:text-base">Available Support</div>
//           </div>
//         </div>

//         {/* Mission Statement */}
//         <div className="text-center">
//           <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl sm:rounded-2xl p-6 sm:p-8 lg:p-12 shadow-2xl">
//             <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-3 sm:mb-4">Our Mission</h2>
//             <p className="text-base sm:text-lg lg:text-xl opacity-90 max-w-4xl mx-auto leading-relaxed">
//               To revolutionize healthcare accessibility by providing a seamless, secure, and user-friendly platform that connects patients with the right healthcare professionals, ensuring quality care is just a click away.
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default About