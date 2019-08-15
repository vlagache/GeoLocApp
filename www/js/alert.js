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

  {
    $.post(
          // "http://localhost:8000/alert/display/" +userId,
          "http://www.geolocserver.vincentlagache.com/alert/display/" +userId,
          function(data)
          {
            //
            // let eltMap = $("<a href='#map' id='mapLink'>Voir sur une carte</a>");
            // $('#listAlerts').append(eltMap);
            let locations = [];

            for(var activity in data) // Pour chacune des activités dans alertes
            {


              let eltActivity = $("<div class='activityOf'></div>");
              eltActivity.text(activity);
              $('#listAlerts').append(eltActivity);


              let eltAlertContent = $("<div class='alertContent'></div>");
              $('#listAlerts').append(eltAlertContent);


              data[activity].forEach(function(alert){
                 let eltAlert = $("<p class='alert'></p>");
                 eltAlert.append(" Date :  " + alert['datetime'] + " </br> Addresse : " + alert['location'] + "</br> GPS : " +alert['latitude'] + "(lat)/" + alert['longitude'] +"(lng)");

                 eltAlertContent.append(eltAlert);


                 var location = ['Blabla' , alert['latitude'] , alert['longitude']];
                 locations.push(location);



              }) // End Foreach
            } // end For
          },
          'json'
        );
  }
}
