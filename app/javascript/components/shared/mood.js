import React from 'react'
import PropTypes from 'prop-types'

import Mood1 from 'imgs/moods/mood-1.svg'
import Mood1Selected from 'imgs/moods/mood-1-selected.svg'
import Mood2 from 'imgs/moods/mood-2.svg'
import Mood2Selected from 'imgs/moods/mood-2-selected.svg'
import Mood3 from 'imgs/moods/mood-3.svg'
import Mood3Selected from 'imgs/moods/mood-3-selected.svg'
import Mood4 from 'imgs/moods/mood-4.svg'
import Mood4Selected from 'imgs/moods/mood-4-selected.svg'
import Mood5 from 'imgs/moods/mood-5.svg'
import Mood5Selected from 'imgs/moods/mood-5-selected.svg'

function Mood (props) {

  return (
    <div className='px-3 pt-3 my-1'>
      <h5 className='text-uppercase text-left font-weight-bold text-muted'>My Mood</h5>
      <div className='d-flex'>
        { props.selectedMood == 1 ?
          <div>
            <img className='m-2 mood-icon-selected' src={Mood1Selected} />
            <div className='mood-icon-underline'></div>
          </div> :
          <img className='m-2 mood-icon' src={Mood1} />
        }
        { props.selectedMood == 2 ?
          <div>
            <img className='m-2 mood-icon-selected' src={Mood2Selected} />
            <div className='mood-icon-underline'></div>
          </div> :
          <img className='m-2 mood-icon' src={Mood2} />
        }
        { props.selectedMood == 3 ?
          <div>
            <img className='m-2 mood-icon-selected' src={Mood3Selected} />
            <div className='mood-icon-underline'></div>
          </div> :
          <img className='m-2 mood-icon' src={Mood3} />
        }
        { props.selectedMood == 4 ?
          <div>
            <img className='m-2 mood-icon-selected' src={Mood4Selected} />
            <div className='mood-icon-underline'></div>
          </div> :
          <img className='m-2 mood-icon' src={Mood4} />
        }
        { props.selectedMood == 5 ?
          <div>
            <img className='m-2 mood-icon-selected' src={Mood5Selected} />
            <div className='mood-icon-underline'></div>
          </div> :
          <img className='m-2 mood-icon' src={Mood5} />
        }
      </div>
    </div>
  )
}

export default Mood
