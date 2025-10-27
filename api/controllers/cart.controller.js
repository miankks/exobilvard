import userModel from '../models/user.model.js';

const addToCart = async (req, res) => {
    try {
        const { userId, itemId } = req.body;
        // this middleware will convert the token into userid
        // let userData= await userModel.findOne({_id: userId});
        let userData= await userModel.findById(userId);
        
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
    try {
        let { userId, itemId } = req.body;
        let userData = await userModel.findById(userId)
        let cartData = await userData.cartData;
        

        // remove the item
        cartData[itemId] > 0 && (cartData[itemId] -= 1);

        // update the cartData now
        await userModel.findByIdAndUpdate(userId, {cartData})

        res.json({success: true, message: "Removed from cart"})

    } catch (error) {
        console.log(error);
        res.json({success: false, message: "Error"})
    }
}

const getCart = async (req, res) => {
    try {
        let {userId, itemId } = req.body;
        let userData = await userModel.findById(userId);
        let cartData = await userData.cartData;
        res.json({success: true, cartData})

    } catch (error) {
        console.log(error);
        res.json({success: false, message: "Error"})
    }
}

export {addToCart, removeFromCart, getCart } 