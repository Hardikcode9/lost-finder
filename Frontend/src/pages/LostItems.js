import React, { useState } from "react";
import SearchBar from "../components/SearchBar";
import ItemCard from "../components/ItemCard";
import "../styles/LostItems.css";

function LostItems() {
  const [searchTerm, setSearchTerm] = useState("");

  const lostItems = [
    {
      id: 1,
      title: "Blue Backpack",
      category: "Bag",
      location: "Central Library",
      date: "19 July 2026",
      status: "Lost",
      image: "https://via.placeholder.com/300x220?text=Backpack",
    },
    {
      id: 2,
      title: "HP Laptop",
      category: "Laptop",
      location: "Computer Lab",
      date: "18 July 2026",
      status: "Lost",
      image: "https://via.placeholder.com/300x220?text=Laptop",
    },
    {
      id: 3,
      title: "House Keys",
      category: "Keys",
      location: "Parking Area",
      date: "17 July 2026",
      status: "Lost",
      image: "https://via.placeholder.com/300x220?text=Keys",
    },
    {
      id: 4,
      title: "Black Wallet",
      category: "Wallet",
      location: "Canteen",
      date: "16 July 2026",
      status: "Lost",
      image: "https://via.placeholder.com/300x220?text=Wallet",
    },
  ];

  const filteredItems = lostItems.filter(
    (item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="lost-page">
      <h1>Lost Items</h1>

      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      <div className="lost-grid">
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))
        ) : (
          <h3>No Lost Items Found</h3>
        )}
      </div>
    </div>
  );
}

export default LostItems;