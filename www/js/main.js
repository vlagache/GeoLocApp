document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
      navigator.splashscreen.hide();
}


$(document).ready(function(){


// ********************  Anim HOME ********************
  function blinkLogo()
  {
      $('#logo').fadeOut(900).delay(300).fadeIn(800);
  }

  setInterval(blinkLogo,2200);

  $('#linksIndex').hide().delay(2200).fadeIn(1000);


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
