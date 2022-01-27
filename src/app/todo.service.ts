import { Injectable } from "@angular/core";
import { Storage } from "@ionic/storage-angular";
import { Todo } from './todo';

@Injectable({
  providedIn: "root",
})
export class TodoService {
  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    await this.storage.create();
  }

  addTask(key, value) {
    this.storage.set(key, value);
  }

  deleteTask(key) {
    this.storage.remove(key);
  }

  updateTask(key, newValue) {
    this.storage.set(key, newValue);
    this.getAllTasks();
  }

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
