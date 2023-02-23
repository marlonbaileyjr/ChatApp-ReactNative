import mongoose from 'mongoose';

const RoomSchema = new mongoose.Schema({
    roomName: {type: String, required: true, unique: true},
    roomPassword: {type: String, required: true},
    users: {type: Array, required: true},
},
    {collection: 'rooms'}
)

const roomModel = mongoose.model('RoomSchema', RoomSchema);

module.exports = roomModel;