define(function(require, app) {
    var monaco = require('vs/editor/editor.main');
    var $ = require('jquery');
    var obj = {
        editor: false,
        monaco_layout: function() {
            if (!obj.editor) return false;
            obj.editor.layout();
        },
        timeout_editor_changed: false,
        on_editor_change: function() {
            if (!obj.editor) return false;
            clearTimeout(obj.timeout_editor_changed);
            obj.timeout_editor_changed = setTimeout(function() {
                if (typeof obj.editor.on_change === 'function') obj.editor.on_change();
            }, 1000);
        },
        init_monaco: function() {
            obj.editor_selector = $('#editor');
            if (!obj.editor_selector.length > 0) {
                $('body').append('<div id="editor"></div>');
                obj.editor_selector = $('#editor');
            }
            if (obj.editor_selector.length > 0) {
                obj.editor = monaco.editor.create(obj.editor_selector.get(0), {
                    value: '',
                    theme: 'vs-dark',
                    language: 'html',
                    scrollBeyondLastColumn: true,
                    scrollBeyondLastLine: true,

                });
                obj.editor.onDidChangeModelContent(obj.on_editor_change);
                obj.editor.do_action = function(action) {
                    var actions = obj.editor.getActions();
                    for (var editor_action of actions) {
                        if (editor_action.label === action) {
                            editor_action.run();
                            break;
                        }
                    }
                }
            }
            $(window).on('resize', function() {
                obj.monaco_layout();
            });
            obj.monaco_layout();
            return obj.editor;
        },
        init: function() {
            return obj.init_monaco();
        }
    };
    return obj.init();
});