function LoadData() {
    //(3)讀出所有便利貼的資料,並將此資料傳給addNote(key,value)方法
for(var key in localStorage){
          key  +"  = " +localStorage.getItem(key);
     }
     addNote(key,value);
}
