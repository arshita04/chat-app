const socket = io()

const $room = document.querySelector('#all-rooms')

// templates
const roomAvailableTemplate = document.querySelector('#roomavailable-template').innerHTML

socket.on('rooms',(roomsAll)=>{
    const html = Mustache.render(roomAvailableTemplate,{
        rooms:roomsAll
    })
    $room.innerHTML = html
    
    
})