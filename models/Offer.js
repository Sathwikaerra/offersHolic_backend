import mongoose from 'mongoose';


// Schema for status history
const statusHistorySchema = new mongoose.Schema(
  {
    status: {
      type: String,
      enum: ['pending review', 'approved', 'active', 'inactive','clarification submitted', 'rejected', 'clarification required', 'expired'],
      required: true,
    },
    changedAt: {
      type: Date,
      default: Date.now,
    },
    clarificationMessageHistory: {
      type: String,
    },
  },
  { _id: false }
);

// Schema for clicks
const clickSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  count: {
    type: Number,
    default: 1,
    required: true,
  },
}, { _id: false });

const offerSchema = new mongoose.Schema({

  title: {
    type: String,
    required: true,
    trim: true,
    validate: {
      validator: value => value.length >= 2,
      message: 'Offer name is required',
    },
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  businessProfile: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'BusinessProfile',
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
  offerType: {
    type: String,
    enum: ['discount', 'buy-one-get-one', 'free-shipping', 'other'],
    required: false,
  },
  offerValue: {
    type: String,
    required: false,
 
  },
  active: {
    type: Boolean,
    default: true,
  },
  offerExpiryDate: {
    type: Date,
    required: true,
  },
  offerUsageLimit: {
    type: String,
  },
  offerDetails: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending review', 'clarification required', 'clarification submitted', 'approved', 'active', 'inactive', 'rejected', 'expired'],
    default: 'pending review',
  },
  clarificationMessage: {
    type: String,
    required: function () {
      return this.status === 'clarification required';
    },
  },
  clarificationAnswer: {
    type: String,
    required: function () {
      return this.status === 'clarification submitted';
    },
  },
  clicks: [clickSchema], // Use the clickSchema as a sub-schema
  views: {
    type: Number,
    default: 0,
  },
  statusHistory: {
    type: [statusHistorySchema],
    default: [{ status: 'pending review' }],
  },
  featuredImage: {
    type: String,
  },
  offerReel: {
    type: String
  },
  gallery: [

    {
      imageUrl: {
        type: String,
        required: true,
      },
    }

  ],
}, {
  timestamps: true,
});

offerSchema.pre('save', function (next) {
  if (this.isModified('status')) {
    this.statusHistory.push({ status: this.status });
  }
  next();
});


offerSchema.pre('save', function (next) {
  const currentDate = new Date();
  if (this.offerExpiryDate && this.offerExpiryDate <= currentDate) {
    this.active = false;
    this.status = 'expired';
  }
  next();
});

offerSchema.pre('save', function (next) {
  if (this.status === 'clarification required') {
    this.statusHistory.push({ status: this.status, clarificationMessageHistory: this.clarificationMessage });
  }
  next();
}
);





const Offer = mongoose.model('Offer', offerSchema);

export default Offer;
