'use strict';



$(function() {
  $('#logoutDisplay').hide();
	$('#loginUser').show();
  $('#loginUser').on('submit', loginUser);
  $('#registerUser').on('submit', registerUser);
});

function loginUser(e) {
  e.preventDefault();

  var email = $('#emailL').val();
  var password = $('#passwordL').val();

  $.post('/users/login', {email: email, password: password})
  .success(function(data) {
    location.href = '/';
  })
  .fail(function(err) {
    console.log(err);
    alert('Error: '+err.responseJSON.code);
  });
}

function registerUser(e) {
  e.preventDefault();

  var email = $('#emailR').val();
  var password = $('#passwordR').val();
  var password2 = $('#passwordR2').val();

  if(password !== password2) {
    $('.password').val('');
    return alert('Passwords must match.');
  }

  $.post('/users/register', {email: email, password: password})
  .success(function() {
    location.href = '/';
  })
  .fail(function(err) {
    alert('Error: '+err.responseJSON.code);
  });
}