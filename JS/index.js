$(function() {
    //获取菜单栏上的数据
    $.ajax({
        url: 'http://139.199.157.195:9090/api/getindexmenu',
        dataType: 'jsonp',

        beforeSend: function(){
            $('#cav').css('display','block');
            DreamLoading();
        },
        success: function(data) {
            $('#cav').css('display','none');
            cancelAnimationFrame(timer);
            var result = data.result;
            console.log(result);
            var ul = "<ul class='row'>";
            $.each(result, function(i, e) {
                ul += "<li class='col-xs-3'><a href=" + "html/" + e.titlehref + ">" + e.img.replace(/images/, 'images/icons') + "<p>" + e.name + "</p></li>";
            });
            ul += "</ul>";
            $("#menu").html(ul);
            $("#menu>ul>li:nth-child(5)").children('a')[0].href = "html/haitao.html";
            $("#menu>ul>li:nth-child(7)").children('a')[0].href = "html/history.html";
            var list = $("#menu>ul>li:nth-child(8)");
            list.children('a')[0].href = '#';
            list.on('click', function() {
                var divs = document.querySelectorAll("#menu>ul>li:nth-last-child(-n+4)");
                $.each(divs, function(i, v) {
                    v.classList.toggle('show');
                })
            })
        }
    });

    //用来获取折扣商品的列表信息
    $.ajax({
        url: 'http://139.199.157.195:9090/api/getmoneyctrl',
        dataType: 'jsonp',
        success: function(data) {
            var html = template('list', data);
            $('.list-content').html(html);
            // $('.list-content').on('click', function(e) {
            //     console.log(111111)
            //     var liId = e.target;
            //     console.log(liId);
            //     var result = data.result;
            //     $.each(result, function(i, v) {
            //         var id = v['productId'];
            //         return id;
            //     })


            // })

        }

    });



});
