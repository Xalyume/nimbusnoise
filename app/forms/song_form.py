from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField
from wtforms.validators import DataRequired

class SongForm(FlaskForm):
    user_id = StringField("User Id", [DataRequired()])
    title = StringField("Title", [DataRequired()])
    album = StringField("Album", [DataRequired()])
    submit = SubmitField("Login")
