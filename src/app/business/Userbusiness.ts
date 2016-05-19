/**
 * Created by waqar on 3/5/16.
 */
import UserRepository = require("./../repository/UserRepository");
import TaskRepository = require("./../repository/TaskRepository");
import OrderRepository = require("./../repository/OrderRepository");
import IUserModel = require("./../model/interfaces/UserModel");
import ITaskModel = require("./../model/interfaces/Task");
import IOrderModel = require("./../model/interfaces/OrderModel");
import UserModel = require("./../model/UserModel");
import IUserBusiness = require("./interfaces/UserBusiness");


class Userbusiness  implements IUserBusiness {
    private _userRepository: UserRepository;
    private _taskRepository: TaskRepository;
    private _orderRepository: OrderRepository;

    constructor () {
        this._userRepository = new UserRepository();
        this._taskRepository = new TaskRepository();
        this._orderRepository = new OrderRepository();
    }

    create (item: IUserModel, callback: (error: any, result: any) => IUserModel) {
        this._userRepository.create(item, callback);
    }

    retrieve (field, callback: (error: any, result: any) => void) {
        this._userRepository.retrieve(field, callback);
    }

    update (_id: string, item: IUserModel, callback: (error: any, result: any) => void) {

        this._userRepository.findById(_id, (err, res) => {
            if(err) callback(err, res);

            else
                this._userRepository.update(res._id, item, callback);

        });
    }

    delete (_id: string, callback:(error: any, result: any) => void) {
        this._userRepository.delete(_id , callback);
    }

    findById (_id: string, callback: (error: any, result: IUserModel) => void) {
        this._userRepository.findById(_id, callback);
    }

    findAndPopulate(searchField, populateField, callback:(err: any, result: any)=>void){

    }

    findOneAndUpdate(query, newData, options, callback:(error: any, result: any) => void){
        this._userRepository.findOneAndUpdate(query, newData, options, callback);
    }

    task(_id: string, callback: (error: any, result: ITaskModel) => void){
        var userRepository = this._userRepository;
        this._taskRepository.retrieve({assignedTo:_id}, callback);
    }

    order(_id: string, callback: (error: any, result: ITaskModel) => void){
        var userRepository = this._userRepository;
        console.log("got hit for =>"+_id)
            var params = {defaultTask:{assignedTo: _id}}
        this._orderRepository.findAndPopulate({$match:{assignedTo:_id}},
            {path:'defaultTask ', populate:{path:'items'}, populate:{path:'assignedTo' }}, function(err, result){
                console.log("error =>"+err);
                /*console.log("result=>"+result);*/
                callback(err, result);
            } )

    }

    mail(_id: string, callback: (error: any, result: IUserModel) => void){
        var userRepository = this._userRepository;
        this._taskRepository.retrieve({assignedTo:_id}, callback);
    }

}


Object.seal(Userbusiness);
export = Userbusiness;