from .db import db

class Song(db.Model):
    __tablename__ = "songs"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    album_id = db.Column(db.Integer, db.ForeignKey('albums.id'), nullable=False)
    title = db.Column(db.Text, nullable=False)
    song_file = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, nullable=False)
    updated_at = db.Column(db.DateTime, nullable=False)

    # relationhips
    user = db.relationship('User', back_populates='songs', uselist=False)
    album = db.relationship('Album', back_populates='songs', uselist=False)
    comments = db.relationship('Comment', back_populates='song', cascade="all, delete-orphan")

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            # "user": self.user.to_dict(),
            "album_id": self.album_id,
            # "album": self.album.to_dict(),
            "title": self.title,
            "song_file": self.song_file,
            # 'comments': {comment.to_dict()["id"]: comment.to_dict() for comment in self.comments},
            "created_at": self.created_at,
            "updated_at": self.updated_at
        }
