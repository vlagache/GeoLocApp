var $firebaseToken = $('#firebaseToken');
    $receiveToken = $('#receiveToken');
    $receiveNotif = $('#receiveNotif');



$receiveToken.tap(function(e){
  getToken();
});


$receiveNotif.tap(function(e){
  notificationOpen();
});

function getToken()
{
  window.FirebasePlugin.getToken(function(token) {
      // save this server-side and use it to push notifications to this device
      $firebaseToken.val(token);
  }, function(error) {
    alert(error);
  });
}


function notificationOpen()
{
  window.FirebasePlugin.onNotificationOpen(function(notification) {
      alert(JSON.stringify(notification));
  }, function(error) {
      alert(error);
  });
}
