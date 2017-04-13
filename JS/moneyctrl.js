$(function() {

    var sum1 = localStorage.getItem('sumId');
    if (sum1) {
        try {
            sum1 = $.parseJSON(sum1);
        } catch (e) {
            var sum = 1;
            response(sum);
        }
        if (sum1.sum && sum1.flag) {
            response(sum1.sum);
            localStorage.removeItem('sumId');
        }
    } else {
        var sum = 1;
        response(sum);

    }
    // 封装获取字符串中数字的方法
    function getNum(text) {
        var value = text.replace(/[^0-9]/ig, "");
        return (value);
    }
    //用来获取折扣商品的列表信息


    function response(num) {
        $.ajax({
            url: 'http://139.199.157.195:9090/api/getmoneyctrl',
            dataType: 'jsonp',
            data: { pageid: num },
            beforeSend: function(){
                $('#cav').css('display','block');
                DreamLoading();
            },
            success: function(data) {
                $('#cav').css('display','none');
                cancelAnimationFrame(timer);
                // console.log(data);
                template.helper('getNum', getNum);
                var html = template('sqklist', data);
                $('#change').children().each(function(i, v) {
                    if (i + 1 == num) {
                        this.selected = true;
                    };
                });
                $('.mc_list').html(html);
            }
        })
    }

    // 点击切换页面
    var index;
    $('.pageChange a').click(function() {
        if (this.className == 'underPage') {
            // sum>0? sum--:1;
            if (sum == 1) {
                return
            }
            sum--;
        } else if (this.className == 'nextPage') {
            // sum<15? sum++:15;
            if (sum == 15) {
                return
            }
            sum++
        }
        
        response(sum);

    })
    $('#change').change(function() {
        index = $('#change ').get(0).selectedIndex;
        sum = index + 1;
        response(sum);

    })
    $('.mc_list').on('click','.onetwo',function(e) {
        window.localStorage.setItem("sumId", '{"sum":' + sum + '}');
    })
});
