from flask import Flask, jsonify, request
from flask_cors import CORS
import sqlite3

app = Flask(__name__)
CORS(app)

# تهيئة قاعدة البيانات
def init_db():
    conn = sqlite3.connect('articles.db')
    cursor = conn.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS articles (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            content TEXT NOT NULL,
            suptitle TEXT NOT NULL
        )
    ''')
    conn.commit()
    conn.close()

init_db()

# عرض جميع المقالات
@app.route('/api/articles', methods=['GET'])
def get_articles():
    conn = sqlite3.connect('articles.db')
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM articles')
    rows = cursor.fetchall()
    conn.close()
    articles = [{"id": row[0], "title": row[1], "content": row[2], "suptitle": row[3]} for row in rows]
    return jsonify(articles)

# عرض مقال بناءً على ID
@app.route('/api/articles/<int:article_id>', methods=['GET'])
def get_article(article_id):
    conn = sqlite3.connect('articles.db')
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM articles WHERE id = ?', (article_id,))
    row = cursor.fetchone()
    conn.close()
    if row:
        article = {"id": row[0], "title": row[1], "content": row[2], "suptitle": row[3]}
        return jsonify(article)
    return jsonify({"error": "Article not found"}), 404

# إضافة مقال جديد
@app.route('/api/articles', methods=['POST'])
def add_article():
    data = request.json
    if "title" not in data or "content" not in data or "suptitle" not in data:
        return jsonify({"error": "Title, content, and suptitle are required"}), 400
    conn = sqlite3.connect('articles.db')
    cursor = conn.cursor()
    cursor.execute(
        'INSERT INTO articles (title, content, suptitle) VALUES (?, ?, ?)',
        (data["title"], data["content"], data["suptitle"])
    )
    conn.commit()
    new_id = cursor.lastrowid
    conn.close()
    new_article = {"id": new_id, "title": data["title"], "content": data["content"], "suptitle": data["suptitle"]}
    return jsonify(new_article), 201

# تعديل مقال
@app.route('/api/articles/<int:article_id>', methods=['PUT'])
def update_article(article_id):
    data = request.json
    if "title" not in data or "content" not in data or "suptitle" not in data:
        return jsonify({"error": "Title, content, and suptitle are required"}), 400
    conn = sqlite3.connect('articles.db')
    cursor = conn.cursor()
    cursor.execute(
        'UPDATE articles SET title = ?, content = ?, suptitle = ? WHERE id = ?',
        (data["title"], data["content"], data["suptitle"], article_id)
    )
    conn.commit()
    conn.close()
    return jsonify({"message": "Article updated successfully"}), 200

# حذف مقال
@app.route('/api/articles/<int:article_id>', methods=['DELETE'])
def delete_article(article_id):
    conn = sqlite3.connect('articles.db')
    cursor = conn.cursor()
    cursor.execute('DELETE FROM articles WHERE id = ?', (article_id,))
    conn.commit()
    conn.close()
    return jsonify({"message": "Article deleted successfully"}), 200

if __name__ == '__main__':
    app.run(debug=True)
