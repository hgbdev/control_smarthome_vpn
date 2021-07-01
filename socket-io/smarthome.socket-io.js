const db = require('../models');

const SmartHomeModel = db.smarthome;

function socketSmartHome(io) {
  io.on('connection', (socket) => {
    // Get nhietdo
    socket.on('get_nhietdo', async (data) => {
      const nhietdo = await SmartHomeModel.findOne({
        where: { key: 'nhietdo' },
      });
      socket.emit('res_nhietdo', { nhietdo: nhietdo.value });
    });
    // Update nhietdo
    socket.on('update_nhietdo', async (data) => {
      SmartHomeModel.update(
        { value: data.nhietdo },
        {
          where: { key: 'nhietdo' },
        }
      );
      socket.broadcast.emit('res_nhietdo', { nhietdo: data.nhietdo });
    });

    // Get den
    socket.on('get_den', async (data) => {
      const den = await SmartHomeModel.findOne({
        where: { key: 'den' },
      });
      socket.emit('res_den', { den: den.value });
    });
    // Update den
    socket.on('update_den', async (data) => {
      SmartHomeModel.update(
        { value: data.den },
        {
          where: { key: 'den' },
        }
      );
      socket.broadcast.emit('res_den', { den: data.den });
    });

    // Get tivi
    socket.on('get_tivi', async (data) => {
      const tivi = await SmartHomeModel.findOne({
        where: { key: 'tivi' },
      });
      socket.emit('res_tivi', { tivi: tivi.value });
    });
    // Update tivi
    socket.on('update_tivi', async (data) => {
      SmartHomeModel.update(
        { value: data.tivi },
        {
          where: { key: 'tivi' },
        }
      );
      socket.broadcast.emit('res_tivi', { tivi: data.tivi });
    });

    // Get dieuhoa
    socket.on('get_dieuhoa', async (data) => {
      const dieuhoa = await SmartHomeModel.findOne({
        where: { key: 'dieuhoa' },
      });
      socket.emit('res_dieuhoa', { dieuhoa: dieuhoa.value });
    });
    // Update dieuhoa
    socket.on('update_dieuhoa', async (data) => {
      SmartHomeModel.update(
        { value: data.dieuhoa },
        {
          where: { key: 'dieuhoa' },
        }
      );
      socket.broadcast.emit('res_dieuhoa', { dieuhoa: data.dieuhoa });
    });
  });

  // Get doam

  // Update doam
}

module.exports.socketSmartHome = socketSmartHome;
