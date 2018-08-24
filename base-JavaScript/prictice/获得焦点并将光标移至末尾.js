
  // 光标移至末尾
  function moveEnd(ele) {
    ele.focus();
    var len = ele.value.length;
    if (document.selection) {
      var sel = ele.createTextRange();
      sel.moveStart('character', len);
      sel.collapse();
      sel.select();
    } else if (typeof ele.selectionStart == 'number' && typeof ele.selectionEnd == 'number') {
      ele.selectionStart = ele.selectionEnd = len;
    }
  }