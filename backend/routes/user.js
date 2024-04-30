const express = require('express')
const zod = require('zod')
const { User, Account } = require("../db")
const router = express.Router()
const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require("../config")
const  { authMiddleware } = require("../middleware");


const signupSchema = zod.object({                           // Creating the zod validation schema
    username: zod.string().email(),
    firstName: zod.string(),
    lastName: zod.string(),
    password: zod.string(),
    
})

router.get("/firstname", authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json({ firstName: user.firstName });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

router.get("/bulk", async (req, res) => {                   // Route to get users from the backend
    const filter = req.query.filter || "";

    const users = await User.find({
        $or: [{
            firstName: {
                "$regex": filter
            }
        }, {
            lastName: {
                "$regex": filter
            }
        }]
    })

    res.json({                                              // returns the desired user's details
        user: users.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })
})

router.post("/signup", async (req, res) => {
    const {success} = signupSchema.safeParse(req.body)          // validating inputs as per zod schema
    if(!success){
        return res.status(411).json({
            msg: "Email already taken / Incorrect inputs"       
        })
    }

    const existingUser = await User.findOne({               // checking for existing user
        username: req.body.username
    })

    if (existingUser) {
        return res.status(411).json({
            msg: "Email already taken / Incorrect inputs"
        })
    }

    const user = await User.create({                        // creating new user
        username: req.body.username,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName
    })

    const userId = user._id                                 // storing unique id in userId

    await Account.create({
        userId,
        balance: 1 + Math.random() * 10000
    })

    const token = jwt.sign({                                // creating JWT 
        userId
    }, JWT_SECRET)

    res.json({
        msg: "User created succesfully",
        token: token
    })
})

const signinBody = zod.object({
    username: zod.string().email(),
	password: zod.string()
})

router.post("/signin", async (req, res) => {
    const { success } = signinBody.safeParse(req.body)
    if (!success) {
        return res.status(411).json({
            message: "Email already taken / Incorrect inputs"
        })
    }

    const user = await User.findOne({
        username: req.body.username,
        password: req.body.password
    });

    if (user) {
        const token = jwt.sign({
            userId: user._id
        }, JWT_SECRET);
  
        res.json({
            token: token
        })
        return;
    }

    res.status(411).json({
        message: "Error while logging in"
    })
})


const updateBody = zod.object({
	password: zod.string().optional(),
    firstName: zod.string().optional(),
    lastName: zod.string().optional(),
})

router.put("/", authMiddleware, async (req, res) => {
    const { success } = updateBody.safeParse(req.body)
    if (!success) {
        res.status(411).json({
            message: "Error while updating information"
        })
    }

		await User.updateOne({ _id: req.userId }, req.body);
	
    res.json({
        message: "Updated successfully"
    })
})


module.exports = router