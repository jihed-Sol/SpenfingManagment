Ext.define('AM.controller.GestionController', {
    extend: 'Ext.app.Controller',
	
    models: ['Depense'],
	stores: ['DepenseStore'],
	
	init: function() {
		this.control({
			'viewport > panel': {
				render: this.onPanelRendered
			}
		});
	},

	onPanelRendered: function() {
		console.log('The panel was rendered');
    }
});