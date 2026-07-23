import React from "react";
import "../styles/SearchBar.css";


function SearchBar({ searchTerm, setSearchTerm }) {


  return (

    <div className="search-container">


      <div className="search-box">


        <span className="search-icon">
          🔍
        </span>



        <input

          type="text"

          placeholder="Search items, categories, locations..."

          value={searchTerm}

          onChange={(e) =>
            setSearchTerm(e.target.value)
          }

        />



        {
          searchTerm && (

            <button

              className="clear-btn"

              onClick={() =>
                setSearchTerm("")
              }

            >
              ✕
            </button>

          )
        }


      </div>


    </div>

  );

}


export default SearchBar;