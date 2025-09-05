import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,

      trim: true,
      lowercase: true,
    },
    profilePic: {
      type: String,
    },
    mobileNumber: {
      type: String,

      trim: true,
    },
    address: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Address",
    }],
    name: {
      first: String,
      middle: String,
      last: String,
    },
    profile: {
      profileType: {
        type: String,
        enum: ['User', 'Admin', 'SuperAdmin'],
        required: true,
      },
    },
    business: {
      active: {
        type: Boolean,
        default: false,
      },
      businessProfiles: [{
        business: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "BusinessProfile",
        },
      }],
      offers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Offer",
      }],
    },
    savedOffers: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Offer",
    }],
    status: {
      type: String,
      enum: ['pending', 'accepted'],
      default: 'pending',
    },
    deviceToken: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// Create partial indexes to ensure uniqueness for non-null and non-empty values
// userSchema.index({ email: 1 }, { unique: true, partialFilterExpression: { email: { $ne: null, $ne: "" } } });
// userSchema.index({ mobileNumber: 1 }, { unique: true, partialFilterExpression: { mobileNumber: { $ne: null, $ne: "" } } });

// Update the `updatedAt` field before saving
userSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

const User = mongoose.model("User", userSchema);

export default User;
