const { Router } = require("express");
const {
  register,
  findUserByID,
  login,
  verifyToken,
} = require("../controllers/Auth");
const upload = require("../configs/multer");
const { addProdcut, getProdcuts, saveProduct, deletedProdcut, getProductbyID } = require("../controllers/UploadProduct");
const { payment } = require("../controllers/Payment");

const router = Router();

router.post("/Register", upload.single("Avatar"), register);
router.post("/login", login);

/**FIND USER BY ID */

router.get("/user/:userID",verifyToken, findUserByID);

/**GET ALL PRODCUTS */

router.get("/products", getProdcuts);

/**SELL A PRODCUT*/

router.post("/addnew",upload.single("Image"),verifyToken, addProdcut);


/**ADD A PRODCUT*/

router.post("/addtolist/:ProdcutID",verifyToken, saveProduct);

/**remove A PRODCUT*/

router.post("/removefromlist/:ProdcutID", deletedProdcut);

/**view A PRODCUT*/

router.get("/viewprodcut/:productID", getProductbyID);






/*checkout**/

router.post('/payment',payment)


module.exports = router;
