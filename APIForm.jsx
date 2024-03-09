import React from "react";
import './App.css';

const APIForm = ({ inputs, handleChange, onSubmit, handleBanClick }) => {

  return (
    <div>
      <h2>Select your Image Attributes</h2>
      <form className="form-container">
        {inputs &&
          Object.entries(inputs).map(([category, value], index) => (
            <li className="form" key={index}>
              <label htmlFor={category}>{category}</label>
              <br />
              {category === "breeds" ? (
                <div>
                  {value.map((breed, breedIndex) => (
                    <div key={breedIndex}>
                      <h2>Breed Information</h2>

                      <div className="breed-info">
      
                      <p className="descr">
                      <strong>Breed Name:</strong>{" "}
                        <span className="clickable"
                          onClick={() => handleBanClick("breed", breed.name)} >
                          {breed.name}</span>
                        <br />
                        <strong>Weight:</strong>{" "}
                        <span className="clickable"
                          onClick={() => handleBanClick("weight", breed.weight.imperial)}>
                          {breed.weight.imperial} lbs ({breed.weight.metric} kg)</span>

                        <br />
                        <strong>Height:</strong>{" "}
                        <span className="clickable"
                          onClick={() => handleBanClick("height", breed.height.imperial)}
                        >
                          {breed.height.imperial} inches ({breed.height.metric} cm)
                        </span><br />

                        <strong>Life Span:</strong>{" "}
                        <span className="clickable"
                          onClick={() => handleBanClick("life_span", breed.life_span)}
                        >{breed.life_span}</span> <br />

                        <strong>Temperament:</strong>{" "}
                        <span className="clickable"
                          onClick={() => handleBanClick("temperament", breed.temperament)} >
                          {breed.temperament}
                        </span>
                      </p>
                    </div></div>
                  ))}
                </div>
              ) : (
                <p>
                  <span onClick={() => handleChange(category, value)}>{value}</span>
                </p>
              )}
            </li>
          ))}
      </form>
      <button type="button" className="button" onClick={onSubmit}>
        Take a pic!
      </button>
      
    </div>
  );
};

export default APIForm;
