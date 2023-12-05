import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  currentDate : Date;
  allTasks = [];
  showAddButton = true;
  //textNewTask = '';
  constructor(private http : HttpClient, private alertCtrl : AlertController) {}

  addNewTask(textNewTask) {
    this.http.post('https://ng-tasks-c6b03.firebaseio.com/Tasks.json', 
    {
      checked : false,
      date : new Date(),
      text : textNewTask
    }).subscribe(
      {
        next : (response) => {
          console.log(response);
          alert('Task Added');
          this.toggleButton();
          this.getAllTasks();
        },
        error : (err) => {
          console.log(err);
          
        }
      }
      )
    }
    async deleteTask(id) {
      let alert = await this.alertCtrl.create(
        {
          header : 'Confirmation',
          message : 'Etes vous sur de vouloir supprimer ce task ?',
          buttons : [
            'No',
            {
              text : 'Yes',
              handler : () => {
                
                this.http.delete(`https://ng-tasks-c6b03.firebaseio.com/Tasks/${id}.json`).subscribe(
                  {
                  next : (response) => {
                    this.getAllTasks();
                    
                  },
                  error : (err) => {
                    console.log(err);
                    
                  }
          
                }
              )
              }
            }
          ]
        }
      )
      await alert.present();

  }

  changeCheckedValue(task) {
    this.http.patch(`https://ng-tasks-c6b03.firebaseio.com/Tasks/${task.id}.json`, 
    {
      checked : !task.checked
    }).subscribe(
      {
        next : (response) => {
          //alert('Task Updated');
          this.getAllTasks();
        }
      }
    )
  }

  toggleButton() {
    this.showAddButton = !this.showAddButton;
  }

  getAllTasks() {
    this.http.get('https://ng-tasks-c6b03.firebaseio.com/Tasks.json').subscribe(
      {
        next : (response) => {
          console.log(response);
        //  this.allTasks = response;
        this.allTasks = [];
        for (const key in response) {
          console.log(key);

          //V1
          // let newTask = {
          //   id : key,
          //   checked : response[key].checked,
          //   text : response[key].text,
          //   date : response[key].date
          // }
          // this.allTasks.push(newTask)

          // V2
          // this.allTasks.push( {
          //   id : key,
          //   checked : response[key].checked,
          //   text : response[key].text,
          //   date : response[key].date
          // })

          //V3
          this.allTasks.push( {
            id : key,
            ...response[key]
          })
            
          }
          console.log(this.allTasks);
          
        }
          
        }
      
    );
  }

  ngOnInit() {
    this.currentDate = new Date(); // Date.now
    this.getAllTasks();
   // let a = Date.now
   
  //  this.http.get('https://jsonplaceholder.typicode.com/userrs').subscribe(
  //   {
  //     next : (data) => {
  //       console.log(data);
        
        
  //     },
  //     error : (err) => {
  //       console.log(err);
  //       alert(err['message']);
        
  //     },
  //     complete : () => {
  //       console.log("Flux terminé !!");
        
  //     }
  //   }
  //  )
  }
}
