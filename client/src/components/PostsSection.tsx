import React from "react"
import TxtPostsList from "./TxtPostsList";
import ImgPostsList from "./ImgPostsList";

export const Posts = () => (
  <section className="posts">
    <TxtPostsList />
    <ImgPostsList />
  </section>
)
// <TxtPostsList />