$(function() {
    $.ajax({
        url: 'http://139.199.157.195:9090/api/getsitenav',
        dataType: 'jsonp',
        success: function(data) {
            var html = template('sitenav', data);
            $('.sitenav .link').html(html);
        }
    });
});