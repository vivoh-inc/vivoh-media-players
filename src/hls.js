const path = require('path');
module.exports.playerPath = function() {
    return path.join( __dirname, "..", "assets", "hls.html" );
}
