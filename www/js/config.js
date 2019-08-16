
// ********************  Inscription + Connexion FORM ********************

var $connexionForm = $('#connexionForm');
    $inscriptionForm = $('#inscriptionForm');
    $nameIns = $('#nameIns'),
    $mailCo = $('#mailCo'),
    $mailIns = $('#mailIns'),
    $passwordCo = $('#passwordCo'), // Password Connexion Form
    $passwordIns = $('#passwordIns'), // Password Inscription Form
    $confirmation = $('#confirmation'),
    $submitCo = $('#submitCo'), // Button submit Connexion
    $submitIns = $('#submitIns'), // Button submit Inscription
    $errorIns = $('#errorFormIns'),
    $errorCo = $('#errorFormCo');

var $userId;
var $tokenApi;

// ********************  USER ********************
var $allNotifications = $('#allNotifications');
    $allAlerts = $('#allAlerts');
// ********************  COMPTE ********************
var $accountName = $('#accountName');
    $accountMail = $('#accountMail');
    $accountInscriptionDate = $('#accountInscriptionDate');
    $newMail = $('#newMail');
    $changeMailButton = $('#changeMailButton');
    $errorChangeMail = $('#errorChangeMail');
    $errorChangePassword = $('#errorChangePassword');
    $oldPassword = $('#oldPassword');
    $newPassword = $('#newPassword');
    $changePasswordButton = $('#changePasswordButton');
// ********************  Activity ********************
var $infosActivity = $('#infoActivity');
    $errorGeolocation = $('#errorGeolocation');
    $infosAboutApp = $('#infosAboutApp');
    $noFriendsOrTeamLink = $('.noFriendsOrTeamLink');

// ********************  GROUP ********************
var $addFriendForm = $('#addFriendForm');
    $allListTeam = $('#allListTeam');
    $selectListTeam = $('.team-select');
    $addFriend = $('.addFriend');
    $mailFriend = $('#mailFriend')
    $deleteFriend = $('.imgDelete');
    $errorAddUser = $('#errorAddUser');
    $createTeam = $('#createTeam');
    $nameNewTeam = $('#nameNewTeam');
    $errorNewTeam = $('#errorNewTeam');
