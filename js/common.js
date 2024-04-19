function debounce(func, delay) {
    let timeoutId;

    return function() {
        const context = this;
        const args = arguments;

        clearTimeout(timeoutId);

        timeoutId = setTimeout(function() {
            func.apply(context, args);
        }, delay);
    };
}

// 앱 다운로드 링크
function redirectToAppStore(platform) {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    const iosUrl = 'https://apps.apple.com/kr/app/%EC%97%90%EA%B7%B8%EC%8A%A4%EC%BF%A8/id1562289981';
    const andUrl = 'https://play.google.com/store/apps/details?id=net.eggschool.k';
    let redirectLink = '';

    // 모바일인지 확인
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);

    // 플랫폼에 따른 리다이렉트 링크 설정
    if (platform === 'ios') {
        redirectLink = iosUrl;
    } else if (platform === 'android') {
        redirectLink = andUrl;
    }

    // 플랫폼이 지정되어 있지 않은 경우, 사용자 에이전트를 기반으로 플랫폼 결정
    if (!redirectLink) {
        if (/android/i.test(userAgent)) {
            redirectLink = andUrl;
        } else if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
            redirectLink = iosUrl;
        }
    }

    // 리다이렉트 처리
    if (redirectLink && isMobile) {
        window.location.href = redirectLink;
    } else {
        alert('태블릿이나 휴대폰에서 앱을 다운로드 해주세요.');
    }
}


// header My School menu
function toggleMySchool(){
    const $menuWrapper = document.querySelector('.header .mypage_link_block');
    $menuWrapper.classList.toggle('active');
}

function hideMySchool(){
    const $menuWrapper = document.querySelector('.header .mypage_link_block');
    $menuWrapper.classList.remove('active');
}

//footer Family Site menu
function toggleFamilySite(){
    const $menuWrapper = document.querySelector('.footer .fms_link_block');
    $menuWrapper.classList.toggle('active');
}

// mobile header nav toggle
function handleMobileNav(e){
    let $m_nav_wrapper = document.querySelector('.m_nav_wrapper');
    let $dim = document.querySelector('.dimmed');
    $m_nav_wrapper.classList.toggle('active');
    $dim.classList.toggle('active');

    if($m_nav_wrapper.classList.contains('active')){
        document.querySelector('body').style.overflowY = 'hidden';
    } else {
        document.querySelector('body').style.overflowY = 'auto';
    }
}

function handleHeader(){
    const windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    let $header;
    if (windowWidth > 1200) {
        $header = document.querySelector('.header');
    } else {
        $header = document.querySelector('.m_header');
    }

    let prevScrollPos = window.pageYOffset;

    window.addEventListener('scroll', function() {
        let currentScrollPos = window.pageYOffset;
        hideMySchool();
        $header.classList.toggle('active', currentScrollPos > 0);
        $header.classList.toggle('nav_up', prevScrollPos <= currentScrollPos);

        prevScrollPos = currentScrollPos;
    });
}

document.addEventListener("DOMContentLoaded", function() {
    /*=============S:header js ============*/
    handleHeader();

    window.addEventListener('resize', handleHeader);


    document.querySelector('.gnb_wrapper').addEventListener('mouseover', function(){
        document.querySelector('.header').classList.add('hover', 'active');
    });

    document.querySelector('.gnb_wrapper').addEventListener('mouseout', function(){
        document.querySelector('.header').classList.remove('hover');
        if(window.pageYOffset == 0){
            document.querySelector('.header').classList.remove('active');
        }
    });

    const line = document.createElement("div");
    const menu = document.querySelector(".header .gnb_wrapper");
    line.className = "line_effect";
    document.querySelector('.header .gnb_wrapper').appendChild(line);

    function handleHoverLink(e) {
        const target = this.querySelector('.gnb_text');
        const court = target.getBoundingClientRect();
        const { left, top, width, height } = court;
        const gap = 10;
        line.style.left = `${left - 6}px`;
        line.style.width = `${width + gap * 2}px`;
    }
    function handleMouseLeave() {
        line.style.width = null;
    }

    const $gnbLinks = document.querySelectorAll('.gnb_link');
    $gnbLinks.forEach(link => {
        link.addEventListener('mouseover', handleHoverLink);
        link.addEventListener('mouseout', handleMouseLeave);
    });

    const $mGnbLinks = document.querySelectorAll('.m_nav_wrapper .gnb_link');
    $mGnbLinks.forEach(link => {
        link.addEventListener('click', function(){
            let $lnbBlock = this.querySelector('.lnb_block');

            this.classList.toggle('active');

            if (this.classList.contains('active')) {
                $lnbBlock.style.maxHeight = $lnbBlock.scrollHeight + 'px'; // Use scrollHeight to get the actual height
            } else {
                $lnbBlock.style.maxHeight = '0';
            }

        });
    });
    /*=============E:header js ============*/
    const observes = document.querySelectorAll('.observe');
    const observeOptions = {
        //   threshold: 0.7
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // 한 번 페이드 인되면 관찰을 중단합니다.
            }
        });
    }, observeOptions);

    observes.forEach(observe => {
        observer.observe(observe); // 각 요소를 관찰합니다.
    });
});