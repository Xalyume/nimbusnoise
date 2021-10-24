from .db import db

class Album(db.Model):
    __tablename__ = "albums"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    title = db.Column(db.Text, nullable=False)
    image_url = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, nullable=False)
    updated_at = db.Column(db.DateTime, nullable=False)

    user = db.relationship('User', back_populates='albums', uselist=False)
    songs = db.relationship('Song', back_populates='album', cascade="all, delete-orphan")

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            # "user": self.user.to_dict(),
            "title": self.title,
            "songs": {song.to_dict()["id"]: song.to_dict() for song in self.songs},
            "image_url": self.image_url,
            "created_at": self.created_at,
            "updated_at": self.updated_at
        }
