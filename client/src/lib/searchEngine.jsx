import React from "react";
import axios from "axios";

let searchEngine = {
  get : ()=>{
    // GET /products
    //   query: page, count
    // GET /products/:product_id
    // GET /products/:product_id/styles
    // GET /cart, POST /cart
    // GET /reviews
    //   query: page, count, sort,
    // GET /reviews/meta/?product_id
    // GET /qa/questions
    //   query: product_id, page, count
    //  GET /qa/questions/:question_id/answers
    //   query: page, count
    //  GET /products/:product_id/related
  },
  post : ()=>{
    // POST /reviews
    //   body: product_id + 8 parameters
    // POST /qa/questions
    //   body: product_id + 3 parameters
    // POST /qa/questions/:question_id/answers
  },
  put :() =>{
    // PUT /reviews/:review_id/helpful
    // PUT /reviews/:review_id/report
    // PUT /qa/answers/:answer_id/helpful
    // PUT /qa/answers/:answer_id/report
    // PUT /qa/questions/:question_id/helpful
    // PUT /qa/questions/:question_id/report
  }
}

export default searchEngine;