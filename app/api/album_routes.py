from datetime import datetime
from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import Album, db

from app.forms import AlbumForm

album_routes = Blueprint('albums', __name__)

@album_routes.route('')
@login_required
def albums():
    '''
    GET route to get a all
    '''
    albums = Album.query.all()
    return albums.to_dict()


@album_routes.route('', methods=["POST"])
@login_required
def add_album():
    '''
    POST route to create new album
    '''
    user_id = current_user.get_id()
    form = AlbumForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    print("*"*8, form.data)

    if form.validate_on_submit():
        album = Album(
            user_id=user_id,
            title=form.data['title'],
            image_url=form.data['image_url'],
            created_at=datetime.now(),
            updated_at=datetime.now()
        )
        db.session.add(album)
        db.session.commit()
        return album.to_dict()
    else:

        return form.errors
