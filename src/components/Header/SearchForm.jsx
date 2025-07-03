function SearchForm() {

    const showNavForm = () => {
        const form = document.getElementById('nav_search_form');
        form.classList.toggle('showForm');
    }

    return (
        <>
            <i className="fi fi-rr-search cursor-pointer" onClick={showNavForm}></i>
            <form action="" id="nav_search_form" className="nav_search_form showForm absolute w-[400px] h-auto bg-white border-1 flex items-center justify-between pr-2 z-3">
                <input id="nav_search" type="text" placeholder="Search..." className="border-0 w-[90%] p-3 h-[50px] text-gray focus:outline-none" />
                <button type="submit" className=" text-black submit_btn text-sm cursor-pointer font-urbanist font-medium">Search</button>
            </form>
        </>
    );
}

export default SearchForm;