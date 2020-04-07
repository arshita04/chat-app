const users = []

//add user remove user ,get user, get users in room

const addUser =({ id, username, room})=>{
    //clean the data
    username = username.trim().toLowerCase()
    room = room.trim().toLowerCase()

    //validate the data
    if(!username || !room){
        return {
            error:'Username and room are required!'
        }
    }

    //check for existing users
    const existingUser = users.find((user)=>{
        return user.room === room && user.username === username
    })
    if(existingUser)
    {
        return {
            error: 'Username in use!'
        }
    }

    const user = { id, username, room }
    users.push(user)
    return {user}

}
const removeUser = (id) => {
    const index = users.findIndex((user) => user.id === id)

    if (index !== -1) {
        return users.splice(index, 1)[0]
    }
}
const getUser = (id)=>{
    return users.find((user) => user.id === id)
}
const getUsersInRoom =(room)=>{
    room = room.trim().toLowerCase()
    return users.filter((user)=>user.room === room)
}
module.exports ={
    addUser,
    removeUser,
    getUser,
    getUsersInRoom
}

// addUser({
//     id: 22,
//     username: 'Andrew  ',
//     room: '  South Philly'
// })

// addUser({
//     id: 32,
//     username: 'AndrewS  ',
//     room: '  South Philly'
// })
// addUser({
//     id: 42,
//     username: 'AndrewSingh  ',
//     room: '  South Philly'
// })
// addUser({
//     id: 40,
//     username: 'AndrewSingh  ',
//     room: '  South m Philly'
// })
// console.log(getUsersInRoom('South Philly'))
// console.log(users)

// const removedUser = removeUser(22)

// console.log(removedUser)
// console.log(users)
