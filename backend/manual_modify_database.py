import os
from sqlalchemy import create_engine, text
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Get the database connection string from the environment variable
db_connection_string = os.getenv('DB_CONNECTION_STR')

# Initialize the SQLAlchemy engine
engine = create_engine(
    db_connection_string,
    echo=True
)

def insert_to_db(table_name: str, quote):
    """
    Insert a single quote into the specified table in the database.

    :param table_name: Name of the table to insert data into
    :param quote: The quote to insert
    """
    # Use parameterized query to include the quote
    query_string = text(f"INSERT INTO {table_name} (quote, author) VALUES (:a, :b)")

    # Execute the query
    with engine.connect() as conn:
        conn.execute(query_string, {"a": quote[0], "b": quote[1]})
        conn.commit()  # Ensure the transaction is committed
        print(f"Inserted quote: {quote}")

if __name__ == "__main__":
    query_str = text(f'select * from book_info')
    with engine.connect() as conn:
        out = conn.execute(query_str)
        out = [row._asdict() for row in out]
        print(out, '\n')
