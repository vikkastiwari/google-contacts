import { Schema, Types, model } from "mongoose";
import { getRandomColorCode } from "../utils";

const ContactSchema = new Schema(
  {
    firstName: {
      type: String,
      required: [true, "Please add first name"],
    },
    lastName: {
      type: String,
      default: null,
    },
    nickName: {
      type: String,
      default: null,
    },
    email: {
      type: String,
      required: [true, "Please add email"],
    },
    phone: {
      type: String,
      required: [true, "Please add phone number"],
    },
    company: {
      type: String,
      default: null,
    },
    jobTitle: {
      type: String,
      default: null,
    },
    department: {
      type: String,
      default: null,
    },
    addressLine1: {
      type: String,
      default: null,
    },
    addressLine2: {
      type: String,
      default: null,
    },
    state: {
      type: String,
      default: null,
    },
    country: {
      type: String,
      default: null,
    },
    city: {
      type: String,
      default: null,
    },
    pincode: {
      type: String,
      default: null,
    },
    birthday: {
      type: Date,
      default: null,
    },
    event: {
      type: String,
      default: null,
    },
    website: {
      type: String,
      default: null,
    },
    relatedPeople: {
      type: String,
      default: null,
    },
    chat: {
      type: String,
      default: null,
    },
    notes: {
      type: String,
      default: null,
    },
    colorCode: {
      type: String,
      default: getRandomColorCode,
    },
    isFavourite: {
      type: Boolean,
      default: false,
    },
    inTrash: {
      type: Boolean,
      default: false,
    },
    createdBy: {
      type: Types.ObjectId,
      ref: "User",
      index: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    virtuals: {
      name: {
        get() {
          return `${this.firstName} ${this.lastName || ""}`.trim();
        },
      },
    },
  }
);

const Contact = model("Contact", ContactSchema);

export default Contact;
