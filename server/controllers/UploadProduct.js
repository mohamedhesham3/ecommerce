const cloudinary = require("../configs/cloudinary");
const Prodcut = require("../models/Prodcut");
const User = require("../models/User");

const addProdcut = async (req, res) => {
  const { Title, Price, Description } = req.body;
  const Image = req.file;
  let ProductImage = "";

  try {
    if (Image) {
      const uploadedImage = await cloudinary.uploader.upload(Image.path, {
        public_id: `product_image}`,
        crop: "fill", 
        width: 500,
        height: 500,
      });
      ProductImage = uploadedImage.url;
    }

    const product = await Prodcut.create({
      Title,
      Price,
      Description,
      Image: ProductImage,
    });

    res.status(200).send(product);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Failed to add product" });
  }
};

const getProdcuts = async (req, res) => {
  try {
    const allProjects = await Prodcut.find();
    if (allProjects) {
      res.status(200).send(allProjects);
    } else {
      res.status(404).send({ message: "no prodcuts found!" });
    }
  } catch (error) {
    console.log(error);
  }
};

const saveProduct = async (req, res) => {
  const { ProdcutID } = req.params;
  const { userID } = req.body;
  try {
    const product = await Prodcut.findById(ProdcutID); // Corrected model name
    if (!product) {
      return res.status(404).send({ message: "Product not found" });
    }
    const user = await User.findOneAndUpdate(
      { _id: userID },
      { $addToSet: { List: product } },
      { new: true }
    );
    return res.status(200).send(user);
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Internal server error" });
  }
};

const saveProdcut = (io) => {
  io.on('connection', (socket) => {

    socket.on('addtolist', async (data) => {
      try {
        const product = await Prodcut.findById(data.productID);
        if (!product) {
          socket.emit('error', { message: "Product not found" });
          return;
        }
  
        const user = await User.findOneAndUpdate(
          { _id: data.userID },
          { $addToSet: { List: product } },
          { new: true }
        );
        io.emit('productsaved', user );
        console.log(user);
      } catch (error) {
        console.log(error);
        socket.emit('error', { message: "An error occurred" });
      }
    });
  
    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });
  });
}




const getProductbyID = async (req, res) => {
  const { productID } = req.params;

  try {
    const produdct = await Prodcut.findById(productID);

    if (!produdct) {
      return res.status(404).send({ message: "Product not found" });
    }

    res.status(200).send(produdct);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Server error" });
  }
};


const deletedProdcut = async (req, res) => {
  const { ProdcutID } = req.params;
  const { userID } = req.body;
  try {
    const saveProdcut = await Prodcut.findById(ProdcutID);
    if (!saveProdcut) {
      res.status(404).send({ message: "Prodcut not found" });
    }
    const user = await User.findOneAndUpdate(
      { _id: userID },
      { $pull: { List: saveProdcut } },
    );
    res.status(200).send(user);
  } catch (error) {
    console.log(error);
  }
};






module.exports = { addProdcut, getProdcuts, saveProduct,deletedProdcut,getProductbyID ,saveProdcut};
