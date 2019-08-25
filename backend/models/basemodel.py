from db import db
from sqlalchemy.exc import DataError


class BaseModel():
    """ Adds Save and Delete form db and find by name """

    @classmethod
    def find_by_name(cls, name):
        return cls.query.filter_by(name=name).all()

    @classmethod
    def find_by_id(cls, id):
        try:
            return cls.query.filter_by(id=id).first()
        except:
            return None
    
    @classmethod
    def update_by_id(cls, id, payload):
        """ Take in ID of object and a dictonary payload and update the object"""
        return cls.query.filter_by(id=id).update(payload)



    def save_to_db(self):
        db.session.add(self)
        db.session.commit()

    def delete_from_db(self):
        db.session.delete(self)
        db.session.commit()
