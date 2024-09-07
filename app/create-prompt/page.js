"use client";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Form from "../../components/Form";

const createPrompt = () => {
  const [submiting, setSubmiting] = useState(false);
  const [post, setPost] = useState({
    prompt: "",
    tag: "",
  });
  const router = useRouter();
  const { data: session } = useSession();

  const createPrompt = async (e) => {
    e.preventDefault();
    setSubmiting(true);
    console.log(post);
    try {
      const res = await fetch("/api/prompt/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
          userId: session?.user?.id,
        }),
      });
      if (res.ok) {
        setPost({
          prompt: "",
          tag: "",
        });
        setSubmiting(false);
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmiting(false);
    }
  };

  return (
    <Form
      type="create"
      post={post}
      setPost={setPost}
      submiting={submiting}
      handleSubmit={createPrompt}
    />
  );
};

export default createPrompt;
