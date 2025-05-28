document.addEventListener('DOMContentLoaded', function() {
    // Определяем, мобильное ли устройство
    const isMobile = window.innerWidth <= 768;

    // Ссылки на панорамы: обычные и мобильные
    const panoramas = {
        1: isMobile ? "../img/mobile/dictant.jpg" : "../img/dictant.jpg",
        2: isMobile ? "../img/mobile/104.jpg" : "../img/104.jpg",
        3: isMobile ? "../img/mobile/301aa.jpg" : "../img/301aa.jpg",
        4: isMobile ? "../img/mobile/401a.jpg" : "../img/401a.jpg",
        5: isMobile ? "../img/mobile/atf.jpg" : "../img/atf.jpg",
        6: isMobile ? "../img/mobile/book_room.jpg" : "../img/book_room.jpg",
        7: isMobile ? "../img/mobile/book_room_k.jpg" : "../img/book_room_k.jpg",
        8: isMobile ? "../img/mobile/422.jpg" : "../img/422.jpg",
        9: isMobile ? "../img/mobile/41abb.jpg" : "../img/41abb.jpg",
        10: isMobile ? "../img/mobile/41.jpg" : "../img/41.jpg"
    };

    if (document.getElementById('panorama-links')) {
        const container = document.getElementById('panorama-links');
        for (let i = 1; i <= 10; i++) {
            const link = document.createElement('a');
            link.href = `panorama/viewer.html?panorama=${i}`;
            link.textContent = `Панорама ${i}`;
            link.className = 'panorama-link';
            container.appendChild(link);
        }
    }

    if (document.getElementById('panorama-viewer')) {
        const urlParams = new URLSearchParams(window.location.search);
        let currentPanorama = parseInt(urlParams.get('panorama')) || 1;

        const viewer = pannellum.viewer('panorama-viewer', {
            type: "equirectangular",
            panorama: panoramas[currentPanorama],
            autoLoad: true,
            autoRotate: isMobile ? false : -1,
            compass: true,
            showControls: false,
            mouseZoom: false,
            minHfov: 30,
            maxHfov: isMobile ? 90 : 120,
            showFullscreenCtrl: true,
            orientationOnByDefault: true,
            touchPanSpeedCoeffFactor: 0.3
        });

        function loadPanorama(id) {
            if (panoramas[id]) {
                currentPanorama = id;
                viewer.setPanorama(panoramas[id]);
                window.history.replaceState({}, '', `?panorama=${id}`);
                updateNavigationButtons();
            }
        }

        function updateNavigationButtons() {
            const prevBtn = document.querySelector('.prev-btn');
            const nextBtn = document.querySelector('.next-btn');

            if (prevBtn && nextBtn) {
                prevBtn.style.visibility = currentPanorama > 1 ? 'visible' : 'hidden';
                nextBtn.style.visibility = currentPanorama < 10 ? 'visible' : 'hidden';
            }
        }

        document.addEventListener('click', function(e) {
            if (e.target.classList.contains('next-btn') && currentPanorama < 10) {
                loadPanorama(currentPanorama + 1);
            }
            if (e.target.classList.contains('prev-btn') && currentPanorama > 1) {
                loadPanorama(currentPanorama - 1);
            }
            if (e.target.classList.contains('close-btn')) {
                window.location.href = "../index.html";
            }
        });

        // Поддержка свайпов
        let touchStartX = 0;
        const SWIPE_THRESHOLD = 50;

        document.addEventListener('touchstart', function(e) {
            touchStartX = e.touches[0].clientX;
        }, { passive: true });

        document.addEventListener('touchend', function(e) {
            const touchEndX = e.changedTouches[0].clientX;
            const diff = touchStartX - touchEndX;

            if (Math.abs(diff) > SWIPE_THRESHOLD) {
                if (diff > 0 && currentPanorama < 10) {
                    loadPanorama(currentPanorama + 1);
                } else if (diff < 0 && currentPanorama > 1) {
                    loadPanorama(currentPanorama - 1);
                }
            }
        }, { passive: true });

        updateNavigationButtons();
    }
});
