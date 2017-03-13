#!/usr/bin/env python2

from flask import Flask, request, jsonify, render_template
from flask_mail import Mail, Message
import json
import config

mail = None
app = None

def inscribir():
	data = request.get_json()
	print json.dumps(data, indent=4)
	subject_text = "El equipo %s ha sido inscripto!" % data['equipo']
	recipients=[ x['email'].encode('ascii', 'ignore') for x in data['integrantes'] ]
	msg = Message(
		subject=subject_text.encode('ascii', 'ignore'),
		sender=config.MAIL_USERNAME,
		recipients=recipients,
                bcc=[ config.MAIL_USERNAME ])
        msg.html = render_template('template.html', data=data)
	mail.send(msg)
	return jsonify(message=subject_text)

def static_file(path):
	return app.send_static_file(path)

def root():
	return app.send_static_file('index.html')

def configure(flask_app):
	global app
	global mail
	app = flask_app

	app.config['PROPAGATE_EXCEPTIONS'] = True

	app.config['MAIL_SERVER'] = 'smtp.gmail.com'
	app.config['MAIL_PORT'] = 465
	app.config['MAIL_USE_SSL'] = True
	app.config['MAIL_USE_TLS'] = False
	app.config['MAIL_USERNAME'] = config.MAIL_USERNAME
	app.config['MAIL_PASSWORD'] = config.MAIL_PASSWORD

	mail = Mail(app)

	app.add_url_rule('/inscribir', 'inscribir', inscribir, methods = ['POST'])
	app.add_url_rule('/<path:path>', 'static_file', static_file)
	app.add_url_rule('/', 'root', root)

