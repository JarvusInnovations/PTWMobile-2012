Ext.define('PTWMobile.controller.News',{
	extend: 'Ext.app.Controller'
	
	,config: {
		routes: {
			news: 'showArticles'
			,'article/:articleId': {
				action: 'showArticle'
				,conditions: {
					':articleId': '.+'
				}
			}
		}
		
		,refs: {
			main: 'mainview'
			,news: 'news'
			
			,articleView: {
				selector: 'article'
				,xtype: 'article'
				,autoCreate: true
			}
		}
		
		,control: {
			news: {
				activate: 'onNewsActivate'
				,pop: 'onNewsPop'
			}
			,'news #newsList': {
				itemtap: 'onArticleSelected'
			}
		}
		
		,stores: ['News']
		,models: ['Article']
	}
	
	,showArticles: function() {
		
		var newsView = this.getNews();
		
		this.getMain().setActiveItem(newsView);
		
		if(newsView.getActiveItem().xtype == 'article')
			newsView.pop();
	}
	
	,showArticle: function(articleId) {

		var articleView = this.getArticleView()
			,newsView = this.getNews()
			,store = Ext.getStore('News');
			
		this.getMain().setActiveItem(newsView);
			
		if(!store.isLoaded())
		{
			store.on('load', function() {
				this.showArticle(articleId);
			}, this, {single: true});
			return false;
		}
		
		var record = store.getData().getByKey(articleId); // data.getByKey searches filtered records, getById doesn't
		
		if(!record)
		{
			Ext.Msg.alert('Article not found', 'The article you requested was not found');
				this.getApplication().pushUrl('news');
			return false;
		}
		
		articleView.setArticle(record);

		if(newsView.getActiveItem() != articleView)
			newsView.push(articleView);
		
	}
	
	,onNewsActivate: function() {

		if(window.location.hash.indexOf('#article/') != 0)
			this.getApplication().pushUrl('news');
		
		var store = Ext.getStore('News');
		
		if(!store.isLoaded() && !store.isLoading())
			store.load();
			
	}
	
	,onNewsPop: function() {
		this.getApplication().pushUrl('news');

	}
	
	
	,onArticleSelected: function(list, index, target, record){
		
		this.getApplication().redirectTo(record);
	}
});