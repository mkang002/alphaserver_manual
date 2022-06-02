const initDraggable = () => {
  dragElement(document.getElementById("manual"))

  function dragElement(elmnt) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0
    const element = document.getElementById("draggable")

    if (element) {
      element.onmousedown = dragMouseDown;}
    else {elmnt.onmousedown = dragMouseDown;}

    function dragMouseDown(w) {
      w = w || window.event;
      w.preventDefault();
      pos3 = w.clientX;
      pos4 = w.clientY;
      window.onmouseup = closeDragElement;
      window.onmousemove = elementDrag;}

    function elementDrag(w) {
      w = w || window.event;
      w.preventDefault();
      pos1 = pos3 - w.clientX;
      pos2 = pos4 - w.clientY;
      pos3 = w.clientX;
      pos4 = w.clientY;
      elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
      elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";}

    function closeDragElement() {
      window.onmouseup = null
      window.onmousemove = null
    }
  }
}

function initToggleManual() {
  const closeBtn = document.getElementById("close-btn")
  const openBtn = document.getElementById("info-btn")
  closeBtn.onclick = () => {
    document.getElementById("manual").style.display = "none"
    document.getElementById("info-btn").style.display = "block"
  }
  openBtn.onclick = () => {
    document.getElementById("manual").style.display = "block"
    document.getElementById("info-btn").style.display = "none"
  }
}

const getPageId = () => {
  const pageIdsArray = ['320255114', '320255188', '320255189', '320255190', '320255191', '320255192', '320255193']

  const hash = window.location.hash
  const pageId = hash.split('/')[2]
  return pageId && pageIdsArray.includes(pageId) ? pageId : 'index'
}

window.onload = function(){
  const page = getPageId()
  document.getElementById("manual-text").setAttribute("src", `./assets/manual/${page}.html`);

  initDraggable()
  initToggleManual()

  // change embed source
  window.addEventListener('popstate', function() {
    const page = getPageId()
    document.getElementById("manual-text").setAttribute("src", `./assets/manual/${page}.html`);
  });
}

