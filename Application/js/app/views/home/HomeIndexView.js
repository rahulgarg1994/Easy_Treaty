app.views.HomeIndex = Ext.extend(Ext.Panel, {
    id:'homepage',
    html:homeHtml, 
    styleHtmlContent: true,
    initComponent: function(){
        	
        	this.dockedItems = [{
            xtype: 'toolbar',
            title: homeTitle, 
        }]   
        app.views.HomeIndex.superclass.initComponent.call(this);
    }
});

Ext.reg('HomeIndex', app.views.HomeIndex); 