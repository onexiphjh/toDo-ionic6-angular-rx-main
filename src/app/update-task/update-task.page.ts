import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms";
import { Router } from "@angular/router";
import { ToastController } from '@ionic/angular';


import { DbService } from './../services/db.service';


@Component({
  selector: 'app-update-task',
  templateUrl: './update-task.page.html',
  styleUrls: ['./update-task.page.scss'],
})
export class UpdateTaskPage implements OnInit {
  editForm: FormGroup;
  id: any;
  Data: any[] = []

  @Input() task;
  categories =[]
  categorySelectedCategory


  constructor(
    private db: DbService,
    public formBuilder: FormBuilder,
    private toast: ToastController,
    private router: Router
  ) { }


  ngOnInit() {      

    this.categories.push('work')
    this.categories.push('personal')

    this.db.dbState().subscribe((res) => {
      if(res){
        this.db.fetchSongs().subscribe(item => {
          this.Data = item
        })
      }
    });

    this.editForm = this.formBuilder.group({
      title: [''],
      duedate: new Date(),
      priority:  [''],
      category:  [''],
      completed: false
    })
  }

  saveForm(){
    this.db.updateSong(this.id, this.editForm.value)
    .then( (res) => {
      console.log(res)
      this.router.navigate(['/home']);
    })
  }
/*
  storeData() {
    this.db.addSong(
      this.mainForm.value.title,
      this.mainForm.value.song
    ).then((res) => {
      this.mainForm.reset();
    })
  }

  deleteSong(id){
    this.db.deleteSong(id).then(async(res) => {
      let toast = await this.toast.create({
        message: 'Song deleted',
        duration: 2500
      });
      toast.present();      
    })
  }
*/

  /**

  https://www.techiediaries.com/ionic/ionic-5-tutorial-storage-crud-theming-example/
   *     title: string; 
    note: string;
    duedate: Date;
    priority: string;
    categogry: string;
    this.itemName = this.task.value.itemName
    this.itemDueDate = this.task.value.itemDueDate
    this.itemPriority = this.task.value.itemPriority
    this.categorySelectedCategory = this.task.value.itemCategory
    completed: boolean;
   */


    /*
    this.itemName = this.task.value.itemName
    this.itemDueDate = this.task.value.itemDueDate
    this.itemPriority = this.task.value.itemPriority
    this.categorySelectedCategory = this.task.value.itemCategory
    */
    // console.log(this.task);
    
    
/*
  async update(){
    this.newTaskObj = ({itemName:this.itemName, itemDueDate:this.itemDueDate, itemPriority:this.itemPriority,itemCategory:this.categorySelectedCategory})
    let uid = this.task.key
    await this.todoServive.updateTask(uid,this.newTaskObj)
    this.dismiss()
  }
  */
}
