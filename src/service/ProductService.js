const httpStatus = require('http-status');
const { Op } = require('sequelize');
const ProductDao = require('../dao/ProductDao');
const FavouriteDao = require('../dao/FavouriteDao');
const { tokenTypes } = require('../config/tokens');
const responseHandler = require('../helper/responseHandler');
const logger = require('../config/logger');
const { userConstant } = require('../config/constant');
const transFormDataHelper = require('../helper/transFormDataHelper');

class ProductService {
    constructor() {
        this.ProductDao = new ProductDao();                  
        this.favouriteDao = new FavouriteDao();                  
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
            productData = productData.toJSON(); 
            delete productData.shop_brand_id;
            delete productData.sku;
            delete productData.barcode;
            delete productData.security_stock;
            delete productData.featured;           
            delete productData.is_visible;           
            delete productData.backorder;           
            delete productData.published_at;           
            delete productData.seo_title;           
            delete productData.seo_description;           
            delete productData.createdAt;           
            delete productData.updatedAt;                                 
                                                              
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

            return responseHandler.returnSuccess(httpStatus.OK, message, products);
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
            
            let transformData = transFormDataHelper.TransformData(favouriteProducts);

            return responseHandler.returnSuccess(httpStatus.OK, message, transformData);
        }
        catch (e) {
            console.log(e);
            logger.error(e);
            return responseHandler.returnError(httpStatus.BAD_REQUEST, 'Something went wrong!');
        }
        
    };

}

module.exports = ProductService;
