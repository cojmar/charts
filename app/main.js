define(function(require) {
    require('css!assets/css/main');
    require('css!assets/css/bootstrap.min');
    require('css!assets/css/jquery-ui');
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
            var la = $( ".left_area" );
            var ra = $( ".right_area" );
            var ww = $(window);
            la.resizable({
                handles: 'e',
                resize: function(event, ui) {
                    ra.css('width',ww.width()- la.width()-5);
                }
            });
            
            ra.resizable({
                handles: 'w',
                resize: function(event, ui) {
                    la.css('width',ww.width()- ra.width()-5);
                    ra.css('left','5px');
                }
            });
            
            
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