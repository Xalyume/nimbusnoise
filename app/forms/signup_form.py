from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError
from app.models import User


def email_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email.like(email)).first()
    if user:
        raise ValidationError('Email address is already in use.')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username.ilike(username)).first()
    if user:
        raise ValidationError('Username is already in use.')


def check_password(form, field):
    # Checking if password is longer than or equal to 8 chars
    # Checking if password contains !@#$%^&*(),./?
    special_sym = '!@#$%^&*(),./?'
    password = field.data

    if len(password) < 8 or len(password) > 32:
        raise ValidationError(
            'Password must be between 8 to 32 characters long.')

    # if none of the chars in password is in special_sym
    if not any(char for char in password if char in special_sym):
        raise ValidationError(
            'Password must contain at least one of these following characters: !@#$%^&*(),./?')
    if not any(char for char in password if char.isupper()):
        raise ValidationError(
            'Password must contain at least one uppercase letter.')
    if not any(char for char in password if char.islower()):
        raise ValidationError(
            'Password must contain at least one lowercase letter.')
    if not any(char for char in password if char.isdecimal()):
        raise ValidationError(
            'Password must contain at least one number.')


class SignUpForm(FlaskForm):
    username = StringField(
        'username', validators=[DataRequired(message="Please provide a username."), username_exists])
    email = StringField('email', validators=[DataRequired(message="Please provide an Email"), email_exists])
    password = StringField('password', validators=[DataRequired("Please provide a password"), check_password])
