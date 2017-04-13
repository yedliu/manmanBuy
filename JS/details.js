/*
 * @Author: Administrator
 * @Date:   2017-03-29 23:26:25
 * @Last Modified by:   Administrator
 * @Last Modified time: 2017-03-30 10:02:41
 */

'use strict';
$(function () {
    setproductTitle();
    function setproductTitle() {
        //var v = parseUrl();
        //var getid = v['categoryid'];
        var productid = GetQueryString("productid");
        var productName = GetQueryString("productName");
        var productImg = GetQueryString("productImg");
        console.log(productName);
        $.ajax({
            //url: "http://139.199.157.195:9090/api/getcategorytitle",
            url:"http://mmb.ittun.com/api/getproduct",
            data:{"productid":productid},
            success: function (data) {
                var html = template("productListTmp", data);
                $(".product-name").html(html);
                //$(".category-title>.breadcrumb>li:last-child").html(categoryName);
                $(".product-img").html(productImg);
            }

        })




        function GetQueryString(name)
        {
            var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
            var r = window.location.search.substr(1).match(reg);
            if(r!=null)return  decodeURI(r[2]); return null;
        }

    }
})