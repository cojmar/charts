define(function(require) {
    require('css!assets/css/main');
    var $ = require('jquery');
    var app = {
        debug: require('print'),
        editor: require('./editor'),
        chart: require('./chart'),
        on_editor_change: function() {
            var val = app.editor.getValue();
            eval("var my_obj_val=" + val);
            app.chart.setValue(my_obj_val);
        },
        init_editor: function() {
            app.editor.on_change = app.on_editor_change;
            app.editor.setValue(require('text!assets/default_editor_text.txt'));
            setTimeout(function() {
                app.editor.do_action('Format Document');
            }, 100);
            return app;
        },
        init: function() {
            app.init_editor();
            app.debug("App Init Ok");
        }
    };
    $(function() {
        app.init();
    })
    return app.editor;
});