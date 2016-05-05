   /// <reference path="../../../../typings/tsd.d.ts" />

import IRead = require("./../interfaces/base/Read");
import IWrite = require("./../interfaces/base/Write");
import IHeroModel = require("./../../model/interfaces/HeroModel");

import mongoose = require("mongoose");
 
class RepositoryBase<T extends mongoose.Document> implements IRead<T>, IWrite<T> {
    
    private _model: mongoose.Model<mongoose.Document>;
    
    constructor (schemaModel: mongoose.Model<mongoose.Document>) {
        this._model = schemaModel;
    }
    
    create (item: T, callback: (error: any, result: any) => void) {
        this._model.create(item, callback);
        
    }
    
    retrieve (field, callback: (error: any, result: any) => void) {
         this._model.find(field, callback)
    }
    
    update (_id: mongoose.Types.ObjectId, item: T, callback: (error: any, result: any) => void) {
            this._model.update({_id: _id}, item, callback);
            
    }
        
    delete (_id: string, callback:(error: any, result: any) => void) {
        this._model.remove({_id: this.toObjectId(_id)}, (err) => callback(err, null));
       
    } 
    
    findById (_id: string, callback: (error: any, result: T) => void) {
        this._model.findById( _id, callback);
    }
    
    
    private toObjectId (_id: string) : mongoose.Types.ObjectId {
        return mongoose.Types.ObjectId.createFromHexString(_id)
    }

    findAndPopulate(searchField, populateField, callback:(err: any, result: any)=>void){
        this._model.find(searchField).populate(populateField).exec(function(err, items) {
            callback(err, items);
        });
    }

    findOneAndUpdate(query, newData, options, callback:(err: any, result: any)=>void){
        this._model.findOneAndUpdate(query, newData, options, function(err, result){
            callback(err, result);
        });
    }
    
}

export = RepositoryBase;