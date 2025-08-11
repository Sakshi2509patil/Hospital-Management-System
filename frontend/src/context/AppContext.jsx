// import { createContext, useEffect, useState } from "react";
// // import {  doctors } from '../assets/assets';
// import axios from 'axios'
// import { toast } from "react-toastify";
// export const AppContext=createContext()

// const AppContextProvider=(props)=>{
//      const currencySymbol='$'
//      const backendUrl=import.meta.env.VITE_BACKEND_URL
//      const [doctors,setDoctors]=useState([])
//      const [token,setToken]=useState(localStorage.getItem('token')?localStorage.getItem('token'):false)
//      const {profileData,setProfileData}=useState(false)

//     const getDoctorsData=async()=>{
//         try{
//           const {data}=await axios.get(backendUrl+'/api/doctor/list')
//           if(data.success){
//            setDoctors(data.doctors)
//           } else{
//             toast.error(data.message)
//           }
//         } catch(error){
//            console.log(error)
//            toast.error(error.message)
//         }
//     }

//     const loadUserProfileData=async()=>{
//         try{
//            const {data}=await axios.get(backendUrl+'/api/user/get-profile',{headers:{token}})
//            if(data.success){
//             setProfileData(data.profileData)
//            } else{
//             toast.error(data.message)
//            }
//         } catch(error){
//            console.log(error)
//            toast.error(error.message)
//         }
//     }


//     const value={
//         doctors,
//         currencySymbol,
//         token,
//         setToken,
//         backendUrl,
//         profileData,
//         setProfileData,
//         loadUserProfileData,
//     }

//     useEffect(()=>{
//         getDoctorsData()
//     },[])

//     useEffect(()=>{
//        if(token){
//         loadUserProfileData()
//        } else{
//         setProfileData(false)
//        }
//     },[token])

//     return (
//         <AppContext.Provider value={value}>
//             {props.children}
//         </AppContext.Provider>
//     )
// }

// export default AppContextProvider

import { createContext, useEffect, useState } from "react";
// import {  doctors } from '../assets/assets';
import axios from 'axios'
import { toast } from "react-toastify";

export const AppContext = createContext()

const AppContextProvider = (props) => {
    const currencySymbol = '$'
    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const [doctors, setDoctors] = useState([])
    const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : false)
    const [profileData, setProfileData] = useState(false) // Fixed: changed {} to []

    const getDoctorsData = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/doctor/list')
            if (data.success) {
                setDoctors(data.doctors)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const loadUserProfileData = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/admin/user/get-profile', { headers: { token } })
            if (data.success) {
                // Transform the MongoDB data to match your frontend format
                const transformedData = {
                    name: data.userData.name || '',
                    email: data.userData.email || '',
                    phone: data.userData.phone || '',
                    dateOfBirth: data.userData.dob !== 'Not Selected' ? data.userData.dob : '',
                    gender: data.userData.gender !== 'Not Selected' ? data.userData.gender : 'Male',
                    bloodGroup: data.userData.bloodGroup || 'A+',
                    address: typeof data.userData.address === 'object' 
                        ? `${data.userData.address.line1 || ''} ${data.userData.address.line2 || ''}`.trim()
                        : data.userData.address || '',
                    emergencyContact: data.userData.emergencyContact || '',
                    avatar: data.userData.image !== 'https://static.vecteezy.com/system/resources/thumbnails/009/734/564/sm…' 
                        ? data.userData.image 
                        : null
                }
                setProfileData(transformedData)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            if (error.response && error.response.status === 404) {
                console.log('Profile endpoint not found - please implement /apiz/user/get-profile')
                // toast.error('Profile endpoint not implemented yet')
            } else {
                toast.error(error.message)
            }
        }
    }

    const value = {
        doctors,getDoctorsData,
        currencySymbol,
        token,
        setToken,
        backendUrl,
        profileData,
        setProfileData,
        loadUserProfileData,
    }

    useEffect(() => {
        getDoctorsData()
    }, [])

    useEffect(() => {
        if (token) {
            loadUserProfileData()
        } else {
            setProfileData(false)
        }
    }, [token])

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// import { createContext, useEffect, useState } from "react";
// import axios from 'axios'
// import { toast } from "react-toastify";

// export const AppContext = createContext()

// const AppContextProvider = (props) => {
//     const currencySymbol = '$'
//     const backendUrl = import.meta.env.VITE_BACKEND_URL
//     const [doctors, setDoctors] = useState([])
//     const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : false)
//     const [profileData, setProfileData] = useState(null)
//     const [profileLoading, setProfileLoading] = useState(false)

//     const getDoctorsData = async () => {
//         try {
//             const { data } = await axios.get(backendUrl + '/api/doctor/list')
//             if (data.success) {
//                 setDoctors(data.doctors)
//             } else {
//                 toast.error(data.message)
//             }
//         } catch (error) {
//             console.log(error)
//             toast.error(error.message)
//         }
//     }

//     // const loadUserProfileData = async () => {
//     //     if (!token) {
//     //         setProfileData(null)
//     //         return
//     //     }

//     //     setProfileLoading(true)
//     //     console.log('🔄 Loading profile data...', { backendUrl, token: token ? 'Present' : 'Missing' })
        
//     //     try {
//     //         const { data } = await axios.get(backendUrl + '/api/user/get-profile', { 
//     //             headers: { token } 
//     //         })
            
//     //         console.log('📥 Profile API Response:', data)
            
