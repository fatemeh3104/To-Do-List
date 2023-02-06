let modalElem = document.querySelector('.modal');
let modalEditElem = document.querySelector('.modal-edit');
let showModalElem = document.querySelector('#add_btn');
let closModalElem = document.querySelector('.clos-btn');
let inputTodo = document.querySelector('#todo_input');
let editTodo = document.querySelector('.edit_input');
let noStatus = document.querySelector('#no_status');
let notStatted = document.querySelector('#not_started');
let inProgress = document.querySelector('#in_progress');
let completed = document.querySelector('#completed');
let edit_submit = document.querySelector('.edit_submit')
let todosListArr = [];
let editIcon;
let status1,status2;

window.onload= getLocalStorage
function showModal(){
      modalElem.style.top='50%';
}
function closeModal(){
    modalElem.style.top='-50%';
}
showModalElem.addEventListener('click',function(){
    showModal();
})
closModalElem.addEventListener('click',function(){
    closeModal();
})
function showModalEdit(){
    modalEditElem.style.top = '50%';
}
function closeModalEdit(){
    modalEditElem.style.top = '-50%';
}
function clearNoStatus(){
  
        for(let i=noStatus.childElementCount;i>2;i--){
           
            noStatus.children[i-1].remove()
        }
       
        

}
function clearNotStarted(){
    for(let i=notStatted.childElementCount;i>1;i--){
       
        notStatted.children[i-1].remove()
    }
}
function clearInprogress(){
    for(let i=inProgress.childElementCount;i>1;i--){
       
        inProgress.children[i-1].remove()
    }
}
function clearCompleted(){
    for(let i=completed.childElementCount;i>1;i--){
       
        completed.children[i-1].remove()
    }
}
function getLocalStorage(){ 
    let test= [];
    test = JSON.parse(localStorage.getItem('todos'));
    if(test!==null){
        test.forEach(function(todos){
            
        let newTodoDiv=document.createElement('div');
        newTodoDiv.className='todo';
        newTodoDiv.id = todos.id;
        newTodoDiv.setAttribute("draggable","true");
        newTodoDiv.addEventListener('dragstart', function(event){
            event.dataTransfer.setData('elemId', event.target.id)
        })
        newTodoDiv.innerHTML= todos.title;
        editIcon = document.createElement('i');
        editIcon.className='icons fa-solid fa-pen-to-square';
    
        
        let closeIcon = document.createElement('i');
        closeIcon.className='icons fa-solid fa-xmark';
        
        closeIcon.addEventListener('click',function(event){
            let indx =  todosListArr.findIndex(object => {
                return object.id ===  Number(event.target.parentElement.parentElement.id);
            });
            todosListArr.forEach(function(todo){
            
            if( Number(event.target.parentElement.parentElement.id)===todo.id){
                    todosListArr.splice(indx,1);
            }
            })
            localStorage.clear();
            localStorage.setItem('todos', JSON.stringify(todosListArr))
            event.target.parentElement.parentElement.remove();
        })
        editIcon.addEventListener('click',function(event){
            showModalEdit();
            let a=false;
            edit_submit.addEventListener('click',function(){
                let indx =  todosListArr.findIndex(object => {
                    return object.id ===  Number(event.target.parentElement.parentElement.id);
                });
                
                try{
                    todosListArr.forEach(function(todo){    
                        if( Number(event.target.parentElement.parentElement.id)===todo.id){
                                todosListArr[indx].title=editTodo.value;
                                editTodo.value='';
                                localStorage.clear();
                                localStorage.setItem('todos', JSON.stringify(todosListArr))
                                clearNoStatus();
                                clearNotStarted();
                                clearInprogress();
                                clearCompleted();
                                getLocalStorage();
                                a=true;
                                closeModalEdit();
                        }
                        if(a){
                            throw 'BreakError';
                        }
                        }) 
                }catch (err) {
                    if (err !== 'BreakError') throw err;
                  }
                
                
            
            console.log(todosListArr)
            
            })

            
        })

        let newIcons = document.createElement('div');
        newIcons.append(editIcon,closeIcon);
        newTodoDiv.append(newIcons);
        if(todos.status=='noStatus'){
            noStatus.append(newTodoDiv);
        }
        else if(todos.status=='notStarted'){
            notStatted.append(newTodoDiv);
        }
        else if(todos.status=='inProgress'){
            inProgress.append(newTodoDiv);
        }
        else if(todos.status=='completed'){
            completed.append(newTodoDiv);
        }
        })
        todosListArr=test;
    }

   
}
function addNewTodo(newTodo){
   let newTodoObj={
    id: Math.random(),
    title : newTodo,
    status :status1
  
   }
   console.log(newTodoObj)
   todosListArr.push(newTodoObj)
  
    let newTodoDiv=document.createElement('div');
    newTodoDiv.className='todo';
    newTodoDiv.id = newTodoObj.id;
    newTodoDiv.setAttribute("draggable","true");
    newTodoDiv.addEventListener('dragstart', function(event){
        event.dataTransfer.setData('elemId', event.target.id)
    })
    newTodoDiv.innerHTML= newTodo;
    let editInput = document.createElement('input');
    editInput.className ='editTodo';
    editInput.setAttribute('placeholder','edit....')
    editIcon = document.createElement('i');
    editIcon.className='icons fa-solid fa-pen-to-square';
    editIcon.addEventListener('click',function(event){
        showModalEdit();
        let a=false;
        edit_submit.addEventListener('click',function(){
            let indx =  todosListArr.findIndex(object => {
                return object.id ===  Number(event.target.parentElement.parentElement.id);
            });
           
            try{
                todosListArr.forEach(function(todo){    
                    if( Number(event.target.parentElement.parentElement.id)===todo.id){
                            todosListArr[indx].title=editTodo.value;
                            localStorage.clear();
                            localStorage.setItem('todos', JSON.stringify(todosListArr))
                            clearNoStatus();
                            clearNotStarted();
                            clearInprogress();
                            clearCompleted();
                            getLocalStorage();
                            a=true;
                    }
                    if(a){
                        throw 'BreakError';
                    }
                    }) 
            }catch (err) {
                if (err !== 'BreakError') throw err;
              }
      
        })

        
    })
    
    let closeIcon = document.createElement('i');
    closeIcon.className='icons fa-solid fa-xmark';
    
    closeIcon.addEventListener('click',function(event){
        let indx =  todosListArr.findIndex(object => {
            return object.id ===  Number(event.target.parentElement.parentElement.id);
          });
        todosListArr.forEach(function(todo){
         
           if( Number(event.target.parentElement.parentElement.id)===todo.id){
                todosListArr.splice(indx,1);
           }
        })
        localStorage.clear();
        localStorage.setItem('todos', JSON.stringify(todosListArr))
        event.target.parentElement.parentElement.remove();
    })
    editIcon.addEventListener('click',function(){
        console.log('Edit')
        
    })
    let newIcons = document.createElement('div');
    newIcons.append(editIcon,closeIcon);
    newTodoDiv.append(newIcons,editInput);
    if(status1=='noStatus'){
        noStatus.append(newTodoDiv);
    }
    else if(status1=='notStarted'){
        notStatted.append(newTodoDiv);
    }
    else if(status1=='inProgress'){
        inProgress.append(newTodoDiv);
    }
    else if(status1=='completed'){
        completed.append(newTodoDiv);
    }
    console.log(todosListArr)
    localStorage.setItem('todos', JSON.stringify(todosListArr))
}
 function selectStatus(element)
{
    var idx=element.selectedIndex;
    let status=element.options[idx].value;
    status1 = status;
 }
 function editStatus(element){
    var idx=element.selectedIndex;
    let status=element.options[idx].value;
    status2 = status;
 }

