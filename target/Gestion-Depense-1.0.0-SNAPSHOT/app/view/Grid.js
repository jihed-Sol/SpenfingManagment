Ext.define('AM.view.Grid' ,{
    extend: 'Ext.grid.Panel',
    alias: 'widget.grid',
    title: 'Depenses',
	store :'DepenseStore',    
	columns : [
            {header: 'Description',  dataIndex: 'description',  flex: 1},
            {header: 'Somme', dataIndex: 'somme', flex: 1},
			{header: 'Date', dataIndex: 'date', flex: 1}
        ]
	
});