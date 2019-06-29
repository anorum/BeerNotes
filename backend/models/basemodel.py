from db import db


class BaseModel():
    """ Adds Save and Delete form db and find by name """

    @classmethod
    def find_by_name(cls, name):
        return cls.query.filter_by(name=name).all()

    @classmethod
    def find_by_id(cls, id):
        return cls.query.filter_by(id=id).all()

    def save_to_db(self):
        db.session.add(self)
        db.session.commit()

    def delete_from_db(self):
        db.session.delete(self)
        db.session.commit()
