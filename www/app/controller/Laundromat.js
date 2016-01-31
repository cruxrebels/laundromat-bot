
Ext.define('Qum.controller.Laundromat', {
    extend : 'Ext.app.Controller',
    routes : {
        'user' : {
            action:'onLoad'
        }
    },
    onLoad: function() {
        console.log("Hai");
    }
});