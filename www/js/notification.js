class Notification {

  getNumberOfNotifications(userId)
  {
    $.post(
      // 'http://localhost:8000/notification/number/' +userId,
      'http://www.geolocserver.vincentlagache.com/notification/number/' +userId,
      function(data)
      {
        $('#nbOfNotifications').text(data['nbOfNotifications']);
      },
      'json'
    );
  }
}
