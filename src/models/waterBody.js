import mongoose from "mongoose";

const waterBodySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  location: {
    type: {
      lat: {
        type: Number,
        required: true
      },
      lng: {
        type: Number,
        required: true
      }
    },
    required: true
  },
  size: {
    type: Number, // Size of the water body (e.g., in square meters or acres)
    required: true
  },
  condition: {
    type: String,
    enum: ['Good', 'Moderate', 'Poor', 'Critical'],
    required: true
  },
  pollutionLevel: {
    type: String,
    enum: ['Low', 'Moderate', 'High', 'Severe'],
    required: true
  },
  status: {
    type: String,
    enum: ['Natural', 'Artificial', 'Dried Up', 'Under Treatment'],
    required: true
  },
  addedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Link to the user who added this data
    required: true
  },
  // Optional IoT data, initially could be null
  sensorData: {
    temperature: {
      type: Number, // In degrees Celsius
      default: null
    },
    pHLevel: {
      type: Number, // pH value
      default: null
    },
    dissolvedOxygen: {
      type: Number, // In mg/L
      default: null
    }
  },
  description: {
    type: String, // Any additional details
    default: ''
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

waterBodySchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

const WaterBody = mongoose.model('WaterBody', waterBodySchema);

export default WaterBody;
