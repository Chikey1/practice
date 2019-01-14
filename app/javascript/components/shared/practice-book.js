import React from 'react'
import PropTypes from 'prop-types'
import { navigateTo } from 'components/utility/location'
import classnames from 'classnames'

function PracticeBook (props) {
  const practiceBookClasses = classnames(
    'practice-book',
    'd-flex',
    'flex-column',
    'justify-content-between',
    'align-items-stretch',
  )

  const titleClasses = classnames(
    'font-weight-bold',
    'text-uppercase',
    'mb-0',
    'practice-book-title',
    'text-light',
    'pr-2',
  )

  const iconClasses = classnames(
    'icon',
    'm-3',
    'align-self-end',
    `${props.book.instrument}-icon`
  )

  const entriesText = (entryCount) => {
    switch (entryCount) {
      case 0:
        return ' '
      case 1:
        return '1 entry'
      default:
        return props.book.entries + ' entries'
    }
  }

  return (
    <button className={practiceBookClasses} onClick={() => navigateTo(`/books/${props.book.id}`)}>
      <div className={iconClasses}></div>
      <div className='pl-3 pr-2 pb-3 align-self-start text-left w-100'>
        <p className='subtext text-light mb-0 text-right pr-1'>
          {entriesText(props.book.entries)}
        </p>
        <div className='d-flex align-items-center'>
          <h5 className={titleClasses}>{props.book.name}</h5>
          <div className='flex-grow-1 title-decorative-line'> </div>
        </div>
      </div>
    </button>
  )
}

PracticeBook.propTypes = {
  book: PropTypes.shape({
    name: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    instrument: PropTypes.string.isRequired,
    entries: PropTypes.number.isRequired,
  }).isRequired,
}

export default PracticeBook
