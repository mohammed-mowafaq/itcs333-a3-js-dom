(function () {
  'use strict';

  function init() {
    var form = document.getElementById('todo-form');
    var input = document.getElementById('todo-input');
    var list = document.getElementById('todo-list');
    var errorMsg = document.getElementById('error-msg');
    var counter = document.getElementById('counter');
    var filterAll = document.getElementById('filter-all');
    var filterActive = document.getElementById('filter-active');
    var filterDone = document.getElementById('filter-done');

    var currentFilter = 'all';

    // ---- المستمعات (مستمع واحد على القائمة) ----
    form.addEventListener('submit', onSubmit);
    list.addEventListener('click', onListClick);
    filterAll.addEventListener('click', function () { setFilter('all'); });
    filterActive.addEventListener('click', function () { setFilter('active'); });
    filterDone.addEventListener('click', function () { setFilter('done'); });

    showError(false);
    refresh();

    // ---- الدوال ----
    function onSubmit(e) {
      e.preventDefault();
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
      errorMsg.classList.toggle('hidden', !show);
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

  if (document.getElementById('todo-list')) {
    init();
  } else {
    document.addEventListener('DOMContentLoaded', init);
  }
})();
