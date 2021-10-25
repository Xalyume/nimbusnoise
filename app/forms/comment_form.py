from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired

class CommentForm(FlaskForm):
    user_id = StringField("user_id", validators=[DataRequired()])
    content = StringField("content", validators=[DataRequired()])
    song_id = StringField("song_id", validators=[DataRequired()])
