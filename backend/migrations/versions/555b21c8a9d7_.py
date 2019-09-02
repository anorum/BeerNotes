"""empty message

Revision ID: 555b21c8a9d7
Revises: 8d11ee58c983
Create Date: 2019-08-20 10:52:06.162270

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '555b21c8a9d7'
down_revision = '8d11ee58c983'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('recipe', sa.Column('published', sa.Boolean(), nullable=True))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('recipe', 'published')
    # ### end Alembic commands ###