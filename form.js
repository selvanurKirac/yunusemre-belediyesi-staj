// Öneri / Şikayet formu
(function () {
    var form = document.getElementById('oneriForm');
    var modal = document.getElementById('sonucModal');
    if (!form || !modal) return;

    var submitBtn = form.querySelector('[type="submit"]');
    var submitText = submitBtn ? submitBtn.textContent : '';

    /* 1) Gönderim bittikten sonra bu sayfaya dön (?gonderildi=1) ve pencereyi göster.
          Sadece http/https'te çalışır; dosyayı çift tıklayıp açınca (file://) _next kaldırılır. */
    var nextInput = form.querySelector('input[name="_next"]');
    if (nextInput) {
        if (location.protocol === 'http:' || location.protocol === 'https:') {
            nextInput.value = location.origin + location.pathname + '?gonderildi=1';
        } else {
            nextInput.remove();
        }
    }

    function openModal() {
        modal.hidden = false;
        var btn = modal.querySelector('.btn-primary');
        if (btn) btn.focus();
    }
    function closeModal() {
        modal.hidden = true;
        if (history.replaceState) history.replaceState(null, '', location.pathname);
    }

    if (new URLSearchParams(location.search).get('gonderildi') === '1') openModal();

    modal.querySelectorAll('[data-close]').forEach(function (el) {
        el.addEventListener('click', closeModal);
    });
    modal.addEventListener('click', function (e) {
        if (e.target === modal) closeModal();
    });
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && !modal.hidden) closeModal();
    });

    /* 2) T.C. kimlik no: yalnızca rakam, en fazla 11 hane */
    var tc = document.getElementById('tc_no');
    if (tc) {
        tc.addEventListener('input', function () {
            tc.value = tc.value.replace(/\D/g, '').slice(0, 11);
        });
    }

    /* 3) Çift tıklamayla iki kez göndermeyi engelle */
    form.addEventListener('submit', function () {
        if (!submitBtn) return;
        submitBtn.disabled = true;
        submitBtn.textContent = 'Gönderiliyor…';
    });
    // Geri tuşuyla dönülürse buton yeniden kullanılabilsin
    window.addEventListener('pageshow', function () {
        if (!submitBtn) return;
        submitBtn.disabled = false;
        submitBtn.textContent = submitText;
    });
})();
