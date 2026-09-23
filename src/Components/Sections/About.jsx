import React from 'react'
import products from '../../Product.js'
  console.log(products); 
    const featuredItem = products.find(item => item.id === 10);

const About = (props) => {

  return (
    <div>About
 <h2>
      {featuredItem && (
        <div className="featured-item">
           <p>Ask us about: {featuredItem.name}</p>
           <p>Price: ${featuredItem.price}</p>
           <img src={featuredItem.image} alt="" />
        </div>
      )}
      </h2>
    </div>
  )
}

export default About