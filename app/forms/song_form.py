from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField
from wtforms.validators import DataRequired, Length, ValidationError

def song_title_space(form, field):
    title = form.data["title"]

    if title.isspace():
        raise ValidationError(
            "Title cannot be all spaces"
        )

class SongForm(FlaskForm):
    user_id = StringField("user_id", [DataRequired()])
    title = StringField("title", [DataRequired(message="Please add a song title"), Length(min= 5, max= 100, message="Title must be between 5 and 100 characters"), song_title_space])
    album_id = StringField("album_id", [DataRequired(message="Please pick an album")])
    submit = SubmitField("upload")
