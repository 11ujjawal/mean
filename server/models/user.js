import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

UserSchema.statics = {
    get(id) {
        return this.findById(id).execAsync().then((user) => {
            if (user)
                return user;

            console.log('API Error');
        })
    },
    list() {
        return this.find()
            .execAsync();
    }
};

export default mongoose.model('User', UserSchema);
