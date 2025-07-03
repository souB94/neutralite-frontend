function UserAccountControl() {

    function showUserControl() {
        const userControl = document.querySelector('.user_account_control');
        userControl.classList.toggle('showUserControl');
    }

    return (
        <>
            <i className="fi fi-rr-circle-user cursor-pointer" onClick={showUserControl}></i>
            <div className="user_account_control absolute showUserControl flex items-center gap-4">
                <ul className="flex items-center flex-col justify-start border-1  border-gray-300 w-[100px] bg-cream-100">
                    <li className="log_in  w-full">
                        <a href="/signin" className="py-2 px-3 text-[14px] block  w-full text-gray-600 transition-colors duration-300 hover:text-white"><span className="fi fi-rr-user mr-2"></span>Log In</a>
                    </li>
                    <li className="sign_up  w-full">
                        <a href="/signup" className="py-2 px-3 text-[14px] block w-full text-gray-600 transition-colors duration-300 hover:text-white"><span className="fi fi-rr-user-add mr-2"></span>Sign Up</a>
                    </li>
                </ul>
            </div>
        </>
    );
}
export default UserAccountControl;