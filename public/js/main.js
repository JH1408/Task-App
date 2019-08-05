// jshint esversion:8

// background animation
window.onload = function() {
  Particles.init({
    selector: '.background',
    connectParticles: true,
    color: '#f53676'
  });
};

// window.onload = function() {
//   Particles.init({
//     selector: '.container__child signup__thumbnail',
//     connectParticles: true,
//     color: '#f53676'
//   });
// };

// display photo
$(document).ready(() => {
  $.getJSON('/users/me', (res) => {
    const id = res.user._id;
    $.getJSON(`/users/{id}/avatar`, (res) => {
      $('.user-photo').attr('src', res.user.avatar);
    });
  });
});

// validation for registration
$(document).ready(() => {
    $('.register-form').validate({
        rules: {
          email: {
              required: true,
              email: true,
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
        debug: true
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
        debug: true
      });
    });

$('.save-data').on('click', (e) => {
  e.preventDefault();
  fetch('/users/me', {
    method: 'PATCH',
    body: JSON.stringify({
      name: req.body.name,
      email: req.body.email
    })
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
        debug: true
      });
    });
