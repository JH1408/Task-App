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

// logout
$(document).ready(function() {
  if($('.signup-btn').text() == 'Sign Out') {
    $('.signup-btn').attr('type', 'submit');
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

  $('.data-form').on('submit', (e) => {
    e.preventDefault();
    fetch('/users/me', {
      method: 'PATCH',
      headers: {
      'Content-Type': 'application/json'
    },
      body: JSON.stringify({
        name: $('.name').val(),
        email: $('.email').val(),
      })
    }).then((response) => {
        $('h2').after('<p class="incorrect center">Account successfully updated!</p>');
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

$('.password-form').on('submit', (e) => {
  e.preventDefault();
  fetch('/users/me', {
    method: 'PATCH',
    headers: {
    'Content-Type': 'application/json'
  },
    body: JSON.stringify({
      password: $('.new-password').val(),
    })
  }).then((response) => {
      $('h3').after('<p class="incorrect center">Password successfully updated!</p>');
      $('.password-form input').val('');
  });
});

// delete account
$('.delete-account').on('submit', (e) => {
  e.preventDefault();
  fetch('/users/me', {
    method: 'DELETE',
    headers: {
    'Content-Type': 'application/json'
  }
  }).then((response) => {
    console.log(response);
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
      description: $('.newTask').val(),
      completed: false
    })
  }).then((response) => {
      $('.newItem').before(`<div class="item">
        <form class="task" >
          <i class="far fa-square unchecked">
          <input type="text" class="edit-task" value="${$('.newTask').val()}">
          <button type="submit" style="visibility: hidden"></button>
        </form>
      </div>`);
      $('.newTask').val('');
  });
});

// edit task
$('.task').on('submit', (e) => {
  e.preventDefault();
  fetch(`/tasks/${$(e.target).find('.edit-task').data('id')}`, {
    method: 'PATCH',
    headers: {
    'Content-Type': 'application/json'
  },
    body: JSON.stringify({
      description: $(e.target).find('.edit-task').val(),
    })
  }).then((response) => {
    console.log(response);
  });
});

// check task
$('.unchecked').on('click', (e) => {
  e.preventDefault();
  fetch(`/tasks/${$(e.target).find('.edit-task').data('id')}`, {
    method: 'PATCH',
    headers: {
    'Content-Type': 'application/json'
  },
    body: JSON.stringify({
      completed: true,
    })
  }).then((response) => {
      $(e.target).removeClass('fa-square').addClass('fa-check-square checked').removeClass('unchecked');
      $(e.target).find('.edit-task').addClass('done');
  });
});

// uncheck task
$('.checked').on('click', (e) => {
  e.preventDefault();
  fetch(`/tasks/${$(e.target).find('.edit-task').data('id')}`, {
    method: 'PATCH',
    headers: {
    'Content-Type': 'application/json'
  },
    body: JSON.stringify({
      completed: false,
    })
  }).then((response) => {
      $(e.target).removeClass('fa-checked-square').addClass('fa-square unchecked').removeClass('checked');
      $(e.target).find('.edit-task').removeClass('done');
  });
});


// show only completed tasks
$('.filter').on('change', (e) => {
  //e.preventDefault();
  if ($('.filter').val() == 'comp') {
    const query = '?completed=true';
  } else if ($('.filter').val() == 'incomp') {
    const query = '?completed=false';
  } else {
    const query = '';
  }

  fetch(`/tasks/${query}`, {
    method: 'GET',
    headers: {
    'Content-Type': 'application/json'
  },
    }).then((response) => {

  });
});
