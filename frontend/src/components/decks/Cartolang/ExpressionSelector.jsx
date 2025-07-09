import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';


const ExpressionSelector = ({ expressions, onSelectExpression }) => {
  const [query, setQuery] = useState('');
  const [filteredExpressions, setFilteredExpressions] = useState(expressions);
  const [isListening, setIsListening] = useState(false);
  const [recognitionError, setRecognitionError] = useState(null);

  // Initialiser l'API SpeechRecognition
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = SpeechRecognition ? new SpeechRecognition() : null;

  useEffect(() => {
    if (recognition) {
      recognition.lang = 'fr-FR'; // Langue française
      recognition.interimResults = true; // Résultats intermédiaires
      recognition.continuous = false; // Arrête après une phrase

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setQuery(transcript);
        filterExpressions(transcript);
      };

      recognition.onerror = (event) => {
        setRecognitionError(`Erreur de reconnaissance vocale : ${event.error}`);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };
    }
  }, [recognition]);

  // Filtrer les expressions en fonction de la requête
  const filterExpressions = (searchTerm) => {
    const filtered = expressions.filter((exp) =>
      exp.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredExpressions(filtered);
  };

  // Gérer la saisie texte
  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    filterExpressions(value);
  };

  // Gérer la reconnaissance vocale
  const toggleListening = () => {
    if (!recognition) {
      setRecognitionError("La reconnaissance vocale n'est pas prise en charge par ce navigateur.");
      return;
    }

    if (isListening) {
      recognition.stop();
    } else {
      setRecognitionError(null);
      recognition.start();
      setIsListening(true);
    }
  };

  // Gérer la sélection d'une expression
  const handleSelect = (expression) => {
    setQuery(expression.proposition);
    setFilteredExpressions([expression]);
    onSelectExpression(expression);
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <div className="flex space-x-2 mb-4">
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Entrez ou parlez (ex: Parlez-vous...)"
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-milano-500"
        />
        <button
          onClick={toggleListening}
          className={`p-2 font-articulat_cf rounded-md text-sm font-bold ${
            isListening ? 'bg-milano-500 text-white' : 'bg-milano-500 text-white'
          } hover:bg-opacity-100 transition`}
        >
          {isListening ? 'Arrêter' : 'Parler'}
        </button>
      </div>
      {recognitionError && (
        <p className="text-red-500 text-sm mb-4">{recognitionError}</p>
      )}
      <ul className="border rounded-md max-h-64 overflow-y-auto">
        {filteredExpressions.length > 0 ? (
          filteredExpressions.map((exp) => (
            <li
              key={exp.id}
              onClick={() => handleSelect(exp)}
              className="font-articulat_cf font-bold text-md p-2 border border-gray-100 hover:bg-gray-400 hover:text-white cursor-pointer text-gray-600"
            >
              {exp}
            </li>
          ))
        ) : (
          <li className="p-2 text-gray-500">Aucune expression trouvée</li>
        )}
      </ul>
    </div>
  );
};

ExpressionSelector.propTypes = {
  onSelectExpression: PropTypes.func,
};

ExpressionSelector.defaultProps = {
  onSelectExpression: () => {},
};

export default ExpressionSelector;