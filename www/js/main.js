$(document).ready(function() {
    // Android app or Browser ?
    window.isphone = false;
    if(document.URL.indexOf("http://") === -1
        && document.URL.indexOf("F:/") === -1) {
        window.isphone = true;
    }

    if( window.isphone ) {
        document.addEventListener("deviceready", onDeviceReady, false);
    } else {
        onDeviceReady();
    }
});

function onDeviceReady() {

  // ********************  Anim HOME JQUERY ********************
    function blinkLogo()
    {
        $('#logo').fadeOut(900).delay(300).fadeIn(800);

    }

    setInterval(blinkLogo,4000);

    $('#linksIndex').hide().delay(4000).fadeIn(1000);

  // ********************  Inscription + Connexion FORM ********************
    var $name = $('#name'),
        $mailCo = $('#mailCo'),
        $mailIns = $('#mailIns'),
        $passwordCo = $('#passwordCo'), // Password Connexion Form
        $passwordIns = $('#passwordIns'), // Password Inscription Form
        $confirmation = $('#confirmation'),
        $submitCo = $('#submitCo'), // Button submit Connexion
        $submitIns = $('#submitIns'), // Button submit Inscription
        $errorIns = $('#errorFormIns'),
        $errorCo = $('#errorFormCo');


// ************ Inscription Form  ****************** //
    $submitIns.tap(function(e){
      if($name.val() == "" || $mailIns.val() == "" || $passwordIns.val() == "" || $confirmation.val() == "" )
      {
        $errorIns.text('Tous les champs ne sont pas remplis');
      } else if ($confirmation.val() != $passwordIns.val()) {
        $errorIns.text('Mots de passe differents !');
      } else {
        $.mobile.navigate("#user");
        // Ajax vers le site
        // var mail = $mailIns.val();
        // var password = $passwordIns.val();
      }
    });
// ************ Connexion Form  ****************** //
    $submitCo.tap(function(e){
      if($mailCo.val() == "" || $passwordCo.val() == "")
      {
        $errorCo.text('Tous les champs ne sont pas remplis');
      } else {
        $.mobile.navigate("#user");
        // Ajax vers le site
        // var mail = $mailCo.val();
        // var password = $passwordCo.val();
      }
    });
// ******************** USER ********************
}
