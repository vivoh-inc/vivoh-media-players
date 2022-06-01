const fs = require('fs')
const path = require('path');
const pug = require('pug');

[ 'flash', 'ws', 'hls' ].forEach( t => {
    // Load up the file from the templates
    const template = fs.readFileSync( path.join( 'templates', `${t}.pug` ) ).toString();
    var fn = pug.compile(template, { pretty: true } );

    // Load any associated files
    const extras = fs.readdirSync( path.join( "templates", t ) );

    const locals = {};
    extras.filter( f => f.indexOf('~') === -1 ).forEach( e => {
	const extraContents = fs.readFileSync( path.join( 'templates', t, e ) ).toString();
	const e_w_underscores = e.replace(/\./g, '_' ).replace(/\-/g, '_');
	locals[e_w_underscores] = extraContents;
	console.log( "Using local by name: ", e, e_w_underscores );
    });
    var html = fn(locals);
    fs.writeFileSync( path.join( "assets", `${t}.html` ), html );
});

