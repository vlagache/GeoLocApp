function clearError(errorDiv)
{
  setTimeout(function(){
    errorDiv.text('');
  },4000);
}

function updateAllListTeams(myId)
{
  $allListTeam.load("http://www.geolocserver.vincentlagache.com/team/"+ $userId + " #listTeams " , e => {
    $deleteFriend = $('.imgDelete');
    resetEvent(myId); // Active les listeners des icones de suppression.
  });
  updateAllNameTeams();
}
function updateAllNameTeams()
{
  $selectListTeam.load("http://www.geolocserver.vincentlagache.com/team/" + $userId + "option" )
}

function createNewTeam(userId)
{
  if($nameNewTeam.val() == "")
  {
    $errorNewTeam.text("Le nom de l'equipe n'est indiqué");
    clearError($errorNewTeam);
  } else
  {
    $.post(
        'http://www.geolocserver.vincentlagache.com/team/create/' +userId,
        {
          nameTeam : $nameNewTeam.val(),
        },
        function(data){
          if ( data['result'] == 'AlreadyTeamWithSameName')
          {
            $errorNewTeam.text("Vous avez déja une équipe avec le meme nom");
            clearError($errorNewTeam);
          } else if ( data['result'] == 'newTeamCreate')
          {
            updateAllListTeams(userId);
            $nameNewTeam.val("");
          }
        },
        'json'
    );
  }
}

function resetEvent(myId)
{
  stopEvent();
  $deleteFriend.tap(function(){
    let idTeam = $(this).attr('id').split('-')[1];
    let idUser = $(this).attr('id').split('-')[2];
    $.post(
        // 'http://localhost:8000/team/'+ idTeam + '/deleteuser',
        'http://www.geolocserver.vincentlagache.com/team/'+ idTeam + '/deleteuser',
        {
          idUser : idUser,
        },
        function(data){
          if ( data['result'] == 'removeUser')
          {
            $('#deleteLine-'+ idTeam +'-' +idUser).remove();
            $addFriendForm[0].reset();
            if( idUser == myId)
            {
              updateAllListTeams(myId);
            }
          }
        },
        'json'
    );
  });
}
function stopEvent()
{
  $deleteFriend.off('tap');
}

function addFriend(myId)
{
    if($mailFriend.val() == "" || $selectListTeam.val() == "")
    {
      $errorAddUser.text('Tous les champs ne sont pas remplis');
      clearError($errorAddUser);
    } else {
      $.post(
          // 'http://localhost:8000/team/'+ $selectListTeam.val() + '/adduser',
          'http://www.geolocserver.vincentlagache.com/team/'+ $selectListTeam.val() + '/adduser',
          {
            mail : $mailFriend.val(),
            invitFrom : myId
          },
          function(data){
            if(data['result'] == 'userAlreadyInTeam')
            {
              $errorAddUser.text("Cette personne est déja dans l'équipe");
              clearError($errorAddUser);
            } else if ( data['result'] == 'unknownUser')
            {
              $errorAddUser.text("Cette personne n'est pas inscrite . Une invitation par mail va lui etre envoyé");
              clearError($errorAddUser);
            } else if ( data['result'] == 'addUser')
            {
              //
              let html = "";
              html += "<tr id='deleteLine-"+ data['idTeam'] + "-"+data['idUser']+"'>";
              html += "<td class='user'>"+ data['name'] +"</td>";
              html += "<td class='cross'><img src='img/delete_min.png' id='deleteFriend-"+ data['idTeam'] +"-"+ data['idUser'] +"' class='imgDelete'/> </td>";
              html += "</tr>";
              $('#team'+ data['idTeam']).append(html);
              $deleteFriend = $('.imgDelete');
              resetEvent(myId);
              $addFriendForm[0].reset();
            } else
            {
              $errorAddUser.text("Cette équipe n'existe pas");
              clearError($errorAddUser);
            }
            //
          },
          'json'
      );
  }
}
