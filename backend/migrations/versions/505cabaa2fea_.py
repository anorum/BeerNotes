"""empty message

Revision ID: 505cabaa2fea
Revises: 555b21c8a9d7
Create Date: 2019-08-21 14:11:38.988740

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '505cabaa2fea'
down_revision = '555b21c8a9d7'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('recipes_yeasts', sa.Column('attenuation', sa.Integer(), nullable=True))
    op.drop_column('recipes_yeasts', 'attenutation')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('recipes_yeasts', sa.Column('attenutation', sa.INTEGER(), autoincrement=False, nullable=True))
    op.drop_column('recipes_yeasts', 'attenuation')
    # ### end Alembic commands ###
