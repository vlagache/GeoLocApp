class Device {

  getToken(userId)
  {
    window.FirebasePlugin.getToken(function(token) {
        // save this server-side and use it to push notifications to this device
        $.post(
          // 'http://localhost:8000/device/' +userId,
          'http://www.geolocserver.vincentlagache.com/device/' +userId,
          {
            token : token
          },
          function(data)
          {
            //
          },
          'json'
        );

    }, function(error) {
      alert(error);
    });
  }

  getTokenAfterReinstall(userId)
  {
    window.FirebasePlugin.getToken(function(token) {
        // save this server-side and use it to push notifications to this device
        $.post(
          // 'http://localhost:8000/device/' +userId,
          'http://www.geolocserver.vincentlagache.com/device/checktoken/' +userId,
          {
            token : token
          },
          function(data)
          {
            //
          },
          'json'
        );

    }, function(error) {
      alert(error);
    });
  }

}
