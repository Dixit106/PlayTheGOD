from flask import Flask, render_template, request, jsonify
app = Flask(__name__)

# My secret recipe book don't cheat :)
# We combine the name with a "+" to check if they match
RECIPES = {
    "Quark+Quark": "Photon",
    "Electron+Proton":"Hydrogen",
    "Hydrogen+Hydrogen":"Helium",
    "Electron+Photon":"Energy Beam"
}

@app.route('/')
def home():
    #HTML file
    return render_template('index.html')

@app.route('/combine', methods=['POST'])
def combine():
    data = request.json
    item1 = data.get('item1')
    item2 = data.get('item2')

    #to make quark+elecron same as vise versa
    items = sorted([item1, item2])
    recipe_key = f"{items[0]}+{items[1]}"

    # Check if combination exists or not 
    if recipe_key in RECIPES:
        return jsonify({"success": True, "result": RECIPES[recipe_key]})
    else:
        return jsonify({"success": False, "result": "Nothing Happened..."})
    
    if __name__ == '__main__':
        app.run(debug=True)