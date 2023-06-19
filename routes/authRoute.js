const express  = require("express");
const {
    createUser,
    loginUserCtrl,
    getallUser,
    getaUser,
    deleteaUser,
    updateaUser,
    unblockUser,
    blockUser,
    handleRefreshToken,
    logout,
    updatePassword,
    forgotPasswordToken,
    resetPassword,
    loginStartup,
    loginAdmin,
} = require("../controller/userCtrl");
const {
    authMiddleware,
    isAdmin,
} = require("../middlewares/authMiddleware");
const router  = express.Router();
router.post("/register", createUser);
router.post("/forgot-password-token", forgotPasswordToken );
router.put("/reset-password/:token", resetPassword );
router.put('/password',  authMiddleware, updatePassword);
router.post("/login", loginUserCtrl);
router.post("/smooth-login", loginStartup); //before wood login.
router.post("/admin-login", loginAdmin);
router.get('/all-users',getallUser);
router.get('/refresh', handleRefreshToken);
router.get('/logout',logout);
router.get('/:id',authMiddleware, isAdmin, getaUser);


router.delete('/:id',deleteaUser); // J'ai failli oublier une fois le .delete ca m'a coute cher !

router.put('/edit-user', authMiddleware,updateaUser );
router.put('/block-user/:id', authMiddleware,isAdmin,blockUser); //);
router.put('/unblock-user/:id', authMiddleware,isAdmin,unblockUser );


module.exports = router;
