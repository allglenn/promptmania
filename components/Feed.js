"use client";

import React from 'react';
import { useEffect } from 'react';

const Feed = () => {
    const [search, setSearch] = React.useState('');
    const [prompts, setPrompts] = React.useState([]);

    const handleSearch = (e) => {
        console.log(e.target.value);
        setSearch(e.target.value);
    }

    useEffect(() => {
        fetch("/api/prompt")
            .then((res) => res.json())
            .then((data) => {
                setPrompts(data);
            });
    }, []);

    const handleClick = (prompt) => {
        console.log(prompt);
    }

    return (
        <section className="feed">
            <form className="relative w-full h-12 px-4">
                <input
                    type="text"
                    placeholder="Search for prompts"
                    className="search_input peer"
                    value={search}
                    onChange={handleSearch}
                />
            </form>
            <PromptList
                data={prompts}
                handleClick={handleClick}
            />
        </section>
    );
};

const PromptList = ({ data, handleClick }) => {
    if (!data) {
        return <p>Loading...</p>;
    }
    return (
        <>
            {data.map((prompt) => (
                <PromptCard
                    key={prompt._id}
                    prompt={prompt.prompt}
                    tag={prompt.tag}
                    onClick={() => handleClick(prompt)}
                />
            ))}
        </>
    );
}

const PromptCard = ({ prompt, tag, handleTagClik, handleEdit, handleDelete }) => {
    console.log(prompt, tag);
    return (
        <div
            className='prompt_card'
        >
            <div
                className='flex justify-between items-start gap-5'
            >
                <div className='flex flex-col gap-2'>
                    <Image
                        src={prompt.creator.image}
                        alt='user profile'
                        width={30}
                        height={30}
                        className='cursor-pointer object-contain'
                    />
                    <h1 className='text-xl font-bold cursor-pointer logo_text'>
                        {prompt.creator.name}
                    </h1>
                    <p
                        className='text-gray-500'
                    >
                        {prompt.prompt}
                    </p>
                    <p
                        className='text-gray-500'
                    >
                        {prompt.tag}
                    </p>

                </div>
            </div>
        </div>
    );
};

export default Feed;
