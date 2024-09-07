import React from "react";
import Link from "next/link";

const Form = ({
  type,
  post,
  setPost,
  submiting,
  handleSubmit,
}) => {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">
        <span className="orange_gradient">
          {type === "create" ? "Create" : "Edit"} Prompt
        </span>
      </h1>
      {submiting && <p className="desc text-center">Please wait...</p>}
      <p
        className="desc text-left max-w-md
         p-4
        "
      >
        {type === "create"
          ? "Create a new prompt by filling the form below, let the world know about your creativity by sharing your prompt with everyone."
          : "Edit the prompt by filling the form below"}
      </p>
      <form
        onSubmit={handleSubmit}
        className="
    flex flex-col gap-7 max-w-md w-full p-4 bg-white rounded-lg shadow-lg 
    glassmorphism 
    "
      >
        <label htmlFor="prompt" className="label">
          <span className="label_text font-satoshi text-base">
            Your Ai prompt
          </span>
        </label>

        <textarea
          placeholder="write your prompt here"
          className="
        form_textarea 


        "
          value={post.prompt}
          onChange={(e) => setPost({ ...post, prompt: e.target.value })}
        />
        <label htmlFor="prompt" className="label">
          <span className="label_text font-satoshi text-base">
            Your prompt tag(s)
          </span>
        </label>
        <textarea
          placeholder="write your prompt tag here(#retail, #fashion)"
          className="form_textarea"
          value={post.tag}
          onChange={(e) => setPost({ ...post, tag: e.target.value })}
        />
        <div className="flex flex-col gap-4 md:flex-row md:justify-between md:items-center">
          <Link
            className="text-gray-500 outline_btn"
            href={type === "create" ? "/" : "/profile"}
          >
            Cancel
          </Link>
          <button type="submit" className="black_btn" disabled={submiting}>
            {type === "create" ? "Create" : "Edit"}
            {submiting && "ing..."}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Form;
