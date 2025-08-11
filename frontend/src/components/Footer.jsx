// import React from 'react'
// import { assets } from '../assets/assets'

// const Footer = () => {
//   return (
//     <div>
//       <div>
//         {/* ----------Left Section----------- */}
//         <div>
//             <img src={assets.logo} alt="" />
//             <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam eaque aut pariatur distinctio non ut repellat, voluptate possimus molestiae ad porro vitae iure quae expedita et reiciendis eius autem nisi?</p>
//         </div>
//         {/* ----------Middle Section----------- */}
//         <div>
//             <p>COMPANY</p>
//                <ul>
//                 <li>Home</li>
//                 <li>About us</li>
//                 <li>Contact us</li>
//                 <li>Privacy policy</li>
//                </ul>
//         </div>
//         {/* ----------Right Section----------- */}
//         <div>
//             <p>GET IN TOUCH</p>
//             <ul>
//                 <li>+1-912-658-4689</li>
//                 <li>xyz123@gmail.com</li>
//             </ul>
//         </div>
//       </div>
//       <div>
//         {/* -----------Copyright Text------------- */}
//         <hr />
//         <p>Copyright 2025@ SeeMyDoctor - All Right Reserved.</p>
//       </div>
//     </div>
//   )
// }

// export default Footer


import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className="md:mx-10">
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
        {/* ----------Left Section----------- */}
        <div>
            <img className="mb-5 w-40" src={assets.logo} alt="" />
            <p className="w-full md:w-2/3 text-gray-600 leading-6">Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam eaque aut pariatur distinctio non ut repellat, voluptate possimus molestiae ad porro vitae iure quae expedita et reiciendis eius autem nisi?</p>
        </div>
        {/* ----------Middle Section----------- */}
        <div>
            <p className="text-xl font-medium mb-5">COMPANY</p>
               <ul className="flex flex-col gap-2 text-gray-600">
                <li className="cursor-pointer hover:text-black transition-all duration-300">Home</li>
                <li className="cursor-pointer hover:text-black transition-all duration-300">About us</li>
                <li className="cursor-pointer hover:text-black transition-all duration-300">Contact us</li>
                <li className="cursor-pointer hover:text-black transition-all duration-300">Privacy policy</li>
               </ul>
        </div>
        {/* ----------Right Section----------- */}
        <div>
            <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
            <ul className="flex flex-col gap-2 text-gray-600">
                <li>+1-912-658-4689</li>
                <li>xyz123@gmail.com</li>
            </ul>
        </div>
      </div>
      <div>
        {/* -----------Copyright Text------------- */}
        <hr className="border-gray-300 my-5" />
        <p className="py-5 text-sm text-center text-gray-600">Copyright 2025@ SeeMyDoctor - All Right Reserved.</p>
      </div>
    </div>
  )
}

export default Footer