const ws = require('./src/ws');
const hls = require('./src/hls');
const flash = require('./src/flash');

const players = { ws,
		          hls,
		          flash
                };

const getPlayers = () => players;

module.exports = {
	...players,
    getPlayers,
};
