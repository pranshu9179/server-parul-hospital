import mongoose from "mongoose";

const InquirySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    message: {
      type: String,
      required: true,
    },
    department: {
      type: String,
      enum: ["cardiology", "orthopedics", "pediatrics", ""],
      required: true,
      default: "",
    },
    requestCallback: {
      type: Boolean,
      default: false,
    },
    callbackTime: {
      type: Date,
    },
    status: {
  type: String,
  enum: ["pending", "Contacted", "Visit Scheduled", "Admitted", "Treatment Done", "Discharged"],
  default: "pending",
},



  },
  {
    timestamps: true, // createdAt & updatedAt
  }
);

const Inquiry = mongoose.model("Inquiry", InquirySchema);

export default Inquiry;
