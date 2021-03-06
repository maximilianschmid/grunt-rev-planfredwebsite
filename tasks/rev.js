/*
 * grunt-rev
 * https://github.com/cbas/grunt-rev
 *
 * Copyright (c) 2013 Sebastiaan Deckers
 * Licensed under the MIT license.
 */

'use strict';

var fs = require('fs'),
  path = require('path'),
  crypto = require('crypto');

module.exports = function(grunt) {

  function md5(filepath, algorithm, encoding) {
    var hash = crypto.createHash(algorithm);
    grunt.log.verbose.write('Hashing ' + filepath + '...');
    hash.update(grunt.file.read(filepath));
    return hash.digest(encoding);
  }

  grunt.registerMultiTask('rev', 'Prefix static asset file names with a content hash', function() {

    var options = this.options({
      algorithm: 'md5',
      length: 8
    });
    
    var fixedHash;
    
	function fixedHash (){
		return new Date().getTime();
	}		
    fixedHash = fixedHash();

    this.files.forEach(function(filePair) {
      filePair.src.forEach(function(f) {

        var prefix = fixedHash,
          renamed = [prefix, path.basename(f)].join('.'),
          outPath = path.resolve(path.dirname(f), renamed);

        grunt.verbose.ok().ok(fixedHash);
        fs.renameSync(f, outPath);
        grunt.log.write(f + ' ').ok(renamed);

      });
    });

  });

};
