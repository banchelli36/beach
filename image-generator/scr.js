const fs = require('fs');
const request = require('request');
const entries = require('./entries.json');

const download = function (uri, filename, callback) {
  request.head(uri, function (err, res, body) {
    console.log('content-type:', res.headers['content-type']);
    console.log('content-length:', res.headers['content-length']);

    request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
  });
};

slugs = [
  'memphis-poplar'
]

for (let entry of entries) {

    if (entry.latitude && entry.longitude) {
      download(
        `http://maps.googleapis.com/maps/api/staticmap?size=500x456&center=${entry.latitude},${entry.longitude}&zoom=16&style=visibility:on&style=feature:water%7Celement:geometry%7Cvisibility:on&style=feature:landscape%7Celement:geometry%7Cvisibility:on&style=feature:landscape%7Celement:all%7Ccolor:0xf2f2f2&style=feature:poi|visibility:off&style=feature:administrative%7Celement:labels.text.fill%7Ccolor:0x444444&style=feature:road.highway%7Celement:all%7Cvisibility:simplified&style=feature:road%7Celement:all%7Csaturation:-100&style=feature:road%7Celement:all%7Clightness:45&style=feature:road.arterial%7Celement:labels.icon%7Cvisibility:off&style=feature:water%7Celement:geometry%7Ccolor:0xc0e4f3&markers=icon:https://uploads-ssl.webflow.com/5ea4822fd3a80f6c9cc4fdd9/5f87fae52f748c7c5ad55614_5f81e4e7374a417200dc2551_Geo_Tag.png%7Clabel:S%7C${entry.latitude},${entry.longitude}&key=AIzaSyA3foPM-dJbV6EXfYoC-zb7-ZY8vcjyiNo`,
        `images/${entry.name}(${entry._id}).png`,
        () => {
          console.log(`Done for ${entry._id}`);
        }
      )
    }

}
