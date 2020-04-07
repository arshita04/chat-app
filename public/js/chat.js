const socket = io()

const $message_form = document.querySelector('#message-form')
const $input =  $message_form.querySelector('input')
const $form_button = $message_form.querySelector('button')
const $sendLocation = document.querySelector('#sendLocation')
const $messages = document.querySelector('#messages')
const $sidebar = document.querySelector('#sidebar')

// templates
const messageTemplate = document.querySelector('#message-template').innerHTML
const locationTemplate = document.querySelector('#location-template').innerHTML
const sidebarTemplate = document.querySelector('#sidebar-template').innerHTML
//options
const {username,room} = Qs.parse(location.search,{ignoreQueryPrefix:true})

const autoscroll = () => {
    // New message element
    const $newMessage = $messages.lastElementChild

    // Height of the new message
    const newMessageStyles = getComputedStyle($newMessage)
    const newMessageMargin = parseInt(newMessageStyles.marginBottom)
    const newMessageHeight = $newMessage.offsetHeight + newMessageMargin

    // Visible height
    const visibleHeight = $messages.offsetHeight

    // Height of messages container
    const containerHeight = $messages.scrollHeight

    // How far have I scrolled?
    const scrollOffset = $messages.scrollTop + visibleHeight

    if (containerHeight - newMessageHeight <= scrollOffset) {
        $messages.scrollTop = $messages.scrollHeight
    }
}
socket.on('message',(value)=>{
    console.log(value)
    const html = Mustache.render(messageTemplate,{
        username:value.username,
        message:value.text,
        createdAt:moment(value.createdAt).format('h:mm a')
    })
    $messages.insertAdjacentHTML('beforeend', html)
  autoscroll()
})

socket.on('locationMessage',(location)=>{
    console.log(location)
    const html = Mustache.render(locationTemplate,{
        username:location.username,
        link:location.url,
        createdAt: moment(location.createdAt).format('h:mm a')
    })
    $messages.insertAdjacentHTML('beforeend',html)
    autoscroll()
})

socket.on('roomData',({room , data})=>{
    const html = Mustache.render(sidebarTemplate,{
        room,
        users:data
    })
    $sidebar.innerHTML = html
    
    
})
$message_form.addEventListener('submit',(e)=>{
    e.preventDefault()
    $form_button.setAttribute('disabled','disabled')
    const message = $input.value
    if(message!=''){
    socket.emit('messages',message,(error)=>{
        $form_button.removeAttribute('disabled')
        $input.value ='';
        $input.focus()
        if(error)
        { 
            return console.log(error)
        }
        console.log('Message Delivered')
       
    })
    
    }
    else{
        $form_button.removeAttribute('disabled')
        $input.value ='';
        $input.focus()
        return console.log('Empty text not allowed')
    }

})

$sendLocation.addEventListener('click',()=>{
    if(!navigator.geolocation){
        return alert('geolocation not supported by your browser')
    }
    $sendLocation.setAttribute('disabled','disabled')
    navigator.geolocation.getCurrentPosition((position)=>{
     socket.emit('sendLocation',{
         latitude:position.coords.latitude,
         longitude:position.coords.longitude
     },(deliver)=>{
         $sendLocation.removeAttribute('disabled')
         console.log(deliver)
     })
    })
})

socket.emit('join',{username,room},(error)=>{
    if(error)
    {
        location.href ='/'
   alert('Username should be unique')
    }
})