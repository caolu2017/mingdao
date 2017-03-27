function myFun() {
    var endTime = 0;
    var startTime = 0;
    var pageCount = 0;//第几页
    var allPage = 6;//总页数
    var startScroll = true;

    $(document).on("mousewheel DOMMouseScroll", function (e) {
        e.preventDefault();
        if (startScroll) {
            startTime = new Date().getTime();
            var delta = e.originalEvent.wheelDelta || -e.originalEvent.detail;
            if ((endTime - startTime) <= -800) {//每一屏切换相隔800ms
                if (delta < 0) {//向下切换
                    pageCount++;
                    if (pageCount > allPage) {
                        pageCount = allPage;
                        return false;
                    }
                } else if (delta > 0) {//向上切换
                    pageCount--;
                    if (pageCount < 0) {
                        pageCount = 0;
                        return false;
                    }
                }
                goPageDown(pageCount);
                $(`#nav ul>li span:eq(${pageCount})`).addClass('active').parent().siblings().children().removeClass('active');
                if(pageCount==6){
                    $('.mainBox').animate({top: `${-100 * pageCount+70}%`}, 800);
                }else{
                    $('.mainBox').animate({top: `${-100 * pageCount}%`}, 800);
                }
                endTime = new Date().getTime();
            } else {
                return false;
            }
        }
    })

    $('#nav ul').on('click', 'li', function () {
        var i = $(this).index();
        pageCount = i;
        goPageDown(pageCount);
        $(`#nav ul>li span:eq(${pageCount})`).addClass('active').parent().siblings().children().removeClass('active');
        if(pageCount==6){
            $('.mainBox').animate({top: `${-100 * pageCount+70}%`}, 800);
        }else{
            $('.mainBox').animate({top: `${-100 * pageCount}%`}, 800);
        }
    })

    var goPageDown = function (pageCount) {
        switch (pageCount) {
            case 0:
                $('.one .actwa').css('opacity', 0);
                page();
                $('footer').css('height', 0);
                $('.two .pic').css('left', '-1000px');
                break;
            case 1:
                $('footer').css('height', 0);
                $('.two .pic').css('left', '-54px');
                $('.three .pic').css('top', '600px');
                break;
            case 2:
                $('.three .pic').css('top', '-50px');
                $('.four .pic').removeClass('active');
                $('.two .pic').css('left', '-1000px');
                break;
            case 3:
                $('.four .pic').addClass('active');
                $('.three .pic').css('top', '-800px');
                break;
            case 4:
                $('.four .pic').removeClass('active');
                break;
        }
    }
    var page = function () {
        $('.one .task').animate({opacity: 1}, 500, function () {
            $('.one .feed').animate({opacity: 1}, 400, function () {
                $('.one .chat').animate({opacity: 1}, 300, function () {
                    $('.one .knowledge').animate({opacity: 1}, 200, function () {
                        $('.one .calendar').animate({opacity: 1}, 200, function () {
                            $('.one .vate').animate({opacity: 1}, 200, footer())
                        })
                    })
                })
            })
        });
    }

    function footer() {
        $('footer').css('height', '80px');
    }

    var init = function () {
        page();
    }
    init();
}


(function ChangeImg() {
    //$('.three ul>li').on('mouseenter',function(){
    //    url($(this));
    //})
    //function url(eml){
    //    var str=$(eml).css('background-image');
    //    var reg=/h/g;
    //    str=str.replace(reg,'c');
    //    var str=str.substr(str.indexOf('images'));
    //    var str=str.slice(0,-2);
    //    $(eml).css('background-image',`url(${str})`);
    //}
    //function orgUrl(eml){
    //    var str=$(eml).css('background-image');
    //    var reg=/c/g;
    //    str=str.replace(reg,'h');
    //    var str=str.substr(str.indexOf('images'));
    //    var str=str.slice(0,-2);
    //    $(eml).css('background-image',`url(${str})`);
    //}
    //$('.three ul>li').on('mouseleave',function(){
    //    orgUrl($(this));
    //})
    //window.setInterval(function(){
    //    var len=$('.three ul>li').size();
    //    for(var i=0;i<len;i++){
    //        $('.three ul>li')
    //    }
    //},5000);
    var list = $('.three ul>li');
    //for(var i=0;i<list.length;i++){
    //    (function(j){
    //        window.setInterval(function(){
    //            $(j).addClass('currnt').siblings('.currnt').removeClass('currnt');
    //            console.log(j);
    //        },6000)
    //    })(list[i])
    //
    //}
    var tag = 0;
    var timer = setInterval(function () {
        tag++;
        if (tag > list.length) {
            tag = 1;
        }
        $(list[tag - 1]).addClass('currnt').siblings('.currnt').removeClass('currnt');
        $('.three .pic').css('background-image', `url(images/p3banner${tag}.png)`);
    }, 2000)

    $('.three ul>li').on('mouseenter', function () {
        var i = $(this).index();
        $(this).addClass('currnt').siblings('.currnt').removeClass('currnt');
        $('.three .pic').css('background-image', `url(images/p3banner${++i}.png)`);
        clearInterval(timer);
        tag=i;
    })
    $('.three ul>li').on('mouseleave', function () {
        timer = setInterval(function () {
            tag++;
            if (tag > list.length) {
                tag = 1;
            }
            $(list[tag - 1]).addClass('currnt').siblings('.currnt').removeClass('currnt');
            $('.three .pic').css('background-image', `url(images/p3banner${tag}.png)`);
        }, 2000)
    })
})()


window.onload = myFun();