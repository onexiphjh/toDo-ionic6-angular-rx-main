import { IfStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Todo, TodoService } from "src/app/services/todo.service";

//import { ModalController } from '@ionic/angular';

import {
  LoadingController,
  MenuController,
  NavController,
} from "@ionic/angular";

@Component({
  selector: "app-todo-details",
  templateUrl: "./todo-details.page.html",
  styleUrls: ["./todo-details.page.scss"],
})
export class TodoDetailsPage implements OnInit {
  categories =[]
  categorySelectedCategory

  todo: Todo = {
    title: "",
    duedate: new Date().getTime(),
    priority: "",
    categogry: "",
    completed: false
  };

  todoId = null;

  constructor(
    private todoService: TodoService,
    private route: ActivatedRoute,
    private loadingController: LoadingController,
    private nav: NavController
  ) {}
/*
  constructor(public modalCtlr: ModalController, public todoService:TodoService) {

   }
   */

  ngOnInit() {
    this.categories.push('work')
    this.categories.push('personal')
  }
  

  selectCategory(index){
    this.categorySelectedCategory = this.categories[index]
    console.log(this.categorySelectedCategory);
  }

  async loadTodo(): Promise<any> {
    const loading = await this.loadingController.create({
      message: "Loading Todo..",
    });
    await loading.present();

    this.todoService.getTodo(this.todoId).subscribe((res) => {
      loading.dismiss();
      this.todo = res;
    });
  }

  async saveTodo(): Promise<any> {
    const loading = await this.loadingController.create({
      message: "Saving Todo..",
    });
    await loading.present();

    if (this.todoId) {
      this.todoService.updateTodo(this.todo, this.todoId).then(() => {
        loading.dismiss();
        this.nav.navigateBack("home");
      });
    } else {
      this.todoService.addTodo(this.todo).then(() => {
        loading.dismiss();
        this.nav.navigateBack("home");
      });
    }
  }

/*
  async saveTodo(): Promise<any> {
    const loading = await this.loadingController.create({
      message: "Saving Todo..",
    });
    await loading.present();

    if (this.todoId) {
      this.todoService.updateTodo(this.todo, this.todoId).then(() => {
        loading.dismiss();
        this.nav.navigateBack("home");
      });
    } else {
      this.todoService.addTodo(this.todo).then(() => {
        loading.dismiss();
        this.nav.navigateBack("home");
      });
    }
  }
*/
  //old
  /*
  async add(){
    this.newTaskObj = ({itemName:this.itemName, itemDueDate:this.itemDueDate, itemPriority:this.itemPriority,itemCategory:this.categorySelectedCategory})
    console.log(this.newTaskObj);
    let uid = this.itemName + this.itemDueDate
    
    if(uid){
      await this.todoService.addTask(uid,this.newTaskObj)
    }else{
      console.log("can't save empty task");
    }


    this.dismis()
  }
  
  selectCategory(index){
    this.categorySelectedCategory = this.categories[index]
    console.log(this.categorySelectedCategory);
  }

  async dismis(){
    await this.modalCtlr.dismiss(this.newTaskObj)
  }
*/

}
