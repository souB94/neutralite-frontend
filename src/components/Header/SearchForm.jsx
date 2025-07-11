// SearchForm.jsx
import { useState } from 'react'; // Import useState
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation


function SearchForm() {

    const [searchQuery, setSearchQuery] = useState(''); // State to hold the search input value
    const navigate = useNavigate(); // Initialize useNavigate hook

    const showNavForm = () => {
        const form = document.getElementById('nav_search_form');
        form.classList.toggle('showForm');
    }

    // New function to handle form submission
    const handleSearchSubmit = (e) => {
        e.preventDefault(); // Prevent the default form submission (which would reload the page)
        console.log('Search query:', searchQuery); // Now this should show the typed value!
        // Only navigate if the search query is not empty or just whitespace
        if (searchQuery.trim()) {
            // Navigate to the search results page, passing the query as a URL parameter
            // encodeURIComponent ensures special characters in the query are handled correctly
            navigate(`/search?query=${encodeURIComponent(searchQuery.trim())}`);

            // Optionally, you might want to hide the search form after submission
            // const form = document.getElementById('nav_search_form');
            // if (form.classList.contains('showForm')) {
            //     form.classList.remove('showForm');
            // }
            setSearchQuery(''); // Clear the input field after submission
        }
    };

    return (
        <>
            <i className="fi fi-rr-search cursor-pointer" onClick={showNavForm}></i>
            <form
                id="nav_search_form"
                className="nav_search_form showForm absolute w-[400px] h-auto bg-white border-1 flex items-center justify-between pr-2 z-3"
                // REMOVED value={searchQuery} and onChange={(e) => setSearchQuery(e.target.value)} from here
                onSubmit={handleSearchSubmit} // Keep onSubmit here
            >
                <input
                    id="nav_search"
                    type="text"
                    placeholder="Search..."
                    className="border-0 w-[90%] p-3 h-[50px] text-gray focus:outline-none"
                    value={searchQuery} // <-- MOVED HERE: Binds input value to state
                    onChange={(e) => setSearchQuery(e.target.value)} // <-- MOVED HERE: Updates state on input change
                />
                <button type="submit" className=" text-black submit_btn text-sm cursor-pointer font-urbanist font-medium">Search</button>
            </form>
        </>
    );
}

export default SearchForm;