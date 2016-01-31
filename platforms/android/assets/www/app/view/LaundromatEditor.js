Ext.define('Qum.view.LaundromatEditor', {
    extend: 'Ext.Panel',
    xtype: 'enqueue',
    requires: [
        'Ext.TitleBar',
    ],
    config: {
	    items: [
	            {
	                docked: 'top',
	                xtype: 'titlebar',
	                title: "Assign Machines"
	            },
	            {
	            	xtype:"textfield",
	            	label: "Number Machines:",
	            	id: "txtNumberOfMachines",
	            	flex: 1,
	            	value: 1
	            },
	             {
	            	xtype:"button",
	            	text: "Engage",
	            	flex: 1,
	            	handler: function(){
						var machinID = Ext.getCmp("txtNumberOfMachines").getValue()
						engageMachine(parseInt(machinID), "Washer")
	            	}
	            }
	       ]
	   }
});
