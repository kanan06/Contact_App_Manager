const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");
// desc Get all contacts
// route GET /api/contacts
// access public

const getContact = asyncHandler(async (req, res) => {
    const contacts = await Contact.find();
    res.status(200).json(contacts);
});

// desc Create new contact
// route POST /api/contacts
// access public

const createContact =asyncHandler(async (req, res) => {
    console.log("The req body is :" , req.body);
    const {name, email,phone} = req.body;
    if(!name || !email || !phone) {
        res.status(400);
        throw new Error("Please add all fields");
    }

    const contact = await Contact.create({
        name,
        email,
        phone,
    });
    res.status(201).json(contact);
});

// desc Get  contact By Id
// route GET /api/contacts/:id
// access public

const getContactById = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found ");
    }
    res.status(200).json(contact);
});

// desc Update contact By Id
// route PUT /api/contacts/:id
// access public

const UpdateContactById = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found ");
    }
    const UpdateContact = await Contact.findByIdAndUpdate(
        req.params.id,
    req.body,
{new:true}
);

    res.status(200).json(UpdateContact);
});

// desc Delete contact by id
// route DELETE /api/contacts/:id
// access public

const DeleteContactById = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found ");
    }
    const deletecontact = await Contact.remove(req.params.id);
    res.status(200).json(deletecontact);
});

module.exports = {
    getContact,
    createContact,
    getContactById,
    UpdateContactById,
    DeleteContactById,
};
