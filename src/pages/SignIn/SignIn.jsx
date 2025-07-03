
import InnerBanner from '../../components/InnerBanner/InnerBanner';
import Footer from "../../components/Footer/Footer";

function SignIn (){

    return(

        <>
            
            <div className="main_content_wrapper">
                <InnerBanner />
                <div className="create_account_section bg-cream-100 py-10">
                    <div className="container max-w-[1320px] mx-auto px-4">
                        <div className="section_content_wrapper">
                            <div className="account_form_wrapper">
                                <form action="" id="login_account" className="p-6 bg-cream-400 max-w-[600px] mx-auto">
                                    <div className="inner_form_wrapper bg-white pt-10 px-5 pb-5">
                                        <h2 className="form_header text-black text-[35px] font-semibold mb-4 text-center">Login</h2>
                                        <div className="form_group email w-full mt-3">
                                            <input id="email" name="email" type="email" className="form_control py-3 px-5 bg-cream-100 border-1 border-gray-300 w-full" placeholder="Email" />
                                        </div>
                                        <div className="form-group password w-full mt-3">
                                            <input id="password" name="password" type="password" className="form_control py-3 px-5 bg-cream-100 border-1 border-gray-300 w-full" placeholder="Password" />
                                        </div>
                                        <div className="end_note text-gray text-[15px] text-left mt-5"><a href="/resetPassword" className="text-black underline">Forgot Your Password? </a> </div>
                                        <div className="submit_btn_wrapper w-full mt-4">
                                            <button className="flex-1 bg-brown-600 text-white py-3 px-4 cursor-pointer w-full font-urbanist font-bold">
                                                Submit
                                            </button>
                                        </div>
                                        <div className="end_note text-gray text-[15px] text-center mt-5">Don't have account? <a href="/signup" className="text-black underline">Sign Up</a> </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default SignIn;