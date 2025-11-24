interface ISearch {
    searchTerm: string,
    setSearchTerm: React.Dispatch<React.SetStateAction<string>>
}

const Search = ({searchTerm, setSearchTerm}: ISearch) => {
  return (
    <div className="search">
        <div>
            <img src="/search.svg" alt="" />
            <input className="" 
                type="text" 
                placeholder="Search for a movie..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
        </div>
    </div>
  )
}

export default Search
