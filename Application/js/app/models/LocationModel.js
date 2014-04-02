
Ext.regModel('Locations', {
    fields: locationFields
});

app.stores.LocationsList = new Ext.data.Store({
    model: "Locations", 
    sorters: [{
        			property: 'title', 
        			direction: 'ASC'
    			}],
    proxy: {
        type: 'ajax', 
        url: JSON_SOURCE, 
        reader: {
            type: 'json',
            root: 'location'
        },
        id  : 'Locations'
    },
    getGroupString : function(record) {
		return record.get('title')[0];
	},
    
    listeners: {
        'load': function (t, r, s) {
            Ext.dispatch({
                controller: app.controllers.map,
                action: 'loaded',
                records: r
            });
        },
    },
  autoLoad : true 
    
});
