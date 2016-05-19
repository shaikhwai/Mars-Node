/**
 * Created by chetan on 17/5/16.
 */
import CustomerRepository = require("./../repository/CustomerRepository");
import ICustomerBusiness = require("./interfaces/CustomerBusiness");
import ICustomerModel = require("./../model/interfaces/CustomerModel");
import CustomerModel = require("./../model/CustomerModel");

import TaskRepository = require("./../repository/TaskRepository");
import AddressRepository = require("./../repository/AddressRepository");
import ITaskBusiness = require("./interfaces/TaskBusiness");
import ITaskModel = require("./../model/interfaces/Task");
import TaskModel = require("./../model/TaskModel");
import ITask = require("../model/interfaces/Task");
import IAddress = require("../model/interfaces/Address");
import AddressModel = require("./../model/AddressModel");


class CustomerBusiness  implements ICustomerBusiness {
    private _customerRepository: CustomerRepository;
    private _addressRepository: AddressRepository;

    constructor () {
        this._customerRepository = new CustomerRepository();
        this._addressRepository = new AddressRepository();
    }
    create (item: ICustomerModel, callback: (error: any, result: any) => void) {
        console.log("initial item:" + JSON.stringify(item));

        var billingAddress: IAddress =  new AddressModel();
        var shippingAddress: IAddress =  new AddressModel();

        billingAddress.line1 = item.billingAddress.line1;
        billingAddress.line2 = item.billingAddress.line2;
        billingAddress.city = item.billingAddress.city;
        billingAddress.pinCode = item.billingAddress.pinCode;
        billingAddress.state = item.billingAddress.state;
        billingAddress.country = item.billingAddress.country;

        shippingAddress.line1 = item.shippingAddress.line1;
        shippingAddress.line2 = item.shippingAddress.line2;
        shippingAddress.city = item.shippingAddress.city;
        shippingAddress.pinCode = item.shippingAddress.pinCode;
        shippingAddress.state = item.shippingAddress.state;
        shippingAddress.country = item.shippingAddress.country;

        var customerRepository = this._customerRepository;
        this._addressRepository.create(billingAddress, function(err, status){
            if(err){

            }
            else{
                item.billingAddress = status._id;
                console.log(item);
                /*customerRepository.create(item, callback);*/
            }
        });

        this._addressRepository.create(shippingAddress, function(err, status){
            if(err){

            }
            else{
                item.shippingAddress = status._id;
                console.log(item);
                customerRepository.create(item, callback);
            }
        });
    }

    retrieve (field, callback: (error: any, result: any) => void) {
        this._customerRepository.retrieve(field, callback);
    }

    update (_id: string, item: ICustomerModel, callback: (error: any, result: any) => void) {

        var customerRepository = this._customerRepository;
        var addressRepository = this._addressRepository;
        this._customerRepository.findById(_id, (err, res) => {
            if(err) {
                callback(err, res);
            }
            else{
                /*this._orderRepository.update(res._id, item, callback);*/
                /*                 var defaultTask : ITask = new TaskModel();
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
                 customerRepository.update(_id, item, callback);
                 }
                 });*/

                var billingAddress: IAddress = new IAddress();
                var shippingAddress : IAddress= new IAddress();
            }
        });
    }

    delete (_id: string, callback:(error: any, result: any) => void) {
        this._customerRepository.delete(_id , callback);
    }

    findById (_id: string, callback: (error: any, result: ICustomerModel) => void) {
        this._customerRepository.findById(_id, callback);
    }

    findAndPopulate(searchField, populateField, callback:(err: any, result: any)=>void){
        this._customerRepository.findAndPopulate(searchField, populateField, function(err, result){
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
        this._customerRepository.findOneAndUpdate(query, newData, options, callback);
    }

}


Object.seal(CustomerBusiness);
export = CustomerBusiness;