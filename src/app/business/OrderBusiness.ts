/**
 * Created by waqar on 23/3/16.
 */
/// <reference path="../../../typings/tsd.d.ts" />
import OrderRepository = require("./../repository/OrderRepository");
import IOrderBusiness = require("./interfaces/OrderBusiness");
import IOrderModel = require("./../model/interfaces/OrderModel");
import OrderModel = require("./../model/OrderModel");

import TaskRepository = require("./../repository/TaskRepository");
import ITaskBusiness = require("./interfaces/TaskBusiness");
import ITaskModel = require("./../model/interfaces/Task");
import TaskModel = require("./../model/TaskModel");
import ITask = require("../model/interfaces/Task");


/*import ITask = require("../model/interfaces/Task");*/


class OrderBusiness  implements IOrderBusiness {
    private _orderRepository: OrderRepository;
    private _taskRepository: TaskRepository;


    constructor () {
        this._orderRepository = new OrderRepository();
        this._taskRepository = new TaskRepository();
    }

    create (item: IOrderModel, callback: (error: any, result: any) => void) {
        /*console.log(item);*/
       /* var task :ITaskModel={
            assignedOn : item.defaultTask.assignedOn,
            assignedTo : item.defaultTask.assignedTo,
            completeBy : item.defaultTask.completeBy,
            priority : item.defaultTask.priority,
            status : item.defaultTask.status
        };*/
        console.log("default task"+ JSON.stringify(item.defaultTask));
        var defaultTask : ITaskModel = new TaskModel();
        defaultTask.assignedOn = item.defaultTask.assignedOn;
        defaultTask.assignedTo = item.defaultTask.assignedTo._id;
        defaultTask.completeBy = item.defaultTask.completeBy;
        defaultTask.priority = item.defaultTask.priority;
        defaultTask.status = item.defaultTask.status;
        console.log("default task"+ JSON.stringify(defaultTask));

        console.log("order"+JSON.stringify(this._orderRepository));
        console.log("task"+JSON.stringify(this._taskRepository));
        console.log("repository"+ JSON.stringify(this._taskRepository));
       // this._orderRepository.create(item, callback);
        var orderRepository = this._orderRepository;

        this._taskRepository.create(defaultTask, function(err, status){
            if(err){

            }
            else{
                item.defaultTask = status._id;
                orderRepository.create(item, callback);
            }
        });
    }

    retrieve (field, callback: (error: any, result: any) => void) {
        this._orderRepository.retrieve(field, callback);
    }

    update (_id: string, item: IOrderModel, callback: (error: any, result: any) => void) {

        var orderRepository = this._orderRepository;
        var taskRepository = this._taskRepository;
        this._orderRepository.findById(_id, (err, res) => {
            if(err) {
                callback(err, res);
            }
            else{
                /*this._orderRepository.update(res._id, item, callback);*/
                var defaultTask : ITask = new TaskModel();
                defaultTask.assignedOn = new Date(item.defaultTask.assignedOn);
                defaultTask.assignedTo = item.defaultTask.assignedTo;
                defaultTask.completeBy = new Date(item.defaultTask.completeBy);
                defaultTask.priority = item.defaultTask.priority;
                defaultTask.status = item.defaultTask.status;
                taskRepository.update(item.defaultTask._id, defaultTask, function(err, status){
                   if(err){

                   }
                    else{
                       item.defaultTask = status._id;
                       orderRepository.update(_id, item, callback);
                   }
                });
            }
        });
    }

    delete (_id: string, callback:(error: any, result: any) => void) {
        this._orderRepository.delete(_id , callback);
    }

    findById (_id: string, callback: (error: any, result: IOrderModel) => void) {
        this._orderRepository.findById(_id, callback);
    }

    findAndPopulate(searchField, populateField, callback:(err: any, result: any)=>void){
        this._orderRepository.findAndPopulate(searchField, populateField, function(err, result){
            if(err){
                console.log("error "+JSON.stringify(err));
                callback(err, null);
            }
            else{
                console.log("result "+JSON.stringify(result));
                callback(null, result);
            }
        });
    }

    findOneAndUpdate(query, newData, options, callback:(error: any, result: any) => void){
        this._orderRepository.findOneAndUpdate(query, newData, options, callback);
    }
}


Object.seal(OrderBusiness);
export = OrderBusiness;