"""empty message

Revision ID: 8d11ee58c983
Revises: 341e68276fff
Create Date: 2019-08-19 20:10:40.563889

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '8d11ee58c983'
down_revision = '341e68276fff'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('yeast', sa.Column('max_temp', sa.Integer(), nullable=True))
    op.add_column('yeast', sa.Column('min_temp', sa.Integer(), nullable=True))
    op.add_column('yeast', sa.Column('style', sa.String(length=120), nullable=True))
    op.drop_column('yeast', 'yeast_style')
    op.drop_column('yeast', 'max_fermenting_temp')
    op.drop_column('yeast', 'min_fermenting_temp')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('yeast', sa.Column('min_fermenting_temp', sa.INTEGER(), autoincrement=False, nullable=True))
    op.add_column('yeast', sa.Column('max_fermenting_temp', sa.INTEGER(), autoincrement=False, nullable=True))
    op.add_column('yeast', sa.Column('yeast_style', sa.VARCHAR(length=120), autoincrement=False, nullable=True))
    op.drop_column('yeast', 'style')
    op.drop_column('yeast', 'min_temp')
    op.drop_column('yeast', 'max_temp')
    # ### end Alembic commands ###
