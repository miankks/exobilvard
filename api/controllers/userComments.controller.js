import userCommentsModel from "../models/userComments.model.js";

export const sendComments = async (req, res) => {
    console.log(req.body);
    
    // try {
    //     const { userId, itemId } = req.body;
    //     // this middleware will convert the token into userid
    //     // let userData= await userModel.findOne({_id: userId});
    //     let userData= await userModel.findById(userId);
        
    //     // extract the cartdata
    //     let cartData = await userData.cartData || {};
        
    //     !cartData[itemId] ? cartData[itemId] = 1 : cartData[itemId] += 1;
      
        
    //     //update the user cart with this new cart data
    //     await userModel.findByIdAndUpdate(userId, {cartData})
    //     res.json({seccess: true, message: "Added to cart"});

    // } catch (error) {
    //     console.log(error);
    //     res.json({success: false, message: "Add to cart Error"})
        
    // }
}
