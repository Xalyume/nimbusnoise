from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField
from wtforms.validators import DataRequired, Length

class AlbumForm(FlaskForm):
    user_id = StringField("user_id", validators=[DataRequired()])
    title = StringField("title", validators=[DataRequired(message="Please add an album title"), Length(min= 5, max= 100, message="Title must be between 5 and 100 characters")])
    image_url = StringField("image_url", validators=[DataRequired()])
