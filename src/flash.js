const path = require('path');
module.exports.playerPath = () => {
    return path.join( __dirname, "..", "assets", "flash.html" );
}

module.exports.flashPlayerPath = () => {
    return path.join( __dirname, "..", "assets", "flashlsChromeless.swf" );
}
