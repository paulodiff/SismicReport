'use strict';

/* Controllers */

// http://angular-ui.github.io/angular-google-maps

//angular.module('myApp.controllers', [])
angular.module('myApp.controllers')

.controller('MapsController', 
             ['$scope', '$state', '$compile','$location', 'Restangular', 'uiGmapGoogleMapApi', '$filter', 'Session', '$ionicModal','$ionicSideMenuDelegate','$ionicPopover', '$ionicPopup', '$ionicLoading', '$log', '$timeout',
     function( $scope,   $state,   $compile,  $location,    Restangular,  uiGmapGoogleMapApi ,  $filter,   Session,   $ionicModal,  $ionicSideMenuDelegate,    $ionicPopover,  $ionicPopup,    $ionicLoading, $log,   $timeout) {
 


      $scope.staticMarker = [];
      $scope.randomMarkers = [];


      uiGmapGoogleMapApi.then(function(maps) {
        $log.log('uiGmapGoogleMapApi then . ...');


        $scope.map = { center: { latitude: 44.0357100000, longitude: 12.5573200000 }, zoom: 12 };
        $scope.refreshMap();

/*
$scope.randomMarkers = [
        {
          id: 1,
          //icon: 'assets/images/blue_marker.png',
          latitude: 44.0668100000,
          longitude: 12.5173200000,
          showWindow: false,
          options: {
            labelContent: '0152',
            labelAnchor: "22 0",
            labelClass: "marker-labels",
            draggable: false
          }
        },
        {
          id: 2,
          //icon: 'assets/images/blue_marker.png',
          latitude: 44.0768100000,
          longitude: 12.5473200000,
          showWindow: false,
          options: {
            labelContent: '0022',
            labelAnchor: "22 0",
            labelClass: "marker-labels",
            draggable: false
          }
        },
        {
          id: 3,
          //icon: 'assets/images/blue_marker.png',
          latitude: 44.0358300000,
          longitude: 12.5573500000,
          showWindow: false,
          options: {
            labelContent: '0025',
            labelAnchor: "22 0",
            labelClass: "marker-labels",
            draggable: false
          }
        }
        
      ];
*/
/*

        $scope.staticMarker = {
          id: 0,
          title : 'Title',
          coords: {
            latitude: 44.0358300000,
            longitude: 12.5573500000
          },
          options: { 
            draggable: true,
            labelContent: 'Markers id 3',
            labelAnchor: "26 0",
            labelClass: "marker-labels"
          },
          events: {
            dragend: function (marker, eventName, args) {
              $log.log('marker dragend');
              $log.log(marker.getPosition().lat());
              $log.log(marker.getPosition().lng());
            }
          }
        };

*/


      });

      $scope.clickTest = function() {
        alert('Example of infowindow with ng-click')
      };

  $scope.filterCriteria = {
    //pageNumber: 1,
    //count: 0,
    //limit: $scope.pageSize,
    qDateUp: $filter('date')( new Date(2015, 6, 20), "yyyyMMdd"),
    qDateDw: $filter('date')( new Date(2015, 6, 20), "yyyyMMdd"),
    table : 'coord_201507'
    //start: 0,
    //sortDir: 'asc',
    //sortedBy: 'id',
    //id_utenti_selezione : Session.isAdmin ? 0 : Session.id_utenti,
    //mese_selezione : 0,
    //anno_selezione: 0
  };


  

  //The function that is responsible of fetching the result from the server and setting the grid to the new result
  $scope.refreshMap = function () {
      $log.debug('MapsController: fetchResult');
      $log.debug('MapsController: impostazione criteri di filtro');

      var offset_page =  ( $scope.currentPage - 1 ) * $scope.pageSize;
      //$scope.filterCriteria.start = offset_page;
      //$scope.filterCriteria.qDate =$filter('date')($scope.frmData.dateFilter, "yyyyMMdd");

      // build filter criterra

      var fakeToday = new Date();
      fakeToday.setDate(fakeToday.getDate() - 3);

      var yesterday = new Date();
      yesterday.setDate(fakeToday.getDate());      
      yesterday.setMinutes(fakeToday.getMinutes() - 30);

      $scope.filterCriteria.qDateUp = $filter('date')( fakeToday, "yyyyMMdd@HHmmss");
      $scope.filterCriteria.qDateDw = $filter('date')( yesterday, "yyyyMMdd@HHmmss");



       var d1 = fakeToday;
       var n1 = d1.getHours();
       var n2 = '';

       var m1 = d1.getMinutes();
       var m2 = '';

/*
       if (n1 == 0) {
          n2 = 23;
          var yesterday = new Date();
          yesterday.setDate(fakeToday.getDate() - 1);
          $scope.filterCriteria.qDateUp = $filter('date')( yesterday, "yyyyMMdd@HHmmss");
          $scope.filterCriteria.qDateDw = $filter('date')( fakeToday, "yyyyMMdd@HHmmss");
        } else {
          n2 = n1 - 1;
          $scope.filterCriteria.qDateUp = $filter('date')( fakeToday, "yyyyMMdd@HHmmss");
          $scope.filterCriteria.qDateDw = $filter('date')( fakeToday, "yyyyMMdd@HHmmss");
        }
*/

      $log.debug($scope.filterCriteria);

      $log.debug('MapsController...fetchResult - GET Count');
    



      var serviziList = Restangular.all('getPosizioni');
      
      // Get items ...  
      $log.debug('MapsController...fetchResult - GET data');
      //$scope.filterCriteria.count = 0; // imposta la selezione standard sul server
      $ionicLoading.show({template: 'Dati in arrivo!' });
      return serviziList.getList($scope.filterCriteria).then(function(data) {
               //$log.debug(data);
          
                var fast_array = [];
                var iteratorId = 1;
          
                //loop per modificare e preparare i dati in arrivo

                $log.debug('MapsController .. preparing data... to view');
                data.forEach(function (idata) {
                    //$log.debug(idata);
                    //$scope.items.push(idata);
                    //if(idata.annullato_servizi == 1) idata.image_class="icon ion-close-circled assertive";
                    //if((idata.id_rapporto_valido_servizio != null) && (idata.annullato_servizi == 0)) idata.image_class="icon ion-share balanced";
                    //if((idata.id_rapporto_valido_servizio == null) && (idata.annullato_servizi == 0)) idata.image_class="icon ion-checkmark balanced";

                    //20150720@111555
                    
                    if (iteratorId < 1000) {
                   
                      fast_array.push(
                          {
                              "id": iteratorId,
                              "latitude": idata.LatitD,
                              "longitude": idata.LongiD,
                              "options": {
                                "labelContent": idata.CodiceRadio,
                                "labelAnchor": "22 0",
                                "labelClass": "marker-labels",
                                "draggable": false
                              }

                              //"showWindow": false
                              /*,
                              "options": {
                                 "labelContent": idata.CodiceRadio,
                                 "labelAnchor": idata.CodiceRadio,
                                 "labelClass": "marker-labels"
                              }
                              */
                          }
                      );
                    
                    }

                    iteratorId = iteratorId + 1;
                    
                });
                
                $log.debug(fast_array);
          
                //$scope.items = data;
                $scope.randomMarkers = [];
                $scope.randomMarkers = fast_array;

                $scope.randomMarkers = [
        {
          id: 1,
          //icon: 'assets/images/blue_marker.png',
          latitude: 44.0358,
          longitude: 12.55713,
          showWindow: false,
          options: {
            labelContent: 'ddddd',
            labelAnchor: "22 0",
            labelClass: "marker-labels",
            draggable: false
          }
        },
        {
          id: 2,
          //icon: 'assets/images/blue_marker.png',
          latitude: 44.07681,
          longitude: 12.54832,
          showWindow: false,
          options: {
            labelContent: 'aaaa',
            labelAnchor: "22 0",
            labelClass: "marker-labels-old",
            draggable: false
          }
        },
        {
          id: 3,
          //icon: 'assets/images/blue_marker.png',
          latitude: 44.03583,
          longitude: 12.56735,
          showWindow: false,
          options: {
            labelContent: 'xxxx',
            labelAnchor: "22 0",
            labelClass: "marker-labels",
            draggable: false
          }
        },
        {
          id: 4,
          //icon: 'assets/images/blue_marker.png',
          latitude: 44.03483,
          longitude: 12.53735,
          showWindow: false,
          options: {
            labelContent: '11xxxx',
            labelAnchor: "2211 0",
            labelClass: "marker-labels",
            draggable: false
          }
        }

        
      ];  


            $log.debug($scope.randomMarkers);
$scope.randomMarkers = fast_array;
            $log.debug($scope.randomMarkers);
          
                $log.debug(' .. data loaded!');
                $ionicLoading.hide();  
              
          // in caso di errore azzera la lista...      
          }, function () {
                $scope.items = [];
      });
          
      /*
      $scope.items = serviziList.getList($scope.filterCriteria).$object;
      $log.debug('@@@@@@@@@@@@@@@@@@ dati ritornati @@@@@@@@@@@@@@@@@@@');
      $log.debug($scope.items);
      */
          
 };



      $scope.refreshMapFAKE = function () {

        $log.log('refreshMap ...');

    $ionicLoading.show({template: 'Aggiornamento dati'});


$timeout(function () {
    $ionicLoading.hide();
    


        var lt1 = 44.09 + (Math.floor(Math.random() * 9) + 1) * 0.01;
        var ln1 = 12.59 + (Math.floor(Math.random() * 9) + 1) * 0.01;

        $log.log('refreshMap ... ' + lt1 + ' # ' + ln1 );

        //optional param if you want to refresh you can pass null undefined or false or empty arg
        $scope.randomMarkers = [
        {
          id: 1,
          //icon: 'assets/images/blue_marker.png',
          latitude: 44.0357100000,
          longitude: 12.5763200000,
          showWindow: false,
          options: {
            labelContent: '00012',
            labelAnchor: "22 0",
            labelClass: "marker-labels",
            draggable: false
          }
        },
        {
          id: 2,
          //icon: 'assets/images/blue_marker.png',
          latitude: 44.0798100000,
          longitude: 12.5173200000,
          showWindow: false,
          options: {
            labelContent: '00024',
            labelAnchor: "22 0",
            labelClass: "marker-labels",
            draggable: false
          }
        },
        {
          id: 3,
          //icon: 'assets/images/blue_marker.png',
          latitude: 44.0358300000,
          longitude: 12.5573500000,
          showWindow: false,
          options: {
            labelContent: '00025',
            labelAnchor: "22 0",
            labelClass: "marker-labels",
            draggable: false
          }
        },
        {
          id: 4,
          //icon: 'assets/images/blue_marker.png',
          latitude: 44.0903500000,
          longitude: 12.5343200000,
          showWindow: false,
          options: {
            labelContent: '00027',
            labelAnchor: "22 0",
            labelClass: "marker-labels",
            draggable: false
          }
        },
        {
          id: 5,
          //icon: 'assets/images/blue_marker.png',
          latitude: 44.0381100000,
          longitude: 12.5593900000,
          showWindow: false,
          options: {
            labelContent: '00044',
            labelAnchor: "22 0",
            labelClass: "marker-labels",
            draggable: false
          }
        }

      ];


  }, 2000);
    


    };

    }]);   
      