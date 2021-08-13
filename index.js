const dotenv = require("dotenv").config()
const express = require("express")
const cors = require("cors")
const app = express()
const port = process.env.PORT || 9000
const User = require('./data.js')

app.use(cors())
app.use(express.json())


app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})

//MY ENDPOINTS ----------------------------------------------------

//GET USERS
app.get('/api/users', (req, res) => {
    User.find()
        .then(users => {
            console.log(users)
            res.status(200).json(users)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: "User info not recieved!" })
        })
})

//POST USERS
app.post('/api/register', (req, res) => {
    const newUser = req.body
    if (!newUser.username || !newUser.password) {
        res.status(400).json({ message: "Please provide a username and password" })
    } else {
        User.insert(newUser)
            .then(user => {
                console.log(user)
                res.status(201).json(user)
            })
            .catch(err => {
                res.status(500).json({ message: "There was an error while saving the user to the database" })
            })
    }
})

//USER LOGIN
app.post('/api/login', async (req, res) => {
    const loggingIn = req.body
    try {
        if (!loggingIn.username || !loggingIn.password) {
            res.status(400).json({ message: "Please provide your name and password" })
        } else {
            const login = User.login(loggingIn)
            if (!login) {
                res.status(404).json({ message: "This user does not exist" })
            } else {
                console.log('Login was succesful!')
                res.status(200).json(login)
            }
        }
    } catch (err) {
        res.status(500).json({ message: "The user information could not be modified" })
    }
})


console.log("It's alive")
console.log(process.env.USER)//USER - MAC
console.log(process.env.PORT)



//My API (At the Bottom)
app.use("/api/*", (_, res) => {
    res.json({ data: User.info() })
})


