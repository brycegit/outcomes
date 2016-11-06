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
var http_1 = require("@angular/http");
require("rxjs/add/operator/toPromise");
var TaskService = (function () {
    function TaskService(http) {
        this.http = http;
        this.readHeader = new http_1.Headers({ 'Content-Type': 'application/json' });
        this.writeHeader = new http_1.Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        this.serviceUrl = 'app/service.php'; // URL to web api
    }
    TaskService.prototype.handleError = function (error) {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    };
    TaskService.prototype.getTasks = function () {
        return this.http.get(this.serviceUrl + "?content=all")
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    TaskService.prototype.getTask = function (id) {
        return this.getTasks()
            .then(function (response) { return response.filter(function (item) { return item['id'] == id; })[0]; })
            .catch(this.handleError);
    };
    TaskService.prototype.create = function (name, priority) {
        if (priority) {
            var createServiceBody = 'name=' + name + '&priority=' + priority;
        }
        else {
            var createServiceBody = 'name=' + name;
        }
        return this.http
            .post(this.serviceUrl, createServiceBody, { headers: this.writeHeader })
            .toPromise()
            .then(function (response) {
            return response.json();
        })
            .catch(this.handleError);
    };
    TaskService.prototype.delete = function (id) {
        return this.http
            .post(this.serviceUrl, 'delete=' + id, { headers: this.writeHeader })
            .toPromise()
            .then(function () { return null; })
            .catch(this.handleError);
    };
    TaskService.prototype.update = function (task) {
        var body = 'update=y&id=' + task.id + '&name=' + task.name;
        return this.http
            .post(this.serviceUrl, body, { headers: this.writeHeader })
            .toPromise()
            .then(function () { return task; })
            .catch(this.handleError);
    };
    return TaskService;
}());
TaskService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], TaskService);
exports.TaskService = TaskService;
//# sourceMappingURL=task.service.js.map