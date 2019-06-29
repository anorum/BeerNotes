from flask_script import Manager
from flask_migrate import Migrate, MigrateCommand
from models.user import UserModel

from app import app
from db import db

# Run python manage.py db init          This will create migration table
# Run python manage.py db migrate      this will add model upgrades
# Run python manage.py db upgrade

migrate = Migrate(app, db)
manager = Manager(app)

manager.add_command('db', MigrateCommand)


if __name__ == '__main__':
    manager.run()
