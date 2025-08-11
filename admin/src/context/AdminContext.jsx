// import { createContext, useState } from "react";
// import axios from 'axios'
// import { toast } from "react-toastify";
// export const AdminContext=createContext()

// const AdminContextProvider=(props)=>{

//      const [aToken, setAToken] = useState(localStorage.getItem('aToken')?localStorage.getItem('aToken'):'')
//      const [doctors,setDoctors]=useState([])
//      const backendUrl=import.meta.env.VITE_BACKENDURL
//      const getAllDoctors=async()=>{
//         try{
//            const {data}=await axios.post(backendUrl+'/api/admin/all-doctors',{},{headers:{aToken}})
//            if(data.sucess){
//             setDoctors(data.doctors)
            
//            } else{
//             toast.error(data.message)
//            }
//         } catch(error){
//              toast.error(error.message)
//         }
//      }

//     const value={
//          aToken , setAToken,
//          backendUrl,doctors,
//          getAllDoctors
//     }
//     return(
//         <AdminContext.Provider value={value}>
//             {props.children}
//         </AdminContext.Provider>
//     )
// }

// export default AdminContextProvider

// import { createContext, useState } from "react";
// import axios from 'axios'
// import { toast } from "react-toastify";

// export const AdminContext = createContext()

// const AdminContextProvider = (props) => {
//     const [aToken, setAToken] = useState(localStorage.getItem('aToken') ? localStorage.getItem('aToken') : '')
//     const [doctors, setDoctors] = useState([])
//     const backendUrl = import.meta.env.VITE_BACKENDURL

//     const getAllDoctors = async () => {
//         try {
//             console.log('Fetching doctors...', { backendUrl, aToken }) // Debug log
//             const { data } = await axios.post(backendUrl + '/api/admin/all-doctors', {}, { headers: { aToken } })
//             console.log('Response data:', data) // Debug log
            
//             // Fixed typo: 'sucess' should be 'success'
//             if (data.success) {
//                 setDoctors(data.doctors)
//                 console.log('Doctors set:', data.doctors) // Debug log
//             } else {
//                 toast.error(data.message)
//                 console.error('Backend error:', data.message)
//             }
//         } catch (error) {
//             toast.error(error.message)
//             console.error('Network error:', error)
//         }
//     }

//     const changeAvailability=async(docId)=>{
//           try{
//              const {data}=await axios.post(backendUrl+'/api/admin/change-availability',{docId},{headers:{aToken}})
//              if(data.success){
//                 toast.success(data.message)
//                 getAllDoctors()
//              } else{
//                 toast.error(data.message)
//              }
//           } catch(error){
//             toast.error(error.message)
//           }
//     }

//     const value = {
//         aToken,
//         setAToken,
//         backendUrl,
//         doctors,
//         getAllDoctors,
//         changeAvailability,
//     }

//     return (
//         <AdminContext.Provider value={value}>
//             {props.children}
//         </AdminContext.Provider>
//     )
// }

// export default AdminContextProvider

import { createContext, useState } from "react";
import axios from 'axios'
import { toast } from "react-toastify";

export const AdminContext = createContext()

const AdminContextProvider = (props) => {
    const [aToken, setAToken] = useState(localStorage.getItem('aToken') ? localStorage.getItem('aToken') : '')
    const [doctors, setDoctors] = useState([])
    const[appointments,setAppointments]=useState([])
    const backendUrl = import.meta.env.VITE_BACKENDURL

    const getAllDoctors = async () => {
        try {
            console.log('Fetching doctors...', { backendUrl, aToken })
            const { data } = await axios.post(backendUrl + '/api/admin/all-doctors', {}, { headers: { aToken } })
            console.log('Response data:', data)
            
            if (data.success) {
                setDoctors(data.doctors)
                console.log('Doctors set:', data.doctors)
            } else {
                toast.error(data.message)
                console.error('Backend error:', data.message)
            }
        } catch (error) {
            toast.error(error.message)
            console.error('Network error:', error)
        }
    }

    const changeAvailability = async (docId) => {
        try {
            console.log('=== CHANGE AVAILABILITY DEBUG ===')
            console.log('Doctor ID:', docId)
            console.log('Backend URL:', backendUrl)
            console.log('Full URL:', backendUrl + '/api/admin/change-availability')
            console.log('Token:', aToken)
            
            // First, let's try to ping the backend to see if it's running
            // const testResponse = await axios.get(backendUrl + '/api/test').catch(e => {
            //     console.log('Backend test failed:', e.message)
            //     return null
            // })
            
            // if (!testResponse) {
            //     toast.error('Backend server is not responding')
            //     return
            // }
            
            const response = await axios.post(
                backendUrl + '/api/admin/change-availability', 
                { docId }, 
                { 
                    headers: { 
                        aToken,
                        'Content-Type': 'application/json'
                    } 
                }
            )
            
            console.log('Success response:', response.data)
            
            if (response.data.success) {
                toast.success(response.data.message)
                getAllDoctors()
            } else {
                toast.error(response.data.message || 'Operation failed')
            }
        } catch (error) {
            console.log('=== ERROR DETAILS ===')
            console.log('Error message:', error.message)
            console.log('Error status:', error.response?.status)
            console.log('Error data:', error.response?.data)
            console.log('Error config:', error.config)
            
            if (error.response?.status === 404) {
                toast.error('Route not found. Check if backend route /api/admin/change-availability exists')
                console.log('Available routes should include: /api/admin/change-availability')
            } else if (error.response?.status === 401) {
                toast.error('Unauthorized. Token might be invalid')
            } else if (error.code === 'ECONNREFUSED') {
                toast.error('Cannot connect to backend server')
            } else {
                toast.error(error.response?.data?.message || error.message)
            }
        }
    }

    const getAllAppointments=async()=>{
        try{
             const {data}=await axios.get(backendUrl+'/api/admin/appointments',{headers:{aToken}})
             if(data.success){
                setAppointments(data.appointments)
             } else{
                toast.error(data.message)
             }
        } catch(error){
            toast.error(error.message)
        }
    }

    const cancelAppointment=async(appointmentId)=>{
         try{
        const {data}=await axios.post(backendUrl+'/api/admin/cancel-appointment',{appointmentId},{headers:{aToken}})
        if(data.success){
            toast.success(data.message)
            getAllAppointments()
        } else {
            toast.error(data.message)
        }
        }
         catch(error){
            toast.error(error.message)
        }
    }

    const value = {
        aToken,
        setAToken,
        backendUrl,
        doctors,
        getAllDoctors,
        changeAvailability,
        appointments,
        setAppointments,
        getAllAppointments,
        cancelAppointment
    }

    return (
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    )
}

export default AdminContextProvider