var app=angular.module('main',['leaflet-directive'])
.filter('object2Array', function() {
    return function(input) {
        var out = []; 
        for(i in input){
          out.push(input[i]);
        }
        return out;
      }
    })
   
    .filter('startFrom', function() {
    return function(input, start) {
        start = +start; //parse to int
        return input.slice(start);
    }
})
.controller('mainCtrl',mCtrl)
;



function mCtrl($scope,$http,leafletData)
{
	
	   $scope.currentPage = 0;
	 $scope.pageSize = 10;
	 $scope.showHour=hour;
	 $scope.showYest=yest;
	 
	 
	 angular.extend($scope, {
		 sanfrancisco: {
             lat: 37.79,
             lng: -122.4,
             zoom: 17
         },
         legend: {
             position: 'bottomleft',
             colors: [ '#ff0000', '#28c9ff', '#0000ff', '#ecf386' ],
             labels: [ '>7', '6.0-7.0', '5.0-6.0', '1.0-4.0' ]
         },
         defaults: {
             tileLayer: "http://{s}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png"
         }
     });
	 
	 setView('hour');
	 
	 function hour()
	 {
		 setView('hour');
	 }
	 
	 function yest()
	 {
		 setView('yest');
	 }

	 function setView(view)
	 {
		 
		 $scope.view=view;
	 }
	
$http.get("http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson")
    .then(function(response) {
    	$scope.hour_metadata = response.data.metadata;
    	$scope.hour_features = response.data.features;
    	$scope.data=response.data;
    	
    });
	
$http.get("http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson")
.then(function(response) {
	$scope.lastDay_metadata = response.data.metadata;
	$scope.lastDay_features = response.data.features;
		
});


$http.get("http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson").success(function(data, status) {
	
    angular.extend($scope, {
        geojson: {
            data: data
        }
    
    });
    
    
    
});


$http.get("http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson").success(function(data, status) {
	
	
		
    angular.extend($scope, {
    	
        geojson_hour: {
            data: data
        }
    }
    );
        
    var markers = L.markerClusterGroup();
    
});


$scope.numberOfPages=function(){
    return Math.ceil($scope.lastDay_features.length/$scope.pageSize);                
};



};
