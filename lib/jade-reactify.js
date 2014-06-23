"use strict";

// this is the ugliest i've ever did
require( "coffee-script" );

var through = require( "through" );
var jadeReact = require( "jade-react" );

module.exports = function( fileName ){
    if( !( /\.jade$/i ).test( fileName ) ){
        return through();
    }

    var template = "";

    return through(
        function( chunk ){
            template += chunk;
        },
        function(){
            var compiled = jadeReact( template );

            var body = 'var React = require( "react" );\n\n' +
                       'module.exports = ' + compiled.trim() +  ';';
            this.queue(body);
            this.queue(null);
        }
    );
};
