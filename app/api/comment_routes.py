from datetime import datetime
from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import Comment, db

from app.forms import CommentForm

comment_routes = Blueprint('comments', __name__)

@comment_routes.route('')
def comments():
    '''
    GET route to get all comments
    '''
    comments = Comment.query.all()
    return {comment.id: comment.to_dict() for comment in comments}


@comment_routes.route('', methods=['POST'])
@login_required
def add_comment():
    '''
    POST route to create new comment
    '''
    user_id = current_user.get_id()
    form = CommentForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    print("-"*10, form.data)

    if form.validate_on_submit():
        comment = Comment(
            user_id=user_id,
            content=form.data['content'],
            song_id=form.data['song_id'],
            created_at=datetime.now(),
            updated_at=datetime.now()
        )
        db.session.add(comment)
        db.session.commit()
        return comment.to_dict()
    else:

        return form.errors
