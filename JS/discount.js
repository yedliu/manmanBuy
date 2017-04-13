/**
 * Created by trefoil on 2017-03-30.
 */
$(function () {
    // 通过$.ajax进行jsonp请求
    $.ajax({
        type: 'get',
        // 将前一个页面传递过来的参数拼接进url中
        url: 'http://139.199.157.195:9090/api/getdiscountproduct',
        dataType: 'jsonp',
        data: {'productid':GetQueryString('productId')},
        success: function (data) {
            // 通过模版生成节点
            var details = template('mmbDetails', data.result[0]);
            // 将节点加入页面中
            $('.mmb-header').after(details);
            // 为商品描述添加点击事件，当点击时切换全部显示还是只显示两行
            $('.mmb-desc').on('click',function () {
                $(this).toggleClass("mmb-txt-cut");
            });
        }
    });
    // 获取url传递过来的参数
    function GetQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return (r[2]);
    }

    // 返回顶部按钮
    $('#mmbTop').on('click',function () {
        $(document.body).animate({scrollTop:'0px'},200,'swing');
        return false;
    });
});