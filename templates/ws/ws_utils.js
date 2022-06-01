(function(){
    if( !this.Vivoh ) {
	this.Vivoh = {};
    }
    this.Vivoh.websocket = function () {
	return Object.freeze({
	    getParameterForS : function getParametersForS(search) {
		var stream = undefined;
		var offset = -1;
		var param = "s="

		if( !search ) {
		    throw new Error( "Search undefined, you must provide first " +
				     "argument as unparsed search string " +
				     "(document.location.search" );
		}

		if( ( offset = search.indexOf(param) ) === -1) {
		    return undefined;
		}

		// get the stream from this.
		stream = search.substring( offset + param.length );
		// Trim off the end, if we need to.
		var toTrim = -1;
		if ( stream && ( (toTrim = stream.indexOf( "&")) !== -1 ) ) {
		    stream = stream.substring( 0, toTrim );
		}
		
		return stream;
	    },

	    getPathToFlv: function getPathToFlv(pathname,search) {
		if( !pathname ) {
		    throw new Error( "Pathname must be the first argument" );
		}

		var path = undefined;
		var app = undefined;
		var stream = undefined;

		// If we are using /rtp/239_0_0_1__1234, detect and use that.
		// Else, use s parameter to make the app/stream.
		if( pathname.indexOf( "__" ) !== -1 ) {
		    // Get protocol and port
		    path = pathname.replace("/ws.html", ".flv");
		}
		else {
		    try {
			// Use the s param
			var s = this.getParameterForS(search);
			var chunks = s.split( "://" );
			var app = chunks[0];
			var stream = chunks[1]
			    .replace( "//", "")
			    .replace(/\./g, '_')
			    .replace( ":", "__");
			path = "/" + app + "/" + stream + ".flv";
		    }
		    catch (e) {
			// Just use the replaced path
			path = pathname.replace("/ws.html", ".flv");
		    }
		}
		
		return path;
	    },

	    generateUrl: function generateUrl(protocol,host,location,search) {
		var path = this.getPathToFlv(location,search);
		var url = ( protocol === 'https:' ? "wss" : "ws" ) + ( "://" + host + path );
		return url;
	    }

	});
    }();
}).call(this);

    
