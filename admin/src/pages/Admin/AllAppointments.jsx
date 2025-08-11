// import React from 'react'
// import { useContext } from 'react'
// import { AdminContext } from '../../context/AdminContext'
// import { useEffect } from 'react'

// const AllAppointments = () => {
//   const {aToken,appointments,getAllAppointments}=useContext(AdminContext)
//   useEffect(()=>{
//     if(aToken){
//       getAllAppointments()
//     }
//   },[aToken])
//   return (
//     <div>
//       <p>All Appointments</p>
//       <div>
//         <div>
//           <p>#</p>
//           <p>Patient</p>
//           <p>Age</p>
//           <p>Date & Time</p>
//           <p>Doctor</p>
//           <p>Fees</p>
//           <p>Action</p>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default AllAppointments

import React from 'react'
import { useContext } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { useEffect, useState } from 'react'

const AllAppointments = () => {
  const { aToken, appointments, getAllAppointments } = useContext(AdminContext)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (aToken) {
      getAllAppointments()
      setLoading(false)
    }

    // Set up interval to refresh appointment status every minute
    const interval = setInterval(() => {
      if (appointments && appointments.length > 0) {
        // Force re-render to update timeout status dynamically
        setLoading(prev => !prev ? false : false) // Trigger re-render
      }
    }, 60000) // Check every minute

    return () => clearInterval(interval)
  }, [aToken, getAllAppointments, appointments])

  // Function to check if appointment is timed out
  const isAppointmentTimedOut = (appointment) => {
    if (appointment.cancelled || appointment.isCompleted) {
      return false // Already handled, not timed out
    }

    try {
      const slotDate = appointment.slotDate
      const appointmentTime = appointment.slotTime
      
      if (!slotDate || !appointmentTime) return false

      let appointmentDate

      // Handle different date formats
      if (typeof slotDate === 'string') {
        // Handle formats like "10_8_2025" or "10-8-2025" or "2025-08-10"
        if (slotDate.includes('_')) {
          const [day, month, year] = slotDate.split('_')
          appointmentDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(day))
        } else if (slotDate.includes('-')) {
          const parts = slotDate.split('-')
          if (parts[0].length === 4) {
            // YYYY-MM-DD format
            appointmentDate = new Date(slotDate)
          } else {
            // DD-MM-YYYY format
            const [day, month, year] = parts
            appointmentDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(day))
          }
        } else if (slotDate.includes('/')) {
          const parts = slotDate.split('/')
          if (parts[2].length === 4) {
            // DD/MM/YYYY or MM/DD/YYYY format
            const [first, second, year] = parts
            // Assume DD/MM/YYYY for international format
            appointmentDate = new Date(parseInt(year), parseInt(second) - 1, parseInt(first))
          }
        } else {
          appointmentDate = new Date(slotDate)
        }
      } else {
        appointmentDate = new Date(slotDate)
      }

      if (isNaN(appointmentDate.getTime())) {
        console.warn('Invalid appointment date:', slotDate)
        return false
      }

      // Parse time (assuming format like "10:30 AM" or "14:30")
      let hours, minutes
      
      if (appointmentTime.includes('AM') || appointmentTime.includes('PM')) {
        const isPM = appointmentTime.includes('PM')
        const timeStr = appointmentTime.replace(/AM|PM/g, '').trim()
        const [h, m] = timeStr.split(':')
        hours = parseInt(h)
        minutes = parseInt(m) || 0
        
        // Convert 12-hour to 24-hour format
        if (isPM && hours !== 12) {
          hours += 12
        } else if (!isPM && hours === 12) {
          hours = 0
        }
      } else {
        // 24-hour format
        const [h, m] = appointmentTime.split(':')
        hours = parseInt(h)
        minutes = parseInt(m) || 0
      }

      // Set the full appointment datetime
      appointmentDate.setHours(hours, minutes, 0, 0)
      
      const now = new Date()
      
      // Debug logging to check the logic
      console.log(`Checking appointment: ${slotDate} ${appointmentTime}`)
      console.log(`Parsed datetime: ${appointmentDate.toLocaleString()}`)
      console.log(`Current time: ${now.toLocaleString()}`)
      console.log(`Is past time: ${now.getTime() > appointmentDate.getTime()}`)
      
      // Consider appointment timed out if current time is past appointment time
      // No buffer needed - if the appointment time has passed, it's timed out
      return now.getTime() > appointmentDate.getTime()
      
    } catch (error) {
      console.error('Error checking timeout for appointment:', appointment._id, error)
      return false
    }
  }

  // Function to get appointment status
  const getAppointmentStatus = (appointment) => {
    if (appointment.cancelled) return 'cancelled'
    if (appointment.isCompleted) return 'completed'
    if (isAppointmentTimedOut(appointment)) return 'timedout'
    return 'scheduled'
  }

  // Function to cancel appointment - renamed to avoid conflict
  const handleCancelAppointment = async (appointmentId) => {
    try {
      const confirmCancel = window.confirm('Are you sure you want to cancel this appointment?')
      if (!confirmCancel) return

      setLoading(true)
      
      const response = await fetch('/api/admin/cancel-appointment', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${aToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ appointmentId })
      })

      const data = await response.json()

      if (data.success) {
        // Refresh appointments after cancellation
        await getAllAppointments()
        alert('Appointment cancelled successfully!')
      } else {
        alert(data.message || 'Failed to cancel appointment')
      }
      
      setLoading(false)
      
    } catch (error) {
      console.error('Error cancelling appointment:', error)
      setLoading(false)
      alert('Failed to cancel appointment. Please try again.')
    }
  }

  // Function to complete appointment
  const handleCompleteAppointment = async (appointmentId) => {
    try {
      const confirmComplete = window.confirm('Mark this appointment as completed?')
      if (!confirmComplete) return

      setLoading(true)
      
      const response = await fetch('/api/admin/complete-appointment', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${aToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ appointmentId })
      })

      const data = await response.json()

      if (data.success) {
        // Refresh appointments after completion
        await getAllAppointments()
        alert('Appointment marked as completed!')
      } else {
        alert(data.message || 'Failed to complete appointment')
      }
      
      setLoading(false)
      
    } catch (error) {
      console.error('Error completing appointment:', error)
      setLoading(false)
      alert('Failed to complete appointment. Please try again.')
    }
  }

  // Function to format date with comprehensive error handling
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A'
    
    let date = null
    
    try {
      // If it's already a Date object
      if (dateString instanceof Date) {
        date = dateString
      }
      // If it's a timestamp (number)
      else if (typeof dateString === 'number') {
        date = new Date(dateString)
      }
      // If it's a string
      else if (typeof dateString === 'string') {
        // Handle underscore format like "10_8_2025"
        if (dateString.includes('_')) {
          const [day, month, year] = dateString.split('_')
          date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day))
        }
        // Handle dash format
        else if (dateString.includes('-')) {
          const parts = dateString.split('-')
          if (parts[0].length === 4) {
            // YYYY-MM-DD format
            date = new Date(dateString)
          } else {
            // DD-MM-YYYY format
            const [day, month, year] = parts
            date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day))
          }
        }
        // Handle slash format
        else if (dateString.includes('/')) {
          const parts = dateString.split('/')
          if (parts[2] && parts[2].length === 4) {
            // DD/MM/YYYY format
            const [day, month, year] = parts
            date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day))
          } else if (parts[0] && parts[0].length === 4) {
            // YYYY/MM/DD format
            date = new Date(dateString.replace(/\//g, '-'))
          }
        }
        // Try standard JavaScript Date parsing
        else {
          date = new Date(dateString)
        }
      }
      
      // Final validation
      if (!date || isNaN(date.getTime())) {
        console.warn('Unable to parse date:', dateString)
        return dateString.toString() // Return original string if can't parse
      }
      
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      })
      
    } catch (error) {
      console.error('Error parsing date:', dateString, error)
      return dateString.toString() // Return original string on error
    }
  }

  // Function to calculate age
  const calculateAge = (dateOfBirth) => {
    if (!dateOfBirth) return 'N/A'
    const today = new Date()
    const birthDate = new Date(dateOfBirth)
    let age = today.getFullYear() - birthDate.getFullYear()
    const monthDiff = today.getMonth() - birthDate.getMonth()
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--
    }
    return age > 0 ? age : 'N/A'
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        <span className="ml-4 text-gray-600">Loading appointments...</span>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">All Appointments</h1>
        <p className="text-gray-600">Manage and view all patient appointments</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100 mr-4">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Total</p>
              <p className="text-2xl font-bold text-gray-900">{appointments?.length || 0}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100 mr-4">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Completed</p>
              <p className="text-2xl font-bold text-gray-900">
                {appointments?.filter(app => app.isCompleted).length || 0}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-yellow-100 mr-4">
              <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Pending</p>
              <p className="text-2xl font-bold text-gray-900">
                {appointments?.filter(app => !app.isCompleted && !app.cancelled && !isAppointmentTimedOut(app)).length || 0}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-red-100 mr-4">
              <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Cancelled</p>
              <p className="text-2xl font-bold text-gray-900">
                {appointments?.filter(app => app.cancelled).length || 0}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-orange-100 mr-4">
              <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Timed Out</p>
              <p className="text-2xl font-bold text-gray-900">
                {appointments?.filter(app => isAppointmentTimedOut(app)).length || 0}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Appointments Table */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
        <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Appointments List</h2>
        </div>

        {appointments && appointments.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    #
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Patient
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Age
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date & Time
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Doctor
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Fees
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {appointments.map((appointment, index) => {
                  const status = getAppointmentStatus(appointment)
                  
                  return (
                    <tr key={appointment._id || index} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {index + 1}
                      </td>
                      
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <img
                              className="h-10 w-10 rounded-full object-cover border border-gray-300"
                              src={appointment.userData?.image || '/default-avatar.png'}
                              alt={appointment.userData?.name || 'Patient'}
                              onError={(e) => {
                                e.target.src = '/default-avatar.png'
                              }}
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {appointment.userData?.name || 'N/A'}
                            </div>
                            <div className="text-sm text-gray-500">
                              {appointment.userData?.email || 'N/A'}
                            </div>
                          </div>
                        </div>
                      </td>
                      
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {calculateAge(appointment.userData?.dob)}
                      </td>
                      
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {appointment.slotDate ? formatDate(appointment.slotDate) : 'N/A'}
                        </div>
                        <div className="text-sm text-gray-500">
                          {appointment.slotTime || 'N/A'}
                        </div>
                      </td>
                      
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <img
                              className="h-10 w-10 rounded-full object-cover border border-gray-300"
                              src={appointment.docData?.image || '/default-doctor.png'}
                              alt={appointment.docData?.name || 'Doctor'}
                              onError={(e) => {
                                e.target.src = '/default-doctor.png'
                              }}
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {appointment.docData?.name || 'N/A'}
                            </div>
                            <div className="text-sm text-gray-500">
                              {appointment.docData?.speciality || 'N/A'}
                            </div>
                          </div>
                        </div>
                      </td>
                      
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">
                        ${appointment.amount || appointment.docData?.fees || 'N/A'}
                      </td>
                      
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          status === 'cancelled'
                            ? 'bg-red-100 text-red-800'
                            : status === 'completed'
                            ? 'bg-green-100 text-green-800'
                            : status === 'timedout'
                            ? 'bg-orange-100 text-orange-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {status === 'cancelled' 
                            ? 'Cancelled' 
                            : status === 'completed' 
                            ? 'Completed' 
                            : status === 'timedout'
                            ? 'Timed Out'
                            : 'Scheduled'}
                        </span>
                      </td>
                      
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          {status === 'scheduled' && (
                            <button 
                              onClick={() => handleCompleteAppointment(appointment._id)}
                              className="text-green-600 hover:text-green-900 transition-colors"
                              title="Mark as completed"
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                              </svg>
                            </button>
                          )}
                          
                          {(status === 'scheduled' || status === 'timedout') && (
                            <button 
                              onClick={() => handleCancelAppointment(appointment._id)}
                              className="text-red-600 hover:text-red-900 transition-colors"
                              title="Cancel appointment"
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                              </svg>
                            </button>
                          )}
                          
                          {(status === 'cancelled' || status === 'completed') && (
                            <span className="text-gray-400 text-sm">No actions</span>
                          )}
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-12">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No appointments</h3>
            <p className="mt-1 text-sm text-gray-500">No appointments have been scheduled yet.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default AllAppointments