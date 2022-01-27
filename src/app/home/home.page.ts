import { Component, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { AlertController, ModalController } from "@ionic/angular";
import { AddNewTaskPage } from "../add-new-task/add-new-task.page";
import { TodoService } from "../todo.service";
import { UpdateTaskPage } from "../update-task/update-task.page";

import { Observable } from "rxjs";
import { debounceTime } from "rxjs/operators";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"],
})
export class HomePage  {
  public searchTerm: string = "";

  public searchControl: FormControl;

  todoList = [];

  today: number = Date.now();

  searching: any = false;

  // TODO : https://jsmobiledev.com/article/searchbar-firebase/
  //public foodList$: Observable<FoodItem[]>;

  constructor(
    public modalCtlr: ModalController,
    public todoService: TodoService
  ) {
    this.searchControl = new FormControl();
    //    this.getAllTask()
  }
  ionViewDidLoad() {
    this.setFilteredItems("");
    this.searchControl.valueChanges
      .pipe(debounceTime(700))
      .subscribe((search) => {
        this.setFilteredItems(search);
      });
  }

  onSearchInput() {
    this.searching = true;
  }

  setFilteredItems(searchTerm) {
    this.todoList = this.todoService.filterItems(searchTerm);
  }

  async addNewItem() {
    const modal = this.modalCtlr.create({
      component: AddNewTaskPage,
    });
    (await modal).onDidDismiss().then((newTask) => {
      this.getAllTask();
    });
    return (await modal).present();
  }

  getAllTask() {
    this.todoList = this.todoService.getAllTasks();
    console.log(this.todoService.getAllTasks());
  }
  getDateFilter(noOfDays) {
    console.log("DateFactor" + noOfDays);
    var dt = new Date(Date.now());
    dt.setTime(dt.getTime() + noOfDays * (1000 * 60 * 60 * 24));
    this.todoList = this.todoService.getDateFilter(dt);
  }

  //TODO
  getSearchFilter(searchString) {
    this.todoList = this.todoService.getSearchFilter(searchString);
    // console.log(this.todoService.getAllTasks());
  }

  delete(key) {
    this.todoService.deleteTask(key);
    this.getAllTask();
  }

  async update(selectedTask) {
    const modal = await this.modalCtlr.create({
      component: UpdateTaskPage,
      componentProps: { task: selectedTask },
    });

    modal.onDidDismiss().then(() => {
      this.getAllTask();
    });

    return modal.present();
  }
}
