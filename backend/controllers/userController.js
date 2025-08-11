// import bcrypt from 'bcrypt'
// import validator from 'validator'
// import userModel from '../models/userModel.js'
// import jwt from 'jsonwebtoken'

// // API to register user

// const registerUser =async(req,res)=>{
//     try{
//         const {name,email,password}=req.body
//         if(!name || !email ||!password){
//             return res.json({success:false,message:"Missing Details"})
//         }
//         //validating email format
//        if(!validator.isEmail(email)){
//         return res.json({success:false,message:"Enter a valid email"})
//        }
//        //validating strong password
//        if(password.length<8){
//         return res.json({success:false,message:"Enter a Strong Password"})
//        }
   
//        // hashing user password
//        const salt=await bcrypt.genSalt(10)
//        const hashedPassword=await bcrypt.hash(password,salt)

//        const userData={
//         name,
//         email,
//         password:hashedPassword
//        }

//        const newUser=new userModel(userData)
//        const user=await newUser.save()
//        const token=jwt.sign({id:user._id},process.env.JWT_SECRET)
//        res.json({success:true,token})
       
//     } catch(error){
//           console.log(error)
//        res.json({success:false, message:error.message})
//     }
// }

// export {registerUser}


import bcrypt from 'bcrypt'
import validator from 'validator'
import userModel from '../models/userModel.js'
import jwt from 'jsonwebtoken'
import { json } from 'express'
import { v2 as cloudinary } from 'cloudinary'
import doctorModel from '../models/doctorModel.js'
import appointmentModel from '../models/appointmentModel.js'

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.json({ success: false, message: "Missing Details" })
        }

        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Enter a valid email" })
        }

        if (password.length < 8) {
            return res.json({ success: false, message: "Enter a Strong Password" })
        }

        const existingUser = await userModel.findOne({ email })
        if (existingUser) {
            return res.json({ success: false, message: "Email already registered" })
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const userData = {
            name,
            email,
            password: hashedPassword
        }

        const newUser = new userModel(userData)
        const user = await newUser.save()

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
        res.json({ success: true, token })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

//API for  user login
const loginUser=async(req,res)=>{
    try{
        const {email,password}=req.body;
        const user=await userModel.findOne({email})

        if(!user){
           return res.json({ success: false, message: "User does not exists" })
        }
       
        const isMatch= await bcrypt.compare(password,user.password)

        if(isMatch){
            const token=jwt.sign({id:user._id},process.env.JWT_SECRET)
            res.json({success:true,token})
        } else{
            res.json({success:false,message:"Invalid Credentials"})
        }

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

//API to get user profile data
const getProfile = async (req, res) => {
    try {
        // ✅ Correct - req.userId is already the user ID (no destructuring needed)
        const userId = req.userId;
        
        console.log('User ID from auth:', userId); // Debug log
        
        if (!userId) {
            return res.json({ success: false, message: "User not authenticated" });
        }
        
        const userData = await userModel.findById(userId).select('-password');
        
        if (!userData) {
            return res.json({ success: false, message: "User not found" });
        }
        
        res.json({ success: true, userData });
        
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

//API to update user profile

//API to update user profile
const updateProfile = async (req, res) => {
    try {
        const userId = req.userId; // Get userId from auth middleware
        const { name, phone, address, dob, gender } = req.body;
        const imageFile = req.file;
        
        console.log('Update Profile Debug:');
        console.log('User ID from auth:', userId);
        console.log('Request body:', req.body);
        console.log('Image file:', !!imageFile);
        
        if (!name || !phone || !dob || !gender) {
            return res.json({ success: false, message: "Data Missing" });
        }
        
        // Prepare update data
        const updateData = { name, phone, dob, gender };
        
        // Handle address parsing with error handling
        if (address) {
            try {
                // If address is a string, try to parse it as JSON
                if (typeof address === 'string') {
                    updateData.address = JSON.parse(address);
                } else {
                    // If address is already an object, use it directly
                    updateData.address = address;
                }
            } catch (parseError) {
                console.log('Address parsing error:', parseError.message);
                // If parsing fails, treat as a simple string and convert to object
                updateData.address = { line1: address, line2: '' };
            }
        }
        
        console.log('Update data before image:', updateData);
        
        // Handle image upload FIRST if present
        if (imageFile) {
            try {
                console.log('Uploading image to cloudinary...');
                const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
                    resource_type: 'image',
                    folder: 'user_profiles', // Optional: organize uploads
                    transformation: [
                        { width: 500, height: 500, crop: 'fill' }, // Resize to 500x500
                        { quality: 'auto' } // Optimize quality
                    ]
                });
                updateData.image = imageUpload.secure_url; // Add image to update data
                console.log('Image uploaded successfully:', imageUpload.secure_url);
            } catch (imageError) {
                console.log('Image upload error:', imageError.message);
                return res.json({ success: false, message: "Image upload failed. Please try again." });
            }
        }
        
        console.log('Final update data:', updateData);
        
        // Update user profile with ALL data including image in ONE operation
        const updatedUser = await userModel.findByIdAndUpdate(
            userId, 
            updateData,
            { 
                new: true, // Return updated document
                runValidators: true // Run schema validations
            }
        ).select('-password');
        
        if (!updatedUser) {
            return res.json({ success: false, message: "User not found" });
        }
        
        console.log('✅ User updated successfully:', {
            id: updatedUser._id,
            name: updatedUser.name,
            hasImage: !!updatedUser.image
        });
        
        // Return the updated user data
        res.json({ 
            success: true, 
            message: "Profile Updated Successfully",
            userData: updatedUser // Include updated user data in response
        });
        
    } catch (error) {
        console.log('❌ Update Profile Error:', error);
        res.json({ success: false, message: error.message });
    }
}
// const updateProfile = async (req, res) => {
//     try {
//         // ✅ Get userId from auth middleware, not from req.body
//         const userId = req.userId;
//         const { name, phone, address, dob, gender } = req.body;
//         const imageFile = req.file;
        
//         console.log('Update Profile Debug:');
//         console.log('User ID from auth:', userId);
//         console.log('Request body:', req.body);
//         console.log('Image file:', !!imageFile);
        
//         if (!name || !phone || !dob || !gender) {
//             return res.json({ success: false, message: "Data Missing" });
//         }
        
//         // Prepare update data
//         const updateData = { name, phone, dob, gender };
        
//         // Handle address parsing with error handling
//         if (address) {
//             try {
//                 // ✅ Fixed: JSON.parse (capital J)
//                 updateData.address = JSON.parse(address);
//             } catch (parseError) {
//                 console.log('Address parsing error:', parseError.message);
//                 // If address is already an object or simple string, use as is
//                 updateData.address = address;
//             }
//         }
        
//         console.log('Update data:', updateData);
        
//         // Update user profile
//         const updatedUser = await userModel.findByIdAndUpdate(
//             userId, 
//             updateData,
//             { new: true } // Return updated document
//         ).select('-password');
        
//         console.log('User updated in DB:', !!updatedUser);
        
//         // Handle image upload
//         if (imageFile) {
//             try {
//                 console.log('Uploading image to cloudinary...');
//                 const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
//                     resource_type: 'image'
//                 });
//                 const imageUrl = imageUpload.secure_url;
                
//                 await userModel.findByIdAndUpdate(userId, { image: imageUrl });
//                 console.log('Image uploaded:', imageUrl);
//             } catch (imageError) {
//                 console.log('Image upload error:', imageError.message);
//                 // Continue even if image upload fails
//             }
//         }

//         res.json({ success: true, message: "Profile Updated" });
        
//     } catch (error) {
//         console.log('Update Profile Error:', error);
//         res.json({ success: false, message: error.message });
//     }
// }

// API to book appointment
// const bookAppointment=async(req,res)=>{
//     try{

//         const [userId,docId,slotDate,slotTime]=req.body
//         const docData=await doctorModel.findById(docId).select('-password')
//         if(!docData.available){
//             return res.json({success:false,message:"Doctor not available"})
//         }

//         let slots_booked=docData.slots_booked
//         //Checking for slots availability
//         if(slots_booked[slotDate]){
//             if(slots_booked[slotDate].includes(slotTime)){
//                 return res.json({success:false,message:"Slot not available"})
//             } else{
//                 slots_booked[slotDate].push(slotTime)
//             }
//         } else{
//            slots_booked[slotDate]=[]
//            slots_booked[slotDate].push(slotTime)
//         }

//         const userData=await userModel.findById(userId).select('-password')

//         delete docData.slots_booked
//         const appointmentData={
//             userId,
//             docId,
//             userData,
//             docData,
//             amount:docData.fees,
//             slotTime,
//             slotDate,
//             date:Date.now()
//         }
//         const newAppointment=new appointmentModel(appointmentData)
//         await newAppointment.save()
        
//         // save new slots data in docData
//         await doctorModel.findByIdAndUpdate(docId,{slots_booked})
//         res.json({success:true,message:"Appointment Booked"})
//     }
//     catch (error) {
//         console.log('Update Profile Error:', error);
//         res.json({ success: false, message: error.message });
//     }

    
// }

const bookAppointment = async (req, res) => {
    try {
        // ✅ Fix: Get userId from auth middleware and destructure req.body properly
        const userId = req.userId;  // From authUser middleware
        const { docId, slotDate, slotTime } = req.body;  // Object destructuring
        
        const docData = await doctorModel.findById(docId).select('-password')
        
        if (!docData.available) {
            return res.json({ success: false, message: "Doctor not available" })
        }

        let slots_booked = docData.slots_booked
        
        // Checking for slots availability
        if (slots_booked[slotDate]) {
            if (slots_booked[slotDate].includes(slotTime)) {
                return res.json({ success: false, message: "Slot not available" })
            } else {
                slots_booked[slotDate].push(slotTime)
            }
        } else {
            slots_booked[slotDate] = []
            slots_booked[slotDate].push(slotTime)
        }

        const userData = await userModel.findById(userId).select('-password')

        delete docData.slots_booked
        const appointmentData = {
            userId,
            docId,
            userData,
            docData,
            amount: docData.fees,
            slotTime,
            slotDate,
            date: Date.now()
        }
        
        const newAppointment = new appointmentModel(appointmentData)
        await newAppointment.save()
        
        // Save new slots data in docData
        await doctorModel.findByIdAndUpdate(docId, { slots_booked })
        res.json({ success: true, message: "Appointment Booked" })
        
    } catch (error) {
        console.log('Book Appointment Error:', error);
        res.json({ success: false, message: error.message });
    }
}

//API to get user appointments for fronend my-appointment page
const listAppointment=async(req,res)=>{
    try{
        const userId=req.userId;
        const appointments=await appointmentModel.find({userId})
        res.json({success:true,appointments})

    } catch(error){
        console.log('Book Appointment Error:', error);
        res.json({ success: false, message: error.message });
    }
}

//API to cancel appointment

// const cancelAppointment=async(req,res)=>{
//     try{
//         const {userId,appointmentId}=req.body;
//         const appointmentData=await appointmentModel.findById(appointmentId)

//         //verify appointment user
//         if(appointmentData.userId !==userId){
//             return res.json({success:false,message:"Unauthorized action"})
//         } 
//         await appointmentModel.findByIdAndUpdate(appointmentId,{cancelled:true})

//         //Removing doctor slot
//         const {docId,slotDate,slotTime}=appointmentData

//         const doctorData=await doctorModel.findById(docId)
//         let slots_booked=doctorData.slots_booked

//         slots_booked[slotDate]=slots_booked[slotDate].filter(e=>e!=slotTime)
//         await doctorModel.findByIdAndUpdate(docId,{slots_booked})
//         res.json({success:true,message:"Appointement Cancelled"})

//     } catch(error){
//         console.log('Book Appointment Error:', error);
//         res.json({ success: false, message: error.message });
//     }
// }


const cancelAppointment = async (req, res) => {
    try {
        const userId= req.userId; // Fixed: Get userId from req.body
        const { appointmentId } = req.body; // Fixed: Get appointmentId from req.body
        
        if (!userId || !appointmentId) {
            return res.json({ success: false, message: "User ID and Appointment ID are required" });
        }

        const appointmentData = await appointmentModel.findById(appointmentId);
        
        if (!appointmentData) {
            return res.json({ success: false, message: "Appointment not found" });
        }

        // Verify appointment user
        if (appointmentData.userId !== userId) {
            return res.json({ success: false, message: "Unauthorized action" });
        }

        await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true });

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
export { registerUser , loginUser, getProfile,updateProfile,bookAppointment,listAppointment,cancelAppointment}


//API to update user profile
// const updateProfile=async(req,res)=>{
//     try{
//         const {userId,name,phone,address,dob,gender}=req.body
//         const imageFile=req.file
        
//         if(!name || !phone || !dob || !gender){
//             return res.json({success:false,message:"Data Missing"})
//         } 
//         await userModel.findByIdAndUpdate(userId,{name,phone,address:JSON.parse(address),dob,gender})

//         if(imageFile){
//             //upload image to cloudinary
//             const imageUpload=await cloudinary.uploader.upload(imageFile.path,{resource_type:'image'})
//             const imageUrl=imageUpload.secure_url
//             await userModel.findByIdAndUpdate(userId,{image:imageUrl})
//         }

//         res.json({success:true,message:"Profile Updated"})
//     } catch (error) {
//         console.log(error);
//         res.json({ success: false, message: error.message });
//     }
// }
