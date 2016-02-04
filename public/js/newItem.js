'use strict';



$(function() {
  $('#itemCreate').on('submit', itemCreate);
});

function itemCreate(e) {
  e.preventDefault();

  var iName = $('#iName').val();
  var iUrl = $('#iUrl').val();
  var iDesc = $('#iDesc').val();
  var uid = $('#userIdHolder').data('uid');

  $.post('/items', {name: iName, iURL: iUrl, description: iDesc, user: uid})
  .success(function(data) {
    location.href = '/myGoods';
  })
  .fail(function(err) {
    alert('Error: '+err);
  });
}