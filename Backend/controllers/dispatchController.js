import dispatchModal from "../models/dispatchModal.js";

export const createdispatchRegister = async (req, res, next) => {
  const newdispatchRegister = new dispatchModal({
    number: req.body.number,
    designation: req.body.designation,
    place: req.body.place,
    subject: req.body.subject,
    file_upload: req.body.file_upload,
    dateAndTime: req.body.dateAndTime,
  });

  try {
    
    if (req.file) {
      const fileUrl = `${process.env.BACK_END}/uploads/${req.file.filename}`;
      newdispatchRegister.file_upload = fileUrl;
      
    }
    const savedispatchRegister = await newdispatchRegister.save();
    res.status(201).json(savedispatchRegister);
  } catch (error) {
    next(error);
  }
};


// update dispatchRegister
export const updatedispatchRegister = async (req, res, next) => {
  try {
    const updatedispatchRegister = await dispatchModal.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedispatchRegister);
  } catch (error) {
    next(error);
  }
};

// delete dispatchRegister
export const deletedispatchRegister = async (req, res, next) => {
  try {
    await dispatchModal.findByIdAndDelete(req.params.id);
    res.status(200).send("Post deleted");
  } catch (error) {
    next(error);
  }
};

// get single dispatchRegister
export const onedispatchRegister = async (req, res, next) => {
  try {
    const onedispatchRegister = await dispatchModal.findById(req.params.id);
    res.status(200).json(onedispatchRegister);
  } catch (error) {
    next(error);
  }
};

// get all dispatchRegisters
export const dispatchRegisters = async (req, res, next) => {
  try {
    const alldispatchRegister = await dispatchModal.find();
    res.status(200).json(alldispatchRegister);
  } catch (error) {
    next(error);
  }
};
