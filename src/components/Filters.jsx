import React, { useState } from 'react';

const FILTER_OPTIONS = [
    { id: 'original', label: 'Only original posts' },
    { id: 'reshared', label: 'Only reshared posts' },
    { id: 'video', label: 'Posts with video' },
];

export default function Filters({ onSearch, onFilterChange }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedFilters, setSelectedFilters] = useState([]);

    const handleSearch = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        onSearch(value);
    };

    const handleCheckboxChange = (e) => {
        const { value, checked } = e.target;
        let updatedFilters = [...selectedFilters];

        if (checked) {
            updatedFilters.push(value);
        } else {
            updatedFilters = updatedFilters.filter((f) => f !== value);
        }

        setSelectedFilters(updatedFilters);
        onFilterChange(updatedFilters);
    };

    return (
        <div className="topbar">
            <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={handleSearch}
                className="search-input"
            />

            <div className="filter-options">
                {FILTER_OPTIONS.map((option) => (
                    <label key={option.id} className="checkbox-label">
                        <input
                            type="checkbox"
                            value={option.id}
                            checked={selectedFilters.includes(option.id)}
                            onChange={handleCheckboxChange}
                        />
                        {option.label}
                    </label>
                ))}
            </div>
        </div>
    );
};
