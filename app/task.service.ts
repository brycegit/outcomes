import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import {Task} from './task';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class TaskService {
  private readHeader = new Headers({'Content-Type': 'application/json'});
  private writeHeader = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});

  private serviceUrl = 'app/service.php';  // URL to web api
  constructor(private http: Http) { }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  getTasks(): Promise<Task[]> {
    return this.http.get(this.serviceUrl + "?content=all")
               .toPromise()
               .then(response => response.json() as Task[])
               .catch(this.handleError);
  }

  getTask(id: number): Promise<Task> {
    return this.getTasks()
               .then(response => response.filter(item => item['id'] == id)[0])
               .catch(this.handleError);
  }

  create(name: string, priority: number): Promise<Task> {
    if(priority){
      var createServiceBody = 'name=' + name + '&priority=' + priority;
    }else
    {
      var createServiceBody = 'name=' + name;
    }
    return this.http
      .post(this.serviceUrl, createServiceBody, {headers: this.writeHeader})
      .toPromise()
      .then(response => {
        return response.json() as Task;
      })
      .catch(this.handleError);
  }

  delete(id: number): Promise<void> {
    return this.http
      .post(this.serviceUrl, 'delete=' + id, {headers: this.writeHeader})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  update(task: Task): (Promise<Task>) {
    let body = 'update=y&id=' + task.id + '&name=' + task.name;
    return this.http
      .post(this.serviceUrl, body, {headers: this.writeHeader})
      .toPromise()
      .then(() => task)
      .catch(this.handleError);
  }
}
