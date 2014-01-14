Ext.define('AM.model.Depense', {
    extend: 'Ext.data.Model',
    fields: [
		{name: 'id',  type: 'long'},
        {name: 'somme',   type: 'double'},
        {name: 'categorie', type: 'string'},
		{name: 'date', type: 'date'},
		{name: 'description', type: 'string'}
	]
});