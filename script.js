// Haberler kaydırıcısı: ok düğmeleri kartları tam kart adımıyla kaydırır
document.querySelectorAll('.product').forEach(function (section) {
    var container = section.querySelector('.product-container');
    var prevBtn = section.querySelector('.pre-btn');
    var nextBtn = section.querySelector('.nxt-btn');
    if (!container || !prevBtn || !nextBtn) return;

    // Genişlik her tıklamada yeniden hesaplanır (yeniden boyutlandırmaya uyumlu)
    function getStep() {
        var card = container.querySelector('.product-card');
        if (!card) return container.clientWidth;

        var gap = parseFloat(getComputedStyle(card).marginRight) || 0;
        var cardStep = card.getBoundingClientRect().width + gap;
        var visibleCards = Math.max(1, Math.floor(container.clientWidth / cardStep));
        return cardStep * visibleCards;
    }

    nextBtn.addEventListener('click', function () {
        container.scrollBy({ left: getStep(), behavior: 'smooth' });
    });

    prevBtn.addEventListener('click', function () {
        container.scrollBy({ left: -getStep(), behavior: 'smooth' });
    });
});
