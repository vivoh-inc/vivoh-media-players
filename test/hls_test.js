// const assert = require('assert');
const path = require('path');
const fs = require('fs');
let window = {};
const hls = require('../templates/hls/hls_utils');
const expect = require('expect');

describe('hls', () => {
  describe('#getSource', () => {
    it('should get the right path for regular streams', () => {
      const search = '?s=udp://239.0.0.1:1234';
      expect(hls.Vivoh.hls.getSource(search)).toEqual(
        '/index.m3u8?s=udp://239.0.0.1:1234'
      );
    });

    it('should get the right path for different streams', () => {
      const search = '?s=udp://239.0.0.1:1234?fifo_size=49152&overrun_nonfatal=1';
      expect(hls.Vivoh.hls.getSource(search)).toEqual(
        '/index.m3u8?s=udp://239.0.0.1:1234?fifo_size=49152&overrun_nonfatal=1'
      );
    });

    it('should get the work for flash', () => {
      let search = 'foo=bar';
      let path = '/live/foobar/hls.html';
      expect(hls.Vivoh.hls.getSource(search, path)).toEqual(
        '/live/foobar/index.m3u8'
      );

      path = '/live/foobar/flash.html';
      expect(hls.Vivoh.hls.getSource(search, path)).toEqual(
        '/live/foobar/index.m3u8'
      );

    });

    it('should get the right path for encoded streams', () => {
      const search = 'foo=bar';
      let path = '/udp/239_0_0_1__1234';
      expect(hls.Vivoh.hls.getSource(search, path)).toEqual(
        '/index.m3u8?s=udp://239.0.0.1:1234'
      );
      path = '/rtp/239_0_0_1__1234';
      expect(hls.Vivoh.hls.getSource(search, path)).toEqual(
        '/index.m3u8?s=rtp://239.0.0.1:1234'
      );
    });

    it('should get the right path when using VMS mounts', () => {
      const search = 'foo=bar';
      let path = '/live/foobar/hls.html';
      expect(hls.Vivoh.hls.getSource(search, path)).toEqual(
        '/live/foobar/index.m3u8'
      );
    });
  });
});
