from flask import current_app
from elasticsearch_dsl import Search


def add_to_index(index, model):
    if not current_app.elasticsearch:
        return

    payload = {}
    try:
        for field in model.__searchable__:
            payload[field] = getattr(model, field)
        payload["type"] = index
        current_app.elasticsearch.index(index="brewcipes", id=model.id,
                                    body=payload)
    except:
        return
    
    
def remove_from_index(model):
    if not current_app.elasticsearch:
        return
    current_app.elasticsearch.delete(index="brewcipes", id=model.id)

def query_index(index, dsl_query, page, per_page):
    if not current_app.elasticsearch:
        return [], 0
    s = Search(index="brewcipes", using=current_app.elasticsearch).query(dsl_query)

    search = s.execute()

    ids = [hit['_id'] for hit in search['hits']['hits']]
    return ids, search['hits']['total']


""" def recursive_serialize_field(field):
    if not (isinstance(field, InstrumentedList) or (hasattr(field,'__dict__') or hasattr(field,'__slots__'))):
        return field
    if isinstance(field, InstrumentedList):
        for item in field:
            recursive_serialize_field(item)
    if (hasattr(field,'__dict__') or hasattr(field,'__slots__')) and not isinstance(field, InstrumentedList):
        print(field.to_dict())
        return field """
    
        
    