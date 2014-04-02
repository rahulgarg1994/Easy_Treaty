var lastMarkerSearch;
var DataLoaded = 0;
var infowindow = null;

function addLastSearchMarker(marker){
	lastMarkerSearch = marker;
}

app.controllers.map = new Ext.regController('Map', {
 
	loaded: function(options) { 
    },
    map_rendered: function(options) { 
    	infowindow = new google.maps.InfoWindow({
			content: "empty for now..."
		});
    	for(var i = 0; i < app.stores.LocationsList.data.items.length; i++){
  			var thumbnail;
           	if(app.stores.LocationsList.data.items[i].get('thumb') != ''){
           		thumbnail = '<img align="left" class="map-thumb" src="' + IMG_ROOT + app.stores.LocationsList.data.items[i].get('thumb') + '"/>';
           	} else {
           		thumbnail = '';
           	}
            var marker = new google.maps.Marker({
                 position: new google.maps.LatLng(app.stores.LocationsList.data.items[i].get('lat'), app.stores.LocationsList.data.items[i].get('lng')),
                 map: MainMap.map,
                 icon: app.stores.LocationsList.data.items[i].get('marker'), 
                 html: thumbnail + "<b>" + app.stores.LocationsList.data.items[i].get('title') + "</b>" + "<br/><a class='more-info' href='#Map/browse/"+ [i] + "'>" + moreInfo +"</a>",
                 internalId: [i]
            });
            
            var infowindow = new google.maps.InfoWindow({
					content: ""
			});

			google.maps.event.addListener(marker, 'mousedown', function () {

				infowindow.setContent(this.html);
				MainMap.map.setCenter(this.position);
				infowindow.open(MainMap.map, this);
			});

        }

    },
    browse: function(options)	{
    	window.location.hash = "";
    	Ext.getBody().mask('<div class="loading">Loading&hellip;</div>');
            	this.locationCardMap = new app.views.MapDetail({
            				store: app.stores.LocationsList,
            				floating: true,
                			prevCard: mapPanel,
                			record: app.stores.LocationsList.data.items[options.id],
            			});

       Ext.getBody().unmask();
          		this.locationCardMap.show({
        					type: 'slide',
        					direction: 'left',
        					duration: 500,
    					});
    },
   searchMap: function(options)	{
    	Geocoder.geocode({ 'address': options.searchField}, function(results, status) {
    		if (lastMarkerSearch != undefined){
    			lastMarkerSearch.setMap(null);
    		}
      		if (status == google.maps.GeocoderStatus.OK) {
        			MainMap.map.setCenter(results[0].geometry.location); 
        			var searchMarker = new google.maps.Marker({ 
            			map: MainMap.map,
            			position: results[0].geometry.location,
            			id: 'search'
        			});
        			
        			addLastSearchMarker(searchMarker); 
        			MainMap.map.setZoom(searchZoom); 
      		} else {
				Ext.Msg.alert('Search Error', 'Could not find address: ' + status, Ext.emptyFn);
      		}

    	});
    	
    	
    },
    currentLocation: function(options)	{
    		if (lastMarkerSearch != undefined){
    			lastMarkerSearch.setMap(null);
    		}
			var geo = new Ext.util.GeoLocation({ 
			    autoUpdate: false,
			    timeout:1000,
			    listeners: {
			        locationupdate: function (geo) {
			            currentPosition = new google.maps.LatLng(geo.latitude, geo.longitude);
			            MainMap.map.setCenter(currentPosition);
			            var currentLocationMarker = new google.maps.Marker({
            				map: MainMap.map,
            				position: currentPosition
        				});
        			addLastSearchMarker(currentLocationMarker);
			        MainMap.map.setZoom(searchZoom); 
			        },
			        locationerror: function (   geo,
			                                    bTimeout, 
			                                    bPermissionDenied, 
			                                    bLocationUnavailable, 
			                                    message) {
			            if(bTimeout){
			                Ext.Msg.alert('Location Error', 'Your location could not be determined', Ext.emptyFn);

			            }else{
			                Ext.Msg.alert('Location Error', 'Location unavailable', Ext.emptyFn);
			            }
			        }
			    }
			});
			geo.updateLocation();    
    }
});