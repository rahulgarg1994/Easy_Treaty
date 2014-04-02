var laCenter = new google.maps.LatLng(startLat, startLng); 
var Geocoder = new google.maps.Geocoder(); 

var MainMap = new Ext.Map({
        	id: 'mainmap',
        	layout: 'card',
        	styleHtmlContent: true,
        	store: app.stores.LocationsList,
            mapOptions : {
                center : laCenter,  
                zoom: mapZoom, 
                navigationControlOptions: {
                    style: google.maps.NavigationControlStyle.DEFAULT 
                }
            },
            listeners: {
                maprender : function(comp, map){ 
                    Ext.dispatch({
                    	controller: app.controllers.map,
                    	action: 'map_rendered',
                    	map: map
                	});

                                    }
            }
        });


app.views.MapMain = Ext.extend(Ext.Panel, {
    id: 'mapPanel',
    mapText: '',
    permLink: '',
    address: 'test',
    items: MainMap, 
    initComponent: function(){	
       this.dockedItems = [{
            xtype: 'toolbar',
            items: [{
				    xtype: 'button',
				   	iconCls: 'locate3',
				   	iconMask: true,
				    itemId: 'LocateBtn',
				    ui: 'plain',
				    listeners: {
        					tap: function() {
          						Ext.dispatch({ 
                    				controller: app.controllers.map, 
                    				action: 'currentLocation' 
                				});
        					}
						}
				    },
		            {	xtype: 'spacer', flex: 1	}, 
		            {
                   		xtype: 'searchfield', 
                    	name: 'mapSearchValue',
                    	placeholder: 'MapSearch',
                    	listeners : {
	                        change: this.onMapFieldChange,  
	                        keyup: function(field, e) {
	                            var key = e.browserEvent.keyCode;
	                            if (key === 13) {
	                                field.blur();
	                            }
	                        },
                        scope : this
                    	}
		            }
        	]
        }]
                
        app.views.MapMain.superclass.initComponent.call(this);
    },
    
    onMapFieldChange : function(comp, value) {
     	Ext.dispatch({
                    	controller: app.controllers.map, 
                    	action: 'searchMap', 
                    	searchField: value 
                	});
        this.fireEvent('mapSearch', value, this);
    }
});

Ext.reg('MapMain', app.views.MapMain);