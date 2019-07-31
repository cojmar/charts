define(function(require) {
    require('css!assets/css/main');
    require('css!assets/css/bootstrap.min');
    var $ = require('jquery');    
    require('jquery-ui.min');
    require('bootstrap.min');
    var app = {
        debug: require('print'),
        editor: require('./editor'),
        chart: require('./chart'),
        on_editor_change: function() {
            var val = app.editor.getValue();
            app.chart.setValue(val);
        },
        init_editor: function() {
            app.editor.setValue(require('text!assets/default_script.js'));
            setTimeout(function() {
                app.editor.on_change = app.on_editor_change;
                app.editor.do_action('Format Document');
            }, 100);
            return app;
        },
        init_resize:function(){
            $( ".left_area" ).resizable({
                alsoResize: ".right_area"
              });
            $( ".right_area" ).resizable();
        },
        init: function() {
            //app.init_resize();
            app.init_editor();
            app.debug("App Init Ok");
        }
    };
    $(function() {
        app.init();
    })
    return app.editor;
});