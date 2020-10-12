<template>
	<div id="app" class="container">
		<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-body">
						<table>
							<tr>
								<td>Nombre</td>
								<td><input v-model="nameEdit" type="text" /></td>
							</tr>
							<tr>
								<td>Apellido</td>
								<td><input v-model="lastnameEdit" type="text" /></td>
							</tr>
							<button @click="update">Editar</button>
						</table>
					</div>
				</div>
			</div>
		</div>

		<div class="form-agregar">
			<table>
				<tr>
					<td>Nombre</td>
					<td><input v-model="name" type="text" /></td>
				</tr>
				<tr>
					<td>Apellido</td>
					<td><input v-model="lastname" type="text" /></td>
				</tr>
			</table>
		</div>
		<b-button @click="create" variant="outline-danger" class="btn-form-agregar">Agregar</b-button>

		<table class="table">
			<thead>
				<tr>
					<th scope="col">#</th>
					<th scope="col">Nombre</th>
					<th scope="col">Apellido</th>
					<th scope="col">Acción</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="(user, i) in users" :key="i">
					<th scope="row">{{ i + 1 }}</th>
					<td>{{ user.data.name }}</td>
					<td>{{ user.data.lastname }}</td>
					<td>
						<button
							data-toggle="modal"
							data-target="#exampleModal"
							class="btn btn-warning ml-2"
							@click="setInformation(user.data.name, user.data.lastname, user.id)"
						>
							Editar</button
						><button @click="Delete(user.id)" class="btn btn-danger ml-2">
							Eliminar
						</button>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script>
import Login from '@/components/Login.vue';
import firebase from 'firebase';

export default {
	name: 'App',
	components: {
		Login,
	},
	data() {
		return {
			loading: true,
			users: [],
			name: '',
			lastname: '',
			nameEdit: '',
			lastnameEdit: '',
			idEdit: '',
		};
	},
	mounted() {
		this.read();
		// this.create()
		// this.update()
		// this.delete();
	},
	methods: {
		setInformation(name, lastname, id) {
			this.nameEdit = name;
			this.lastnameEdit = lastname;
			this.idEdit = id;
		},
		read() {
			firebase
				.firestore()
				.collection('users')
				.onSnapshot((snapshot) => {
					this.users = [];
					snapshot.forEach((doc) => {
						console.log(doc.id, '=>', doc.data());
						this.users.push({
							id: doc.id,
							data: doc.data(),
						});
					});
				});
		},
		create() {
			firebase
				.firestore()
				.collection('users')
				.add({
					name: this.name,
					lastname: this.lastname,
				})
				.then(() => {
					console.log('Data enviada');
				});
		},
		update() {
			firebase
				.firestore()
				.collection('users')
				.doc(this.idEdit)
				.update({
					name: this.nameEdit,
					lastname: this.lastnameEdit,
				})
				.then(() => {
					console.log('Data enviada');
				});
		},
		Delete(id) {
			firebase
				.firestore()
				.collection('users')
				.doc(id)
				.delete();
		},
	},
};
</script>

<style>
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
}
.form-agregar {
	display: flex;
	justify-content: center;
	margin: 20px;
}
.btn-form-agregar {
	display: flex;
	justify-content: end;
	margin-left: 60px;
}
</style>
