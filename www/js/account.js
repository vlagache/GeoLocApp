class Account
{

  getInfos(userId)
  {
    $.post(
      // "http://localhost:8000/account/" +userId,
      "http://www.geolocserver.vincentlagache.com/account/" +userId,
      function(data)
      {
        $accountName.text(data['accountName']);
        $accountMail.text(data['accountMail']);
        $accountInscriptionDate.text(data['accountInscriptionDate']);
      },
      'json'
    );
  }
  changeMail(userId)
  {
    if($newMail.val() == "")
    {
      $errorChangeMail.text("Le mail n'est pas indiqué");
      clearError($errorChangeMail);
    } else {
      $.post(
          // 'http://localhost:8000/account/changemail/' +userId,
          'http://www.geolocserver.vincentlagache.com/account/changemail/' +userId,
          {
            newMail : $newMail.val(),
          },
          function(data){
              if(data['result'] == 'sameMail')
              {
                $errorChangeMail.text("Vous avez deja cette adresse email");
                clearError($errorChangeMail);
              } else if(data['result'] == 'mailChange')
              {
                $accountMail.text($newMail.val())
                $newMail.val("");
              }
            },
          'json'
        );
    }
  }
  changePassword(userId)
  {

    if($oldPassword.val() == "" || $newPassword.val() == "")
    {
      $errorChangePassword.text("Tous les champs ne sont pas remplis");
      clearError($errorChangePassword);
    } else {
      $.post(
          // 'http://localhost:8000/account/changepassword/' +userId,
          'http://www.geolocserver.vincentlagache.com/account/changepassword/' +userId,
          {
            oldPassword : $oldPassword.val(),
            newPassword : $newPassword.val()
          },
          function(data){
              if(data['result'] == 'wrongOldPassword')
              {
                $errorChangePassword.text("L'ancien mot de passe n'est pas le bon");
                clearError($errorChangePassword);
              } else if (data['result'] == 'passwordChange')
              {
                $errorChangePassword.text("Votre mot de passe à bien été modifié");
                clearError($errorChangePassword);
                $oldPassword.val("");
                $newPassword.val("");
              }
            },
          'json'
        );
    }
  }
  deleteAccount(userId)
  {
    $.post(
        // 'http://localhost:8000/account/delete/' +userId,
        'http://www.geolocserver.vincentlagache.com/account/delete/' +userId,
        function(data){
            if(data['result'] == 'accountDelete')
            {
                $.mobile.navigate("#inscription");
            }
          },
        'json'
      );
  }
}
