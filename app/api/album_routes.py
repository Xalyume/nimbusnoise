from datetime import datetime
from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import Album, db

from app.forms import AlbumForm

album_routes = Blueprint('albums', __name__)

@album_routes.route('')
def albums():
    '''
    GET route for specific album.
    '''
    albums = Album.query.all()
    return {album.id: album.to_dict() for album in albums}


@album_routes.route('', methods=["POST"])
@login_required
def add_album():
    '''
    POST route to create new album
    '''
    user_id = current_user.get_id()
    form = AlbumForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

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
