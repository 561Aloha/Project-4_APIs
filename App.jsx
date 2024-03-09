import { useState } from 'react'
import APIForm from './APIForm';
import './App.css'

const ACCESS_KEY = import.meta.env.VITE_APP_ACCESS_KEY;

function App() {
  const [currentImage, setCurrentImage] = useState(null);

  const [inputs, setInputs] = useState({
    breeds:[
      {
        "id": "",
        "name": "",
        "weight": " ",
        "height": "",
        "life_span": "",
        "breed_group": ""
      }
    ],
  });
  const submitForm = () => {
    let defaultValues = {
      breeds: [
        {
          id: "",
          name: "",
          weight: "",
          height: "",
          life_span: "",
          breed_group: "",
        },
      ],
    };
    setInputs(defaultValues);
    makeQuery();
  }

  const callAPI = async (query) => {
    const response = await fetch(query);
    const json = await response.json();
    
    if (json[0] && json[0].url) {
      setCurrentImage(json[0].url);
      setInputs({
        id: json[0].id,
        width: json[0].width,
        height: json[0].height,
        url: json[0].url,
        breeds:json[0].breeds,
      })
      setPrevImages((images) => [...images, json[0].url]); 
    } else {
      alert('Oops! Something went wrong with that query, let\'s try again');
    }
  };
  
  const [filteredAttributes, setFilteredAttributes] = useState([]);
  const [banList, setBanList] = useState([]);

  const addToBanList = (attribute) => {
    setBanList((prevBanList) => [...prevBanList, attribute]);
  };

  const removeFromBanList = (category) => {
    setBanList((prevBanList) => prevBanList.filter((item) => item.category !== category));
    setFilteredAttributes((prevAttributes) => prevAttributes.filter((attr) => attr.category !== category));
  };
  const handleBanClick = (category, value) => {
    addToBanList({ category, value });
    setFilteredAttributes((prevAttributes) => [...prevAttributes, { category, value }]);
  };


  const makeQuery = () => {
    let wait_until = "network_idle";
    let response_type = "json";
    let fail_on_status = "400%2C404%2C500-511";
    let url_starter = "https://";
    let fullURL = url_starter + inputs.url;

    const filteredAttributes = Object.entries(inputs)
    .filter(([key, value]) => key !== "breeds" && !banList.find(item => item.category === key))
    .reduce((obj, [key, value]) => ({ ...obj, [key]: value }), {});

    filteredAttributes.breeds = inputs.breeds.filter((breed) => !banList.find((item) => item.category === 'breed'));

    const queryParams = new URLSearchParams(filteredAttributes);

  let query = `https://api.thedogapi.com/v1/images/search?limit=1&api_key=live_65NFi6FJAA3K1sAmgKFkV1l675v6ZICYDp5XCYdB2EuQEtlXLYK4wFbxuXxHsFDi&url=${fullURL}&breeds=${inputs.breeds}&id=${inputs.id}&url=${inputs.url}&width=${600}&height=${500}&wait_until=${wait_until}&response_type=${response_type}&fail_on_status=${fail_on_status}&${queryParams.toString()}`;
  callAPI(query).catch(console.error);
  }
  return (
    <div className="whole-page">
    <h1>Build Your Own Screenshot! 📸</h1>
      <APIForm

        inputs={inputs}
        handleChange={(e) =>
          setInputs((prevState) => ({ ...prevState, [e.target.name]: e.target.value.trim() 
          }))
        }
        onSubmit={submitForm}  handleBanClick={handleBanClick}
      />
    
      <br></br>
      {currentImage ? ( 
      <img className="screenshot"
      src={currentImage}
      alt="Screenshot returned"/>
      ) : ( <div> </div>)}

      <div className="container">
        <h3> Current Query Status: </h3>
        <p>
          https://api.thedogapi.com/v1/urltoimage?access_key=ACCESS_KEY    
          <br></br>
          url={inputs.url} <br></br>
          format={inputs.format} <br></br>
          width={inputs.width}<br></br>
          height={inputs.height}
          <br></br>
        </p>

        <div className='filter-container'>
        <h2>Filtered Attributes</h2>
        <ul>
          {filteredAttributes.map((attr, index) => (
            <li key={index}>
              {attr.category}: {attr.value}
              <button className='remove' onClick={() => removeFromBanList(attr.category)}>Remove</button>
            </li>
          ))}
        </ul></div>
      </div>
      </div>
);
}

export default App;