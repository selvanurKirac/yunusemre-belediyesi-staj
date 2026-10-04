// Navbar davranışları (jQuery gerektirmez)
//  1) Sayfa kayınca navbar küçülür ve koyulaşır (.affix)
//  2) Mobilde hamburger menüyü açar / kapatır (.show_list)
//  3) Mobilde dropdown başlıkları accordion gibi açılır (.open)
(function () {
    var nav = document.querySelector('.nav');
    if (!nav) return;

    var trigger = nav.querySelector('.navTrigger');
    var list = document.getElementById('mainListDiv');
    var dropdowns = nav.querySelectorAll('.dropdown');
    var mobile = window.matchMedia('(max-width: 768px)');

    /* 1) Kaydırınca küçül (form sayfasında data-affix-always ile hep küçük kalır) */
    if (nav.hasAttribute('data-affix-always')) {
        nav.classList.add('affix');
    } else {
        var onScroll = function () {
            nav.classList.toggle('affix', window.scrollY > 50);
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
    }

    function closeDropdowns() {
        dropdowns.forEach(function (d) { d.classList.remove('open'); });
    }

    /* 2) Hamburger */
    function setMenu(open) {
        if (!list || !trigger) return;
        list.classList.toggle('show_list', open);
        trigger.classList.toggle('active', open);
        trigger.setAttribute('aria-expanded', String(open));
        if (!open) closeDropdowns();
    }

    if (trigger && list) {
        trigger.addEventListener('click', function () {
            setMenu(!list.classList.contains('show_list'));
        });
        trigger.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                trigger.click();
            }
        });
    }

    /* 3) Dropdown'lar */
    dropdowns.forEach(function (item) {
        var btn = item.querySelector('.dropbtn');
        if (!btn) return;

        btn.addEventListener('click', function (e) {
            if (btn.getAttribute('href') === '#') e.preventDefault();
            if (!mobile.matches) return;

            var willOpen = !item.classList.contains('open');
            closeDropdowns();
            if (willOpen) item.classList.add('open');
        });

        // Mobilde panel içindeki linke basınca menü kapansın
        item.querySelectorAll('.dropdown-content a').forEach(function (a) {
            a.addEventListener('click', function () {
                if (mobile.matches) setMenu(false);
            });
        });
    });

    // Ekran boyutu değişince açık durumları sıfırla
    mobile.addEventListener('change', function () { setMenu(false); });

    // Menü dışına tıklayınca açık alt menüleri kapat
    document.addEventListener('click', function (e) {
        if (!e.target.closest('.nav')) closeDropdowns();
    });
})();
