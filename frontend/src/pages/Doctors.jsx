import React, { useContext, useEffect, useState, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

// Mapping for different possible spellings in database (moved outside component)
const specialityMapping = {
  'General physician': ['general physician', 'general practitioner', 'gp', 'family medicine'],
  'Pediatricians': ['pediatricians', 'paediatricians', 'pediatrician', 'paediatrician','Pedistricians'],
  'Gastroenterologist': ['gastroenterologist', 'gastro'],
  'Gynecologist': ['gynecologist', 'gynaecologist'],
  'Dermatologist': ['dermatologist', 'skin specialist'],
  'Neurologist': ['neurologist']
}

const Doctors = () => {

  const {speciality} = useParams()
  const navigate = useNavigate()
  const [filterDoc, setFilterDoc] = useState([])
  const [showFilter, setShowFilter]=useState(false)
  const {doctors} = useContext(AppContext)

  const applyFilter = useCallback(() => {
    if(doctors && doctors.length > 0) {
      if(speciality){
        const possibleValues = specialityMapping[speciality] || [speciality]
        setFilterDoc(doctors.filter(doc => 
          possibleValues.some(value => 
            doc.speciality?.toLowerCase() === value.toLowerCase()
          )
        ))
      } else{
        setFilterDoc(doctors)
      }
    }
  }, [doctors, speciality])

  useEffect(() => {
    applyFilter()
  }, [applyFilter])

  // Debug: Log the data to console
  useEffect(() => {
    console.log('All doctors:', doctors)
    console.log('Current speciality param:', speciality)
    console.log('Filtered doctors:', filterDoc)
    
    // Log all unique specialities in your database
    if (doctors && doctors.length > 0) {
      const specialities = [...new Set(doctors.map(doc => doc.speciality))]
      console.log('Available specialities in database:', specialities)
    }
  }, [doctors, speciality, filterDoc])

  return (
    <div className="container mx-auto px-4 py-8">
      <p className="text-2xl font-semibold text-gray-800 mb-8">Browse Through the doctors specialist.</p>
      

      
      <div className="flex flex-col sm:flex-row items-start gap-5 mt-5">
        <button className={`py-1 px-3 border rounded text-sm transition-all sm:hidden ${showFilter ? 'bg-blue-500 text-white' : ''}`} onClick={() => setShowFilter(prev => !prev)}>Filters</button>

        {/* Filter Section */}
        <div className={`flex-col gap-4 text-sm pt-5 w-full sm:w-1/4 ${ showFilter ? 'flex' : 'hidden sm:flex'}`}>
          <p 
            onClick={() => speciality === 'General physician' ? navigate('/doctors') : navigate('/doctors/General physician')}
            className={`w-full sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === 'General physician' ? 'bg-indigo-100 text-black' : ''}`}
          >
            General Physician
          </p>
          <p 
            onClick={() => speciality === 'Gynecologist' ? navigate('/doctors') : navigate('/doctors/Gynecologist')}
            className={`w-full sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === 'Gynecologist' ? 'bg-indigo-100 text-black' : ''}`}
          >
            Gynecologist
          </p>
          <p 
            onClick={() => speciality === 'Dermatologist' ? navigate('/doctors') : navigate('/doctors/Dermatologist')}
            className={`w-full sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === 'Dermatologist' ? 'bg-indigo-100 text-black' : ''}`}
          >
            Dermatologist
          </p>
          <p 
            onClick={() => speciality === 'Pediatricians' ? navigate('/doctors') : navigate('/doctors/Pediatricians')}
            className={`w-full sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === 'Pediatricians' ? 'bg-indigo-100 text-black' : ''}`}
          >
            Pediatricians
          </p>
          <p 
            onClick={() => speciality === 'Neurologist' ? navigate('/doctors') : navigate('/doctors/Neurologist')}
            className={`w-full sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === 'Neurologist' ? 'bg-indigo-100 text-black' : ''}`}
          >
            Neurologist
          </p>
          <p 
            onClick={() => speciality === 'Gastroenterologist' ? navigate('/doctors') : navigate('/doctors/Gastroenterologist')}
            className={`w-full sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === 'Gastroenterologist' ? 'bg-indigo-100 text-black' : ''}`}
          >
            Gastroenterologist
          </p>
        </div>

        {/* Doctors Grid */}
        <div className="w-full sm:w-3/4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
          {
            filterDoc && filterDoc.length > 0 ? filterDoc.map((item, index) => (
              <div 
                key={index}
                onClick={() => navigate(`/appointment/${item._id}`)}
                className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500"
              >
                <img 
                  className="bg-blue-50 w-full h-50 object-cover" 
                  src={item.image} 
                  alt={`Dr. ${item.name}`} 
                />
                <div className="p-4">
                  <div className="flex items-center gap-2 text-sm text-center text-green-500">
                    <p className="w-2 h-2 bg-green-500 rounded-full"></p>
                    <p>Available</p>
                  </div>
                  <p className="text-gray-900 text-lg font-medium mt-2">{item.name}</p>
                  <p className="text-gray-600 text-sm">{item.speciality}</p>
                </div>
              </div>
            )) : (
              <div className="col-span-full text-center py-8">
                <p className="text-gray-500">No doctors found for {speciality || 'this filter'}</p>
              </div>
            )
          }
        </div>
      </div>
    </div>
  )
}

export default Doctors
