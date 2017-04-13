'use strict';
$(function() {
    //var v = parseUrl();
    //var getid = v['categoryid'];
    //通过url获取参数的方法，获取上一个页面的a链接传入的参数
    var getid = GetQueryString("categoryid"); //商品分类的id
    var categoryName = GetQueryString("categoryname"); //商品分类列表的id
    //window.localStorage.setItem("categoryName", categoryName);
    //window.sessionStorage.setItem("categoryName", categoryName);

    //动态生成页面的标题
    $("title").html(categoryName + "比价选购 - 慢慢买比价网");

    var getpageid = GetQueryString("pageid"); //页码id = 1 初始值
    var maxpageid; //定义最大的页码id
    //var flag = true; //开启节流阀  异步加载时有page值则不再执行下拉框的获取操作
    //console.log(categoryName);
    Page(getpageid); //页面加载时默认执行第一页  只要页面刷新了就执行这个函数
    //点击上一页下一页
    // 需求：1.点击上一页回到上一页 点击下一页回到下一页 如果是第一页或者是最后一页则不进行页面的渲染
    //2.点击上下页显示页面时，中间的select下拉框也要动态跟着变化

    $('#productList .page a').click(function() {
        //1.点击上一页回到上一页 点击下一页回到下一页 如果是第一页或者是最后一页则不进行页面的渲染
        if (this.dataset.index == 'up') { //如果当前按钮的属性index是up 说明是下一页
            getpageid < maxpageid ? getpageid++ : 0; //那么满足页码id < 最大页码id 就让页码id ++，否则就不进行操作
        } else { //如果当前按钮的属性index是down 说明是上一页
            getpageid > 1 ? getpageid-- : 0; //那么满足页码id > 1  就让页码id -- ，否则就不进行操作
        }
        //直接调用page函数不改变url的值是异步加载不刷新页面
        //1.Page(getpageid); //在页面上渲染对应的页码 页面

        //2.再点击上下页的时候，页面的url地址栏跟着动态刷新页面
        // 此时 因为下拉框的值是随着url地址栏的pageid变化的  所以不需要再对下拉框进行操作  页面刷新后直接调用page函数
        window.location.href = 'productlist.html?categoryid='+ getid +'&categoryname='+ categoryName +'&pageid='+ getpageid;
        //2.点击上下页显示页面时，中间的select下拉框也要动态跟着变化

        /*$('#selectPage').children().each(function(i, v) { //获取下拉框中的所有option按钮 遍历
            if ((i + 1) == getpageid) { //option（i）是从0开始的  如果i+1= 页码id
                this.selected = true; //那么就选中
                //console.log(i+","+v);// i 是 option的索引  v是每一个option标签
            }
        });*/

       /* 方法二：点击上下页 获取对应的页面
       $('.down').click(function(){//点击上一页的时候
            if(pageid<=1) return;//如果pageid < =1 直接返回不进行操作
            var location = window.location.href;//否则保存当前点击时页面的url值
            //用数组的substr方法从0开始截取到倒数第二个 url字符串的值
            window.location = location.substr(0,location.length-1)+(parseInt(pageid)-1);//再让pageid - 1 设置需要跳转的上一页
        });
        $('.up ').click(function(){//点击下一页的时候
            if(pageid>=maxpageid) return;//如果pageid > =1 直接返回不进行操作
            var location = window.location.href;//否则保存当前点击时页面的url值
            window.location = location.substr(0,location.length-1)+(parseInt(pageid)+1);//再让pageid + 1 设置需要跳转的下一页
        });*/



    });

    //改变select下拉框中的值 让当前页面对应的显示
    $('select').change(function(e) {
        //console.log($(this).val());
        //1.实现异步加载  但是页面的url地址栏是不变的 页面不刷新
        //Page($(this).val()); //把当前下拉框的值传入page方法中  渲染到页面中
        //2.实现同步加载 页面的url地址栏会改变 页面会刷新  刷新了页面 一加载就执行page函数
        var getpageid=$(this).val();
        window.location.href = 'productlist.html?categoryid='+ getid +'&categoryname='+ categoryName +'&pageid='+ getpageid;

    })

    function Page(num) { //传入页码 参数
        $.ajax({
            url: "http://139.199.157.195:9090/api/getproductlist",
            //url: "http://mmb.ittun.com/api/getproductlist",
            data: { "categoryid": getid, "pageid": num },
            beforeSend: function(){
              $('#cav').css('display','block');
              DreamLoading();
            },
            success: function(data) {
                $('#cav').css('display','none');
                cancelAnimationFrame(timer);
                var html = template("productListTmp", data);
                //li:last-child li的父元素中的最后一个li标签
                //$(".category-title>.breadcrumb>li:last-child").html(categoryName);
                //li:last-of-type li的同类型中的最后一个li标签

                //获取当前页面共需要几页
                maxpageid = Math.ceil(data.totalCount / data.pagesize);
                $(".media").html(html); //把分类列表功能数据加载到页面中

                //把获取到的标题加载到面包屑标题中
                $(".category-title>.breadcrumb>li:last-of-type").html(categoryName);

                //if (flag) { //页面刚加载时执行下拉框页码操作
                    //select
                    html = ''; //html变量已经用完 可以复用 不用重新定义一个新的变量 直接先清空即可
                    for (var i = 1; i <= maxpageid; i++) {
                        //把页码 1/3  动态加到下拉框中
                        html += '<option value="' + i + '">' + i + '/' + maxpageid + '</option>';
                    }
                    $('#selectPage').html(html); //把option数据加载到下拉框中

                    //页面刷新时 下拉框选中的值跟着动态变化
                    $('#selectPage').children().each(function(i, v) { //获取下拉框中的所有option按钮 遍历
                        //选中的条件 索引的值 = pageid  选中下拉框对应的值
                        if ((i + 1) == getpageid) { //option（i）是从0开始的  如果i+1= 页码id
                            this.selected = true; //那么就选中
                            //console.log(i+","+v);// i 是 option的索引  v是每一个option标签
                        }
                    });

                    //flag = false; //只要一获取到下拉框的数据，就关闭节流阀  以免下一次调用page函数时重复渲染

                //}

                //遍历media的每一个a标签，点击a链接时  保存url 参数的值  以便详情页面使用
                $(".media >a").each(function(i,v){
                    $(v).click(function () {
                        window.sessionStorage.setItem("categoryName", categoryName);
                        window.sessionStorage.setItem("getid", getid);
                        window.sessionStorage.setItem("getpageid", getpageid);

                    })
                })

            }

        })
    }

    //获取url参数的方法：
    function GetQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return decodeURI(r[2]);
        return null;
    }
})
    /*获取url参数的方法二：
     function parseUrl() {
     var url = location.href;
     var i = url.indexOf('?');
     if (i == -1) return;
     var querystr = url.substr(i + 1);
     var arr1 = querystr.split('&');
     var arr2 = new Object();
     for (i in arr1) {
     var ta = arr1[i].split('=');
     arr2[ta[0]] = ta[1];
     }
     return arr2;
     }
     */

