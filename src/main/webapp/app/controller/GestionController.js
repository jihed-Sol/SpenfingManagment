Ext.define('AM.controller.GestionController', {
    extend: 'Ext.app.Controller',
	
    models: ['Depense','Categorie','PieStat'],
	stores: ['DepenseStore','CategorieStore','Stat','TreeStore','barStore'],
	views:['Grid','ajoutDepense' ,'pie','CategorieTree','ajoutCategorie','North','centerContainer','barChart'],
	
	init: function() {
		this.control({
			'viewport > panel': {
				render: this.onPanelRendered
			},
			'#ajCat' :{
				 handler: this.onclickPanel
			
			}
		});
	},

	onclickPanel : function(){
		
	},
	onPanelRendered: function() {
		console.log('The panel was rendered');
    }
});