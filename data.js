const info = () => ([
    {
        username: 'SavvyPlusPlus',
        password: '789Jesus'
    },
    {
        username: 'Drake',
        password: 'foo1'
    },
    {
        username: 'Aubrie',
        password: '143isHer'
    },
    {
        username: 'Kevens',
        password: 'Jacket123'
    },
    {
        username: 'Kadeja',
        password: 'jacket456'
    },
    {
        username: 'Kristen',
        password: '789Kirssy'
    }
])

//MODAL

let users = info()

const find = () => {
    return Promise.resolve(users)
}

const insert = ({ username, password }) => {
    const newUser = { username, password }
    users.push(newUser)
    return Promise.resolve(newUser)
}

const login = (username) => {
    // LOGIN checks to see if the username entered is part of the database
    const user = users.find(user => user.username === username)
    if (!user) return Promise.resolve(null)

    const welcomeMessage = "Hey There Aligator 😉"
    users = users.map(d => (d.username === username) ? welcomeMessage : d)
    return Promise.resolve(welcomeMessage)
  }

module.exports = {
    info,
    find,
    insert,
    login
}