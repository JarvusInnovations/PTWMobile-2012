Ext.define('PTWMobile.model.Event', {
	extend: 'Ext.data.Model'
	
	,config: {
		idProperty: 'Handle'
		,fields: [{
			name: 'ID'
			,type: 'integer'
		},{
			name: 'Handle'
			,type: 'string'
		},{
			name: 'Status'
			,type: 'string'
		},{
			name: 'Title'
			,type: 'string'
		},{
			name: 'StartDate'
			,type: 'date'
			,dateFormat: 'timestamp'
		},{
			name: 'EndDate'
			,type: 'date'
			,dateFormat: 'timestamp'
		},{
			name: 'Address'
			,type: 'string'
		},{
			name: 'Description'
			,type: 'string'
		},{
			name: 'City'
			,type: 'string'
		},{
			name: 'State'
			,type: 'string'
		},{
			name: 'isBookmark'
			,type: 'boolean'
			,defaultValue: false
		}]
		
		,proxy: {
			type: 'ajax'
			,url: '/events/json'
			,limitParam: false
			,pageParam: false
			,startParam: false
			,reader: {
				type: 'json'
				,rootProperty: 'data'
			}
		}
	}
});