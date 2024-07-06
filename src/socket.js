import { io } from "socket.io-client";

let socket = io("http://localhost:5000");

// const connectSocket = (user_id) => {
//   socket = io("http://localhost:5000", {
//     query: `user_id=${user_id}`,
//   });
// };

export {
  socket,
  // , connectSocket
};

/**
 socket.emit('get_direct_conversation', { user_id }, (data) => {
      //data => list of conversations
    });
 */
