'use strict';



$(function() {
  var $tAvalability = $('.tAvalability');
  $tAvalability.each(function(index, ele) {
    var $ele = $(ele);
    console.log($ele);
    // $ele.removeClass('btn-success');
    // // if ($ele.data('tval'))
    //   console.log("here");
  })
});

// function itemCreate(e) {
//   e.preventDefault();


//   var uid = $('#userIdHolder').data('uid');

//   $.post('/items', {name: iName, iURL: iUrl, description: iDesc, user: uid})
//   .success(function(data) {
//     location.href = '/myGoods';
//   })
//   .fail(function(err) {
//     alert('Error: '+err);
//   });
// }