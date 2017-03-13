#!/usr/bin/env python2

from flask import Flask
import tedx

app = Flask(__name__, static_url_path='')

for module in [ tedx ]:
	module.configure(app)

if __name__ == '__main__':
	app.debug = True
	app.run(host='0.0.0.0')
