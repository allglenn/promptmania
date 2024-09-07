import Feed from "../components/Feed";
import React from "react";

const Page = (props) => {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">
        Discover and share Ai Promts
        <br className="max-md:hidden" />
        <span className="orange_gradient">AI-Powered Prompts</span>
      </h1>
      <p className="desc text-cent">
        Get inspired by the power of AI , this tool will help you to generate
        ideas for your next project. by showing you a list of prompts that you
        can use to get started. and be more creative in your work.
        Thanks to the power of AI.
      </p>
       
       <Feed />
      
    </section>
  );
};

export default Page;
