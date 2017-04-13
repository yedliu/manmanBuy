'use strict';
$(function(){
    //品牌列表请求数据
    getList();
    $('.app-show').on('click', '.closefix', function(event) {
        event.preventDefault();
        $('.app-show').css('display','none');
    });
    function getList(){
        $.ajax({
            type:'get',
            url:"http://139.199.157.195:9090/api/getbrandtitle",
            success:function(data){
                // console.log(data);
                var html = template("listTmp",data);
                $("#mmb-list").html(html);
               


                //点击进入品牌大全
                var lis = $('#mmb-list ul li');
                
                // console.log(lis);
                lis.click(function(){
                    var html = '';
                    //获取自定义属性，用于URL传参
                    var title = this.dataset.id;
                    // 获取当前点击的li里的值
                    var listValue = $(this).children().text();
                    // 获取要设置的元素
                    var ac = $('#mmb-top .active');
                    // 截取需要的字符串
                    var result = listValue.slice(0,listValue.length-4)
                    //给元素设置内容
                    ac.text(result + '哪个牌子好');
                    $.ajax({
                        type:'get',
                        url:'http://139.199.157.195:9090/api/getbrand',
                        dataType:'json',
                        data:{brandtitleid:title},
                        success:function(data){
                             html = template("detailsTmp",data);
                            // $("#mmb-list").html(html);
                        }
                    });
                    
                    //产品销量请求数据
                    $.ajax({
                        type:'get',
                        url:"http://139.199.157.195:9090/api/getbrandproductlist",
                        dataType:'json',
                        data:{brandtitleid:title},
                        success:function(data){
                             html += template("salesTmp",data);
                            // $("#mmb-list").html(html);
                        }
                    });
                    //产品评论请求数据
                    $.ajax({
                        type:'get',
                        url:"http://139.199.157.195:9090/api/getproductcom",
                        dataType:'json',
                        data:{productid:title},
                        success:function(data){
                            html += template("commentTmp",data);
                            $("#mmb-list").html(html);
                            //获取要设置的元素
                            var goodValue = $('#details .good h2'),
                                goodValue1 = $('#sales .good h2'),
                                goodValue2 = $('#comment .good h2');
                                //给元素设置内容
                                goodValue.text(result + '哪个牌子好');
                                goodValue1.text(result + '产品销量排行');
                                goodValue2.text(result + '最新评论');

                                // 详情商品请求数据
                                var as = $('#details ul li a');
                                // console.log(as);
                                as.click(function(){
                                    var brId = this.dataset.id;
                                    // console.log(brId);
                                    // console.log(title);
                                    $.ajax({
                                        type:'get',
                                        url:'http://139.199.157.195:9090/api/getbrandproductlist',
                                        dataType:'json',
                                        data:{brandtitleid:brId},
                                        beforeSend: function(){
                                            $('#cav').css('display','block');
                                            DreamLoading();
                                        },
                                        success:function(data){
                                            $('#cav').css('display','none');
                                            cancelAnimationFrame(timer);
                                            html = template('prdTmp',data);
                                            $('#all').html(html);
                                        }
                                    });
                                });

                                //商品描述请求数据
                                var asc = $('#sales ul li a');
                                asc.click(function(){
                                    var comId = this.dataset.id;
                                    console.log(comId);
                                    var html = '';
                                    $.ajax({
                                        type:'get',
                                        url:'http://139.199.157.195:9090/api/getproduct',
                                        dataType:'json',
                                        data:{productid:comId},
                                        success:function(data){
                                            html = template('productTmp',data);


                                             $.ajax({
                                    type:'get',
                                    url:'http://139.199.157.195:9090/api/getproductcom',
                                    dataType:'json',
                                    data:{productid:comId},
                                    success:function(data){
                                        html += template('plTmp',data);
                                         $('#all').html(html);
                                    }
                                }); 
                                           
                                        }
                                    });

                                     //商品评论请求数据
                               
                                });
                               
                        }
                    });
                });
               
            }
            
        });
        
    }
     
    
});