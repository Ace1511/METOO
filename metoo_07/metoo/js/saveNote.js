//儲存便利貼的內容
function saveNote(key) {
    var obj = document.getElementById(key);
    var value = obj.childNodes[1].firstChild.nodeValue;
    if (value.length > 0) {
        //(1)請將便利貼的資料儲存起來
        localStorage.setItem(key,value);
        
    }

}