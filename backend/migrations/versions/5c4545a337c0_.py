"""empty message

Revision ID: 5c4545a337c0
Revises: 373b9f4bf046
Create Date: 2019-08-30 14:33:29.928527

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '5c4545a337c0'
down_revision = '373b9f4bf046'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('hop', sa.Column('custom', sa.Boolean(), nullable=False))
    op.add_column('yeast', sa.Column('custom', sa.Boolean(), nullable=False))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('yeast', 'custom')
    op.drop_column('hop', 'custom')
    # ### end Alembic commands ###