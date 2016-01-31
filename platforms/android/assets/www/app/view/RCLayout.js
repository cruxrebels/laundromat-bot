Ext.define('Qum.view.RCLayout',
 {
    extend: 'Ext.Panel',
    xtype: 'rclayout',
    requires: [
            'Ext.TitleBar',
    ],
     config: {
        xtype   : 'container',
        items:
        [
        {
            docked: 'top',
            xtype: 'titlebar',
            title: 'RC Laundromat',
            items:[{
                    xtype: 'button',
                    align: 'right',
                    text: 'Back',
                    handler: function(){
                        Ext.Viewport.removeAll();
                        Ext.Viewport.add({xtype:'ehome'}).show();
                    }
                }
            ]
        },
        {
        	layout:'vbox',
        	html:'<div style="text-align:center;padding:5px">Washers</div>',
        	height:50
        },
        {
        	layout  : 'hbox',
            padding : 10,
            defaults:
            {
                xtype: 'component',
            },
            items: [{
                style: 'background-color:#2d89ef;height:50%;color:#FFFFFF',
                html:"<div><label>Free</label></br><div style='font-size:120px;text-align:center'\
                 id='lblFreeWasherCount'>0</div></div>",
                margin:'5 5 5 5',
                flex:1
            },
            {
                style: 'background-color:#2d89ef;height:50%;color:#FFFFFF',
                html:"<div><label>Engaged</label></br><div style='font-size:120px;text-align:center'\
                 id='lblEngagedWasherCount'>0</div></div>",
                flex:1,
                height: "40",
                margin:'5 5 5 5'
            }]
        },
        {
            layout:'vbox',
            html:'<div style="margin:15px;visibility:hidden" id="divWasherMSG"><label id="lblWasherIds"></label> \
                will become free in <label id="lblWasherFreeIn"></label> seconds</div>'
        },
        { 
        	layout:'vbox',
        	html:'<div style="text-align:center;padding:5px">Dryers</div>',
        	height:50
        },
        {
        	layout  : 'hbox',
            padding : 10,
            defaults:
            {
                xtype  : 'component',
            },
 
            items: [{
                    style: 'background-color:#2d89ef;height:50%;color:#FFFFFF',
                    html:"<div><label>Free</label></br><div style='font-size:120px;text-align:center'\
                        id='lblFreeDryerCount'>0</div></div>",
                    margin:'5 5 5 5',
                    flex:1
            }, 
            {
                    style: 'background-color:#2d89ef;height:50%;color:#FFFFFF',
                    html:"<div><label>Engaged</label></br><div style='font-size:120px;text-align:center'\
                        id='lblEngagedDryerCount'>0</div></div>",
                    margin:'5 5 5 5',
                    flex:1
            }]

        },
        {
            layout:'vbox',
            html:'<div id="divDryerMSG" style="margin:15px;visibility:hidden"><label id="lblDryerIds"></label> \
                will become free in <label id="lblDryerFreeIn"></label> seconds</div>'
        },]
    }
 });