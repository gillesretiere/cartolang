import React from 'react'

const LanguageRatioCard = ({ card, langDeck, }) => {
    return (
        <>
        <div className='px-4 border border-2'>
            {card.language_name_fr} {card.language_name_native}
        </div>
        </>
    )
}

export default LanguageRatioCard