define(function(require) {
    var obj = {
        dom_object: require('./dom_object'),
        chart_head: require('text!assets/preview.html'),
        chart_selector: false,
        set_chart: function(data) {
            if (!obj.chart_selector.html) return false;
            obj.chart_selector.html('<iframe id="preview_frame" style="width:100%;height:100%;border:none;" />');
            var iframe = document.getElementById('preview_frame');
            iframe = iframe.contentWindow || (iframe.contentDocument.document || iframe.contentDocument);
            iframe.document.open();
            iframe.document.write(obj.chart_head);
            iframe.document.write('<script>' + data + '</script>');
            iframe.document.close();

        },
        init_chart: function() {
            obj.chart_selector = obj.dom_object('chart');
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