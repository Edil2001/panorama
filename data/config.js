
if (document.getElementById('panorama-links')) {
    const container = document.getElementById('panorama-links');
    for (let i = 1; i <= 10; i++) {
        const link = document.createElement('a');
        link.href = `panorama/viewer.html?panorama=${i}`;
        link.textContent = `Панорама ${i}`;
        container.appendChild(link);
    }
}


if (document.getElementById('panorama-viewer')) {
    const urlParams = new URLSearchParams(window.location.search);
    let currentPanorama = parseInt(urlParams.get('panorama')) || 1;

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

    const viewer = pannellum.viewer('panorama-viewer', {
        type: "equirectangular",
        panorama: panoramas[currentPanorama],
        autoLoad: true
    });

    
    document.querySelector('.close-button').addEventListener('click', () => {
        window.location.href = "../index.html";
    });

   
    document.querySelector('.next-button').addEventListener('click', () => {
        if (currentPanorama < 10) {
            currentPanorama++;
            viewer.setPanorama(panoramas[currentPanorama]);
        }
    });

    
    document.querySelector('.prev-button').addEventListener('click', () => {
        if (currentPanorama > 1) {
            currentPanorama--;
            viewer.setPanorama(panoramas[currentPanorama]);
        }
    });
}