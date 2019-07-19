from flask import current_app

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
    
    
def remove_from_index(index, model):
    if not current_app.elasticsearch:
        return
    current_app.elasticsearch.delete(index=index, doc_type=index, id=model.id)

def query_index(index, query, page, per_page):
    if not current_app.elasticsearch:
        return [], 0
    search = current_app.elasticsearch.search(
        index=index, 
        body={'query': {'query_string': {'query': '*'+query+'*', 'type': "phrase", 'fields': ['*']}},
              'from': (page - 1) * per_page, 'size': per_page})
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
    
        
    