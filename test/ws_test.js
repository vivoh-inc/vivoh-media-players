// const assert = require('assert');
const path = require('path');
const fs = require('fs');
let window = {};
const expect = require('expect');
const ws = require( '../templates/ws/ws_utils');

describe( "ws", () => {
    describe( "#getParameterForS", () => {
	// it( "should crash with bad inputs", () => {
	//     expect( ws.Vivoh.websocket.getParameterForS.bind(ws) ).to.throw();
	// });

	it( "should get the right path for regular streams", () => {
	    const search = "?s=udp://239.0.0.1:1234"
	    expect( ws.Vivoh.websocket.getParameterForS(search) )
		.toEqual( "udp://239.0.0.1:1234" );
	});

	it( "should get the right path for regular streams even when complicated", () => {
	    let search = "?abc=def&s=udp://239.0.0.1:1234"
	    expect( ws.Vivoh.websocket.getParameterForS(search))
	    	.toEqual( "udp://239.0.0.1:1234" );
	    search = "?&s=udp://239.0.0.1:1234&foobar=1234&&&"
	    expect( ws.Vivoh.websocket.getParameterForS(search))
	    	.toEqual( "udp://239.0.0.1:1234" );
	});
	
    });
    
    describe( "#loadFlvPlayer", () => {
	// it( "should crash with bad inputs", () => {
	//     expect( ws.Vivoh.websocket.getPathToFlv.bind(ws) ).to.throw();
	// });
	
	it( "should get the right path for regular streams", () => {
	    const pathname = "/live/STREAM/ws.html";
	    expect( ws.Vivoh.websocket.getPathToFlv(pathname) ).toEqual( "/live/STREAM.flv" );
	});

	it( "should get the right path for app/stream encoded locations", () => {
	    const pathname = "/rtp/239_0_0_1__1234/ws.html";
	    expect( ws.Vivoh.websocket.getPathToFlv(pathname) )
		.toEqual( "/rtp/239_0_0_1__1234.flv");
	});

	it( "should get the right path for URL search params", () => {
	    const pathname = "/ws.html";
	    const search = "?s=udp://239.0.0.1:1234"
	    expect( ws.Vivoh.websocket.getPathToFlv(pathname,search) )
		.toEqual( "/udp/239_0_0_1__1234.flv" );
	});

	it( "should get the right path for URL search params even when complicated", () => {
	    const pathname = "/ws.html";
	    let search = "?abc=def&s=udp://239.0.0.1:1234"
	    expect( ws.Vivoh.websocket.getPathToFlv(pathname,search) )
		.toEqual( "/udp/239_0_0_1__1234.flv" );
	    search = "?&s=udp://239.0.0.1:1234&foobar=1234&&&"
	    expect( ws.Vivoh.websocket.getPathToFlv(pathname,search) )
		.toEqual( "/udp/239_0_0_1__1234.flv" );
	    
	});
    });
});
