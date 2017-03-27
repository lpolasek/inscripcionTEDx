var app = angular.module('tedx', []);

app.controller('mainController', function($scope, $http, $timeout) {

	$scope.equipo = '';
	$scope.integrantes = [];
	$scope.integrante = {};
	$scope.errores = [];
	$scope.ultimo = $scope.integrantes.length + 1;

	$scope.has_error = function(name, form='v_integrante') {
		return $scope[form][name].$invalid && !$scope[form][name].$pristine;
	}
	
	$scope.editar = function( id ) {
		var integrante = $scope.integrantes.find(function(e) {
			return e.id === id;
		});
		if(integrante) {
			$scope.integrante = angular.copy(integrante);
		}
	};

	$scope.borrar = function( id ) {
		$scope.integrantes = $scope.integrantes.filter(function(e) {
			return e.id != id;
		});
	};

	$scope.agregar = function() {
		if($scope.v_integrante.$valid) {
			$scope.integrante.id = $scope.ultimo;
			$scope.integrantes.push($scope.integrante);
			$scope.limpiar();
			$scope.ultimo += 1;
		} else {
			$scope.ensuciar();
		}
	};

	$scope.actualizar = function( id ) {
		if($scope.v_integrante.$valid) {
			var index = $scope.integrantes.findIndex(function(e) {
				return e.id === id;
			});
			if(index != undefined) {
				$scope.integrantes[index] = $scope.integrante;
			}
			$scope.limpiar();
		} else {
			$scope.ensuciar();
		}
	};

	$scope.limpiar = function(form='v_integrante', model='integrante', value={}) {
		if($scope[model]) {
			$scope[model] = value;
		}
		if($scope[form]) {
			$scope[form].$setPristine();
			$scope[form].$setUntouched();
		}
	}

	$scope.ensuciar = function() {
		var fields = [ 'nombre', 'dni', 'carrera', 'telefono', 'email' ];
		fields.forEach( function(e) {
			$scope.v_integrante[e].$setDirty();
		});
	}

	$scope.submit = function() {
		$scope.errores = [];
		$scope.submitted = false;
		$scope.v_equipo.team_name.$setDirty();
		if($scope.v_equipo.$invalid) {
			$scope.errores.push('Debe indicar el nombre del equipo.');
		}
		if(($scope.integrantes.length < 3) || ($scope.integrantes.length >6)) {
			$scope.errores.push('El equipo debe tener entre 3 y 6 integrantes.');
		}
		if($scope.errores.length == 0) {
			$scope.submitting = true;
			data = {
				'equipo': $scope.equipo,
				'integrantes': $scope.integrantes
			}
			headers = {
				'Content-Type' : 'application/json'
			}
			$http.post('/inscribir', data, headers)
			.then(
				function(response) {
					$scope.submitted = true;
					$scope.submitting = false;
				},
				function(response) {
					$scope.submitting = false;
					$scope.errores.push(response.statusText);
				})
		}	
	}

	$scope.limpiar();
	$scope.limpiar('v_equipo', 'equipo', '');
});

