// Aydınlatma metni penceresi
// "Kabul Ediyorum" seçilirse tarayıcıda hatırlanır, tekrar gösterilmez.
document.addEventListener('DOMContentLoaded', function () {
    var modal = document.getElementById('modalAydinlatma');
    if (!modal) return;

    var closeBtn = modal.querySelector('.close-aydinlatma');
    var acceptBtn = document.getElementById('acceptBtnAydinlatma');
    var KEY = 'aydinlatmaKabul';

    function alreadyAccepted() {
        try { return localStorage.getItem(KEY) === '1'; } catch (e) { return false; }
    }
    function closeModal(remember) {
        modal.style.display = 'none';
        if (remember) {
            try { localStorage.setItem(KEY, '1'); } catch (e) { /* depolama kapalı olabilir */ }
        }
    }

    if (alreadyAccepted()) return;
    modal.style.display = 'block';

    if (closeBtn) closeBtn.addEventListener('click', function () { closeModal(false); });
    if (acceptBtn) acceptBtn.addEventListener('click', function () { closeModal(true); });

    // Pencerenin dışına tıklanırsa ya da Esc'ye basılırsa kapat
    modal.addEventListener('click', function (e) {
        if (e.target === modal) closeModal(false);
    });
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') closeModal(false);
    });
});
