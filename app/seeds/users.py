from datetime import datetime
from app.models import db, User, Album

# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='demo', email='demo@aa.io', password='password', created_at=datetime(2021, 10, 30))
    marnie = User(
        username='marnie', email='marnie@aa.io', password='password', created_at=datetime(2021, 10, 30))
    bobbie = User(
        username='bobbie', email='bobbie@aa.io', password='password', created_at=datetime(2021, 10, 30))
    musikman = User(
        username='musikman', email='musikman@aa.io', password='password', created_at=datetime(2021, 11, 5))
    football_head = User(
        username='football_head', email='arnie@aa.io', password='password', created_at=datetime(2021, 11, 10))
    kenken = User(
        username='kenken', email='kenken@aa.io', password='password', created_at=datetime(2021, 11, 17))

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.add(musikman)
    db.session.add(football_head)
    db.session.add(kenken)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
