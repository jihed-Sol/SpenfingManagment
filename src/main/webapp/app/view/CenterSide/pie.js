Ext.define('AM.view.CenterSide.pie' ,{
	extend: 'Ext.chart.Chart',
	
	alias: 'widget.pie',
	animate: true,
	store: 'Stat',
	shadow: true,
	legend: {
		position: 'right'
	},
	insetPadding: 60,
	theme: 'Base:gradients',
	series: [{
		type: 'pie',
		field: 'ammount',
		showInLegend: true,
		tips: {
			trackMouse: true,
			width: 140,
			height: 35,		
			renderer: function(storeItem, item) {
                    //calculate percentage.
                    var total = 0;
					var store =Ext.getStore('Stat');
					
					store.each(function(rec) {
                    total += rec.get('ammount');
                    });				
					
                    this.setTitle('Depense : '+storeItem.get('ammount')+' $ </br> Pourcentage :' + Math.round(storeItem.get('ammount') / total * 100) + '%');
                  }		  
		},
		highlight: {
		  segment: {
			margin: 20
		  }
		},
		label: {
			field: 'name',
			display: 'rotate',
			contrast: true,
			font: '18px Arial'
		}
	}]
});