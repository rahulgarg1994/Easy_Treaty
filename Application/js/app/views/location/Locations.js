app.views.LocationsList = Ext.extend(Ext.Panel, {
    layout: 'card',
    fullscreen: true,
    scrolling: 'vertical',
    initComponent: function() {
    	 if (!Ext.is.Phone) {
	        	var listTemplate = '{title} - <span class="list-address">{address}</span>';
	        	
	      } else {
	      		var listTemplate = '{title}';
	      
	      }
        this.list = new Ext.List({
            grouped: true,
            indexBar: true,
            itemTpl: listTemplate,
            store: app.stores.LocationsList,
            listeners: {
                selectionchange: {fn: this.onSelect, scope: this}
            }
        });
        
        this.listpanel = new Ext.Panel({
            layout: 'fit',
            items: this.list,
            dockedItems: [{
                xtype: 'toolbar',
                title: listingTitle
            }],
            listeners: {
                activate: { fn: function(){
                    this.list.getSelectionModel().deselectAll();
                    Ext.repaint();
                }, scope: this }
            }
        });
        
        this.items = this.listpanel;
        
        app.views.LocationsList.superclass.initComponent.call(this);
    },
    
    onSelect: function(sel, records){
        if (records[0] !== undefined) {
			  	var locationCard = new app.views.LocationDetail({
            				store: app.stores.LocationsList,
                			prevCard: this.listpanel,
                			record: records[0],
            			});

            			this.setActiveItem(locationCard, 'slide');
            
                     
        }
    }
});

Ext.reg('LocationsList', app.views.LocationsList);