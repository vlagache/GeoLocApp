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

function activePage()
{
  var activePage = $(":mobile-pagecontainer").pagecontainer("getActivePage")[0].id ;
  return activePage;
}
function onDeviceReady() {

  // ********************  Anim HOME JQUERY ********************
    function blinkLogo()
    {
        $('#logo').fadeOut(900).delay(300).fadeIn(800);

    }

    setInterval(blinkLogo,4000);

    $('#linksIndex').hide().delay(4000).fadeIn(1000);

  // ********************  Inscription + Connexion FORM ********************
    var $nameIns = $('#nameIns'),
        $mailCo = $('#mailCo'),
        $mailIns = $('#mailIns'),
        $passwordCo = $('#passwordCo'), // Password Connexion Form
        $passwordIns = $('#passwordIns'), // Password Inscription Form
        $confirmation = $('#confirmation'),
        $submitCo = $('#submitCo'), // Button submit Connexion
        $submitIns = $('#submitIns'), // Button submit Inscription
        $errorIns = $('#errorFormIns'),
        $errorCo = $('#errorFormCo');

    var $userId;

// ************ Inscription Form  ****************** //
    $submitIns.tap(function(e){
      if($nameIns.val() == "" || $mailIns.val() == "" || $passwordIns.val() == "" || $confirmation.val() == "" )
      {
        $errorIns.text('Tous les champs ne sont pas remplis');
      } else if ($confirmation.val() != $passwordIns.val()) {
        $errorIns.text('Mots de passe differents !');
      } else {
        $.post(
            'http://localhost:8000/inscription',
            // 'http://www.geolocserver.vincentlagache.com/inscription',
          {
            name : $nameIns.val(),
            mail : $mailIns.val(),
            password : $passwordIns.val()
          },
          function(data){
              if ( data['result'] == 'Success')
              {
                  $.mobile.navigate("#user");
                  $mailIns.val("");
                  $passwordIns.val("");
                  $errorIns.text("");
                  var $userId = data['userId'];
                  $('#userName').text("Bonjour " + $nameIns.val());
              } else if ( data['result'] == 'WrongMail'){
                $errorIns.text('Un compte est déja lié à cet email');
                setTimeout(function(){
                  $errorCo.text('');
                },4000);
              } else {
                $errorIns.text('Echec lors de la création du compte');
                setTimeout(function(){
                  $errorIns.text('');
                },4000);
              }
          },
          'json'

        );
      }
    });
// ************ Connexion Form  ****************** //
$submitCo.tap(function(e){
  if($mailCo.val() == "" || $passwordCo.val() == "")
  {
    $errorCo.text('Tous les champs ne sont pas remplis');
  } else {
    $.post(
        'http://localhost:8000/connexion',
        // 'http://www.geolocserver.vincentlagache.com/connexion',
        {
          mail : $mailCo.val(),
          password : $passwordCo.val()
        },
        function(data){
          if(data['result'] == 'Success')
          {
            $.mobile.navigate("#user");
            $mailCo.val("");
            $passwordCo.val("");
            $errorCo.text("");
            $userId = data['userId'];
            $('#userName').text("Bonjour " + data['name']);
          } else if (data['result'] == 'WrongPassword') {
            $errorCo.text('Mauvais mot de passe');
            setTimeout(function(){
              $errorCo.text('');
            },4000);
          } else {
            $errorCo.text('Mauvaise adresse email');
            setTimeout(function(){
              $errorCo.text('');
            },4000);
          }
        },
        'json'
    );
  }
});
// ******************** USER ********************
    $('#locationImg').tap(function(e){
      $.mobile.navigate("#activity");

    });
    $('#groupImg').tap(function(e){
      $.mobile.navigate("#group");

    });
    $('#compteImg').tap(function(e){
      // $.mobile.changePage("compte.html");
      $.mobile.navigate("#compte");

    });
    $('.arrowImg').tap(function(e){
      $.mobile.navigate("#user");
    });
// ******************** ACTIVITY ********************
  var $infosActivity = $('#infoActivity');

  $('#startImg').tap(function(e){
    console.log("http://localhost:8000/activity/start/"+$userId);
    $.post(
        'http://localhost:8000/activity/start/'+$userId,
        // 'http://www.geolocserver.vincentlagache.com/connexion',
        function(data){
          if(data['result'] == 'startActivity')
          {
            $infosActivity.text('Activité démarré ( clignotte ? )');
          } else {
            $infosActivity.text('Une activité existe deja pour cet utilisateur');
          }
        },
        'json'
    );
  });

  $('#pauseImg').tap(function(e){
    console.log("http://localhost:8000/activity/stop/"+$userId);
    $infosActivity.text('Activité stoppé')
  });

}
