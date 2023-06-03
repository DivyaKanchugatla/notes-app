import React from 'react'

const SearchInput = (props) => {
  return (
    <div>
        <div className="search-container mt-2">
            <input type="text" placeholder="Search by title" value={props.searchQuery} onChange={props.handleSearch} />
        </div>
    </div>
  )
}

export default SearchInput