import React, {Component} from 'react'
import {NavLink, Redirect} from 'react-router-dom'
import {ReactComponent as HeaderLogo} from '../../img/LoginPage/header-logo.svg'
import {ReactComponent as PeopleIcon} from '../../img/LoginPage/form-icon.svg'
import {ReactComponent as PhoneIcon} from '../../img/LoginPage/form-icon2.svg'
import {ReactComponent as FacebookIcon} from '../../img/LoginPage/facebook-icon.svg'
import {ReactComponent as GoogleIcon} from '../../img/LoginPage/google-icon.svg'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {usersOperations} from '../../store/users'
import './index.scss'

class Login extends Component {
  render () {
    const {currentUser} = this.props

    if (currentUser) {
      return <Redirect to={'/'}/>
    }

    return (
      <form className="login-page" onSubmit={this.props.submitLoginForm}>
        <div className="login-page__header container">
          <div className="header__logo"><HeaderLogo /></div>
          <p className="header__title">RionUp</p>
          <p className="header__text">A window to your life</p>
        </div>
        <div className="login-page__body container">
          <div className="search-form body__form">
            <div className="email__field">
              <div><PeopleIcon /></div>
              <input className="email__field-text" name="username" type="text" placeholder="Email" />
            </div>
            <div className="password__field bottom-line">
              <div><PhoneIcon /></div>
              <input className="password__field-text" name="password" type="password" placeholder="Password"/>
            </div>
          </div>
        </div>
        <div className="login-page__bottom container">
          <div className="bottom__social-media">
            <div className="facebook-link"><a href=' ' onClick={() => this.props.loginWithOAuth('facebook')}><FacebookIcon /></a></div>
            <div className="google-link"><a href=' ' onClick={() => this.props.loginWithOAuth('google')}><GoogleIcon /></a></div>
          </div>
          <div className="bottom__button"><input type="submit" className="bottom__button-link" value="Log in" /></div>
          <NavLink to={'/registration'} className="bottom__text">Have not account?</NavLink>
        </div>
      </form>
    )
  }
}

Login.propTypes = {
  currentUser: PropTypes.object.isRequired,
  submitLoginForm: PropTypes.func.isRequired,
  loginWithOAuth: PropTypes.func.isRequired
}

const mapStateToProps = ({users}) => ({
  currentUser: users.currentUser,
  isCurrentUserLoading: users.isCurrentUserLoading
})

const mapDispatchToProps = dispatch => ({
  submitLoginForm: event => dispatch(usersOperations.submitLoginForm(event)),
  loginWithOAuth: event => dispatch(usersOperations.loginWithOAuth(event))
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)