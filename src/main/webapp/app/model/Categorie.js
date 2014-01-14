Ext.define('AM.model.Categorie', {
    extend: 'Ext.data.Model',
    fields: [
		{name: 'id',  type: 'long'},
        {name: 'name',   type: 'double'},
        {name: 'parentId', type: 'string'},
		{name: 'createdDate', type: 'date'}
	]
});