inputTodo.addEventListener("keydown",function(event){
    
    let newTodo = event.target.value.trim();
    
    if(event.keyCode===13){
     
        if(newTodo){
            inputTodo.value='';
          
            addNewTodo(newTodo);
        }
    }
})
let addElem = document.querySelector('#todo_submit');
addElem.addEventListener('click',function(){
    let newTodo = inputTodo.value;
        if(newTodo){
            inputTodo.value='';
            addNewTodo(newTodo);
        }
    

})
function dropNostatus(event){
    let targetId = event.dataTransfer.getData('elemId')
    let targetElem = document.getElementById(targetId)
    event.target.append(targetElem)
    console.log( event.target.lastChild.id)
    todosListArr.forEach(function(todo){
        if(Number(event.target.lastChild.id)===todo.id){
            todo.status='noStatus';

        }
     
    })
    localStorage.setItem('todos', JSON.stringify(todosListArr))
   console.log(todosListArr)


}

function dropNotStarted(event){
    let targetId = event.dataTransfer.getData('elemId')
    let targetElem = document.getElementById(targetId)
    event.target.append(targetElem)
    console.log( event.target.lastChild.id)
    todosListArr.forEach(function(todo){
        if(Number(event.target.lastChild.id)===todo.id){
            todo.status='notStarted';

        }
     
    })
    localStorage.setItem('todos', JSON.stringify(todosListArr))
    console.log(todosListArr)
}

function dropinProgress(event){
    let targetId = event.dataTransfer.getData('elemId')
    let targetElem = document.getElementById(targetId)
    event.target.append(targetElem)
    console.log( event.target.lastChild.id)
    todosListArr.forEach(function(todo){
        if(Number(event.target.lastChild.id)===todo.id){
            todo.status='inProgress';

        }
     
    })
    localStorage.setItem('todos', JSON.stringify(todosListArr))
    console.log(todosListArr)
}

function dropCompleted(event){
    let targetId = event.dataTransfer.getData('elemId')
    let targetElem = document.getElementById(targetId)
    event.target.append(targetElem)
    console.log( event.target.lastChild.id)
    todosListArr.forEach(function(todo){
        if(Number(event.target.lastChild.id)===todo.id){
            todo.status='completed';

        }
     
    })
    localStorage.setItem('todos', JSON.stringify(todosListArr))
    console.log(todosListArr)
}

function ondragOverHandeler(event){
    event.preventDefault();
  
}