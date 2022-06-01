(function() {
  if (!this.Vivoh) {
    this.Vivoh = {};
  }
  this.Vivoh.hls = (function() {
    return Object.freeze({
      getSource: function getSource(extra, path) {
        var s = undefined;
        // decode URL.
        if (
          path &&
          (path.indexOf('udp') !== -1 || path.indexOf('rtp') !== -1)
        ) {
          var chunks = path.split('/');
          if (chunks[1] === 'udp' || chunks[1] == 'rtp') {
            // Check the second chunk.
            const ipap = chunks[2].split('_'); // 239_0_0_1___1234
            if (ipap.length === 6) {
              a =
                chunks[1] +
                '://' +
                [ipap[0], ipap[1], ipap[2], ipap[3]].join('.') +
                ':' +
                ipap[5];
              s = '/index.m3u8?s=' + a;
            } else {
              // Convert the path
              s = path.replace(/\/[^\/]*\.html/, '/index.m3u8');
            }
          }
        }

        if (!s) {
          if (extra && (extra.includes('?s=') || extra.includes('&s='))) {
            s = '/index.m3u8' + extra;
          } else {
            s = path.replace(/\/[^\/]*?\.html/, '/index.m3u8');
          }
        }
        return s;
      }
    });
  })();
}.call(this));
