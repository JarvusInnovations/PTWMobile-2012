Ext.define('PTWMobile.model.Article', {
	extend: 'Ext.data.Model'
	,requires: [
		'Ext.data.reader.Xml'
	]
	
	,config: {
		idProperty: 'guid'
		,fields: [{
			name: 'guid'
			,type: 'string'
		},{
			name: 'title'
			,type: 'string'
		},{
			name: 'link'
			,type: 'string'
		},{
			name: 'content'
			,type: 'string'
			//mapping: 'encoded'
			,convert: function(v, r) {
				return r.raw.querySelector('encoded').firstChild.nodeValue;
			}
		},{
			name: 'description'
			,type: 'string'
		},{
			name: 'pubDate'
			,type: 'date'
		}]
		
		,proxy: {
			type: 'ajax'
			,url: '/getNewsFeed'
			,limitParam: false
			,pageParam: false
			,startParam: false
			,reader: {
				type: 'xml'
				,record: 'item'
			}
		}
	
	}
});