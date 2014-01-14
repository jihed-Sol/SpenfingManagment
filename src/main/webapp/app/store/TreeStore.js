Ext.define('AM.store.TreeStore', {
    extend: 'Ext.data.TreeStore',
	storeId: 'myStore',
	autoLoad: true,
	expanded: true,
	proxy: {
        type: 'ajax',
        url : 'DepenseController/getcategorieTree.action',
		reader: {
			type: 'json',
			successProperty: 'success'
		}
    }
});