//     //         if (data.success) {
//     //             console.log('✅ Profile data received:', data.userData)
                
//     //             // Transform the MongoDB data to match your frontend format
//     //             const transformedData = {
//     //                 name: data.userData.name || '',
//     //                 email: data.userData.email || '',
//     //                 phone: data.userData.phone || '',
//     //                 dateOfBirth: data.userData.dob !== 'Not Selected' ? data.userData.dob : '',
//     //                 gender: data.userData.gender !== 'Not Selected' ? data.userData.gender : 'Male',
//     //                 bloodGroup: data.userData.bloodGroup || 'A+',
//     //                 address: typeof data.userData.address === 'object' 
//     //                     ? `${data.userData.address.line1 || ''} ${data.userData.address.line2 || ''}`.trim()
//     //                     : data.userData.address || '',
//     //                 emergencyContact: data.userData.emergencyContact || '',
//     //                 avatar: data.userData.image !== 'https://static.vecteezy.com/system/resources/thumbnails/009/734/564/sm…' 
//     //                     ? data.userData.image 
//     //                     : null
//     //             }
                
//     //             console.log('🔄 Transformed profile data:', transformedData)
//     //             setProfileData(transformedData)
//     //             toast.success('Profile loaded successfully!')
//     //         } else {
//     //             console.log('❌ Profile API returned error:', data.message)
//     //             toast.error(data.message || 'Failed to load profile')
//     //             // Create empty profile for user to fill
//     //             createEmptyProfile()
//     //         }
//     //     } catch (error) {
//     //         console.log('🚨 Profile API error:', {
//     //             status: error.response?.status,
//     //             message: error.message,
//     //             response: error.response?.data
//     //         })
            
//     //         // Handle different error cases
//     //         if (error.response?.status === 404) {
//     //             console.log('❌ Profile endpoint not found - creating empty profile')
//     //             toast.info('Profile endpoint not available. You can still create your profile.')
//     //             createEmptyProfile()
//     //         } else if (error.response?.status === 401) {
//     //             console.log('🔒 Unauthorized - invalid token')
//     //             toast.error('Session expired. Please login again.')
//     //             setToken(false)
//     //             localStorage.removeItem('token')
//     //         } else {
//     //             console.log('🌐 Network or server error - creating empty profile')
//     //             toast.error('Failed to load profile. You can still edit your information.')
//     //             createEmptyProfile()
//     //         }
//     //     } finally {
//     //         setProfileLoading(false)
//     //     }
//     // }

//     const loadUserProfileData = async () => {
//     if (!token) {
//         setProfileData(null)
//         return Promise.resolve()
//     }

//     setProfileLoading(true)

//     try {
//         const { data } = await axios.get(backendUrl + '/api/user/get-profile', {
//             headers: { token }
//         })

//         if (data.success) {
//             setProfileData(/* transformedData */)
//             return Promise.resolve(data)
//         } else {
//             createEmptyProfile()
//             return Promise.reject(new Error(data.message))
//         }
//     } catch (error) {
//         createEmptyProfile()
//         return Promise.reject(error)
//     } finally {
//         setProfileLoading(false)
//     }
// }


//     // Create an empty profile that user can fill out
//     const createEmptyProfile = () => {
//         console.log('📝 Creating empty profile for user to fill')
//         const emptyProfile = {
//             name: '',
//             email: '', // This will be filled from user's account
//             phone: '',
//             dateOfBirth: '',
//             gender: 'Male',
//             bloodGroup: 'A+',
//             address: '',
//             emergencyContact: '',
//             avatar: null
//         }
//         setProfileData(emptyProfile)
//         console.log('✅ Empty profile created:', emptyProfile)
//     }

//     // Save profile data to backend
//     const saveUserProfileData = async (updatedData) => {
//         if (!token) {
//             toast.error('Please login to save profile')
//             return false
//         }

//         try {
//             // Transform data back to backend format
//             const backendData = {
//                 name: updatedData.name,
//                 phone: updatedData.phone,
//                 dob: updatedData.dateOfBirth || 'Not Selected',
//                 gender: updatedData.gender || 'Not Selected',
//                 address: {
//                     line1: updatedData.address,
//                     line2: ''
//                 }
//             }

//             const { data } = await axios.post(
//                 backendUrl + '/api/user/update-profile', 
//                 backendData,
//                 { headers: { token } }
//             )

//             if (data.success) {
//                 setProfileData(updatedData)
//                 toast.success('Profile updated successfully!')
//                 return true
//             } else {
//                 toast.error(data.message || 'Failed to update profile')
//                 return false
//             }
//         } catch (error) {
//             console.log('Profile save error:', error)
//             if (error.response?.status === 404) {
//                 toast.error('Profile update endpoint not implemented yet')
//             } else {
//                 toast.error(error.response?.data?.message || 'Failed to update profile')
//             }
//             return false
//         }
//     }

//     const value = {
//         doctors,
//         getDoctorsData,
//         currencySymbol,
//         token,
//         setToken,
//         backendUrl,
//         profileData,
//         setProfileData,
//         profileLoading,
//         loadUserProfileData,
//         saveUserProfileData
//     }

//     useEffect(() => {
//         getDoctorsData()
//     }, [])

//     useEffect(() => {
//         if (token) {
//             loadUserProfileData()
//         } else {
//             setProfileData(null)
//         }
//     }, [token])

//     return (
//         <AppContext.Provider value={value}>
//             {props.children}
//         </AppContext.Provider>
//     )
// }

// export default AppContextProvider