import os
basedir = os.path.abspath(os.path.dirname(__file__))


class Config(object):
    DEBUG = False
    TESTING = False
    CSRF_ENABLED = False
    SECRET_KEY = os.environ['SECRET_KEY']
    JWT_SECRET_KEY = os.environ['JWT_SECRET_KEY']
    SQLALCHEMY_DATABASE_URI = os.environ['DATABASE_URL']
    MAIL_SERVER = "localhost"
    MAIL_PORT = 8025
    MAIL_USE_TLS = False
    JWT_TOKEN_LOCATION = ['cookies']
    JWT_ACCESS_COOKIE_PATH = '/'
    JWT_REFRESH_COOKIE_PATH = '/refresh'
    JWT_SESSION_COOKIE = 60*60*24*30
    JWT_COOKIE_CSRF_PROTECT = False
    UPLOADED_IMAGES_DEST = os.path.join(
        "static", "images")  # manage root folder
    ELASTICSEARCH_URL = os.environ['ELASTICSEARCH_URL']


"""     MAIL_USE_SSL = True """


"""     MAIL_USERNAME = os.environ['MAIL_USERNAME']
    MAIL_DEFAULT_SENDER = os.environ['MAIL_USERNAME']
    MAIL_PASSWORD = os.environ['MAIL_PASSWORD'] """


class ProductionConfig(Config):
    DEBUG = False
    JWT_COOKIE_SECURE = True
    JWT_COOKIE_CSRF_PROTECT = True
    CSRF_ENABLED = True


class StagingConfig(Config):
    DEVELOPMENT = True
    DEBUG = True


class DevelopmentConfig(Config):
    DEVELOPMENT = True
    DEBUG = True
    TESTING = True
    JWT_COOKIE_SECURE = False
    CSRF_ENABLED = True
    JWT_COOKIE_CSRF_PROTECT = True


class TestingConfig(Config):
    TESTING = True
