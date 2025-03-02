const httpStatus = require('http-status');
const { Op } = require('sequelize');
const ProductDao = require('../dao/ProductDao');
const FavouriteDao = require('../dao/FavouriteDao');
const MediaDao = require('../dao/MediaDao');
const { tokenTypes } = require('../config/tokens');
const responseHandler = require('../helper/responseHandler');
const logger = require('../config/logger');
const { userConstant } = require('../config/constant');
const transFormDataHelper = require('../helper/transFormDataHelper');

class ProductService {
    constructor() {
        this.ProductDao = new ProductDao();                  
        this.favouriteDao = new FavouriteDao();                  
        this.mediaDao = new MediaDao();                  
    }
    /**
     * Create a user
     * @param {String} email
     * @param {String} password
     * @returns {Promise<{response: {code: *, message: *, status: boolean}, statusCode: *}>}
     */

    fetchProductDetails = async (product) => { 
        try{
            const message = 'Data fetch successfully!';            
           
            let productId = product.product_id;         
            let productData = await this.ProductDao.findById(productId); 
            let imageData = await this.mediaDao.fetchImages(productId, 'App\\Models\\Shop\\Product');            
            productData = productData.toJSON(); 
            const fieldsToRemove = [
                'shop_brand_id', 'sku', 'barcode', 'security_stock', 
                'featured', 'is_visible', 'backorder', 'published_at', 
                'seo_title', 'seo_description', 'createdAt', 'updatedAt'
            ];
            
            fieldsToRemove.forEach(field => delete productData[field]);

            productData.images = imageData;
                                                              
            return responseHandler.returnSuccess(httpStatus.OK, message, productData);
        }
        catch (e) {
            console.log(e);
            logger.error(e);
            return responseHandler.returnError(httpStatus.BAD_REQUEST, 'Something went wrong!');
        }
        
    };

    fetchProducts = async () => { 
        try{
            const message = 'Data fetch successfully!';   
            const whereCondition = {
                type_of_product: 0 ,                
            };

            const attributes = ['id', 'name', 'slug', 'price', 'qty', 'description', 'weight_value'
                , 'weight_unit', 'height_value', 'height_unit', 'width_value', 'width_unit'
                , 'depth_value', 'depth_unit', 'volume_value', 'volume_unit'
            ];

            let products = await this.ProductDao.findByWhere(
                whereCondition,
                attributes                
            ); 
                        
            // for (let product of products) {
            //     let imageData = await this.mediaDao.fetchImages(product.id, 'App\\Models\\Shop\\Product');                
            //     console.log(`Image Data for product ${product.id}:`, JSON.stringify(imageData, null, 2));               
            //     product.images = Array.isArray(imageData) ? imageData : []; 
            // }

            let productWithImages = await Promise.all(products.map(async (product) => {
                let plainProduct = product.toJSON(); // Ensure we can modify it
                let imageData = await this.mediaDao.fetchImages(plainProduct.id, 'App\\Models\\Shop\\Product'); 
                
                console.log(`Image Data for product ${plainProduct.id}:`, JSON.stringify(imageData, null, 2));
                
                plainProduct.images = Array.isArray(imageData) ? imageData : []; 
    
                return plainProduct; // Return updated object
            }));
            
            return responseHandler.returnSuccess(httpStatus.OK, message, productWithImages);
        }
        catch (e) {
            console.log(e);
            logger.error(e);
            return responseHandler.returnError(httpStatus.BAD_REQUEST, 'Something went wrong!');
        }
        
    };

    addToFavourites = async (userId, productBody) => { 
        try{
            let message = 'the product has been successfully added to your favourites!';                    
              
            if ((await this.ProductDao.isProductExists(userId, productBody.product_id))) {
                return responseHandler.returnError(httpStatus.BAD_REQUEST, 'This product is already in your favourites!');
            }
            
            productBody.shop_customer_id = userId;                    
            productBody.shop_product_id = productBody.product_id;                     
            productBody.status = userConstant.STATUS_ACTIVE;                               
            
            let favouriteProductData = await this.favouriteDao.create(productBody); 

             if (!favouriteProductData) {
                message = 'Failed to add! Please Try again.';
                return responseHandler.returnError(httpStatus.BAD_REQUEST, message);
            }   
            
            return responseHandler.returnSuccess(httpStatus.OK, message);
        }
        catch (e) {
            console.log(e);
            logger.error(e);
            return responseHandler.returnError(httpStatus.BAD_REQUEST, 'Something went wrong!');
        }
        
    };

    fetchFavouriteProducts = async (userId) => { 
        try{
            const message = 'Data fetch successfullyasdA!';              
            
            let favouriteProducts = await this.favouriteDao.fetchFavouriteProducts(userId);  

            // if (!Array.isArray(favouriteProducts)) {
            //     favouriteProducts = []; // Default to an empty array to avoid errors
            // }
            
            // let transformData = transFormDataHelper.TransformData(favouriteProducts);

            return responseHandler.returnSuccess(httpStatus.OK, message, favouriteProducts);
        }
        catch (e) {
            console.log(e);
            logger.error(e);
            return responseHandler.returnError(httpStatus.BAD_REQUEST, 'Something went wrong!');
        }
        
    };

}

module.exports = ProductService;
