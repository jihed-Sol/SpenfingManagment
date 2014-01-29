Ext.define('AM.store.RootCategorieStore', {
    extend: 'Ext.data.Store',
    model: 'AM.model.Categorie',
	autoLoad: true,
	proxy: {
        type: 'ajax',
        url : 'DepenseController/getRootCategories.action',
		reader: {
			type: 'json',
			root: 'data',
			successProperty: 'success'
		}
    }
});