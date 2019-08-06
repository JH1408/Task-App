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
  if($('.incorrect').text() === '') {
    $('.incorrect').remove();
  }
});

// validation for registration
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
$(document).ready(() => {
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
$.validator.addMethod("alphanumeric", function(value, element) {
	return this.optional(element) || /^\w+$/i.test(value);
}, "Letters, numbers, and underscores only please");

$('.save-password').on('click', (e) => {
  e.preventDefault();
  fetch('/users/me', {
    method: 'PATCH',
    body: JSON.stringify({
      password: req.body.newPassword
    })
  });
});

$(document).ready(() => {
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
item.addEventListener('submit', (e) => {
  e.preventDefault();
  fetch('/tasks', {
    method: 'post',
    headers: {
    'Content-Type': 'application/json'
  },
    body: JSON.stringify({
      description: document.querySelector('input').value,
      completed: false
    })
  }).then((response) => {
    console.log(response);
  });
});
