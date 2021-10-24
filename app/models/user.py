from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False)

    songs = db.relationship("Song", back_populates='user', cascade="all, delete-orphan")
    albums = db.relationship("Album", back_populates='user', cascade="all, delete-orphan")
    comments = db.relationship("Comment", back_populates='user', cascade="all, delete-orphan")

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'songs': {song.to_dict()["id"]: song.to_dict() for song in self.songs},
            'albums': {album.to_dict()["id"]: album.to_dict() for album in self.albums},
            'created_at': self.created_at,
        }
