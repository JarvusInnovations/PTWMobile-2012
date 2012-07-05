Ext.define('PTWMobile.model.Tweet', {
	extend: 'Ext.data.Model'
	
	,config: {
		fields: [{
			name: 'from_user_name'
			,type: 'string'
		},{
			name: 'from_user'
			,type: 'string'
		},{
			name: 'created_at'
			,type: 'date'
			//,dateFormat: 'timestamp'
		},{
			name: 'text'
			,type: 'string'
		},{
			name: 'profile_image_url'
			,type: 'string'
		}]
		
		,proxy: {
			type: 'ajax'
			,url: 'tweets.json' // plug in real twitter API here
			,limitParam: false
//			,pageParam: false
			,startParam: false
			,reader: {
				type: 'json'
				,rootProperty: 'results'
			}
			,extraParams: {
				q: '#phillyTechWeek'
			}
		}
		
	}
});