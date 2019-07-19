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

// ************ Inscription Form  ****************** //
    $submitIns.tap(function(e){
      if($nameIns.val() == "" || $mailIns.val() == "" || $passwordIns.val() == "" || $confirmation.val() == "" )
      {
        $errorIns.text('Tous les champs ne sont pas remplis');
      } else if ($confirmation.val() != $passwordIns.val()) {
        $errorIns.text('Mots de passe differents !');
      } else {
        $.post(
            // 'http://localhost:8000/inscription',
            'http://www.geolocserver.vincentlagache.com/inscription',
          {
            name : $nameIns.val(),
            mail : $mailIns.val(),
            password : $passwordIns.val()
          },
          function(data){
              if ( data['result'] == 'Success')
              {
                  $.mobile.navigate("#user");
                  $errorIns.text("");
                  $inscriptionForm[0].reset();
                  $userId = data['userId'];
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
        // 'http://localhost:8000/connexion',
        'http://www.geolocserver.vincentlagache.com/connexion',
        {
          mail : $mailCo.val(),
          password : $passwordCo.val()
        },
        function(data){
          if(data['result'] == 'Success')
          {
            $.mobile.navigate("#user");
            $errorCo.text("");
            $connexionForm[0].reset();
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
      updateAllListTeams($userId);
    });
    $('#compteImg').tap(function(e){
      $.mobile.navigate("#compte");

    });
    $('.arrowImg').tap(function(e){
        setTimeout( () => {
          $infosActivity.text("");
          $errorAddUser.text("");
          $infosAboutApp.text("");
        },500)
      $.mobile.navigate("#user");
    });
// ******************** ACTIVITY ********************
 $loc = new GeoLoc();

  $('#startImg').tap(function(e){
    $infosAboutApp.text("");
    $infosActivity.text("");
    $.post(
        // 'http://localhost:8000/activity/start/'+$userId,
        // 'http://localhost:8000/activity/start/1',
        'http://www.geolocserver.vincentlagache.com/activity/start/' +$userId,
        function(data){
          if(data['result'] == 'startActivity')
          {
            $infosActivity.text('Activité en cours');
            $loc.start($userId);
          } else if (data['result'] == 'activityExist')
          {
            $infosActivity.text('Activité en cours');
            $loc.start($userId);
          } else if ( data['result'] == 'userHaveNoTeam')
          {
            let html = "Vous n'avez aucune équipe . Le but de cette application est d'alerter vos proches . Vous pouvez créer une équipe ici : <a href='#group' class='noFriendsOrTeamLink'> Groupes </a>"
            $infosActivity.append(html);

            $noFriendsOrTeamLink = $('.noFriendsOrTeamLink');

            $noFriendsOrTeamLink.tap(function(e){
              updateAllListTeams($userId);
            });

          } else if ( data['result'] == 'noFriendInYourTeam')
          {
            let html = "Vous n'avez ajouté aucun amis dans vos équipes . Le but de cette application est d'alerter vos proches . Vous pouvez ajouter des amis ici : <a href='#group' class='noFriendsOrTeamLink'> Groupes </a>"
            $infosActivity.append(html);

            $noFriendsOrTeamLink = $('.noFriendsOrTeamLink');

            $noFriendsOrTeamLink.tap(function(e){
              updateAllListTeams($userId);
            });
          }
        },
        'json'
    );
  });




  $('#pauseImg').tap(function(e){
    $infosActivity.text("");
    $infosAboutApp.text("");
    $loc.pause($userId);
  });

  $('#stopImg').tap(function(e){
    $infosAboutApp.text("");
    $infosActivity.text("");
    $.post(
        // 'http://localhost:8000/activity/delete/'+$userId,
        // 'http://localhost:8000/activity/delete/1',
        'http://www.geolocserver.vincentlagache.com/activity/delete/'+$userId,
        function(data){
          if(data['result'] == 'deleteActivity')
          {
            $infosActivity.text('Arret de l\'activité');
            $infosAboutApp.text('Toutes les informations enregistrées pendant votre activité sur votre localisation géographique sont définitivement supprimés de nos serveurs lorsque vous arretez une activité');
          } else if (data['result'] == 'activityDoesntExist') {
            $infosActivity.text('Vous n\'avez lancé aucune activité');
          }
        },
        'json'
    );
  });

  // ******************** GROUP ********************

      $addFriend.tap(function(e){
        addFriend($userId);
      });

      $createTeam.tap(function(e){
        createNewTeam($userId);
      });


}
