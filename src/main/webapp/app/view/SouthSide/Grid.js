Ext.require([
    'Ext.window.MessageBox',
    'Ext.tip.*'
]);
Ext.define('AM.view.SouthSide.Grid' ,{
    extend: 'Ext.grid.Panel',
    alias: 'widget.grid',
	id :'grid',
    title: 'Depenses',
	store :'DepenseStore',
	columns : [
			{header: 'Id', dataIndex: 'id', flex: 1,hidden :true},
            {header: 'Description',  dataIndex: 'description',  flex: 1},
            {header: 'Somme', dataIndex: 'somme', flex: 1},
			{header: 'Date', dataIndex: 'date', renderer :Ext.util.Format.dateRenderer('Y-m-d'), flex: 1},
			//Display complex type data
			{header: 'Categorie',dataIndex :'categorie', xtype: 'templatecolumn', tpl :'{categorie.name}',flex: 1}
        ],	
	tbar: [{
		id : 'AjoutDepense',
		text: 'Ajout depense',
		icon: 'http://icons.iconarchive.com/icons/hopstarter/button/16/Button-Add-icon.png'
		
		},{
		id : 'ModifieDepense',
		text: 'Modifier depense',
		icon: 'http://icons.iconarchive.com/icons/designcontest/ecommerce-business/16/edit-icon.png',
		
		},{		
			id : 'SupprimerDepense',
			text: 'Supprimer depense',
			icon: 'http://icons.iconarchive.com/icons/oxygen-icons.org/oxygen/16/Actions-edit-delete-icon.png',			
		}]

});


