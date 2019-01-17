import React from 'react'
import PropTypes from 'prop-types'
import Button from 'components/shared/button'
import ChangeNameModal from 'components/change-name-modal'
import ChangePasswordModal from 'components/change-password-modal'
import DeleteAccountModal from 'components/delete-account-modal'

class Settings extends React.Component {
  render () {
    const { user } = this.props
    return (
    <div className='container'>
      <ChangeNameModal />
      <ChangePasswordModal />
      <DeleteAccountModal user={user} />
      <div className='d-flex align-items-center mb-3 px-2'>
        <div className='flex-grow-1 blue-decorative-line'> </div>
        <h2 className='text-capitalize text-primary p-3 font-weight-bold'>
          My Settings
        </h2>
        <div className='flex-grow-1 blue-decorative-line'> </div>
      </div>
      <table className="table">
        <tbody>
          <tr>
            <td>name</td>
            <td>{user.name}</td>
            <td className='text-primary font-weight-bold'>
              <a href='#' data-toggle='modal' data-target='#changeNameModal'>change</a>
            </td>
          </tr>
          <tr>
            <td>email</td>
            <td>{user.email}</td>
            <td></td>
          </tr>
          <tr>
            <td>created</td>
            <td>{user.created_at}</td>
            <td></td>
          </tr>
          <tr>
            <td>password</td>
            <td>**********</td>
            <td className='text-primary font-weight-bold'>
              <a href='#' data-toggle='modal' data-target='#changePasswordModal'>change</a>
            </td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </table>
      <div className='d-flex justify-content-center mt-3 mb-5 pt-2'>
        <Button
          color='standard-size-button btn-danger m-2 font-weight-bold'
          onClick={() => {}}
          data-toggle='modal'
          data-target='#deleteAccountModal'
        >
          Delete Account
        </Button>
      </div>
    </div>
    )
  }
}

Settings.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  }).isRequired,
}

export default Settings