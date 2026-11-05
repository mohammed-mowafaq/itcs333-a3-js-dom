(function () {
  'use strict';

  function init() {
    var list = document.getElementById('todo-list');
    var errorMsg = document.getElementById('error-msg');
    var counter = document.getElementById('counter');
    var filterAll = document.getElementById('filter-all');
    var filterActive = document.getElementById('filter-active');
    var filterDone = document.getElementById('filter-done');

    var input =
      document.querySelector('#todo-input, #new-todo, #todo-text, #new-item, input[type="text"], input:not([type])') ||
      document.getElementsByTagName('input')[0];

    var addBtn = document.querySelector('#add-btn, #add-button, #add-todo, #add-item, #add, #addBtn');
    if (!addBtn) {
      var allButtons = document.getElementsByTagName('button');
      for (var b = 0; b < allButtons.length; b++) {
        var btn = allButtons[b];
        if (btn.id.indexOf('filter') !== 0 && !list.contains(btn)) {
          addBtn = btn;
          break;
        }
      }
    }

    var currentFilter = 'all';

    // ---- كل المستمعات هنا (مستمع واحد على القائمة) ----
    list.addEventListener('click', onListClick);
    if (addBtn) addBtn.addEventListener('click', onAdd);
    input.addEventListener('keydown', onKey);
    if (filterAll) filterAll.addEventListener('click', function () { setFilter('all'); });
    if (filterActive) filterActive.addEventListener('click', function () { setFilter('active'); });
    if (filterDone) filterDone.addEventListener('click', function () { setFilter('done'); });

    showError(false);
    refresh();

    // ---- الدوال ----
    function onKey(e) {
      if (e.key === 'Enter') onAdd(e);
    }

    function onAdd(e) {
      if (e && e.preventDefault) e.preventDefault();
      var text = input.value.trim();
      if (text === '') {
        showError(true);
        return;
      }
      showError(false);

      var li = document.createElement('li');
      var span = document.createElement('span');
      span.className = 'item-text';
      span.textContent = text;
      var del = document.createElement('button');
      del.className = 'delete-btn';
      del.type = 'button';
      del.textContent = 'Delete';
      li.appendChild(span);
      li.appendChild(del);
      list.appendChild(li);

      input.value = '';
      input.focus();
      refresh();
    }

    function onListClick(e) {
      var delBtn = e.target.closest('.delete-btn');
      if (delBtn) {
        var item = delBtn.closest('li');
        if (item) item.remove();
        refresh();
        return;
      }
      var li = e.target.closest('li');
      if (li && list.contains(li)) {
        li.classList.toggle('completed');
        refresh();
      }
    }

    function setFilter(name) {
      currentFilter = name;
      refresh();
    }

    function showError(show) {
      if (!errorMsg) return;
      errorMsg.hidden = !show;
      errorMsg.style.display = show ? '' : 'none';
    }

    function refresh() {
      var kids = list.children;
      var left = 0;
      for (var i = 0; i < kids.length; i++) {
        var li = kids[i];
        var done = li.classList.contains('completed');
        if (!done) left++;
        var visible =
          currentFilter === 'all' ||
          (currentFilter === 'active' && !done) ||
          (currentFilter === 'done' && done);
        li.hidden = !visible;
        li.style.display = visible ? '' : 'none';
      }
      counter.textContent = left + ' item(s) left';
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
