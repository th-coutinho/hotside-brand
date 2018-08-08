var $frame = $('.frame');
        
        var top = $('html').offset().top;

        var iScrollPos = 0;
        
        var x = $('.loading-image');

        var isMobile = isMobile;

        

        var checkFrame = function() {
            var iCurScrollPos = $(this).scrollTop();
            
            var initialPosition = isMobile ? 350 : 350;
            var lastFramePosition = isMobile ? 3500 : 300;
            var maxPosition = isMobile ? 3500 : $("#computer").offset().top - 400;
            var fixedPosition =  isMobile ? 3690 : $("#computer").offset().top - ( $("#computer").height() / 2.5) + 198;

            if (iScrollPos < initialPosition) {
                updateFrame(1);
            }
            if (iScrollPos > initialPosition && iScrollPos < maxPosition) {
                $('.frame').removeClass("final-position");

                if (isMobile) {
                    var calculateFrame;
                    calculateFrame = parseInt((iScrollPos / 54) - 6);
                    var currentFrame = getCurrentFrame();

                    if (calculateFrame != currentFrame ) {
                        updateFrame(calculateFrame);
                    }
                }

                else {
                    var body = document.body,
                    html = document.documentElement;
                    var height = Math.max( body.scrollHeight, body.offsetHeight, 
                    html.clientHeight, html.scrollHeight, html.offsetHeight );
                    
                    window.height = height;
                    window.current = iScrollPos;    

                    var calculateFrame;
                    calculateFrame = parseInt(( iScrollPos / (height / 95)) - 7);
                    console.log( iScrollPos / (height / 55));
                    var currentFrame = getCurrentFrame();

                    if (calculateFrame != currentFrame && calculateFrame <= 55 ) {
                        updateFrame(calculateFrame);
                    }
                }
            }
            
            
            if (iScrollPos > maxPosition && ! $('.frame').hasClass("final-position")) {
                $('.frame').addClass("final-position"); 
            }

            if (iScrollPos >= fixedPosition && ! $('.frame').hasClass("fixed")) {
                
                $('.frame').addClass("fixed");
                if ($(window).width() <= 992) {
                    $('.frame').css({
                        'top' : $('#computer').offset().top  + $(window).width() / 2 + 'px'
                    });
                }
            }

            if (iScrollPos < fixedPosition && $('.frame').hasClass("fixed")) {
                
                $('.frame').removeClass("fixed");
                $('.frame').css({
                    'top' : 0 + 'px'
                });
            
            }
            

            iScrollPos = iCurScrollPos;
        };
        
        var updateFrame = function(frameNumber) {
            if (frameNumber.toString().length == 1) {
                frameNumber = `0${frameNumber}`;
            }

            $frame.attr("src", getFrameUrl(frameNumber));
        };

        var changeCurrentFrame = function() {
            $frame.attr("src", getNextFrame(status));
        }

        var getCurrentFrame = function() {
            var frameNumber = $('.frame').attr('src');
            //console.log(frameNumber);
            var stringStart, stringEnd;
            stringStart = frameNumber.lastIndexOf('/') + 1;
            stringEnd = frameNumber.lastIndexOf('-');
            frameNumber = parseInt(frameNumber.substring(stringStart, stringEnd));
            return frameNumber;
        }

        var getFrameUrl = function (frameNumber) {
            return `images/animation/${frameNumber}-min.jpg`;
        }

        var loadImages = function() {
            
            var loadedImages = 0;

            for (let index = 0; index < 56; index++) {

                var image_src;

                if (index.toString().length == 1) {
                    image_src = `images/animation/0${index}-min.jpg`;
                }

                else {
                    image_src = `images/animation/${index}-min.jpg`;
                }               

                var image = new Image();
                image.src = image_src;

                image.onload = function(e){
                    loadedImages++;

                    if (loadedImages == 56) {
                        console.log('carreguei todas as imagens');
                        setTimeout(function() {
                            proceed();
                        }, 3000) 
                    }
                }
            }      
            
        };

        var proceed = function (param) {
            //console.log('activate loaded');
            $('.general-container').addClass('loaded');
            setTimeout(() => {
                $('.general-container').addClass('finished');
            }, 3000);
            $('.loading').addClass('loaded');
        }
        
        $(window).on('load', function() {
            $("html, body").animate({ scrollTop: 0 }, "slow");
            loadImages();
        });

        $(window).scroll(function () {
            checkFrame();
        });

        $(".animated-text").on('click', function() {
            $("#video").addClass('opened');
            $("html, body").animate({ scrollTop: $(document).height() }, 2500);
        });

