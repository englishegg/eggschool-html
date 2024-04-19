document.addEventListener("DOMContentLoaded", function() {
    //미국 어린이의 일상을 ....
    let element = document.querySelector(".content_list.kinder");
    let element2 = document.querySelector(".content_list.element");
    let element3 = document.querySelector(".content_list.library");
    let itemWidth = document.querySelector(".auto_slide .content_block").offsetWidth;

    element.style.transform = `translate3d(${itemWidth/2}px, 0, 0)`;
    element2.style.transform = `translate3d(-${itemWidth/3}px, 0, 0)`;
    element3.style.transform = `translate3d(${itemWidth/4}px, 0, 0)`;

    const move = gsap.to(element, {
        duration: 30,
        x: itemWidth + 30,
        timeScale: 1,
        repeat: -1,
        ease: "none",
    });

    document.ready = function () {
        move.play();
    };

    element.addEventListener("mouseover", function () {
        gsap.to(move, { timeScale: 0.3, duration: 1 });
    });

    element.addEventListener("mouseleave", function () {
        gsap.to(move, { timeScale: 1, duration: 1 });
    });

    const move2 = gsap.to(element2, {
        duration: 40,
        x: -itemWidth - 29,
        timeScale: 1,
        repeat: -1,
        ease: "none",
    });

    element2.addEventListener("mouseover", function () {
        gsap.to(move2, { timeScale: 0.3, duration: 1 });
    });

    element2.addEventListener("mouseleave", function () {
        gsap.to(move2, { timeScale: 1, duration: 1 });
    });

    const move3 = gsap.to(element3, {
        duration: 30,
        x: itemWidth + 30,
        timeScale: 1,
        repeat: -1,
        ease: "none",
    });

    element3.addEventListener("mouseover", function () {
        gsap.to(move3, { timeScale: 0.3, duration: 1 });
    });

    element3.addEventListener("mouseleave", function () {
        gsap.to(move3, { timeScale: 1, duration: 1 });
    });

    // 국내 유일 자체 제작 콘텐츠 Mobile
    let recordSwiper = new Swiper('#recordSwiper', {
        slidesPerGroup: 1,
        spaceBetween: 17,
        slidesPerView: 2,
        centeredSlides: true,
        initialSlide: 1,
        breakpoints: {
            640 : {
                spaceBetween: 3,
                spaceBetween: 30,
            }
        }
    });

    // 모국어 습득방식 기반의 ...
    function methodSwiper(){
        const windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        let $methodSwiper;
        // Check if $methodSwiper is already initialized
        if ($methodSwiper) {
            $methodSwiper.destroy(true, true);
        }

        if (windowWidth > 640) {
            // pc
            $methodSwiper = new Swiper('#methodSwiper', {
                loop: true,
                slidesPerView: 'auto',
                spaceBetween: 24,
                observer : true, 
                navigation: {
                    enabled: true,
                    nextEl: ".line_next",
                    prevEl: ".line_prev",
                },
                pagination: {
                    el: ".number_pagination",
                    type: "fraction",
                    formatFractionCurrent: function (number) {
                        return ('0' + number).slice(-2);
                    },
                    formatFractionTotal: function (number) {
                        return ('0' + number).slice(-2);
                    },
                    renderCustom: function (swiper, current, total) {
                        return current + '/' + total;
                    }
                },
                on: {
                    init: function () {
                        // 초기화시 첫 번째 슬라이드를 활성화
                        this.slides[0].classList.add('active');
                    },
                    slideChange: function(){
                        this.slides[this.activeIndex + 2]?.classList.remove('active');
                        this.slides[this.activeIndex + 1]?.classList.remove('active');
                    },
                    slideChangeTransitionEnd: function () {
                        this.slides[this.activeIndex].classList.add('active');
                        this.slides[this.activeIndex + 4]?.classList.remove('active');
                        $methodSwiper.update();
                    },
                    slidePrevTransitionEnd: function () {
                        this.slides[this.activeIndex - 1]?.classList.remove('active');
                        this.slides[this.activeIndex].classList.add('active');
                        
                        $methodSwiper.update();
                    }
                },
            });
        } else {
            // mo
            $methodSwiper = new Swiper('#methodSwiper', {
                loop: true,
                slidesPerView: 1.8,
                spaceBetween: 17,
                observer: true,
                breakpoints: {
                    640 : {
                        spaceBetween: 23,
                        slidesPerView: 2.5,
                    }
                },
                pagination: {
                    el: ".number_pagination",
                    type: "fraction",
                    formatFractionCurrent: function (number) {
                        return ('0' + number).slice(-2);
                    },
                    formatFractionTotal: function (number) {
                        return ('0' + number).slice(-2);
                    },
                    renderCustom: function (swiper, current, total) {
                        return current + '/' + total;
                    }
                },
            });
        }
    }
    //init
    methodSwiper();
    window.addEventListener('resize', methodSwiper);

    /* S:swiper custom  */

    // swiper-wrapper .container 왼쪽 맞춤
    function swiperRight() {
        const $container = document.querySelector('.container');
        const $swiperRight = document.querySelectorAll('.swiper_right');
        $swiperRight.forEach(el => {
            el.style.transform = `translateX(${$container.offsetLeft}px)`;
        });
    }

    const $videoFrame = document.querySelector('.video_section .video_frame');
    const $videoSwiper = document.querySelector('#videoSwiper');

    $videoSwiper.style.top = `-${$videoFrame.offsetHeight - 14}px`;

    swiperRight();
    window.addEventListener('resize', swiperRight);
    /* E:swiper custom  */

    // 한 눈에 보는 구성
    let videoSwiper = new Swiper('#videoSwiper', {
        width: 312,
        slidesPerGroup: 1,
        slidesPerView: 'auto',
        spaceBetween: 20,
        navigation: {
            enabled: true,
            nextEl: ".btn_circle_next",
            prevEl: ".btn_circle_prev",
        },
        on: {
            init: function () {
                // 초기화시 첫 번째 슬라이드를 활성화
                this.slides[0].classList.add('active');
            },
            slideChangeTransitionEnd: function () {
                const $tags = document.querySelectorAll('.video_product_block .product_name');
                $tags.forEach(tag => tag.classList.remove('active'));
                $tags[this.realIndex].classList.add('active');

                this.slides.forEach(slide => slide.classList.remove('active'));
                this.slides[this.activeIndex].classList.add('active');

                this.slides[this.activeIndex - 1]?.classList.remove('active');
                this.slides[this.activeIndex + 1]?.classList.remove('active');

                videoSwiper.update();
            },
            slidePrevTransitionEnd: function () {
                const $tags = document.querySelectorAll('.video_product_block .product_name');
                $tags.forEach(tag => tag.classList.remove('active'));
                $tags[this.realIndex].classList.add('active');

                this.slides.forEach(slide => slide.classList.remove('active'));
                this.slides[this.activeIndex].classList.add('active');

                this.slides[this.activeIndex - 1]?.classList.remove('active');
                this.slides[this.activeIndex + 1]?.classList.remove('active');

                videoSwiper.update();
            },
        }
    });

    // 한 눈에 보는 구성 Mobile
    var mVideoThumbsSwiper = new Swiper("#mVideoThumbsSwiper", {
        spaceBetween: 4,
        slidesPerView: 3,
    });
    var mVideoSwiper = new Swiper("#mVideoSwiper", {
        spaceBetween: 30,
        slidesPerView: 1,
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        thumbs: {
            swiper: mVideoThumbsSwiper,
        },
    });

    function handleStickyNav(index){
        const $stickyNav = document.querySelectorAll(".sticky_link");
        $stickyNav.forEach(link => {
            link.classList.remove("active");
        });
        $stickyNav[index].classList.add('active');
    }

    // fixed block
    const sticky = [document.querySelector(".sticky_section.pc_ver .sticky_wrapper"),
        document.querySelector(".pc_ver.sticky_section .ico_flower.top"),
        document.querySelector(".pc_ver.sticky_section .ico_flower.btm") ];
    const $stickySection = document.querySelector(".pc_ver.sticky_section");
    const $stickyWrapper= document.querySelector(".pc_ver.sticky_section .sticky_wrapper");

    sticky.forEach( sticky => {
        gsap.to(sticky, {
            scrollTrigger: {
                trigger: sticky,
                start: "top top",
                end: "bottom bottom",
                endTrigger: $stickySection,
                pin: true,
            },
        });
    });

    let $recommendSection = document.querySelector(".pc_ver .recommend_section");

    gsap.to($recommendSection, {
        scrollTrigger: {
            trigger: $recommendSection,
            start: "top center",
            end: "bottom bottom",
            // endTrigger: $recommendSection,
            // pin: true,
            scrub: 1,
            // markers: true,
            onEnter: function () {
                handleStickyNav(0);
                $stickySection.classList.add('bg_recommend');
            },
            onEnterBack: function () {
                handleStickyNav(0);
                $stickySection.classList.remove('bg_recommend');
            },
            onLeave: function () {
                $stickySection.classList.add('bg_recommend');
            },
            onLeaveBack: function () {
                $stickySection.classList.remove('bg_recommend');
            },
        },
        opacity: 1,
        // duration: 1,
        ease: "power2.inOut",
    });

    let $onlineSection = document.querySelector(".pc_ver .online_section");

    gsap.to($onlineSection, {
        scrollTrigger: {
            trigger: $onlineSection,
            start: "top center",
            end: "bottom bottom",
            // endTrigger: $onlineSection,
            // pin: true,
            scrub: 1,
            // markers: true,
            onEnter: function () {
                handleStickyNav(1);
                $stickySection.classList.add('bg_online');
                $stickySection.classList.add('actvie');
            },
            onEnterBack: function () {
                handleStickyNav(1);
                $stickySection.classList.remove('bg_online');
            },
            onLeave: function () {
                $stickySection.classList.add('bg_online');
                $stickySection.classList.add('actvie');
            },
            onLeaveBack: function () {
                $stickySection.classList.remove('bg_online');
            },
        },
        opacity: 1,
        // duration: 1,
        ease: "power2.inOut",
    });

    let $reivewSection = document.querySelector(".review_section");
    
    gsap.to($reivewSection, {
        scrollTrigger: {
            trigger: $reivewSection,
            start: "top center",
            end: "10% 10%",
            // endTrigger: $reivewSection,
            scrub: 1,
            // markers: true,
            onEnter: function () {
                handleStickyNav(2);
                $stickySection.classList.add('bg_review');
            },
            onEnterBack: function () {
                handleStickyNav(2);
                $stickySection.classList.remove('bg_review');
            },
            onLeave: function () {
                $stickySection.classList.add('bg_review');
            },
            onLeaveBack: function () {
                $stickySection.classList.remove('bg_review');
            },
        },
        opacity: 1,
        // duration: 1,
        ease: "power2.inOut",
    });

    // mo  reviewSwiper
    let reviewSwiper = new Swiper('#reviewSwiper', {
        loop: true,
        // loopedSlides: 1,
        // autoplay: true,
        // slidesPerGroup: 1,
        slidesPerView: 1.2,
        spaceBetween: 23,
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        breakpoints: {
            640 : {
                spaceBetween: 23,
                slidesPerView: 1.2,
                centeredSlides: true,
            },
            1400 : {
                spaceBetween: 23,
                slidesPerView: 2.3,
            },
        }
    });

    // 이벤트
    function eventSwiper(){
        const windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        let $eventSwiper;

        if (windowWidth > 640) {
            // pc
            $eventSwiper = new Swiper('#eventSwiper', {
                effect: "fade",
                fadeEffect: { crossFade: true },
                slidesPerView: 1,
                spaceBetween: 0,
            });

            // 이벤트 페이지네이션
            let $eventSwiperPaging = document.querySelectorAll('.event_pagination .paging');
            $eventSwiperPaging.forEach((paging, index) => {
                paging.addEventListener('click', function (e){
                    $eventSwiperPaging.forEach((p) => {
                        p.classList.remove('active');
                    });
                    paging.classList.add('active');
                    $eventSwiper.slideTo(index);
                });
            });
        } else {
            // mo
            $eventSwiper = new Swiper('#eventSwiper', {
                slidesPerView: 1.5,
                spaceBetween: 17,
            });
        }
    }
    //init
    eventSwiper();
    window.addEventListener('resize', eventSwiper);

    // 소통해요, 에그스쿨 Swiper
    let snsSwiper = new Swiper('#snsSwiper', {
        slidesPerView: 1.5,
        spaceBetween: 17,
        breakpoints: {
            640 : {
                spaceBetween: 60,
                slidesPerView: 3,
            }
        }
    });

});
