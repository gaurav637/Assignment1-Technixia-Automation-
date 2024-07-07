
export const logoutUser = async (req,res)=> {
    res.clearCookie('token').redirect('/');
}