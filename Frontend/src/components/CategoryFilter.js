import React from "react";
import "../styles/CategoryFilter.css";


function CategoryFilter({
  selectedCategory,
  setSelectedCategory
}) {


  const categories = [

    "All",

    "Mobile",

    "Laptop",

    "Bag",

    "Books",

    "ID Card",

    "Keys",

    "Wallet",

    "Watch",

    "Electronics",

    "Clothes",

    "Bottle",

    "Others"

  ];



  return (

    <section className="category-container">


      <h2 className="category-title">
        Browse By Category
      </h2>



      <div className="category-list">


        {
          categories.map((category)=>(


            <button

              key={category}

              className={
                selectedCategory === category
                ? "category-btn active"
                : "category-btn"
              }


              onClick={() =>
                setSelectedCategory(category)
              }


            >

              {category}


            </button>


          ))

        }


      </div>


    </section>

  );

}


export default CategoryFilter;