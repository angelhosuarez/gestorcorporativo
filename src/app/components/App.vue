<template>
  <div>
    <nav class="navbar navbar-light bg-light">
      <a href="/" class="navbar-brand">MEVN STACK</a>
    </nav>
    <div class="container">
      <div class="row pt-5">
        <div class="col-md-5">
          <div class="card">
            <div class="card-body">
              <form @submit.prevent="sendTask">
                <div class="form-group">
                  <input
                    v-model="task.titulo"
                    class="form-control"
                    type="text"
                    placeholder="Insert una nueva tarea"
                  >
                </div>
                <div class="form-group">
                  <textarea
                    v-model="task.descripcion"
                    class="form-control"
                    placeholder="descripcion"
                    cols="30"
                    rows="10"
                  ></textarea>
                </div>
                <template v-if="edit">
                  <button class="btn btn-primary">Actualizar</button>
                </template>
                <template v-else>
                  <button class="btn btn-primary">Enviar</button>
                </template>
              </form>
            </div>
          </div>
        </div>
        <div class="col-md-7">
          <table class="table table-bordered">
            <thead>
              <th>Tarea</th>
              <th>Descripcion</th>
            </thead>
            <tbody>
              <tr v-for="task in tasks">
                <td>{{task.titulo}}</td>
                <td>{{task.descripcion}}</td>
                <td>
                  <button class="btn btn-danger" @click="deleteTask(task._id)">Borrar</button>
                </td>
                <td>
                  <button class="btn btn-secondary" @click="editTask(task._id)">Editar</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
class task {
  constructor(titulo = "", descripcion = "") {
    this.titulo = titulo;
    this.descripcion = descripcion;
  }
}
export default {
  data() {
    return {
      task: new task(),
      tasks: [],
      edit: false,
      taskToedit: ""
    };
  },
  created() {
    this.getTasks();
  },
  methods: {
    sendTask() {
      if (this.edit) {
        fetch("/api/tasks/" + this.taskToedit, {
          method: "PUT",
          body: JSON.stringify(this.task),
          headers: {
            Accept: "application/json",
            "Content-type": "application/json"
          }
        })
          .then(res => res.json())
          .then(data => {
            this.getTasks();
            this.edit = false;
          });
      } else {
        fetch("/api/tasks", {
          method: "POST",
          body: JSON.stringify(this.task),
          headers: {
            Accept: "application/json",
            "Content-type": "application/json"
          }
        })
          .then(res => res.json())
          .then(data => {
            this.getTasks();
          });
      }
      this.task = new task();
    },
    getTasks() {
      fetch("/api/tasks")
        .then(res => res.json())
        .then(data => {
          this.tasks = data;
        });
    },
    deleteTask(id) {
      fetch("/api/tasks/" + id, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json"
        }
      })
        .then(res => res.json())
        .then(data => {
          this.getTasks();
        });
    },
    editTask(id) {
      fetch("/api/tasks/" + id)
        .then(res => res.json())
        .then(data => {
          this.task = new task(data.titulo, data.descripcion);
          this.edit = true;
          this.taskToedit = data._id;
        });
    }
  }
};
</script>
