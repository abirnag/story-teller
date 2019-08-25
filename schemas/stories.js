const Schema = require("mongoose").Schema;
module.exports= {
    title: {type: String, required: true}, 
    story: {type: String , required: true}, 
    attachments: [{ type: Schema.Types.ObjectId, ref:'attachment'}

    ],
    created : {
        createdTime : { type: Date, default: Date.now }, 
        creatorId : {type: Schema.Types.ObjectId, ref : 'users', required : true}

    }, 
    likes : [{
        likedBy : {type: Schema.Types.ObjectId, default : null}, 
        likedBy : {type: Schema.Types.Date, default:  null}
    }]


}; 
