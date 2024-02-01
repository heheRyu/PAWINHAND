$(document).ready(function(){
    let ww=$(window).width();
    let wh=$(window).height();
    let before_time=new Date().getTime();
    let now_time=new Date().getTime();
    let page_index=0;
    let direction='';
    layout();
    $(window).resize(function(){
        layout()
    })
    function layout(){
        ww=$(window).width();
        wh=$(window).height();
        $(".wrap,.page_wrap").css({
            width:ww,
            height:wh*13
        })
        $(".page").css({
            width:ww,
            height:wh
        })


    }

// ===== 기능 =====
    // function scroll_down(){
    //     ww=$(window).width();
    //     wh=$(window).height();
        
    //     if(page_index<13){
    //         page_index++;
    //         direction='down';
    //         $(".page_wrap").animate({
    //             top:-page_index*wh
    //         },'slow')
    //         if(page_index==0){
    //             $(".maintit").animate({
    //                 opacity:1,
    //                 top:ww*0.2
    //             },1200)
    //         }else if(page_index==2){
    //             $(".story_img1").
    //         }
    //         before_time=now_time;
    //     }
    // }
    function scroll_down() {
        ww = $(window).width();
        wh = $(window).height();
    
        if (page_index < 13) {
            page_index++;
            direction = 'down';
    
            $(".page_wrap").animate({
                top: -page_index * wh
            }, 'slow', function() {
                if (page_index == 0) {
                    $(".maintit").animate({
                        opacity: 1,
                        top: ww * 0.2
                    }, 1200);
                }else if (page_index == 2) {
                    // 페이지 2에 대한 추가 조건
                    let scaleCount = 0;  // 스케일 변화 횟수
                    let scale = 1;      // 초기 스케일 값
    
                    $(".story_img1").on("mousewheel", function(event) {
                        if (event.originalEvent.deltaY > 0) {
                            // 휠을 아래로 내릴 때 스케일 증가
                            scale += 0.2;
                        } else {
                            // 휠을 위로 올릴 때 스케일 감소
                            scale -= 0.2;
                        }
    
                        // 최대 스케일 제한
                        scale = Math.min(2, scale);
    
                        // 스케일 조절
                        $(".story_img1").css("transform", `scale(${scale})`);
    
                        scaleCount++;
    
                        if (scaleCount >= 5) {
                            // 5번 크기가 커졌으면 다음 페이지로 이동
                            scaleCount = 0;
                            scale = 1;
                            scrollToNextPage();
                        }
                    });
                }
    
                before_time = now_time;
            });
        }
    }
    
    function scrollToNextPage() {
        // 다음 페이지로 이동
        console.log("Go to the next page");
    
        // 여기서 필요한 페이지 이동 로직을 추가하세요.
    
        // 페이지 이동 후 애니메이션 종료
        isAnimating = false;
    }
    

    function scroll_up(){
        ww=$(window).width();
        wh=$(window).height();
        if(page_index>0){
            page_index--;
            direction='up';
            $(".page_wrap").animate({
                top:-page_index*wh
            },'slow')
            before_time=now_time;
        }
    }

    $(window).on("mousewheel",function(event){
        $(".page_wrap").clearQueue();
        now_time=new Date().getTime();

        if(0>event.originalEvent.wheelDeltaY){
            if(direction=='down'){
                if(before_time+100<now_time){
                    if(page_index>=0){
                        scroll_down();
                    }else{
                        scroll_up();
                    }
                }
            }else{
                if(page_index>=0){
                    scroll_down();
                }else{
                    scroll_up();
                }
            }
        }else{
            if(direction=='up'){
                if(before_time+100<now_time){
                    if(page_index<=13){
                        scroll_up();
                    }else{
                        scroll_down();
                    }
                }
            }else{
                if(page_index<14){
                    scroll_up();
                }else{
                    scroll_down();
                }
            }
        }
    })



    




    
})