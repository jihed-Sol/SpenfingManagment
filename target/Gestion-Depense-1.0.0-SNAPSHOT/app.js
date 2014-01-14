Ext.application({
    requires: ['Ext.container.Viewport'],
    name: 'AM',
	 controllers: [
        'GestionController'
    ],
    appFolder: 'app',

    launch: function() {
        Ext.create('Ext.container.Viewport', {
            layout: 'fit',
            items: [
                {
                    xtype: 'panel',
					title:'Hello'
                }
            ]
        });
    }
});