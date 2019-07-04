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
  start(userId)
  {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.interval = setInterval( () => {
          $.post(
            'http://localhost:8000/position/' +userId,
            // 'http://www.geolocserver.vincentlagache.com/position/' +userId,
            {
              latitude : position.coords.latitude,
              longitude  : position.coords.longitude
            },
            function(data)
            {
              if(data['result'] == 'PositionSave')
              {
                console.log("Position Sauvegardé BDD");
              }
            },
            'json'
          );
        },5000)
    },
      (err) => {
      this.error(err)
    },
    this.options)
  }
  pause()
  {
    let myobj = this;
    clearInterval(myobj.interval);
  }
}