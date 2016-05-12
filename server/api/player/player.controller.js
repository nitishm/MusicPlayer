'use strict';

var fs = require('fs');
var id3js = require('id3js');
var path = require('path');
var _ = require('underscore');
var async = require('async');
var serverDir = "C:\\Users\\nmalhotra.ACMEPACKET\\Desktop\\MaterialApp\\client\\songs\\";
exports.index = function(req, res) {
  var info = new Array();
  fs.readdir(serverDir, function(err, files) {
    if(err) throw err;
    var mp3s = _.filter(files, function(file) { if(path.extname(file) === '.mp3') return file});
    var ID = 0;
    if (ID < mp3s.length)
        extractId3(mp3s[ID]);

    function extractId3(file) {
      console.log(serverDir + file);
      id3js({ file: serverDir + file, type: id3js.OPEN_LOCAL }, function(err, tags) {
        if(tags.title == null) tags.title = file;
          info.push({'file': file, 'title':tags.title, 'album':tags.album, 'year':tags.year});
        ID++;
        if (ID < mp3s.length)
          extractId3(mp3s[ID]);
        else {
          console.log(info);
          res.json(info);
        }
      });
    }
  });
};
