import { useState } from "react";
import axios from "axios";
import SearchLogo from "../../../src/assets/navlogo/search.png";
import { Link } from "react-router-dom";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasSearched, setHasSearched] = useState(false); // New state to track if search was performed

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setLoading(true);
    setError(null);
    setHasSearched(true); // Set to true when search is performed

    try {
      const response = await axios.get(
        `http://localhost:3000/api/user/${encodeURIComponent(searchQuery)}`,
        {
          withCredentials: true,
        }
      );

      setSearchResults(response.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch search results");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="w-full lg:w-[60%] min-h-screen mx-auto lg:py-10 md:py-6 sm:py-4 py-4 lg:px-14 md:px-12 sm:px-7 px-4">
      {/* Search Header */}
      <div className="w-full mb-8">
        <h1 className="text-white text-2xl font-bold mb-4">Search</h1>
        <form onSubmit={handleSearch} className="w-full relative">
          <input
            type="text"
            value={searchQuery}
            onChange={handleInputChange}
            placeholder="Search users ..."
            className="w-full bg-[#1d1d1d] text-white rounded-lg py-3 px-4 pl-12 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <img
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-6"
            src={SearchLogo}
            alt="Search"
          />
          <button
            type="submit"
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
          >
            {loading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            ) : (
              "Search"
            )}
          </button>
        </form>
      </div>

      {/* Search Results */}
      <div className="w-full">
        {error && (
          <div className="text-red-500 text-center py-4 bg-[#2d2d2d] rounded-lg">
            {error}
          </div>
        )}

        {loading ? (
          <div className="text-white text-center py-8">Searching...</div>
        ) : hasSearched ? (
          searchResults.length > 0 ? (
            <div className="space-y-4">
              {searchResults.map((result) => (
                <div
                  key={result._id || result.id}
                  className="bg-[#1d1d1d] rounded-lg p-4 hover:bg-[#2d2d2d] transition-colors"
                >
                  <Link to={`/profile/${result.username}`}>
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-gray-700 flex-shrink-0">
                        {result.avatar_url && (
                          <img
                            src={result.avatar_url}
                            alt={result.username}
                            className="w-full h-full rounded-full object-cover"
                          />
                        )}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-white font-medium">
                          {result.username || result.title}
                        </h3>
                        <p className="text-gray-400 text-sm mt-1">
                          {result.description || result.content}
                        </p>
                        {result.tags && (
                          <div className="flex gap-2 mt-2">
                            {result.tags.map((tag) => (
                              <span
                                key={tag}
                                className="bg-[#363636] text-gray-300 text-xs px-2 py-1 rounded"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-gray-400 text-center py-8">
              No results found for &quot;{searchQuery}&quot;
            </div>
          )
        ) : (
          <div className="text-gray-400 text-center py-8">
            Try searching for users
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
