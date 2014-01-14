Ext.define('AM.store.barStore', {
    extend: 'Ext.data.Store',
	storeId :'barStore',
    model: 'AM.model.PieStat',
	autoLoad: true,
	proxy: {
        type: 'ajax',
		actionMethods: {
			create : 'POST',
			read   : 'POST',
			update : 'POST',
			destroy: 'POST'
        },
        url : 'DepenseController/statistiqueBar.action',
		reader: {
			type: 'json',
			root :'data',
			successProperty: 'success'
		}
    }
});