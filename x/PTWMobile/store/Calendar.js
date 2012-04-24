Ext.define('PTWMobile.store.Calendar', {
	extend: 'Ext.data.Store'
	
	,config: {
		model: 'PTWMobile.model.Event'
		
		,grouper: {
	    	groupFn: function(record) {	    		
	    		return Ext.Date.format(record.get('StartDate'), "g:i A");	
	    	}
	    	
	    } 
	}
});