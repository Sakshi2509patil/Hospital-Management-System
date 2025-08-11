import React, { useEffect, useState, useCallback } from 'react'
import { useContext } from 'react'
import { useParams, useLocation, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { assets } from '../assets/assets'
import { toast } from 'react-toastify'
import axios from 'axios'

const Appointment = () => {
  const params = useParams()
  const location = useLocation()
  const { doctors, backendUrl, token, getDoctorsData } = useContext(AppContext)
  const [docInfo, setDocInfo] = useState(null)
  const [selectedDate, setSelectedDate] = useState(null)
  const [selectedTime, setSelectedTime] = useState(null)
  const [bookedSlots, setBookedSlots] = useState({}) // Store booked appointments
  const [bookingMessage, setBookingMessage] = useState('') // Message for booking status
  const navigate = useNavigate()

  // Debug: Log all the params and location info
  console.log('All params:', params)
  console.log('Location:', location)
  console.log('Current URL:', window.location.href)

  // Try different possible parameter names
  const docID = params.docID || params.id || params.doctorId || params.docId

  // Function to check if appointment time has passed
  const isAppointmentTimeValid = (appointmentDate, slotTime) => {
    try {
      // Parse the slot time (format: "10:00 AM" or "2:30 PM")
      const timeParts = slotTime.split(' ');
      if (timeParts.length !== 2) return false;
      
      const [time, period] = timeParts;
      const [hours, minutes] = time.split(':').map(num => parseInt(num));
      
      // Convert to 24-hour format
      let hour24 = hours;
      if (period === 'PM' && hours !== 12) {
        hour24 += 12;
      } else if (period === 'AM' && hours === 12) {
        hour24 = 0;
      }
      
      // Create appointment date and time
      const appointmentDateTime = new Date(appointmentDate);
      appointmentDateTime.setHours(hour24, minutes, 0, 0);
      
      const currentDateTime = new Date();
      
      // Check if appointment is at least 1 hour in the future
      const oneHourFromNow = new Date(currentDateTime.getTime() + (60 * 60 * 1000));
      
      return appointmentDateTime > oneHourFromNow;
    } catch (error) {
      console.error('Error validating appointment time:', error);
      return false;
    }
  };

  // Generate available dates (next 7 days including Sunday)
  const getNextSevenDays = () => {
    const days = []
    const today = new Date()
    for (let i = 0; i < 7; i++) {
      const date = new Date(today)
      date.setDate(today.getDate() + i)
      days.push({
        date: date,
        day: date.toLocaleDateString('en-US', { weekday: 'short' }),
        dayNumber: date.getDate(),
        month: date.toLocaleDateString('en-US', { month: 'short' })
      })
    }
    return days
  }

  // Available time slots
  const timeSlots = [
    '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM',
    '5:00 PM', '5:30 PM', '6:00 PM'
  ]

  // Function to check if a slot is booked
  const isSlotBooked = (date, time) => {
    if (!date || !time || !docID) return false
    const dateString = date.toDateString()
    const slotKey = `${docID}-${dateString}-${time}`
    return bookedSlots[slotKey] === true
  }

  // Function to check if a slot is in the past
  const isSlotInPast = (date, time) => {
    if (!date || !time) return false
    return !isAppointmentTimeValid(date, time)
  }

  // Load existing booked slots from API (fully dynamic version)
  const fetchBookedSlots = useCallback(async () => {
    if (!docID) return
    
    try {
      // Replace with your actual API endpoint
      const response = await fetch(`/api/admin/user/appointments/booked/${docID}`)
      const data = await response.json()
      
      // Convert API response to our slot format
      const slots = {}
      data.forEach(appointment => {
        const slotKey = `${docID}-${appointment.date}-${appointment.time}`
        slots[slotKey] = true
      })
      
      setBookedSlots(slots)
    } catch (error) {
      console.error('Error fetching booked slots:', error)
      
      // Fallback to mock data for development
      const mockBookedSlots = {}
      if (docID) {
        const today = new Date()
        const tomorrow = new Date(today)
        tomorrow.setDate(today.getDate() + 1)
        
      }
      setBookedSlots(mockBookedSlots)
    }
  }, [docID])

  useEffect(() => {
    fetchBookedSlots()
    
    // Optional: Set up polling to refresh booked slots every 30 seconds
    const interval = setInterval(fetchBookedSlots, 30000)
    return () => clearInterval(interval)
  }, [fetchBookedSlots])

  const fetchDocInfo = useCallback(async () => {
    console.log('fetchDocInfo called')
    console.log('doctors:', doctors)
    console.log('docID from params:', docID)
    console.log('All available params:', params)
    
    if (doctors && doctors.length > 0 && docID) {
      const foundDoc = doctors.find(doc => {
        console.log('Comparing:', doc._id, 'with', docID)
        return doc._id === docID
      })
      console.log('Found docInfo:', foundDoc)
      setDocInfo(foundDoc)
    } else {
      console.log('Missing docID or doctors:', { docID, doctorsLength: doctors?.length })
    }
  }, [doctors, docID, params])

  // Fixed booking function using your backend API
  const bookAppointment = async () => {
    if (!token) {
      toast.warn("Login to Book Appointment")
      return navigate('/login')
    }

    if (!selectedDate || !selectedTime) {
      toast.error('Please select both date and time for your appointment')
      return
    }

    // Check if the selected time is in the past
    if (isSlotInPast(selectedDate.date, selectedTime)) {
      toast.error('Cannot book appointments for past dates or times. Please select a future time slot.')
      return
    }

    if (isSlotBooked(selectedDate.date, selectedTime)) {
      toast.error('This appointment slot is already booked. Please select another time.')
      return
    }

    try {
      const date = selectedDate.date
      let day = date.getDate()
      let month = date.getMonth() + 1
      let year = date.getFullYear()

      const slotDate = day + "_" + month + "_" + year
      const slotTime = selectedTime
      
      // Show loading state
      setBookingMessage('Booking your appointment...')

      const { data } = await axios.post(backendUrl + '/api/admin/user/book-appointment', {
        docId: docID,  // Backend expects 'docId', not 'docID'
        slotDate,
        slotTime
      }, { headers: { token } })

      if (data.success) {
        toast.success(data.message)
        getDoctorsData()
        
        // Update local booked slots state
        const dateString = date.toDateString()
        const slotKey = `${docID}-${dateString}-${selectedTime}`
        setBookedSlots(prev => ({
          ...prev,
          [slotKey]: true
        }))
        
        // Clear selections
        setSelectedDate(null)
        setSelectedTime(null)
        setBookingMessage('')
        
        navigate('/my-appointment')
      } else {
        toast.error(data.message)
        setBookingMessage('')
      }
    } catch (error) {
      console.log(error)
      toast.error(error.response?.data?.message || error.message)
      setBookingMessage('')
    }
  }

  useEffect(() => {
    fetchDocInfo()
  }, [fetchDocInfo])

  const handleTimeSelection = (time) => {
    // Check if slot is in the past
    if (selectedDate && isSlotInPast(selectedDate.date, time)) {
      toast.error('Cannot select past time slots. Please choose a future time.')
      return
    }

    if (selectedDate && isSlotBooked(selectedDate.date, time)) {
      setBookingMessage('This appointment slot is already booked. Please select another time.')
      setTimeout(() => setBookingMessage(''), 3000) // Clear message after 3 seconds
      return
    }
    
    setSelectedTime(time)
    setBookingMessage('') // Clear any existing message
  }

  const handleDateSelection = (dayInfo) => {
    setSelectedDate(dayInfo)
    setBookingMessage('') // Clear any existing message
  }

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
      {!docInfo ? (
        <div className="text-center py-8">
          <p className="text-gray-500">
            {docID ? 'Doctor not found...' : 'No doctor ID in URL...'}
          </p>
          <p className="text-sm text-gray-400 mt-2">
            Expected URL format: /appointment/doc1 (or whatever your route is configured as)
          </p>
        </div>
      ) : (
        <>
          {/* -------------Doctor Details-------------- */}
          <div className="flex flex-col sm:flex-row gap-8 bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="sm:w-1/3 lg:w-1/4">
              <img 
                className="w-full h-64 sm:h-full object-cover bg-blue-400"
                src={docInfo.image}
                alt={docInfo.name}
              />
            </div>
            <div className="flex-1 p-6 sm:p-8">
              {/* -----------Doc Info : name, degree, experience------------ */}
              <p className="flex items-center gap-2 mb-4 text-2xl sm:text-3xl font-medium text-gray-900">
                {docInfo.name}
                <img className="w-5 h-5" src={assets.verified_icon} alt="Verified" />
              </p>
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
                <p className="text-gray-600 text-base">
                  {docInfo.degree} - {docInfo.speciality}
                </p>
                <button className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium border border-gray-300 w-fit">
                  {docInfo.experience}
                </button>
              </div>
              
              {/* ---------Doctor Fees --------- */}
              <div className="mb-6">
                <p className="text-lg font-medium text-gray-900 mb-2">Appointment fee</p>
                <p className="text-2xl font-bold text-green-600">${docInfo.fees}</p>
              </div>

              {/* ---------About Doctor --------- */}
              <div className="mb-6">
                <p className="flex items-center gap-2 mb-3 text-lg font-medium text-gray-900">
                  About 
                  <img className="w-4 h-4" src={assets.info_icon} alt="Info" />
                </p>
                <p className="text-gray-600 leading-relaxed text-sm">
                  {docInfo.about}
                </p>
              </div>

              {/* ---------Doctor Address --------- */}
              <div className="mb-6">
                <p className="text-lg font-medium text-gray-900 mb-2">Address</p>
                <p className="text-gray-600 text-sm">
                  {docInfo.address.line1}
                </p>
                <p className="text-gray-600 text-sm">
                  {docInfo.address.line2}
                </p>
              </div>
            </div>
          </div>

          {/* ---------Booking Slots Section --------- */}
          <div className="mt-12 bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Book an Appointment</h3>
            
            {/* Booking Status Message */}
            {bookingMessage && (
              <div className={`mb-6 p-4 rounded-lg border ${
                bookingMessage.includes('successfully') 
                  ? 'bg-green-50 border-green-200 text-green-800' 
                  : bookingMessage.includes('already booked') || bookingMessage.includes('select')
                  ? 'bg-red-50 border-red-200 text-red-800'
                  : 'bg-yellow-50 border-yellow-200 text-yellow-800'
              }`}>
                <p className="font-medium">{bookingMessage}</p>
              </div>
            )}
            
            {/* Date Selection */}
            <div className="mb-8">
              <h4 className="text-lg font-medium text-gray-900 mb-4">Select Date</h4>
              <div className="grid grid-cols-4 sm:grid-cols-7 gap-3">
                {getNextSevenDays().map((dayInfo, index) => (
                  <button
                    key={index}
                    onClick={() => handleDateSelection(dayInfo)}
                    className={`p-2 sm:p-3 rounded-lg border-2 text-center text-xs sm:text-sm transition-all duration-200  ${
                      selectedDate?.date.toDateString() === dayInfo.date.toDateString()
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-200 hover:border-gray-300 text-gray-700'
                    }`}
                  >
                    <div className="text-sm font-medium">{dayInfo.day}</div>
                    <div className="text-lg font-bold">{dayInfo.dayNumber}</div>
                    <div className="text-xs text-gray-500">{dayInfo.month}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Time Selection */}
            <div className="mb-8">
              <h4 className="text-lg font-medium text-gray-900 mb-4">Select Time</h4>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3 sm:gap-3">
                {timeSlots.map((time, index) => {
                  const isBooked = selectedDate && isSlotBooked(selectedDate.date, time)
                  const isPast = selectedDate && isSlotInPast(selectedDate.date, time)
                  
                  return (
                    <button
                      key={index}
                      onClick={() => handleTimeSelection(time)}
                      disabled={isBooked || isPast}
                      className={`p-2 sm:p-3 rounded-lg border-2 text-center font-medium text-xs sm:text-sm transition-all duration-200 ${
                        isPast
                          ? 'border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed opacity-50'
                          : isBooked
                          ? 'border-red-200 bg-red-50 text-red-400 cursor-not-allowed opacity-60'
                          : selectedTime === time
                          ? 'border-blue-500 bg-blue-50 text-blue-700'
                          : 'border-gray-200 hover:border-gray-300 text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {time}
                      {isPast && (
                        <div className="text-xs text-gray-400 mt-1">Past</div>
                      )}
                      {isBooked && !isPast && (
                        <div className="text-xs text-red-500 mt-1">Booked</div>
                      )}
                    </button>
                  )
                })}
              </div>

            </div>

            {/* Book Appointment Button */}
            <div className="text-center">
              <button 
                onClick={bookAppointment}
                disabled={!selectedDate || !selectedTime}
                className="bg-primary text-white px-12 py-3 rounded-full font-medium hover:bg-primary/90 transition-colors duration-300 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Book an Appointment
              </button>
              {selectedDate && selectedTime && (
                <p className="mt-8 sm:mt-12 text-sm text-gray-600 p-4 sm:p-6 max-w-full sm:max-w-3xl mx-auto">
                  Selected: {selectedDate.day} {selectedDate.dayNumber} {selectedDate.month} at {selectedTime}
                </p>
              )}
            </div>
          </div>

          {/* ---------Related Doctors Section --------- */}
          <div className="mt-12">
            <br />
            <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">Related Doctors</h2> <br />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {doctors
                ?.filter(doc => doc.speciality === docInfo.speciality && doc._id !== docInfo._id)
                .slice(0, 6)
                .map(doctor => (
                  <div key={doctor._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                    <div className="relative w-full h-48.5 overflow-hidden">
                      <img
                        src={doctor.image}
                        alt={doctor.name}
                        className="w-full h-full sm:h-full object-center bg-blue-400"
                      />
                    </div>
                    <div className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{doctor.name}</h3>
                        <img className="w-4 h-4" src={assets.verified_icon} alt="Verified" />
                      </div>
                      <p className="text-gray-600 text-sm mb-2">{doctor.speciality}</p>
                      <p className="text-gray-500 text-sm mb-3">{doctor.experience} experience</p>
                      <div className="flex items-center justify-between">
                        <p className="text-lg font-bold text-green-600">${doctor.fees}</p>
                        <button 
                          onClick={() => window.location.href = `/appointment/${doctor._id}`}
                          className="bg-primary text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-primary/90 transition-colors duration-300"
                        >
                          Book Now
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
            
            {/* Show message if no related doctors */}
            {doctors?.filter(doc => doc.speciality === docInfo.speciality && doc._id !== docInfo._id).length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-500">No other doctors available in {docInfo.speciality} specialty.</p>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  )
}

export default Appointment
