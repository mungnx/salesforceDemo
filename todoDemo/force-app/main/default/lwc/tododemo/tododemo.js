import { api, LightningElement, track } from 'lwc';
import addTodo from '@salesforce/apex/ToDoController.addTodo';
export default class Tododemo extends LightningElement {
    @track time="8:15";
    @track greeting="Good night";

    @track todos=[];

    connectedCallback(){
        this.getTime();
        this.populateTodos();

        setInterval(()=>{
            this.getTime()
        },1000*60);
    }
   
    getTime(){
        const date = new Date();
        const hour=date.getHours();
        const min=date.getMinutes();

        this.time=`${this.getHour(hour)}:${this.getDoubleDigit(min)}
        ${this.getMidDay(hour)}`;
        this.setGreeting(hour);
    }
    getHour(hour){
        return hour===0?12:hour>12?(hour-12):hour;
    }
    getMidDay(hour){
        return hour>=12?"PM":"AM";
    }
    getDoubleDigit(digit){
        return digit<10?"0"+digit:digit;
    }
    setGreeting(hour){
        if(hour<12){
            this.greeting="Good morning!";

        }
        else if (hour>=12){
            this.greeting="Good Afternoon!";
        }
    }
    addTodoHandler(){
        const inputbox=this.template.querySelector("lightning-input");
        console.log(inputbox.value);

        const todo={
            todoName:inputbox.value,
            done:false,
        };

        addTodo({payload: JSON.stringify(todo)}).then(response=>{
        }).catch(error=>{
            console.log("Error in inserting todo item"+error);
        });
        
       // this.todos.push(todo);
        inputbox.value="";

      } 
      get upcomingTask(){
          return this.todos && this.todos.length?this.todos.filter(
              todo=>!todo.done):[];
          
      }
      get completedTasks(){
          return this.todos && this.todos.length?
          this.todos.filter(todo=>todo.done):[];
      }

      populateTodos(){
          const todos=[{
              todoId:0,
              todoName:"Feed to cat",
              done:false,
              todoDate:new Date()
          },
          {
            todoId:1,
            todoName:"Check mail",
            done:false,
            todoDate:new Date()
          },
          {
          todoId:2,
          todoName:"Wash the car",
          done:true,
          todoDate:new Date()
      }
    ];
    this.todos=todos;
    }
}