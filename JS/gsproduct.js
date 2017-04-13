$(function() {
  var search = ["0", "0"];
  // 给fliter下的每个a标签加上一个私有属性isAjax，判断是否做过ajax请求
  $('.fliter ul li a').each(function() {
    this.isAjax = false;
  });
  $('.fliter ul li a').click(function(e) {
    var that = this;
    // 如果点击的是全部价格 则只执行dn样式的切换，结束
    if (that.parentNode == $('.fliter ul li')[2]) {
      $('.popprice').toggleClass('dn').siblings('.popbox').addClass('dn');
      $($(that).children('i')[0]).toggleClass('cur');
      return;
    }
    // 判断点击的是店铺栏还是区域栏
    var flag = that.parentNode == $('.fliter ul li')[0];
    var thisUrl = flag ? 'http://139.199.157.195:9090/api/getgsshop' : 'http://139.199.157.195:9090/api/getgsshoparea';
    
    // 如果没有做过ajax请求 则有且只执行一次
    if (!that.isAjax) {
      $.ajax({
        url: thisUrl,
        dataType: 'jsonp',
        success: function(data) {
          // 得到请求的数据渲染页面
          if (!that.isAjax) {
            that.isAjax = true;
          }
          var html, pop;
          if (flag) {
            html = template('tmpshop', data);
            pop = '.popsort';
            $('.popsort ul').html(html);
            $($('.popsort ul').children()[0]).addClass('on');
          } else {
            pop = '.popcat';
            html = template('tmpshopArea', data);
            $('.popcat ul').html(html);
            $($('.popcat ul').children()[0]).addClass('on');
          }

          // 给获取的元素绑定点击事件
          $(pop + ' ul li a').click(function(e) {

            // 给当前点击的a标签的父元素加上on样式 同级li标签移除on样式
            $(this).parent().addClass('on').siblings('li').removeClass('on');

            // 获取点击的当前a标签的文本内容 
            flag ? $(that).html($(this).html() + '<i></i>') : $(that).html($(this).html().substring(0, 2) + '<i></i>');

            // 隐藏当前div
            $(this).parent().parent().parent().addClass('dn');

            // 确定当前需要加载的内容
            search[0] = $('.popsort ul').find('li.on').children()[0] ? $('.popsort ul').find('li.on').children()[0].dataset.shopid : "0";
            search[1] = $('.popcat ul').find('li.on').children()[0] ? $('.popcat ul').find('li.on').children()[0].dataset.areaid : "0";
            productLoad();
          });

        }
      });
    }
    // 点击切换显示隐藏
    flag ? $('.popsort').toggleClass('dn').siblings('.popbox').addClass('dn') : $('.popcat').toggleClass('dn').siblings('.popbox').addClass('dn');
    $( that ).parent('li').next('li').children('a').children('i').removeClass('cur');
    $( that ).parent('li').siblings('li').children('a').children('i').removeClass('cur');
    $($( that ).children('i')[0]).toggleClass('cur');
  });

  // 初始获取数据
  productLoad();
  _touch.Scroll( document.body, 100);

  // 通过shopid和areaid获取对应的商品的ajax请求
  function productLoad() {
    $.ajax({
      url: 'http://139.199.157.195:9090/api/getgsproduct',
      dataType: 'jsonp',
      data: {
        shopid: search[0],
        areaid: search[1]
      },
      beforeSend: function(){
        $('#cav').css('display','block');
        DreamLoading();
      },
      success: function(data) {
        $('#cav').css('display','none');
        cancelAnimationFrame(timer);
        var html = template('tmpproduct', data);
        $('.coudan-box .bd ul').html(html);
      }
    });
  }
});