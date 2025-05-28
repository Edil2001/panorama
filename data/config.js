document.addEventListener('DOMContentLoaded', function() {
    // Проверяем, находимся ли мы на главной странице с ссылками на панорамы
    if (document.getElementById('panorama-links')) {
        const container = document.getElementById('panorama-links');
        
        // Создаем 10 ссылок на панорамы
        for (let i = 1; i <= 10; i++) {
            const link = document.createElement('a');
            link.href = `panorama/viewer.html?panorama=${i}`;
            link.textContent = `Панорама ${i}`;
            link.className = 'panorama-link';
            container.appendChild(link);
        }
    }

    // Проверяем, находимся ли мы в просмотрщике панорам
    if (document.getElementById('panorama-viewer')) {
        // Все доступные панорамы
        const panoramas = {
            1: "../img/dictant.jpg",
            2: "../img/104.jpg",
            3: "../img/301aa.jpg",
            4: "../img/401a.jpg",
            5: "../img/atf.jpg",
            6: "../img/book_room.jpg",
            7: "../img/book_room_k.jpg",
            8: "../img/422.jpg",
            9: "../img/41abb.jpg",
            10: "../img/41.jpg"
        };

        // Получаем номер текущей панорамы из URL
        const urlParams = new URLSearchParams(window.location.search);
        let currentPanorama = parseInt(urlParams.get('panorama')) || 1;

        // Инициализация Pannellum viewer
        const viewer = pannellum.viewer('panorama-viewer', {
            type: "equirectangular",
            panorama: panoramas[currentPanorama],
            autoLoad: true,
            autoRotate: -1,
            compass: true,
            showControls: false,
            mouseZoom: false,
            minHfov: 30,
            maxHfov: 120,
            showFullscreenCtrl: true,
            orientationOnByDefault: true,
            touchPanSpeedCoeffFactor: 0.3
        });

        // Функция для загрузки панорамы
        function loadPanorama(id) {
            if (panoramas[id]) {
                currentPanorama = id;
                viewer.setPanorama(panoramas[id]);
                
                // Обновляем URL без перезагрузки страницы
                window.history.replaceState({}, '', `?panorama=${id}`);
                
                // Обновляем состояние кнопок навигации
                updateNavigationButtons();
            }
        }

        // Функция обновления состояния кнопок
        function updateNavigationButtons() {
            const prevBtn = document.querySelector('.prev-btn');
            const nextBtn = document.querySelector('.next-btn');
            
            if (prevBtn && nextBtn) {
                prevBtn.style.visibility = currentPanorama > 1 ? 'visible' : 'hidden';
                nextBtn.style.visibility = currentPanorama < 10 ? 'visible' : 'hidden';
            }
        }

        // Обработчики событий для кнопок навигации
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

        // Обработка свайпов на мобильных устройствах
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
                    loadPanorama(currentPanorama + 1); // Свайп влево
                } else if (diff < 0 && currentPanorama > 1) {
                    loadPanorama(currentPanorama - 1); // Свайп вправо
                }
            }
        }, { passive: true });

        // Инициализация кнопок при загрузке
        updateNavigationButtons();
    }
});