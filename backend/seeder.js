const dotenv = require("dotenv");
const connectDatabase = require("./db/Database");
const cloudinary = require("cloudinary");

dotenv.config({
  path: "./config/.env",
});

connectDatabase();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const Product = require("./model/product");
const { faker } = require("@faker-js/faker");
const Shop = require("./model/shop");

async function main() {
  const env = process.env.NODE_ENV;

  console.log(env);

  const shop = await Shop.findById("66042c338dc72e80a9ecb350").lean();

  if (!shop) throw new Error("Something went wrong while finding the shop");

  console.log("🚀 ~ Async Main ~ Shop: ", shop);

  if (env != "production") {
    try {
      for (let i = 0; i < 10; i++) {
        // const image = faker.image.avatar();

        // const images = []

        // let response = await cloudinary.v2.uploader.upload(image, { folder: 'products' });

        // if (!response) throw new Error('Cloudinary issue');

        // images.push({ public_id: response?.public_id, url: response?.secure_url });

        let p = await Product.create({
          name: `${faker.commerce.productAdjective()} ${faker.commerce.product()}`,
          description: `${faker.commerce.productDescription()}`,
          originalPrice: `${faker.commerce.price()}`,
          discountPrice: `${faker.commerce.price()}`,
          tags: `${faker.commerce.productAdjective()},${faker.commerce.productAdjective()}`,
          category: `Computers and Laptops`,
          shopId: `66042c338dc72e80a9ecb350`,
          shop: shop,
          // images: images,
          stock: faker.number.int(),
        });
      }
    } catch (err) {
      console.log("🚀 ~ main ~ err:", err);
    }
  }
}

main();
