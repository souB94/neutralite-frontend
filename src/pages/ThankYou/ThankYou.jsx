import CheckIcon from '../../assets/images/check.png';

function ThankYou() {
  return (
    <>
        <div className="main_content_wrapper">
            <div className="thank_you_page_wrapper py-10 px-4 bg-cream-100 h-auto flex items-center justify-center">
                <div className="thank_you_page_content max-w-4xl mx-auto mt-10 text-center bg-cream-200 py-10 px-15">
                    <div className="icon_wrapper max-w-[100px] mx-auto mb-6">
                        <img className='w-full' src={CheckIcon} alt="Check Icon" />
                    </div>
                    <h1 className='text-[35px] font-medium mb-1'>Thank You for Your Order!</h1>
                    <p className='text-[15px] text-gray mb-1'>Your order has been successfully placed. We appreciate your business!</p>
                    <p className='text-[15px] text-gray'>We will send you an email confirmation shortly.</p>
                </div>
            </div>
        </div>
    </>
    
  );
}

export default ThankYou;