import validator from 'validator'
import bcrypt, { hash } from 'bcrypt'
import {v2 as cloudinary} from 'cloudinary'
import doctorModel from '../models/doctorModel.js'
import jwt from 'jsonwebtoken'
import appointmentModel from '../models/appointmentModel.js'

//API for adding doctors
const addDoctor = async (req, res) => {
  try {
    const { name, email, password, speciality, degree, experience, about, fees, address } = req.body;
    const imageFile = req.file;

    // check if image is uploaded
    if (!imageFile) {
      return res.status(400).json({
        success: false,
        message: "Image file is missing"
      });
    }

    // checking for all data to add doctor
    if (!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address) {
      return res.json({ success: false, message: "Missing Details" });
    }

    // validating email format
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Please enter a valid email" });
    }

    // validating strong password
    if (password.length < 8) {
      return res.json({ success: false, message: "Please enter a strong password" });
    }

    // hashing doctor password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // upload image to cloudinary
    const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" });
    const imageUrl = imageUpload.secure_url;

    const doctorData = {
      name,
      email,
      image: imageUrl,
      password: hashedPassword,
      speciality,
      degree,
      experience,
      about,
      fees,
      address: JSON.parse(address),
      date: Date.now()
    };

    const newDoctor = new doctorModel(doctorData);
    await newDoctor.save();

    res.json({ success: true, message: "Doctor Added" });

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
// API for admin login
const loginAdmin=async(req,res)=>{
    try{
        
        const {email,password}=req.body
        if(email=== process.env.ADMIN_EMAIL && password===process.env.ADMIN_PASSWORD){
           const token=jwt.sign(email+password,process.env.JWT_SECRET)
           res.json({success:true,token})
        } else{
            res.json({success:false,message:"Invalid Credentials"})
        }
    } catch(error){
        console.log(error)
        req.json({success:false, message:error.message})
    }
}

// API to get all doctors list for admin panel
const allDoctors=async(req,res)=>{
  try{
    const doctors=await doctorModel.find({

    }).select('-password')
    res.json({success:true,doctors})

  } catch(error){
    console.log(error)
    res.json({success:false, message:error.message})
  }
}

//API to get all apoointments list
const appointmentsAdmin = async (req, res) => {
  try {
    const appointments = await appointmentModel.find({})
    res.json({ success: true, appointments })

  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}

//API for cancel appointment 
const appointmentCancel = async (req, res) => {
    try {
        const { appointmentId } = req.body; // Fixed: Get appointmentId from req.body
        
        if (!userId || !appointmentId) {
            return res.json({ success: false, message: "User ID and Appointment ID are required" });
        }

        const appointmentData = await appointmentModel.findById(appointmentId);
        
        if (!appointmentData) {
            return res.json({ success: false, message: "Appointment not found" });
        }

        // Removing doctor slot
        const { docId, slotDate, slotTime } = appointmentData;

        const doctorData = await doctorModel.findById(docId);
        let slots_booked = doctorData.slots_booked;

        slots_booked[slotDate] = slots_booked[slotDate].filter(e => e !== slotTime);
        await doctorModel.findByIdAndUpdate(docId, { slots_booked });

        res.json({ success: true, message: "Appointment Cancelled" });
    } catch (error) {
        console.log('Cancel Appointment Error:', error);
        res.json({ success: false, message: error.message });
    }
}

//API to complete Appointment
const appointmentComplete = async (req, res) => {
    try {
        const { appointmentId } = req.body;
                
        if (!appointmentId) {
            return res.json({ success: false, message: "Appointment ID is required" });
        }

        const appointmentData = await appointmentModel.findById(appointmentId);
                
        if (!appointmentData) {
            return res.json({ success: false, message: "Appointment not found" });
        }

        // Update appointment to completed status
        await appointmentModel.findByIdAndUpdate(appointmentId, { isCompleted: true });

        res.json({ success: true, message: "Appointment Completed" });
    } catch (error) {
        console.log('Complete Appointment Error:', error);
        res.json({ success: false, message: error.message });
    }
}

export { addDoctor,loginAdmin , allDoctors,appointmentsAdmin,appointmentCancel,appointmentComplete}


//API for adding doctors
// const addDoctor=async(req,res)=>{
//     try{
//          const { name, email, password, speciality, degree, experience, about, fees, address }=req.body
//          const imageFile=req.file
//         //  console.log({ name, email, password, speciality, degree, experience, about, fees, address },imageFile);
//         //checking for all data to add doctor
//         if(!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address){
//             return res.json({success:false,message:"Missing Details"})
//         }
//         //validating email format
//         if(!validator.isEmail(email)){
//             return res.json({success:false,message:"Please enter a valid email"})
//         }
//         // validating strong password
//         if(password.length<8){
//             return res.json({success:false,message:"Please enter a strong password"})
//         }

//         //hashing doctor password
//         const salt=await bcrypt.genSalt(10)
//         const hashedPassword=await bcrypt.hash(password,salt)

//         //upload image to cloudinary
//          const imageUpload=await cloudinary.uploader.upload(imageFile.path,{resource_type:"image"})
//          const imageUrl=imageUpload.secure_url

//          const doctorData={
//             name,
//             email,
//             image:imageUrl,
//             password:hashedPassword,
//             speciality,
//             degree,
//             experience,
//             about,
//             fees,
//             address:JSON.parse(address),
//             date:Date.now()
//          }

//          const newDoctor=new doctorModel(doctorData)
//          await newDoctor.save()

//          res.json({success:true, message:"Doctor Added"})

//     } catch(error){
//        console.log(error)
//        res.json({success:false,message:error.message})
//     }
// }

// export {addDoctor}