# GeoLocApp
Application Cordova P5

Aprés un git clone pour faire fonctionner l'ap sur Android  

```
cordova platform add android
cordova build android
```


__cordova__ build android rajoute par default des splash screens dans

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
