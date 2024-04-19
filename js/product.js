function changeTab(tabIndex) {
    const tabs = document.querySelectorAll('.step_tab_block .tab_link');
    tabs.forEach(tab => tab.classList.remove('active'));

    const tabContents = document.querySelectorAll('.tab_content');
    tabContents.forEach(content => content.classList.remove('active'));

    tabs[tabIndex].classList.add('active');
    tabContents[tabIndex].classList.add('active');

    AOS.refresh();
}

function changeVideoTab(tabIndex) {
    const tabs = document.querySelectorAll('.video_tab_block .tab_link');
    tabs.forEach(tab => tab.classList.remove('active'));

    const videoPlayers = document.querySelectorAll('.video_player');
    videoPlayers.forEach(player => {
        const video = player.querySelector('.video_source');
        if (video) {
            video.pause();
        }
    });

    const tabContents = document.querySelectorAll('.video_slide');
    tabContents.forEach(content => content.classList.remove('active'));

    tabs[tabIndex].classList.add('active');
    tabContents[tabIndex].classList.add('active');

}


document.addEventListener("DOMContentLoaded", function() {
    // 비디오 재생
    document.querySelectorAll('.video_player .thumbnail, .video_player .ico_play').forEach(element => {
        element.addEventListener('click', function() {
            const playIcon = element.closest('.video_player').querySelector('.ico_play');
            const video = element.closest('.video_player').querySelector('.video_source');

            if (element.classList.contains('thumbnail')) {
                element.style.display = 'none';
                playIcon.style.display = 'none';
            } else if (element.classList.contains('ico_play')) {
                element.style.display = 'none';
                const thumbnail = element.closest('.video_player').querySelector('.thumbnail');
                thumbnail.style.display = 'none';
            }

            video.play();
        });
    });

    //유치원 - 한 가지 제로 연계되는...
    let storybookSwiper = new Swiper('#storybookSwiper', {
        direction: 'vertical',
        observer: true,
        observeParents: true,
        slidesPerView: 1,
        spaceBetween: 23,
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        breakpoints: {
            640 : {
                spaceBetween: 0,
                slidesPerView: "auto",
            }
        }
    });

    // 매월 정기적으로 배송해요.
    let monthlySwiper = new Swiper('.tab_content .monthlySwiper', {
        effect: 'fade',
        fadeEffect: { crossFade: true },
        observer: true,
        observeParents: true,
        slidesPerView: 'auto',
        spaceBetween: 24,
        navigation: {
            enabled: true,
            nextEl: ".btn_circle_next",
            prevEl: ".btn_circle_prev",
        },
    });

    // 미국 문화화 표현을 다양한 에피소드로...
    let episodeSwiper = new Swiper('.tab_content .episodeSwiper', {
        // centeredSlides: true,
        slidesPerView: 1.4,
        spaceBetween: 17,
        breakpoints: {
            640 : {
                spaceBetween: 0,
                slidesPerView: 3,
            }
        }
    });

    // 매월 정기적으로 배송해요.
    let societySwiper = new Swiper('.tab_content .societySwiper', {
        // effect: 'fade',
        // fadeEffect: { crossFade: true },
        observer: true,
        observeParents: true,
        slidesPerView: 1,
        spaceBetween: 25,
        navigation: {
            enabled: true,
            nextEl: ".btn_circle_next",
            prevEl: ".btn_circle_prev",
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
    });

    // 초등
    let contentSwiper = new Swiper('.contentSwiper', {
        // effect: 'fade',
        // fadeEffect: { crossFade: true },
        observer: true,
        observeParents: true,
        slidesPerView: 1,
        spaceBetween: 25,
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
    });

    // 초등 - 매일 새로운 콘텐츠로...
    let videoSwiper = new Swiper('#videoSwiper', {
        effect: 'fade',
        fadeEffect: { crossFade: true },
        observer: true,
        observeParents: true,
        slidesPerView: 1,
        spaceBetween: 25,
        navigation: {
            enabled: true,
            nextEl: ".btn_circle_next",
            prevEl: ".btn_circle_prev",
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
    });

    // 도서관 - 미리보기
    let previewSwiper = new Swiper('#previewSwiper', {
        centeredSlides: true,
        slidesPerView: 1,
        spaceBetween: 20,
        navigation: {
            enabled: true,
            nextEl: ".btn_circle_next",
            prevEl: ".btn_circle_prev",
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
    });

    //무료체험 활용방법
    let mobileWidth = 768;
    // 화면 크기가 768px 이하인 경우에만 Swiper를 초기화
    if (window.innerWidth <= mobileWidth) {
        let freeTrialSwiper = new Swiper('#contentSwiper', {
            slidesPerView: 1,
            spaceBetween: 40,
            navigation: false,
            pagination: {
                el: ".swiper-pagination",
                clickable: true,
            },
            breakpoints: {
                640 : {
                    navigation: {
                        enabled: true,
                        nextEl: ".btn_circle_next",
                        prevEl: ".btn_circle_prev",
                    },
                }
            }
        });
    }

    //tab fixed
    handleTab();
});

function handleTab(){
    const $tab = document.querySelector('.step_tab_block');
    const $clonedTab = $tab.cloneNode(true);
    $clonedTab.style.visibility = 'hidden';

    const initialTop = $tab.getBoundingClientRect().top + window.pageYOffset;
    const windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    let headerHeight;

    if (windowWidth > 1200) {
        headerHeight = document.querySelector('.header').offsetHeight;
    } else {
        headerHeight = document.querySelector('.m_header').offsetHeight;
    }

    let prevScrollPos = window.pageYOffset;

    window.addEventListener('scroll', function() {
        let currentScrollPos = window.pageYOffset;
        if(prevScrollPos <= currentScrollPos){
            $tab.style.transform = `translateY(0)`;
        } else {
            $tab.style.transform = `translateY(${headerHeight}px)`;
        }

        if (currentScrollPos > initialTop) {
            $tab.classList.add("fixed");
            $tab.parentNode.insertBefore($clonedTab, $tab.nextSibling);
        } else {
            $clonedTab.remove();
            $tab.classList.remove("fixed");
            $tab.style.transform = `translateY(0)`;
        }

        prevScrollPos = currentScrollPos;
    });
}

// 유입 경로 > 기타 선택시
function checkPath(select){
    const selectedIndex = select.selectedIndex;
    const selectedOption = select.options[selectedIndex];
    const isEctShow = selectedOption.getAttribute("data-ect-show");

    if(isEctShow == "true"){
        document.getElementById("ectBlock").classList.remove("d_none");
    } else {
        document.getElementById("ectBlock").classList.add("d_none");
    }
}

// 약관 전체 동의
function checkTerms(checkboxName) {
    const checkboxes = document.getElementsByName(checkboxName);
    const allAgreeCheckbox = document.getElementById("allCheck");

    allAgreeCheckbox.addEventListener('change', function() {
        let allChecked = allAgreeCheckbox.checked;
        console.log(allChecked);
        checkboxes.forEach(function(checkbox) {
            checkbox.checked = allAgreeCheckbox.checked;
        });
    });

    checkboxes.forEach(function(checkbox) {
        checkbox.addEventListener('change', function() {
            let allChecked = true;
            checkboxes.forEach(function(cb) {
                if (!cb.checked) {
                    allChecked = false;
                }
            });
            allAgreeCheckbox.checked = allChecked;
        });
    });
}