const remote = require('electron').remote;
const mybtn = document.getElementById('mybtn');

mybtn.onclick = () => {
  var win = new remote.BrowserWindow({
    width: 500, height: 500,
  })
  win.loadFile('yellow.html')
  win.on('close', function () {
    win = null;
  })
}

window.onload = ()=>{


  
}



const rows = document.querySelectorAll('#ui ul li')
const html = document.documentElement
let clientH = html.clientHeight //浏览器可视窗口的高度

document.addEventListener('scroll', (e) => {
  let scrolled = html.scrollTop;
  let scrollH = scrolled + clientH //滑动距离 + 界面高度
  for (let [index, row] of rows.entries()) {
    let rowTop = getPoint(rows[index])
    progress = (scrollH-rowTop )/rows[index].offsetHeight
    if (progress>=1) {
      progress = 1
    }
    else if(progress<=0 ){
      progress = 0
    }
    row.style.setProperty('--progress', progress)
  }
})

//获取元素的上边距
function getPoint(obj){
  var t = obj.offsetTop;
  var l = obj.offsetLeft;
  while (obj = obj.offsetParent){
    t += obj.offsetTop;
    l += obj.offsetLeft;
  }
  return t
}