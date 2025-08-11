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
