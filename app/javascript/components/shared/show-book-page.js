import React from 'react'
import PropTypes from 'prop-types'

import Goals from 'components/shared/goals'
import PageSubsection from 'components/shared/page-subsection'
import Mood from 'components/shared/mood'

function ShowBookPage (props) {

  return (
    <div className='book-page bg-light p-4 mb-5'>
      <h6 className='font-italic text-center mb-3'>{props.bookPage.date}</h6>
      <Goals />
      <PageSubsection title='Technique' content={props.bookPage.technique}/>
      <PageSubsection title='Repetoire' content={props.bookPage.repetoire}/>
      <PageSubsection title='Other Notes' content={props.bookPage.other_notes}/>
      <Mood selectedMood={props.bookPage.mood} />
    </div>
  )
}

ShowBookPage.propTypes = {
  bookPage: PropTypes.shape({
    date: PropTypes.string.isRequired,
  }).isRequired,
}


export default ShowBookPage
