/**
 * Created by trefoil on 2017-03-30.
 */
$(function () {
    // 通过$.ajax进行jsonp请求
    $.ajax({
        type: 'get',
        url: 'http://139.199.157.195:9090/api/getinlanddiscount',
        dataType: 'jsonp',
        data: {},
        success: function (data) {
            // nextTmp用于存储下一次生成节点的数组
            var nextTmp = data.result;
            // tmp用来存储当前生成节点的数组
            var tmp = [];
            // 定义一个变量用于设置每次加载的商品数量
            var len = 8;
            // 判断，当nextTmp大于10的时候进行截取
            if (nextTmp.length > len) {
                // 将前10个截取给tmp，然后渲染到html中
                tmp = nextTmp.splice(0, len);
                // 定义一个标志位表示当前是否正在加载数据
                var isLoading = false;
                // 当大于10个时，开启滚动监听
                $(window).scroll(function () {
                    // 在执行加载前先判断是否还有要加载的数据，以及当时是否处于加载中
                    // 如果没有要加载的数据，或者当前正在加载上一次的数据，则直接返回
                    if (nextTmp.length === 0 || isLoading) {
                        return;
                    }
                    // 设置isLoading为正在加载数据
                    isLoading = true;
                    // 获取页面可视区高度
                    var height = $(window).height();
                    // 获取余下未显示部分高度
                    var other = $(document).height() - $(window).scrollTop() - height;
                    // 当余下未显示部分的高度小于页面可视高度的一半时（同时必须nextTmp有成员）
                    if (other < height * 0.5) {
                        // 对nextTmp进行判断，大于10则截取前10个，小于10则全部截取
                        if (nextTmp.length > len) {
                            tmp = nextTmp.splice(0, len);
                        } else {
                            tmp = nextTmp.splice(0);
                        }
                        // 通过模版生成节点
                        goodsList = template('mmbGoodsList', {result: tmp});
                        // 将节点加入页面中
                        $('.mmb-main').append(goodsList);
                    }
                    // 设置isLoading为加载数据完毕
                    isLoading = false;
                });
            } else {
                // 如果nextTmp小于10，则全部截取赋给tmp
                tmp = nextTmp.splice(0);
            }
            // 通过模版生成节点
            var goodsList = template('mmbGoodsList', {result: tmp});
            // 将节点加入页面中
            $('.mmb-main').append(goodsList);

        }
    });
    // 返回顶部按钮
    $('#mmbTop').on('click', function () {
        $(document.body).animate({scrollTop: '0px'}, 200, 'swing');
        return false;
    });
});