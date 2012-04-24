Ext.define('PTWMobile.store.Bookmarks', {
	extend: 'Ext.data.Store'
	,requires: [
		'Ext.data.proxy.LocalStorage'
	]
	
	,config: {
		model: 'PTWMobile.model.Bookmark'
		,autoLoad: true
		,autoSync: true

		,grouper: {
	    	groupFn: function(record) {	    		
	    		return Ext.Date.format(record.get('StartDate'), "g:i A");	
	    	}
	    	
	    } 
	    ,proxy: {
			type: 'localstorage'
			,id: 'myEvents'
		}
	}
	
});