const {addUser , removeUser , getUser , getUsersInRoom} = require('./users.js')
const rooms = []
// const users =[]
// const addUser =({ id, username, room})=>{
//     //clean the data
//     username = username.trim().toLowerCase()
//     room = room.trim().toLowerCase()

//     //validate the data
//     if(!username || !room){
//         return {
//             error:'Username and room are required!'
//         }
//     }

//     //check for existing users
//     const existingUser = users.find((user)=>{
//         return user.room === room && user.username === username
//     })
//     if(existingUser)
//     {
//         return {
//             error: 'Username in use!'
//         }
//     }

//     const user = { id, username, room }
//     users.push(user)
//     return {user}

// }
// const getUsersInRoom =(room)=>{
//     room = room.trim().toLowerCase()
//     return users.filter((user)=>user.room === room)
// }

const addRooms = ({room})=>{
room.trim().toLowerCase()

//check for existing room
 
 const existingRoom = rooms.find((roomname)=> {
    // console.log(roomname)
     return room === roomname.room
    })
 if(existingRoom)
 { 
     addRemoveUser(room,1)
    //   const total = getUsersInRoom(room).length
     return rooms
 }
 
 const total = getUsersInRoom(room).length
 const roomname = {room , total}
 rooms.push(roomname)
 return roomname
}
const addRemoveUser = (room,n)=>{
    const index = rooms.findIndex((roomN) => roomN.room === room) 
    const existRoom = rooms[index]
    existRoom.total = existRoom.total + n;
 }
 const getAllRooms =()=>{
     return rooms
 }
module.exports = {
    addRooms,
    addRemoveUser,
    getAllRooms
}

// addUser({
//     id: 22,
//     username: 'Andrew  ',
//     room: 'South'
// })
// addRooms({
//     room:'South'
// })

// addUser({
//     id: 32,
//     username: 'AndrewS  ',
//     room: '  South'
// })

// addRooms({
//     room:'South'
// })
// addUser({
//     id: 42,
//     username: 'AndrewSingh  ',
//     room: 'West'
// })

// addRooms({
//     room:'West'
// })
// addUser({
//     id: 42,
//     username: 'Rihana',
//     room: 'West'
// })

// addRooms({
//     room:'West'
// })
// addUser({
//     id: 42,
//     username: 'Rhana',
//     room: 'West'
// })

// addRooms({
//     room:'West'
// })
// console.log(users)
// console.log(rooms)
// console.log(rooms)
