Ext.define('AM.store.CategorieStore', {
    extend: 'Ext.data.Store',
    model: 'AM.model.Categorie',
	autoLoad: true,
	proxy: {
        type: 'ajax',
        url : 'DepenseController/getCategorie.action',
		reader: {
			type: 'json',
			root: 'data',
			successProperty: 'success'
		}
    }
});