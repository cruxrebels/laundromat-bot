Ext.define('Qum.view.EmployeeHome', {
    extend: 'Ext.Panel',
    xtype: 'ehome',
    requires: [
        'Ext.TitleBar',
    ],
    config: {
	    items: [
	            {
	                docked: 'top',
	                xtype: 'titlebar',
	                title: 'Laundromat Tracker'
	            },
	            {
	            	xtype:"container",
	            	layout: "vbox",
	            	items: [
	            		{
	            			xtype:"container",
	            			layout:"hbox",
	            			items:[
	            			{
					            xtype:'button',
	                	        text: "RC",
	                	        id: "btnFC",
	                	        flex:1,
	                	        handler: function(){
	                	        	Ext.Viewport.removeAll();
                                    Ext.Viewport.add({xtype:'rclayout'}).show();
	                	        }
						    },
					        {
					            xtype:'button',
	                	        text: "ECC 79",
	                	        id: "btnMultiplex",
	                	        flex:1,
	                	        handler: function(){
	                	        	Ext.Viewport.removeAll();
                                    Ext.Viewport.add({xtype:'ecc79layout'}).show();
	                	        }
					        }
	            			]
	            		},
	            		{
	            			xtype:"container",
	            			layout:"hbox",
	            			items:[
	            			{
					            xtype:'button',
	                	        text: "ECC 85",
	                	        id: "btnLaundromats",
	                	        flex:1,
	                	        handler: function(){
	                	        	Ext.Viewport.removeAll();
                                    Ext.Viewport.add({xtype:'ecc85layout'}).show();
	                	        }
						    },
					        {
					            xtype:'button',
	                	        text: "ECC 86",
	                	        id: "btnRC",
	                	        flex:1,
	                	         handler: function(){
	                	        	Ext.Viewport.removeAll();
                                    Ext.Viewport.add({xtype:'ecc86layout'}).show();
	                	        }
					        }
	            			]
	            		}
				    ]
	            }
	       ]
	   }
});
