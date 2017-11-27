'use strict';

function wait(ms) {
   return new Promise(function (r) {
      return setTimeout(r, ms);
   });
}

function main() {
   console.log('sắp rồi...');
   wait(2007).then(console.log('chờ tí...'));
   // console.log('chờ tí...')
   wait(2012);
   console.log('thêm chút nữa thôi...');
   wait(2016);
   console.log('xong rồi đấy!');
}

main();
//# sourceMappingURL=async.js.map
