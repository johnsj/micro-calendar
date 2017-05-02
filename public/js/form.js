var template = $('#newLineTemplate').html();

$('button.btnNewLine').click(function(e) {
  e.preventDefault();
  $(this).siblings('.lineItems').append(template);
});
