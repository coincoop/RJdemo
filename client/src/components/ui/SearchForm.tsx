'use client'

import React from 'react'
import Form from 'next/form'
import "@/styles/SearchForm.css"
import { useRouter } from 'next/navigation';
const SearchForm = ({ query }: { query?: string }) => {
    const [searchQuery, setSearchQuery] = React.useState(query || '');
    const router = useRouter();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.push(`/products?query=${encodeURIComponent(searchQuery)}`);
        }
    };

    return (
        <section className='search-form-container'>
            <Form onSubmit={handleSubmit} className='search-form' action="/" scroll={false}>
                <input
                    name="query"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className='search-input'
                    placeholder='Search'
                />
                <div className="search-btn">
                    <button type="submit">S</button>
                </div>
            </Form>
        </section>

    )
}

export default SearchForm