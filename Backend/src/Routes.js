import express from "express";
const router = express.Router();
import User from "./user.model.js";
import authenticateUser from "./auth.middleware.js";
import nodemailer from "nodemailer";
import Slot from "./dates.model.js";
import Meeting from "./meeting.model.js";
import Blog from "./Blog.model.js";

// GET Requests

router.get("/", (req,res) => {
    res.status(200).send("Hello World");
    console.log("Hello World");
});

// Add user route

router.post("/addUser", async (req,res) => {
    try {
        const {email, password} = req.body;

        // Checking if inputs are empty

        if(!email || !password) {
            res.status(400).json({error: "Email and Password are required"});
        }

        // Checking if users already exists

        const findUser = await User.findOne({email});

        if(findUser) {
            res.status(400).json({error: "User already exists, please login"});
            console.log("User already exists, please login");
            return;
        }

        // Creating a new user

        const hashedPassword = await User.hashPassword(password);

        const userRole = email === process.env.ADMIN_NAME && password === process.env.ADMIN_PASS ? "admin" : "user";

        const user = new User({email, password: hashedPassword, role: userRole});
        await user.save();

        const token = await user.generateJWT();
        res.cookie("authToken", token, { httpOnly: true, secure: true, sameSite: "strict" });

        res.status(200).json({message: "User created successfully", user, token});
    } catch (error) {
        console.error("Error saving user:", error);
        res.status(500).json({ error: "Internal server error", details: error.message });
    }
});

router.post("/login", async (req,res) => {
    try {
        const {email, password} = req.body;

        if(!email || !password) {
            res.status(400).json({error: "Email and Password are required"});
        }

        const findUser = await User.findOne({email});

        if(!findUser) {
            res.status(400).json({message: "User not found, please sign in"});
            return;
        }

        const checkPassword = await findUser.checkPassword(password);

        if(!checkPassword) {
            res.status(400).json({message: "Incorrect Password"});
            return;
        }

        const token = await findUser.generateJWT();
        res.cookie("authToken", token, { httpOnly: true, secure: true, sameSite: "strict" });

        if(findUser.role === "admin") {
            return res.status(200).json({message: "Welcome Admin", findUser});
        }
        else {
            return res.status(200).json({message: "Welcome User", findUser});
        }
    } catch (error) {
        console.log("Error logging in", error);
        res.status(400).json({error: "Error logging in"});
    }
});

router.post("/take-a-test", authenticateUser, async (req,res) => {
    try {
        return res.status(200).json({message: "Welcome User, let's take a test !"});   
    } catch (error) {
        return res.status(400).json({error: "Error occured"}); 
    }
});

router.get("/auth/check", authenticateUser, (req,res) => {
    return res.status(200).json({user: req.user});
});

router.post("/auth/logout", (req,res) => {
    try {
        res.clearCookie("authToken", {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
        });
        console.log("User logged out successfully.");
        return res.status(200).json({ message: "Logged out successfully." });
    } catch (error) {
        return res.status(400).json({ error: "Logout failed." });
    }
});

router.post('/send-email', async (req,res) => {
    const {from, subject, name, category, timeSlot, date} = req.body;

    try {
        const transporter = nodemailer.createTransport({
        service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            from,
            to: process.env.EMAIL_TO,
            subject: `Meeting Request from ${name}`,
            html: `
              <h2>Meeting Invitation</h2>
              <p>You have a new meeting request from <strong>${name}</strong>.</p>
              <p><b>Category:</b> ${category}</p>
              <p><b>Time Slot:</b> ${timeSlot}</p>
              <p><b>Date:</b> ${date}</p>
              <p>Please confirm your availability:</p>
            `,
          };

        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent:', info.response);
        res.status(200).json({ message: 'Email sent successfully!' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ error: 'Failed to send email' });
    }
});

router.post("/check-dates", async (req,res) => {
    const {date, timeSlot} = req.body;

    try {
        if(!date || !timeSlot) {
            return res.status(400).json({error: "Please enter a date"});
        }
    
        const findDate = await Meeting.find({date: date, timeSlot: timeSlot});

        if(findDate.length === 0) {
            return res.status(200).json({message: "Slot available"});
        }
        
        return res.status(200).json({message: "Booked"});
    } catch (error) {
        console.log("Error looking for a slot in database", error);
        return res.status(400).json({error: "Error looking for a slot in database"});
    }
});

router.post("/add-meeting", async (req,res) => {
    const {email, category, timeSlot, date} = req.body;

    try {
        if(!email || !category || !timeSlot || !date) {
            return res.status(400).json({error: "Please fill all the data"});
        }

        const checkClash = await Meeting.find({date: date, timeSlot: timeSlot});
        if(checkClash.length > 0) {
            return res.status(400).json({message: "Slot not available"});
        }
    
        const meeting = new Meeting({email: email, category: category, timeSlot: timeSlot, date: date});
        await meeting.save();

        return res.status(200).json({message: "Meeting saved successfully", meeting});
    } catch (error) {
        return res.status(400).json({error: "Error saving meeting data"});
    }
});

router.post("/get-schedule", async (req,res) => {
    const {email, status, role} = req.body;
    try {
        if(role === "admin") {
            const meetings = await Meeting.find({}).sort({date: 1});
            return res.status(200).json({message: "Meeting fetched successfully", meetings});
        }
        else {
            const meetings = await Meeting.find({email, status}).sort({date: 1});
            return res.status(200).json({message: "Meeting fetched successfully", meetings});
        }
    } catch (error) {
        return res.status(400).json({error: "Error fetching meeting from the database"});
    }
});

router.post("/update-status", async (req, res) => {
    const { email, status, date, time } = req.body;
  
    console.log("Incoming:", { email, date, time });
  
    try {
      const dbMeetings = await Meeting.find({ email });
      console.log("Meetings for email:", dbMeetings);
  
      const meeting = await Meeting.findOneAndUpdate(
        { email, date: new Date(date), timeSlot: time },
        { status },
        { new: true }
      );
  
      if (!meeting) {
        return res.status(400).json({ error: "Meeting not found" });
      }
  
      return res.status(200).json({ message: "Status updated successfully", meeting });
    } catch (error) {
      return res.status(400).json({ error: "Error updating status", details: error });
    }
  });  

router.post("/add-blogs", async(req,res) => {
    const {author, date, title, description, content} = req.body;

    try {
        if(!author || !date || !title || !description || !content) {
            return res.status(400).json({error: "Please enter all details"});
        }
    
        const findBlog = await Blog.findOne({title});
        if(findBlog) {
            return res.status(400).json({message: "Blog already available"});
        }
    
        const newBlog = new Blog({author: author, date: date, title: title, description: description, content: content});
        await newBlog.save();
    
        return res.status(200).json({message: "Blog added successfully", newBlog});       
    } catch (error) {
        return res.status(200).json({error: "Error adding blog", error});
    }
});

router.get("/get-blogs", async (req,res) => {
    try {
        const blogs = await Blog.find({});
        return res.status(200).json({message: "Blogs fetched successfully", blogs});   
    } catch (error) {
        return res.status(400).json({error: "Error sending blogs", error});  
    }
});

router.get("/blog/:blogName", async (req,res) => {
    let { blogName } = req.params;
    blogName = blogName.replace(/}/g, "");

    try {
        const blog = await Blog.findOne({title: blogName});
        if(!blog) {
            return res.status(400).json({message: "Blog not found"});
        }
        return res.status(200).json({message: "Blog fetched successfully", blog});
    } catch (error) {
        return res.status(400).json({error: "Error fetching blog", error});
    }
});

export default router;