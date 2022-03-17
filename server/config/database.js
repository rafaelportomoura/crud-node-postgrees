/********************************************************
Database Connection Settings
*********************************************************/

exports.conString = "postgres://postgres:mysecretpassword@172.17.0.2/crud-node";



// module.exports = {
//    query: function(text, values, cb) {
//       pg.connect(function(err, client, done) {
//         client.query(text, values, function(err, result) {
//           done();
//           cb(err, result);
//         })
//       });
//    }
// }

