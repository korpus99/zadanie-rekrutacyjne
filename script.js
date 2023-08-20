function toggleSearchInput() {
    var searchContainer = document.getElementById('searchContainer');
    var searchInput = document.getElementById('searchInput');
    var searchIcon = document.getElementById('searchIcon');

    var isInputOut = searchContainer.classList.contains('inputOut');
    var isHidden = searchContainer.classList.contains('hidden');

    if (isInputOut) {
        searchContainer.classList.remove('inputOut');
        searchInput.classList.remove('inputOut');
    }

    if (isHidden) {
        searchContainer.classList.remove('hidden');
        searchInput.classList.add('inputIn');
        searchInput.focus();
        searchIcon.style.display = 'none';
    } else if (searchInput.value === '') {
        searchContainer.classList.add('inputOut');
        searchInput.classList.add('inputOut');
        setTimeout(function () {
            searchInput.classList.remove('inputIn', 'inputOut');
            setTimeout(function () {
                searchIcon.style.display = 'block';
                searchContainer.classList.add('hidden');
            }, 700);
        }, 300);
    }
}




var macyInstance = Macy({
    container: ".gallery",
    mobileFirst: true,
    columns: 1,
    breakAt: {
        480: 1,
        768: 2,
        1024: 3,
    },
    margin: {
        x: 30,
        y: 30,
    }
});

// Dodatkowa opcja odświeżająca galerię zdjęć podczas zmiany wielkości okna - wpływa na optymalizację
// window.addEventListener('resize', () => {
//     if (typeof macyInstance !== 'undefined') {
//         macyInstance.recalculate();
//     }
// });

const expandButton = document.getElementById('expandButton');
const expandElement = document.querySelector('.expand');

expandButton.addEventListener('click', function () {
    let height = expandElement.clientHeight;

    function animateCollapse() {
        height -= 20;
        expandElement.style.height = height + 'px';

        if (height > 0) {
            requestAnimationFrame(animateCollapse);
        } else {
            expandElement.style.display = 'none';
        }
    }

    requestAnimationFrame(animateCollapse);
});


const gallery = document.querySelectorAll(".gallery .image");
const modal = document.querySelector("#modal1");
const img = document.querySelector("#modal1 img");
const currentPhotoSpan = document.getElementById("current-photo");
const totalPhotosSpan = document.getElementById("total-photos");

window.onload = () => {
    AOS.init({
        duration: 1000,
        easing: "ease-in-out",
        once: true,
        mirror: false
    });

    let currentIndex = 0;

    function showImage(index) {
        const selectedImgUrl = gallery[index].querySelector("img").src;
        img.src = selectedImgUrl;
        currentIndex = index;

        currentPhotoSpan.textContent = (index + 1).toString();
    }

    const nextBtn = document.querySelector(".next");
    const prevBtn = document.querySelector(".prev");

    prevBtn.addEventListener("click", () => {
        currentIndex = (currentIndex + 1) % gallery.length;
        showImage(currentIndex);
    });

    nextBtn.addEventListener("click", () => {
        currentIndex = (currentIndex - 1 + gallery.length) % gallery.length;
        showImage(currentIndex);
    });

    totalPhotosSpan.textContent = gallery.length.toString();

    for (let i = 0; i < gallery.length; i++) {
        gallery[i].onclick = () => {
            showImage(i);
            var modalInstance = new bootstrap.Modal(modal);
            modalInstance.show();
        }
    }
}

