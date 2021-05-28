const { Schema, Types } = require("mongoose");
//const dateFormat = require

const ReactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      //default: new ObjectId
    },
    reactionBody: {
      type: String,
      required: "Reaction is required",
      maxLength: 280,
    },
    username: {
      type: String,
      required: "Reaction is required",
      createdAt: {
        type: Date,
        default: Date.now,
        get: (createdAtVal) => dateFormat(createdAtVal),
      },
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) => dateFormat(createdAtVal),
    },
  },
  {
    toJSON: {
      //enable getters
      getters: true,
    },
  }
);

const ThoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: "Thought is required",
      maxLength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      //use getter to format date using the dateFormat() function
      get: (createdAtVal) => dateFormat(createdAtVal),
    },
    username: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
        //string
        //required
      },
    ],
    reactions: [
      {
        type: Schema.Types.ObjectId,
        ref: "Reaction",
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

ThoughtSchema.virtual("reactionCount").get(function () {
  return this.reaction.reduce(
    (total, reaction) => total + reaction.length + 1,
    0
  );
});

const Thought = model("Thought", ThoughtSchema);

module.exports = Thought;
