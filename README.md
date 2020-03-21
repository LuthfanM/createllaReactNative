# createllaReactNative
this application is created as test from creatella to become React / React Native Developer

Server to get API, instruction, etc can be downloaded from : https://drive.google.com/open?id=0B1lvgBSvt9g2X0phd0NseGFQMnM

Feature :
- Search by face
- Filter by price, id, date
- Loading when fecth data and new data
- Ads after 20 products
- Display end of catalogue when there is no more data that can be fetch from back end

Project Screenshoot can be viewed in screenshoot folder

# How To Run
To run this project :

Download platform-tools to help run the project :

https://drive.google.com/open?id=1LLHL-6piEgV_QtKLtzFZnyyAlqu2eIJ-

Download android+ios folder to help run the project :

https://drive.google.com/open?id=1uf4M-bRX6CsakSaeUl14HoX2i3c4jQa2

put folder android and ios in project directory

Command to run in project directory :

cd D:\createllas 

npm install

cd android && gradlew clean && cd .. && react-native run-android  

npm start

Command to run in platform tools :

cd C:\platform-tools

adb reverse tcp:3000 tcp:3000 (for server)

adb reverse tcp:8081 tcp:8081 (for device)

=====================

Version
npm : 6.13.4
react-native: 0.61.5

=====================

Hope this help.
Thank you
- Luthfan M
mursyidanluthfan@gmail.com


is flatlist considered as package or plugin? This comes from react-native itself though.
