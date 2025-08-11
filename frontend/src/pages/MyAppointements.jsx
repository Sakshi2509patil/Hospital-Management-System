import React, { useContext, useState, useEffect, useCallback } from 'react';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const MyAppointments = () => {
  const { backendUrl, token, getDoctorsData } = useContext(AppContext);

  const [appointments, setAppointments] = useState([])
  const [loading, setLoading] = useState(false)
  const [cancelingId, setCancelingId] = useState(null)
  const [removingId, setRemovingId] = useState(null)

  // Function to format the date from "day_month_year" format to readable format
  const formatDate = (slotDate) => {
    if (!slotDate) return 'Date not available'
    
    try {
      const dateParts = slotDate.split('_')
      if (dateParts.length === 3) {
        const day = parseInt(dateParts[0])
        const month = parseInt(dateParts[1]) - 1 // JavaScript months are 0-indexed
        const year = parseInt(dateParts[2])
        const date = new Date(year, month, day)
        
        return date.toLocaleDateString('en-US', { 
          weekday: 'short',
          year: 'numeric', 
          month: 'short', 
          day: 'numeric' 
        })
      }
    } catch (error) {
      console.error('Error formatting date:', error)
    }
    
    return slotDate // Return original if formatting fails
  }

  const getUserAppointments = useCallback(async () => {
    if (!token) return
    
    setLoading(true)
    try {
      // Fixed: Use GET request to match the backend route
      const { data } = await axios.get(backendUrl + "/api/admin/user/appointments", {
        headers: { token }
      })
      
      if (data.success) {
        setAppointments(data.appointments.reverse())
        console.log('User appointments:', data.appointments)
      } else {
        toast.error(data.message || 'Failed to fetch appointments')
      }

    } catch (error) {
      console.error('Error fetching appointments:', error)
      if (error.response) {
        console.error('Response data:', error.response.data)
        console.error('Response status:', error.response.status)
      }
      toast.error('Failed to load appointments')
    } finally {
      setLoading(false)
    }
  }, [backendUrl, token])

  // Function to cancel an appointment
  const cancelAppointment = async (appointmentId) => {
    if (!appointmentId) return
    
    setCancelingId(appointmentId)
    try {
      // Fixed: Use correct endpoint path
      const { data } = await axios.post(
        backendUrl + "/api/admin/user/cancel-appointment",
        { appointmentId },
        { headers: { token } }
      )

      if (data.success) {
        toast.success('Appointment cancelled successfully')
        // Update the appointment in the local state to show it as cancelled
        setAppointments(prev => 
          prev.map(appointment => 
            appointment._id === appointmentId 
              ? { ...appointment, cancelled: true }
              : appointment
          )
        )
        // Refresh doctors data to update available slots
        if (getDoctorsData) getDoctorsData()
      } else {
        toast.error(data.message || 'Failed to cancel appointment')
      }

    } catch (error) {
      console.error('Error cancelling appointment:', error)
      toast.error(error.response?.data?.message || 'Failed to cancel appointment')
    } finally {
      setCancelingId(null)
    }
  }

  // Function to remove appointment from the list
  const removeAppointment = async (appointmentId) => {
    if (!appointmentId) return
    
    setRemovingId(appointmentId)
    
    // Add a small delay for better UX
    setTimeout(() => {
      setAppointments(prev => prev.filter(appointment => appointment._id !== appointmentId))
      setRemovingId(null)
      toast.success('Appointment removed from list')
    }, 300)
  }

  // Function to handle online payment
  const handlePayOnline = (appointment) => {
    // You can integrate with payment gateways like Stripe, Razorpay, etc.
    toast.info('Payment integration coming soon!')
    console.log('Payment for appointment:', appointment)
  }

  useEffect(() => {
    if (token) {
      getUserAppointments()
    }
  }, [token, getUserAppointments])

  if (loading) {
    return (
      <div className="p-6">
        <p className="text-2xl font-bold mb-6">My Appointments</p>
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          <span className="ml-4 text-gray-600">Loading appointments...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6">
      <p className="text-2xl font-bold mb-6">My Appointments</p>
      
      {appointments.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg border border-gray-200">
          <div className="mb-4">
            <svg className="w-16 h-16 text-gray-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No appointments found</h3>
          <p className="text-gray-500 mb-4">You haven't booked any appointments yet.</p>
          <button 
            onClick={() => window.location.href = '/doctors'}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Book an Appointment
          </button>
        </div>
      ) : (
        <div className="grid gap-6">
          {appointments.map((item, index) => (
            <div
              key={item._id || index}
              className={`relative flex flex-col sm:flex-row items-start gap-6 border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-lg transition-all duration-300 ${
                removingId === item._id ? 'opacity-50 transform scale-95' : ''
              }`}
            >
              {/* Remove Cross Mark - Show for cancelled appointments */}
              {item.cancelled && (
                <button
                  onClick={() => removeAppointment(item._id)}
                  disabled={removingId === item._id}
                  className="absolute top-2 right-2 w-8 h-8 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed z-10"
                  title="Remove appointment from list"
                >
                  {removingId === item._id ? (
                    <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  ) : (
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                  )}
                </button>
              )}

              {/* Doctor Image */}
              <div className="w-28 h-28 flex-shrink-0">
                <img
                  src={item.docData?.image || item.image || '/default-doctor.png'}
                  alt={item.docData?.name || item.name || 'Doctor'}
                  className="w-full h-full object-cover rounded-full border border-gray-300"
                  onError={(e) => {
                    e.target.src = '/default-doctor.png' // Fallback image
                  }}
                />
              </div>

              {/* Doctor Details */}
              <div className="flex-1">
                <p className="text-lg font-semibold">
                  {item.docData?.name || item.name || 'Doctor Name'}
                </p>
                <p className="text-gray-500">
                  {item.docData?.speciality || item.speciality || 'Speciality'}
                </p>
                
                {/* Address */}
                <div className="mt-2">
                  <p className="text-sm font-medium">Address:</p>
                  <p className="text-gray-600">
                    {item.docData?.address?.line1 || item.address?.line1 || 'Address not available'}
                  </p>
                  {(item.docData?.address?.line2 || item.address?.line2) && (
                    <p className="text-gray-600">
                      {item.docData.address.line2 || item.address.line2}
                    </p>
                  )}
                </div>

                {/* Date & Time */}
                <div className="mt-3">
                  <p className="text-sm">
                    <span className="font-medium">Date & Time:</span>{' '}
                    <span className="text-blue-600 font-medium">
                      {formatDate(item.slotDate)} | {item.slotTime || 'Time not available'}
                    </span>
                  </p>
                </div>

                {/* Appointment Status */}
                <div className="mt-2">
                  <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                    item.cancelled 
                      ? 'bg-red-100 text-red-800' 
                      : item.isCompleted 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {item.cancelled ? 'Cancelled' : item.isCompleted ? 'Completed' : 'Scheduled'}
                  </span>
                </div>

                {/* Fees */}
                {(item.amount || item.docData?.fees) && (
                  <div className="mt-2">
                    <p className="text-sm">
                      <span className="font-medium">Fee:</span>{' '}
                      <span className="text-green-600 font-bold">
                        ${item.amount || item.docData.fees}
                      </span>
                    </p>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-3 w-full sm:w-auto">
                {!item.cancelled && !item.isCompleted && (
                  <>
                    {/* Pay Online Button */}
                    <button 
                      onClick={() => handlePayOnline(item)}
                      className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition font-medium"
                    >
                      Pay Online
                    </button>
                    
                    {/* Cancel Button */}
                    <button 
                      onClick={() => cancelAppointment(item._id)}
                      disabled={cancelingId === item._id}
                      className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500 transition font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {cancelingId === item._id ? (
                        <span className="flex items-center">
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Cancelling...
                        </span>
                      ) : (
                        'Cancel Appointment'
                      )}
                    </button>
                  </>
                )}

                {/* Show different buttons for completed/cancelled appointments */}
                {item.isCompleted && (
                  <button 
                    className="bg-green-100 text-green-800 px-4 py-2 rounded-lg font-medium cursor-default"
                    disabled
                  >
                    Completed
                  </button>
                )}

                {item.cancelled && (
                  <div className="flex flex-col gap-2">
                    <button 
                      className="bg-red-100 text-red-800 px-4 py-2 rounded-lg font-medium cursor-default"
                      disabled
                    >
                      Cancelled
                    </button>
                    <p className="text-xs text-gray-500 text-center">
                      Click ✕ to remove
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyAppointments;
