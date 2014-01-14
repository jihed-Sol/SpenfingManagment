Ext.application({
    requires: ['Ext.container.Viewport'],
    name: 'AM',
	 controllers: [
        'GestionController'
    ],
    appFolder: 'app',
    launch: function() {
        Ext.create('Ext.container.Viewport', {
            layout: 'border',
            items: [{			
				region: 'north',     // position for region
				xtype: 'North',	       // enable resizing
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