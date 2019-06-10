function deleteNote(key) {
    var obj = document.getElementById(key);
    obj.parentNode.removeChild(obj);
    //(2)請刪除便利貼的資料
    localStorage.removeItem(key);
    
}