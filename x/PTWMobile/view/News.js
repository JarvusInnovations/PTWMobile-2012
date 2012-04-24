Ext.define('PTWMobile.view.News', {
	extend: 'Ext.navigation.View'
	,xtype: 'news'
	
	,config: {
		items: [{
			xtype: 'list'
			,title: 'News Feed'
			,itemId: 'newsList'
			,store: 'News'
			,itemTpl: [
				'<div class="newsArticle news">'
					,'<h1>{title}</h1>'
					,'<p>{description}</p>'
				,'</div>'
			]
		}]
	}

});