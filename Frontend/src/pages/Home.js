import React, { useState } from "react";
import Hero from "../components/Hero";
import SearchBar from "../components/SearchBar";
import CategoryFilter from "../components/CategoryFilter";
import ItemCard from "../components/ItemCard";
import Footer from "../components/Footer";
import "../styles/Home.css";

function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Sample Data
  const items = [
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
      title: "Student ID Card",
      category: "ID Card",
      location: "Cafeteria",
      date: "18 July 2026",
      status: "Found",
      image: "https://via.placeholder.com/300x220?text=ID+Card",
    },
    {
      id: 3,
      title: "HP Laptop",
      category: "Laptop",
      location: "Computer Lab",
      date: "17 July 2026",
      status: "Lost",
      image: "https://via.placeholder.com/300x220?text=Laptop",
    },
    {
      id: 4,
      title: "Water Bottle",
      category: "Bottle",
      location: "Sports Ground",
      date: "16 July 2026",
      status: "Found",
      image: "https://via.placeholder.com/300x220?text=Bottle",
    },
    {
      id: 5,
      title: "House Keys",
      category: "Keys",
      location: "Parking Area",
      date: "15 July 2026",
      status: "Lost",
      image: "https://via.placeholder.com/300x220?text=Keys",
    },
    {
      id: 6,
      title: "Black Wallet",
      category: "Wallet",
      location: "Auditorium",
      date: "14 July 2026",
      status: "Found",
      image: "https://via.placeholder.com/300x220?text=Wallet",
    },
  ];

  // Filter by search + category
  const filteredItems = items.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" ||
      item.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <Hero />

      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      <CategoryFilter
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      <section className="items-section">
        <h2>Recently Reported Items</h2>

        <div className="items-grid">
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <ItemCard key={item.id} item={item} />
            ))
          ) : (
            <p className="no-items">
              No items found matching your search.
            </p>
          )}
        </div>
      </section>

      
    </>
  );
}

export default Home;