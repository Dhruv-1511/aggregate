const express = require('express');
const app = express();
const User = require('./models/Worker');
const Message = require('./models/Message')

const rooms = ['general', 'tech', 'finance', 'crypto'];
const cors = require('cors');

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());

require('./connection')

const server = require('http').createServer(app);
const PORT = 5001;
const io = require('socket.io')(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST']
  }
})


async function getLastMessagesFromRoom(room){
  let roomMessages = await Message.aggregate([
    {$match: {to: room}},
    {$group: {_id: '$date', messagesByDate: {$push: '$$ROOT'}}}
  ])
  return roomMessages;
}

function sortRoomMessagesByDate(messages){
  return messages.sort(function(a, b){
    let date1 = a._id.split('/');
    let date2 = b._id.split('/');
    date1 = date1[2] + date1[0] + date1[1]
    date2 =  date2[2] + date2[0] + date2[1];

    return date1 < date2 ? -1 : 1
  })
}

// socket connection

io.on('connection', (socket)=> {

  socket.on('new-user', async ()=> {
    const members = await User.find();
    socket.emit('getMessages');
    io.emit('new-user', members)
  })
  
  socket.on('join-room', async(newRoom, previousRoom)=> {
    socket.join(newRoom);
    socket.leave(previousRoom);
    let roomMessages = await getLastMessagesFromRoom(newRoom);
    roomMessages = sortRoomMessagesByDate(roomMessages);
    socket.emit('room-messages', roomMessages)
    socket.emit('message-other', { message, victomId });
    
  })

  socket.on('message-room', async(room, content, sender, time, date) => {
    console.log(content,sender,time,date,room)
    const newMessage = await Message.create({content, from: sender, time, date, to: room});
    let roomMessages = await getLastMessagesFromRoom(room);
    roomMessages = sortRoomMessagesByDate(roomMessages);
    // sending message to room
    io.to(room).emit('room-messages', roomMessages);
    socket.broadcast.emit('notifications', room)
    socket.emit('getMessages');
    socket.on('messages', (messages) => {
      // Update the UI with the retrieved messages
        console.log(messages)
    });
      io.emit('message-room', {room, content, sender, time, date});
  })

  socket.on('getMessages', async() => {
    // Retrieve all messages from MongoDB
    const messages = await Message.find();
    // Emit the retrieved messages back to the client
    socket.emit('messages', messages);
  });

  app.delete('/logout', async(req, res)=> {
    try {
      const {_id, newMessages} = req.body;
      const user = await User.findById(_id);
      user.status = "offline";
      user.newMessages = newMessages;
      await user.save();
      const members = await User.find();
      socket.broadcast.emit('new-user', members);
      res.status(200).send();
    } catch (e) {
      console.log(e);
      res.status(400).send()
    }
  })

})

app.get('/', (req,res) =>{
  res.send('hello');
})

app.get('/rooms', (req, res)=> {
  res.json(rooms)
})


server.listen(PORT, ()=> {
  console.log('listening to port', PORT)
})
