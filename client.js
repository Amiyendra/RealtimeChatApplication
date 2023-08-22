const socket=io('http://localhost:8000');

const form =document.getElementById('send-container');

const messageInput=document.getElementById('messageInp');
const messageContainer=document.querySelector(".container");
var send=new Audio('sent.mp3');
var notification=new Audio('iphone.mp3');
const append=(message,position)=>{
const messageElement=document.createElement('div');
messageElement.innerText=message;
messageElement.classList.add('message')
messageElement.classList.add(position);
messageContainer.append(messageElement);
if(position==='left'){
    send.play();
}


}

form.addEventListener('submit',(e)=>{//function for sending message
    e.preventDefault();//the page will not reload
    const message=messageInput.value;
    append(`You:${message}`,'right');
    socket.emit('send',message);
    messageInput=' ';
    
})

const name1=prompt("Enter Your Name to join");
socket.emit('new-user-joined',name1);

socket.on('user-joined',name=>{
append(`${name} joined the chat`,'right')
}) 

socket.on('receive',data=>{
    append(`${data.name} :  ${data.message}`,'left')
    })
    socket.on('left',name=>{
        append(`${name}   left the chat`,'left')
        })
