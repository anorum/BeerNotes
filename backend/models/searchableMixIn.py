
from search import add_to_index, remove_from_index, query_index
from flask import current_app
from elasticsearch_dsl import Q

from db import db


class SearchableMixin(object):
    @classmethod
    def search(cls, dsl_query, page, per_page):
        ids, total = query_index(dsl_query, page, per_page)
        if total['value'] == 0:
            #Return a fake UUID for zero results
            return cls.query.filter_by(id="3ba90a8e-e81b-4133-9b59-c1bf946401b3"), 0
        when = []
        for i in range(len(ids)):
            when.append((ids[i], i))
        return cls.query.filter(cls.id.in_(ids)).order_by(
            db.case(when, value=cls.id)), total
    
    @classmethod
    def elastic_find_by_id(cls, inputid):
        q= Q("terms", _id=[inputid])
        ids, total = query_index(q)
        return ids
    

    @classmethod
    def before_commit(cls, session):
        session._changes = {
            'add': list(session.new),
            'update': list(session.dirty),
            'delete': list(session.deleted)
        }

    @classmethod
    def after_commit(cls, session, instance):
        try:
            for obj in session._changes['add']:
                if isinstance(obj, SearchableMixin):
                    add_to_index(obj.__tablename__, obj)
            for obj in session._changes['update']:
                if isinstance(obj, SearchableMixin):
                    add_to_index(obj.__tablename__, obj)
            for obj in session._changes['delete']:
                if isinstance(obj, SearchableMixin):
                    remove_from_index(obj)
            session._changes = None
        except:
            return

    @classmethod
    def reindex(cls):
        for obj in cls.query:
            add_to_index(cls.__tablename__, obj)

db.event.listen(db.session, 'before_commit', SearchableMixin.before_commit)
db.event.listen(db.session, 'after_flush_postexec', SearchableMixin.after_commit)
#db.event.listen(db.session, 'after_commit', SearchableMixin.after_commit)