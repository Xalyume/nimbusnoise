from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField
from wtforms.validators import DataRequired

class SongForm(FlaskForm):
    user_id = StringField("user_id", [DataRequired()])
    title = StringField("title", [DataRequired()])
    album_id = StringField("album_id", [DataRequired()])
    submit = SubmitField("upload")
