/*
 * @Author: Administrator
 * @Date:   2017-03-29 23:26:25
 * @Last Modified by:   Administrator
 * @Last Modified time: 2017-03-30 10:02:41
 */

'use strict';//严格模式
$(function () {
    setCategoryTitle();
    function setCategoryTitle() {
        $.ajax({
            //分类标题api
            url: "http://139.199.157.195:9090/api/getcategorytitle",
            //url: "http://mmb.ittun.com/api/getcategorytitle",
            //获取分类标题数据
            success: function (data) {
                //把分类标题中的数据传入模板中
                var html = template("categoryTitleTmp", data);
                console.log(1)
                //把模板中的数据传入到分类页面中去
                $("#category>.panel-group").html(html);
                var categoryTitle = $("#category>.panel-group>.panel-default>.panel-heading>h4>a");
                //给分类标题注册点击事件
                categoryTitle.on("click", function (e) {
                    //获取当前标题的自定义属性
                    var titleId = $(this).attr("data-titleId");
                    $.ajax({
                        //标题对应的分类列表api
                        url: "http://139.199.157.195:9090/api/getcategory?titleid=" + titleId,
                        //url: "http://mmb.ittun.com/api/getcategory?titleid=" + titleId,//传入当前标题的id
                        success: function (data) {
                            //把分类标题中的分类列表数据传入模板中
                            var html = template("categoryTmp", data);
                            //获取页面中接收数据的元素
                            var panelBody = $(e.target).parents('div.panel-heading').next("div").children('.panel-body');
                            //console.log(panelBody);//0:div.panel-body.show
                            //把分类列表渲染到页面中
                            panelBody.html(html);
                            //var panelBody=$(e.target).parent().parent().parent().find(".collapseOne").find(".panel-body");
                            //console.log(panelBody);//selector:".collapseOne .panel-body"

                        }
                    })
                })

            }
        })
    }
})