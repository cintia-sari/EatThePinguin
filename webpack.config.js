const path = require('path');

module.exports = {
    entry:'./JS/pinguinGame.js',
    output :{
        filename: 'bundle.js',
        path:path.resolve(__dirname,'dist')
    },
};

