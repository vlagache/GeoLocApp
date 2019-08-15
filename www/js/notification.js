class Notification {

  getNumberOfNotifications(userId)
  {
    $.post(
      // "http://localhost:8000/notification/number/" +userId,
      "http://www.geolocserver.vincentlagache.com/notification/number/" +userId,
      function(data)
      {
        $('#nbOfNonReadNotifications').text(data['nbOfNonReadNotifications']);
      },
      'json'
    );
  }
  displayNotification(userId)
  {
    // "http://localhost:8000/notification/display/" + userId + "#listNotifications"
    $allNotifications.load("http://www.geolocserver.vincentlagache.com/notification/display/" + userId + "#listNotifications" )
  }
}
