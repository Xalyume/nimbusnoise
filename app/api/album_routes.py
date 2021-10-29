from datetime import datetime
from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import Album, db

from app.forms import AlbumForm

album_routes = Blueprint('albums', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{error}')
    return errorMessages


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
        return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@album_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def del_album(id):
    '''
    Song delete route.
    Work on deleting from AWS bucket and database
    '''
    album_to_delete = Album.query.filter(Album.id == id).first()

    if not album_to_delete:
        return 'Nothing to delete'
    else:

        db.session.delete(album_to_delete)
        db.session.commit()
        return {'res': True}
