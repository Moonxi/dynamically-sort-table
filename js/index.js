;(function () {
  var checkboxes = document.querySelectorAll('input')
  var checkAll = document.querySelector('#checkAll')
  var checkItems = document.querySelectorAll('tbody input')
  var table = document.querySelector('.table-container')
  console.dir(table)

  var init = function () {
    initEvents()
  }

  var initEvents = function () {
    for (var i = 0; i < checkboxes.length; i++) {
      checkboxes[i].addEventListener('change', enventHandlers.setCorrectCheckboxStatus)
    }
    for (var i = 1; i < table.rows[0].children.length; i++) {
      table.rows[0].children[i].addEventListener('click', enventHandlers.sort)
    }
  }
  var enventHandlers = {
    setCorrectCheckboxStatus() {
      if (checkAll.checked && this.id === 'checkAll') {
        for (var i = 0; i < checkItems.length; i++) {
          checkItems[i].checked = true
        }
      }
      if (!checkAll.checked && this.id === 'checkAll') {
        for (var i = 0; i < checkItems.length; i++) {
          checkItems[i].checked = false
        }
      }
      if (isAllChecked()) {
        checkAll.checked = true
      } else {
        checkAll.checked = false
      }
    },
    sort() {
      var index = Array.prototype.slice.call(table.rows[0].children).indexOf(this)
      var tbodyCollections = Array.prototype.slice.call(table.children[1].children)
      tbodyCollections.sort((a, b) => {
        var res = a.children[index].innerHTML - b.children[index].innerHTML
        if (isNaN(res)) {
          return a.children[index].innerHTML.localeCompare(b.children[index].innerHTML)
        }
        return res
      })
      // table.children[1].append(...tbodyCollections)
      for (var i = 0; i < tbodyCollections.length; i++) {
        table.children[1].append(tbodyCollections[i])
      }
    }
  }
  function isAllChecked() {
    var res = true
    for (var i = 0; i < checkItems.length; i++) {
      res = res && checkItems[i].checked
    }
    return res
  }
  init()
})()
