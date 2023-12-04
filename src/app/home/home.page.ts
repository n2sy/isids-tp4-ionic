import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  currentDate : Date;
  allTasks = [];
  constructor(private http : HttpClient) {}

  ngOnInit() {
    this.currentDate = new Date(); // Date.now
   // let a = Date.now
    this.http.get('https://ng-tasks-c6b03.firebaseio.com/Tasks.json').subscribe(
      {
        next : (response) => {
          console.log(response);
        //  this.allTasks = response;
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
