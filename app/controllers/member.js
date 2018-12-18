import mongoose from 'mongoose'; 
import Member from '../models/memberModel.js';
mongoose.set('useFindAndModify', false);


exports.create = async(req, res) => {
    await Member.create(req.body,  (err, member)=> {
        if (err) {
            return res.status(500).end();
        }
        else {
            return res.json(member);
        }
    });
};

exports.retieveAll = async (req, res) => {
    await Member.find({}, (err, members) => {
        if (err) {
            return res.status(500).end();
        } else {
            return res.json(members);            
        }
    });
};

exports.retrieve = async (req, res) => {
    await Member.findById(req.params.id, (err, member) => {
        if (err) {
            return res.status(500).end();
        }
        else if (!member) {
            return res.status(404).end();
        }
        else {
            return res.json(member);
        }
    });
};

exports.update = async (req, res) => {
    await Member.findOneAndUpdate({ "_id": req.params.id }, req.body, { new: true },  (err, member)=> {
        if (err) {
            return res.status(500).end();
        }
        else if (!member) {
            return res.status(404).end();
        }
        else {
            return res.json(member);
        }
    });
};

exports.delete = async (req, res) => {
    await Member.findOneAndDelete(req.params.id,  (err, member)=> {
        if (err) {
            return res.status(500).end();
        }
        else if (!member) {
            return res.status(404).end();
        }
        else {
            return res.json({ "message": "Member deleted successfully!" });
        }
    });
};