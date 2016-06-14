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

    create (item: OrderModel, callback: (error: any, result: any) => void) {
        console.log("default task"+ JSON.stringify(item.defaultTask));
        var defaultTask : TaskModel = <TaskModel>item.defaultTask;
        console.log("new task =>"+JSON.stringify(defaultTask));
        var orderRepository = this._orderRepository;

        this._taskRepository.create(defaultTask, function(err, status){
            if(err){
                callback(err, status);
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

    update (_id: string, item: OrderModel, callback: (error: any, result: any) => void) {

        var orderRepository = this._orderRepository;
        var taskRepository = this._taskRepository;
        this._orderRepository.findById(_id, (err, res) => {
            if(err) {
                callback(err, res);
            }
            else if(res){
                var defaultTask : TaskModel = <TaskModel>item.defaultTask;
                taskRepository.update(item.defaultTask._id, defaultTask, function(err, status){
                   if(err){
                       callback(err, res);
                   }
                    else if(res){
                       item.defaultTask = status._id;
                       orderRepository.update(_id, item, callback);
                   }
                    else{
                       callback(err,"Record not found.");
                   }
                });
            }
            else{
                callback(err, "Record not found.");
            }
        });
    }

    delete (_id: string, callback:(error: any, result: any) => void) {
        this._orderRepository.delete(_id , callback);
    }

    findById (_id: string, callback: (error: any, result: OrderModel) => void) {
        this._orderRepository.findById(_id, callback);
    }

    findAndPopulate(searchField, populateField, callback:(err: any, result: any)=>void){
        this._orderRepository.findAndPopulate(searchField, populateField, function(err, result){
            if(err){
                console.log("error "+JSON.stringify(err));
                callback(err, null);
            }
            else if(result){
                console.log("result "+JSON.stringify(result));
                callback(null, result);
            }
            else{
                callback(null, "Record not found.");
            }
        });
    }

    findOneAndUpdate(query, newData, options, callback:(error: any, result: any) => void){
        this._orderRepository.findOneAndUpdate(query, newData, options, callback);
    }
}


Object.seal(OrderBusiness);
export = OrderBusiness;