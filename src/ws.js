const path = require('path');
module.exports.playerPath = () => {
    return path.join( __dirname, "..", "assets", "ws.html" );
}
