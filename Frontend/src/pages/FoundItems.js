import React, { useState } from "react";
import SearchBar from "../components/SearchBar";
import ItemCard from "../components/ItemCard";
import "../styles/FoundItems.css";

function FoundItems() {
  const [searchTerm, setSearchTerm] = useState("");

  const foundItems = [
    {
      id: 1,
      title: "Student ID Card",
      category: "ID Card",
      location: "College Library",
      date: "20 July 2026",
      status: "Found",
      image: "https://via.placeholder.com/300x220?text=ID+Card",
    },
    {
      id: 2,
      title: "Black Wallet",
      category: "Wallet",
      location: "College Canteen",
      date: "19 July 2026",
      status: "Found",
      image: "https://via.placeholder.com/300x220?text=Wallet",
    },
    {
      id: 3,
      title: "Water Bottle",
      category: "Bottle",
      location: "Sports Ground",
      date: "18 July 2026",
      status: "Found",
      image: "https://via.placeholder.com/300x220?text=Bottle",
    },
    {
      id: 4,
      title: "Calculator",
      category: "Electronics",
      location: "Classroom A-204",
      date: "17 July 2026",
      status: "Found",
      image: "https://via.placeholder.com/300x220?text=Calculator",
    },
  ];

  const filteredItems = foundItems.filter(
    (item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="found-page">
      <h1>Found Items</h1>

      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      <div className="found-grid">
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))
        ) : (
          <h3>No Found Items Available.</h3>
        )}
      </div>
    </div>
  );
}

export default FoundItems;