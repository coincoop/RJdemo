import React from 'react'
import Form from 'next/form'
import "@/styles/SearchForm.css"
const SearchForm = ({ query }: { query?: string }) => {
    return (
        <div className='search-form-container'>
            <Form className='search-form' action="/" scroll={false}>
                <input name="query" defaultValue={query} className='search-input' placeholder='Search' />
                <div className="search-btn">
                    <button type="submit">S</button>
                </div>
            </Form>
        </div>

    )
}

export default SearchForm