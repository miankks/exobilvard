import userModel from '../models/user.model.js';

const addToCart = async (req, res) => {
    try {
        const { userId, itemId } = req.body;
        // this middleware will convert the token into userid
        let userData= await userModel.findOne({_id: userId});
        
        // extract the cartdata
        let cartData = await userData.cartData || {};
        
        !cartData[itemId] ? cartData[itemId] = 1 : cartData[itemId] += 1;
      
        
        //update the user cart with this new cart data
        await userModel.findByIdAndUpdate(userId, {cartData})
        res.json({seccess: true, message: "Added to cart"});

    } catch (error) {
        console.log(error);
        res.json({success: false, message: "Error"})
        
    }
}

const removeFromCart = async (req, res) => {

}

const getCart = async (req, res) => {

}

export {addToCart, removeFromCart, getCart } 