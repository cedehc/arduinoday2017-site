var $contactForm = $('#contact-form');
$contactForm.validate({
  submitHandler: function(form) {
    $.ajax({
      url: form.action,
      method: form.method,
      data: $(form).serialize(),
      dataType: 'json',
      beforeSend: function() {
        $contactForm.find('ul.actions').append('<li class="loading">Sending message&hellip;</li>');
      },
      success: function(data) {
        $contactForm.find('li.loading').hide();
        $contactForm.find('ul.actions').append('<li class="valid">Message sent!</li>');
        $contactForm.find('li.valid').fadeOut(3000);
        $contactForm[0].reset();
      },
      error: function(err) {
        $contactForm.find('li.loading').hide();
        $contactForm.find('ul.actions').append('<li class="error">Oops, there was an error.</li>');
      }
    });
  }
});
