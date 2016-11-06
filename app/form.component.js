"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var task_service_1 = require("./task.service");
var task_1 = require("./task");
var FormComponent = (function () {
    function FormComponent(taskService) {
        this.taskService = taskService;
        this.priority = [1, 2, 3, 4];
        this.active = true;
        this.submitted = false;
        this.updating = false;
        this.model = new task_1.Task(null, '', 1);
    }
    FormComponent.prototype.getTasks = function () {
        var _this = this;
        this.taskService.getTasks().then(function (tasks) { return _this.tasks = tasks; });
    };
    FormComponent.prototype.ngOnInit = function () {
        this.getTasks();
    };
    FormComponent.prototype.add = function (name, priority) {
        var _this = this;
        name = name.trim();
        if (!name) {
            return;
        }
        this.active = false;
        this.submitted = true;
        this.model.name = name;
        setTimeout(function () { return _this.active = true; }, 0);
        setTimeout(function () {
            _this.submitted = false;
        }, 8000);
        this.taskService.create(name, priority)
            .then(function (task) {
            _this.tasks.push(task);
        });
    };
    FormComponent.prototype.save = function () {
        var _this = this;
        this.taskService.update(this.model)
            .then(function () {
            _this.submitted = true;
            _this.getTasks();
            _this.updating = false;
            _this.active = false;
            setTimeout(function () { return _this.active = true; }, 0);
            setTimeout(function () {
                _this.submitted = false;
            }, 8000);
        });
    };
    return FormComponent;
}());
FormComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'task-form',
        templateUrl: 'form.component.html'
    }),
    __metadata("design:paramtypes", [task_service_1.TaskService])
], FormComponent);
exports.FormComponent = FormComponent;
//# sourceMappingURL=form.component.js.map