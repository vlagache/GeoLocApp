# GeoLocApp
Application Cordova P5
Partie Client de l'application GeoLoc - Cordova 9.0.0 - Android
*******************

__Déploiement__

- Installer les fichiers requis pour le dévéloppement d'une application Cordova Android : https://cordova.apache.org/docs/en/latest/guide/platforms/android/index.html#requirements-and-support
- Installer la CLI Cordova : https://cordova.apache.org/docs/en/latest/guide/cli/index.html
- ```
git clone https://github.com/vlagache/GeoLocApp.git
```
- Créer un projet Firebase & ajouter le fichier de configuration google-services.json à la racine du projet (https://firebase.google.com/docs/android/setup )
- Aprés un git clone pour faire fonctionner l'app sur Android

```
cordova platform add android
cordova build android
```
- le fichier .apk permettant l'installation de l'application sur votre mobile se trouve ici :
_\platforms\android\app\build\outputs\apk\debug_

*******************

__cordov build android__ rajoute par default des splash screens dans

_platforms\android\app\src\main\res_

pour ajouter un splashscreen perso et ecraser ceux par défaut :
- créer un fichier .png dans res/screen/android/img.png
- modifier config.xml
```
<platform name="android">
    <allow-intent href="market:*" />
    <splash src="res/screen/android/customSplashScreen.png"/>
</platform>
```
- cordova build android
