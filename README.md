# SismicReport 

Progetto per la realizzazione di reportistica Sismic


Fix grunt serve problem
http://stackoverflow.com/questions/30853177/ionic-cli-exiting-after-grunt-serve

> npm install grunt-concurrent@1.0.0 --save-dev


Update Ionic CLI
> npm install -g ionic



# Autenticazione 
authService.js

AuthService esegue le chiamate a login logout isAuthenticated isAuthorized con un Service
Session un service che memorizza le info di sessione



loginController.js

chiama AuthService.login e manda un broadcast di success o failure con 
	$rootScope.$broadcast(ENV.AUTH_EVENTS.loginSuccess);
    
    $rootScope.$broadcast(ENV.AUTH_EVENTS.loginFailed);

chima AuthService.logout analogo


AppCtrl controllore che sta in attesa degli eventi .on



