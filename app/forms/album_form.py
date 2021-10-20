from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField
from wtforms.validators import DataRequired

class AlbumForm(FlaskForm):
    user_id = StringField("user_id", validators=[DataRequired()])
    title = StringField("title", validators=[DataRequired()])
    image_url = StringField("image_url", validators=[DataRequired()])
