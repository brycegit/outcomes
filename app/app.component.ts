import { Component } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'app',
  template: `
    <h1>{{title}}</h1>
    <task-form></task-form>
  `
})
export class AppComponent {
  title = 'outcomes';
}
