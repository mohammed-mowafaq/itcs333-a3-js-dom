(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    // ---- العناصر (تأكد أن الـ IDs تطابق index.html) ----
    var list = document.getElementById('todo-list');
    var input = document.querySelector('#todo-input, #new-todo, #todo-text, input[type="text"]');
    var addBtn = document.querySelector('#add-btn, #add-button, #add-todo, #add');
    var errorMsg = document.getElementById('error-msg');
    var counter = document.getElementById('counter');
    var filterBtns = {
      all: document.getElementById('filter-all'),
      active: document.getElementById('filter-active'),
      done: document.getElementById('filter-done')
    };

    var currentFilter = 'all';

    // ---- رسالة الخطأ ----
    function showError(show) {
      if (!errorMsg) return;
      errorMsg.hidden = !show;
      errorMsg.style.display = show ? '' : 'none';
    }

    // ---- العداد: عدد العناصر غير المكتملة ----
    function updateCounter() {
      var left = list.querySelectorAll('li:not(.completed)').length;
      counter.textContent = left + ' item(s) left';
    }

    // ---- تطبيق الفلتر ----
    function applyFilter() {
      var items = list.querySelectorAll('li');
      for (var i = 0; i < items.length; i++) {
        var li = items[i];
        var done = li.classList.contains('completed');
        var visible =
          currentFilter === 'all' ||
          (currentFilter === 'active' && !done) ||
          (currentFilter === 'done' && done);
        li.hidden = !visible;
        li.style.display = visible ? '' : 'none';
      }
    }

    function refresh() {
      applyFilter();
      updateCounter();
    }

    // ---- إضافة عنصر ----
    function addItem() {
      var text = input.value.trim();
      if (text === '') {
        showError(true);
        return;
      }
      showError(false);

      var li = document.createElement('li');
      var span = document.createElement('span');
      span.className = 'todo-text';
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

    // ---- Event delegation: مستمع واحد على القائمة ----
    list.addEventListener('click', function (e) {
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
    });

    // ---- أزرار الإضافة ----
    if (addBtn) addBtn.addEventListener('click', addItem);
    input.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        addItem();
      }
    });

    // ---- أزرار الفلترة ----
    function setFilter(name) {
      currentFilter = name;
      Object.keys(filterBtns).forEach(function (key) {
        if (filterBtns[key]) {
          filterBtns[key].classList.toggle('active', key === name);
        }
      });
      refresh();
    }

    Object.keys(filterBtns).forEach(function (key) {
      if (filterBtns[key]) {
        filterBtns[key].addEventListener('click', function () {
          setFilter(key);
        });
      }
    });

    // ---- الحالة الابتدائية ----
    showError(false);
    refresh();
  });
})();
