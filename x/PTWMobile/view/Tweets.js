Ext.define('PTWMobile.view.Tweets', {
	extend: 'Ext.dataview.List'
	,xtype: 'tweets'
	,requires: [
		'Ext.plugin.ListPaging'
	]
	
	,config: {
		title: 'Tweets'
		,plugins: [{
            xclass: 'Ext.plugin.ListPaging',
            autoPaging: true
        }]
		,itemId: 'tweetsList'
		,store: 'Tweets'
		,itemTpl: [
			'<div class="tweet">'
				,'<img src="{profile_image_url}"/><h1>{from_user_name}</h1>'
				,'<p><span>{created_at:date("M d, g:i A")}</span></p>'
				,'<p>{text}</p>'
				,
		,'</div>'
		]
	}

});