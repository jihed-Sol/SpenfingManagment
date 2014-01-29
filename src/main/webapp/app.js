Ext.application({
    requires: ['Ext.container.Viewport'],
    name: 'AM',
	 controllers: [
        'WestSideController',
		'NorthSideController',
		'SouthSideController'
    ],
    appFolder: 'app',
    launch: function() {
		
        Ext.create('Ext.container.Viewport', {			
            layout: 'border',
			renderTo :'center',
            items: [{			
				region: 'north',     // position for region
				xtype: 'panel',	       // enable resizing
				layout : 'vbox',
				items : [{
				
					html:'<img src="ressources/images/header.jpg" height="80" width="100%" />',
					width :'100%',
					flext : 1
				},{
					xtype : 'North',
					width : '100%',
					flex :1
				}],
				margins: '0 5 0 5'
			},{
				title: 'Depenses',
				region: 'south',     // position for region
				xtype: 'grid',
				height: '30%',
				collapsible: true, 
				split: true,         // enable resizing
				margins: '0 5 5 5'
			},{
				// xtype: 'panel' implied by default
				title: 'Categories',
				region:'west',
				split: true,  			
				xtype: 'trees',
				margins: '5 0 0 5',
				width: '15%',
				collapsible: true,   // make collapsible
				id: 'west-region-container',
				layout: 'fit'
			},{						
				region: 'center',     // center region is required, no width/height specified				
				xtype :'centerContainer',							
				margins: '5 5 0 0'
			}],
        });
    }
});