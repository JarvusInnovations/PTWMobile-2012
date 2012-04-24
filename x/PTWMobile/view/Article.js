Ext.define('PTWMobile.view.Article',{
	extend: 'Ext.Container'
	,xtype: 'article'
	
	,config: {
		article: null
		
		,title: 'Article'
		,scrollable: 'vertical'
		,styleHtmlContent: true
		,itemId: 'ArticleInfoPanel'
		,tpl: [
			'<div class="articleInfo article">'
			,'<a href="{link}">	<h1 class="title">{title}</h1></a>'
			,'	<p class="description">{content}</p>'
			,'</div>'
		]
		
	}
	
	,updateArticle: function(newArticle, oldArticle){
		if(newArticle)
			this.setData(newArticle.data);
	}
});