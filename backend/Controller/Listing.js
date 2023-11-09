import Listing from "../Model/Listing.js";
import cloudinary from "../Cloudinary.js";
import { errorHandler } from "../Utils/Error.js";

// =====================CREATE LISTING==============================
export const CreateListing = async (req, res, next) => {
    if(!req.files){
        res.status(401).json({
            success:false,
            message: "img is required"
        })
    }
  const imageFiles = req.files.img;
  const imageUrls = [];
  const folder = "images";
  for (const file of imageFiles) {
    const result = await cloudinary.uploader.upload(file.tempFilePath, {
      folder,
    });
    imageUrls.push(result.url);
  }
  const {
    name,
    description,
    address,
    regularPrice,
    discountPrice,
    offer,
    bathrooms,
    bedrooms,
    furnished,
    parking,
    type,
    userRef,
  } = req.body;
  console.log("img", imageUrls)
  try {
    const listing = new Listing({
      name,
      description,
      address,
      regularPrice,
      discountPrice,
      offer,
      bathrooms,
      bedrooms,
      furnished,
      parking,
      type,
      userRef,
      images: imageUrls,
    });

    const ListingItem = await listing.save();
    res.status(201).json(ListingItem);
  } catch (error) {
    next(error);
  }
};

// =======================DELETE LISTING===========================
export const DeleteListing = async(req,res, next) => {
const {id} = req.params
const listing = await Listing.findById(id)

if(!listing){
  return next(errorHandler(401, 'Listing not found!'))
}
if(req.user.id !== listing.userRef.toString()){
  return next(errorHandler(401, 'you can delete only your own listing'))
}
try {
  const list = await Listing.findByIdAndDelete(id)
  console.log(list)

  // await cloudinary.uploader.destroy(list.images);
  res.status(200).json('list has been deleted!')
} catch (error) {
  next(error)
}
}

// =====================UPDATE LISTING===================
export const UpdateListing = async (req, res, next) => {
  const { id } = req.params;

  try {
    const listing = await Listing.findById(id);
console.log("ll", listing)
    if (!listing) {
      return next(errorHandler(401, 'Listing not found!'));
    }

    if (req.user.id !== listing.userRef.toString()) {
      return next(errorHandler(401, 'You can only update your own listing'));
    }

    if (req.body.name) {
      listing.name = req.body.name;
    }

    if (req.body.description) {
      listing.description = req.body.description;
    }

    if (req.body.address) {
      listing.address = req.body.address;
    }
    
    if (req.body.type) {
      listing.type = req.body.type;
    }

    if (req.body.bedrooms) {
      listing.bedrooms = req.body.bedrooms;
    }

    if (req.body.bathrooms) {
      listing.bathrooms = req.body.bathrooms;
    }
    if (req.body.regularPrice) {
      listing.regularPrice = req.body.regularPrice;
    }
    
    if (req.body.discountPrice) {
      listing.discountPrice = req.body.discountPrice;
    }
    if (req.body.offer) {
      listing.offer = req.body.offer;
    }
    if (req.body.parking) {
      listing.parking = req.body.parking;
    }
    if (req.body.furnished) {
      listing.furnished = req.body.furnished;
    }

    if (req.body.userRef) {
      listing.userRef = req.body.userRef;
    }
    // Add more fields as needed
    console.log(req.files);
    if (req.files && req.files.img) {
      const imageFiles = req.files.img;
      const folder = "images";
      const imageUrls = [];

      for (const file of imageFiles) {
        const result = await cloudinary.uploader.upload(file.tempFilePath, {
          folder,
        });
        imageUrls.push(result.url);
      }

      listing.images = imageUrls;
    }
else{
 return res.status(200).json({
  success:false,
  message: "No image provided"
 })
}
await listing.save()
    res.status(200).json({
      success: true,
      listing: listing,
      message: 'Listing updated successfully',
    });
  } catch (error) {
    next(error);
  }
};

// =======================GET SINGLE LISTING=============================
export const GetSingleListing = async(req,res,next) => {
const {id} = req.params
try {
  const listing = await Listing.findById(id)
  if(!listing){
    return next(errorHandler(401, 'Listing not found!'))
  }
  res.status(200).json(listing)
} catch (error) {
  next(error)
}
}