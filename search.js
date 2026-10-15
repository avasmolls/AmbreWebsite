// Live search functionality (jQuery). Used when clicking magnifier in the navbar

$(function () {
    const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
    const hl = (text, words) => {
        if (!words.length) return esc(text);
        const re = new RegExp('(' + words.map(w => w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|') + ')', 'ig');
        return text.split(re).map((part, i) => (i % 2 ? '<mark>' + esc(part) + '</mark>' : esc(part))).join('');
    };

    // Build the overlay once
    const $overlay = $(`
    <div id="searchOverlay" class="search-overlay" hidden>
      <div class="search-backdrop"></div>
      <div class="search-box"><div class="container" style="max-width:760px">
        <div class="search-input-wrap">
          <i class="bi bi-search"></i>
          <input id="searchInput" type="search" placeholder="Search fragrances, notes, moods…" autocomplete="off" aria-label="Search fragrances">
          <button id="searchClose" type="button" aria-label="Close search"><i class="bi bi-x-lg"></i></button>
        </div>
        <ul id="searchResults" class="search-results"></ul>
        <div id="searchFoot" class="search-foot"></div>
      </div></div>
    </div>`).appendTo('body');
    const $input = $('#searchInput'), $results = $('#searchResults'), $foot = $('#searchFoot');

    function render() {
        const q = $input.val().trim();
        const { words, list } = searchPerfumes(q);
        if (!list.length) {
            $results.html(`<li class="search-empty">No fragrances match “${esc(q)}”. Try a note like <b>vanilla</b> or <b>oud</b>.</li>`);
            $foot.empty();
            return;
        }
        $results.html(list.map(p => `
      <li><a class="search-item" href="shop.html?q=${encodeURIComponent(p.name)}">
        <img src="${esc(p.image)}" alt="">
        <div><strong>${hl(p.name, words)}</strong><span>${hl(p.notes.join(' · '), words)}</span></div>
        <em>$${p.price}</em>
      </a></li>`).join(''));
        $foot.html(q ? `<a href="shop.html?q=${encodeURIComponent(q)}">See ${list.length} result${list.length > 1 ? 's' : ''} in the shop →</a>` : '');
    }

    const open = () => { $overlay.prop('hidden', false); $('body').css('overflow', 'hidden'); render(); $input.trigger('focus'); };
    const close = () => { $overlay.prop('hidden', true); $('body').css('overflow', ''); };

    // The magnifier icon in the navbar opens search (falls back to shop.html if JS is off)
    $(document).on('click', '.nav-icons a[aria-label="Search"]', e => { e.preventDefault(); open(); });
    $('#searchClose, .search-backdrop').on('click', close);
    $input.on('input', render);

    $(document).on('keydown', e => {
        if ($overlay.prop('hidden')) return;
        const $items = $('.search-item');
        const $active = $items.filter('.active');
        if (e.key === 'Escape') close();
        else if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
            e.preventDefault();
            let i = $items.index($active) + (e.key === 'ArrowDown' ? 1 : -1);
            i = Math.max(0, Math.min($items.length - 1, i));
            $items.removeClass('active').eq(i).addClass('active');
        } else if (e.key === 'Enter') {
            e.preventDefault();
            if ($active.length) location.href = $active.attr('href');
            else if ($input.val().trim()) location.href = 'shop.html?q=' + encodeURIComponent($input.val().trim());
        }
    });
});