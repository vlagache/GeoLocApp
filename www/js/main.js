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

  $device = new Device();
  $loc = new GeoLoc();
  $notification = new Notification();
  $account = new Account();
  $alert = new Alert();



  // ********************  Anim HOME JQUERY ********************
    function ajaxSetupHeader(token)
    {
      $.ajaxSetup({
        headers: {'X-AUTH-TOKEN' : token},
      });
    }

    function blinkLogo()
    {
        $('#logo').fadeOut(900).delay(300).fadeIn(800);

    }

    setInterval(blinkLogo,4000);

    $('#linksIndex').hide().delay(4000).fadeIn(1000);

// ************ Inscription Form  ****************** //



    // $listener = new Listener();
    // $listener.submit()
    //
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
                  $('#userName').text("Bonjour " + $nameIns.val());
                  $errorIns.text("");
                  $inscriptionForm[0].reset();
                  $userId = data['userId'];
                  $apiToken = data['apiToken'];
                  ajaxSetupHeader($apiToken);
                  $notification.getNumberOfNotifications($userId);
                  $alert.getNumberOfAlerts($userId);
                  $device.getToken($userId); // On envoie le token firebase lié a l'utilisateur.
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
            $apiToken = data['apiToken'];
            ajaxSetupHeader($apiToken); 
            $('#userName').text("Bonjour " + data['name']);
            $notification.getNumberOfNotifications($userId);
            $alert.getNumberOfAlerts($userId);
            $device.getTokenAfterReinstall($userId); // On verifie si il y'a besoin d'enregistrer un nouveau token en cas de reinstallation
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

    $('#notificationImg').tap(function(e){
      $notification.displayNotification($userId);
      $.mobile.navigate("#notification");
    });
    $('#alertImg').tap(function(e){
      $alert.displayAlerts($userId);
      $.mobile.navigate("#alert");
    })
    $('#locationImg').tap(function(e){
      $.mobile.navigate("#activity");
    });
    $('#groupImg').tap(function(e){
      $.mobile.navigate("#group");
      updateAllListTeams($userId);
    });
    $('#compteImg').tap(function(e){
      $account.getInfos($userId);
      $.mobile.navigate("#compte");
      // Chargement des infos sur le compte

    });
    $('.arrowImg').tap(function(e){
      $notification.getNumberOfNotifications($userId);
      $notification.displayNotification($userId);
      $alert.getNumberOfAlerts($userId);
        setTimeout( () => {
          $infosActivity.text("");
          $errorAddUser.text("");
          $infosAboutApp.text("");
          $errorGeolocation.text("");
          $('#listAlerts').text("");
        },500)
      $.mobile.navigate("#user");
    });
// ******************** ACTIVITY ********************

  $('#startImg').tap(function(e){
    $infosAboutApp.text("");
    $infosActivity.text("");
    $errorGeolocation.text("");
    $.post(
        'http://www.geolocserver.vincentlagache.com/activity/start/' +$userId,
        function(data){
          if(data['result'] == 'startActivity')
          {
            $infosActivity.text('Activité en cours');
            $loc.sendPositions($userId);
          } else if (data['result'] == 'activityExist')
          {
            $infosActivity.text('Activité en cours');
            // $loc.sendPositions($userId);
          } else if ( data['result'] == 'activityRestart')
          {
            $infosActivity.text('Reprise de l\'activité');
            $loc.restart($userId);
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
    $errorGeolocation.text("");
    $infosAboutApp.text("");
    $loc.pause($userId);
  });

  $('#stopImg').tap(function(e){
    $infosAboutApp.text("");
    $errorGeolocation.text("");
    $infosActivity.text("");
    $.post(
        'http://www.geolocserver.vincentlagache.com/activity/delete/'+$userId,
        function(data){
          if(data['result'] == 'deleteActivity')
          {
            $infosActivity.text('Arret de l\'activité');
            $infosAboutApp.text('Toutes les informations enregistrées pendant votre activité sur votre localisation géographique sont définitivement supprimés de nos serveurs lorsque vous arretez une activité');
            $loc.stop();
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

// ******************** ACCOUNT ********************
    $changeMailButton.tap(function(e){
      $account.changeMail($userId);
    });

    $changePasswordButton.tap(function(e){
      $account.changePassword($userId);
    });

    $('#deleteAccImg').tap(function(e){
      $account.deleteAccount($userId);
    });


    // $.ajaxSetup({
    //   headers: {'X-AUTH-TOKEN' : 'BLABLA'},
    // });

    $('#apiToken').tap(function(e){

      $.ajax({
          url: "http://localhost:8000/header",
          headers: { 'X-AUTH-TOKEN' : 'BLABLA' },
        }).done(function(data) {
             $('#load').html(data);
       });
      // 1
      // $('#load').load("http://localhost:8000/load");
      // 2
      // $.post(
      //     'http://localhost:8000/header',
      //     function(data){
      //       console.log(data);
      //     },
      //     'json'
      // );
      // 3
      // $.ajax({
      //    url : 'http://localhost:8000/header',
      //    headers: { 'X-AUTH-TOKEN' : 'BLABLA' },
      //    type : 'POST',
      //    data: les données qu'on envoie
      //    dataType : 'json', // On désire recevoir du HTML
      //    success : function(data){ // code_html contient le HTML renvoyé
      //      console.log(data);
      //    }
      // });

    });

}
