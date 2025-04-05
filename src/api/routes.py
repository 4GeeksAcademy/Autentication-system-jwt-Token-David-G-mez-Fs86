"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/registro', methods=['POST'])
def registro():
    request_body = request.get_json()
    user = User.query.filter_by(email = request_body['email']).first()
    if user : 
        return jsonify({'message':'Ya registrado'}), 400
    new_user = User(email = request_body['email'], password = request_body['password'])
    db.session.add(new_user)
    db.session.commit()
    return jsonify({'message' : 'Registro exitoso'}), 200



@api.route('/login', methods=['POST'])
def login():
    request_body = request.get_json()
    user = User.query.filter_by(email = request_body['email'], password = request_body['password']).first()
    if not user : 
        return jsonify({'message':'Email o contraseña incorrectos'}), 400
    access_token = create_access_token(identity=str(user.id))
    return jsonify({'token' : access_token }), 200


@api.route('/private', methods=['GET'])
@jwt_required()
def private():
    token_id = get_jwt_identity()
    user = User.query.filter_by(id = token_id).first()
    if user is None : 
        return jsonify({'message' : 'Usuario no encontrado'}), 400

    return jsonify({'message' : 'Bienvenido de nuevo'}), 200

