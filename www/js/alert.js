class Alert {

  getNumberOfAlerts(userId)
  {
    $.post(
      // "http://localhost:8000/alert/number/" +userId,
      "http://www.geolocserver.vincentlagache.com/alert/number/" +userId,
      function(data)
      {
        $('#nbOfAlerts').text(data['nbOfAlerts']);
        if (data['nbOfAlerts'] != 0 )
        {
          document.getElementById('alerts').style.display = 'block';
        } else {
          document.getElementById('alerts').style.display = 'none';
        }
      },
      'json'
    );
  }
  displayAlerts(userId)

  // "http://localhost:8000/alert/display/" +userId+ "#listAlerts"
  {
    $allAlerts.load("http://www.geolocserver.vincentlagache.com/alert/display/" + userId + "#listAlerts")
  }
}
