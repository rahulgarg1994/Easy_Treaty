app.views.MapIndex = Ext.extend(Ext.Panel, {
    coords: [startLat, startLng], 
    id: 'map',
    initComponent: function(){
    	app.stores.LocationsList.load(); 
        var position = new google.maps.LatLng(this.coords[0], this.coords[1]); 
        
        this.dockedItems = [{
            xtype: 'toolbar',
            title: this.mapText,
            items: [{xtype: 'spacer', flex: 1}, {
                ui: 'plain',
                iconCls: 'action',
                iconMask: true,
                scope: this,
                handler: function(){
                    Ext.Msg.confirm('Open Link', 'Open in Google Maps?', function(res){
                        if (res == 'yes') window.location = this.permLink;
                    }, this);
                }
            }]
        }]
        var infowindow = new google.maps.InfoWindow({
            content: this.mapText
        });
        
        this.map = new Ext.Map({
        	id: 'mainmap',
        	store: app.stores.LocationsList,
            mapOptions : {
                center : position,
                zoom: 10,
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
        
        this.items = this.map;
        
        app.views.MapIndex.superclass.initComponent.call(this);
    }
});

Ext.reg('MapIndex', app.views.MapIndex);