import {btn, textUser, WorkTodo, closeWorkTodo, allTask, closeTask, deleteAll, deletelast, showComplited, displayClose, showAll, find, cleanSearch, subContainer} from "./utils.js"


//хранение тасков активных
let tasks;


localGet();
block(tasks);

//получение из локал сторедж
function localGet(){
   return tasks = JSON.parse(localStorage.getItem("todos"));
}

//запись в локал сторейдж
function localSet(){
   localStorage.setItem("todos", JSON.stringify(tasks));
};

//создаем объект тасков
function Users(information){
   this.id = tasks.length + 1;
   this.time = new Date().toLocaleDateString();
   this.information = information;
   this.isChecked = false;
   this.priorety = "no";
};

//создание блоков тасков
function block(todo){
   if(todo == null){
      todo = []
   }
   localGet()
   closeWorkTodo.innerHTML ="";
   WorkTodo.innerHTML = "";
   if(todo.length > 0) {
      todo.forEach((task, index) => {
         const check = task.isChecked ? "checked" : "";
         let blockHtml = 
         `<div class="tasks-todo ${check}">
                     <div class="hight-block" id="${task.id}">
                        <div class="one-block">
                           <input type="checkbox" class="btn-checkbox" ${check}>
                           <div class="new-task">
                                 <p class="text-task">${task.information}</p>  
                           </div>
                        </div>
                        <div class="two-block">
                           <div class="btn-task">
                                 <button class="delete-task">Х</button>
                                 <p class="date-creation">Дата начала ${task.time}</p>
                           </div>
                        </div>
                     </div>
         
                  </div>
                  </div>
                  `;
         if(task.isChecked){
               closeWorkTodo.innerHTML += blockHtml;
         }  else {
               WorkTodo.innerHTML += blockHtml;
         };
         
      });
   
   allTaskData(tasks);
   closeTaskData(tasks);

   } else {
      tasks = []
   }
};

//добавление тасков на кнопку
btn.addEventListener("click", () => {

   if(textUser.value){
      localGet()
      tasks.push(new Users(textUser.value));
      localSet();
      block(tasks);
      textUser.value = "";
   } else {
      alert("введите текст");
   };
   
});

//добавление тасков на Enter
textUser.addEventListener( 'keyup', event => {
   if( event.code === 'Enter' ) {
      if(textUser.value){
         tasks.push(new Users(textUser.value));
         localSet();
         block(tasks);
         textUser.value = "";
      } else {
         alert("введите текст");
      }
   };
});

//поиск клика по чекбоксу перенос в неактивные и обратно
subContainer.onclick = (event) => {
   const target = event.target;

   if(target.classList.contains("btn-checkbox")) {
      console.log(target.checked);
      const isComplited = target.checked;
      const taskTarget = target.parentElement.parentElement;
      const taskid = taskTarget.getAttribute('id');
      changeCheked(taskid, isComplited, tasks);
      localSet();
      block(tasks);
      console.log(tasks);
   };
   if(target.classList.contains("delete-task")) {
      const taskTarget = target.parentElement.parentElement.parentElement;
      const taskid = taskTarget.getAttribute('id');
      deleteTask(taskid, tasks);
      localSet();
      block(tasks);
   };
};

//функция измения статуса
function changeCheked(id, status, list) {
   list.forEach((task) => {
      if(task.id == id) {
         task.isChecked = status;
      };
   });
};

//удаление задачи
function deleteTask(id, list) {
   list.forEach((task, index) => {
      if(task.id == id){
         list.splice(index, 1);
      };
   });
};

//счет все задачи
function allTaskData(list) {
   allTask.innerHTML = "";
   return allTask.innerHTML += list.length;
};

//счет закрытые задачи
function closeTaskData(list) {
   closeTask.innerHTML = "";
   let result = list.filter((task) => {
      return task.isChecked;
   });
   closeTask.innerHTML += result.length;
};

//удалить все 
deleteAll.addEventListener("click", () => {
   tasks.length = 0; 
   deleTasks.length = 0;
   console.log(tasks.length);
   localSet()
   block(tasks);
   // localStorage.clear("todos");
   //block(tasks);
   
});

//удалить последний
deletelast.addEventListener("click", () => {
   tasks.splice(tasks[tasks.length -1], 1);
   console.log(tasks.length);
   localSet()
   block(tasks);
});

//показать закрытые
showComplited.addEventListener("click", () => {
   displayClose.style.display = "none";
});

//показать все
showAll.addEventListener("click", () => {
   displayClose.style.display = "block";
});

//поиск
find.oninput = () => {
   let findValue = '' + find.value;
   let newArr = tasks.filter(el => {
      let infoText = '' + el.information;
      console.log(infoText);
      return infoText.indexOf(findValue) !== -1;
   });
   block(newArr);
};

//очистить поиск
cleanSearch.addEventListener("click", () => {
   find.value = "";
});