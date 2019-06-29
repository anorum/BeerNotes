from flask_jwt_extended import verify_jwt_in_request, get_jwt_claims
from functools import wraps


def admin_required(fn):
    @wraps(fn)
    def wrapper(*args, **kwargs):
        verify_jwt_in_request()
        claims = get_jwt_claims()
        if claims['is_admin']:
            return fn(*args, **kwargs)
        else:
            return {"message": "Admin privileges are required for this endpoint."}, 403
    return wrapper
