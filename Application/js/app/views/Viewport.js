app.views.Viewport = Ext.extend(Ext.TabPanel, {
    fullscreen: true,
    layout: 'fit',
    cardSwitchAnimation: 'slide', 
    statusBarStyle: 'black', 
    tabBar: {
        dock: 'bottom',
        layout: { pack: 'center' }
    },
    items : [{ 
    	 		title:  homeTabTxt,
                iconCls: 'home2',
                xtype: 'HomeIndex',
            },{
                title: listingTabTxt,
                iconCls: 'list',
                xtype: 'LocationsList',
            },{
                title: 'Map',
                iconCls: 'locate',
                xtype: 'MapMain'
            },
            
         ],
    	initComponent: function() {
         app.views.Viewport.superclass.initComponent.apply(this, arguments);
    }
});