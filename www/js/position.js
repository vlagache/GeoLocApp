// var intervalLocation;
// var options = {
//   enableHighAccuracy: true,
//   timeout: 10000,
//   maximumAge: 0
// }
//
// function error(err)
// {
//   console.warn(`ERREUR (${err.code}): ${err.message}`);
// }
//
// function startLocation(userId)
// {
//   navigator.geolocation.getCurrentPosition((position) => {
//     intervalLocation = setInterval( () => {
//       $.post(
//         'http://localhost:8000/position/' +userId,
//         // 'http://www.geolocserver.vincentlagache.com/position/' +userId,
//         {
//           latitude : position.coords.latitude,
//           longitude  : position.coords.longitude
//         },
//         function(data)
//         {
//           if(data['result'] == 'PositionSave')
//           {
//             console.log("Position Sauvegardé BDD");
//           }
//         },
//         'json'
//       );
//     },5000)
//   }
//   ,error,options);
// }
// function pauseLocation()
// {
//   clearInterval(intervalLocation);
// }


class GeoLoc {

  constructor()
  {
    this.options = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0
    };
    this.interval;
  }

  error(err)
  {
    console.warn(`ERREUR (${err.code}): ${err.message}`);
  }
  success(position)
  {
    console.log("Latitude : " +position.coords.latitude);
    console.log("Longitude : " +position.coords.longitude);
  }
  sendPosition(userId)
  {
    // Envoyer la position actuelle
    navigator.geolocation.getCurrentPosition(
      (position) => {
          $.post(
            'http://www.geolocserver.vincentlagache.com/position/' +userId,
            {
              latitude : position.coords.latitude,
              longitude  : position.coords.longitude
            },
            function(data)
            {
              if(data['result'] == 'PositionSave')
              {
                console.log("Position Sauvegardé BDD");
              } else {
                console.log("Immobile");
              }
            },
            'json'
          );
    },
      (err) => {
      this.error(err)

      if ( err = 1 ) // PERMISSION_DENIED
      {
        $infosActivity.text("");
        $errorGeolocation.text(" ATTENTION : Vous n'avez pas autorisé la géolocation . Veuillez relancez l'activité en autorisant l'application à accéder à la position de votre téléphone");
        $.post(
            // 'http://localhost:8000/activity/delete/'+userId,
            // 'http://localhost:8000/activity/delete/1',
            'http://www.geolocserver.vincentlagache.com/activity/delete/'+userId,
            'json'
        );
      }
    },
    this.options)
  }

  sendPositions(userId)
  {
    this.sendPosition(userId); // Envoyer la position au démarrage , puis tous les x millisecondes
    this.interval = setInterval ( () => {
      this.sendPosition(userId);
    },120000)
  }

  pause(userId)
  {
    let myobj = this;
    $.post(
      // 'http://localhost:8000/activity/pause/' +userId,
      'http://www.geolocserver.vincentlagache.com/activity/pause/' +userId,
      function(data)
      {
        if(data['result'] == 'activityDoesntExist')
        $infosActivity.text('Vous n\'avez lancé aucune activité');
        else if (data['result'] == 'pauseActivity')
        {
          clearInterval(myobj.interval);
          $infosActivity.text('Activité en pause');
        }
      },
      'json'
    );
  }

  restart(userId)
  {
    this.interval = setInterval ( () => {
      this.sendPosition(userId);
    },120000)
  }
  stop()
  {
    clearInterval(this.interval);
  }
}
