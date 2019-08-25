const mongoose = require('mongoose');
const config = require("../config/config");
const attachmentSchema = require('../schemas/attachments');
const path = require('path');
const fs = require("fs");
const CryptoJS = require("crypto-js");

/* Mongo Connection */

const Schema = mongoose.Schema;
mongoose.connect(config.mongoDb.url, { useNewUrlParser: true, useCreateIndex: true, });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    //   console.log("connected to database");
});
const attachmentModel = mongoose.model('attachments', new Schema(attachmentSchema));


class Attachment {

    async addAttachment(req, res) {


        try {
            const fileUploaded = req.files.file;
            const actualPath = path.join(config.fileUpload.permanentDir, fileUploaded.name);
            await fileUploaded.mv(actualPath);
            let attachmentItem = {
                attachmentType: fileUploaded.mimetype,
                attachmentActualPath: actualPath
            };
            await attachmentModel.create(attachmentItem, function (err, data) {
                //console.log(data);
                if (!err) {
                    res.send({
                        code: 200,
                        link: '/api/attachments?aid=' + data._id
                    });

                } else {
                    res.status(400).send({
                        code: 400,
                        status: err.message
                    });
                }
            });
        } catch (error) {

        }


    }

    async getAttachment(req, res) {
        const attachmentId = req.query.aid;

        await attachmentModel.findOne({ _id: attachmentId, deleted: false }).exec((err, data) => {
            if (!err) {
                res.set('Content-Type', data.attachmentType);
                res.sendFile(data.attachmentActualPath);
            } else {
                res.status(404).send("Not Found");
            }
        })


    }

}

module.exports = new Attachment();