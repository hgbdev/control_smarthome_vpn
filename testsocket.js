const io = require('socket.io-client');

const socket = io('');

socket.emit('update_nhietdo', { nhietdo: 35 });

socket.on('res_nhietdo', (data) => {
  console.log(data.nhietdo);
});
