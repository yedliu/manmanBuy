$(function() {
    function getQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    }
    $("#header img").on('click', function() {
        var sum = localStorage.getItem('sumId');
        sum = JSON.parse(sum);
        localStorage.setItem("sumId", '{"sum":' + sum.sum + ',"flag":"true"}');
    });

    $.ajax({
        url: 'http://139.199.157.195:9090/api/getmoneyctrlproduct',
        data: { productid: getQueryString('productid') },
        dataType: 'jsonp',
        success: function(data) {
            console.log(data);
            var html = template('product', data);
            $('.product').html(html);
            var comment = template('comment', data);
            $('.comment').html(comment);
        }

    })

})
