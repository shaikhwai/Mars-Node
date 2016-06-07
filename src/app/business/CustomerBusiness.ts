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
    create (item: CustomerModel, callback: (error: any, result: any) => void) {
        var shippingAddress: Array<AddressModel> =  <Array<AddressModel>>item.shippingAddress;
        var billingAddress: Array<AddressModel> = <Array<AddressModel>>item.billingAddress;

        var customerRepository = this._customerRepository;
        var addressRepository = this._addressRepository;
        this._addressRepository.insertMany(billingAddress,function(err, result){
           if(err){
               console.log("err =>"+JSON.stringify(err));
               callback(err, result);
           }
            else{
               var billingAddressId :Array = new Array();
               result.forEach((address)=>{
                   billingAddressId.push(address._id);
               });

               addressRepository.insertMany(shippingAddress, function(err, result){
                   if(err){
                       console.log("err =>"+JSON.stringify(err));
                       callback(err, result);
                   }
                   else{
                       var shippingAddressId :Array = new Array();
                       result.forEach((address)=>{
                           shippingAddressId.push(address._id);
                       });
                        item.shippingAddress = shippingAddressId;
                       item.billingAddress = billingAddressId;
                       customerRepository.create(item, callback);
                   }
               });

               /*console.log("done result =>"+JSON.stringify(billiingAddressId));
               callback(err, result);*/
           }
        });
        /*this._addressRepository.create(billingAddress, function(err, status){
            if(err){
                console.log("error in billingAddress:" + JSON.stringify(err));
                callback(err, status);
            }
            else{
                item.billingAddress = status._id;
                /!*console.log(item);*!/
            }
        });

        this._addressRepository.create(shippingAddress, function(err, status){
            if(err){
                console.log("error in shippingAddress:" + JSON.stringify(err));
                callback(err, status);
            }
            else{
                item.shippingAddress = status._id;
                /!*console.log(item);*!/
                customerRepository.create(item, callback);
            }
        });*/
    }

    retrieve (field, callback: (error: any, result: any) => void) {
        this._customerRepository.retrieve(field, callback);
    }

    update (_id: string, item: CustomerModel, callback: (error: any, result: any) => void) {
        var billingAddress: AddressModel =  <AddressModel>item.billingAddress;
        var shippingAddress: AddressModel =  <AddressModel>item.shippingAddress;
        var customerRepository = this._customerRepository;
        var addressRepository = this._addressRepository;

        delete billingAddress._id;
        addressRepository.create(billingAddress, function(err, status){
            if(err){
                console.log("error in billingAddress:" + JSON.stringify(err));
                callback(err, status);
            }
            else{
                item.billingAddress = status._id;
                delete shippingAddress._id;
                addressRepository.create(shippingAddress, function(err, status){
                    if(err){
                        console.log("error in billingAddress:" + JSON.stringify(err));
                        callback(err, status);
                    }
                    else{
                        item.shippingAddress = status._id;
                        /*console.log(item);*/
                        customerRepository.findOneAndUpdate({_id:_id},item,{},callback);
                    }
                });

            }
        });



    }

    delete (_id: string, callback:(error: any, result: any) => void) {
        this._customerRepository.delete(_id , callback);
    }

    findById (_id: string, callback: (error: any, result: CustomerModel) => void) {
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