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
