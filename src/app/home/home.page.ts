import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AlertController, ModalController } from '@ionic/angular';
import { AddNewTaskPage } from '../add-new-task/add-new-task.page';
import { TodoService } from '../todo.service';
import { UpdateTaskPage } from '../update-task/update-task.page';

import { Observable } from 'rxjs';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  todoList = []
  
  today: number = Date.now();

  public searchField: FormControl;

  // TODO : https://jsmobiledev.com/article/searchbar-firebase/
  //public foodList$: Observable<FoodItem[]>;


  constructor(public modalCtlr: ModalController, public todoService:TodoService) { 
    this.searchField = new FormControl('');
    this.getAllTask()
  }

  async ngOnInit() {
    const searchTerm$ = this.searchField.valueChanges;
  }

  async addNewItem() {
    const modal = await this.modalCtlr.create({
      component: AddNewTaskPage,
    })
    modal.onDidDismiss().then(newTask =>{
      this.getAllTask()
    })
    return await modal.present()
  }

  getAllTask(){
    this.todoList = this.todoService.getAllTasks()
    console.log(this.todoService.getAllTasks());
  }
  getDateFilter(noOfDays){
    // substract
    /**
    Date.prototype.AddDays = function(noOfDays) {
    this.setTime(this.getTime() + (noOfDays * (1000 * 60 * 60 * 24)));
    return this;
}
    */
    console.log("DateFactor" + noOfDays);
    var dt = new Date(Date.now());
    dt.setTime(dt.getTime() + (noOfDays * (1000 * 60 * 60 * 24)));
//    dt.setDate( dt.getDate() - 10 );

console.log("DateFactor" + dt);
//(noOfDays * (1000 * 60 * 60 * 24)

    //var dateNew = todayDate.get

    this.todoList = this.todoService.getDateFilter(dt);
  }

  //TODO
  getSearchFilter(searchString){
    this.todoList = this.todoService.getSearchFilter(searchString)
  // console.log(this.todoService.getAllTasks());
  }

  delete(key) { 
    this.todoService.deleteTask(key)
    this.getAllTask()
  }

  async update(selectedTask){
    const modal = await this.modalCtlr.create({
      component: UpdateTaskPage,
      componentProps: {task: selectedTask}
    })

    modal.onDidDismiss().then(()=>{
      this.getAllTask()
    })
    
    return await modal.present()
  }
}
