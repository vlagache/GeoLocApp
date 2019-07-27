
$receiveToken.tap(function(e){
  $firebaseToken.val($device.getToken());
  alert($device.getToken());
  navigator.vibrate([3000]);
});


$receiveNotif.tap(function(e){
  notificationOpen();
});




function notificationOpen()
{
  window.FirebasePlugin.onNotificationOpen(function(notification) {
      alert(JSON.stringify(notification));
  }, function(error) {
      alert(error);
  });
}
