
let print = (p) => console.log(p)
// let c = document.getElementById('canv').getContext('2d')
// let s = document.getElementById("stream");
// let mediaRecorder;

// let recordedBlobs = new Blob();
// let stream;
// let media;
// let store;
// const constraints = {
//     'video': true,
//     'audio': true
// }

// async function setUp() {
//
//     media = await navigator.mediaDevices.getUserMedia(constraints)
//     stream = new MediaStream()
//     stream.addTrack(media.getVideoTracks()[0])
//     stream.addTrack(media.getAudioTracks()[0])
//     s.srcObject = stream;
//     mediaRecorder = new MediaRecorder(stream, {mimeType:'video/webm'})
//     let start = Date.now();
//     mediaRecorder.ondataavailable = function (event) {
//         if (event.data && event.data.size > 0) {
//             recordedBlobs =new Blob([recordedBlobs,event.data]);
//         }
//     }
//     mediaRecorder.start(5000);
// }
// setUp()
var socket = io();
var btn = document.getElementById("float")
var msgs = document.getElementById("messages")
var form = document.getElementById('form');
var input = document.getElementById('text');
let joinRoom = document.getElementById('join-room')
let room = document.getElementById('room')
joinRoom.addEventListener('submit', (e) => {
    e.preventDefault();
    print("submitted")
    print(e)
    if (room.value) {
        localStorage.setItem("room", room.value);
        document.getElementById('join').classList.remove('d-flex')
        document.getElementById('join').style.display = 'none';
        document.getElementById('chat').style.display = 'flex';
        socket.emit('joinroom', localStorage.getItem("room"));
    }
})
function scrollToBottom(elem) {
    msgs.scrollTo(0, elem.scrollHeight + elem.offsetHeight)
}
msgs.onscroll = (e) => {
    print((msgs.scrollTop))
    btn.style.display = ((msgs.scrollHeight - msgs.clientHeight) > msgs.scrollTop+8) ? "flex" : "none";
    btn.style.bottom = -((msgs.scrollTop) / 16)+ 'rem';
    print(btn)
}

document.getElementById("submit").addEventListener("click",
    (e) => {
        e.preventDefault();
        print("heelo")
        if (input.value) {
            socket.emit('chat message', input.value);
            let temp = document.createElement("p")
            temp.className = "sent"
            temp.textContent = input.value
            msgs.appendChild(temp)
            msgs.scrollTo(0, msgs.scrollHeight + temp.offsetHeight)
            input.value = '';
        }
    })
window.addEventListener("load",() => {
    scrollToBottom(msgs)
})
btn.addEventListener('click', () => {
    scrollToBottom(msgs)
})

socket.on('message', (e) => {

    let scroll = (msgs.scrollHeight - msgs.clientHeight) <= msgs.scrollTop+5;
    let temp = document.createElement("p")
    temp.className = "received"
    temp.textContent = e
    msgs.appendChild(temp)
    print(temp.offsetHeight)
    if(scroll)
        scrollToBottom(msgs)

})