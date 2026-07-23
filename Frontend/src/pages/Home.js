import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Home.css"; 

function Home() {
  const [user, setUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  // The categories you requested
  const categories = [
    "All", "Watch", "Laptop", "Bag", "Books", 
    "ID Cards", "Keys", "Wallet", "Electronics", 
    "Clothes", "Bottle", "Others"
  ];

  // Dummy Data to showcase the layout
  const [recentItems] = useState([
    { id: 1, title: "Apple MacBook Pro", category: "Laptop", location: "Library Floor 2", date: "Oct 24, 2026", image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=400&q=80" },
    { id: 2, title: "Casio Analog Watch", category: "Watch", location: "Cafeteria", date: "Oct 23, 2026", image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=400&q=80" },
    { id: 3, title: "Black Nike Backpack", category: "Bag", location: "Computer Lab 4", date: "Oct 22, 2026", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=400&q=80" },
    { id: 4, title: "Student ID Card", category: "ID Cards", location: "Main Gate", date: "Oct 21, 2026", image: "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?auto=format&fit=crop&w=400&q=80" },
  ]);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  // Filter Logic: Checks both the search bar AND the category pills
  const filteredItems = recentItems.filter(item => {
    const matchesCategory = activeCategory === "All" || item.category === activeCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="home-container">
      
      {/* 1. Hero & Search Section */}
      <div className="home-header">
        <h1 className="page-title">
          {user ? `Welcome back, ${user.name}! 👋` : "Welcome to LostFinder! 👋"}
        </h1>
        <p className="home-subtitle">Find what you lost, return what you found.</p>
        
        <div className="search-bar-container">
          <span className="search-icon">🔍</span>
          <input 
            type="text" 
            className="search-input" 
            placeholder="Search for laptops, keys, library..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="container">
        {/* 2. Browse By Category */}
        <div className="category-section">
          <h2>Browse By Category</h2>
          <div className="category-pills">
            {categories.map(cat => (
              <button 
                key={cat} 
                className={`category-pill ${activeCategory === cat ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* 3. Recent Found Items Grid */}
        <div className="recent-items-section">
          <h2>Recently Found Items</h2>
          
          {filteredItems.length > 0 ? (
            <div className="card-grid">
              {filteredItems.map(item => (
                <div className="common-card item-card" key={item.id}>
                  <div className="card-image-wrapper">
                    <img src={item.image} alt={item.title} />
                    <span className="card-badge">Found</span>
                  </div>
                  <div className="card-content">
                    <h3>{item.title}</h3>
                    <p className="card-location">📍 {item.location}</p>
                    <p className="card-date">📅 {item.date}</p>
                    {/* Using your existing primary-btn class from App.css */}
                    <Link to={`/item/${item.id}`} className="primary-btn view-btn">
                      View Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-message">
              No items found matching your search.
            </div>
          )}
        </div>
      </div>

    </div>
  );
}

export default Home;