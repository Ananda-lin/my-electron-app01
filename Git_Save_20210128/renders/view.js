const XLSX = require('xlsx');
const echarts = require('echarts');

window.onload = function () {

  myecharts();
  mydrage();

}
function mydrage() {
  const mydragfile = document.querySelector('.mydragfile');
  mydragfile.addEventListener('dragenter', function (e) {
    e.preventDefault();
    e.stopPropagation();
  }, false);
  mydragfile.addEventListener('dragover', function (e) {
    e.preventDefault();
    e.stopPropagation();
  }, false);
  mydragfile.addEventListener('dragleave', function (e) {
    e.preventDefault();
    e.stopPropagation();
  }, false);
  mydragfile.addEventListener('drop', function (e) {
    e.preventDefault();
    e.stopPropagation();
    handleDragFile(e);
  });

}

var reader = new FileReader();
var fileExcel = {
  "oldFile": "",
}
//监听输入框,引入文件
function addList() {
  var xlf = document.getElementById('xlf')
  if (xlf.addEventListener) {
    xlf.addEventListener('change', handleFile, false);
  }
}
//变量fileExcel赋值,获取文件
/* function handleFile(e) {
  var files = e.target.files;
  fileExcel.oldFile = files[0];
  readFile(fileExcel.oldFile);

} */
function handleDragFile(e) {
  var files = e.dataTransfer.files
  fileExcel.oldFile = files[0];
  addFileList(fileExcel.oldFile);
  readFile(fileExcel.oldFile);
  removeFileList(fileExcel.oldFile);
  emptyFileList(fileExcel.oldFile)
}
//读取文件
function readFile(file) {
  var name = file.name;
  // console.log(file.path);
  reader.onload = function (e) {
    fileExcel.oldFile = e.target.result;
    var wb = XLSX.read(fileExcel.oldFile, { type: "binary" });
    var wb_sheetname = wb.SheetNames[0];
    const ws = wb.Sheets[ wb_sheetname];
    // ws['A' + 1].v = "啦啦啦" //修改表格内容
    // console.log(ws['A' + 1].v); 
    // XLSX.writeFile(wb, file.path); //file.path 文件路径
    let excelData = XLSX.utils.sheet_to_json(ws,{
      header:'A',
      raw:true,
      defval:" "
    });
    console.log(excelData);
  };
  reader.readAsBinaryString(file);
}
function addFileList(file) {
  $('.myul').append("<li>" + file.path + "<span>X</span></li>")
}
function removeFileList(file) {
  $('.myul>li>span').on('click', function (e) {
    // console.log(e.target.parentElement)
     $(e.target.parentElement).remove();
  })
}
function emptyFileList(file){
  $('.myul> span').on('click',function(e){
    $(e.target.parentElement).empty();
  })
}
//echarts
function myecharts(){
  var mychart = echarts.init(document.getElementById('main'));
  console.log($('#main'))
  console.log(document.getElementById('main'))

  var option = {
    title:{
      text:'Echarts 入门示例'
    },
    tooltip:{},
    legend:{
      data:['销量']
    },
    xAxis:{
      data:['衬衫','羊毛衫','裤子']
    },
    yAxis:{

    },
    series:[{
      name:'销量',
      type:'bar',
      data:[5,20,12,30,10,10,]
    }]
  }
  mychart.setOption(option);
}

