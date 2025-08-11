import React from 'react'
import { assets } from '../assets/assets'

const Header = () => {
  return (
    <div className="flex flex-col md:flex-row flex-wrap bg-primary rounded-lg px-6 md:px-8 lg:px-16 py-6 md:py-10">
      {/* ----------Left side ---------- */}
      <div className="md:w-1/2 flex flex-col items-start justify-center gap-4 py-10 m-auto md:py-[10vw] md:mb-[-30px]">
        <p className="text-3xl md:text-4xl lg:text-5xl text-white font-semibold leading-tight md:leading-tight lg:leading-tight">
          Book Appointment <br /> With Trusted Doctors
        </p>
        <div className="flex flex-col md:flex-row items-center gap-3 text-white text-sm font-light">
          {assets?.group_profiles ? (
            <img className="w-28" src={assets.group_profiles} alt="Doctor profiles" />
          ) : (
            <div className="w-28 h-8 bg-white bg-opacity-20 rounded"></div>
          )}
          <p>
            Connect with top healthcare professionals <br className="hidden sm:block" />
            and get the care you need, when you need it.
          </p>
        </div>
        <a 
          href="#speciality" 
          className="flex items-center gap-2 bg-white px-8 py-3 rounded-full text-gray-600 text-sm hover:scale-105 transition-all duration-300"
        >
          Book Appointment 
          {assets?.arrow_icon ? (
            <img className="w-3" src={assets.arrow_icon} alt="Arrow" />
          ) : (
            <span>→</span>
          )}
        </a>
      </div>
      
      {/* -----------Right side------------ */}
      <div className="md:w-1/2 relative">
        {assets?.header_img ? (
          <img 
            className="w-full md:absolute bottom-0 h-auto rounded-lg" 
            src={assets.header_img} 
            alt="Header doctor" 
          />
        ) : (
          <div className="w-full h-64 md:h-96 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
            <p className="text-white">Header Image</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Header

