import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// Liste des expressions (exemple, à remplacer par tes données)
const expressions = [
  { id: 1, text: "Bonjour, parlez-vous hongrois ?", language: "hongrois", audio: "/audio/hongrois_0.mp3" },
  { id: 2, text: "Oui", language: "hongrois", audio: "/audio/hongrois_1.mp3" },
  { id: 3, text: "Non", language: "hongrois", audio: "/audio/hongrois_2.mp3" },
  { id: 4, text: "Bonjour, parlez-vous turc ?", language: "turc", audio: "/audio/turc_0.mp3" },
  { id: 5, text: "Oui", language: "turc", audio: "/audio/turc_1.mp3" },
  { id: 6, text: "Non", language: "turc", audio: "/audio/turc_2.mp3" },
  { id: 7, text: "Bonjour, parlez-vous dioula ?", language: "dioula", audio: "/audio/dioula_0.mp3" },
  { id: 8, text: "Oui", language: "dioula", audio: "/audio/dioula_1.mp3" },
  { id: 9, text: "Non", language: "dioula", audio: "/audio/dioula_2.mp3" },
];

const ExpressionSelector = ({ onSelectExpression }) => {
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
      exp.text.toLowerCase().includes(searchTerm.toLowerCase())
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
    setQuery(expression.text);
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
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={toggleListening}
          className={`p-2 rounded-md ${
            isListening ? 'bg-red-500 text-white' : 'bg-blue-500 text-white'
          } hover:bg-opacity-80 transition`}
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
              className="p-2 hover:bg-gray-100 cursor-pointer"
            >
              {exp.text} ({exp.language})
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