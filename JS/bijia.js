
$(function () {
    var getid = GetQueryString("productId");
    //获取window.sessionStorage存储的值
    //var productid;
    $.ajax({
        url: "http://139.199.157.195:9090/api/getproduct",
        //url: "http://mmb.ittun.com/api/getproduct",//分类详情api
        data:{"productid":getid},
        success: function (data) {//把分类详情 数据加载到页面中
            //var html = template("breadtitleTmp", data);
            //
            //$(".bread-title").html(html);

            var html = template("detailsTmp", data);

            $(".product-bijia").html(html);//把分类列表功能数据加载到页面中

            var html = template("buyTmp", data);

            $(".plist>a").html(html);

            // 面包屑二级标题
            var getid = window.sessionStorage.getItem('getid');
            var categoryName = window.sessionStorage.getItem('categoryName');
            var getpageid = window.sessionStorage.getItem('getpageid');
            console.log(getid);
            console.log(categoryName);
            console.log(getpageid);

            $(".breadcrumb >li:nth-child(2)>a").html(categoryName)
                .attr("href", "productlist.html?categoryid=" + getid + "&categoryname=" + categoryName + "&pageid=" + getpageid);
            //使用原生ajax请求获取面包屑三级标题
            data = data.result;
            if (data) {
                console.log( data[0] );
                $(".breadcrumb >li:nth-child(3)>a").html(data[0].productName.split(" ")[0]);
                //直接使用已经加载好得页面上的dom元素获取的html文本给面包屑三级标题添加文本
                //console.log($(".product-name").html())
                //console.log($(".product-name").html().split(" "))
                //$(".bread-title").html($(".product-name").html().split(" ")[0]);

                //动态生成页面的标题
                $("title").html(data[0].productName.split(" ")[0] + "价格，多少钱");
            }
        }
    })

        //评论详情api  http://mmb.ittun.com/api/getproductcom?productid=1.comContent 是评论
    $.ajax({

        url:"http://139.199.157.195:9090/api/getproductcom?productid="+getid,
        //url:"http://mmb.ittun.com/api/getproductcom?productid="+getid,
        success: function (data) {
            var html=template("commentTmp",data);
            $(".product-com-list").html(html);
        }

    })

    //获取url参数的方法：
    function GetQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null)return decodeURI(r[2]);
        return null;
    }

})