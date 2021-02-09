import React, { useState } from 'react';
import { AutoComplete, Button } from 'antd';
import './App.css';
import {OPTIONS_LIST} from './constants.js';

const { Option } = AutoComplete;

const App = () => {
  
  const [input, setInput] = useState('');
  const [tempInput, setTempInput] = useState('');
  const [optionsOpen, setOptionsOpen] = useState(false);
  const [resultVis, setResultVis] = useState(false);

  const getHighlightedText = (text, highlight) => {
    // Split text on highlight term, include term itself into parts, ignore case
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
    return <span>{parts.map(part => part.toUpperCase() === highlight.toUpperCase() ? <b>{part}</b> : part)}</span>;
}

  const onSelect = (target) => {
    setOptionsOpen(false);
  }

  const onBlur = () => {
    setOptionsOpen(false);
  }

  const onChange = (newValue) => {
    console.log("setting input to "+newValue);
    setInput(newValue);
    setOptionsOpen(newValue.length>0);
    setResultVis(false);
  }

  const onButtonClick = () => {
    setResultVis(true);
  }


  const onSearch = (value) => {
    console.log("searched "+value);
  }

  const onFocus = (value) => {
    console.log("focussed "+value);
  }

  return (
    <div className="appHolder">
      <div className="title">
        Hello friend
      </div>
      <div className="prompt">
        What is your favorite food?
      </div>
      <AutoComplete
        //options={OPTIONS_LIST}
        style={{ width: 200 }}
        placeholder="type here"
        open={optionsOpen}
        value={tempInput===''?input:tempInput}
        // filterOption={(inputValue, option) => {
        //   return (option !== null &&
        //     option !== undefined &&
        //     option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
        //   )
        // }}
        onChange={onChange}
        onBlur={onBlur}
        onSelect={onSelect}
        
        onSearch={onSearch}
        onFocus={onFocus}
      >
        {OPTIONS_LIST.filter((food) => (
            food.value.toUpperCase().indexOf(input.toUpperCase()) !== -1
          )).map((food) => { console.log("option food and input "+food.value.toUpperCase().indexOf(input.toUpperCase())); return(
            <Option
              key={food.value}
              value={food.value}
              onMouseEnter={() => setTempInput(food.value)}
              onMouseLeave={() => setTempInput('')}
            >
              {getHighlightedText(food.value, input)}
            </Option>
        )}
        )}
      </AutoComplete>
      <Button
        className="buttonStyle"
        onClick={onButtonClick}
      >
        Enter
      </Button>
      <div
        style={{display: resultVis ? "inherit" : "none"}}
        className="prompt"
      >
        Great choice, {input} is one of my favorite foods too!
      </div>
      <img
        className="footer"
        src="https://www.lithospos.com/storage/app/media/fruits-vegetables-pos-banner.jpg"
      />
    </div>
  );
};

export default App;