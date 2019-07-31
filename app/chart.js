define(function(require) {
    var obj = {
        dom_object: require('./dom_object'),
        set_chart: function(data) {

        },
        init_chart: function() {
            obj.dom_object('chart');
        },
        init: function() {
            obj.init_chart();
            return {
                setValue: obj.set_chart
            }
        }
    };
    return obj.init();
});