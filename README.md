# <p align="center">GeoLocApp</p>

<div align="center">
  <img src="/assets/geoloc_logo.png" alt="logo" style="height: 60px;"/>
</div>

## Context

In 2018, I knew nothing about computer development and started [a training course to learn web developer](https://openclassrooms.com/fr/paths/48-developpeur-web-junior). There were several projects to hand in and defend in front of a jury. This was the final project that was supposed to show everything I had learned during the course.


## Project

The subject of the project was entirely open-ended, the only constraint being that I had to use the languages I'd learned during the course: PHP, Javascript, SQL, HTML and CSS.

I made a rather daring choice, given my level of knowledge at the time, to try and develop a mobile application. I used [Symfony](https://symfony.com/) for [the server side](https://github.com/vlagache/GeoLocServer) and [Apache Cordova](https://cordova.apache.org/) for the mobile application side.

My idea was to create a mobile application to warn friends and family in the event of a problem during a sports outing. In the event of an alert, the person's position is communicated to their loved ones.

For more information, [click here](https://github.com/vlagache/GeoLocServer)

### Deployment

⚠️ **This is the old documentation I wrote in 2019.**

<details>
  <summary>Click to expand !</summary>

  Installing the files required to develop a Cordova Android application : https://cordova.apache.org/docs/en/latest/guide/platforms/android/index.html#requirements-and-support  
  Installing the Cordova CLI : https://cordova.apache.org/docs/en/latest/guide/cli/index.html

  ```
  git clone https://github.com/vlagache/GeoLocApp.git
  ```

  Create a Firebase project & add the google-services.json configuration file to the project root (https://firebase.google.com/docs/android/setup)

  ```
  cordova platform add android
  cordova build android
  ```
  the .apk file for installing the application on your mobile can be found here : `\platforms\android\app\build\outputs\apk\debug`

  ### Splash Screen

  `cordova build android` adds splash screens by default in `platforms\android\app\src\main\res`

  to add a custom splashscreen and overwrite the default ones : create a .png file in `res/screen/android/img.png` and  modify `config.xml`

  ```
    <platform name="android">
        <allow-intent href="market:*" />
        <splash src="res/screen/android/customSplashScreen.png"/>
    </platform>
  ```

</details>
