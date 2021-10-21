from datetime import datetime
from flask import Blueprint, request
from flask_login import login_required
from app.models import Song, db

from app.aws import upload_file_to_s3, allowed_file, get_unique_filename
from app.forms import SongForm

song_routes = Blueprint('songs', __name__)

@song_routes.route('/<int:id>')
@login_required
def song(id):
    '''
    GET route to get a single song
    '''
    song = Song.query.get(id)
    return song.to_dict()


@song_routes.route('', methods=['POST'])
@login_required
def add_song():
    '''
    Song post route. Check the song filename and upload to AWS that will return a URL if upload is successful
    '''

    form = SongForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        if 'song_file' not in request.files:
            return {'errors': 'Please upload a file.'}, 400

        song = request.files['song_file']
        if not allowed_file(song.filename):
            return {'errors': 'File type is not supported. Please upload a MP3 filetype'}

        song.filename = get_unique_filename(song.filename)
        upload = upload_file_to_s3(song)

        if 'url' not in upload:
            return upload, 400

        url = upload['url']
        new_song = Song(user_id=request.form["user_id"],
                        song_file=url,
                        title=request.form["title"],
                        album_id=request.form["album_id"],
                        created_at=datetime.now(),
                        updated_at=datetime.now()
                        )
        db.session.add(new_song)
        db.session.commit()
        return new_song.to_dict()
    else:
        return {'errors': 'missing data'}
