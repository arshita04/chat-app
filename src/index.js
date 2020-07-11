const path= require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')
const Filter = require('bad-words')
const {generateMessage , generateLocationMessage} = require('./utils/messages')
const {addUser , removeUser , getUser , getUsersInRoom} = require('./utils/users.js')
const {addRooms , addRemoveUser ,getAllRooms} = require('./utils/rooms')
const multer = require('multer')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

const port = process.env.PORT || 3000
const publicDirectoryPath = path.join(__dirname,'../public')

app.use(express.static(publicDirectoryPath))
// let count =0

io.on('connection',(socket)=>{
    // console.log('message')
    // socket.broadcast.emit('message',generateMessage('New user Joined'))
    // socket.emit('message',generateMessage('Welcome User'))
   

    socket.on('join',({username,room},callback)=>{
        const {error , user} = addUser({ id: socket.id,username,room})
        if(error)
        {
            return callback(error)
        }
        else{
           const rooms= addRooms({room:user.room})
        //    console.log(rooms)
     socket.join(user.room)
     socket.emit('message',generateMessage('',`Welcome ${user.username}`))
     socket.broadcast.to(user.room).emit('message',generateMessage('',`${user.username} joined`))
     io.emit('roomData',{
         room:user.room,
         data:getUsersInRoom(user.room)
     })
     callback()}
   
    })
    
    socket.on('messages',(value,callback)=>{
        const user = getUser(socket.id)
        const filter = new Filter()
        if(filter.isProfane(value))
        {
           return callback('Profanity not allowed')
        }
        socket.emit('message',generateMessage('Me',(user.username,value)))
      socket.broadcast.to(user.room).emit('message',generateMessage(user.username,value))


      callback()
        // socket.emit('countUpdated',count) //emitting to  particular connection    
    })

    // socket.on('files',(file,callback)=>{
        
    //         const reader = new FileReader()
    //         reader.readAsDataURL(file)
    //         reader.onload = function () {
    //           socket.emit('',{ data: reader.result })
    //           callback()
    //         }
    // })
    socket.on('sendLocation',(coords,callback)=>{
        const user = getUser(socket.id)
        // io.emit('message',coords)
        socket.emit('locationMessage',generateLocationMessage('Me',`https://google.com/maps?q=${coords.latitude},${coords.longitude}`))
        socket.broadcast.to(user.room).emit('locationMessage',generateLocationMessage(user.username,`https://google.com/maps?q=${coords.latitude},${coords.longitude}`))
        callback('Delivered')
    })

    socket.on('disconnect',()=>{
        const user = removeUser(socket.id)
        if(user){
            addRemoveUser(user.room,-1)
        io.to(user.room).emit('message',generateMessage('',`${user.username} has left`))
        io.emit('roomData',{
         room:user.room,
         data:getUsersInRoom(user.room)
        })
        }
    })
    const roomsAll = getAllRooms()
    io.emit('rooms',roomsAll)
})


server.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
})