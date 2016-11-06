import {Component, OnInit} from '@angular/core';
import {TaskService} from './task.service';
import {Task} from './task';

@Component({
  moduleId: module.id,
  selector: 'task-form',
  templateUrl: 'form.component.html'
})

export class FormComponent implements OnInit {

  priority = [1,2,3,4];

  constructor(private taskService: TaskService){}

  tasks: Task[];

  active = true;

  submitted = false;

  updating = false;

  model = new Task(null, '', 1);

  getTasks(): void{
    this.taskService.getTasks().then(tasks => this.tasks = tasks);
  }

  ngOnInit(): void{
    this.getTasks();
  }

  add(name: string, priority: number): void {
    name = name.trim();
    if (!name) { return; }
    this.active = false;
    this.submitted = true;
    this.model.name = name;
    setTimeout(() => this.active = true, 0);
    setTimeout(() => {
      this.submitted = false;
    }, 8000);
    this.taskService.create(name, priority)
      .then(task => {
        this.tasks.push(task);
      });
  }

  save(): void {
    this.taskService.update(this.model)
      .then(() => {
        this.submitted = true;
        this.getTasks();
        this.updating = false;
        this.active = false;
        setTimeout(() => this.active = true, 0);
        setTimeout(() => {
          this.submitted = false;
        }, 8000);
      });
  }
}
