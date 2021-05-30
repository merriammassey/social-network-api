const { Schema, model, Types } = require("mongoose");

//const dateFormat = require

const UserSchema = new Schema(
  {
    username: {
      type: String,
      trim: true,
      required: "Username is required",
      unique: true,
    },
    email: {
      type: String,
      required: "Email is required",
      unique: true,
      match: [/.+\@.+\..+/],
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Thought",
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    //id: false,
  }
);

UserSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});

//create the model to get the prebuilt methods that Mongoose provides
const User = model("User", UserSchema);

module.exports = User;
