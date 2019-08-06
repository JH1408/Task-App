// jshint esversion:8

// background animation
window.onload = function() {
  Particles.init({
    selector: '.background',
    connectParticles: true,
    color: '#f53676'
  });
};

$(document).ready(function() {
  if($('h2').text() == 'YOUR ACCOUNT') {
    $('.hero').addClass('user-bg');
  }
});


// validation for registration
$.validator.addMethod("alphanumeric", function(value, element) {
	return this.optional(element) || /^\w+$/i.test(value);
}, "Letters, numbers, and underscores only please");

$(document).ready(function ($) {
    $('.register-form').validate({
        rules: {
            name: {
                required: true,
                lettersonly: true
            },
            email: {
                required: true,
                email: true
            },
            newPassword: {
                required: true,
                password: true,
                minlength: 7,
                alphanumeric: true
            },
            confirmPassword: {
                required: true,
                password: true,
                minlength: 7,
                equalTo: '.newPassword'
            }
        },
        messages: {
            name: {
                required: "Please enter your name",
                lettersonly: "Name should contain only letters"
            },
            newPassword: {
              required: "Please enter a password.",
              password: "Your password must be at least 7 characters and contain numbers and letters."
            },
            confirmPassword: {
              equalTo: "Passwords must match."
            },
            email: {
              required: "Please enter a valid email address.",
              email: "Please enter a valid email address."
            }
        },
    });
});

// change user data
$(document).ready(function($) {
    $('.data-form').validate({
        rules: {
            email: {
                required: true,
                email: true,
            }
        },
        messages: {
            email: {
              required: "Please enter a valid email address.",
              email: "Please enter a valid email address."
            }
        },
    });
    });


// change password
$(document).ready(function($) {
    $('.password-form').validate({
        rules: {
            newPassword: {
                required: true,
                password: true,
                minlength: 7,
                alphanumeric: true
            },
            confirmPassword: {
                required: true,
                password: true,
                minlength: 7,
                equalTo: '.newPassword'
            }
        },
        messages: {
            newPassword: {
              required: "No password specified.",
              password: "Your new password must be at least 7 characters and contain numbers and letters."
            },
            confirmPassword: {
              equalTo: "Passwords must match."
            }
        },
      });
    });

// add new tasks
$('.newItem').on('submit', (e) => {
  e.preventDefault();
  fetch('/tasks', {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json'
  },
    body: JSON.stringify({
      description: $('input').val(),
      completed: false
    })
  }).then((response) => {
      $('.newItem').before(`<div class="item"><p>${$('input').val()}</p></div>`);
      $('input').val('');
  });
});
