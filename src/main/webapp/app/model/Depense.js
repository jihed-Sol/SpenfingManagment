Ext.define('AM.model.Depense', {
    extend: 'Ext.data.Model',
    fields: [
		{name: 'id',  type: 'long'},
        {name: 'somme',   type: 'double'},
		{name: 'description', type: 'string'},
        {name: 'categorie', type: 'Categorie'},
		{name: 'date', type: 'date'}
	]
});