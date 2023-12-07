from flask import Flask, jsonify, request

app = Flask(__name__)

# Một danh sách đơn giản để làm ví dụ
data = [
    {'id': 1, 'name': 'Item 1'},
    {'id': 2, 'name': 'Item 2'},
    {'id': 3, 'name': 'Item 3'},
]

# Route để lấy danh sách item
@app.route('/api/items', methods=['GET'])
def get_items():
    return jsonify({'data': data})

# Route để lấy thông tin của một item dựa trên ID
@app.route('/api/items/<int:item_id>', methods=['GET'])
def get_item(item_id):
    item = next((item for item in data if item['id'] == item_id), None)
    if item is not None:
        return jsonify({'data': item})
    else:
        return jsonify({'message': 'Item not found'}), 404

# Route để thêm một item mới
@app.route('/api/items', methods=['POST'])
def add_item():
    new_item = {'id': len(data) + 1, 'name': request.json.get('name', '')}
    data.append(new_item)
    return jsonify({'message': 'Item added successfully', 'data': new_item}), 201

if __name__ == '__main__':
    app.run(debug=True)
