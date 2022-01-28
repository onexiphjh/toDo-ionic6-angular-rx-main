import { Injectable } from "@angular/core";
import { Storage } from "@ionic/storage-angular";

import { Observable } from "rxjs";
import { map } from "rxjs/operators";

//import { Todo } from './todo';


//external ?
export interface Todo {

  id?: string;
  title: string; 
  duedate: Date;
  priority: string;
  categogry: string;
  completed: boolean;
}

//new 
@Injectable({
  providedIn: "root",
})
export class TodoService {
  constructor(private storage: Storage) {
    //this.init();
  }

  private todos: Observable<Todo[]>;

  public async generateKey(): Promise<string>{
    let key = `todo${ parseInt(`${Math.random() * 100}`)}`;
    let ret = await this.storage.get(key);

    while(ret){
      key = `todo${ parseInt(`${Math.random() * 100}`)}`;
      ret = await this.storage.get(key);
    }
    return key;
  }
  public async read(): Promise<Todo[]>{

    let todos: Array<Todo> = [];
    await this.storage.forEach((v, key, i)=>{
      if(key.startsWith("todo")){
          todos.push(v);
      }
    });

    return todos;
  }

  public async create(key: string , todo: Todo){
    console.log("Creating todo: ", todo);
    return await this.storage.set(key, todo);
  }

  public async update(todo: Todo){
    return await this.storage.set(todo.key, todo);
  }

  public async delete(key: string){
    return await this.storage.remove(key);
  }



  //OLD 2 del

  //TODO
  filterItems(searchTerm) {
    let tasks: any = [];
    this.storage.forEach((key, value, index) => {
      tasks.push({ key: value, value: key });
    });
    return tasks;
  }

  getAllTasks() {
    let tasks: any = [];
    this.storage.forEach((key, value, index) => {
      tasks.push({ key: value, value: key });
    });
    return tasks;
  }

  //TODO
  getDateFilter(dateLimit: Date) {
    /**
     *  A slow > https://jsmobiledev.com/article/searchbar-firebase/
     *  B https://www.joshmorony.com/high-performance-list-filtering-in-ionic-2/
     *     return this.storage.filter(item => {
      return item.title.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
    });
     */

    let tasks: any = [];
    this.storage.forEach((key, value, index) => {
      //    transform(value: string) {
      /*
        var datePipe = new DatePipe("en-US");
        var dateLimitFilter = datePipe.transform(value, 'yyyy-MM-dd');

      let dateLimitFilter =this.datepipe.transform(dateLimit, 'yyyy-MM-dd');

      console.log("|SEARCH| : "+dateLimitFilter+" "+value);

      dateLimit.getFullYear
*/

      let dateLimitFilter =
        dateLimit.getFullYear() +
        "" +
        dateLimit.getMonth() +
        "" +
        dateLimit.getDay();

      console.log("|SEARCH| : " + dateLimitFilter + " " + value);

      if (value.toLowerCase().indexOf(dateLimitFilter) > -1) {
        tasks.push({ key: value, value: key });
      }
    });
    return tasks;
  }

  //TODO
  getSearchFilter(searchTerm) {
    let tasks: any = [];
    this.storage.forEach((key, value, index) => {
      //item.title.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1

      //    console.log("|SEARCH| : "+searchTerm+" "+value);

      if (value.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1) {
        tasks.push({ key: value, value: key });
      }
    });
    return tasks;
  }
}
