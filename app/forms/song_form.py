from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField
from wtforms.validators import DataRequired, Length, ValidationError

class SongForm(FlaskForm):
    user_id = StringField("user_id", [DataRequired()])
    title = StringField("title", [DataRequired(message="Please add a song title"), Length(min= 5, max= 100, message="Title must be between 5 and 100 characters")])
    album_id = StringField("album_id", [DataRequired(message="Please pick an album")])
    submit = SubmitField("upload")
