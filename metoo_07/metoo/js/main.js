window.addEventListener("load", init, false);
function init() {
    //按下新增便利貼按鈕
    var btnNote = document.getElementById("addNote");
    btnNote.addEventListener("click", function () { addNote(); }, false);

    //按下清除所有便利貼按鈕
    var btnRemove = document.getElementById("removeAllNote");
    btnRemove.addEventListener("click", function () { deleteNotesAll();  }, false);

    LoadData();

    //讓便利貼可以移動
    document.addEventListener("mousedown", mousedownHandler, false);
    document.addEventListener("mouseup", mouseupHandler, false);

}
var divTop = 50;
var divLeft = 0;
var k = 0;
function addNote(key, value) {

    //如果沒有傳key進來
    //就自己產生一個key
    var id;
    if (!!key) {
        id = key;
    }
    else {
        id = "note_" + new Date().getTime();
    }

    //設定產生便利貼的位置
    if (divLeft != 0) {
        divLeft += 200; //100 + (200 * k);
        if (divLeft >= 1200) {
            divTop += 200;
            divLeft = 50;
        }
    }
    else {
        divLeft = 50;
    }
    //建立便利貼
    var mainDiv = document.createElement("div");
    mainDiv.setAttribute("class", "note");
    mainDiv.setAttribute("id", id);
    mainDiv.setAttribute("style", "top:" + divTop + "px;left:" + divLeft + "px");


    //建立便利貼的Title
    var titleDiv = document.createElement("div");
    titleDiv.setAttribute("class", "noteTitle");

    //建立新增圖示
    var addImg = document.createElement("img");
    addImg.setAttribute("src", "images/icon-add.png");
    addImg.setAttribute("class", "addIcon");
    //按下新增的圖示會呼叫addNote(),來產生新的便利貼
    addImg.setAttribute("onclick", "addNote()");

    titleDiv.appendChild(addImg);

    //建立刪除圖示
    var delImg = document.createElement("img");
    delImg.setAttribute("src", "images/icon-delete.png");
    delImg.setAttribute("class", "delIcon");
    //按下刪除的圖示會呼叫deleteNote(id),來刪除便利貼
    delImg.setAttribute("onclick", "deleteNote('" + id + "')");
    titleDiv.appendChild(delImg);


    //建立便利貼的內容
    var contentDiv = document.createElement("div");
    if (!!value) {
        var txtDiv = document.createTextNode(value);
        contentDiv.appendChild(txtDiv);
    }
    contentDiv.setAttribute("class", "noteContent");
    contentDiv.setAttribute("contenteditable", "true");  //允許編輯div的內容
    //當使用者輸入完便利貼的內容後,離開此便利貼
    //會呼叫saveNote(id)的方法來儲存便利貼的內容
    contentDiv.setAttribute("onblur", "saveNote('" + id + "')");

    mainDiv.appendChild(titleDiv);
    mainDiv.appendChild(contentDiv);

    document.body.appendChild(mainDiv);
}




//移動便利貼
var dragObj;
var _startX = 0;            // mouse starting positions
var _startY = 0;
var _offsetX = 0;           // current element offset
var _offsetY = 0;
var z = 0;
function mousedownHandler(e) {
    if (e.target.parentNode.className == 'note') {
        dragObj = e.target.parentNode;
        var t = dragObj.style.top;
        var l = dragObj.style.left;
        z += 1;
        dragObj.setAttribute("style", "top:" + t + ";left:" + l + ";z-index:" + z);

        _startX = e.clientX;
        _startY = e.clientY;
        _offsetX = dragObj.offsetLeft;
        _offsetY = dragObj.offsetTop;

        document.addEventListener("mousemove", mousemoveHandler, false);
    }
}
function mouseupHandler(e) {
    document.removeEventListener("mousemove", mousemoveHandler, false);
}
function mousemoveHandler(e) {

    dragObj.style.left = (_offsetX + e.clientX - _startX) + 'px';
    dragObj.style.top = (_offsetY + e.clientY - _startY) + 'px';
}