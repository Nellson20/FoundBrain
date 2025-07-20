import React, { useState } from 'react';
import './ToggleButton.scss'; // Assurez-vous d'avoir ce fichier CSS dans votre projet

const ToggleButton = ({active, onToggle}) => {
//  const [isToggled, setIsToggled] = useState(active);
const isToggled = active;

const toggleButton = () => {
    if (onToggle) {
      onToggle();
    }
 };

 return (
    <div className={`toggle-button ${isToggled ? 'toggled' : ''}`} onClick={toggleButton}>
      <div className="slider"></div>
    </div>
 );
};

export default ToggleButton;
