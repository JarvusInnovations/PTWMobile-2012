Ext.define('PTWMobile.view.Calendar', {
	extend: 'Ext.navigation.View'
	,xtype: 'calendar'
	
	,requires: [
		'PTWMobile.view.Event'
		,'Ext.field.Search'
		,'Ext.SegmentedButton'
		,'Ext.dataview.List'
	]
	

	,config: {
		navigationBar: {
            items: [{
                xtype: 'button'
                ,itemId: 'eventBookmarkButton'
                ,align: 'right'
                ,hidden: true
                ,iconMask: true
				,iconCls: 'favorites'
            }]
		}
		
		
		,items: [{
			xtype: 'container'
			,itemId: 'eventList'
			,title: 'Calendar'
			,layout: 'fit'
			,items: [{
				xtype: 'searchfield'
				,itemId: 'search'
				,value: ''
				,placeHolder: 'Search'
				,flex: 3
				,ui: 'search'
				,docked: 'top'	
			},{
				xtype: 'toolbar'
				,docked: 'top'
				,ui: 'light'
				,items: [{
					xtype: 'segmentedbutton'
					,itemId: 'filters'
					,flex: 1
					,defaults: { flex: 1 }
					,allowDepress: false
					,allowMultiple: false
					,items: [
						 { text: 'SAT<span><br />21</span>', itemId: 'Startup Saturday', day: new Date("April 21, 2012 0:00:00") }
						,{ text: 'SUN<span><br />22</span>', itemId: 'Startup Sunday', day: new Date("April 22, 2012 0:00:00") }
						,{ text: 'MON<span><br />23</span>', itemId: 'Monday', day: new Date("April 23, 2012 0:00:00") }
						,{ text: 'TUE<span><br />24</span>', itemId: 'Tuesday', day: new Date("April 24, 2012 0:00:00") }
						,{ text: 'WED<span><br />25</span>', itemId: 'Wednesday', day: new Date("April 25, 2012 0:00:00") }
						,{ text: 'THR<span><br />26</span>', itemId: 'Thursday', day: new Date("April 26, 2012 0:00:00") }
						,{ text: 'FRI<span><br />27</span>', itemId: 'Friday', day: new Date("April 27, 2012 0:00:00") }
						,{ text: 'SAT<span><br />28</span>', itemId: 'Saturday', day: new Date("April 28, 2012 0:00:00") }
					]
				}]
			},{
				xtype: 'list'	
				,itemId: 'eventsList'
				,store: 'Calendar'
				,grouped: false
				,onItemDisclosure: 'true'
				,emptyText: '<p class="x-html" style="padding:1em;text-align:center">Search or select a day to view events</p>'
				,itemTpl: [
					'<div class="calendar">'
						,'<h1>{Title}</h1>'
						,'<p>{Address}</p>'
						,'<p><span>{[Ext.Date.format(values.StartDate, "g:i A")]} to {[Ext.Date.format(values.EndDate, "g:i A")]}</span></p>'
						
					,'</div>'
				]			
			}]
		}]
    }
	
});

