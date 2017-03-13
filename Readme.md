inscripcionTEDx
===============
Página de incripción para los grupos de diseño TEDxEldorado

Requirements:
-------------
* Python
* Flask
* Flask-Mail


Instalación:
-------------
* clonar Git repo

        git clone https://github.com/lpolasek/inscripcionTEDx.git

* satisfacer dependencias

        cd inscripcionTEDx
        pip install -r requirements.txt

También puede instalar las dependencias usando *virtualenv*.

* configurar cuenta de mail en _wsgi/config.py_

* testear inscripcionTEDx

        python wsgi/main.py

    - abrir http://127.0.0.1:5000 en un navegador web


