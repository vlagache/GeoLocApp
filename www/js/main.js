$(document).ready(function(){
  $('#testJquery').html('<p>Jquery fonctionne !</p>')

  var $mail = $('#mail'),
      $password = $('#password'),
      $submit = $('#submit');


    // $(document).on('click', '#submit', function(){
    //   var login = $('#login').val();
    //   console.log(login);
    //   $('#resultForm').html(login);
    // });


    $submit.click(function(e){
      e.preventDefault();
      var mail = $mail.val();
      console.log(mail);
      $('#resultForm').text(mail);
  });

});
