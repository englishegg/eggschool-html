function setModalOpen(selector){
    document.querySelector(selector).classList.add('show');
    document.querySelector('body').style.overflowY = 'hidden';
}

function setModalClose(selector){
    document.querySelector(selector).classList.remove('show');
    document.querySelector('body').style.overflowY = 'auto';
}

function showModal(selector){
    document.querySelector(selector).classList.add('show');
    document.querySelector('body').style.overflowY = 'hidden';
}

function closeModal(selector){
    document.querySelector(selector).classList.remove('show');
    document.querySelector('body').style.overflowY = 'auto';
}

document.addEventListener('DOMContentLoaded', function () {
    // 모달 검은 부분 클릭시 hide js
    if (document.querySelector('.modal')) {
        window.onclick = function (e) {
            const modalList = document.querySelectorAll('.modal');
            for (const $modal of modalList) {
                if ($modal && !$modal.classList.contains('backdrop_disabled')) {
                    if (e.target == $modal) {
                        $modal.classList.remove('show');
                        document.querySelector('body').style.overflowY = 'auto';
                    }
                }
            }
        };
    }
});
